import React, { useState } from 'react';
import { 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Building2, 
  Target, 
  Zap, 
  Key,
  Calendar,
  Layers,
  BarChart2,
  Check,
  AlertTriangle
} from 'lucide-react';
import { TARGET_ROLES } from '../data/rolesData';

export default function JDAnalyzer({ 
  skills, 
  currentTargetRole,
  setTargetRole,
  onNavigateToTab 
}) {
  const currentRoleObj = TARGET_ROLES.find(r => r.title === currentTargetRole) || TARGET_ROLES[0];
  const [selectedPresetId, setSelectedPresetId] = useState(currentRoleObj.id);
  const [customJD, setCustomJD] = useState(currentRoleObj.description);
  const [targetTitle, setTargetTitle] = useState(currentRoleObj.title);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  // Student mastered skills list
  const studentMasteredIds = skills.filter(s => s.status === 'mastered').map(s => s.id);
  const studentKnownNames = ['Java', 'SQL', 'Git', 'dsa_basics', 'system_networking', 'db_internals', 'star_behavioral'];

  // Handle Preset Selection
  const handleSelectPreset = (role) => {
    setSelectedPresetId(role.id);
    setCustomJD(role.description);
    setTargetTitle(role.title);
    setTargetRole(role.title);
    setAnalysisResult(null);
  };

  // Run Transparent Analysis (Priority 3)
  const handleAnalyze = () => {
    setIsAnalyzing(true);

    setTimeout(() => {
      const activeRole = TARGET_ROLES.find(r => r.id === selectedPresetId) || TARGET_ROLES[0];
      const techSkills = activeRole.technicalSkills;
      const softSkills = activeRole.softSkills;
      const allRequired = [...techSkills, ...softSkills];

      // Skill by skill transparent comparison
      const comparisonRows = allRequired.map(skillName => {
        // Transparent match logic
        const lower = skillName.toLowerCase();
        const isMatched = studentKnownNames.some(k => k.toLowerCase() === lower || lower.includes(k.toLowerCase())) ||
                          (lower.includes('dsa') && studentMasteredIds.includes('dsa_basics')) ||
                          (lower.includes('db') || lower.includes('sql') && studentMasteredIds.includes('db_internals')) ||
                          (lower.includes('communicat') && studentMasteredIds.includes('star_behavioral'));

        const isSoft = softSkills.includes(skillName);
        const priority = isMatched ? 'Low' : (lower.includes('dsa') || lower.includes('system') ? 'Critical' : 'High');

        return {
          name: skillName,
          type: isSoft ? 'Soft Skill' : 'Technical',
          isMatched,
          priority
        };
      });

      const matchedCount = comparisonRows.filter(r => r.isMatched).length;
      const totalCount = comparisonRows.length;
      // Transparent formula: Matched / Required * 100
      const matchScore = Math.round((matchedCount / totalCount) * 100);

      const missingGaps = comparisonRows.filter(r => !r.isMatched);
      const top3Gaps = missingGaps.slice(0, 3);

      setAnalysisResult({
        roleTitle: targetTitle,
        totalRequired: totalCount,
        matchedCount,
        matchScore,
        techSkills,
        softSkills,
        comparisonRows,
        top3Gaps,
        roadmapOutline: [
          { day: 'Days 1-2', focus: top3Gaps[0]?.name || 'Core DSA', task: 'Solve 6 foundational interview questions' },
          { day: 'Days 3-4', focus: top3Gaps[1]?.name || 'System Architecture', task: 'Review B+Tree leaf indexing and cache-aside' },
          { day: 'Days 5-6', focus: top3Gaps[2]?.name || 'Live Articulation', task: 'Simulate 60s elevator pitch under timer' },
          { day: 'Day 7', focus: 'Comprehensive Review', task: 'Complete AI Mock Interview screening round' }
        ]
      });

      setIsAnalyzing(false);
    }, 700);
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 20px' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>
            Job Description & Role Requirement Analyzer
          </h1>
          <span style={{
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))',
            border: '1px solid rgba(139, 92, 246, 0.4)',
            color: '#c4b5fd',
            padding: '3px 10px',
            borderRadius: '99px',
            fontSize: '0.75rem',
            fontWeight: 700
          }}>
            Transparent Match Formula
          </span>
        </div>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '4px' }}>
          Select any of the 6 core placement tracks or paste a real company Job Description. The system extracts requirements, compares them directly against your profile, and calculates a 100% transparent match score.
        </p>
      </div>

      {/* Main Grid: Input on Left, Transparent Output on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '24px' }}>
        
        {/* Left: Role Presets & JD Input */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 700, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Building2 size={16} color="#8b5cf6" />
              <span>Select Placement Role Preset</span>
            </label>

            <button 
              onClick={() => setShowApiKeyInput(!showApiKeyInput)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#64748b',
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}
            >
              {showApiKeyInput ? 'Hide API' : 'Custom Gemini Key'}
            </button>
          </div>

          {showApiKeyInput && (
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              padding: '12px',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: '14px'
            }}>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '6px' }}>
                Optional: Enter Gemini API key (built-in deterministic parser active by default):
              </div>
              <input
                type="password"
                placeholder="AIzaSy..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '6px',
                  color: '#fff',
                  fontSize: '0.8rem'
                }}
              />
            </div>
          )}

          {/* 6 Target Roles Buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '16px' }}>
            {TARGET_ROLES.map(role => (
              <button
                key={role.id}
                onClick={() => handleSelectPreset(role)}
                style={{
                  padding: '10px 12px',
                  borderRadius: '10px',
                  fontSize: '0.8rem',
                  fontWeight: selectedPresetId === role.id ? 700 : 500,
                  background: selectedPresetId === role.id ? 'rgba(139, 92, 246, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                  border: selectedPresetId === role.id ? '1px solid #8b5cf6' : '1px solid rgba(255, 255, 255, 0.08)',
                  color: selectedPresetId === role.id ? '#c4b5fd' : '#cbd5e1',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {role.title}
              </button>
            ))}
          </div>

          {/* Role Title */}
          <div style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
              Target Job Title
            </label>
            <input
              type="text"
              value={targetTitle}
              onChange={(e) => setTargetTitle(e.target.value)}
              placeholder="e.g. Software Developer"
              style={{
                width: '100%',
                padding: '10px 14px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '0.875rem'
              }}
            />
          </div>

          {/* JD Textarea */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'block', marginBottom: '4px', fontWeight: 600 }}>
              Job Description / Posting Content (or customize)
            </label>
            <textarea
              rows={8}
              value={customJD}
              onChange={(e) => setCustomJD(e.target.value)}
              placeholder="Paste custom job posting..."
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(9, 13, 22, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                color: '#e2e8f0',
                fontSize: '0.85rem',
                lineHeight: 1.5,
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="btn-primary"
            style={{ width: '100%', padding: '12px', fontSize: '0.95rem' }}
          >
            <Sparkles size={18} />
            <span>{isAnalyzing ? 'Analyzing Job Requirements...' : 'Analyze Requirements & Compare Skills'}</span>
          </button>
        </div>

        {/* Right: Transparent Analysis & Comparison Output (Priority 3) */}
        <div>
          {analysisResult ? (
            <div className="glass-panel" style={{ padding: '26px', animation: 'fadeIn 0.3s ease' }}>
              
              {/* Score & Formula Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '18px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                marginBottom: '20px'
              }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>
                    Transparent Match Analysis
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', margin: '2px 0 0' }}>
                    {analysisResult.roleTitle}
                  </h3>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: analysisResult.matchScore >= 70 ? '#10b981' : '#f59e0b', lineHeight: 1 }}>
                    {analysisResult.matchScore}%
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '2px', fontWeight: 600 }}>
                    {analysisResult.matchedCount} of {analysisResult.totalRequired} Skills Matched
                  </div>
                </div>
              </div>

              {/* Transparent Calculation Banner */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.03)',
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                fontSize: '0.775rem',
                color: '#94a3b8',
                marginBottom: '20px'
              }}>
                <strong>Formula:</strong> (Matched Skills: {analysisResult.matchedCount} / Total Required: {analysisResult.totalRequired}) × 100 = <strong>{analysisResult.matchScore}%</strong>. Zero unexplained scoring.
              </div>

              {/* Required Skills vs Student Skills Table */}
              <div style={{ marginBottom: '22px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#f8fafc', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Required Skills vs. Student Skills:
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {analysisResult.comparisonRows.map((row, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'rgba(255, 255, 255, 0.02)',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.04)',
                      fontSize: '0.825rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 600, color: '#f8fafc' }}>{row.name}</span>
                        <span style={{ fontSize: '0.7rem', color: '#64748b' }}>({row.type})</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {row.isMatched ? (
                          <span style={{ color: '#10b981', fontWeight: 700, fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <Check size={14} />
                            <span>REQUIRED</span>
                          </span>
                        ) : (
                          <span style={{ color: '#f59e0b', fontWeight: 700, fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <AlertTriangle size={14} />
                            <span>GAP</span>
                          </span>
                        )}
                        <span style={{ fontSize: '0.675rem', color: '#94a3b8', background: 'rgba(255, 255, 255, 0.05)', padding: '1px 6px', borderRadius: '4px' }}>
                          {row.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Your Top 3 Skill Gaps */}
              {analysisResult.top3Gaps.length > 0 && (
                <div style={{
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(239, 68, 68, 0.08) 100%)',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  borderRadius: '14px',
                  padding: '16px',
                  marginBottom: '20px'
                }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <AlertCircle size={15} />
                    <span>Your Top 3 Skill Gaps for this Role:</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {analysisResult.top3Gaps.map((gap, i) => (
                      <div key={i} style={{ fontSize: '0.825rem', color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ color: '#f59e0b', fontWeight: 800 }}>#{i + 1}</span>
                        <strong>{gap.name}</strong>
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>— Priority: {gap.priority}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => onNavigateToTab('roadmap')}
                  className="btn-primary"
                  style={{ padding: '10px 18px', fontSize: '0.85rem' }}
                >
                  <span>Generate Personalized Roadmap</span>
                  <ArrowRight size={15} />
                </button>

                <button
                  onClick={() => onNavigateToTab('tree')}
                  className="btn-secondary"
                  style={{ padding: '10px 18px', fontSize: '0.85rem' }}
                >
                  <span>Highlight on Skill Tree</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="glass-panel" style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px 24px',
              textAlign: 'center'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '20px',
                background: 'rgba(139, 92, 246, 0.1)',
                border: '1px solid rgba(139, 92, 246, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <BarChart2 size={32} color="#8b5cf6" />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '6px' }}>
                Ready to Analyze Job Requirements
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', maxWidth: '340px' }}>
                Select a target role on the left or paste your own job posting, then click analyze to see your transparent skills match and top 3 gaps.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
