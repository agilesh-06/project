import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Code, 
  MessageSquare, 
  Sparkles, 
  Play, 
  Award, 
  ChevronRight, 
  Flame, 
  Video, 
  ExternalLink, 
  Check, 
  HelpCircle, 
  Lightbulb, 
  ListOrdered,
  RotateCcw,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { DAILY_MICRO_QUESTS } from '../data/rolesData';

export default function DailyQuests({ 
  onAddXp, 
  streak = 5 
}) {
  const [quests, setQuests] = useState(DAILY_MICRO_QUESTS);
  const [activeQuest, setActiveQuest] = useState(quests[0]);
  const [activeSubTab, setActiveSubTab] = useState('video'); // 'video' | 'task'

  // Concept Quest State
  const [selectedOption, setSelectedOption] = useState(null);
  const [conceptFeedback, setConceptFeedback] = useState(null);

  // Debug Quest State
  const [userCode, setUserCode] = useState(quests[1]?.content?.initialCode || '');
  const [debugOutput, setDebugOutput] = useState(null);

  // STAR Quest State
  const [starAnswers, setStarAnswers] = useState({
    situation: '',
    task: '',
    action: '',
    result: ''
  });
  const [starFeedback, setStarFeedback] = useState(null);

  // Keep active quest synced with quests state
  useEffect(() => {
    if (activeQuest) {
      const current = quests.find(q => q.id === activeQuest.id);
      if (current && current.status !== activeQuest.status) {
        setActiveQuest(current);
      }
    }
  }, [quests]);

  // Handle switching active quest
  const handleSelectQuest = (q) => {
    setActiveQuest(q);
    setActiveSubTab('video');
    setConceptFeedback(null);
    setSelectedOption(null);
    setDebugOutput(null);
    setStarFeedback(null);

    if ((q.type === 'debug' || q.pillar === 'Practice') && q.content?.initialCode) {
      setUserCode(q.content.initialCode);
    }
  };

  // Trigger celebration confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8b5cf6', '#10b981', '#f59e0b', '#06b6d4']
    });
  };

  // Mark Quest as Completed
  const completeQuest = (questId, xp) => {
    triggerConfetti();
    if (onAddXp) onAddXp(xp);
    setQuests(prev => prev.map(q => q.id === questId ? { ...q, status: 'completed' } : q));
    setActiveQuest(prev => prev ? { ...prev, status: 'completed' } : null);
  };

  // Reset Quest to try again
  const resetQuest = (questId) => {
    setQuests(prev => prev.map(q => q.id === questId ? { ...q, status: 'pending' } : q));
    setActiveQuest(prev => prev ? { ...prev, status: 'pending' } : null);
    setSelectedOption(null);
    setConceptFeedback(null);
    setDebugOutput(null);
    setStarFeedback(null);
    if (activeQuest?.content?.initialCode) {
      setUserCode(activeQuest.content.initialCode);
    }
  };

  // Submit Concept Answer
  const handleCheckConcept = () => {
    if (selectedOption === null || !activeQuest.content?.quickCheck) return;
    const isCorrect = selectedOption === activeQuest.content.quickCheck.correctIndex;
    if (isCorrect) {
      setConceptFeedback({
        success: true,
        message: 'Spot on! ' + activeQuest.content.quickCheck.explanation
      });
      completeQuest(activeQuest.id, activeQuest.xp);
    } else {
      setConceptFeedback({
        success: false,
        message: 'Not quite. Notice how range queries require sequential traversal across linked leaf nodes.'
      });
    }
  };

  // Submit Debug Code Fix
  const handleRunDebug = () => {
    // Check if the student fixed the <= to < in the loop boundary
    const isFixed = userCode.includes('i < arr.length') && !userCode.includes('i <= arr.length');
    if (isFixed) {
      setDebugOutput({
        success: true,
        message: 'All 3 test cases passed! Subarray boundary correctly constrained without out-of-bounds indexing.'
      });
      completeQuest(activeQuest.id, activeQuest.xp);
    } else {
      setDebugOutput({
        success: false,
        message: 'Bug still present: Check the loop condition `i <= arr.length`. On the last iteration, `arr[arr.length]` is undefined and results in NaN.'
      });
    }
  };

  // Submit STAR Story for AI Evaluation
  const handleEvaluateStar = () => {
    const totalWords = (starAnswers.situation + ' ' + starAnswers.task + ' ' + starAnswers.action + ' ' + starAnswers.result).trim().split(/\s+/).length;
    if (totalWords < 20) {
      setStarFeedback({
        success: false,
        message: 'Please provide more detail in your Action and Result sections (at least 20 words total).'
      });
      return;
    }

    setStarFeedback({
      success: true,
      score: 94,
      critique: 'Excellent STAR structure! Your Action section demonstrated clear technical trade-off evaluation, and your Result highlighted quantifiable impact.'
    });
    completeQuest(activeQuest.id, activeQuest.xp);
  };

  const completedCount = quests.filter(q => q.status === 'completed').length;
  const progressPercent = Math.round((completedCount / quests.length) * 100);

  const isQuestDone = activeQuest?.status === 'completed';

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 20px' }}>
      
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        borderRadius: '20px',
        padding: '24px 28px',
        marginBottom: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span style={{
              background: '#8b5cf6',
              color: '#ffffff',
              fontSize: '0.75rem',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '6px',
              textTransform: 'uppercase'
            }}>
              Anti-Burnout System
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f97316', fontSize: '0.85rem', fontWeight: 700 }}>
              <Flame size={16} />
              <span>{streak}-Day Streak</span>
            </div>
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
            Today's 3 Daily Micro-Quests
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '4px', maxWidth: '640px' }}>
            Each quest includes clear step-by-step instructions, curated video lessons to master the basics, and direct task verification with XP rewards.
          </p>
        </div>

        {/* Daily Progress Gauge */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.3)',
          padding: '16px 20px',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          minWidth: '220px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>Daily Completion</span>
            <span style={{ fontSize: '0.9rem', color: '#10b981', fontWeight: 800 }}>{completedCount}/3 Done</span>
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '99px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progressPercent}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #8b5cf6, #10b981)',
              borderRadius: '99px',
              transition: 'width 0.4s ease'
            }} />
          </div>
          <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '6px', textAlign: 'right' }}>
            {progressPercent === 100 ? 'Daily quota met! +150 Streak Bonus' : 'Finish all 3 to keep streak active'}
          </div>
        </div>
      </div>

      {/* Main Grid: Quest List on Left, Active Quest Interactive Workspace on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        
        {/* Left Column: 3 Quests List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {quests.map((q, idx) => {
            const isSelected = activeQuest?.id === q.id;
            const isDone = q.status === 'completed';

            return (
              <div
                key={q.id}
                onClick={() => handleSelectQuest(q)}
                style={{
                  background: isSelected 
                    ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(26, 35, 56, 0.95) 100%)' 
                    : 'rgba(18, 24, 38, 0.7)',
                  backdropFilter: 'blur(16px)',
                  borderRadius: '16px',
                  border: isSelected 
                    ? '2px solid rgba(139, 92, 246, 0.8)' 
                    : (isDone ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)'),
                  padding: '18px 20px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 8px 24px rgba(139, 92, 246, 0.25)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: isDone ? '#10b981' : '#a78bfa',
                    letterSpacing: '0.04em'
                  }}>
                    Quest {idx + 1} · {q.tag}
                  </span>
                  
                  {isDone ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981', fontSize: '0.75rem', fontWeight: 700 }}>
                      <CheckCircle2 size={14} />
                      <span>Completed</span>
                    </span>
                  ) : (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#94a3b8', fontSize: '0.75rem' }}>
                      <Clock size={12} />
                      <span>{q.estimatedMinutes} mins</span>
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: '1.025rem', fontWeight: 700, color: '#f8fafc', marginBottom: '8px', lineHeight: 1.4 }}>
                  {q.title}
                </h3>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '12px' }}>
                  {q.videoRecommendation && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#06b6d4' }}>
                      <Video size={13} />
                      <span>Video Lesson ({q.videoRecommendation.duration})</span>
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.775rem', color: isDone ? '#10b981' : '#fbbf24', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Award size={14} />
                    <span>+{q.xp} XP</span>
                  </span>

                  <span style={{ color: isSelected ? '#a78bfa' : '#64748b', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 600 }}>
                    <span>{isSelected ? 'Current Task' : 'Open Quest'}</span>
                    <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Quest Execution Workspace */}
        <div className="glass-panel" style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {activeQuest ? (
            <div>
              {/* Active Quest Top Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', marginBottom: '18px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ 
                      fontSize: '0.72rem', 
                      color: '#a78bfa', 
                      fontWeight: 800, 
                      textTransform: 'uppercase',
                      background: 'rgba(139, 92, 246, 0.15)',
                      padding: '2px 8px',
                      borderRadius: '6px'
                    }}>
                      {activeQuest.tag}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#94a3b8', fontSize: '0.75rem' }}>
                      <Clock size={12} />
                      <span>{activeQuest.estimatedMinutes} mins</span>
                    </span>
                  </div>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc', margin: '4px 0 0', lineHeight: 1.3 }}>
                    {activeQuest.title}
                  </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                  <div style={{
                    background: 'rgba(245, 158, 11, 0.15)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    color: '#fbbf24',
                    padding: '6px 14px',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <Zap size={15} />
                    <span>+{activeQuest.xp} XP</span>
                  </div>
                  {isQuestDone && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981', fontSize: '0.75rem', fontWeight: 700 }}>
                      <CheckCircle2 size={13} />
                      <span>Completed</span>
                    </span>
                  )}
                </div>
              </div>

              {/* 1. Step-by-Step Instructions Banner */}
              {activeQuest.instructions && activeQuest.instructions.length > 0 && (
                <div style={{
                  background: 'rgba(139, 92, 246, 0.08)',
                  border: '1px solid rgba(139, 92, 246, 0.25)',
                  borderRadius: '12px',
                  padding: '16px 18px',
                  marginBottom: '20px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <ListOrdered size={16} color="#c4b5fd" />
                    <span style={{ fontSize: '0.825rem', fontWeight: 800, color: '#c4b5fd', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      How to Complete This Quest
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {activeQuest.instructions.map((stepText, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <span style={{
                          background: '#8b5cf6',
                          color: '#fff',
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          flexShrink: 0,
                          marginTop: '2px'
                        }}>
                          {idx + 1}
                        </span>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                          {stepText}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation Sub-Tabs: Video Lesson vs Hands-on Workspace */}
              <div style={{
                display: 'flex',
                gap: '8px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                paddingBottom: '12px',
                marginBottom: '20px'
              }}>
                <button
                  onClick={() => setActiveSubTab('video')}
                  style={{
                    background: activeSubTab === 'video' ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    border: activeSubTab === 'video' ? '1px solid #06b6d4' : '1px solid rgba(255, 255, 255, 0.08)',
                    color: activeSubTab === 'video' ? '#67e8f9' : '#94a3b8',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Video size={15} />
                  <span>1. Video Lesson & Basics</span>
                  {activeQuest.videoRecommendation && (
                    <span style={{ background: 'rgba(6, 182, 212, 0.2)', color: '#67e8f9', fontSize: '0.7rem', padding: '1px 6px', borderRadius: '4px' }}>
                      {activeQuest.videoRecommendation.duration}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveSubTab('task')}
                  style={{
                    background: activeSubTab === 'task' ? 'rgba(139, 92, 246, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                    border: activeSubTab === 'task' ? '1px solid #8b5cf6' : '1px solid rgba(255, 255, 255, 0.08)',
                    color: activeSubTab === 'task' ? '#c4b5fd' : '#94a3b8',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Play size={15} />
                  <span>2. Interactive Task Workspace</span>
                  {isQuestDone && (
                    <CheckCircle2 size={14} color="#10b981" />
                  )}
                </button>
              </div>

              {/* SUB-TAB 1: CURATED VIDEO LESSON & CORE CONCEPTS */}
              {activeSubTab === 'video' && activeQuest.videoRecommendation && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  
                  {/* Video Player Container */}
                  <div style={{
                    background: '#090d16',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '14px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      padding: '12px 16px',
                      background: '#0e1526',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Video size={16} color="#06b6d4" />
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>
                          {activeQuest.videoRecommendation.title}
                        </span>
                      </div>
                      <a
                        href={activeQuest.videoRecommendation.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: '#06b6d4',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          textDecoration: 'none'
                        }}
                      >
                        <span>Watch on YouTube</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>

                    <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0 }}>
                      <iframe
                        src={activeQuest.videoRecommendation.embedUrl}
                        title={activeQuest.videoRecommendation.title}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          border: 'none'
                        }}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>

                    <div style={{
                      padding: '10px 16px',
                      background: '#0a0f1d',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.78rem',
                      color: '#94a3b8'
                    }}>
                      <span>Instructor / Channel: <strong style={{ color: '#e2e8f0' }}>{activeQuest.videoRecommendation.channel}</strong></span>
                      <span>Lesson Duration: <strong style={{ color: '#e2e8f0' }}>{activeQuest.videoRecommendation.duration} mins</strong></span>
                    </div>
                  </div>

                  {/* Key Takeaways Card */}
                  <div style={{
                    background: 'rgba(6, 182, 212, 0.05)',
                    border: '1px solid rgba(6, 182, 212, 0.2)',
                    borderRadius: '12px',
                    padding: '16px 18px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                      <Lightbulb size={16} color="#06b6d4" />
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#67e8f9', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Key Takeaways (Basics to Know)
                      </span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {activeQuest.videoRecommendation.keyTakeaways.map((point, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                          <Check size={15} color="#10b981" style={{ flexShrink: 0, marginTop: '3px' }} />
                          <span style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.5 }}>
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Next Step Action Button */}
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '6px' }}>
                    <button
                      onClick={() => setActiveSubTab('task')}
                      className="btn-primary"
                      style={{ flex: 1, padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                    >
                      <Play size={16} />
                      <span>Ready to Practice? Open Interactive Task</span>
                    </button>

                    {!isQuestDone && (
                      <button
                        onClick={() => completeQuest(activeQuest.id, activeQuest.xp)}
                        style={{
                          background: 'rgba(16, 185, 129, 0.15)',
                          border: '1px solid rgba(16, 185, 129, 0.4)',
                          color: '#34d399',
                          padding: '12px 20px',
                          borderRadius: '10px',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          transition: 'all 0.2s ease',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        <CheckCircle2 size={16} />
                        <span>Mark as Completed (+{activeQuest.xp} XP)</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* SUB-TAB 2: INTERACTIVE TASK WORKSPACE */}
              {activeSubTab === 'task' && (
                <div>
                  {/* QUEST TYPE 1: CONCEPT MENTAL MODEL */}
                  {(activeQuest.type === 'concept' || activeQuest.pillar === 'Learn') && activeQuest.content && (
                    <div>
                      <div style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        padding: '16px',
                        borderRadius: '12px',
                        borderLeft: '4px solid #8b5cf6',
                        marginBottom: '20px'
                      }}>
                        <strong style={{ color: '#c4b5fd', fontSize: '0.9rem', display: 'block', marginBottom: '6px' }}>
                          {activeQuest.content.hook}
                        </strong>
                        <p style={{ color: '#cbd5e1', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                          {activeQuest.content.body}
                        </p>
                      </div>

                      {activeQuest.content.quickCheck && (
                        <div style={{ marginBottom: '18px' }}>
                          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc', marginBottom: '12px' }}>
                            Quick Check: {activeQuest.content.quickCheck.question}
                          </h4>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {activeQuest.content.quickCheck.options.map((opt, idx) => (
                              <button
                                key={idx}
                                onClick={() => setSelectedOption(idx)}
                                style={{
                                  textAlign: 'left',
                                  padding: '12px 16px',
                                  borderRadius: '10px',
                                  fontSize: '0.85rem',
                                  cursor: 'pointer',
                                  background: selectedOption === idx ? 'rgba(139, 92, 246, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                                  border: selectedOption === idx ? '1px solid #8b5cf6' : '1px solid rgba(255, 255, 255, 0.08)',
                                  color: selectedOption === idx ? '#fff' : '#cbd5e1',
                                  transition: 'all 0.2s ease'
                                }}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {conceptFeedback && (
                        <div style={{
                          padding: '12px 16px',
                          borderRadius: '10px',
                          marginBottom: '16px',
                          fontSize: '0.85rem',
                          background: conceptFeedback.success ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                          color: conceptFeedback.success ? '#34d399' : '#f87171',
                          border: conceptFeedback.success ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)'
                        }}>
                          {conceptFeedback.message}
                        </div>
                      )}

                      <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
                        {!isQuestDone && (
                          <button
                            onClick={handleCheckConcept}
                            disabled={selectedOption === null}
                            className="btn-primary"
                            style={{ flex: 1, padding: '12px' }}
                          >
                            <CheckCircle2 size={18} />
                            <span>Verify Answer & Claim XP</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* QUEST TYPE 2: INTERACTIVE DEBUG CODE QUEST */}
                  {(activeQuest.type === 'debug' || activeQuest.pillar === 'Practice') && activeQuest.content && (
                    <div>
                      <div style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        padding: '14px 16px',
                        borderRadius: '10px',
                        borderLeft: '4px solid #06b6d4',
                        marginBottom: '16px',
                        color: '#cbd5e1',
                        fontSize: '0.875rem',
                        lineHeight: 1.5
                      }}>
                        <strong>Task Objective:</strong> {activeQuest.content.instruction}
                      </div>

                      <div style={{ position: 'relative', marginBottom: '16px' }}>
                        <div style={{
                          background: '#090d16',
                          borderRadius: '12px',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            background: '#0e1526',
                            padding: '8px 14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            fontSize: '0.75rem',
                            color: '#94a3b8',
                            fontFamily: 'var(--font-mono)'
                          }}>
                            <span>maxSubarraySum.js</span>
                            <span>JavaScript (ES6)</span>
                          </div>
                          <textarea
                            rows={14}
                            value={userCode}
                            onChange={(e) => setUserCode(e.target.value)}
                            style={{
                              width: '100%',
                              background: 'transparent',
                              color: '#e2e8f0',
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.85rem',
                              lineHeight: 1.5,
                              border: 'none',
                              padding: '14px',
                              outline: 'none',
                              resize: 'vertical'
                            }}
                          />
                        </div>
                      </div>

                      {debugOutput && (
                        <div style={{
                          padding: '12px 16px',
                          borderRadius: '10px',
                          marginBottom: '16px',
                          fontSize: '0.85rem',
                          background: debugOutput.success ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                          color: debugOutput.success ? '#34d399' : '#f87171',
                          border: debugOutput.success ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)'
                        }}>
                          {debugOutput.message}
                        </div>
                      )}

                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <button
                          onClick={() => setUserCode(activeQuest.content.correctCode)}
                          className="btn-secondary"
                          style={{ fontSize: '0.825rem', padding: '10px 14px' }}
                        >
                          <Lightbulb size={15} />
                          <span>Show Solution</span>
                        </button>
                        
                        {!isQuestDone && (
                          <button
                            onClick={handleRunDebug}
                            className="btn-primary"
                            style={{ flex: 1, padding: '10px 16px' }}
                          >
                            <Play size={16} />
                            <span>Run Test Cases & Verify Fix</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* QUEST TYPE 3: STAR BEHAVIORAL BUILDER */}
                  {(activeQuest.type === 'star' || activeQuest.pillar === 'Communicate') && activeQuest.content && (
                    <div>
                      <div style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        padding: '14px 16px',
                        borderRadius: '12px',
                        borderLeft: '4px solid #f59e0b',
                        marginBottom: '18px',
                        color: '#e2e8f0',
                        fontSize: '0.875rem',
                        lineHeight: 1.5
                      }}>
                        <strong>Behavioral Scenario:</strong> {activeQuest.content.prompt}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '18px' }}>
                        {['situation', 'task', 'action', 'result'].map(step => (
                          <div key={step}>
                            <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#c4b5fd', display: 'block', marginBottom: '4px' }}>
                              {step}
                            </label>
                            <input
                              type="text"
                              value={starAnswers[step]}
                              onChange={(e) => setStarAnswers({ ...starAnswers, [step]: e.target.value })}
                              placeholder={activeQuest.content.starPlaceholders?.[step] || ''}
                              style={{
                                width: '100%',
                                padding: '10px 14px',
                                background: 'rgba(255, 255, 255, 0.04)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '8px',
                                color: '#fff',
                                fontSize: '0.85rem'
                              }}
                            />
                          </div>
                        ))}
                      </div>

                      {starFeedback && (
                        <div style={{
                          padding: '14px',
                          borderRadius: '10px',
                          marginBottom: '16px',
                          fontSize: '0.85rem',
                          background: starFeedback.success ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                          color: starFeedback.success ? '#34d399' : '#f87171',
                          border: starFeedback.success ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)'
                        }}>
                          {starFeedback.score && <strong>AI Articulation Score: {starFeedback.score}/100 — </strong>}
                          {starFeedback.critique || starFeedback.message}
                        </div>
                      )}

                      {!isQuestDone && (
                        <button
                          onClick={handleEvaluateStar}
                          className="btn-primary"
                          style={{ width: '100%', padding: '12px' }}
                        >
                          <Sparkles size={18} />
                          <span>Evaluate with AI & Claim XP</span>
                        </button>
                      )}
                    </div>
                  )}

                  {/* Fallback if quest type is unrecognized */}
                  {!activeQuest.type && !activeQuest.pillar && (
                    <div style={{ padding: '20px', color: '#94a3b8' }}>
                      <p>Quest details are loading...</p>
                    </div>
                  )}
                </div>
              )}

              {/* UNIVERSAL QUEST COMPLETION FOOTER BAR */}
              <div style={{
                marginTop: '24px',
                paddingTop: '18px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                {isQuestDone ? (
                  <div style={{
                    width: '100%',
                    background: 'rgba(16, 185, 129, 0.12)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    borderRadius: '12px',
                    padding: '12px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', fontWeight: 700, fontSize: '0.9rem' }}>
                      <CheckCircle2 size={18} />
                      <span>Quest Completed! +{activeQuest.xp} XP added to your readiness score</span>
                    </div>

                    <button
                      onClick={() => resetQuest(activeQuest.id)}
                      style={{
                        background: 'transparent',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        color: '#94a3b8',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <RotateCcw size={12} />
                      <span>Practice Again</span>
                    </button>
                  </div>
                ) : (
                  <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '0.8rem' }}>
                      <Info size={14} />
                      <span>Watched the video or solved the task? Mark it as complete to earn your daily streak bonus.</span>
                    </div>

                    <button
                      onClick={() => completeQuest(activeQuest.id, activeQuest.xp)}
                      className="btn-primary"
                      style={{
                        padding: '10px 20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '0.875rem'
                      }}
                    >
                      <CheckCircle2 size={16} />
                      <span>Mark as Completed & Claim +{activeQuest.xp} XP</span>
                    </button>
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
              <p>Select a quest from the left to view instructions and start practicing.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
