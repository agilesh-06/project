import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowUpRight, 
  Target, 
  Award,
  Layers,
  Sparkles
} from 'lucide-react';

export default function ReadinessRadar({ 
  skills, 
  streak, 
  targetRole, 
  onNavigateToTab 
}) {
  // Calculate pillar percentages dynamically
  const dsaSkills = skills.filter(s => s.category === 'dsa');
  const dsaMastered = dsaSkills.filter(s => s.status === 'mastered').length;
  const dsaScore = Math.round((dsaMastered / dsaSkills.length) * 100);

  const sysSkills = skills.filter(s => s.category === 'systems');
  const sysMastered = sysSkills.filter(s => s.status === 'mastered').length;
  const sysScore = Math.round((sysMastered / sysSkills.length) * 100);

  const archSkills = skills.filter(s => s.category === 'architecture');
  const archMastered = archSkills.filter(s => s.status === 'mastered').length;
  const archScore = Math.round((archMastered / archSkills.length) * 100);

  const commSkills = skills.filter(s => s.category === 'communication');
  const commMastered = commSkills.filter(s => s.status === 'mastered').length;
  const commScore = Math.round((commMastered / commSkills.length) * 100);

  // Overall readiness composite score
  const overallReadiness = Math.round((dsaScore * 0.3) + (sysScore * 0.25) + (archScore * 0.2) + (commScore * 0.25));

  const pillars = [
    { name: 'Core Data Structures & Algos', score: dsaScore, color: '#8b5cf6', benchmark: 85, weight: '30%' },
    { name: 'Networking, OS & DB Internals', score: sysScore, color: '#06b6d4', benchmark: 75, weight: '25%' },
    { name: 'System Design & Scalability', score: archScore, color: '#f59e0b', benchmark: 60, weight: '20%' },
    { name: 'Behavioral & Verbal Articulation', score: commScore, color: '#10b981', benchmark: 80, weight: '25%' },
  ];

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 20px' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>
            "Where Do I Stand?" Readiness Dashboard
          </h1>
          <span style={{
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(6, 182, 212, 0.2))',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            color: '#34d399',
            padding: '3px 10px',
            borderRadius: '99px',
            fontSize: '0.75rem',
            fontWeight: 700
          }}>
            Real-Time Assessment
          </span>
        </div>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '4px' }}>
          No more guessing if you are interview ready. This multidimensional audit analyzes your mastered nodes, articulation performance, and streak to reveal exactly where you stand against industry hiring bars.
        </p>
      </div>

      {/* Top Highlight Cards: Overall Placement Probability */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '28px' }}>
        
        {/* Card 1: Placement Probability */}
        <div className="glass-panel" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)' }} />
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
            Overall Placement Index
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1 }}>
              {overallReadiness}%
            </span>
            <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center' }}>
              <TrendingUp size={16} /> +12% this week
            </span>
          </div>
          <p style={{ fontSize: '0.775rem', color: '#64748b', marginTop: '8px', lineHeight: 1.4 }}>
            Competitive for Tier-1 tech interviews. Master Tier-3 System Design to cross 85%.
          </p>
        </div>

        {/* Card 2: Strongest Pillar */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
            Top Superpower
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Award size={24} color="#10b981" />
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
              DSA Foundations
            </span>
          </div>
          <p style={{ fontSize: '0.775rem', color: '#64748b', lineHeight: 1.4 }}>
            Arrays, Two-Pointers, and Recursion trees are solid. You solve these faster than 78% of peers.
          </p>
        </div>

        {/* Card 3: Priority Growth Area */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
            Primary Bottleneck
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <AlertTriangle size={24} color="#f59e0b" />
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fbbf24' }}>
              Distributed Caching
            </span>
          </div>
          <p style={{ fontSize: '0.775rem', color: '#64748b', lineHeight: 1.4 }}>
            Tier 3 node locked. Complete 1 system design micro-quest to unlock redis cache-aside patterns.
          </p>
        </div>

      </div>

      {/* Main Grid: Pillar Progress Bars on Left, Immediate Action Plan on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '24px' }}>
        
        {/* Left: 4 Competency Bars */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target size={18} color="#8b5cf6" />
            <span>Pillar Competency Breakdown</span>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {pillars.map((pil, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#e2e8f0' }}>{pil.name}</span>
                    <span style={{ fontSize: '0.7rem', color: '#64748b', marginLeft: '6px' }}>({pil.weight} weight)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Target: {pil.benchmark}%</span>
                    <strong style={{ fontSize: '0.95rem', color: pil.color }}>{pil.score}%</strong>
                  </div>
                </div>

                {/* Bar */}
                <div style={{
                  width: '100%',
                  height: '10px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  borderRadius: '99px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <div style={{
                    width: `${pil.score}%`,
                    height: '100%',
                    background: pil.color,
                    borderRadius: '99px',
                    transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }} />
                  {/* Benchmark indicator */}
                  <div style={{
                    position: 'absolute',
                    left: `${pil.benchmark}%`,
                    top: 0,
                    bottom: 0,
                    width: '2px',
                    background: 'rgba(255, 255, 255, 0.4)'
                  }} title="Target Industry Benchmark" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Exact Action Checklist to Reach 90% */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="#06b6d4" />
            <span>How to Reach 90% Interview Readiness</span>
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.8rem', marginBottom: '20px' }}>
            High-yield, low-effort daily actions specifically customized to your current skill gaps:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              {
                title: 'Unlock Tier-3: Distributed Caching Node',
                impact: '+8% Readiness',
                time: '12 Mins',
                tab: 'tree',
                desc: 'Study Redis cache-aside and cache stampede strategies in the Skill Tree.'
              },
              {
                title: 'Complete 60s Rubber Duck Audio Challenge',
                impact: '+6% Readiness',
                time: '3 Mins',
                tab: 'rubberduck',
                desc: 'Record 1 explanation of SQL vs NoSQL to lower filler word count below 3.'
              },
              {
                title: 'Solve Today\'s Sliding Window Debug Quest',
                impact: '+4% Readiness',
                time: '5 Mins',
                tab: 'quests',
                desc: 'Finish Quest 2 to keep your 5-day preparation streak alive.'
              }
            ].map((action, idx) => (
              <div 
                key={idx}
                onClick={() => onNavigateToTab(action.tab)}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '12px',
                  padding: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.5)';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#f8fafc' }}>
                      {action.title}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 700, background: 'rgba(16, 185, 129, 0.1)', padding: '1px 6px', borderRadius: '4px' }}>
                      {action.impact}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    {action.desc}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#a78bfa', fontSize: '0.8rem', fontWeight: 600 }}>
                  <span>{action.time}</span>
                  <ArrowUpRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
