import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Send, 
  RotateCcw, 
  HelpCircle, 
  ArrowRight,
  Bot,
  User,
  Key,
  Compass,
  CheckCircle2,
  ClipboardCheck,
  Map,
  BarChart3,
  Layers,
  Zap,
  FileText,
  Settings,
  X
} from 'lucide-react';
import { TARGET_ROLES } from '../data/rolesData';

// Full structured site navigation map for the AI Agent
const SITE_SECTIONS = {
  interests: {
    id: 'interests',
    title: 'Find My Domain',
    description: 'Beginner-friendly interest matcher that connects your passions to 1 of 6 placement roles (Frontend, Backend, Full Stack, Software Developer, AI/ML, Data Engineer) or picks randomly.',
    buttonText: 'Go to Find My Domain'
  },
  assessment: {
    id: 'assessment',
    title: 'Skill Diagnostic Assessment',
    description: 'Short 8-question diagnostic test covering DSA, DBMS, OOP, Operating Systems, Computer Networks, and Aptitude. Calculates category-wise scores and identifies your weakest areas.',
    buttonText: 'Take Skill Diagnostic Assessment'
  },
  roadmap: {
    id: 'roadmap',
    title: '7-Day Personalized Roadmap',
    description: 'Bite-sized daily sprint with 1 achievable goal per day (~30 mins), tailored to your target role with clear explanations of why each task is recommended.',
    buttonText: 'Open 7-Day Roadmap'
  },
  dashboard: {
    id: 'dashboard',
    title: 'Placement Readiness Hub',
    description: 'Central dashboard that answers the 3 critical placement questions: What should I prepare, Where do I stand, and What should I do right now.',
    buttonText: 'Open Readiness Hub'
  },
  quests: {
    id: 'quests',
    title: 'Daily Practice Quests',
    description: '3 micro-tasks per day to build consistency: Learn (3-minute mental model), Practice (60-second code debug), and Communicate (60-second STAR project pitch).',
    buttonText: 'Start Daily Practice'
  },
  interview: {
    id: 'interview',
    title: 'AI Mock Interview',
    description: 'Multi-turn simulated interview round with voice/text answering and 5-dimension evaluation: Relevance, Clarity, Technical Correctness, Communication, and Improvement Suggestions.',
    buttonText: 'Practice Mock Interview'
  },
  tree: {
    id: 'tree',
    title: 'Skill Tree RPG',
    description: 'Interactive visual dependency map of placement skills from Tier 1 foundations to Tier 4 live articulation, highlighting core requirements for your selected role.',
    buttonText: 'View Skill Tree'
  },
  jd: {
    id: 'jd',
    title: 'Role & JD Analyzer',
    description: 'Paste any company job description to get an automated transparent match score [(Matched / Required) * 100] and list of top 3 skill gaps.',
    buttonText: 'Open JD Analyzer'
  }
};

