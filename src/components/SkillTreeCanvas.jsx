import React, { useState } from 'react';
import { 
  Layers, 
  GitBranch, 
  Cpu, 
  Network, 
  Database, 
  Zap, 
  Boxes, 
  Sparkles, 
  Mic, 
  Lock, 
  CheckCircle2, 
  PlayCircle,
  HelpCircle,
  ChevronRight,
  X,
  Award,
  BookOpen,
  Target
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PRESET_ROLES } from '../data/rolesData';

const ICON_MAP = {
  Layers,
  GitBranch,
  Cpu,
  Network,
  Database,
  Zap,
  Boxes,
  Sparkles,
  Mic
};

export default function SkillTreeCanvas({ 
  skills, 
  onMasterSkill,
  onUnlockSkill,
  targetRole,
  onOpenRoleSelector
}) {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [activeTierFilter, setActiveTierFilter] = useState('all');

  // Trigger celebration confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b']
    });
  };

  const handleMasterCurrent = (skillId) => {
    triggerConfetti();
    onMasterSkill(skillId);
    setSelectedSkill(prev => prev ? { ...prev, status: 'mastered' } : null);
  };

  // Find node by id
  const getSkill = (id) => skills.find(s => s.id === id);

  // Compute SVG connections
  const connections = [];
  skills.forEach(target => {
    if (target.prerequisites && target.prerequisites.length > 0) {
      target.prerequisites.forEach(preId => {
        const source = getSkill(preId);
        if (source) {
          const isMastered = source.status === 'mastered' && target.status === 'mastered';
          const isInProgress = target.status === 'in-progress';
          connections.push({
            id: `${source.id}->${target.id}`,
            source,
            target,
            status: isMastered ? 'mastered' : (isInProgress ? 'active' : 'locked')
          });
        }
      });
    }
  });

  const filteredSkills = activeTierFilter === 'all' 
    ? skills 
    : skills.filter(s => s.tier.toString() === activeTierFilter);

  const currentRolePreset = PRESET_ROLES.find(r => r.title === targetRole) || PRESET_ROLES[0];
  const requiredNodeIds = currentRolePreset?.requiredSkills || [];
  const masteredCount = skills.filter(s => requiredNodeIds.includes(s.id) && s.status === 'mastered').length;

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '85vh', padding: '24px 0' }}>
      
      {/* Target Role Active Banner */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto 16px',
        padding: '0 20px'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(6, 182, 212, 0.08) 100%)',
          border: '1px solid rgba(139, 92, 246, 0.35)',
          borderRadius: '16px',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              background: 'rgba(139, 92, 246, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Target size={18} color="#c4b5fd" />
            </div>
            <div>
              <div style={{ fontSize: '0.725rem', color: '#a78bfa', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Active Target Role Track:
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#f8fafc' }}>
                {targetRole} <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600, marginLeft: '8px' }}>({masteredCount}/{requiredNodeIds.length} Required Skills Mastered)</span>
              </div>
            </div>
          </div>

          <button
            onClick={onOpenRoleSelector}
            className="btn-secondary"
            style={{ fontSize: '0.8rem', padding: '8px 16px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Target size={14} color="#a78bfa" />
            <span>Select / Switch Role ▾</span>
          </button>
        </div>
      </div>

      {/* Top Banner / Filter Toolbar */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto 20px',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>
              RPG Placement Skill Tree
            </h1>
            <span style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(6, 182, 212, 0.2))',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#34d399',
              padding: '3px 10px',
              borderRadius: '99px',
              fontSize: '0.75rem',
              fontWeight: 700
            }}>
              Interactive Progression
            </span>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '4px' }}>
            Complete quests and verify key interview concepts to unlock higher-tier nodes. Every unlocked node raises your job match score!
          </p>
        </div>

        {/* Tier filter tabs */}
        <div style={{
          display: 'flex',
          background: 'rgba(255, 255, 255, 0.04)',
          padding: '4px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          gap: '4px'
        }}>
          {[
            { id: 'all', label: 'All Tiers' },
            { id: '1', label: 'Tier 1: Foundations' },
            { id: '2', label: 'Tier 2: DSA & Data' },
            { id: '3', label: 'Tier 3: System Design' },
            { id: '4', label: 'Tier 4: Live Whiteboard' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTierFilter(t.id)}
              style={{
                background: activeTierFilter === t.id ? '#8b5cf6' : 'transparent',
                color: activeTierFilter === t.id ? '#fff' : '#94a3b8',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.785rem',
                fontWeight: activeTierFilter === t.id ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive RPG Canvas Card */}
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        <div style={{
          position: 'relative',
          width: '100%',
          height: '750px',
          background: 'radial-gradient(ellipse at center, #0e1526 0%, #07090e 100%)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
        }}>

          {/* Background Grid Pattern */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            pointerEvents: 'none'
          }} />

          {/* Tier Label Markers */}
          <div style={{
            position: 'absolute',
            top: '20px',
            left: '40px',
            display: 'flex',
            gap: '240px',
            pointerEvents: 'none',
            opacity: 0.4
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8' }}>
              Tier 1: Foundations
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8' }}>
              Tier 2: Core DSA & Data
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8' }}>
              Tier 3: Distributed Systems
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#94a3b8' }}>
              Tier 4: Live Whiteboard
            </div>
          </div>

          {/* SVG Connection Cables */}
          <svg style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1
          }}>
            <defs>
              <linearGradient id="masteredGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>
              <linearGradient id="activeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>

            {connections.map(conn => {
              const startX = conn.source.position.x + 95;
              const startY = conn.source.position.y + 45;
              const endX = conn.target.position.x + 95;
              const endY = conn.target.position.y + 45;

              // Cubic bezier curve path
              const dx = (endX - startX) * 0.5;
              const pathD = `M ${startX} ${startY} C ${startX + dx} ${startY}, ${endX - dx} ${endY}, ${endX} ${endY}`;

              let stroke = 'rgba(255, 255, 255, 0.12)';
              let strokeWidth = 2;
              let isFlowing = false;

              if (conn.status === 'mastered') {
                stroke = 'url(#masteredGrad)';
                strokeWidth = 3;
              } else if (conn.status === 'active') {
                stroke = 'url(#activeGrad)';
                strokeWidth = 3;
                isFlowing = true;
              }

              return (
                <g key={conn.id}>
                  {/* Outer glow line if active */}
                  {(conn.status === 'mastered' || conn.status === 'active') && (
                    <path
                      d={pathD}
                      fill="none"
                      stroke={conn.status === 'mastered' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(139, 92, 246, 0.3)'}
                      strokeWidth={8}
                    />
                  )}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    strokeDasharray={conn.status === 'locked' ? '4 4' : (isFlowing ? '6 6' : 'none')}
                    className={isFlowing ? 'flow-line' : ''}
                  />
                </g>
              );
            })}
          </svg>

          {/* Interactive Skill Nodes */}
          {skills.map(node => {
            const Icon = ICON_MAP[node.icon] || Sparkles;
            const isMastered = node.status === 'mastered';
            const isInProgress = node.status === 'in-progress';
            const isLocked = node.status === 'locked';

            // Filter check
            const isDimmed = activeTierFilter !== 'all' && node.tier.toString() !== activeTierFilter;

            return (
              <div
                key={node.id}
                onClick={() => setSelectedSkill(node)}
                style={{
                  position: 'absolute',
                  left: `${node.position.x}px`,
                  top: `${node.position.y}px`,
                  width: '190px',
                  zIndex: 10,
                  cursor: isLocked ? 'not-allowed' : 'pointer',
                  opacity: isDimmed ? 0.25 : (isLocked ? 0.6 : 1),
                  transform: selectedSkill?.id === node.id ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  filter: isMastered 
                    ? 'drop-shadow(0 0 16px rgba(16, 185, 129, 0.35))' 
                    : (isInProgress ? 'drop-shadow(0 0 16px rgba(139, 92, 246, 0.4))' : 'none')
                }}
              >
                {/* Target Role Badge if required */}
                {requiredNodeIds.includes(node.id) && (
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    right: '12px',
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
                    color: '#ffffff',
                    fontSize: '0.625rem',
                    fontWeight: 800,
                    padding: '2px 8px',
                    borderRadius: '99px',
                    boxShadow: '0 0 12px rgba(139, 92, 246, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    zIndex: 20,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px'
                  }}>
                    <Target size={10} />
                    <span>Target Core</span>
                  </div>
                )}

                {/* Node Card */}
                <div style={{
                  background: isMastered 
                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(13, 27, 24, 0.9) 100%)'
                    : (isInProgress 
                      ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(19, 23, 40, 0.9) 100%)'
                      : 'rgba(18, 24, 38, 0.8)'),
                  backdropFilter: 'blur(12px)',
                  borderRadius: '16px',
                  border: isMastered 
                    ? '2px solid rgba(16, 185, 129, 0.6)' 
                    : (isInProgress 
                      ? '2px solid rgba(139, 92, 246, 0.7)' 
                      : '1px solid rgba(255, 255, 255, 0.1)'),
                  padding: '12px 14px',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)'
                }}>
                  {/* Top Status & Tier */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      color: isMastered ? '#34d399' : (isInProgress ? '#a78bfa' : '#64748b'),
                      letterSpacing: '0.04em'
                    }}>
                      T{node.tier} · {node.category}
                    </span>

                    {/* Status Pill */}
                    {isMastered && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#10b981', fontSize: '0.7rem', fontWeight: 700 }}>
                        <CheckCircle2 size={13} />
                        <span>Mastered</span>
                      </span>
                    )}
                    {isInProgress && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#a78bfa', fontSize: '0.7rem', fontWeight: 700 }}>
                        <PlayCircle size={13} />
                        <span>Active</span>
                      </span>
                    )}
                    {isLocked && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#64748b', fontSize: '0.7rem' }}>
                        <Lock size={12} />
                        <span>Locked</span>
                      </span>
                    )}
                  </div>

                  {/* Icon & Title */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: isMastered 
                        ? 'rgba(16, 185, 129, 0.2)' 
                        : (isInProgress ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)'),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon size={18} color={isMastered ? '#10b981' : (isInProgress ? '#a78bfa' : '#64748b')} />
                    </div>
                    <div>
                      <div style={{ 
                        fontSize: '0.85rem', 
                        fontWeight: 700, 
                        color: isLocked ? '#94a3b8' : '#f8fafc',
                        lineHeight: 1.2
                      }}>
                        {node.title}
                      </div>
                      <div style={{ 
                        fontSize: '0.7rem', 
                        color: isMastered ? '#34d399' : '#818cf8', 
                        fontWeight: 600,
                        marginTop: '2px' 
                      }}>
                        +{node.xp} XP
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Bottom Left Legend */}
          <div style={{
            position: 'absolute',
            bottom: '18px',
            left: '20px',
            background: 'rgba(11, 16, 27, 0.85)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            padding: '8px 16px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: '0.75rem',
            color: '#94a3b8'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }} />
              <span>Mastered (+XP Claimed)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8b5cf6', boxShadow: '0 0 8px #8b5cf6' }} />
              <span>Active Quest</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#64748b' }} />
              <span>Prerequisites Required</span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Node Detail Drawer / Modal */}
      {selectedSkill && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '20px'
        }} onClick={() => setSelectedSkill(null)}>
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '680px',
              background: '#0d1322',
              borderRadius: '20px',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(139, 92, 246, 0.2)',
              overflow: 'hidden',
              animation: 'fadeIn 0.2s ease-out'
            }}
          >
            {/* Drawer Header */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(6, 182, 212, 0.1) 100%)',
              padding: '20px 24px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    background: 'rgba(139, 92, 246, 0.3)',
                    color: '#c4b5fd',
                    padding: '2px 8px',
                    borderRadius: '99px'
                  }}>
                    Tier {selectedSkill.tier} · {selectedSkill.tierName}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>
                    +{selectedSkill.xp} XP Bounty
                  </span>
                </div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                  {selectedSkill.title}
                </h2>
              </div>
              <button 
                onClick={() => setSelectedSkill(null)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: 'none',
                  color: '#94a3b8',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '24px', maxHeight: '70vh', overflowY: 'auto' }}>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px' }}>
                {selectedSkill.summary}
              </p>

              {/* Key Concepts */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <BookOpen size={16} color="#38bdf8" />
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    What Top Companies Test:
                  </h3>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedSkill.keyConcepts.map((concept, idx) => (
                    <li key={idx} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      fontSize: '0.85rem',
                      color: '#e2e8f0'
                    }}>
                      <ChevronRight size={14} color="#8b5cf6" style={{ marginTop: '3px', flexShrink: 0 }} />
                      <span>{concept}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Common Interview Questions */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                  <HelpCircle size={16} color="#fbbf24" />
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Must-Know Interview Prompts:
                  </h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {selectedSkill.interviewQuestions.map((q, idx) => (
                    <div key={idx} style={{
                      fontSize: '0.85rem',
                      color: '#cbd5e1',
                      padding: '8px 12px',
                      background: 'rgba(251, 191, 36, 0.05)',
                      borderLeft: '3px solid #f59e0b',
                      borderRadius: '4px'
                    }}>
                      "{q}"
                    </div>
                  ))}
                </div>
              </div>

              {/* Prerequisites check */}
              {selectedSkill.prerequisites.length > 0 && (
                <div style={{
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  marginBottom: '20px'
                }}>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, marginBottom: '6px' }}>
                    Prerequisites:
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {selectedSkill.prerequisites.map(preId => {
                      const pre = getSkill(preId);
                      const isPreMastered = pre?.status === 'mastered';
                      return (
                        <span key={preId} style={{
                          fontSize: '0.75rem',
                          padding: '4px 10px',
                          borderRadius: '99px',
                          background: isPreMastered ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                          color: isPreMastered ? '#34d399' : '#f87171',
                          border: isPreMastered ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          {isPreMastered ? <CheckCircle2 size={12} /> : <Lock size={12} />}
                          {pre?.title || preId}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div style={{
              padding: '16px 24px',
              background: 'rgba(0, 0, 0, 0.3)',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                Status: <strong style={{ color: selectedSkill.status === 'mastered' ? '#10b981' : '#a78bfa' }}>{selectedSkill.status.toUpperCase()}</strong>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                {selectedSkill.status !== 'mastered' ? (
                  <button
                    onClick={() => handleMasterCurrent(selectedSkill.id)}
                    className="btn-primary"
                    style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.35)' }}
                  >
                    <Award size={16} />
                    <span>Master Node (+{selectedSkill.xp} XP)</span>
                  </button>
                ) : (
                  <div style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <CheckCircle2 size={18} />
                    <span>Skill Mastered & Unlocked</span>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
