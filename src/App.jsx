import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import PlacementDashboard from './components/PlacementDashboard';
import SkillTreeCanvas from './components/SkillTreeCanvas';
import JDAnalyzer from './components/JDAnalyzer';
import StudentAssessment from './components/StudentAssessment';
import PersonalizedRoadmap from './components/PersonalizedRoadmap';
import DailyQuests from './components/DailyQuests';
import AIMockInterview from './components/AIMockInterview';
import LeaderboardModal from './components/LeaderboardModal';
import RoleSelectorModal from './components/RoleSelectorModal';
import InterestDomainFinder from './components/InterestDomainFinder';
import EnhancedVoiceAssistant from './components/EnhancedVoiceAssistant';
import AuthModal from './components/AuthModal';
import { 
  subscribeToAuthChanges, 
  logoutUser, 
  updateUserProfile 
} from './services/authService';
import { INITIAL_SKILLS, TARGET_ROLES, DEMO_STUDENT } from './data/rolesData';
import confetti from 'canvas-confetti';
import { Mic, Bot } from 'lucide-react';

export default function App() {
  const [skills, setSkills] = useState(INITIAL_SKILLS);
  const [userLevel, setUserLevel] = useState(3);
  const [currentXp, setCurrentXp] = useState(550);
  const [nextLevelXp, setNextLevelXp] = useState(1000);
  const [streak, setStreak] = useState(5);
  
  // Active Tab defaults to the friendly Student Interest & Domain Finder
  const [activeTab, setActiveTab] = useState('interests');
  const [targetRole, setTargetRole] = useState(TARGET_ROLES[0].title); // Software Developer
  const [assessmentResults, setAssessmentResults] = useState({
    categoryScores: DEMO_STUDENT.assessmentResults,
    weakestCategories: ['DSA', 'Operating Systems', 'Aptitude'],
    completedAt: 'Recent'
  });

  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isRoleSelectorOpen, setIsRoleSelectorOpen] = useState(false);
  const [levelUpToast, setLevelUpToast] = useState(null);

  // Authentication & Database State
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'register' | 'config'

  // Listen for real-time authentication and session state changes
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      if (user) {
        setCurrentUser(user);
        if (user.role) setTargetRole(user.role);
        if (user.xp) setCurrentXp(user.xp);
        if (user.level) setUserLevel(user.level);
        if (user.streak) setStreak(user.streak);
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleOpenAuth = (mode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleSignOut = async () => {
    await logoutUser();
    setCurrentUser(null);
    setLevelUpToast('Signed out. Switched to guest mode.');
    setTimeout(() => setLevelUpToast(null), 3000);
  };

  // Priority 12: Instant Demo Student Loader for Hackathon Judges
  const handleLoadDemoStudent = () => {
    setTargetRole('Software Developer');
    setAssessmentResults({
      categoryScores: {
        DSA: 45,
        DBMS: 80,
        OOP: 75,
        Aptitude: 60,
        OS: 55,
        'Computer Networks': 60,
        Communication: 70
      },
      weakestCategories: ['DSA', 'Operating Systems', 'Aptitude'],
      completedAt: 'Verified Diagnostic'
    });
    setActiveTab('dashboard');

    confetti({
      particleCount: 100,
      spread: 75,
      origin: { y: 0.5 },
      colors: ['#f59e0b', '#8b5cf6', '#10b981', '#06b6d4']
    });

    setLevelUpToast('Loaded Demo Student: Software Developer (DSA 45% Gap Identified & 7-Day Roadmap Activated!)');
    setTimeout(() => setLevelUpToast(null), 4000);
  };

  // Add XP and handle Level Up (syncing to secure database when logged in)
  const handleAddXp = (amount) => {
    setCurrentXp(prev => {
      const newXp = prev + amount;
      let finalLevel = userLevel;

      if (newXp >= nextLevelXp) {
        const remaining = newXp - nextLevelXp;
        const newLevel = userLevel + 1;
        finalLevel = newLevel;
        setUserLevel(newLevel);
        setNextLevelXp(Math.round(nextLevelXp * 1.3));

        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899']
        });

        setLevelUpToast(`LEVEL UP! You reached Level ${newLevel} Software Apprentice!`);
        setTimeout(() => setLevelUpToast(null), 4500);

        // Sync to database if logged in
        if (currentUser?.uid) {
          updateUserProfile(currentUser.uid, { xp: remaining, level: newLevel }).catch(() => {});
        }

        return remaining;
      }

      // Sync to database if logged in
      if (currentUser?.uid) {
        updateUserProfile(currentUser.uid, { xp: newXp, level: finalLevel }).catch(() => {});
      }

      return newXp;
    });
  };

  // Master a skill and automatically unlock unlocked downstream nodes
  const handleMasterSkill = (skillId) => {
    setSkills(prev => {
      const updated = prev.map(s => {
        if (s.id === skillId) {
          return { ...s, status: 'mastered' };
        }
        return s;
      });

      const targetSkill = prev.find(s => s.id === skillId);
      if (targetSkill && targetSkill.status !== 'mastered') {
        handleAddXp(targetSkill.xp);
      }

      const masteredIds = updated.filter(s => s.status === 'mastered').map(s => s.id);

      return updated.map(node => {
        if (node.status === 'locked' && node.prerequisites.length > 0) {
          const allPreMastered = node.prerequisites.every(pId => masteredIds.includes(pId));
          if (allPreMastered) {
            return { ...node, status: 'needs-improvement' };
          }
        }
        return node;
      });
    });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Toast Notification */}
      {levelUpToast && (
        <div style={{
          position: 'fixed',
          top: '75px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
          color: '#ffffff',
          fontWeight: 800,
          fontSize: '0.9rem',
          padding: '12px 24px',
          borderRadius: '99px',
          boxShadow: '0 10px 30px rgba(139, 92, 246, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          animation: 'bounce 0.5s ease',
          textAlign: 'center',
          maxWidth: '90%'
        }}>
          {levelUpToast}
        </div>
      )}

      {/* Main Header */}
      <Header
        userLevel={userLevel}
        currentXp={currentXp}
        nextLevelXp={nextLevelXp}
        streak={streak}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        targetRole={targetRole}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onOpenRoleSelector={() => setIsRoleSelectorOpen(true)}
        onLoadDemoStudent={handleLoadDemoStudent}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onSignOut={handleSignOut}
      />

      {/* Dynamic Content Views */}
      <main style={{ flex: 1, paddingBottom: '60px' }}>
        
        {/* Beginner-Friendly Student Interest & Domain Finder */}
        {activeTab === 'interests' && (
          <InterestDomainFinder
            currentRole={targetRole}
            onSelectRole={(role) => setTargetRole(role)}
            onNavigateToTab={(tab) => setActiveTab(tab)}
          />
        )}

        {/* Enhanced AI Voice Placement Mentor (Speech-to-Text & Text-to-Speech) */}
        {activeTab === 'voice' && (
          <EnhancedVoiceAssistant
            targetRole={targetRole}
            onNavigateToTab={(tab) => setActiveTab(tab)}
          />
        )}

        {/* Central Dashboard Hub (Priority 5 & 1) */}
        {activeTab === 'dashboard' && (
          <PlacementDashboard
            targetRole={targetRole}
            assessmentResults={assessmentResults}
            skills={skills}
            streak={streak}
            onNavigateToTab={(tab) => setActiveTab(tab)}
            onOpenRoleSelector={() => setIsRoleSelectorOpen(true)}
          />
        )}

        {/* Priority 3: Role & JD Analyzer with transparent comparison */}
        {activeTab === 'jd' && (
          <JDAnalyzer
            skills={skills}
            currentTargetRole={targetRole}
            setTargetRole={setTargetRole}
            onNavigateToTab={(tab) => setActiveTab(tab)}
          />
        )}

        {/* Priority 4: Short 8-question Student Assessment */}
        {activeTab === 'assessment' && (
          <StudentAssessment
            onSaveAssessment={(res) => setAssessmentResults(res)}
            existingResults={assessmentResults}
            targetRoleTitle={targetRole}
            onNavigateToTab={(tab) => setActiveTab(tab)}
          />
        )}

        {/* Priority 6: Personalized 7-Day Roadmap */}
        {activeTab === 'roadmap' && (
          <PersonalizedRoadmap
            targetRole={targetRole}
            assessmentResults={assessmentResults}
            onAddXp={handleAddXp}
            onNavigateToTab={(tab) => setActiveTab(tab)}
          />
        )}

        {/* Priority 9: Useful RPG Skill Tree */}
        {activeTab === 'tree' && (
          <SkillTreeCanvas
            skills={skills}
            onMasterSkill={handleMasterSkill}
            targetRole={targetRole}
            onOpenRoleSelector={() => setIsRoleSelectorOpen(true)}
          />
        )}

        {/* Priority 7: 3 Daily Micro-Quests (Learn, Practice, Communicate) */}
        {activeTab === 'quests' && (
          <DailyQuests
            onAddXp={handleAddXp}
            streak={streak}
          />
        )}

        {/* Priority 8: Multi-turn AI Mock Interview */}
        {activeTab === 'interview' && (
          <AIMockInterview
            targetRole={targetRole}
            onAddXp={handleAddXp}
          />
        )}
      </main>

      {/* Floating Quick Voice Mentor Button (Accessible from any screen) */}
      {activeTab !== 'voice' && (
        <button
          onClick={() => setActiveTab('voice')}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            zIndex: 900,
            background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
            color: '#ffffff',
            border: 'none',
            borderRadius: '99px',
            padding: '12px 20px',
            fontWeight: 800,
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 8px 25px rgba(139, 92, 246, 0.5)',
            cursor: 'pointer',
            transition: 'transform 0.15s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          title="Click to speak with Nova, your AI Voice Placement Mentor"
        >
          <Bot size={18} />
          <span>AI Navigator</span>
        </button>
      )}

      {/* Priority 2: Role Selection Modal */}
      <RoleSelectorModal
        isOpen={isRoleSelectorOpen}
        onClose={() => setIsRoleSelectorOpen(false)}
        currentRole={targetRole}
        onSelectRole={(role) => setTargetRole(role.title)}
        onOpenJdTab={() => setActiveTab('jd')}
      />

      {/* Campus Leaderboard & Peer Buddy Modal */}
      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        currentXp={currentXp}
        userLevel={userLevel}
      />

      {/* User Authentication & Secure Database Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authModalMode}
        onAuthSuccess={(user) => {
          setCurrentUser(user);
          if (user.role) setTargetRole(user.role);
          setLevelUpToast(`Welcome, ${user.name}! Connected to secure database.`);
          setTimeout(() => setLevelUpToast(null), 4000);
        }}
      />

      {/* Footer */}
      <footer style={{
        background: 'rgba(7, 9, 14, 0.95)',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        padding: '20px 24px',
        textAlign: 'center',
        fontSize: '0.8rem',
        color: '#64748b'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <strong style={{ color: '#94a3b8' }}>SkillTree.AI / QuestPrep</strong> — Reimagining Placement Preparation Through Role-Driven Personalization
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>PromptWars x GenAI Innovation Challenge</span>
            <span>·</span>
            <span>Don't prepare for everything. Prepare for what YOUR role requires.</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