// System prompt grounding the Gemini model with full website context
const GEMINI_SYSTEM_INSTRUCTION = `
You are the official AI Navigator & Placement Mentor for SkillTree.AI (QuestPrep).
Your mission is to guide students (both beginners and experienced candidates) through placement preparation without overwhelming them.

You have complete knowledge of this application's sections:
1. "interests" (Find My Domain): For students who do not know what career track they want. Features interactive interest cards (Frontend, Backend, Full Stack, Software Developer, AI/ML, Data Engineer) and a randomizer.
2. "assessment" (Diagnostic): Short 8-question placement diagnostic covering DSA, DBMS, OOP, OS, Computer Networks, and Aptitude. Answers "Where do I stand?".
3. "roadmap" (7-Day Roadmap): Step-by-step daily sprint (30 mins/day) with clear goals and explanations of why each task is recommended. Answers "What should I do next?".
4. "dashboard" (Readiness Hub): Central dashboard answering the 3 core questions (What to prepare, Where do I stand, What should I do right now). Displays overall readiness %, strengths, and top 3 gaps.
5. "quests" (Daily Practice): 3 micro-quests per day: Learn (mental model), Practice (debug puzzle), Communicate (60s STAR pitch).
6. "interview" (AI Mock Interview): Multi-turn voice/text mock interview with 5-dimension feedback.
7. "tree" (Skill Tree RPG): Visual interactive dependency skill tree with role target core highlights.
8. "jd" (Role & JD Match): Real job description analyzer with transparent formula (Matched/Required * 100).
9. "security" (User Authentication & Database): Students can register and sign in via the header buttons. User profiles and progress are stored in Cloud Firestore and the WebCrypto Secure Vault with scrypt / PBKDF2 (100,000 rounds) salted hashing and AES-256 encryption. Zero plaintext password storage.

Instructions for your responses:
- Be encouraging, clear, concise, and structured. Avoid jargon.
- When a user asks where to start, recommend:
  1. Find My Domain (tab: interests) if they haven't picked a role yet.
  2. Diagnostic Assessment (tab: assessment) to see where they stand and detect skill gaps.
  3. 7-Day Roadmap (tab: roadmap) and Daily Practice (tab: quests) for daily practice.
- When relevant to help the user navigate, output one or more navigation action tags at the very end of your response in the format:
  [NAVIGATE:tab_id:Button Label]
  Allowed tab_id values: interests, assessment, roadmap, dashboard, quests, interview, tree, jd.
  Examples:
  [NAVIGATE:assessment:Take Skill Diagnostic Assessment]
  [NAVIGATE:interests:Go to Find My Domain]
  [NAVIGATE:roadmap:Open 7-Day Roadmap]
- Answer technical and interview questions clearly in simple terms.
- Do NOT use emojis in your responses.
`;

