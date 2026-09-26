// ==========================================================================
// SkillTree.AI - AI Interest & Domain Advisor Header Block
// Analyzes student interest input with Gemini AI or intelligent semantic NLP,
// maps to optimal placement domains, and provides immediate roadmaps.
// Strictly NO emojis.
// ==========================================================================
import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  Target, 
  Zap, 
  ChevronDown, 
  ChevronUp, 
  X, 
  RotateCcw,
  Layout,
  Server,
  Database,
  Cpu,
  Terminal,
  Globe,
  SlidersHorizontal,
  ClipboardCheck,
  MapPin,
  Bot
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TARGET_ROLES } from '../data/rolesData';

// Suggested interest prompts for quick student inspiration
const QUICK_INTERESTS = [
  { label: 'Web UI & Interactive Design', query: 'I love creating clean web interfaces, responsive layouts, and interactive animations.' },
  { label: 'APIs, Databases & Servers', query: 'I like building backend APIs, designing database schemas, and understanding server architectures.' },
  { label: 'Full Stack End-to-End Apps', query: 'I want to build complete applications from frontend user screens to backend database storage.' },
  { label: 'Machine Learning & AI', query: 'I am interested in machine learning models, neural networks, computer vision, and generative AI.' },
  { label: 'Data Pipelines & SQL', query: 'I enjoy writing SQL queries, analyzing large datasets, and building automated data pipelines.' },
  { label: 'DSA & Algorithmic Problem Solving', query: 'I love data structures, algorithm puzzles, time complexity optimization, and core CS fundamentals.' }
];

// Fallback / fast deterministic semantic keyword dictionary
const DOMAIN_PROFILES = [
  {
    roleId: 'frontend_developer',
    roleTitle: 'Frontend Developer',
    icon: Layout,
    accentColor: '#ec4899',
    keywords: [
      'frontend', 'ui', 'ux', 'user interface', 'web', 'website', 'css', 'html', 
      'react', 'vue', 'angular', 'javascript', 'typescript', 'animation', 'design', 
      'responsive', 'tailwind', 'browser', 'client', 'dom', 'interactive', 'visual', 
      'styling', 'components', 'page', 'screen', 'layout'
    ],
    baseSummary: 'User Interface Architecture & Web Performance',
    defaultReason: 'Matches your interest in visual interaction, client-side rendering, and responsive design systems.',
    starterTopics: ['HTML5 & Modern CSS Layouts', 'React Component Architecture', 'JavaScript Event Loop & DOM APIs']
  },
  {
    roleId: 'backend_developer',
    roleTitle: 'Backend Developer',
    icon: Server,
    accentColor: '#10b981',
    keywords: [
      'backend', 'api', 'apis', 'rest', 'graphql', 'server', 'database', 'sql', 
      'nosql', 'postgres', 'mysql', 'mongodb', 'node', 'express', 'django', 'fastapi', 
      'spring', 'microservices', 'caching', 'redis', 'kafka', 'distributed', 'concurrency', 
      'architecture', 'security', 'auth', 'logic', 'cloud'
    ],
    baseSummary: 'Distributed Systems, Services & High-Scale APIs',
    defaultReason: 'Aligns with your passion for system logic, robust server-side processing, and database optimization.',
    starterTopics: ['RESTful API Design & HTTP', 'SQL Indexing & Relational Schema', 'Node.js/Express Async Architecture']
  },
  {
    roleId: 'fullstack_developer',
    roleTitle: 'Full Stack Developer',
    icon: Globe,
    accentColor: '#8b5cf6',
    keywords: [
      'fullstack', 'full stack', 'complete', 'end-to-end', 'web app', 'application', 
      'frontend and backend', 'mern', 'mean', 'nextjs', 'saas', 'product', 'startup', 
      'both', 'everything', 'build apps', 'deploy', 'system'
    ],
    baseSummary: 'End-to-End Application Engineering & Integration',
    defaultReason: 'Fits your desire to connect user interfaces with backend data storage into complete functional products.',
    starterTopics: ['Full Stack State & API Flow', 'Authentication & Session Handling', 'Production Database CRUD']
  },
  {
    roleId: 'aiml_engineer',
    roleTitle: 'AI/ML Engineer',
    icon: Cpu,
    accentColor: '#06b6d4',
    keywords: [
      'ai', 'ml', 'machine learning', 'deep learning', 'neural', 'artificial intelligence', 
      'nlp', 'llm', 'generative', 'gpt', 'gemini', 'transformer', 'vision', 'opencv', 
      'pytorch', 'tensorflow', 'scikit', 'python', 'model', 'dataset', 'classification', 
      'training', 'vector', 'prediction', 'statistics', 'math'
    ],
    baseSummary: 'Machine Learning, Neural Networks & GenAI Architecture',
    defaultReason: 'Matches your fascination with training models, evaluating algorithms, and integrating intelligent AI APIs.',
    starterTopics: ['Python for Data Science', 'Supervised vs Unsupervised Learning', 'Model Evaluation & Vector Search']
  },
  {
    roleId: 'data_engineer',
    roleTitle: 'Data Engineer',
    icon: Database,
    accentColor: '#f59e0b',
    keywords: [
      'data', 'analytics', 'pipeline', 'etl', 'elt', 'warehouse', 'bigquery', 
      'spark', 'hadoop', 'snowflake', 'sql', 'reporting', 'dashboard', 'power bi', 
      'tableau', 'ingestion', 'aggregation', 'metrics', 'streaming', 'trends'
    ],
    baseSummary: 'Data Infrastructure, Analytics Warehouses & Pipelines',
    defaultReason: 'Aligns with your interest in organizing raw data, writing analytical SQL, and optimizing data flow.',
    starterTopics: ['Advanced SQL Joins & Window Functions', 'ETL Pipeline Architecture', 'Data Warehousing Fundamentals']
  },
  {
    roleId: 'software_developer',
    roleTitle: 'Software Developer',
    icon: Terminal,
    accentColor: '#3b82f6',
    keywords: [
      'dsa', 'data structures', 'algorithms', 'software', 'coding', 'problem solving', 
      'leetcode', 'competitive', 'java', 'c++', 'c', 'python', 'oop', 'arrays', 
      'trees', 'graphs', 'dynamic programming', 'recursion', 'time complexity', 'space complexity', 
      'core', 'computer science', 'basics', 'foundations'
    ],
    baseSummary: 'Core Computer Science, Algorithms & System Architecture',
    defaultReason: 'Perfect for building rock-solid foundations in algorithmic problem solving, clean code, and time complexity.',
    starterTopics: ['Arrays, Hash Tables & Two Pointers', 'Recursion & Binary Trees', 'Object-Oriented Design Patterns']
  }
];

