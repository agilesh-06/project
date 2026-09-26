import React, { useState } from 'react';
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
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PersonalizedRoadmap({ 
  targetRole, 
  assessmentResults, 
  onAddXp, 
  onNavigateToTab 
}) {
  const dsaScore = assessmentResults?.categoryScores?.DSA ?? 45;

  const initialDays = [
    {
      day: 1,
      title: 'Day 1 · Two-Pointer Array Basics',
      goal: 'Master two pointers: solve Two Sum II and Valid Palindrome.',
      duration: '30 mins',
      xp: 150,
      completed: true,
      why: `Tested in 85% of ${targetRole} interviews. It replaces slow double loops with clean single-pass scans.`
    },
    {
      day: 2,
      title: 'Day 2 · Sliding Window Technique',
      goal: 'Understand how a fixed vs dynamic window finds subarray maximums and unique substrings.',
      duration: '35 mins',
      xp: 150,
      completed: false,
      why: `Essential pattern for strings and arrays. Companies love asking this to see if you avoid out-of-bounds errors.`
    },
    {
      day: 3,
      title: 'Day 3 · Trees & Level-Order BFS',
      goal: 'Traverse a binary tree level-by-level using a standard Queue.',
      duration: '30 mins',
      xp: 200,
      completed: false,
      why: `Standard Round 1 technical interview question. Level-order BFS is the easiest tree algorithm to master.`
    },
    {
      day: 4,
      title: 'Day 4 · Database Indexing in Plain English',
      goal: 'Learn why B+Trees beat hash tables for range queries, and read a simple SQL query explain plan.',
      duration: '25 mins',
      xp: 150,
      completed: false,
      why: `Guaranteed question for backend and software roles. Interviewers test if you understand database speed.`
    },
    {
      day: 5,
      title: 'Day 5 · Caching & Redis Fundamentals',
      goal: 'Understand Cache-Aside pattern: check cache first, read database on cache-miss.',
      duration: '30 mins',
      xp: 200,
      completed: false,
      why: `Shows you understand real production systems without needing years of experience.`
    },
    {
      day: 6,
      title: 'Day 6 · 60-Second STAR Story Practice',
      goal: 'Structure one proud project story: Situation, Task, Action, and Measurable Result.',
      duration: '20 mins',
      xp: 150,
      completed: false,
      why: `HR and hiring managers evaluate this in every single interview. A clear STAR story guarantees a great impression.`
    },
    {
      day: 7,
      title: 'Day 7 · Full Placement Simulation Round',
      goal: 'Practice speaking your answers out loud with the AI Voice Mentor without filler words.',
      duration: '25 mins',
      xp: 250,
      completed: false,
      why: `Converts your technical preparation into confident, calm verbal delivery for interview day.`
    }
  ];

  const [days, setDays] = useState(initialDays);

  const handleToggleDay = (dayNum, xp) => {
    setDays(prev => prev.map(d => {
      if (d.day === dayNum) {
        const nextState = !d.completed;
        if (nextState) {
          confetti({
            particleCount: 60,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#8b5cf6', '#10b981', '#f59e0b', '#06b6d4']
          });
          onAddXp(xp);
        }
        return { ...d, completed: nextState };
      }
      return d;
    }));
  };

  const completedCount = days.filter(d => d.completed).length;
  const progressPct = Math.round((completedCount / days.length) * 100);

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', padding: '24px 20px' }}>
      
      {/* Clean, Calming Header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.16) 0%, rgba(6, 182, 212, 0.12) 100%)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        borderRadius: '24px',
        padding: '28px 32px',
        marginBottom: '28px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '14px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(139, 92, 246, 0.25)', color: '#c4b5fd', fontSize: '0.75rem', fontWeight: 800, padding: '3px 10px', borderRadius: '99px', marginBottom: '8px' }}>
              <span>7-DAY SPRINT</span>
              <span>·</span>
              <span>{targetRole}</span>
            </div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
              Your Clear, Step-by-Step Roadmap
            </h1>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', margin: '6px 0 0' }}>
              No 500-question grind. Just 1 bite-sized mission per day (~30 mins) tailored for {targetRole}.
            </p>
          </div>

          <div style={{ textAlign: 'right', background: 'rgba(0,0,0,0.3)', padding: '12px 18px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>Sprint Progress</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34d399' }}>
              {completedCount} of 7 Days Done
            </div>
          </div>
        </div>

        {/* Clean Progress Bar */}
        <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '99px', overflow: 'hidden' }}>
          <div style={{ width: `${progressPct}%`, height: '100%', background: 'linear-gradient(90deg, #8b5cf6, #10b981)', borderRadius: '99px', transition: 'width 0.4s ease' }} />
        </div>
      </div>

      {/* 7 Clean Day Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
        {days.map((item) => {
          const isDone = item.completed;
          return (
            <div
              key={item.day}
              style={{
                background: isDone 
                  ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(15, 23, 42, 0.85) 100%)' 
                  : 'rgba(255, 255, 255, 0.02)',
                border: isDone ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '18px',
                padding: '22px 24px',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', gap: '16px', flex: 1, minWidth: '280px' }}>
                {/* Day Badge */}
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: isDone ? 'rgba(16, 185, 129, 0.2)' : 'rgba(139, 92, 246, 0.15)',
                  border: isDone ? '1px solid #10b981' : '1px solid rgba(139, 92, 246, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isDone ? '#34d399' : '#c4b5fd',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  flexShrink: 0
                }}>
                  {isDone ? <Check size={20} /> : `D${item.day}`}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                      {item.title}
                    </h2>
                    {isDone && (
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#10b981', background: 'rgba(16, 185, 129, 0.15)', padding: '2px 8px', borderRadius: '4px' }}>
                        Completed
                      </span>
                    )}
                  </div>

                  {/* Single clear goal */}
                  <p style={{ color: '#e2e8f0', fontSize: '0.9rem', margin: '0 0 10px', lineHeight: 1.45 }}>
                    <strong>Goal:</strong> {item.goal}
                  </p>

                  {/* Why am I doing this? */}
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    fontSize: '0.8rem',
                    color: '#94a3b8',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '6px',
                    marginBottom: '10px'
                  }}>
                    <HelpCircle size={14} color="#8b5cf6" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong>Why this?</strong> {item.why}</span>
                  </div>

                  {/* Duration & XP tags */}
                  <div style={{ display: 'flex', gap: '12px', fontSize: '0.75rem', color: '#94a3b8' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={13} />
                      <span>{item.duration}</span>
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24' }}>
                      <Zap size={13} />
                      <span>+{item.xp} XP</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Complete / Toggle Button */}
              <button
                onClick={() => handleToggleDay(item.day, item.xp)}
                style={{
                  background: isDone 
                    ? 'rgba(16, 185, 129, 0.15)' 
                    : 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
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
                  boxShadow: isDone ? 'none' : '0 4px 12px rgba(139, 92, 246, 0.4)',
                  transition: 'all 0.15s ease'
                }}
              >
                {isDone ? <Check size={16} /> : null}
                <span>{isDone ? 'Mark Incomplete' : 'Mark Complete'}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Quick Action Footer */}
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
            Want to practice today's concepts out loud?
          </div>
          <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
            Talk to Nova, your AI Voice Mentor, or try today's 3 micro-quests.
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => onNavigateToTab('voice')}
            style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
              color: '#ffffff',
              border: 'none',
              padding: '10px 18px',
              borderRadius: '10px',
              fontSize: '0.85rem',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            <span>Talk to AI Guide</span>
          </button>

          <button
            onClick={() => onNavigateToTab('quests')}
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
            <span>Today's 3 Micro-Quests</span>
          </button>
        </div>
      </div>

    </div>
  );
}
