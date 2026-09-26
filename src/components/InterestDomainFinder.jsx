import React, { useState } from 'react';
import { 
  Sparkles, 
  Compass, 
  Shuffle, 
  CheckCircle2, 
  ArrowRight, 
  Code2, 
  Layout, 
  Server, 
  Cpu, 
  Database, 
  Terminal, 
  HelpCircle,
  Zap,
  Check,
  Layers,
  ChevronRight,
  Globe,
  GraduationCap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TARGET_ROLES } from '../data/rolesData';

// Beginner-friendly student interest definitions
const INTEREST_AREAS = [
  {
    id: 'interest_frontend',
    title: 'Building Websites & Interfaces',
    icon: Layout,
    description: 'I love creating clean visual designs, interactive web pages, and animations that users actually see.',
    matchedRoleId: 'frontend_developer',
    matchedRoleTitle: 'Frontend Developer',
    reason: 'You care about visual design, user experience, and instant feedback on screen.'
  },
  {
    id: 'interest_backend',
    title: 'Backend APIs & Databases',
    icon: Server,
    description: 'I like understanding how servers work behind the scenes, processing data, and designing databases.',
    matchedRoleId: 'backend_developer',
    matchedRoleTitle: 'Backend Developer',
    reason: 'You enjoy system logic, databases, performance, and building rock-solid server engines.'
  },
  {
    id: 'interest_fullstack',
    title: 'End-to-End Full Web Apps',
    icon: Globe,
    description: 'I want to build complete products from the frontend design down to the backend database.',
    matchedRoleId: 'fullstack_developer',
    matchedRoleTitle: 'Full Stack Developer',
    reason: 'You are an all-rounder who loves connecting the pieces to build complete, working apps.'
  },
  {
    id: 'interest_dsa',
    title: 'Problem Solving & Coding Logic',
    icon: Code2,
    description: 'I enjoy algorithms, puzzle solving, coding logic, and mastering foundational software principles.',
    matchedRoleId: 'software_developer',
    matchedRoleTitle: 'Software Developer',
    reason: 'You love algorithmic problem solving and writing clean, efficient code that runs fast.'
  },
  {
    id: 'interest_ai',
    title: 'AI, Models & Smart Automation',
    icon: Cpu,
    description: 'I am fascinated by machine learning, intelligent chatbots, computer vision, and generative AI.',
    matchedRoleId: 'aiml_engineer',
    matchedRoleTitle: 'AI/ML Engineer',
    reason: 'You want to build with intelligent models, neural networks, and cutting-edge GenAI APIs.'
  },
  {
    id: 'interest_data',
    title: 'Data, SQL & Big Analytics',
    icon: Database,
    description: 'I enjoy numbers, analyzing trends, writing SQL queries, and organizing large volumes of information.',
    matchedRoleId: 'data_engineer',
    matchedRoleTitle: 'Data Engineer',
    reason: 'You love organizing messy information into clear, structured, high-value data pipelines.'
  }
];