export default function EnhancedVoiceAssistant({ targetRole, onNavigateToTab }) {
  const [apiKey, setApiKey] = useState(() => {
    return localStorage.getItem('skilltree_gemini_api_key') || import.meta.env.VITE_GEMINI_API_KEY || '';
  });
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [keyInput, setKeyInput] = useState('');

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `Hello! I am your AI Placement Guide and Navigator for SkillTree.AI. Ask me where to start, how to navigate the platform, or have me explain any technical concept simply.`,
      time: 'Just now',
      actions: [
        { tabId: 'interests', label: 'Find My Domain' },
        { tabId: 'assessment', label: 'Take Diagnostic Assessment' },
        { tabId: 'roadmap', label: 'Open 7-Day Roadmap' }
      ]
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [soundWaveIntensity, setSoundWaveIntensity] = useState([20, 45, 70, 35, 60]);

  const recognitionRef = useRef(null);
  const chatBottomRef = useRef(null);

  // Initialize Web Speech API
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const spokenText = event.results[0][0].transcript;
        setIsListening(false);
        handleSendMessage(spokenText);
      };

      recognition.onerror = (e) => {
        console.warn('Speech recognition notification:', e.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Voice soundwave animation simulation
  useEffect(() => {
    let interval;
    if (isListening || isSpeaking) {
      interval = setInterval(() => {
        setSoundWaveIntensity([
          Math.floor(Math.random() * 60) + 20,
          Math.floor(Math.random() * 80) + 20,
          Math.floor(Math.random() * 90) + 30,
          Math.floor(Math.random() * 70) + 20,
          Math.floor(Math.random() * 60) + 15
        ]);
      }, 150);
    } else {
      setSoundWaveIntensity([15, 25, 30, 25, 15]);
    }
    return () => clearInterval(interval);
  }, [isListening, isSpeaking]);

  // Speak aloud via Web Speech Synthesis
  const speakAloud = (text) => {
    if (!speechEnabled || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    // Clean out any raw markdown formatting or tags before speech
    const cleanSpeech = text.replace(/\[NAVIGATE:[^\]]+\]/g, '').replace(/[*_#`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  // Toggle Voice Listening
  const handleToggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        try {
          window.speechSynthesis?.cancel();
          recognitionRef.current.start();
          setIsListening(true);
        } catch (err) {
          console.warn('Recognition start notice:', err);
        }
      } else {
        alert('Microphone speech recognition is not supported in this browser. Please type your message in the input box.');
      }
    }
  };

  // Save custom Gemini API Key
  const handleSaveApiKey = () => {
    const trimmed = keyInput.trim();
    setApiKey(trimmed);
    localStorage.setItem('skilltree_gemini_api_key', trimmed);
    setIsKeyModalOpen(false);
  };

  // Parse [NAVIGATE:tabId:Label] tags from response text
  const parseNavigationActions = (rawText) => {
    const navRegex = /\[NAVIGATE:([a-z_]+):([^\]]+)\]/g;
    const actions = [];
    let match;
    while ((match = navRegex.exec(rawText)) !== null) {
      const tabId = match[1];
      const label = match[2];
      if (SITE_SECTIONS[tabId]) {
        actions.push({ tabId, label });
      }
    }

    const cleanText = rawText.replace(navRegex, '').trim();
    return { cleanText, actions };
  };

  // Intelligent Local Heuristic Fallback Engine
  const generateLocalResponse = (query) => {
    const lower = query.toLowerCase();

    // Where should I start / New user guidance
    if (lower.includes('where to start') || lower.includes('where should i start') || lower.includes('how to start') || lower.includes('begin') || lower.includes('new user') || lower.includes('what should i do first')) {
      return {
        text: `Here is the recommended starting path for placement preparation on SkillTree.AI:

1. Step 1: Select or confirm your track in "Find My Domain". If you are unsure, you can match your interests or let the system recommend one.
2. Step 2: Take the 8-question "Skill Diagnostic Assessment". This reveals your baseline performance in DSA, DBMS, OOP, and Aptitude, and identifies your top skill gaps.
3. Step 3: Follow your "7-Day Roadmap". It gives you one focused 30-minute task per day so you prepare systematically without burnout.

Where would you like to begin right now?`,
        actions: [
          { tabId: 'interests', label: '1. Choose Track (Find My Domain)' },
          { tabId: 'assessment', label: '2. Take Skill Diagnostic' },
          { tabId: 'roadmap', label: '3. View 7-Day Roadmap' }
        ]
      };
    }

    // Assessment queries
    if (lower.includes('assessment') || lower.includes('test') || lower.includes('diagnostic') || lower.includes('exam') || lower.includes('evaluate my skills') || lower.includes('where do i stand')) {
      return {
        text: `You can test your placement readiness in the "Skill Diagnostic" section.

It features 8 targeted placement questions covering DSA, DBMS, OOP, Operating Systems, Computer Networks, and Aptitude. Upon completion, you will receive:
- Category-wise proficiency percentages
- Identification of your weakest priority areas
- Tailored study suggestions for your target role (${targetRole}).

Click below to launch the diagnostic assessment directly:`,
        actions: [
          { tabId: 'assessment', label: 'Start Skill Diagnostic (8 Questions)' }
        ]
      };
    }

    // Roadmap queries
    if (lower.includes('roadmap') || lower.includes('plan') || lower.includes('7 day') || lower.includes('schedule') || lower.includes('curriculum')) {
      return {
        text: `Your personalized 7-Day Roadmap is designed specifically for ${targetRole}.

It provides one achievable 30-minute goal each day (e.g., Two-Pointer arrays on Day 1, Sliding Window on Day 2, Tree BFS on Day 3, Database Indexing on Day 4). Each task clearly explains why interviewers test that topic so you study with purpose.

Click below to open your roadmap:`,
        actions: [
          { tabId: 'roadmap', label: 'Open 7-Day Roadmap' }
        ]
      };
    }

    // Daily Practice / Quests queries
    if (lower.includes('quest') || lower.includes('daily') || lower.includes('practice') || lower.includes('micro') || lower.includes('today')) {
      return {
        text: `The "Daily Practice" section gives you 3 focused micro-quests each day:
1. Learn: A 3-minute mental model (e.g., B+ Trees in real databases).
2. Practice: A 60-second code debug puzzle (e.g., fixing loop boundary bugs).
3. Communicate: A 60-second articulation prompt using the STAR framework.

Click below to start today's tasks:`,
        actions: [
          { tabId: 'quests', label: 'Go to Daily Practice' }
        ]
      };
    }

    // Interview / Mock queries
    if (lower.includes('interview') || lower.includes('mock') || lower.includes('speak') || lower.includes('articulate') || lower.includes('verbal')) {
      return {
        text: `You can practice technical and behavioral interview questions in the "AI Mock Interview" section.

You can answer using your microphone or by typing. The system evaluates your responses across 5 dimensions:
- Relevance
- Clarity and filler word detection
- Technical correctness
- Pacing and communication
- Actionable improvement suggestions

Click below to practice an interview round:`,
        actions: [
          { tabId: 'interview', label: 'Start AI Mock Interview' }
        ]
      };
    }

    // Skill Tree queries
    if (lower.includes('skill tree') || lower.includes('tree') || lower.includes('graph') || lower.includes('visual')) {
      return {
        text: `The "Skill Tree RPG" gives you an interactive map of Computer Science competencies from Tier 1 foundations (Arrays, HTTP, Trees) up to Tier 4 live articulation. Nodes required for your active track (${targetRole}) are highlighted with Target Core badges.

Click below to explore the tree:`,
        actions: [
          { tabId: 'tree', label: 'Open Skill Tree RPG' }
        ]
      };
    }

    // Job Description analyzer queries
    if (lower.includes('jd') || lower.includes('job description') || lower.includes('analyzer') || lower.includes('match score')) {
      return {
        text: `In the "Role & JD Match" section, you can paste any real company Job Description or choose a role preset. It calculates a 100% transparent match score using (Matched Skills / Required Skills) * 100 and highlights your top 3 skill gaps.

Click below to run a JD match:`,
        actions: [
          { tabId: 'jd', label: 'Open Role & JD Analyzer' }
        ]
      };
    }

    // Domain / Career choices
    if (lower.includes('role') || lower.includes('domain') || lower.includes('choose') || lower.includes('frontend') || lower.includes('backend') || lower.includes('fullstack') || lower.includes('data engineer') || lower.includes('ai') || lower.includes('machine learning')) {
      return {
        text: `SkillTree.AI supports 6 core placement tracks:
- Software Developer: Focuses on core DSA, OOP, and system fundamentals.
- Frontend Developer: Focuses on React, JavaScript, DOM performance, and UI.
- Backend Developer: Focuses on APIs, SQL indexing, distributed caching, and microservices.
- Full Stack Developer: Covers end-to-end web apps, REST APIs, and databases.
- AI/ML Engineer: Focuses on Python, model training, transformers, and APIs.
- Data Engineer: Focuses on SQL, ETL data pipelines, and analytics infrastructure.

You can explore your interests and switch tracks at any time in "Find My Domain":`,
        actions: [
          { tabId: 'interests', label: 'Explore All Tracks (Find My Domain)' }
        ]
      };
    }

    // Concept: B+ Tree
    if (lower.includes('b+') || lower.includes('b tree') || lower.includes('b-tree') || lower.includes('index')) {
      return {
        text: `A B+ Tree is an N-ary balanced search tree used by databases like PostgreSQL and MySQL.

Unlike standard binary trees or hash tables:
1. Hash indexes only support exact lookups (WHERE id = 5) and cannot do range scans.
2. In a B+ Tree, all data records are stored exclusively in the bottom leaf nodes, which are linked together in a sorted doubly-linked list.
3. For range queries (WHERE age BETWEEN 20 AND 30), the database finds 20 in O(log N) and then simply walks sequentially along disk pages.

You can practice this concept in your Day 4 roadmap or today's Learn quest!`,
        actions: [
          { tabId: 'quests', label: 'Review Database Learn Quest' }
        ]
      };
    }

    // Default polite response
    return {
      text: `Regarding your query about ${targetRole}:

SkillTree.AI is organized into simple preparation stages:
- Find My Domain (choose or match your track)
- Skill Diagnostic (discover your baseline gaps)
- 7-Day Roadmap (daily 30-minute structured sprints)
- Daily Practice (Learn, Practice, and Communicate)
- Readiness Hub (see your progress and next steps)

Where would you like me to guide you?`,
      actions: [
        { tabId: 'dashboard', label: 'Go to Readiness Hub' },
        { tabId: 'assessment', label: 'Take Diagnostic' },
        { tabId: 'roadmap', label: 'View Roadmap' }
      ]
    };
  };

  // Call Gemini REST API
  const callGeminiAPI = async (userPrompt) => {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const conversationHistory = messages.slice(-6).map(m => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }));

    conversationHistory.push({
      role: 'user',
      parts: [{ text: `User is preparing for: ${targetRole}. Query: ${userPrompt}` }]
    });

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: GEMINI_SYSTEM_INSTRUCTION }]
        },
        contents: conversationHistory,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 600
        }
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData?.error?.message || `API error ${response.status}`);
    }

    const data = await response.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!candidateText) {
      throw new Error('No response text received from Gemini API');
    }

    return candidateText;
  };

  // Send user message
  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputText).trim();
    if (!query) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    let rawReply = '';
    let finalActions = [];

    try {
      if (apiKey && apiKey.trim().length > 10) {
        // Use Gemini API
        rawReply = await callGeminiAPI(query);
        const parsed = parseNavigationActions(rawReply);
        rawReply = parsed.cleanText;
        finalActions = parsed.actions;

        // If Gemini didn't supply action tags but the query asked where to start or for assessment, add them
        if (finalActions.length === 0) {
          const lower = query.toLowerCase();
          if (lower.includes('start') || lower.includes('begin')) {
            finalActions = [
              { tabId: 'interests', label: '1. Find My Domain' },
              { tabId: 'assessment', label: '2. Take Diagnostic' }
            ];
          } else if (lower.includes('assessment') || lower.includes('test')) {
            finalActions = [{ tabId: 'assessment', label: 'Open Diagnostic Assessment' }];
          } else if (lower.includes('roadmap') || lower.includes('plan')) {
            finalActions = [{ tabId: 'roadmap', label: 'Open 7-Day Roadmap' }];
          }
        }
      } else {
        // Use Local Heuristic Engine
        await new Promise(r => setTimeout(r, 450));
        const localRes = generateLocalResponse(query);
        rawReply = localRes.text;
        finalActions = localRes.actions || [];
      }
    } catch (err) {
      console.warn('Gemini API call note, falling back to local engine:', err.message);
      const fallback = generateLocalResponse(query);
      rawReply = fallback.text;
      finalActions = fallback.actions || [];
    } finally {
      setIsLoading(false);
    }

    const botMsg = {
      id: Date.now() + 1,
      sender: 'bot',
      text: rawReply,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actions: finalActions
    };

    setMessages(prev => [...prev, botMsg]);
    speakAloud(rawReply);
  };

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto', padding: '24px 20px' }}>
      
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.16) 0%, rgba(6, 182, 212, 0.1) 100%)',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        borderRadius: '24px',
        padding: '24px 28px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)'
          }}>
            <Bot size={26} color="#ffffff" />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                AI Placement Guide & Navigator
              </h1>
              <span style={{
                background: apiKey ? 'rgba(16, 185, 129, 0.2)' : 'rgba(59, 130, 246, 0.15)',
                color: apiKey ? '#34d399' : '#93c5fd',
                fontSize: '0.7rem',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '99px',
                border: apiKey ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(59, 130, 246, 0.3)'
              }}>
                {apiKey ? 'GEMINI 2.0 CONNECTED' : 'SITE KNOWLEDGE ENGINE ACTIVE'}
              </span>
            </div>
            <p style={{ color: '#cbd5e1', fontSize: '0.85rem', margin: '4px 0 0' }}>
              Ask where to start, how to navigate sections, or get guidance for <strong>{targetRole}</strong>.
            </p>
          </div>
        </div>

        {/* Controls: Audio Toggle & API Key Configuration */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => {
              if (speechEnabled) window.speechSynthesis?.cancel();
              setSpeechEnabled(!speechEnabled);
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: speechEnabled ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)',
              border: speechEnabled ? '1px solid rgba(139, 92, 246, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
              color: speechEnabled ? '#c4b5fd' : '#94a3b8',
              padding: '8px 12px',
              borderRadius: '10px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
            title={speechEnabled ? 'Mute spoken audio' : 'Enable spoken audio'}
          >
            {speechEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
            <span>{speechEnabled ? 'Voice: On' : 'Voice: Off'}</span>
          </button>

          <button
            onClick={() => setIsKeyModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#e2e8f0',
              padding: '8px 12px',
              borderRadius: '10px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
            title="Configure Google Gemini API Key"
          >
            <Key size={14} color="#8b5cf6" />
            <span>{apiKey ? 'Gemini Key Configured' : 'Connect Gemini Key'}</span>
          </button>
        </div>
      </div>

      {/* Main Conversation Stream */}
      <div className="glass-panel" style={{
        padding: '24px',
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '380px',
        maxHeight: '480px'
      }}>
        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '8px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {messages.map(msg => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                gap: '12px',
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: msg.sender === 'user' ? '80%' : '90%'
              }}
            >
              {msg.sender === 'bot' && (
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: 'rgba(139, 92, 246, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Bot size={18} color="#c4b5fd" />
                </div>
              )}

              <div style={{ flex: 1 }}>
                <div style={{
                  background: msg.sender === 'user' 
                    ? 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)' 
                    : 'rgba(255, 255, 255, 0.04)',
                  border: msg.sender === 'user' ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                  color: '#f8fafc',
                  padding: '14px 18px',
                  borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  fontSize: '0.9rem',
                  lineHeight: 1.55,
                  whiteSpace: 'pre-wrap',
                  boxShadow: msg.sender === 'user' ? '0 4px 15px rgba(139, 92, 246, 0.3)' : 'none'
                }}>
                  {msg.text}

                  {/* Interactive Quick Navigation Action Buttons */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div style={{
                      marginTop: '12px',
                      paddingTop: '10px',
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px'
                    }}>
                      {msg.actions.map((act, i) => (
                        <button
                          key={i}
                          onClick={() => onNavigateToTab(act.tabId)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.35) 0%, rgba(59, 130, 246, 0.25) 100%)',
                            border: '1px solid rgba(139, 92, 246, 0.5)',
                            color: '#ffffff',
                            padding: '7px 14px',
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.6) 0%, rgba(59, 130, 246, 0.4) 100%)';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(139, 92, 246, 0.35) 0%, rgba(59, 130, 246, 0.25) 100%)';
                          }}
                        >
                          <span>{act.label}</span>
                          <ArrowRight size={14} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '4px', textAlign: msg.sender === 'user' ? 'right' : 'left' }}>
                  {msg.time}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: 'rgba(59, 130, 246, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <User size={18} color="#93c5fd" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div style={{ display: 'flex', gap: '12px', alignSelf: 'flex-start' }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                background: 'rgba(139, 92, 246, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Bot size={18} color="#c4b5fd" />
              </div>
              <div style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#94a3b8',
                padding: '12px 18px',
                borderRadius: '18px 18px 18px 4px',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Sparkles size={16} color="#8b5cf6" />
                <span>AI Agent is analyzing query...</span>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>
      </div>

      {/* Mic Audio & Interactive Speech Bar */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.85)',
        border: '1px solid rgba(139, 92, 246, 0.35)',
        borderRadius: '20px',
        padding: '16px 22px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Animated Soundwave */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', height: '32px' }}>
            {soundWaveIntensity.map((h, i) => (
              <span
                key={i}
                style={{
                  width: '4px',
                  height: `${h}%`,
                  background: isListening ? '#10b981' : (isSpeaking ? '#8b5cf6' : '#64748b'),
                  borderRadius: '99px',
                  transition: 'height 0.15s ease'
                }}
              />
            ))}
          </div>

          <div style={{ fontSize: '0.85rem', color: isListening ? '#34d399' : (isSpeaking ? '#c4b5fd' : '#94a3b8'), fontWeight: 600 }}>
            {isListening 
              ? 'Listening to you... Speak now' 
              : (isSpeaking ? 'Agent is speaking...' : 'Tap to speak or type your question below')}
          </div>
        </div>

        {/* Big Mic Button */}
        <button
          onClick={handleToggleListening}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: isListening 
              ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' 
              : 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
            color: '#ffffff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '12px',
            fontWeight: 800,
            fontSize: '0.85rem',
            cursor: 'pointer',
            boxShadow: isListening 
              ? '0 0 25px rgba(239, 68, 68, 0.5)' 
              : '0 4px 18px rgba(139, 92, 246, 0.4)',
            transition: 'all 0.2s ease'
          }}
        >
          {isListening ? <MicOff size={16} /> : <Mic size={16} />}
          <span>{isListening ? 'Stop Listening' : 'Tap & Speak Out Loud'}</span>
        </button>
      </div>

      {/* Suggested Navigation Queries for Beginners */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.04em' }}>
          Suggested Inquiries:
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {[
            'Where should I start preparing?',
            'Where can I take the skill diagnostic assessment?',
            'How does my 7-day roadmap work?',
            'Explain B+ trees in simple words',
            'Where is the AI mock interview?',
            'Show me the full skill tree map'
          ].map((promptText, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(promptText)}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: '#cbd5e1',
                padding: '7px 12px',
                borderRadius: '8px',
                fontSize: '0.785rem',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#8b5cf6';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.color = '#cbd5e1';
              }}
            >
              {promptText}
            </button>
          ))}
        </div>
      </div>

      {/* Text Input */}
      <div style={{
        display: 'flex',
        gap: '10px',
        background: 'rgba(0, 0, 0, 0.35)',
        padding: '8px',
        borderRadius: '14px',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
          placeholder="Ask where to start, where to find assessments, or explain a concept..."
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#f8fafc',
            padding: '8px 12px',
            fontSize: '0.9rem',
            fontFamily: 'inherit'
          }}
        />

        <button
          onClick={() => handleSendMessage(inputText)}
          disabled={!inputText.trim() || isLoading}
          style={{
            background: inputText.trim() && !isLoading ? '#8b5cf6' : 'rgba(255, 255, 255, 0.05)',
            border: 'none',
            color: '#ffffff',
            padding: '8px 18px',
            borderRadius: '10px',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: inputText.trim() && !isLoading ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Send size={15} />
          <span>Ask</span>
        </button>
      </div>

      {/* Gemini API Key Modal */}
      {isKeyModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#0d131f',
            border: '1px solid rgba(139, 92, 246, 0.4)',
            borderRadius: '20px',
            padding: '28px',
            maxWidth: '480px',
            width: '100%',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Key size={18} color="#8b5cf6" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                  Google Gemini API Key
                </h3>
              </div>
              <button
                onClick={() => setIsKeyModalOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <p style={{ color: '#cbd5e1', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '16px' }}>
              Connect your Google Gemini API Key to enable live generative AI responses from <strong>gemini-2.0-flash</strong>. Your key is stored locally in your browser.
            </p>

            <input
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder="Paste AI Studio API Key (AIzaSy...)"
              style={{
                width: '100%',
                padding: '12px 14px',
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '10px',
                color: '#ffffff',
                fontSize: '0.85rem',
                outline: 'none',
                marginBottom: '16px'
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setIsKeyModalOpen(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#cbd5e1',
                  padding: '9px 16px',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleSaveApiKey}
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
                  border: 'none',
                  color: '#ffffff',
                  padding: '9px 20px',
                  borderRadius: '8px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Save Key
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
