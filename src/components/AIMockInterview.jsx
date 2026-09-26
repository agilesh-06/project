import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Play, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Award, 
  Volume2, 
  Clock, 
  ArrowRight,
  TrendingUp,
  MessageSquare,
  Send,
  HelpCircle,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TARGET_ROLES, INTERVIEW_QUESTIONS_BY_ROLE } from '../data/rolesData';

export default function AIMockInterview({ targetRole, onAddXp }) {
  // Find current role questions
  const currentRoleObj = TARGET_ROLES.find(r => r.title === targetRole) || TARGET_ROLES[0];
  const roleKey = currentRoleObj.id;
  const questionsList = INTERVIEW_QUESTIONS_BY_ROLE[roleKey] || INTERVIEW_QUESTIONS_BY_ROLE.default;

  const [questionIdx, setQuestionIdx] = useState(0);
  const currentQuestion = questionsList[questionIdx] || questionsList[0];

  const [answerMode, setAnswerMode] = useState('audio'); // 'audio' or 'text'
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [transcript, setTranscript] = useState('');
  const [textInput, setTextInput] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState(null);

  const recognitionRef = useRef(null);
  const timerRef = useRef(null);

  // Setup Web Speech API if supported
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript + ' ';
        }
        setTranscript(currentTranscript.trim());
      };

      recognition.onerror = (e) => {
        console.warn('Speech recognition notice:', e.error);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  // Timer countdown for audio
  useEffect(() => {
    if (isRecording && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleStopRecording();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording, timeLeft]);

  // Start recording
  const handleStartRecording = () => {
    setTranscript('');
    setEvaluation(null);
    setTimeLeft(60);
    setIsRecording(true);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.warn('Speech recognition start note:', err);
      }
    }
  };

  // Stop recording and trigger evaluation
  const handleStopRecording = () => {
    setIsRecording(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        // Ignored
      }
    }
    runEvaluation(transcript);
  };

  // Run structured 5-dimension AI evaluation (Priority 8)
  const runEvaluation = (spokenOrWrittenText) => {
    const rawText = spokenOrWrittenText || textInput;
    if (!rawText || rawText.trim().length < 10) {
      return;
    }

    setIsEvaluating(true);

    setTimeout(() => {
      const text = rawText.trim();
      const words = text.split(/\s+/).filter(Boolean);
      const totalWords = words.length;

      // Pacing calculation
      const timeSpent = Math.max(12, 60 - timeLeft);
      const wpm = Math.round((totalWords / timeSpent) * 60);

      // Filler words detection
      const fillers = ['um', 'umm', 'uh', 'like', 'basically', 'actually', 'you know', 'sort of'];
      const detectedFillers = words.filter(w => fillers.includes(w.toLowerCase().replace(/[^a-z]/g, '')));

      // Target keywords hit
      const lower = text.toLowerCase();
      const targetKeywords = currentQuestion.idealKeywords || ['tradeoffs', 'performance', 'complexity'];
      const hits = targetKeywords.filter(kw => lower.includes(kw.toLowerCase()));
      const keywordPct = Math.min(100, Math.round((hits.length / Math.max(2, targetKeywords.length * 0.5)) * 100));

      // 5 Evaluation Dimensions (Priority 8)
      const relevanceScore = text.length > 30 ? (hits.length > 0 ? 88 : 74) : 60;
      const clarityScore = Math.max(55, Math.min(95, 90 - detectedFillers.length * 6));
      const techScore = Math.max(50, Math.min(96, keywordPct > 0 ? keywordPct : 65));
      const commScore = wpm >= 110 && wpm <= 160 ? 90 : 78;

      const overall = Math.round((relevanceScore * 0.25) + (clarityScore * 0.25) + (techScore * 0.3) + (commScore * 0.2));

      setEvaluation({
        rawText: text,
        overallScore: overall,
        dimensions: {
          relevance: { score: relevanceScore, status: relevanceScore >= 75 ? 'Strong' : 'Moderate' },
          clarity: { score: clarityScore, status: detectedFillers.length <= 1 ? 'Clear' : `${detectedFillers.length} Fillers Detected` },
          technicalCorrectness: { score: techScore, status: hits.length >= 2 ? 'Accurate' : 'Missing Key Terms' },
          communication: { score: commScore, status: `${wpm || 135} WPM Pacing` }
        },
        hits,
        missingKeywords: targetKeywords.filter(kw => !hits.includes(kw)),
        improvementSuggestion: hits.length < 2 
          ? `Try mentioning technical concepts like "${targetKeywords.slice(0, 3).join(', ')}" within the first 20 seconds to establish strong authority.`
          : `Great structure! Maintain this steady pacing and continue leading with your core conclusion immediately.`
      });

      setIsEvaluating(false);

      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#8b5cf6', '#10b981', '#06b6d4']
      });

      onAddXp(200);
    }, 750);
  };

  // Next Question in Interview Flow
  const handleNextQuestion = () => {
    if (questionIdx < questionsList.length - 1) {
      setQuestionIdx(questionIdx + 1);
    } else {
      setQuestionIdx(0);
    }
    setEvaluation(null);
    setTranscript('');
    setTextInput('');
    setTimeLeft(60);
  };

  // Demo answer simulation
  const handleSimulateAnswer = () => {
    let demoText = "";
    if (currentQuestion.id === 'sd_q1') {
      demoText = "To find the middle element of a singly linked list in a single pass, I would use the two-pointer technique with a slow and fast pointer. The slow pointer moves one node at a time while the fast pointer advances two nodes. When the fast pointer hits null or the end of the list, the slow pointer will be exactly at the midpoint. This achieves O(N) linear time with O(1) auxiliary space.";
    } else if (currentQuestion.id === 'sd_q2') {
      demoText = "Optimistic locking assumes collisions are rare; it checks a version or timestamp column before committing, rolling back if another transaction updated the row. Pessimistic locking locks the row immediately using SELECT FOR UPDATE. We use optimistic locking in read-heavy applications like e-commerce catalogs to avoid blocking, and pessimistic locking in banking ledgers where contention is high.";
    } else {
      demoText = "I would analyze the core trade-offs directly. For this service, strict ACID consistency is necessary to prevent duplicate transactions, so a relational database like PostgreSQL is the ideal fit. We can add a Redis cache-aside layer in front to absorb high read spikes.";
    }

    setTranscript(demoText);
    setTextInput(demoText);
    runEvaluation(demoText);
  };

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '24px 20px' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>
            AI Mock Interview & Whiteboard Articulation
          </h1>
          <span style={{
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(139, 92, 246, 0.2))',
            border: '1px solid rgba(6, 182, 212, 0.4)',
            color: '#38bdf8',
            padding: '3px 10px',
            borderRadius: '99px',
            fontSize: '0.75rem',
            fontWeight: 700
          }}>
            Multi-Turn Round
          </span>
        </div>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '4px' }}>
          Practice thinking out loud and answering interview prompts tailored for <strong>{targetRole}</strong>. Receive multi-dimensional feedback on relevance, clarity, technical correctness, and pacing.
        </p>
      </div>

      {/* Main Interview Card */}
      <div className="glass-panel" style={{ padding: '32px', marginBottom: '24px' }}>
        
        {/* Progress & Round Context */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              background: 'rgba(139, 92, 246, 0.25)',
              color: '#c4b5fd',
              fontSize: '0.75rem',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '6px'
            }}>
              Question {questionIdx + 1} of {questionsList.length}
            </span>
            <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              Round: <strong>{currentQuestion.context || 'Technical Screening'}</strong>
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setAnswerMode('audio')}
              style={{
                background: answerMode === 'audio' ? '#8b5cf6' : 'rgba(255, 255, 255, 0.05)',
                color: answerMode === 'audio' ? '#fff' : '#94a3b8',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Microphone
            </button>
            <button
              onClick={() => setAnswerMode('text')}
              style={{
                background: answerMode === 'text' ? '#8b5cf6' : 'rgba(255, 255, 255, 0.05)',
                color: answerMode === 'text' ? '#fff' : '#94a3b8',
                border: 'none',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              ⌨️ Text Mode
            </button>
          </div>
        </div>

        {/* AI Question Box */}
        <div style={{
          background: 'rgba(139, 92, 246, 0.08)',
          borderLeft: '4px solid #8b5cf6',
          borderRadius: '0 12px 12px 0',
          padding: '20px 24px',
          marginBottom: '24px'
        }}>
          <div style={{ fontSize: '0.75rem', color: '#a78bfa', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
            Interviewer Asks:
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', margin: 0, lineHeight: 1.4 }}>
            "{currentQuestion.question}"
          </h2>
        </div>

        {/* Input Area: Audio Recording or Textarea */}
        {!evaluation ? (
          <div>
            {answerMode === 'audio' ? (
              <div style={{
                background: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '16px',
                padding: '24px',
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
                  <Clock size={20} color={timeLeft <= 10 ? '#ef4444' : '#8b5cf6'} />
                  <span style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: timeLeft <= 10 ? '#ef4444' : '#f8fafc' }}>
                    00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', height: '36px', marginBottom: '18px' }}>
                  {isRecording ? (
                    <>
                      <div className="wave-bar" />
                      <div className="wave-bar" />
                      <div className="wave-bar" />
                      <div className="wave-bar" />
                      <div className="wave-bar" />
                      <div className="wave-bar" />
                    </>
                  ) : (
                    <span style={{ color: '#64748b', fontSize: '0.85rem' }}>
                      Speak clearly into your microphone as if in a live video interview
                    </span>
                  )}
                </div>

                {transcript && (
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    padding: '12px',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    color: '#cbd5e1',
                    marginBottom: '16px',
                    textAlign: 'left'
                  }}>
                    <strong>Captured:</strong> "{transcript}"
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
                  {!isRecording ? (
                    <button
                      onClick={handleStartRecording}
                      className="btn-primary"
                      style={{ padding: '12px 28px', borderRadius: '99px' }}
                    >
                      <Mic size={18} />
                      <span>Start Speaking (60s Timer)</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleStopRecording}
                      style={{
                        background: '#ef4444',
                        color: '#fff',
                        fontWeight: 700,
                        padding: '12px 28px',
                        borderRadius: '99px',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <MicOff size={18} />
                      <span>Finish & Submit for Evaluation</span>
                    </button>
                  )}

                  <button
                    onClick={handleSimulateAnswer}
                    className="btn-secondary"
                    style={{ fontSize: '0.8rem', padding: '10px 18px', borderRadius: '99px' }}
                  >
                    <span>Simulate Candidate Answer (Demo)</span>
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ marginBottom: '20px' }}>
                <textarea
                  rows={6}
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Type your structured technical explanation here..."
                  style={{
                    width: '100%',
                    padding: '14px',
                    background: 'rgba(9, 13, 22, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '12px',
                    color: '#e2e8f0',
                    fontSize: '0.875rem',
                    lineHeight: 1.5,
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    marginBottom: '12px'
                  }}
                />

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => runEvaluation(textInput)}
                    disabled={textInput.trim().length < 10}
                    className="btn-primary"
                    style={{ padding: '10px 24px' }}
                  >
                    <Send size={16} />
                    <span>Submit Answer for AI Evaluation</span>
                  </button>

                  <button
                    onClick={handleSimulateAnswer}
                    className="btn-secondary"
                    style={{ fontSize: '0.8rem' }}
                  >
                    <span>Fill Sample Answer</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Priority 8: Structured 5-Dimension AI Evaluation Result */
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '16px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              marginBottom: '20px'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 800, textTransform: 'uppercase' }}>
                  AI-Generated Feedback
                </span>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f8fafc', margin: '2px 0 0' }}>
                  Evaluation Matrix
                </h3>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: evaluation.overallScore >= 80 ? '#10b981' : '#f59e0b', lineHeight: 1 }}>
                  {evaluation.overallScore}/100
                </div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Overall Impact</div>
              </div>
            </div>

            {/* 4 Score Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '20px' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Relevance</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#38bdf8' }}>{evaluation.dimensions.relevance.score}%</div>
                <div style={{ fontSize: '0.7rem', color: '#cbd5e1', marginTop: '2px' }}>{evaluation.dimensions.relevance.status}</div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Clarity</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#a78bfa' }}>{evaluation.dimensions.clarity.score}%</div>
                <div style={{ fontSize: '0.7rem', color: '#cbd5e1', marginTop: '2px' }}>{evaluation.dimensions.clarity.status}</div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Technical Correctness</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10b981' }}>{evaluation.dimensions.technicalCorrectness.score}%</div>
                <div style={{ fontSize: '0.7rem', color: '#cbd5e1', marginTop: '2px' }}>{evaluation.dimensions.technicalCorrectness.status}</div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '14px', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase' }}>Communication / Pacing</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fbbf24' }}>{evaluation.dimensions.communication.score}%</div>
                <div style={{ fontSize: '0.7rem', color: '#cbd5e1', marginTop: '2px' }}>{evaluation.dimensions.communication.status}</div>
              </div>
            </div>

            {/* Improvement Suggestion */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#c4b5fd', fontSize: '0.825rem', fontWeight: 800, marginBottom: '6px' }}>
                <Sparkles size={16} />
                <span>Actionable Improvement Suggestion:</span>
              </div>
              <p style={{ color: '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
                {evaluation.improvementSuggestion}
              </p>
            </div>

            {/* Required Disclaimer (Priority 8) */}
            <div style={{ fontSize: '0.725rem', color: '#64748b', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Info size={12} />
              <span>* AI-generated feedback: Simulated evaluator designed for low-pressure articulation practice. Real interviewer evaluations may vary.</span>
            </div>

            {/* Next Question CTA */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleNextQuestion}
                className="btn-primary"
                style={{ padding: '12px 24px' }}
              >
                <span>Proceed to Next Question</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => setEvaluation(null)}
                className="btn-secondary"
                style={{ padding: '12px 18px' }}
              >
                <RotateCcw size={15} />
                <span>Retry Current Question</span>
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