export default function InterestDomainFinder({ 
  currentRole, 
  onSelectRole, 
  onNavigateToTab 
}) {
  const [selectedInterestId, setSelectedInterestId] = useState(null);
  const [randomizedRole, setRandomizedRole] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [showAllDomains, setShowAllDomains] = useState(false);

  // When student clicks an interest card
  const handleSelectInterest = (interest) => {
    setSelectedInterestId(interest.id);
    setRandomizedRole(null);
  };

  // Confirm selection and proceed
  const handleConfirmRole = (roleTitle) => {
    onSelectRole(roleTitle);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8b5cf6', '#10b981', '#06b6d4', '#f59e0b']
    });
    // Send student straight to their clean roadmap!
    onNavigateToTab('roadmap');
  };

  // Randomizer feature for students who don't know what they want
  const handlePickRandom = () => {
    setIsRolling(true);
    setSelectedInterestId(null);

    let count = 0;
    const interval = setInterval(() => {
      const randIdx = Math.floor(Math.random() * TARGET_ROLES.length);
      setRandomizedRole(TARGET_ROLES[randIdx]);
      count++;
      if (count > 8) {
        clearInterval(interval);
        setIsRolling(false);
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      }
    }, 100);
  };

  const activeInterest = INTEREST_AREAS.find(i => i.id === selectedInterestId);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 20px' }}>
      
      {/* Friendly Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.16) 0%, rgba(6, 182, 212, 0.12) 100%)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        borderRadius: '24px',
        padding: '32px 36px',
        marginBottom: '32px',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(139, 92, 246, 0.2)',
          color: '#c4b5fd',
          fontSize: '0.8rem',
          fontWeight: 800,
          padding: '4px 12px',
          borderRadius: '99px',
          marginBottom: '12px'
        }}>
          <span>WELCOME TO SKILLTREE.AI</span>
        </div>

        <h1 style={{
          fontSize: '2.1rem',
          fontWeight: 800,
          color: '#f8fafc',
          letterSpacing: '-0.02em',
          margin: '0 0 10px',
          lineHeight: 1.25
        }}>
          Let's Find Your Dream Placement Track
        </h1>

        <p style={{
          color: '#cbd5e1',
          fontSize: '1rem',
          maxWidth: '680px',
          margin: '0 auto 24px',
          lineHeight: 1.6
        }}>
          No stress and no confusing technical jargon. Tell us what you enjoy doing, or let us recommend a track so you don't waste time preparing for everything.
        </p>

        {/* Current Role status & Quick Random button */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            fontSize: '0.85rem',
            color: '#94a3b8',
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '8px 16px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            Currently Selected Track: <strong style={{ color: '#38bdf8' }}>{currentRole}</strong>
          </div>

          <button
            onClick={handlePickRandom}
            disabled={isRolling}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: '#ffffff',
              border: 'none',
              padding: '9px 18px',
              borderRadius: '12px',
              fontWeight: 800,
              fontSize: '0.85rem',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)',
              transition: 'transform 0.15s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Shuffle size={16} />
            <span>{isRolling ? 'Picking Track...' : 'Not Sure? Surprise Me'}</span>
          </button>

          <button
            onClick={() => setShowAllDomains(!showAllDomains)}
            style={{
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#e2e8f0',
              padding: '9px 16px',
              borderRadius: '12px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {showAllDomains ? 'Hide All Tracks' : 'Browse All 6 Tracks'}
          </button>
        </div>
      </div>

      {/* Randomly Picked Role Callout Banner */}
      {randomizedRole && (
        <div style={{
          background: 'radial-gradient(ellipse at center, rgba(245, 158, 11, 0.18) 0%, rgba(15, 23, 42, 0.95) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.4)',
          borderRadius: '18px',
          padding: '24px 28px',
          marginBottom: '32px',
          animation: 'fadeIn 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Random Track Picked For You
            </span>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', margin: '4px 0 6px' }}>
              {randomizedRole.title}
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '0.875rem', margin: 0, maxWidth: '600px', lineHeight: 1.5 }}>
              {randomizedRole.description.slice(0, 160)}...
            </p>
          </div>

          <button
            onClick={() => handleConfirmRole(randomizedRole.title)}
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#ffffff',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '12px',
              fontWeight: 800,
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)'
            }}
          >
            <span>Lock In {randomizedRole.title} & Start</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* STEP 1: What Are You Interested In? */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{
            background: 'rgba(139, 92, 246, 0.2)',
            color: '#c4b5fd',
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '2px 8px',
            borderRadius: '6px'
          }}>
            Option 1
          </span>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
            Choose What Excites You Most
          </h2>
        </div>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0 0 16px' }}>
          Click the card that sounds most like you. We will automatically connect you to the right placement domain.
        </p>

        {/* 6 Friendly Interest Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
          gap: '16px'
        }}>
          {INTEREST_AREAS.map(interest => {
            const isSelected = selectedInterestId === interest.id;
            const IconComponent = interest.icon;
            return (
              <div
                key={interest.id}
                onClick={() => handleSelectInterest(interest)}
                style={{
                  background: isSelected 
                    ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.22) 0%, rgba(6, 182, 212, 0.15) 100%)'
                    : 'rgba(255, 255, 255, 0.02)',
                  border: isSelected ? '2px solid #8b5cf6' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '20px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
                onMouseOver={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    background: isSelected ? 'rgba(139, 92, 246, 0.3)' : 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <IconComponent size={22} color={isSelected ? '#c4b5fd' : '#94a3b8'} />
                  </div>
                  {isSelected && (
                    <span style={{
                      background: '#8b5cf6',
                      color: '#ffffff',
                      borderRadius: '50%',
                      width: '22px',
                      height: '22px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Check size={14} />
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc', marginBottom: '6px' }}>
                  {interest.title}
                </h3>

                <p style={{ color: '#94a3b8', fontSize: '0.825rem', lineHeight: 1.5, margin: '0 0 12px' }}>
                  {interest.description}
                </p>

                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: isSelected ? '#38bdf8' : '#64748b'
                }}>
                  Connects to: <strong>{interest.matchedRoleTitle}</strong>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Confirmation Box when an interest is selected */}
      {activeInterest && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(13, 27, 24, 0.9) 100%)',
          border: '1px solid rgba(16, 185, 129, 0.4)',
          borderRadius: '20px',
          padding: '24px 28px',
          marginBottom: '32px',
          animation: 'fadeIn 0.25s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#34d399', textTransform: 'uppercase' }}>
              Recommended Match Based On Your Interest
            </span>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc', margin: '4px 0 4px' }}>
              {activeInterest.matchedRoleTitle}
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.875rem', margin: 0, maxWidth: '640px' }}>
              {activeInterest.reason}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                onSelectRole(activeInterest.matchedRoleTitle);
                onNavigateToTab('assessment');
              }}
              style={{
                background: 'rgba(139, 92, 246, 0.2)',
                border: '1px solid rgba(139, 92, 246, 0.5)',
                color: '#c4b5fd',
                padding: '12px 20px',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '0.88rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(139, 92, 246, 0.3)';
                e.currentTarget.style.borderColor = '#8b5cf6';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)';
              }}
            >
              <GraduationCap size={16} />
              <span>Take Diagnostic Test</span>
            </button>

            <button
              onClick={() => handleConfirmRole(activeInterest.matchedRoleTitle)}
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 18px rgba(16, 185, 129, 0.4)'
              }}
            >
              <span>Lock In & View Roadmap</span>
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      )}

      {/* OPTION 2: Browse All 6 Available Domains (Clean English Breakdown) */}
      {showAllDomains && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '20px',
          padding: '28px',
          marginBottom: '32px',
          animation: 'fadeIn 0.3s ease'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', marginBottom: '8px' }}>
            All 6 Placement Tracks Explained in Plain English
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '20px' }}>
            Pick the track that best matches what you want to do in your career:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {TARGET_ROLES.map(role => (
              <div key={role.id} style={{
                background: 'rgba(0, 0, 0, 0.3)',
                border: currentRole === role.title ? '1px solid #8b5cf6' : '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '14px',
                padding: '18px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                    {role.title}
                  </h3>
                  {currentRole === role.title && (
                    <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 800, background: 'rgba(16, 185, 129, 0.15)', padding: '2px 8px', borderRadius: '4px' }}>
                      Current Track
                    </span>
                  )}
                </div>

                <p style={{ color: '#94a3b8', fontSize: '0.8rem', lineHeight: 1.45, marginBottom: '12px' }}>
                  {role.description.slice(0, 130)}...
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '14px' }}>
                  {role.technicalSkills.slice(0, 4).map((sk, idx) => (
                    <span key={idx} style={{
                      fontSize: '0.7rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: '#cbd5e1',
                      padding: '2px 6px',
                      borderRadius: '4px'
                    }}>
                      {sk}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => handleConfirmRole(role.title)}
                  style={{
                    width: '100%',
                    background: currentRole === role.title ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    border: currentRole === role.title ? '1px solid rgba(139, 92, 246, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
                    color: currentRole === role.title ? '#c4b5fd' : '#e2e8f0',
                    padding: '8px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {currentRole === role.title ? 'Active Track (Selected)' : `Select ${role.title}`}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reassurance Footer for Beginners */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.02)',
        borderRadius: '14px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        color: '#94a3b8',
        fontSize: '0.825rem'
      }}>
        <HelpCircle size={18} color="#8b5cf6" style={{ flexShrink: 0 }} />
        <span>
          <strong>Remember:</strong> You can switch your track at any time with zero penalty. Our roadmaps start from basic concepts and ramp up smoothly so beginners never feel left behind!
        </span>
      </div>

    </div>
  );
}
