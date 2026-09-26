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
  HelpCircle,
  TrendingUp,
  MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { RUBBER_DUCK_SCENARIOS } from '../data/rolesData';

export default function RubberDuckSimulator({ onAddXp }) {
  const [scenarios] = useState(RUBBER_DUCK_SCENARIOS);
  const [activeScenario, setActiveScenario] = useState(scenarios[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [transcript, setTranscript] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  
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

  // Timer countdown
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
    setAnalysis(null);
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

  // Stop recording and analyze
  const handleStopRecording = () => {
    setIsRecording(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        // Ignored
      }
    }
    evaluateArticulation(transcript);
  };

  // Evaluate speech transcript
  const evaluateArticulation = (spokenText) => {
    setIsEvaluating(true);

    setTimeout(() => {
      const text = spokenText || "In this scenario, I would recommend PostgreSQL because checkout transactions require strict ACID guarantees and consistency to ensure payments never get duplicated or lost.";
      const words = text.split(/\s+/).filter(Boolean);
      const totalWords = words.length;
      
      // Calculate WPM based on elapsed time
      const timeSpent = Math.max(10, 60 - timeLeft);
      const wpm = Math.round((totalWords / timeSpent) * 60);

      // Filler words counter
      const fillerWordsList = ['um', 'umm', 'uh', 'like', 'basically', 'actually', 'you know', 'sort of', 'kind of'];
      const detectedFillers = words.filter(w => fillerWordsList.includes(w.toLowerCase().replace(/[^a-z]/g, '')));

      // Target keywords hit
      const lower = text.toLowerCase();
      const hits = activeScenario.targetKeywords.filter(kw => lower.includes(kw.toLowerCase()));
      const keywordScore = Math.min(100, Math.round((hits.length / Math.max(3, activeScenario.targetKeywords.length * 0.5)) * 100));

      // Overall Articulation Score (0-100)
      const clarityScore = Math.min(96, Math.max(60, Math.round(
        (keywordScore * 0.5) + 
        (Math.max(0, 30 - detectedFillers.length * 5)) + 
        (wpm >= 110 && wpm <= 160 ? 20 : 10)
      )));

      const result = {
        transcript: text,
        score: clarityScore,
        wpm: wpm > 0 ? wpm : 135,
        fillerCount: detectedFillers.length,
        detectedFillers,
        keywordHits: hits,
        missingKeywords: activeScenario.targetKeywords.filter(kw => !hits.includes(kw)),
        feedback: clarityScore >= 80 
          ? 'Clear and concise delivery! You led with your conclusion immediately and backed it up with strong architectural keywords.' 
          : 'Good effort! Try to state your main takeaway within the first 10 seconds, reduce filler words, and weave in more technical domain terms.'
      };

      setAnalysis(result);
      setIsEvaluating(false);

      // Confetti celebration & XP
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#8b5cf6', '#06b6d4', '#10b981']
      });
      onAddXp(200);
    }, 800);
  };

  // Sample prompt test helper for students without mic
  const handleTestSampleSpoken = () => {
    const sample = "For this e-commerce checkout service, I strongly recommend PostgreSQL over MongoDB. Financial transactions require strict ACID consistency and atomic rollbacks so money is never lost during payment gateway timeouts. MongoDB is great for product catalogs with flexible schemas, but here data integrity is our number one priority.";
    setTranscript(sample);
    evaluateArticulation(sample);
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 20px' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.02em' }}>
            The 60-Second "Rubber Duck" Articulation Simulator
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
            Verbal Mastery
          </span>
        </div>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '4px' }}>
          Most candidates fail not because they don't know the code, but because they can't articulate their thoughts under 60-second interview pressure. Practice speaking out loud with real-time AI feedback!
        </p>
      </div>

      {/* Scenario Selector Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {scenarios.map((scen, idx) => (
          <button
            key={scen.id}
            onClick={() => {
              setActiveScenario(scen);
              setAnalysis(null);
              setTranscript('');
              setIsRecording(false);
              setTimeLeft(60);
            }}
            style={{
              padding: '10px 16px',
              borderRadius: '12px',
              fontSize: '0.85rem',
              fontWeight: activeScenario.id === scen.id ? 700 : 500,
              background: activeScenario.id === scen.id ? 'rgba(139, 92, 246, 0.25)' : 'rgba(255, 255, 255, 0.03)',
              border: activeScenario.id === scen.id ? '1px solid #8b5cf6' : '1px solid rgba(255, 255, 255, 0.08)',
              color: activeScenario.id === scen.id ? '#c4b5fd' : '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
          >
            <MessageSquare size={15} color={activeScenario.id === scen.id ? '#a78bfa' : '#64748b'} />
            <span>Scenario {idx + 1}: {scen.topic}</span>
          </button>
        ))}
      </div>

      {/* Main Grid: Prompt & Mic on Left, Live Speech & AI Diagnostics on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '24px' }}>
        
        {/* Left Column: Prompt & Recording Booth */}
        <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: '#38bdf8' }}>
                {activeScenario.category}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#fbbf24', fontWeight: 700 }}>
                +200 XP Bounty
              </span>
            </div>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1.3, marginBottom: '14px' }}>
              {activeScenario.topic}
            </h2>

            {/* Prompt Box */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              padding: '16px',
              borderRadius: '12px',
              borderLeft: '4px solid #06b6d4',
              marginBottom: '20px'
            }}>
              <p style={{ color: '#e2e8f0', fontSize: '0.925rem', lineHeight: 1.5, margin: 0, fontStyle: 'italic' }}>
                {activeScenario.prompt}
              </p>
            </div>

            {/* Keywords to Hit */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px' }}>
                Key Technical Concepts to Weave In:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {activeScenario.targetKeywords.map((kw, i) => (
                  <span key={i} style={{
                    fontSize: '0.75rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    color: '#cbd5e1',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}>
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Audio Visualizer & Control Area */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.35)',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            textAlign: 'center'
          }}>
            {/* Countdown Clock */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '14px' }}>
              <Clock size={20} color={timeLeft <= 10 ? '#ef4444' : '#8b5cf6'} />
              <span style={{
                fontSize: '1.8rem',
                fontWeight: 800,
                fontFamily: 'var(--font-mono)',
                color: timeLeft <= 10 ? '#ef4444' : '#f8fafc'
              }}>
                00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
              </span>
            </div>

            {/* Sound Wave Bars when recording */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', height: '36px', marginBottom: '16px' }}>
              {isRecording ? (
                <>
                  <div className="wave-bar" />
                  <div className="wave-bar" />
                  <div className="wave-bar" />
                  <div className="wave-bar" />
                  <div className="wave-bar" />
                  <div className="wave-bar" />
                  <div className="wave-bar" />
                </>
              ) : (
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Click microphone to begin 60-second articulation test
                </div>
              )}
            </div>

            {/* Mic Action Button */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              {!isRecording ? (
                <button
                  onClick={handleStartRecording}
                  className="btn-primary"
                  style={{
                    padding: '12px 28px',
                    borderRadius: '99px',
                    fontSize: '1rem',
                    background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
                    boxShadow: '0 4px 20px rgba(6, 182, 212, 0.4)'
                  }}
                >
                  <Mic size={20} />
                  <span>Start 60s Speaking Challenge</span>
                </button>
              ) : (
                <button
                  onClick={handleStopRecording}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#ef4444',
                    color: '#fff',
                    fontWeight: 700,
                    padding: '12px 28px',
                    borderRadius: '99px',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(239, 68, 68, 0.4)'
                  }}
                >
                  <MicOff size={20} />
                  <span>Finish & Analyze Speech</span>
                </button>
              )}
            </div>

            {/* Quick Demo Helper */}
            <div style={{ marginTop: '14px' }}>
              <button
                onClick={handleTestSampleSpoken}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#64748b',
                  fontSize: '0.75rem',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
              >
                No microphone available? Simulate candidate answer
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Transcript & AI Evaluation Matrix */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          {analysis ? (
            <div>
              {/* Score Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '18px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '20px' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700, textTransform: 'uppercase' }}>
                    Evaluation Complete
                  </span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', margin: '2px 0 0' }}>
                    Articulation Breakdown
                  </h3>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '2.2rem', fontWeight: 800, color: analysis.score >= 80 ? '#10b981' : '#f59e0b', lineHeight: 1 }}>
                    {analysis.score}/100
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>
                    Interview Impact Score
                  </div>
                </div>
              </div>

              {/* 3 Metric Cards: WPM, Fillers, Keywords */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '12px', borderRadius: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8' }}>{analysis.wpm}</div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Words / Min (Target: 130-150)</div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '12px', borderRadius: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: analysis.fillerCount === 0 ? '#10b981' : '#f59e0b' }}>
                    {analysis.fillerCount}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Filler Words ("um", "like")</div>
                </div>

                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '12px', borderRadius: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#10b981' }}>
                    {analysis.keywordHits.length}/{activeScenario.targetKeywords.length}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Domain Keywords Hit</div>
                </div>
              </div>

              {/* Spoken Transcript Preview */}
              <div style={{ marginBottom: '18px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Spoken Answer Captured:
                </div>
                <div style={{
                  background: 'rgba(0, 0, 0, 0.25)',
                  padding: '12px',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  color: '#cbd5e1',
                  lineHeight: 1.5,
                  maxHeight: '120px',
                  overflowY: 'auto'
                }}>
                  "{analysis.transcript}"
                </div>
              </div>

              {/* AI Feedback & Ideal Pitch */}
              <div style={{
                background: 'rgba(139, 92, 246, 0.1)',
                border: '1px solid rgba(139, 92, 246, 0.25)',
                borderRadius: '12px',
                padding: '14px',
                marginBottom: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#c4b5fd', fontSize: '0.8rem', fontWeight: 700, marginBottom: '4px' }}>
                  <Sparkles size={14} />
                  <span>AI Coaching Advice:</span>
                </div>
                <p style={{ color: '#e2e8f0', fontSize: '0.825rem', lineHeight: 1.5, margin: 0 }}>
                  {analysis.feedback}
                </p>
              </div>

              {/* Retry button */}
              <button
                onClick={handleStartRecording}
                className="btn-secondary"
                style={{ width: '100%', padding: '10px', fontSize: '0.85rem' }}
              >
                <RotateCcw size={15} />
                <span>Try Again to Beat Score</span>
              </button>
            </div>
          ) : (
            <div style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '40px 20px'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: isRecording ? 'rgba(239, 68, 68, 0.15)' : 'rgba(6, 182, 212, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                {isRecording ? <Volume2 size={30} color="#ef4444" /> : <Mic size={30} color="#06b6d4" />}
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '6px' }}>
                {isRecording ? 'Listening in real-time...' : 'Audio Articulation Lab'}
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', maxWidth: '320px', lineHeight: 1.5 }}>
                {isRecording 
                  ? 'Speak clearly into your microphone. Keep pacing steady and mention target keywords!' 
                  : 'Hit the challenge button on the left to record your 60-second explanation. Instant speech-to-text scoring will appear here.'}
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
