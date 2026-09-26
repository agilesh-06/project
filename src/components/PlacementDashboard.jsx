import React from 'react';
import { 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Zap, 
  BookOpen, 
  Mic, 
  Map, 
  Award,
  Layers,
  BarChart3,
  Flame,
  ChevronRight,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { TARGET_ROLES } from '../data/rolesData';

export default function PlacementDashboard({ 
  targetRole, 
  assessmentResults, 
  skills, 
  streak, 
  onNavigateToTab, 
  onOpenRoleSelector 
}) {
  const currentRoleObj = TARGET_ROLES.find(r => r.title === targetRole) || TARGET_ROLES[0];
  const requiredNodeIds = currentRoleObj.requiredNodeIds || [];
  const masteredSkills = skills.filter(s => s.status === 'mastered');
  const matchedRequiredCount = skills.filter(s => requiredNodeIds.includes(s.id) && s.status === 'mastered').length;

  // Transparent match score: Matched / Required * 100
  const technicalMatchScore = requiredNodeIds.length > 0 
    ? Math.round((matchedRequiredCount / requiredNodeIds.length) * 100)
    : 70;

  // Composite Readiness Score
  const dsaScore = assessmentResults?.categoryScores?.DSA ?? 45;
  const dbmsScore = assessmentResults?.categoryScores?.DBMS ?? 80;
  const oopScore = assessmentResults?.categoryScores?.OOP ?? 75;
  const aptitudeScore = assessmentResults?.categoryScores?.Aptitude ?? 60;
  const commScore = assessmentResults?.categoryScores?.Communication ?? 70;

  const overallReadiness = Math.round(
    (technicalMatchScore * 0.35) + 
    (dsaScore * 0.25) + 
    (commScore * 0.20) + 
    (aptitudeScore * 0.20)
  );

  // Top Strengths & Gaps
  const strengths = [];
  const gaps = [];

  if (dbmsScore >= 70) strengths.push(`Database Internals & SQL (${dbmsScore}%)`);
  if (oopScore >= 70) strengths.push(`Object-Oriented Design (${oopScore}%)`);
  if (technicalMatchScore >= 60) strengths.push(`Core Architecture Foundations`);

  if (dsaScore < 60) gaps.push({ name: 'Data Structures & Algorithms', score: `${dsaScore}%`, priority: 'Critical' });
  if (aptitudeScore < 65) gaps.push({ name: 'Speed Aptitude & Logic', score: `${aptitudeScore}%`, priority: 'High' });
  gaps.push({ name: 'Distributed Caching & Whiteboard Articulation', score: 'Needs Practice', priority: 'Medium' });

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 20px' }}>
      
      {/* ===================================================================
          HERO ONBOARDING & VALUE PROPOSITION (Priority 1)
          =================================================================== */}
      <div style={{
        background: 'radial-gradient(ellipse at top left, rgba(139, 92, 246, 0.22) 0%, rgba(6, 182, 212, 0.12) 50%, rgba(13, 18, 31, 0.95) 100%)',
        border: '1px solid rgba(139, 92, 246, 0.35)',
        borderRadius: '24px',
        padding: '32px 36px',
        marginBottom: '28px',
        boxShadow: '0 20px 45px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{
            background: 'rgba(139, 92, 246, 0.25)',
            color: '#c4b5fd',
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '3px 10px',
            borderRadius: '99px',
            border: '1px solid rgba(139, 92, 246, 0.4)'
          }}>
            THE PLACEMENT OPERATING SYSTEM
          </span>
          <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 600 }}>
            Don't prepare for everything. Prepare for what YOUR role requires.
          </span>
        </div>

        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em', lineHeight: 1.25, margin: '6px 0 12px' }}>
          SkillTree.AI tells you what skills you need, identifies your gaps, and gives you a personalized plan to become placement-ready.
        </h1>

        <p style={{ color: '#cbd5e1', fontSize: '0.95rem', maxWidth: '780px', lineHeight: 1.6, marginBottom: '22px' }}>
          Tired of generic 500-question LeetCode lists? We reverse-engineer your target role into an actionable RPG skill tree, calculate your verified placement readiness, and give you 3 focused daily micro-quests.
        </p>

        {/* 7-Step Journey Mini Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {[
            '1. Target Role',
            '2. JD Analysis',
            '3. Skill Assessment',
            '4. Gap Analysis',
            '5. Personalized Roadmap',
            '6. Daily Quests',
            '7. AI Mock Interview'
          ].map((step, idx) => (
            <span key={idx} style={{
              fontSize: '0.75rem',
              color: idx === 0 || idx === 2 ? '#34d399' : '#94a3b8',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '4px 10px',
              borderRadius: '8px'
            }}>
              {step}
            </span>
          ))}
        </div>

        {/* Primary CTA Buttons */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={() => onNavigateToTab('interests')}
            className="btn-primary"
            style={{
              padding: '13px 24px',
              fontSize: '0.95rem',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
              boxShadow: '0 6px 20px rgba(139, 92, 246, 0.45)'
            }}
          >
            <Compass size={18} />
            <span>Find My Domain / Match Interests</span>
            <ArrowRight size={17} />
          </button>

          <button
            onClick={() => onNavigateToTab('roadmap')}
            className="btn-secondary"
            style={{ padding: '13px 20px', fontSize: '0.9rem' }}
          >
            <Map size={16} color="#34d399" />
            <span>View Clear 7-Day Roadmap</span>
          </button>

          <button
            onClick={() => onNavigateToTab('voice')}
            className="btn-secondary"
            style={{ padding: '13px 18px', fontSize: '0.9rem' }}
          >
            <Mic size={16} color="#c4b5fd" />
            <span>Talk to AI Guide</span>
          </button>

          <button
            onClick={onOpenRoleSelector}
            className="btn-secondary"
            style={{ padding: '13px 18px', fontSize: '0.85rem' }}
          >
            <Target size={15} color="#94a3b8" />
            <span>Current: <strong>{targetRole}</strong></span>
          </button>
        </div>
      </div>

      {/* ===================================================================
          THE 3 CORE QUESTIONS ANSWERED (Priorities 2, 3, 5)
          =================================================================== */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px', marginBottom: '28px' }}>
        
        {/* CARD 1: WHAT SHOULD I PREPARE? */}
        <div className="glass-panel" style={{ padding: '26px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#a78bfa', letterSpacing: '0.04em' }}>
              Question 1
            </span>
            <button 
              onClick={() => onNavigateToTab('jd')}
              style={{ background: 'transparent', border: 'none', color: '#38bdf8', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}
            >
              <span>Full JD Breakdown</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', marginBottom: '8px' }}>
            What Should I Prepare?
          </h2>
          <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '16px' }}>
            Required core skills for <strong style={{ color: '#fff' }}>{currentRoleObj.title}</strong>:
          </div>

          {/* Technical Skills Required */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ fontSize: '0.725rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '6px' }}>
              Required Technical Skills:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {currentRoleObj.technicalSkills.map((sk, idx) => (
                <span key={idx} style={{
                  fontSize: '0.75rem',
                  background: 'rgba(139, 92, 246, 0.15)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  color: '#c4b5fd',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontWeight: 600
                }}>
                  {sk}
                </span>
              ))}
            </div>
          </div>

          {/* Soft & Interview Skills */}
          <div style={{ marginBottom: '18px' }}>
            <div style={{ fontSize: '0.725rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '6px' }}>
              Required Soft & Articulation Skills:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {currentRoleObj.softSkills.map((sk, idx) => (
                <span key={idx} style={{
                  fontSize: '0.75rem',
                  background: 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  color: '#34d399',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontWeight: 600
                }}>
                  {sk}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigateToTab('tree')}
            className="btn-secondary"
            style={{ width: '100%', padding: '10px', fontSize: '0.85rem' }}
          >
            <Layers size={15} />
            <span>View RPG Dependency Skill Tree</span>
          </button>
        </div>

        {/* CARD 2: WHERE DO I STAND? */}
        <div className="glass-panel" style={{ padding: '26px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#38bdf8', letterSpacing: '0.04em' }}>
              Question 2
            </span>
            <button 
              onClick={() => onNavigateToTab('assessment')}
              style={{ background: 'transparent', border: 'none', color: '#a78bfa', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}
            >
              <span>{assessmentResults ? 'Retake Test' : 'Take Diagnostic'}</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', marginBottom: '8px' }}>
            Where Do I Stand?
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', background: 'rgba(255, 255, 255, 0.03)', padding: '12px 16px', borderRadius: '12px' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>Overall Placement Readiness</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: overallReadiness >= 70 ? '#10b981' : (overallReadiness >= 50 ? '#f59e0b' : '#ef4444') }}>
                {overallReadiness}%
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>Role Skill Match</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#38bdf8' }}>
                {technicalMatchScore}%
              </div>
            </div>
          </div>

          {/* Top Strengths */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ fontSize: '0.725rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase', marginBottom: '4px' }}>
              Top Strengths:
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.8rem', color: '#cbd5e1' }}>
              {strengths.map((str, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                  <CheckCircle2 size={13} color="#10b981" />
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Top 3 Skill Gaps */}
          <div>
            <div style={{ fontSize: '0.725rem', fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase', marginBottom: '6px' }}>
              Top 3 Skill Gaps:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              {gaps.map((gap, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.775rem', background: 'rgba(245, 158, 11, 0.08)', padding: '5px 10px', borderRadius: '6px' }}>
                  <span style={{ color: '#fbbf24', fontWeight: 600 }}>• {gap.name}</span>
                  <span style={{ color: '#94a3b8' }}>{gap.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CARD 3: WHAT SHOULD I DO RIGHT NOW? (Priority 5) */}
        <div className="glass-panel" style={{
          padding: '26px',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(13, 27, 24, 0.85) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          boxShadow: '0 8px 30px rgba(16, 185, 129, 0.15)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#34d399', letterSpacing: '0.04em' }}>
              Question 3 · Action Engine
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f97316', fontSize: '0.75rem', fontWeight: 700 }}>
              <Flame size={14} />
              <span>{streak}d Streak</span>
            </div>
          </div>

          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', marginBottom: '8px' }}>
            What Should I Do Right Now?
          </h2>

          <div style={{
            background: 'rgba(0, 0, 0, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '16px'
          }}>
            <div style={{ fontSize: '0.75rem', color: '#f87171', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
              Your Biggest Immediate Gap:
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#f8fafc', marginBottom: '8px' }}>
              Data Structures & Algorithms ({dsaScore}%)
            </div>
            <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
              {currentRoleObj.recommendedNextAction}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={() => onNavigateToTab('quests')}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '12px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.35)'
              }}
            >
              <Zap size={16} />
              <span>Do Today's 3 Micro-Quests (15 Mins)</span>
            </button>

            <button
              onClick={() => onNavigateToTab('roadmap')}
              className="btn-secondary"
              style={{ width: '100%', padding: '10px', fontSize: '0.85rem' }}
            >
              <Map size={15} />
              <span>Open Personalized 7-Day Roadmap</span>
            </button>

            <button
              onClick={() => onNavigateToTab('interview')}
              className="btn-secondary"
              style={{ width: '100%', padding: '10px', fontSize: '0.85rem' }}
            >
              <Mic size={15} />
              <span>Practice AI Mock Interview Round</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
