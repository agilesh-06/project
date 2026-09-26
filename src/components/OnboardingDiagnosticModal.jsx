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
  GraduationCap,
  Briefcase,
  Compass,
  Clock,
  Star,
  Zap,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getAssessmentForRole } from '../data/sectorAssessments';
import { getAdaptiveTasksForRole } from '../data/adaptiveTasksData';
import { evaluateStudentKnowledge, SECTOR_COURSES } from '../data/courseRecommendations';

const SECTORS = [
  'Software Developer',
  'Frontend Engineer',
  'Backend Developer',
  'Full Stack Engineer',
  'AI / ML Engineer',
  'Data Engineer'
];

export default function OnboardingDiagnosticModal({
  isOpen,
  onClose,
  initialRole = 'Software Developer',
  studentName = 'Student',
  onComplete
}) {
  // Steps: 'select_sector' | 'quiz' | 'evaluation'
  const [currentStep, setCurrentStep] = useState('select_sector');
  const [selectedSector, setSelectedSector] = useState(initialRole);
  const [assessmentData, setAssessmentData] = useState(() => getAssessmentForRole(initialRole));

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [evaluation, setEvaluation] = useState(null);

  // Sync assessment data whenever sector changes
  useEffect(() => {
    const data = getAssessmentForRole(selectedSector);
    setAssessmentData(data);
    setCurrentIdx(0);
    setSelectedAnswers({});
  }, [selectedSector]);

  if (!isOpen) return null;

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

  // Submit and evaluate
  const handleEvaluate = () => {
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
    const evalResult = evaluateStudentKnowledge(selectedSector, scorePercent, missedQuestions, masteredConcepts);
    const adaptivePlan = getAdaptiveTasksForRole(selectedSector, scorePercent);

    const fullResult = {
      ...evalResult,
      totalQuestions: questions.length,
      correctCount,
      missedQuestions,
      masteredConcepts,
      adaptivePlan,
      categoryScores: {
        [evalResult.sectorName || 'Core Sector']: scorePercent,
        'Problem Solving': Math.min(100, scorePercent + 10),
        'Communication': 75
      },
      weakestCategories: missedQuestions.map(q => q.topic).slice(0, 3),
      completedAt: new Date().toLocaleDateString()
    };

    setEvaluation(fullResult);
    setCurrentStep('evaluation');

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#8b5cf6', '#10b981', '#f59e0b', '#06b6d4']
    });

    if (onComplete) {
      onComplete(fullResult);
    }
  };

  // Simulation shortcut for fast testing (Low 40% vs High 100%)
  const handleSimulate = (level = 'low') => {
    const demoAnswers = {};
    const missed = [];
    const mastered = [];

    questions.forEach((q, idx) => {
      if (level === 'low') {
        // Miss 3 questions -> 2/5 (40%) triggers Foundations
        if (idx === 1 || idx === 2 || idx === 4) {
          demoAnswers[q.id] = (q.correctIndex + 1) % q.options.length;
          missed.push(q);
        } else {
          demoAnswers[q.id] = q.correctIndex;
          mastered.push(q.topic);
        }
      } else {
        // 5/5 (100%) triggers Advanced
        demoAnswers[q.id] = q.correctIndex;
        mastered.push(q.topic);
      }
    });

    setSelectedAnswers(demoAnswers);
    const correctCount = questions.length - missed.length;
    const scorePercent = Math.round((correctCount / questions.length) * 100);

    const evalResult = evaluateStudentKnowledge(selectedSector, scorePercent, missed, mastered);
    const adaptivePlan = getAdaptiveTasksForRole(selectedSector, scorePercent);

    const fullResult = {
      ...evalResult,
      totalQuestions: questions.length,
      correctCount,
      missedQuestions: missed,
      masteredConcepts: mastered,
      adaptivePlan,
      categoryScores: {
        [evalResult.sectorName || 'Core Sector']: scorePercent,
        'Problem Solving': Math.min(100, scorePercent + 10),
        'Communication': 75
      },
      weakestCategories: missed.map(q => q.topic).slice(0, 3),
      completedAt: new Date().toLocaleDateString()
    };

    setEvaluation(fullResult);
    setCurrentStep('evaluation');

    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#8b5cf6', '#10b981', '#f59e0b', '#06b6d4']
    });

    if (onComplete) {
      onComplete(fullResult);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(7, 9, 14, 0.88)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1100,
      padding: '20px'
    }}>
      <div style={{
        background: 'linear-gradient(145deg, rgba(20, 24, 38, 0.98), rgba(12, 15, 26, 0.99))',
        border: '1px solid rgba(139, 92, 246, 0.35)',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(139, 92, 246, 0.2)',
        borderRadius: '24px',
        width: '100%',
        maxWidth: '920px',
        maxHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative'
      }}>

        {/* Modal Top Header */}
        <div style={{
          padding: '20px 28px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255, 255, 255, 0.02)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(59, 130, 246, 0.2))',
              border: '1px solid rgba(139, 92, 246, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#c4b5fd'
            }}>
              <GraduationCap size={22} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800, color: '#a78bfa' }}>
                  New Student Onboarding
                </span>
                <span style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: '6px', background: 'rgba(59, 130, 246, 0.15)', color: '#93c5fd', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                  SkillTree Evaluator
                </span>
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                {currentStep === 'select_sector' && `Welcome, ${studentName}! Choose Your Placement Sector`}
                {currentStep === 'quiz' && `${selectedSector} - Basic Knowledge Diagnostic`}
                {currentStep === 'evaluation' && `Diagnostic Complete - Your Evaluated Knowledge Level`}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s, color 0.2s'
            }}
            onMouseOver={(e) => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'; }}
            onMouseOut={(e) => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.background = 'transparent'; }}
            title="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ padding: '24px 28px', overflowY: 'auto', flex: 1 }}>

          {/* STEP 1: SELECT SECTOR */}
          {currentStep === 'select_sector' && (
            <div>
              <div style={{
                background: 'rgba(139, 92, 246, 0.08)',
                border: '1px solid rgba(139, 92, 246, 0.25)',
                borderRadius: '16px',
                padding: '16px 20px',
                marginBottom: '24px',
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start'
              }}>
                <Sparkles size={20} color="#c4b5fd" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: '1.5' }}>
                  <strong style={{ color: '#ffffff' }}>Why do we ask diagnostic questions?</strong>
                  <br />
                  Every new student has different fundamentals. By answering 5 simple sector questions, our evaluation engine detects your basic knowledge level. If you score low, we assign step-by-step daily foundational tasks. If you answer well, you unlock advanced production tasks and higher-level courses.
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#e2e8f0', display: 'block', marginBottom: '10px' }}>
                  Select Your Target Sector / Role:
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '12px'
                }}>
                  {SECTORS.map((sector) => {
                    const isSelected = selectedSector === sector;
                    return (
                      <button
                        key={sector}
                        onClick={() => setSelectedSector(sector)}
                        style={{
                          background: isSelected 
                            ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(59, 130, 246, 0.2))' 
                            : 'rgba(255, 255, 255, 0.03)',
                          border: isSelected 
                            ? '1.5px solid #8b5cf6' 
                            : '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '14px',
                          padding: '16px',
                          textAlign: 'left',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          boxShadow: isSelected ? '0 8px 24px rgba(139, 92, 246, 0.25)' : 'none',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Briefcase size={18} color={isSelected ? '#c4b5fd' : '#94a3b8'} />
                          <span style={{ fontSize: '0.92rem', fontWeight: 700, color: isSelected ? '#ffffff' : '#cbd5e1' }}>
                            {sector}
                          </span>
                        </div>
                        {isSelected && (
                          <div style={{
                            width: '22px',
                            height: '22px',
                            borderRadius: '50%',
                            background: '#8b5cf6',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#ffffff'
                          }}>
                            <Check size={14} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sector description preview */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '14px',
                padding: '16px',
                marginTop: '16px'
              }}>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
                  Diagnostic Focus for {selectedSector}:
                </div>
                <div style={{ fontSize: '0.88rem', color: '#e2e8f0', lineHeight: '1.5' }}>
                  {assessmentData.description}
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
                  {assessmentData.questions.map((q, idx) => (
                    <span key={q.id} style={{
                      fontSize: '0.75rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: '4px 10px',
                      borderRadius: '99px',
                      color: '#cbd5e1'
                    }}>
                      Q{idx + 1}: {q.topic}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  onClick={() => setCurrentStep('quiz')}
                  style={{
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '12px 28px',
                    fontWeight: 800,
                    fontSize: '0.92rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 8px 24px rgba(139, 92, 246, 0.4)'
                  }}
                >
                  <span>Start Sector Diagnostic</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: INTERACTIVE QUIZ */}
          {currentStep === 'quiz' && (
            <div>
              {/* Progress & Shortcuts Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '20px'
              }}>
                <div>
                  <span style={{ fontSize: '0.78rem', color: '#a78bfa', fontWeight: 700, textTransform: 'uppercase' }}>
                    Question {currentIdx + 1} of {questions.length}
                  </span>
                  <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                    Topic: <strong style={{ color: '#e2e8f0' }}>{currentQ.topic}</strong>
                  </div>
                </div>

                {/* Fast-Forward Simulation Buttons for judges/testing */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleSimulate('low')}
                    style={{
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: '#fca5a5',
                      padding: '5px 12px',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                    title="Simulate low score to test Foundations Track assignment"
                  >
                    Simulate Low Score (40% · Basics)
                  </button>
                  <button
                    onClick={() => handleSimulate('high')}
                    style={{
                      background: 'rgba(16, 185, 129, 0.1)',
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      color: '#6ee7b7',
                      padding: '5px 12px',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                    title="Simulate 100% score to test Advanced Track assignment"
                  >
                    Simulate High Score (100% · Advanced)
                  </button>
                </div>
              </div>

              {/* Progress Track */}
              <div style={{
                height: '6px',
                width: '100%',
                background: 'rgba(255, 255, 255, 0.08)',
                borderRadius: '99px',
                overflow: 'hidden',
                marginBottom: '24px'
              }}>
                <div style={{
                  height: '100%',
                  width: `${((currentIdx + 1) / questions.length) * 100}%`,
                  background: 'linear-gradient(90deg, #8b5cf6, #3b82f6)',
                  borderRadius: '99px',
                  transition: 'width 0.3s ease'
                }} />
              </div>

              {/* Question Card */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '18px',
                padding: '24px',
                marginBottom: '24px'
              }}>
                <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', lineHeight: '1.5', marginBottom: '20px' }}>
                  {currentQ.question}
                </div>

                {/* Options Grid */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {currentQ.options.map((opt, oIdx) => {
                    const isSelected = selectedAnswers[currentQ.id] === oIdx;
                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectOption(currentQ.id, oIdx)}
                        style={{
                          background: isSelected 
                            ? 'rgba(139, 92, 246, 0.2)' 
                            : 'rgba(255, 255, 255, 0.03)',
                          border: isSelected 
                            ? '1.5px solid #8b5cf6' 
                            : '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '12px',
                          padding: '14px 18px',
                          color: isSelected ? '#ffffff' : '#cbd5e1',
                          fontWeight: isSelected ? 700 : 500,
                          fontSize: '0.9rem',
                          textAlign: 'left',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '50%',
                            background: isSelected ? '#8b5cf6' : 'rgba(255, 255, 255, 0.06)',
                            color: isSelected ? '#ffffff' : '#94a3b8',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.8rem',
                            fontWeight: 700
                          }}>
                            {String.fromCharCode(65 + oIdx)}
                          </div>
                          <span>{opt}</span>
                        </div>
                        {isSelected && <Check size={18} color="#a78bfa" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Controls */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  onClick={handlePrev}
                  disabled={currentIdx === 0}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: currentIdx === 0 ? '#475569' : '#cbd5e1',
                    borderRadius: '10px',
                    padding: '10px 18px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    cursor: currentIdx === 0 ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <ArrowLeft size={16} />
                  <span>Previous</span>
                </button>

                {currentIdx < questions.length - 1 ? (
                  <button
                    onClick={handleNext}
                    style={{
                      background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '10px 22px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>Next</span>
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={handleEvaluate}
                    style={{
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '10px',
                      padding: '10px 24px',
                      fontSize: '0.88rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)'
                    }}
                  >
                    <span>Evaluate Knowledge Level</span>
                    <Sparkles size={16} />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: EVALUATION & TAILORED RECOMMENDATIONS */}
          {currentStep === 'evaluation' && evaluation && (
            <div>
              {/* Score & Knowledge Level Banner */}
              <div style={{
                background: evaluation.isHighScorer 
                  ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(59, 130, 246, 0.08))' 
                  : 'linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(239, 68, 68, 0.08))',
                border: evaluation.isHighScorer 
                  ? '1px solid rgba(16, 185, 129, 0.35)' 
                  : '1px solid rgba(245, 158, 11, 0.35)',
                borderRadius: '18px',
                padding: '24px',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '99px',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        background: evaluation.isHighScorer ? '#065f46' : '#78350f',
                        color: evaluation.isHighScorer ? '#a7f3d0' : '#fde68a',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {evaluation.levelBadge}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                        Domain: {evaluation.sectorName}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', margin: '4px 0 8px 0' }}>
                      {evaluation.knowledgeLevel}
                    </h3>
                    <p style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: '1.5', maxWidth: '620px', margin: 0 }}>
                      {evaluation.evaluationSummary}
                    </p>
                  </div>

                  {/* Score Pill */}
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '16px',
                    padding: '16px 24px',
                    textAlign: 'center',
                    minWidth: '130px'
                  }}>
                    <div style={{
                      fontSize: '2.2rem',
                      fontWeight: 900,
                      color: evaluation.isHighScorer ? '#10b981' : '#f59e0b',
                      lineHeight: '1'
                    }}>
                      {evaluation.scorePercent}%
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
                      {evaluation.correctCount} / {evaluation.totalQuestions} Correct
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 1: BASICS YOU NEED TO LEARN (IDENTIFIED GAPS) */}
              <div style={{ marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <Target size={18} color="#8b5cf6" />
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                    {evaluation.isHighScorer 
                      ? 'Advanced Architecture & System Trade-offs Unlocked' 
                      : 'Core Basics You Need to Learn (Diagnostic Gaps)'}
                  </h4>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                  {evaluation.conceptsToReview.map((concept, cIdx) => (
                    <div
                      key={cIdx}
                      style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.07)',
                        borderRadius: '14px',
                        padding: '16px',
                        borderLeft: evaluation.isHighScorer 
                          ? '3px solid #10b981' 
                          : '3px solid #f59e0b'
                      }}
                    >
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff', marginBottom: '6px' }}>
                        {concept.concept}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '8px', lineHeight: '1.4' }}>
                        {concept.importance}
                      </div>
                      <div style={{
                        background: 'rgba(0, 0, 0, 0.25)',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        fontSize: '0.78rem',
                        color: '#a78bfa'
                      }}>
                        <strong style={{ color: '#c4b5fd' }}>Action:</strong> {concept.action}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 2: RECOMMENDED COURSES TO MASTER */}
              <div style={{ marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <BookOpen size={18} color="#3b82f6" />
                    <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                      Recommended Courses to Master
                    </h4>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                    Curated for {evaluation.knowledgeLevel.split(' ')[0]} Standing
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '14px' }}>
                  {evaluation.recommendedCourses.map((course) => (
                    <div
                      key={course.id}
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.09)',
                        borderRadius: '16px',
                        padding: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '12px'
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{
                            fontSize: '0.72rem',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            background: 'rgba(59, 130, 246, 0.15)',
                            color: '#93c5fd',
                            fontWeight: 700
                          }}>
                            {course.level}
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.78rem', color: '#94a3b8' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Clock size={13} /> {course.duration}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24' }}>
                              <Star size={13} fill="#fbbf24" /> {course.rating}
                            </span>
                          </div>
                        </div>

                        <h5 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#ffffff', margin: '0 0 6px 0', lineHeight: '1.4' }}>
                          {course.title}
                        </h5>
                        <p style={{ fontSize: '0.8rem', color: '#94a3b8', margin: '0 0 12px 0', lineHeight: '1.4' }}>
                          {course.description}
                        </p>

                        {/* Skills Chips */}
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                          {course.skills.map((sk, sIdx) => (
                            <span key={sIdx} style={{
                              fontSize: '0.72rem',
                              background: 'rgba(255, 255, 255, 0.05)',
                              color: '#cbd5e1',
                              padding: '2px 8px',
                              borderRadius: '6px'
                            }}>
                              {sk}
                            </span>
                          ))}
                        </div>

                        {/* Modules Accordion / List */}
                        <div style={{
                          background: 'rgba(0, 0, 0, 0.25)',
                          borderRadius: '10px',
                          padding: '10px 14px'
                        }}>
                          <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, marginBottom: '6px' }}>
                            Key Curriculum Modules:
                          </div>
                          {course.curriculum.map((mod, mIdx) => (
                            <div key={mIdx} style={{ fontSize: '0.75rem', color: '#cbd5e1', padding: '2px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#8b5cf6' }} />
                              <span>{mod}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 3: ASSIGNED 7-DAY DAILY TASK ROADMAP */}
              <div style={{
                background: 'rgba(139, 92, 246, 0.06)',
                border: '1px solid rgba(139, 92, 246, 0.25)',
                borderRadius: '18px',
                padding: '20px',
                marginBottom: '28px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
                  <div>
                    <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#c4b5fd', fontWeight: 800, letterSpacing: '0.5px' }}>
                      Performance-Driven Daily Task Curriculum
                    </span>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', margin: '2px 0 0 0' }}>
                      {evaluation.adaptivePlan?.trackTitle || (evaluation.isHighScorer ? 'Advanced Mastery Track (Day 1 - 7)' : 'Foundations Track (Day 1 - 7)')}
                    </h4>
                  </div>
                  <div style={{
                    padding: '4px 12px',
                    borderRadius: '8px',
                    background: evaluation.isHighScorer ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                    color: evaluation.isHighScorer ? '#6ee7b7' : '#fde68a',
                    fontWeight: 700,
                    fontSize: '0.78rem'
                  }}>
                    {evaluation.adaptivePlan?.difficulty || (evaluation.isHighScorer ? 'Advanced / High-Leverage' : 'Foundational / Beginner')}
                  </div>
                </div>

                <p style={{ fontSize: '0.85rem', color: '#cbd5e1', margin: '0 0 16px 0', lineHeight: '1.5' }}>
                  {evaluation.adaptivePlan?.advice || 'Follow this structured daily roadmap to master concepts step by step.'}
                </p>

                {/* Day 1-7 Micro Timeline */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(105px, 1fr))',
                  gap: '8px'
                }}>
                  {evaluation.adaptivePlan?.tasks?.map((t) => (
                    <div
                      key={t.day}
                      style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                        borderRadius: '10px',
                        padding: '10px 8px',
                        textAlign: 'center'
                      }}
                    >
                      <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#a78bfa' }}>
                        DAY {t.day}
                      </div>
                      <div style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        color: '#e2e8f0',
                        marginTop: '4px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }} title={t.title}>
                        {t.title}
                      </div>
                      <div style={{ fontSize: '0.65rem', color: '#94a3b8', marginTop: '4px' }}>
                        +{t.xp} XP
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '12px',
                flexWrap: 'wrap'
              }}>
                <button
                  onClick={onClose}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#cbd5e1',
                    borderRadius: '12px',
                    padding: '12px 20px',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Close & Explore Dashboard
                </button>

                <button
                  onClick={onClose}
                  style={{
                    background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '12px 24px',
                    fontSize: '0.92rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 8px 24px rgba(139, 92, 246, 0.4)'
                  }}
                >
                  <span>Activate My Personalized Plan</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
