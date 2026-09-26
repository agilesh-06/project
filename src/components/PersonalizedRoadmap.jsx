// ==========================================================================
// SkillTree.AI - Personalized Adaptive 7-Day Roadmap
// Dynamically assigns daily tasks based on domain and diagnostic test performance:
// - Lower performance (<75%): Foundations Track (Core Basics & Remediation)
// - Well-versed performance (>=75%): Advanced Mastery Track (Enhanced & System Design Challenges)
// Strictly NO emojis.
// ==========================================================================
import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Flame, 
  Target, 
  Check, 
  Award,
  HelpCircle,
  Zap,
  BookOpen,
  SlidersHorizontal,
  Layers,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getAdaptiveTasksForRole, ADAPTIVE_TRACKS } from '../data/adaptiveTasksData';

export default function PersonalizedRoadmap({ 
  targetRole = 'Software Developer', 
  assessmentResults, 
  onAddXp, 
  onNavigateToTab 
}) {
  // Determine score from assessment or default to 50
  const score = assessmentResults?.scorePercent ?? (
    assessmentResults?.categoryScores?.[targetRole] ?? 50
  );

  const roleTracks = ADAPTIVE_TRACKS[targetRole] || ADAPTIVE_TRACKS['Software Developer'];
  const defaultIsAdvanced = score >= 75;

  // Track selection state: 'foundations' | 'advanced'
  const [activeTrackKey, setActiveTrackKey] = useState(defaultIsAdvanced ? 'advanced' : 'foundations');
  const [completedDays, setCompletedDays] = useState({});

  // Sync track when role or assessmentResults changes
  useEffect(() => {
    const isAdv = (assessmentResults?.scorePercent ?? 50) >= 75;
    setActiveTrackKey(isAdv ? 'advanced' : 'foundations');
  }, [targetRole, assessmentResults?.scorePercent]);

  const currentTrackData = activeTrackKey === 'advanced' ? roleTracks.advanced : roleTracks.foundations;
  const daysList = currentTrackData.days;

  const handleToggleDay = (dayNum, xp) => {
    const key = `${targetRole}_${activeTrackKey}_day${dayNum}`;
    const wasCompleted = Boolean(completedDays[key]);
    const nextState = !wasCompleted;

    setCompletedDays(prev => ({
      ...prev,
      [key]: nextState
    }));

    if (nextState) {
      confetti({
        particleCount: 65,
        spread: 65,
        origin: { y: 0.6 },
        colors: activeTrackKey === 'advanced' ? ['#10b981', '#06b6d4', '#8b5cf6'] : ['#f59e0b', '#8b5cf6', '#06b6d4']
      });
      if (onAddXp) onAddXp(xp);
    }
  };

  const completedCount = daysList.filter(d => completedDays[`${targetRole}_${activeTrackKey}_day${d.day}`]).length;
  const progressPct = Math.round((completedCount / daysList.length) * 100);

  return (
    <div style={{ maxWidth: '920px', margin: '0 auto', padding: '24px 20px' }}>
      
      {/* Header Banner */}
      <div style={{
        background: activeTrackKey === 'advanced'
          ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 182, 212, 0.12) 100%)'
          : 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(139, 92, 246, 0.12) 100%)',
        border: activeTrackKey === 'advanced'
          ? '1px solid rgba(16, 185, 129, 0.35)'
          : '1px solid rgba(245, 158, 11, 0.35)',
        borderRadius: '24px',
        padding: '28px 32px',
        marginBottom: '26px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
              <span style={{
                background: activeTrackKey === 'advanced' ? 'rgba(16, 185, 129, 0.25)' : 'rgba(245, 158, 11, 0.25)',
                color: activeTrackKey === 'advanced' ? '#34d399' : '#fbbf24',
                fontSize: '0.75rem',
                fontWeight: 800,
                padding: '3px 10px',
                borderRadius: '99px',
                border: activeTrackKey === 'advanced' ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(245, 158, 11, 0.4)',
                textTransform: 'uppercase'
              }}>
                {currentTrackData.trackName} · {currentTrackData.trackTier}
              </span>

              <span style={{ fontSize: '0.8rem', color: '#cbd5e1' }}>
                Target Role: <strong>{targetRole}</strong>
              </span>
            </div>

            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 6px' }}>
              {activeTrackKey === 'advanced' ? 'Enhanced Advanced Mastery Sprint' : 'Foundations & Basics Remediation Sprint'}
            </h1>

            <p style={{ color: '#cbd5e1', fontSize: '0.875rem', margin: 0, maxWidth: '680px', lineHeight: 1.5 }}>
              {activeTrackKey === 'advanced'
                ? `Assigned because your diagnostic score was ${score}% (>=75%). You have unlocked production-scale architecture, system design, and performance tasks.`
                : `Assigned because your diagnostic score was ${score}% (<75%). Step-by-step daily foundational tasks to master the essentials before advancing.`}
            </p>
          </div>

          <div style={{ textAlign: 'right', background: 'rgba(0,0,0,0.3)', padding: '12px 18px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>Sprint Progress</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: activeTrackKey === 'advanced' ? '#34d399' : '#fbbf24' }}>
              {completedCount} of 7 Days Done
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '99px', overflow: 'hidden', marginBottom: '16px' }}>
          <div style={{
            width: `${progressPct}%`,
            height: '100%',
            background: activeTrackKey === 'advanced'
              ? 'linear-gradient(90deg, #10b981, #06b6d4)'
              : 'linear-gradient(90deg, #f59e0b, #8b5cf6)',
            borderRadius: '99px',
            transition: 'width 0.4s ease'
          }} />
        </div>

        {/* Track Switcher Tabs (Foundations vs Advanced) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(0, 0, 0, 0.25)',
          padding: '6px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => setActiveTrackKey('foundations')}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: 'none',
                background: activeTrackKey === 'foundations' ? 'rgba(245, 158, 11, 0.25)' : 'transparent',
                color: activeTrackKey === 'foundations' ? '#fbbf24' : '#94a3b8',
                fontWeight: activeTrackKey === 'foundations' ? 800 : 500,
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <Target size={14} />
              <span>Foundations Track (Basics)</span>
              {score < 75 && (
                <span style={{ fontSize: '0.65rem', background: '#f59e0b', color: '#000', padding: '1px 6px', borderRadius: '4px', fontWeight: 800 }}>
                  Assigned
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTrackKey('advanced')}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: 'none',
                background: activeTrackKey === 'advanced' ? 'rgba(16, 185, 129, 0.25)' : 'transparent',
                color: activeTrackKey === 'advanced' ? '#34d399' : '#94a3b8',
                fontWeight: activeTrackKey === 'advanced' ? 800 : 500,
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              <Award size={14} />
              <span>Advanced Mastery Track (Enhanced Tasks)</span>
              {score >= 75 && (
                <span style={{ fontSize: '0.65rem', background: '#10b981', color: '#000', padding: '1px 6px', borderRadius: '4px', fontWeight: 800 }}>
                  Assigned
                </span>
              )}
            </button>
          </div>

          <button
            onClick={() => onNavigateToTab('assessment')}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#c4b5fd',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span>Retake Diagnostic Test</span>
            <ArrowUpRight size={13} />
          </button>
        </div>
      </div>

      {/* 7 Daily Adaptive Task Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
        {daysList.map((item) => {
          const key = `${targetRole}_${activeTrackKey}_day${item.day}`;
          const isDone = Boolean(completedDays[key]);

          return (
            <div
              key={item.day}
              style={{
                background: isDone 
                  ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(15, 23, 42, 0.9) 100%)' 
                  : 'rgba(255, 255, 255, 0.025)',
                border: isDone 
                  ? '1px solid rgba(16, 185, 129, 0.4)' 
                  : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '18px',
                padding: '22px 24px',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                transition: 'all 0.2s ease',
                boxShadow: isDone ? '0 4px 20px rgba(16, 185, 129, 0.1)' : 'none'
              }}
            >
              <div style={{ display: 'flex', gap: '16px', flex: 1, minWidth: '280px' }}>
                {/* Day Badge */}
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: isDone 
                    ? 'rgba(16, 185, 129, 0.2)' 
                    : (activeTrackKey === 'advanced' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)'),
                  border: isDone 
                    ? '1px solid #10b981' 
                    : (activeTrackKey === 'advanced' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)'),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isDone 
                    ? '#34d399' 
                    : (activeTrackKey === 'advanced' ? '#34d399' : '#fbbf24'),
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  flexShrink: 0
                }}>
                  {isDone ? <Check size={22} /> : `D${item.day}`}
                </div>

                <div style={{ flex: 1 }}>
                  {/* Top Day Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '6px' }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                      {item.title}
                    </h2>

                    <span style={{
                      fontSize: '0.675rem',
                      fontWeight: 700,
                      padding: '2px 7px',
                      borderRadius: '4px',
                      background: item.difficulty === 'Advanced' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                      color: item.difficulty === 'Advanced' ? '#34d399' : '#fbbf24',
                      border: item.difficulty === 'Advanced' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(245, 158, 11, 0.3)'
                    }}>
                      {item.difficulty} Task
                    </span>

                    {isDone && (
                      <span style={{ fontSize: '0.675rem', fontWeight: 800, color: '#10b981', background: 'rgba(16, 185, 129, 0.15)', padding: '2px 8px', borderRadius: '4px' }}>
                        Completed
                      </span>
                    )}
                  </div>

                  {/* Goal */}
                  <p style={{ color: '#e2e8f0', fontSize: '0.875rem', margin: '0 0 10px', lineHeight: 1.45 }}>
                    <strong>Goal:</strong> {item.goal}
                  </p>

                  {/* Hands-on Exercise */}
                  <div style={{
                    background: 'rgba(6, 182, 212, 0.05)',
                    border: '1px solid rgba(6, 182, 212, 0.2)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    fontSize: '0.8rem',
                    color: '#67e8f9',
                    marginBottom: '8px'
                  }}>
                    <strong style={{ color: '#a5f3fc' }}>Key Exercise:</strong> {item.keyExercise}
                  </div>

                  {/* Placement Interviewer Rationale */}
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    fontSize: '0.78rem',
                    color: '#94a3b8',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '6px',
                    marginBottom: '10px'
                  }}>
                    <HelpCircle size={14} color="#8b5cf6" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>Interviewer Expectation:</strong> {item.why}</span>
                  </div>

                  {/* Duration & XP tags */}
                  <div style={{ display: 'flex', gap: '14px', fontSize: '0.75rem', color: '#94a3b8' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={13} />
                      <span>{item.duration}</span>
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24', fontWeight: 600 }}>
                      <Zap size={13} />
                      <span>+{item.xp} XP</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Complete / Incomplete Button */}
              <button
                onClick={() => handleToggleDay(item.day, item.xp)}
                style={{
                  background: isDone 
                    ? 'rgba(16, 185, 129, 0.15)' 
                    : (activeTrackKey === 'advanced' 
                        ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
                        : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'),
                  border: isDone ? '1px solid #10b981' : 'none',
                  color: isDone ? '#34d399' : '#ffffff',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: isDone ? 'none' : '0 4px 12px rgba(0, 0, 0, 0.3)',
                  transition: 'all 0.15s ease'
                }}
              >
                {isDone ? <Check size={16} /> : null}
                <span>{isDone ? 'Mark Incomplete' : 'Complete Day'}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer Navigation */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '16px',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ fontWeight: 800, color: '#f8fafc', fontSize: '0.95rem' }}>
            Want to test yourself or practice live?
          </div>
          <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
            You can retake the diagnostic assessment or talk to the AI Voice Assistant.
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => onNavigateToTab('assessment')}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#f8fafc',
              padding: '10px 18px',
              borderRadius: '10px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <span>Retake Sector Test</span>
          </button>

          <button
            onClick={() => onNavigateToTab('quests')}
            className="btn-primary"
            style={{
              padding: '10px 18px',
              fontSize: '0.85rem'
            }}
          >
            <span>Practice Daily Quests</span>
          </button>
        </div>
      </div>

    </div>
  );
}
