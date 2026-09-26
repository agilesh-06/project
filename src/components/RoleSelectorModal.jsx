import React, { useState } from 'react';
import { 
  X, 
  Target, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  Terminal, 
  Cloud, 
  Layout, 
  DollarSign, 
  Cpu,
  Monitor,
  Server,
  Database,
  FileText,
  Sparkles
} from 'lucide-react';
import { TARGET_ROLES } from '../data/rolesData';

const ICON_MAP = {
  Terminal,
  Cloud,
  Layout,
  DollarSign,
  Cpu,
  Monitor,
  Server,
  Database
};

export default function RoleSelectorModal({ 
  isOpen, 
  onClose, 
  currentRole, 
  onSelectRole,
  onOpenJdTab 
}) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.78)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '20px'
    }} onClick={onClose}>
      
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '780px',
          background: '#0d1322',
          borderRadius: '24px',
          border: '1px solid rgba(139, 92, 246, 0.4)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(139, 92, 246, 0.25)',
          overflow: 'hidden',
          animation: 'fadeIn 0.2s ease-out'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '22px 28px',
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(6, 182, 212, 0.1) 100%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{
                background: 'rgba(139, 92, 246, 0.25)',
                color: '#c4b5fd',
                fontSize: '0.7rem',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '99px',
                textTransform: 'uppercase'
              }}>
                Placement Goal
              </span>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Tailors Skill Tree & Daily Quests
              </span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
              Select Your Target Placement Role
            </h2>
          </div>

          <button 
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              color: '#94a3b8',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Roles List */}
        <div style={{ padding: '24px 28px', maxHeight: '68vh', overflowY: 'auto' }}>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '18px' }}>
            Choose a target role track below to highlight the exact skills, interview questions, and micro-quests needed for your dream company:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '14px', marginBottom: '22px' }}>
            {TARGET_ROLES.map((role) => {
              const Icon = ICON_MAP[role.icon] || Terminal;
              const isSelected = currentRole === role.title;

              return (
                <div
                  key={role.id}
                  onClick={() => {
                    onSelectRole(role);
                    onClose();
                  }}
                  style={{
                    background: isSelected 
                      ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(26, 35, 56, 0.9) 100%)' 
                      : 'rgba(18, 24, 38, 0.7)',
                    borderRadius: '16px',
                    border: isSelected ? '2px solid #8b5cf6' : '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '16px 18px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 8px 24px rgba(139, 92, 246, 0.3)' : 'none'
                  }}
                  onMouseOver={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)';
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
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>
                      {role.company} · {role.roleCategory}
                    </span>

                    {isSelected && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#10b981', fontSize: '0.75rem', fontWeight: 700 }}>
                        <CheckCircle2 size={14} />
                        <span>Active Target</span>
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      background: `${role.badgeColor}22`,
                      border: `1px solid ${role.badgeColor}55`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon size={20} color={role.badgeColor} />
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1.2 }}>
                        {role.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 600, marginTop: '2px' }}>
                        {role.matchPercentage}% Target Readiness Match
                      </div>
                    </div>
                  </div>

                  <p style={{
                    fontSize: '0.775rem',
                    color: '#94a3b8',
                    marginTop: '10px',
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {role.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Option to Paste Custom JD */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: '14px',
            border: '1px dashed rgba(139, 92, 246, 0.4)',
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileText size={20} color="#c4b5fd" />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>
                  Have a specific company's Job Description?
                </div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  Paste the full job posting in the JD Analyzer to generate a custom Skill Tree!
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenJdTab();
              }}
              className="btn-primary"
              style={{ fontSize: '0.8rem', padding: '8px 16px' }}
            >
              <Sparkles size={14} />
              <span>Open JD Analyzer</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
