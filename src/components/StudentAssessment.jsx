import React, { useState, useEffect } from 'react';
import { 
  ClipboardCheck, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw, 
  Award, 
  Sparkles, 
  AlertCircle, 
  BookOpen, 
  Target, 
  Lightbulb, 
  TrendingUp, 
  Check, 
  X,
  Layers,
  ChevronRight,
  Compass
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getAssessmentForRole, SECTOR_ASSESSMENTS } from '../data/sectorAssessments';
import { TARGET_ROLES } from '../data/rolesData';
import { getAdaptiveTasksForRole } from '../data/adaptiveTasksData';
import { evaluateStudentKnowledge } from '../data/courseRecommendations';
import { Star, Clock } from 'lucide-react';

export default function StudentAssessment({ 
  onSaveAssessment, 
  existingResults,
  targetRoleTitle = 'Software Developer',
  onNavigateToTab 
}) {
  const [selectedRole, setSelectedRole] = useState(targetRoleTitle);
  const [assessmentData, setAssessmentData] = useState(() => getAssessmentForRole(targetRoleTitle));

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [results, setResults] = useState(null);

  // Sync assessment data when targetRoleTitle or selectedRole changes
  useEffect(() => {
    const data = getAssessmentForRole(selectedRole);
    setAssessmentData(data);
    setCurrentIdx(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setResults(null);
  }, [selectedRole]);

  const questions = assessmentData.questions;
  const currentQ = questions[currentIdx] || questions[0];

  const handleSelectOption = (qId, optionIdx) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  // Submit and calculate role-specific score & learning gaps
  const handleSubmit = () => {
    let correctCount = 0;
    const missedQuestions = [];
    const masteredConcepts = [];

    questions.forEach(q => {
      const isCorrect = selectedAnswers[q.id] === q.correctIndex;
      if (isCorrect) {
        correctCount++;
        masteredConcepts.push(q.topic);
      } else {
        missedQuestions.push(q);
      }
    });

    const scorePercent = Math.round((correctCount / questions.length) * 100);

    // Build category scores for placement dashboard compatibility
    const categoryScores = {
      [assessmentData.sectorName || 'Core Sector']: scorePercent,
      'Problem Solving': Math.min(100, scorePercent + 10),
      'Communication': 75
    };

    // Identified basics to learn
    const basicsToLearn = missedQuestions.map(q => q.basicToLearn);

    // If 100% correct, recommend next-level concepts from curriculum tracks
    const recommendations = basicsToLearn.length > 0
      ? basicsToLearn
      : assessmentData.curriculumTracks.map(t => ({
          concept: t.topic,
          importance: `Advanced mastery level for ${t.level} candidate standing.`,
          keyRule: 'You answered all diagnostic questions correctly! Move to system trade-offs and edge-case handling.',
          action: 'Practice full interview simulation questions in the AI Mock Interview.'
        }));

    const adaptivePlan = getAdaptiveTasksForRole(assessmentData.roleTitle, scorePercent);
    const knowledgeEval = evaluateStudentKnowledge(assessmentData.roleTitle, scorePercent, missedQuestions, masteredConcepts);

    const finalResults = {
      roleTitle: assessmentData.roleTitle,
      sectorName: assessmentData.sectorName,
      totalQuestions: questions.length,
      correctCount,
      scorePercent,
      missedQuestions,
      masteredConcepts,
      recommendations,
      adaptivePlan,
      knowledgeEval,
      categoryScores,
      weakestCategories: missedQuestions.map(q => q.topic).slice(0, 3),
      completedAt: new Date().toLocaleDateString()
    };

    setResults(finalResults);
    setIsSubmitted(true);
    if (onSaveAssessment) onSaveAssessment(finalResults);

    confetti({
      particleCount: 85,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#8b5cf6', '#10b981', '#f59e0b', '#06b6d4']
    });
  };

  // Fast-forward demo for testing: simulate low score (<60%) or high score (100%)
  const handleSimulateScore = (level = 'low') => {
    const demoAnswers = {};
    const missed = [];
    const mastered = [];

    questions.forEach((q, idx) => {
      if (level === 'low') {
        // Miss 3 questions -> 2/5 (40%) triggers Foundations Track
        if (idx === 1 || idx === 2 || idx === 4) {
          demoAnswers[q.id] = (q.correctIndex + 1) % q.options.length;
          missed.push(q);
        } else {
          demoAnswers[q.id] = q.correctIndex;
          mastered.push(q.topic);
        }
      } else {
        // High score -> 5/5 (100%) triggers Advanced Mastery Track
        demoAnswers[q.id] = q.correctIndex;
        mastered.push(q.topic);
      }
    });

    setSelectedAnswers(demoAnswers);
    const correctCount = questions.length - missed.length;
    const scorePercent = Math.round((correctCount / questions.length) * 100);
    const adaptivePlan = getAdaptiveTasksForRole(assessmentData.roleTitle, scorePercent);
    const knowledgeEval = evaluateStudentKnowledge(assessmentData.roleTitle, scorePercent, missed, mastered);

    const demoResults = {
      roleTitle: assessmentData.roleTitle,
      sectorName: assessmentData.sectorName,
      totalQuestions: questions.length,
      correctCount,
      scorePercent,
      missedQuestions: missed,
      masteredConcepts: mastered,
      recommendations: missed.length > 0 ? missed.map(q => q.basicToLearn) : assessmentData.curriculumTracks.map(t => ({
        concept: t.topic,
        importance: `Advanced mastery level for ${t.level} candidate standing.`,
        keyRule: 'You answered all diagnostic questions correctly! Move to system trade-offs.',
        action: 'Practice full interview simulation questions in the AI Mock Interview.'
      })),
      adaptivePlan,
      knowledgeEval,
      categoryScores: {
        [assessmentData.sectorName || 'Core Sector']: scorePercent,
        'Problem Solving': level === 'low' ? 55 : 95,
        'Communication': level === 'low' ? 65 : 90
      },
      weakestCategories: missed.map(q => q.topic),
      completedAt: new Date().toLocaleDateString()
    };

    setResults(demoResults);
    setIsSubmitted(true);
    if (onSaveAssessment) onSaveAssessment(demoResults);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: level === 'high' ? ['#10b981', '#06b6d4', '#8b5cf6'] : ['#f59e0b', '#ec4899', '#8b5cf6']
    });
  };

  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '24px 20px' }}>
      
      {/* Top Header & Role Switcher */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%)',
        border: '1px solid rgba(139, 92, 246, 0.25)',
        borderRadius: '20px',
        padding: '24px 28px',
        marginBottom: '26px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{
              background: '#8b5cf6',
              color: '#ffffff',
              fontSize: '0.75rem',
              fontWeight: 800,
              padding: '3px 10px',
              borderRadius: '6px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em'
            }}>
              Role Diagnostic
            </span>
            <span style={{ fontSize: '0.85rem', color: '#c4b5fd', fontWeight: 600 }}>
              Sector: <strong>{assessmentData.sectorName}</strong>
            </span>
          </div>

          {/* Quick Simulation Controls for Testing Both Tracks */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>Test Tracks:</span>
            <button
              onClick={() => handleSimulateScore('low')}
              style={{
                background: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                color: '#fbbf24',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
              title="Simulates 2/5 correct (40%): Triggers Foundations Track with basic daily missions"
            >
              <Sparkles size={13} />
              <span>Simulate Low Score (40% · Basics)</span>
            </button>

            <button
              onClick={() => handleSimulateScore('high')}
              style={{
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                color: '#34d399',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
              title="Simulates 5/5 correct (100%): Triggers Advanced Mastery Track with enhanced challenges"
            >
              <Award size={13} />
              <span>Simulate High Score (100% · Advanced)</span>
            </button>
          </div>
        </div>

        <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#f8fafc', margin: '0 0 6px' }}>
          {assessmentData.roleTitle} — Sector Knowledge Test
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: '0 0 18px', maxWidth: '780px', lineHeight: 1.5 }}>
          {assessmentData.description} Answer these 5 straightforward questions to evaluate your readiness. After the test, you will receive personalized recommendations on the specific basics you need to learn.
        </p>

        {/* Sector Selector Pills */}
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#94a3b8', marginBottom: '8px' }}>
            Switch Sector to Test Another Role:
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {Object.keys(SECTOR_ASSESSMENTS).map(roleKey => {
              const isSelected = selectedRole === roleKey;
              return (
                <button
                  key={roleKey}
                  onClick={() => setSelectedRole(roleKey)}
                  style={{
                    background: isSelected ? 'rgba(139, 92, 246, 0.35)' : 'rgba(255, 255, 255, 0.04)',
                    border: isSelected ? '1px solid #8b5cf6' : '1px solid rgba(255, 255, 255, 0.08)',
                    color: isSelected ? '#fff' : '#cbd5e1',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: isSelected ? 700 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {roleKey}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {!isSubmitted ? (
        /* ==================== QUESTION CARD ==================== */
        <div className="glass-panel" style={{ padding: '32px' }}>
          
          {/* Progress Header */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.825rem', color: '#94a3b8', marginBottom: '10px' }}>
              <span>Question <strong>{currentIdx + 1}</strong> of <strong>{questions.length}</strong></span>
              <span style={{
                background: 'rgba(6, 182, 212, 0.15)',
                color: '#67e8f9',
                padding: '2px 10px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: 700
              }}>
                Topic: {currentQ.topic}
              </span>
              <span>{answeredCount}/{questions.length} Answered</span>
            </div>

            <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '99px', overflow: 'hidden' }}>
              <div style={{
                width: `${((currentIdx + 1) / questions.length) * 100}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #8b5cf6, #06b6d4)',
                borderRadius: '99px',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>

          {/* Question Text */}
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1.45, marginBottom: '24px' }}>
            {currentQ.question}
          </h2>

          {/* Options List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
            {currentQ.options.map((opt, oIdx) => {
              const isSelected = selectedAnswers[currentQ.id] === oIdx;
              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(currentQ.id, oIdx)}
                  style={{
                    textAlign: 'left',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    fontSize: '0.9rem',
                    fontWeight: isSelected ? 700 : 500,
                    background: isSelected 
                      ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.25) 0%, rgba(6, 182, 212, 0.15) 100%)' 
                      : 'rgba(255, 255, 255, 0.03)',
                    border: isSelected ? '2px solid #8b5cf6' : '1px solid rgba(255, 255, 255, 0.08)',
                    color: isSelected ? '#ffffff' : '#cbd5e1',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: isSelected ? '#8b5cf6' : 'rgba(255, 255, 255, 0.08)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    flexShrink: 0
                  }}>
                    {String.fromCharCode(65 + oIdx)}
                  </span>
                  <span style={{ lineHeight: 1.4 }}>{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '20px' }}>
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="btn-secondary"
              style={{ opacity: currentIdx === 0 ? 0.4 : 1, cursor: currentIdx === 0 ? 'not-allowed' : 'pointer' }}
            >
              <ArrowLeft size={16} />
              <span>Previous</span>
            </button>

            {currentIdx < questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="btn-primary"
                style={{ padding: '10px 24px' }}
              >
                <span>Next Question</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="btn-primary"
                style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', padding: '10px 28px' }}
              >
                <CheckCircle2 size={18} />
                <span>Submit & Get Learning Recommendations</span>
              </button>
            )}
          </div>

        </div>
      ) : (
        /* ==================== RESULTS & PERSONALIZED RECOMMENDATIONS ==================== */
        <div className="glass-panel" style={{ padding: '32px', animation: 'fadeIn 0.3s ease' }}>
          
          {/* Top Score Banner */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '18px',
            paddingBottom: '24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '28px'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{
                  background: results.scorePercent >= 80 ? 'rgba(16, 185, 129, 0.2)' : (results.scorePercent >= 60 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)'),
                  color: results.scorePercent >= 80 ? '#34d399' : (results.scorePercent >= 60 ? '#fbbf24' : '#f87171'),
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '3px 10px',
                  borderRadius: '6px',
                  textTransform: 'uppercase'
                }}>
                  {results.scorePercent >= 80 ? 'Strong Readiness' : (results.scorePercent >= 60 ? 'Moderate Foundation' : 'Foundational Gaps Detected')}
                </span>
                <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                  {results.correctCount} of {results.totalQuestions} Questions Correct
                </span>
              </div>

              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                {results.roleTitle} Diagnostic Score: <span style={{ color: results.scorePercent >= 80 ? '#34d399' : (results.scorePercent >= 60 ? '#fbbf24' : '#f87171') }}>{results.scorePercent}%</span>
              </h2>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentIdx(0);
                  setSelectedAnswers({});
                }}
                className="btn-secondary"
                style={{ fontSize: '0.825rem', padding: '8px 14px' }}
              >
                <RotateCcw size={14} />
                <span>Retake Test</span>
              </button>
            </div>
          </div>

          {/* Section: Tailored Basics to Learn Recommendations */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <BookOpen size={20} color="#8b5cf6" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                {results.missedQuestions.length > 0
                  ? `Recommended Basics to Learn for ${results.roleTitle}`
                  : `Next-Level Edge Topics for ${results.roleTitle}`}
              </h3>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', margin: '0 0 20px', lineHeight: 1.5 }}>
              {results.missedQuestions.length > 0
                ? 'Based on the questions you missed, here are the exact basic concepts you should master to pass technical interviews for this role.'
                : 'Congratulations! You mastered all the foundational questions for this sector. Here are the recommended intermediate topics to push into the top 1% of applicants.'}
            </p>

            {/* Recommendation Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {results.recommendations.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    borderRadius: '16px',
                    padding: '20px 24px',
                    borderLeft: '4px solid #8b5cf6'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        background: '#8b5cf6',
                        color: '#fff',
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 800
                      }}>
                        {idx + 1}
                      </span>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                        {item.concept}
                      </h4>
                    </div>

                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: '#a78bfa',
                      background: 'rgba(139, 92, 246, 0.15)',
                      padding: '2px 8px',
                      borderRadius: '6px'
                    }}>
                      Priority Basic Concept
                    </span>
                  </div>

                  <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.5, margin: '0 0 12px' }}>
                    <strong style={{ color: '#e2e8f0' }}>Why It Matters:</strong> {item.importance}
                  </p>

                  <div style={{
                    background: 'rgba(6, 182, 212, 0.06)',
                    border: '1px solid rgba(6, 182, 212, 0.2)',
                    borderRadius: '10px',
                    padding: '10px 14px',
                    marginBottom: '10px',
                    fontSize: '0.825rem',
                    color: '#67e8f9',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px'
                  }}>
                    <Lightbulb size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span><strong style={{ color: '#a5f3fc' }}>Rule to Remember:</strong> {item.keyRule}</span>
                  </div>

                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                    <strong style={{ color: '#c4b5fd' }}>Recommended Action:</strong> {item.action}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Sector Curriculum Pathway Preview */}
          {assessmentData.curriculumTracks && (
            <div style={{
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '20px 24px',
              marginBottom: '28px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Layers size={18} color="#06b6d4" />
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                  Structured Learning Pathway for {results.roleTitle}
                </h4>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                {assessmentData.curriculumTracks.map((track, tIdx) => (
                  <div
                    key={tIdx}
                    style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '10px',
                      padding: '12px 14px'
                    }}
                  >
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#06b6d4', textTransform: 'uppercase', marginBottom: '4px' }}>
                      Stage {tIdx + 1} · {track.level}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#e2e8f0', fontWeight: 600 }}>
                      {track.topic}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Adaptive Daily Tasks Based on Diagnostic Performance */}
          {results.adaptivePlan && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(20, 26, 42, 0.95) 0%, rgba(13, 19, 33, 0.98) 100%)',
              border: `1px solid ${results.scorePercent >= 75 ? 'rgba(16, 185, 129, 0.4)' : 'rgba(245, 158, 11, 0.4)'}`,
              borderRadius: '20px',
              padding: '24px 28px',
              marginBottom: '28px',
              boxShadow: results.scorePercent >= 75 ? '0 0 25px rgba(16, 185, 129, 0.15)' : '0 0 25px rgba(245, 158, 11, 0.15)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    background: results.scorePercent >= 75 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Target size={18} color={results.scorePercent >= 75 ? '#34d399' : '#fbbf24'} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                        {results.adaptivePlan.activeTrack.trackName} — Assigned 7-Day Tasks
                      </h4>
                      <span style={{
                        background: results.scorePercent >= 75 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                        color: results.scorePercent >= 75 ? '#34d399' : '#fbbf24',
                        border: `1px solid ${results.scorePercent >= 75 ? 'rgba(16, 185, 129, 0.4)' : 'rgba(245, 158, 11, 0.4)'}`,
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: '99px',
                        textTransform: 'uppercase'
                      }}>
                        {results.adaptivePlan.activeTrack.trackTier}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: '4px 0 0' }}>
                      {results.scorePercent >= 75 
                        ? 'Because you answered well (score >= 75%), you have unlocked enhanced production-grade challenges compared to the basic track.'
                        : 'Because your diagnostic score was under 75%, we assigned you structured daily foundational tasks to master the basics first.'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onNavigateToTab('roadmap')}
                  className="btn-primary"
                  style={{
                    padding: '8px 16px',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span>Open 7-Day Roadmap</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* Day-by-Day Cards Preview */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
                {results.adaptivePlan.activeTrack.days.map((dayItem) => (
                  <div
                    key={dayItem.day}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.07)',
                      borderRadius: '12px',
                      padding: '14px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '8px'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ fontSize: '0.72rem', fontWeight: 800, color: results.scorePercent >= 75 ? '#34d399' : '#fbbf24', textTransform: 'uppercase' }}>
                          Day {dayItem.day} · {dayItem.duration}
                        </span>
                        <span style={{
                          fontSize: '0.65rem',
                          padding: '1px 6px',
                          borderRadius: '4px',
                          background: dayItem.difficulty === 'Advanced' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                          color: dayItem.difficulty === 'Advanced' ? '#34d399' : '#fbbf24',
                          fontWeight: 700
                        }}>
                          {dayItem.difficulty}
                        </span>
                      </div>

                      <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc', marginBottom: '4px' }}>
                        {dayItem.title}
                      </div>

                      <p style={{ fontSize: '0.76rem', color: '#94a3b8', margin: '0 0 6px', lineHeight: 1.4 }}>
                        {dayItem.goal}
                      </p>
                    </div>

                    <div style={{
                      fontSize: '0.72rem',
                      color: '#cbd5e1',
                      background: 'rgba(255, 255, 255, 0.03)',
                      padding: '6px 8px',
                      borderRadius: '6px',
                      borderLeft: `2px solid ${results.scorePercent >= 75 ? '#10b981' : '#f59e0b'}`
                    }}>
                      <strong style={{ color: '#fff' }}>Task:</strong> {dayItem.keyExercise}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section: Recommended Courses to Master Based on Knowledge Level */}
          {results.knowledgeEval?.recommendedCourses && results.knowledgeEval.recommendedCourses.length > 0 && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(20, 24, 38, 0.98) 100%)',
              border: '1px solid rgba(59, 130, 246, 0.35)',
              borderRadius: '20px',
              padding: '24px 28px',
              marginBottom: '28px',
              boxShadow: '0 0 25px rgba(59, 130, 246, 0.12)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    background: 'rgba(59, 130, 246, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#93c5fd'
                  }}>
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                      Recommended Courses to Master
                    </h4>
                    <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: '4px 0 0' }}>
                      {results.scorePercent >= 75
                        ? 'Elevated mastery courses covering large-scale production architecture and interview system design.'
                        : 'Foundational step-by-step courses to build rock-solid basics before attempting advanced topics.'}
                    </p>
                  </div>
                </div>

                <span style={{
                  padding: '4px 10px',
                  borderRadius: '99px',
                  background: 'rgba(59, 130, 246, 0.15)',
                  color: '#93c5fd',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  fontSize: '0.72rem',
                  fontWeight: 700
                }}>
                  {results.knowledgeEval.knowledgeLevel.split(' ')[0]} Standing
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '14px' }}>
                {results.knowledgeEval.recommendedCourses.map((course) => (
                  <div
                    key={course.id}
                    style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '14px',
                      padding: '18px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '10px'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{
                          fontSize: '0.7rem',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          background: 'rgba(59, 130, 246, 0.2)',
                          color: '#93c5fd',
                          fontWeight: 700
                        }}>
                          {course.level}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.75rem', color: '#94a3b8' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <Clock size={12} /> {course.duration}
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#fbbf24' }}>
                            <Star size={12} fill="#fbbf24" /> {course.rating}
                          </span>
                        </div>
                      </div>

                      <h5 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', margin: '0 0 6px 0', lineHeight: 1.3 }}>
                        {course.title}
                      </h5>
                      <p style={{ fontSize: '0.78rem', color: '#94a3b8', margin: '0 0 10px 0', lineHeight: 1.4 }}>
                        {course.description}
                      </p>

                      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '10px' }}>
                        {course.skills.map((sk, sIdx) => (
                          <span key={sIdx} style={{
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

                      <div style={{
                        background: 'rgba(0, 0, 0, 0.2)',
                        borderRadius: '8px',
                        padding: '8px 10px'
                      }}>
                        <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, marginBottom: '4px' }}>
                          Curriculum Modules:
                        </div>
                        {course.curriculum.map((mod, mIdx) => (
                          <div key={mIdx} style={{ fontSize: '0.72rem', color: '#cbd5e1', padding: '1px 0', display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#3b82f6' }} />
                            <span>{mod}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next Action Buttons */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigateToTab('roadmap')}
              className="btn-primary"
              style={{ padding: '12px 24px' }}
            >
              <span>Add Recommendations to 7-Day Roadmap</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => onNavigateToTab('quests')}
              className="btn-secondary"
              style={{ padding: '12px 20px' }}
            >
              <span>Practice in Daily Quests</span>
            </button>

            <button
              onClick={() => onNavigateToTab('dashboard')}
              className="btn-secondary"
              style={{ padding: '12px 20px' }}
            >
              <span>View Readiness Hub</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