export default function AIInterestHeaderBlock({ 
  currentRole, 
  onSelectRole, 
  onNavigateToTab 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [interestInput, setInterestInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [errorNotice, setErrorNotice] = useState('');

  // Run AI analysis on the entered interest
  const handleAnalyze = async (queryText = interestInput) => {
    const text = (queryText || '').trim();
    if (!text) {
      setErrorNotice('Please describe an area or skill you are interested in.');
      return;
    }

    setErrorNotice('');
    setIsAnalyzing(true);
    setIsOpen(true);

    const apiKey = localStorage.getItem('skilltree_gemini_api_key') || import.meta.env.VITE_GEMINI_API_KEY || '';

    // Attempt Gemini API if available
    let geminiSucceeded = false;
    if (apiKey) {
      try {
        const prompt = `You are a Senior Placement Director and Career Architect.
The student says their interest is: "${text}".
Analyze this interest against these 6 standard technology placement roles:
1. Software Developer
2. Full Stack Developer
3. Frontend Developer
4. Backend Developer
5. Data Engineer
6. AI/ML Engineer

Return a valid JSON object ONLY, with this schema:
{
  "summary": "1 sentence insight on the student's natural strengths",
  "recommendations": [
    {
      "roleTitle": "Exact role name from above",
      "matchPercentage": 95,
      "whyItMatches": "1-2 concise sentences explaining why this role fits their interest",
      "startingTopics": ["Topic 1", "Topic 2", "Topic 3"]
    }
  ]
}
Give top 3 roles sorted by matchPercentage descending. Do not include markdown code ticks.`;

        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        });

        if (res.ok) {
          const data = await res.json();
          const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            const cleanJson = candidateText.replace(/```json/gi, '').replace(/```/g, '').trim();
            const parsed = JSON.parse(cleanJson);
            if (parsed.recommendations && parsed.recommendations.length > 0) {
              setAnalysisResults({
                source: 'gemini',
                summary: parsed.summary || 'Based on your stated interest, here are your best-aligned placement domains:',
                recommendations: parsed.recommendations
              });
              geminiSucceeded = true;
            }
          }
        }
      } catch (err) {
        console.warn('[SkillTree AI] Gemini API note, using local semantic analyzer:', err.message);
      }
    }

    // High-precision local semantic NLP fallback if Gemini not configured or failed
    if (!geminiSucceeded) {
      // Small simulated latency for natural UI feedback
      await new Promise(r => setTimeout(r, 380));

      const lowerText = text.toLowerCase();
      const scoredRoles = DOMAIN_PROFILES.map(profile => {
        let matchCount = 0;
        profile.keywords.forEach(kw => {
          if (lowerText.includes(kw)) {
            matchCount += (kw.length > 5 ? 2.5 : 1.5);
          }
        });

        // Compute baseline relevance
        const calculatedPercent = Math.min(97, Math.max(58, Math.round(65 + matchCount * 9)));
        return {
          roleTitle: profile.roleTitle,
          roleId: profile.roleId,
          matchPercentage: calculatedPercent,
          whyItMatches: profile.defaultReason,
          startingTopics: profile.starterTopics,
          icon: profile.icon,
          accentColor: profile.accentColor
        };
      });

      // Sort descending
      scoredRoles.sort((a, b) => b.matchPercentage - a.matchPercentage);
      const top3 = scoredRoles.slice(0, 3);

      setAnalysisResults({
        source: 'semantic',
        summary: `Analyzed your interest in "${text.length > 45 ? text.substring(0, 45) + '...' : text}". Here are your highest-affinity placement domains:`,
        recommendations: top3
      });
    }

    setIsAnalyzing(false);
  };

  // Choose domain and route to roadmap or test
  const handleSelectDomain = (roleTitle, destinationTab = 'roadmap') => {
    if (onSelectRole) {
      onSelectRole(roleTitle);
    }

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.3 },
      colors: ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b']
    });

    if (onNavigateToTab) {
      onNavigateToTab(destinationTab);
    }
  };

  return (
    <div style={{
      maxWidth: '1440px',
      margin: '8px auto 4px',
      padding: '0 4px'
    }}>
      {/* Top Banner / Input Strip */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(20, 26, 42, 0.95) 0%, rgba(13, 19, 33, 0.98) 100%)',
        border: '1px solid rgba(139, 92, 246, 0.32)',
        borderRadius: '16px',
        padding: '12px 18px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.35)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          {/* Header Badge & Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '9px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 12px rgba(139, 92, 246, 0.4)'
            }}>
              <Sparkles size={17} color="#ffffff" />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.01em' }}>
                  AI Domain & Placement Advisor
                </span>
                <span style={{
                  background: 'rgba(6, 182, 212, 0.15)',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  color: '#67e8f9',
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  padding: '1px 7px',
                  borderRadius: '99px',
                  textTransform: 'uppercase'
                }}>
                  Smart Matching
                </span>
              </div>
              <p style={{ fontSize: '0.72rem', color: '#94a3b8', margin: 0 }}>
                Type what you enjoy building, and AI will analyze and recommend your best placement sectors.
              </p>
            </div>
          </div>

          {/* Toggle Expand / Collapse button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#cbd5e1',
              borderRadius: '10px',
              padding: '6px 12px',
              fontSize: '0.75rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <span>{isOpen ? 'Minimize Advisor' : 'Show Recommendations'}</span>
            {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {/* Input & Action Row */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleAnalyze(); }}
          style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}
        >
          <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
            <Search size={16} color="#64748b" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              value={interestInput}
              onChange={(e) => { setInterestInput(e.target.value); setErrorNotice(''); }}
              placeholder="e.g. I like working with databases, backend systems, APIs and cloud servers..."
              style={{
                width: '100%',
                padding: '10px 40px 10px 40px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '11px',
                color: '#ffffff',
                fontSize: '0.85rem',
                outline: 'none',
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#8b5cf6'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)'}
            />
            {interestInput && (
              <button
                type="button"
                onClick={() => setInterestInput('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer'
                }}
              >
                <X size={15} />
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isAnalyzing}
            className="btn-primary"
            style={{
              padding: '10px 20px',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderRadius: '11px',
              whiteSpace: 'nowrap'
            }}
          >
            <Sparkles size={15} />
            <span>{isAnalyzing ? 'Analyzing with AI...' : 'Analyze My Interest'}</span>
          </button>
        </form>

        {/* Quick Inspiration Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>Try clicking:</span>
          {QUICK_INTERESTS.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setInterestInput(item.query);
                handleAnalyze(item.query);
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#94a3b8',
                borderRadius: '8px',
                padding: '4px 10px',
                fontSize: '0.72rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.color = '#c4b5fd';
                e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.color = '#94a3b8';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        {errorNotice && (
          <div style={{ fontSize: '0.75rem', color: '#f87171', marginTop: '2px' }}>
            {errorNotice}
          </div>
        )}

        {/* Results Expansion Drawer */}
        {isOpen && analysisResults && (
          <div style={{
            marginTop: '8px',
            paddingTop: '14px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            animation: 'fadeIn 0.3s ease'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} color="#10b981" />
                <span style={{ fontSize: '0.825rem', color: '#cbd5e1', fontWeight: 600 }}>
                  {analysisResults.summary}
                </span>
              </div>
              <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
                Engine: {analysisResults.source === 'gemini' ? 'Google Gemini 2.0' : 'Intelligent Semantic NLP'}
              </span>
            </div>

            {/* 3 Domain Cards Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: '12px'
            }}>
              {analysisResults.recommendations.map((rec, index) => {
                const targetObj = TARGET_ROLES.find(r => r.title.toLowerCase() === rec.roleTitle.toLowerCase()) || TARGET_ROLES[0];
                const isCurrentActive = currentRole === targetObj.title;

                return (
                  <div
                    key={index}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: isCurrentActive ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '14px',
                      padding: '14px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '10px',
                      position: 'relative',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div>
                      {/* Top Header of Card */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span style={{
                          fontSize: '0.7rem',
                          fontWeight: 800,
                          color: index === 0 ? '#10b981' : '#a78bfa',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em'
                        }}>
                          {index === 0 ? 'Top Recommendation' : `Option ${index + 1}`}
                        </span>

                        <div style={{
                          background: index === 0 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(139, 92, 246, 0.15)',
                          border: index === 0 ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(139, 92, 246, 0.3)',
                          color: index === 0 ? '#34d399' : '#c4b5fd',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          padding: '2px 8px',
                          borderRadius: '99px'
                        }}>
                          {rec.matchPercentage}% Match
                        </div>
                      </div>

                      <div style={{ fontSize: '1rem', fontWeight: 800, color: '#f8fafc', marginBottom: '4px' }}>
                        {targetObj.title}
                      </div>

                      <p style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.45, margin: '0 0 10px' }}>
                        {rec.whyItMatches}
                      </p>

                      {/* Starting Topics Pill Group */}
                      {rec.startingTopics && (
                        <div>
                          <div style={{ fontSize: '0.675rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                            Foundational Topics to Prepare:
                          </div>
                          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                            {rec.startingTopics.map((topic, tidx) => (
                              <span
                                key={tidx}
                                style={{
                                  fontSize: '0.68rem',
                                  padding: '2px 7px',
                                  borderRadius: '6px',
                                  background: 'rgba(255, 255, 255, 0.04)',
                                  color: '#cbd5e1',
                                  border: '1px solid rgba(255, 255, 255, 0.08)'
                                }}
                              >
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                      <button
                        onClick={() => handleSelectDomain(targetObj.title, 'roadmap')}
                        className="btn-primary"
                        style={{
                          flex: 1,
                          padding: '8px 10px',
                          fontSize: '0.76rem',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px'
                        }}
                      >
                        <Target size={13} />
                        <span>{isCurrentActive ? 'View Active Roadmap' : 'Choose Domain'}</span>
                      </button>

                      <button
                        onClick={() => handleSelectDomain(targetObj.title, 'assessment')}
                        style={{
                          padding: '8px 10px',
                          fontSize: '0.76rem',
                          borderRadius: '8px',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          color: '#e2e8f0',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                        title="Test your basic knowledge on this sector"
                      >
                        <ClipboardCheck size={13} color="#06b6d4" />
                        <span>Take Test</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
