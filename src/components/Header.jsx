import React from 'react';
import { 
  Sparkles, 
  Flame, 
  Trophy, 
  Users, 
  Compass, 
  FileText, 
  Zap, 
  Mic, 
  BarChart3,
  ShieldAlert,
  Target,
  ChevronDown,
  ClipboardCheck,
  Map,
  UserCheck,
  Layers,
  Bot,
  LogIn,
  UserPlus,
  LogOut,
  User,
  ShieldCheck
} from 'lucide-react';
import { useState } from 'react';
import AIInterestHeaderBlock from './AIInterestHeaderBlock';

export default function Header({ 
  userLevel, 
  currentXp, 
  nextLevelXp, 
  streak, 
  activeTab, 
  setActiveTab,
  targetRole,
  onSelectRole,
  onOpenLeaderboard,
  onOpenRoleSelector,
  onLoadDemoStudent,
  currentUser,
  onOpenAuth,
  onSignOut
}) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const xpPercent = Math.min(100, Math.round((currentXp / nextLevelXp) * 100));

  const navItems = [
    { id: 'interests', label: 'Find My Domain', icon: Compass, badge: 'For Beginners' },
    { id: 'roadmap', label: 'Clear Roadmap', icon: Map, badge: '7-Day Plan' },
    { id: 'voice', label: 'AI Navigator', icon: Bot, badge: 'Gemini AI' },
    { id: 'quests', label: 'Daily Practice', icon: Zap, badge: '3 Tasks' },
    { id: 'dashboard', label: 'Readiness Hub', icon: BarChart3 },
    { id: 'tree', label: 'Skill Tree RPG', icon: Layers },
    { id: 'assessment', label: 'Diagnostic', icon: ClipboardCheck },
    { id: 'jd', label: 'Role & JD Match', icon: FileText },
  ];

  return (
    <header style={{
      background: 'rgba(11, 16, 27, 0.94)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '12px 24px'
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Brand / Logo */}
        <div 
          onClick={() => setActiveTab('dashboard')} 
          style={{ display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)'
          }}>
            <Sparkles size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ 
                fontSize: '1.25rem', 
                fontWeight: 800, 
                letterSpacing: '-0.02em',
                background: 'linear-gradient(to right, #ffffff, #c4b5fd)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                SkillTree.AI
              </span>
              <span style={{
                background: 'rgba(139, 92, 246, 0.2)',
                color: '#a78bfa',
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '99px',
                border: '1px solid rgba(139, 92, 246, 0.3)'
              }}>
                QUESTPREP
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>
              What to prepare · Where you stand · What to do next
            </p>
          </div>
        </div>

        {/* PROMINENT TARGET ROLE SELECTOR BUTTON & DEMO BUTTON */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* Target Role Selector */}
          <button
            onClick={onOpenRoleSelector}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(6, 182, 212, 0.12) 100%)',
              border: '1px solid rgba(139, 92, 246, 0.45)',
              borderRadius: '14px',
              padding: '8px 16px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 0 16px rgba(139, 92, 246, 0.2)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = '#8b5cf6';
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(6, 182, 212, 0.2) 100%)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.45)';
              e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(6, 182, 212, 0.12) 100%)';
            }}
            title="Click to select or change target placement role"
          >
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              background: 'rgba(139, 92, 246, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Target size={16} color="#c4b5fd" />
            </div>

            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#a78bfa', fontWeight: 800, letterSpacing: '0.04em' }}>
                Target Role
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc', lineHeight: 1.2 }}>
                {targetRole}
              </div>
            </div>

            <ChevronDown size={15} color="#94a3b8" style={{ marginLeft: '4px' }} />
          </button>

          {/* USER AUTH STATUS / PROFILE DROPDOWN */}
          {currentUser ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.25) 0%, rgba(6, 182, 212, 0.15) 100%)',
                  border: '1px solid rgba(139, 92, 246, 0.5)',
                  color: '#f8fafc',
                  borderRadius: '12px',
                  padding: '7px 14px',
                  fontSize: '0.825rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 0 12px rgba(139, 92, 246, 0.2)'
                }}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: '#8b5cf6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  color: '#fff'
                }}>
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span>{currentUser.name}</span>
                <ChevronDown size={14} color="#a78bfa" />
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div style={{
                  position: 'absolute',
                  top: '110%',
                  right: 0,
                  width: '260px',
                  background: 'rgba(15, 23, 42, 0.98)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(139, 92, 246, 0.4)',
                  borderRadius: '14px',
                  padding: '14px',
                  zIndex: 100,
                  boxShadow: '0 12px 30px rgba(0, 0, 0, 0.6)'
                }}>
                  <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '10px', marginBottom: '10px' }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#f8fafc' }}>
                      {currentUser.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', wordBreak: 'break-all' }}>
                      {currentUser.email}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px', fontSize: '0.7rem', color: '#10b981' }}>
                      <ShieldCheck size={12} />
                      <span>Encrypted Database Active</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      if (onLoadDemoStudent) onLoadDemoStudent();
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '8px 10px',
                      background: 'transparent',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#cbd5e1',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '4px'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <UserCheck size={14} color="#fbbf24" />
                    <span>Switch to Demo Student</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      if (onOpenAuth) onOpenAuth('config');
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '8px 10px',
                      background: 'transparent',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#cbd5e1',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '4px'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <ShieldCheck size={14} color="#06b6d4" />
                    <span>Database Configuration</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      if (onSignOut) onSignOut();
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '8px 10px',
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      borderRadius: '8px',
                      color: '#f87171',
                      fontSize: '0.8rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginTop: '6px'
                    }}
                  >
                    <LogOut size={14} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => onOpenAuth && onOpenAuth('login')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#e2e8f0',
                  borderRadius: '10px',
                  padding: '7px 12px',
                  fontSize: '0.785rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
              >
                <LogIn size={14} color="#a78bfa" />
                <span>Sign In</span>
              </button>

              <button
                onClick={() => onOpenAuth && onOpenAuth('register')}
                className="btn-primary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 14px',
                  fontSize: '0.785rem',
                  borderRadius: '10px'
                }}
              >
                <UserPlus size={14} />
                <span>Register</span>
              </button>

              <button
                onClick={onLoadDemoStudent}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'rgba(245, 158, 11, 0.12)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  color: '#fbbf24',
                  borderRadius: '10px',
                  padding: '7px 12px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
                title="Load demo data for quick testing"
              >
                <UserCheck size={13} />
                <span>Demo</span>
              </button>
            </div>
          )}

        </div>

        {/* User RPG Level & Stats Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '18px',
          background: 'rgba(255, 255, 255, 0.03)',
          padding: '8px 18px',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.06)'
        }}>
          {/* Level Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.85rem',
              color: '#fff',
              boxShadow: '0 0 12px rgba(245, 158, 11, 0.4)'
            }}>
              L{userLevel}
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>
                Level {userLevel} Apprentice
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '3px' }}>
                <div style={{
                  width: '90px',
                  height: '6px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '99px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${xpPercent}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)',
                    borderRadius: '99px',
                    transition: 'width 0.5s ease-out'
                  }} />
                </div>
                <span style={{ fontSize: '0.7rem', color: '#cbd5e1', fontFamily: 'var(--font-mono)' }}>
                  {currentXp}/{nextLevelXp} XP
                </span>
              </div>
            </div>
          </div>

          <div style={{ width: '1px', height: '28px', background: 'rgba(255, 255, 255, 0.1)' }} />

          {/* Daily Streak */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} title="Keep up your daily 10-min preparation!">
            <Flame size={18} color="#f97316" style={{ filter: 'drop-shadow(0 0 8px rgba(249, 115, 22, 0.6))' }} />
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fed7aa', lineHeight: 1 }}>
                {streak} Days
              </div>
              <div style={{ fontSize: '0.625rem', color: '#fdba74', fontWeight: 600, textTransform: 'uppercase' }}>
                Streak Active
              </div>
            </div>
          </div>

          <div style={{ width: '1px', height: '28px', background: 'rgba(255, 255, 255, 0.1)' }} />

          {/* Leaderboard button */}
          <button 
            onClick={onOpenLeaderboard}
            style={{
              background: 'rgba(139, 92, 246, 0.15)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              color: '#c4b5fd',
              borderRadius: '10px',
              padding: '6px 12px',
              fontSize: '0.775rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <Trophy size={14} color="#a78bfa" />
            <span>Campus</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav style={{
        maxWidth: '1440px',
        margin: '12px auto 0',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        overflowX: 'auto',
        paddingBottom: '2px'
      }}>
        {navItems.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '10px',
                fontSize: '0.85rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#ffffff' : '#94a3b8',
                background: isActive 
                  ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(59, 130, 246, 0.18))' 
                  : 'transparent',
                border: isActive 
                  ? '1px solid rgba(139, 92, 246, 0.5)' 
                  : '1px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
            >
              <Icon size={16} color={isActive ? '#a78bfa' : '#64748b'} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span style={{
                  fontSize: '0.65rem',
                  padding: '1px 6px',
                  borderRadius: '99px',
                  background: isActive ? '#8b5cf6' : 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  fontWeight: 700
                }}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* AI Interest & Domain Recommender Header Block */}
      <AIInterestHeaderBlock 
        currentRole={targetRole}
        onSelectRole={onSelectRole}
        onNavigateToTab={setActiveTab}
      />
    </header>
  );
}
