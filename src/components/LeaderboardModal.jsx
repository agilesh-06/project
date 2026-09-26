import React, { useState } from 'react';
import { 
  Trophy, 
  Users, 
  Flame, 
  X, 
  Sparkles, 
  CheckCircle2, 
  Send,
  MessageCircle,
  Shield
} from 'lucide-react';

export default function LeaderboardModal({ isOpen, onClose, currentXp, userLevel }) {
  const [buddyMatched, setBuddyMatched] = useState(false);
  const [targetCompany, setTargetCompany] = useState('Google');

  if (!isOpen) return null;

  const mockLeaderboard = [
    { rank: 1, name: 'Aarav S. (Batch 26)', xp: 2450, streak: 14, badge: 'System Master' },
    { rank: 2, name: 'Priya K. (Batch 26)', xp: 2180, streak: 12, badge: 'Algo Titan' },
    { rank: 3, name: 'Rohan M. (Batch 27)', xp: 1950, streak: 9, badge: 'Articulator' },
    { rank: 4, name: 'You (Apprentice)', xp: currentXp + 1200, streak: 5, badge: 'Rising Star', isUser: true },
    { rank: 5, name: 'Sneha R. (Batch 26)', xp: 1420, streak: 7, badge: 'Debug Ninja' },
  ];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
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
          maxWidth: '640px',
          background: '#0d1322',
          borderRadius: '24px',
          border: '1px solid rgba(139, 92, 246, 0.3)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(139, 92, 246, 0.2)',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(245, 158, 11, 0.1) 100%)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Trophy size={20} color="#fff" />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                Campus Placement Arena
              </h2>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>
                Friendly peer motivation & anonymous mock study buddies
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
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

        {/* Content */}
        <div style={{ padding: '24px', maxHeight: '75vh', overflowY: 'auto' }}>
          
          {/* Peer Buddy Matcher Feature */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%)',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            borderRadius: '16px',
            padding: '18px',
            marginBottom: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Users size={18} color="#38bdf8" />
              <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                Anonymous 15-Minute Peer Mock Matcher
              </h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.4, margin: '0 0 12px' }}>
              Practicing alone gets isolating. Match anonymously with a batchmate targeting the same company for a quick 1-on-1 concept check!
            </p>

            {buddyMatched ? (
              <div style={{
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                padding: '12px 14px',
                borderRadius: '10px',
                color: '#34d399',
                fontSize: '0.825rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <CheckCircle2 size={16} />
                <span><strong>Matched with "Peer #48"</strong> for {targetCompany} SDE Round 1! Meeting room link dispatched to your portal.</span>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '8px' }}>
                <select 
                  value={targetCompany}
                  onChange={(e) => setTargetCompany(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    fontSize: '0.8rem'
                  }}
                >
                  <option value="Google">Google SDE</option>
                  <option value="Amazon">Amazon AWS</option>
                  <option value="Microsoft">Microsoft SWE</option>
                  <option value="Fintech">Fintech Backend</option>
                </select>
                <button
                  onClick={() => setBuddyMatched(true)}
                  className="btn-primary"
                  style={{ fontSize: '0.8rem', padding: '8px 16px' }}
                >
                  <Send size={14} />
                  <span>Find 15-Min Study Buddy</span>
                </button>
              </div>
            )}
          </div>

          {/* Campus Weekly Leaderboard Table */}
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '10px' }}>
            Weekly Campus XP Standings:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {mockLeaderboard.map((item) => (
              <div 
                key={item.rank}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: item.isUser 
                    ? 'rgba(139, 92, 246, 0.2)' 
                    : 'rgba(255, 255, 255, 0.03)',
                  border: item.isUser 
                    ? '1px solid #8b5cf6' 
                    : '1px solid rgba(255, 255, 255, 0.05)',
                  boxShadow: item.isUser ? '0 0 15px rgba(139, 92, 246, 0.2)' : 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: item.rank === 1 ? '#f59e0b' : (item.rank === 2 ? '#94a3b8' : (item.rank === 3 ? '#b45309' : 'rgba(255, 255, 255, 0.1)')),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: item.rank <= 3 ? '#000' : '#fff'
                  }}>
                    {item.rank}
                  </span>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: item.isUser ? 800 : 600, color: item.isUser ? '#c4b5fd' : '#f8fafc' }}>
                      {item.name}
                    </div>
                    <span style={{ fontSize: '0.675rem', color: '#64748b', background: 'rgba(255, 255, 255, 0.05)', padding: '1px 6px', borderRadius: '4px' }}>
                      {item.badge}
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fbbf24' }}>
                    {item.xp} XP
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '3px' }}>
                    <Flame size={12} />
                    <span>{item.streak}d streak</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
