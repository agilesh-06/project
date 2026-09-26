// ==========================================================================
// SkillTree.AI - Central Curriculum, Roles, Assessment & Quests Data
// ==========================================================================

export const INITIAL_SKILLS = [
  // Tier 1: Core Foundations
  {
    id: 'dsa_basics',
    title: 'Arrays & Two-Pointers',
    tier: 1,
    tierName: 'Foundations',
    category: 'dsa',
    xp: 200,
    status: 'mastered', // mastered, needs-improvement, locked
    icon: 'Layers',
    summary: 'Master two-pointer patterns, sliding window, and constant-time lookups.',
    prerequisites: [],
    position: { x: 120, y: 140 },
    keyConcepts: [
      'Two-pointer optimal traversal (O(N) vs O(N^2))',
      'Sliding window for subarray maximums and substrings',
      'Hash table collision strategies & amortized O(1) operations'
    ],
    interviewQuestions: [
      'Two Sum with sorted vs unsorted inputs',
      'Longest Substring Without Repeating Characters',
      'Subarray Sum Equals K'
    ]
  },
  {
    id: 'recursion_trees',
    title: 'Trees & DFS/BFS Traversal',
    tier: 1,
    tierName: 'Foundations',
    category: 'dsa',
    xp: 250,
    status: 'needs-improvement',
    icon: 'GitBranch',
    summary: 'Master recursion stacks, BFS level-order queues, and BST validations.',
    prerequisites: ['dsa_basics'],
    position: { x: 380, y: 140 },
    keyConcepts: [
      'Call stack mechanics and tail-recursion intuition',
      'BFS Queue vs DFS Stack traversals',
      'Lowest Common Ancestor and Tree Height balance'
    ],
    interviewQuestions: [
      'Invert Binary Tree & Validate BST',
      'Binary Tree Level Order Traversal',
      'Lowest Common Ancestor in Binary Tree'
    ]
  },
  {
    id: 'system_networking',
    title: 'HTTP, REST & OS Processes',
    tier: 1,
    tierName: 'Foundations',
    category: 'systems',
    xp: 200,
    status: 'mastered',
    icon: 'Cpu',
    summary: 'Understand TCP/IP 3-way handshake, HTTP status semantics, threads vs processes.',
    prerequisites: [],
    position: { x: 120, y: 380 },
    keyConcepts: [
      'TCP handshake, TLS termination, and idempotency in HTTP verbs',
      'Process vs Thread memory spaces and context switching',
      'DNS resolution step-by-step from browser to authoritative nameserver'
    ],
    interviewQuestions: [
      'What happens when you type google.com in a browser?',
      'Difference between Process and Thread?',
      'PUT vs PATCH vs POST semantics'
    ]
  },

  // Tier 2: Advanced Data Structures & Architecture
  {
    id: 'graphs_dp',
    title: 'Graphs & Dynamic Programming',
    tier: 2,
    tierName: 'Core Algorithms',
    category: 'dsa',
    xp: 350,
    status: 'locked',
    icon: 'Network',
    summary: 'Dijkstra shortest path, topological sort, memoization & tabulation grids.',
    prerequisites: ['recursion_trees'],
    position: { x: 650, y: 140 },
    keyConcepts: [
      'Topological Sort with Kahn algorithm (in-degrees)',
      'Subproblem overlapping state transitions in 1D & 2D DP',
      'Disjoint Set Union (Union-Find) for connected components'
    ],
    interviewQuestions: [
      'Course Schedule I & II (Cycle Detection)',
      'Coin Change / 0-1 Knapsack transition formula',
      'Number of Islands / Word Ladder'
    ]
  },
  {
    id: 'db_internals',
    title: 'Database Internals & Indexing',
    tier: 2,
    tierName: 'Backend & Data',
    category: 'systems',
    xp: 300,
    status: 'mastered',
    icon: 'Database',
    summary: 'B+Trees, ACID guarantees, WAL logs, indexing strategies and query explain plans.',
    prerequisites: ['system_networking'],
    position: { x: 380, y: 380 },
    keyConcepts: [
      'Why B+Trees excel for disk page reads over Binary Search Trees',
      'Clustered vs Non-clustered indexing and composite index column order',
      'Isolation levels: Dirty Read, Non-repeatable Read, Phantom Read'
    ],
    interviewQuestions: [
      'Why does SQL use B+Trees instead of Hash indexes for range queries?',
      'Explain ACID with a banking transaction failure scenario',
      'How to optimize a query scanning 10 million rows'
    ]
  },

  // Tier 3: Real-World System Design
  {
    id: 'sys_design_cache',
    title: 'Distributed Caching & Queues',
    tier: 3,
    tierName: 'System Design',
    category: 'architecture',
    xp: 450,
    status: 'locked',
    icon: 'Zap',
    summary: 'Redis cache-aside, cache stampede mitigation, Kafka pub-sub message queues.',
    prerequisites: ['db_internals'],
    position: { x: 650, y: 380 },
    keyConcepts: [
      'Cache-aside, Write-through, and Write-back tradeoffs',
      'Cache Stampede prevention using distributed locks or mutexes',
      'Message brokers (Kafka/RabbitMQ) for asynchronous decoupling'
    ],
    interviewQuestions: [
      'Design a Rate Limiter (Token Bucket vs Leaky Bucket)',
      'How do you prevent cache breakdown when a celebrity posts a tweet?',
      'Message delivery semantics: At-least-once vs Exactly-once'
    ]
  },
  {
    id: 'scale_concurrency',
    title: 'High-Concurrency & Microservices',
    tier: 3,
    tierName: 'System Design',
    category: 'architecture',
    xp: 500,
    status: 'locked',
    icon: 'Boxes',
    summary: 'Load balancers, sharding strategies, CAP theorem, and saga patterns.',
    prerequisites: ['sys_design_cache'],
    position: { x: 920, y: 380 },
    keyConcepts: [
      'Consistent Hashing ring for horizontal node scaling',
      'Database sharding keys and cross-shard transaction limitations',
      'CAP Theorem reality: PACELC theorem in modern cloud databases'
    ],
    interviewQuestions: [
      'Design a URL shortener like Bit.ly for 100M daily active users',
      'How does Consistent Hashing minimize re-hashing when a node dies?',
      'How to handle distributed transactions across 3 microservices without 2PC deadlocks?'
    ]
  },

  // Tier 4: Articulation & Behavioral Mastery
  {
    id: 'star_behavioral',
    title: 'STAR Behavioral Mastery',
    tier: 2,
    tierName: 'Communication',
    category: 'communication',
    xp: 250,
    status: 'mastered',
    icon: 'Sparkles',
    summary: 'Craft impactful stories for leadership principles, conflict resolution, and trade-offs.',
    prerequisites: [],
    position: { x: 380, y: 600 },
    keyConcepts: [
      'STAR Framework: Situation (15%), Task (15%), Action (50%), Result (20%)',
      'Quantifiable metrics (reduced latency by 35%, saved 4 hours/week)',
      'Owning mistakes gracefully: demonstrating vulnerability + corrective action'
    ],
    interviewQuestions: [
      'Tell me about a time you strongly disagreed with a team member and how you resolved it',
      'Describe a technical project that failed or missed its deadline',
      'What was the most challenging bug you investigated?'
    ]
  },
  {
    id: 'live_articulation',
    title: 'Live Whiteboard Articulation',
    tier: 4,
    tierName: 'Live Interviews',
    category: 'communication',
    xp: 400,
    status: 'locked',
    icon: 'Mic',
    summary: 'Think out loud effectively, clarify constraints before typing, and navigate interviewer hints.',
    prerequisites: ['star_behavioral'],
    position: { x: 920, y: 140 },
    keyConcepts: [
      'The 5-Minute Constraint Clarification rule before writing single line of code',
      'Speaking out loud while formulating edge cases',
      'Pacing answers to avoid rushing or filling silence with "umms"'
    ],
    interviewQuestions: [
      '60-second explanation: How does garbage collection work in V8 or JVM?',
      '60-second explanation: Optimistic vs Pessimistic database locking',
      'How to recover gracefully when your first code attempt hits a Time Limit Exceeded'
    ]
  }
];

// ==========================================================================
// 6 Supported Target Job Roles (Priority 2)
// ==========================================================================
export const TARGET_ROLES = [
  {
    id: 'software_developer',
    title: 'Software Developer',
    roleCategory: 'Core Software Engineering',
    company: 'Tier-1 Product & Tech Companies',
    icon: 'Terminal',
    badgeColor: '#4285F4',
    technicalSkills: ['DSA', 'Java / C++', 'OOP', 'SQL & Databases', 'Git', 'OS & Concurrency'],
    softSkills: ['Problem Solving', 'Whiteboard Articulation', 'STAR Behavioral Stories'],
    requiredNodeIds: ['dsa_basics', 'recursion_trees', 'graphs_dp', 'system_networking', 'db_internals', 'live_articulation'],
    description: `We are looking for Software Developers with a rigorous foundation in Computer Science data structures, algorithms, graph theory, time-complexity analysis, and clean object-oriented architecture. Candidates will write production-grade code, analyze trade-offs, and communicate thought processes under live interview conditions.`,
    recommendedNextAction: 'Practice Arrays, Recursion Trees and Sliding Window for 30 minutes to close your core DSA gap.'
  },
  {
    id: 'fullstack_developer',
    title: 'Full Stack Developer',
    roleCategory: 'Web & Applications',
    company: 'High-Growth Tech Startups & SaaS',
    icon: 'Layout',
    badgeColor: '#8B5CF6',
    technicalSkills: ['React / Frontend', 'Node.js / APIs', 'SQL & MongoDB', 'REST & HTTP', 'DSA Basics', 'Git'],
    softSkills: ['Product Thinking', 'Code Clarity', 'Communication'],
    requiredNodeIds: ['dsa_basics', 'system_networking', 'db_internals', 'star_behavioral', 'live_articulation'],
    description: `Seeking a versatile Full Stack Developer capable of owning features end-to-end. Must understand modern component lifecycles, RESTful API design, database schemas, and client-side performance. You will be evaluated on practical problem solving and clear communication.`,
    recommendedNextAction: 'Master HTTP/REST request idempotency and build an optimized SQL indexing query.'
  },
  {
    id: 'frontend_developer',
    title: 'Frontend Developer',
    roleCategory: 'User Interface & Web Performance',
    company: 'Fintech & Consumer Tech',
    icon: 'Monitor',
    badgeColor: '#EC4899',
    technicalSkills: ['JavaScript / TypeScript', 'React / Next.js', 'CSS & Web APIs', 'DOM Performance', 'DSA Basics'],
    softSkills: ['UI/UX Empathy', 'Attention to Detail', 'Stakeholder Communication'],
    requiredNodeIds: ['dsa_basics', 'system_networking', 'live_articulation', 'star_behavioral'],
    description: `Looking for a Frontend Specialist passionate about fluid 60fps web experiences, state machines, accessible semantic markup, and client caching. Interview includes live coding of complex UI components and explaining JavaScript engine internals.`,
    recommendedNextAction: 'Focus on 60-second explanation of JavaScript event loop and React reconciliation.'
  },
  {
    id: 'backend_developer',
    title: 'Backend Developer',
    roleCategory: 'Distributed Systems & Services',
    company: 'Enterprise Cloud & Fintech',
    icon: 'Server',
    badgeColor: '#10B981',
    technicalSkills: ['Java / Go / Node', 'SQL / B+Trees', 'Distributed Caching', 'Microservices', 'OS & Networking', 'DSA'],
    softSkills: ['System Design Articulation', 'Root Cause Analysis', 'Team Collaboration'],
    requiredNodeIds: ['dsa_basics', 'system_networking', 'db_internals', 'sys_design_cache', 'scale_concurrency', 'live_articulation'],
    description: `Seeking Backend Developers to build fault-tolerant APIs, distributed data pipelines, and scalable microservices. Must have strong understanding of database indexing, Redis cache-aside patterns, message queues, and thread safety.`,
    recommendedNextAction: 'Study Redis cache stampede prevention and B+Tree leaf node pointer traversals.'
  },
  {
    id: 'data_engineer',
    title: 'Data Engineer',
    roleCategory: 'Data Infrastructure & Pipelines',
    company: 'Analytics Platforms & Big Tech',
    icon: 'Database',
    badgeColor: '#F59E0B',
    technicalSkills: ['SQL & Schema Design', 'Python', 'ETL Pipelines', 'Distributed Computing', 'Data Warehousing', 'DSA'],
    softSkills: ['Data Integrity Focus', 'Business Acumen', 'Clear Documentation'],
    requiredNodeIds: ['dsa_basics', 'graphs_dp', 'db_internals', 'sys_design_cache', 'scale_concurrency'],
    description: `We are hiring Data Engineers to architect robust ETL pipelines, optimize analytical database queries, manage data warehouses, and guarantee data consistency at scale. Interview emphasizes SQL optimization, DAG workflows, and distributed file systems.`,
    recommendedNextAction: 'Deep dive into database explain plans and DAG topological sort algorithms.'
  },
  {
    id: 'aiml_engineer',
    title: 'AI/ML Engineer',
    roleCategory: 'Machine Learning & GenAI',
    company: 'AI Research Labs & Intelligent Products',
    icon: 'Cpu',
    badgeColor: '#06B6D4',
    technicalSkills: ['Python', 'Linear Algebra & ML', 'Deep Learning / Transformers', 'Model Deployment & APIs', 'DSA & Vector Search'],
    softSkills: ['Scientific Rigor', 'Experimental Thinking', 'Explaining Complex Models'],
    requiredNodeIds: ['dsa_basics', 'recursion_trees', 'graphs_dp', 'system_networking', 'live_articulation'],
    description: `Seeking an AI/ML Engineer to train, fine-tune, and deploy intelligent models into high-availability production environments. Must have strong linear algebra, algorithmic problem solving, vector database intuition, and API integration skills.`,
    recommendedNextAction: 'Review vector indexing techniques and practice explaining attention mechanisms out loud.'
  }
];

export const PRESET_ROLES = TARGET_ROLES;

// ==========================================================================
// Short Diagnostic Assessment (Priority 4: Max 10 Questions)
// ==========================================================================
export const ASSESSMENT_QUESTIONS = [
  {
    id: 'q1',
    category: 'DSA',
    question: 'What is the time complexity of searching in a balanced Binary Search Tree (BST)?',
    options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
    correctIndex: 1,
    explanation: 'A balanced BST cuts the search space in half at each step, yielding logarithmic O(log N) time.'
  },
  {
    id: 'q2',
    category: 'DSA',
    question: 'Which algorithmic pattern is best suited to find the maximum sum of a contiguous subarray of size K?',
    options: ['Dynamic Programming', 'Sliding Window', 'Binary Search', 'Breadth-First Search'],
    correctIndex: 1,
    explanation: 'Sliding window maintains running sum by subtracting element leaving window and adding element entering window in O(N) time.'
  },
  {
    id: 'q3',
    category: 'DBMS',
    question: 'Why do relational databases predominantly use B+Trees rather than Hash Indexes for primary indexing?',
    options: [
      'B+Trees require less memory than Hash tables',
      'B+Trees support efficient range queries and sequential scans',
      'Hash indexes cannot store integers',
      'B+Trees guarantee O(1) exact lookups'
    ],
    correctIndex: 1,
    explanation: 'B+Tree leaf nodes are linked sequentially, allowing O(log N) start lookup followed by fast linear disk scanning for range queries.'
  },
  {
    id: 'q4',
    category: 'DBMS',
    question: 'In ACID properties, what does "Atomicity" guarantee?',
    options: [
      'All transactions execute concurrently without delay',
      'Either all operations in a transaction succeed, or none are applied (all-or-nothing)',
      'Data is immediately backed up to secondary storage',
      'No dirty reads can ever occur under any isolation level'
    ],
    correctIndex: 1,
    explanation: 'Atomicity ensures that partial operations never corrupt the database state; failed transactions roll back completely.'
  },
  {
    id: 'q5',
    category: 'OOP',
    question: 'Which Object-Oriented concept allows a subclass to provide a specific implementation of a method declared in its parent class?',
    options: ['Encapsulation', 'Method Overriding (Runtime Polymorphism)', 'Abstraction', 'Method Overloading'],
    correctIndex: 1,
    explanation: 'Method overriding enables dynamic dispatch at runtime where child class specializes parent behavior.'
  },
  {
    id: 'q6',
    category: 'Operating Systems',
    question: 'What is the fundamental difference in memory space between a Process and a Thread?',
    options: [
      'Processes share heap memory, while threads do not',
      'Threads of the same process share code and heap, but have independent stacks',
      'Processes have no stack memory',
      'Threads run on different computers across the network'
    ],
    correctIndex: 1,
    explanation: 'Threads share process address space (heap, data, code), but maintain their own program counters and call stacks.'
  },
  {
    id: 'q7',
    category: 'Computer Networks',
    question: 'During the TCP 3-way handshake, what sequence of packets establishes a reliable connection?',
    options: ['ACK -> SYN -> FIN', 'SYN -> SYN-ACK -> ACK', 'PING -> PONG -> ACK', 'GET -> POST -> 200 OK'],
    correctIndex: 1,
    explanation: 'Client sends SYN, Server acknowledges with SYN-ACK, Client completes with ACK.'
  },
  {
    id: 'q8',
    category: 'Aptitude',
    question: 'A train 150m long passes an electric pole in 15 seconds. What is the speed of the train in km/h?',
    options: ['30 km/h', '36 km/h', '45 km/h', '54 km/h'],
    correctIndex: 1,
    explanation: 'Speed = Distance / Time = 150m / 15s = 10 m/s. Convert to km/h: 10 * (18/5) = 36 km/h.'
  }
];

// ==========================================================================
// Demo Student Baseline Data (Priority 12: Realistic Demo Mode)
// ==========================================================================
export const DEMO_STUDENT = {
  targetRoleTitle: 'Software Developer',
  skillsKnown: ['Java', 'Python', 'SQL', 'React'],
  assessmentResults: {
    DSA: 45,
    DBMS: 80,
    OOP: 75,
    Aptitude: 60,
    OS: 55,
    Networks: 60,
    Communication: 70
  },
  topStrengths: ['Database Systems (DBMS 80%)', 'Object-Oriented Design (OOP 75%)'],
  topGaps: ['Data Structures & Algorithms (DSA 45%)', 'Operating Systems & Concurrency (55%)', 'Distributed System Design'],
  overallReadiness: 62,
  nextAction: 'Practice Arrays & Sliding Window for 30 minutes to close your 45% DSA gap.'
};

// ==========================================================================
// Daily Micro-Quests (Priority 7: 3 Tasks: Learn, Practice, Communicate)
// ==========================================================================
export const DAILY_MICRO_QUESTS = [
  {
    id: 'quest_1',
    type: 'concept',
    pillar: 'Learn',
    pillarIcon: 'Brain',
    tag: 'Learn: 3-Min Mental Model',
    title: 'Understand B+ Trees in Real Databases',
    xp: 100,
    estimatedMinutes: 3,
    status: 'pending',
    icon: 'BookOpen',
    instructions: [
      'Step 1: Watch the 5-minute recommended video lesson below to grasp the difference between hash tables and B+ Trees.',
      'Step 2: Read the core mental model summary on leaf-node traversal.',
      'Step 3: Answer the Quick Check question or click "Mark as Completed" to claim your XP!'
    ],
    videoRecommendation: {
      title: 'Database Indexing & B+ Trees Explained Simply',
      channel: 'ByteByteGo',
      duration: '5:42',
      url: 'https://www.youtube.com/watch?v=aZjYr87r1b8',
      embedUrl: 'https://www.youtube.com/embed/aZjYr87r1b8',
      keyTakeaways: [
        'Hash indexes only support exact matches (WHERE id = 5) and fail at range queries.',
        'B+ Trees store all actual records in leaf nodes connected by a doubly-linked list.',
        'Range queries find the start node in O(log N) and simply scan horizontally on disk.'
      ]
    },
    content: {
      hook: 'Ever wondered why PostgreSQL and MySQL default to B+Trees rather than fast O(1) Hash Indexes?',
      body: 'Hash tables give O(1) for exact lookups (`WHERE id = 42`), but completely fail at range queries (`WHERE age BETWEEN 20 AND 30` or `ORDER BY created_at`). B+Trees keep all records sequentially sorted in leaf nodes linked via doubly-linked pointers. A range query finds the start node in O(log N) and simply walks horizontally across disk pages!',
      quickCheck: {
        question: 'Which query benefits most from a B+Tree index over a Hash index?',
        options: [
          'SELECT * FROM users WHERE email = "alice@example.com"',
          'SELECT * FROM orders WHERE amount > 500 ORDER BY date DESC',
          'SELECT * FROM sessions WHERE token = "xyz789"'
        ],
        correctIndex: 1,
        explanation: 'Range queries and sorted traversal require sequential ordering, which B+Tree leaf-node pointers provide effortlessly!'
      }
    }
  },
  {
    id: 'quest_2',
    type: 'debug',
    pillar: 'Practice',
    pillarIcon: 'Laptop',
    tag: 'Practice: 60s Debug Puzzle',
    title: 'Fix a Sliding-Window Loop Boundary Bug',
    xp: 150,
    estimatedMinutes: 5,
    status: 'pending',
    icon: 'Code',
    instructions: [
      'Step 1: Watch the 6-minute Sliding Window tutorial if you need a quick refresher on subarray pointers.',
      'Step 2: Inspect the loop boundary in the code editor below. Notice what happens when i equals arr.length.',
      'Step 3: Fix the boundary from "i <= arr.length" to "i < arr.length" and run test cases, or click "Show Solution"!'
    ],
    videoRecommendation: {
      title: 'Sliding Window Algorithm in 5 Minutes (Two Pointers)',
      channel: 'NeetCode',
      duration: '6:15',
      url: 'https://www.youtube.com/watch?v=MK-NZ4hN7hk',
      embedUrl: 'https://www.youtube.com/embed/MK-NZ4hN7hk',
      keyTakeaways: [
        'Maintain a dynamic window between left and right index pointers.',
        'Eliminates duplicate nested loops: converts O(N²) quadratic time into O(N) linear time.',
        'Watch array bounds carefully: accessing arr[arr.length] yields undefined / NaN.'
      ]
    },
    content: {
      instruction: 'This function should find the maximum sum of any contiguous subarray of size `k`. Spot and fix the loop condition bug.',
      initialCode: `function maxSubarraySum(arr, k) {
  if (arr.length < k) return null;
  let maxSum = 0;
  let tempSum = 0;
  
  // Initialize first window
  for (let i = 0; i < k; i++) {
    maxSum += arr[i];
  }
  tempSum = maxSum;

  // Slide window across array
  for (let i = k; i <= arr.length; i++) { // <-- Check boundary!
    tempSum = tempSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, tempSum);
  }
  return maxSum;
}`,
      correctCode: `function maxSubarraySum(arr, k) {
  if (arr.length < k) return null;
  let maxSum = 0;
  let tempSum = 0;
  
  for (let i = 0; i < k; i++) {
    maxSum += arr[i];
  }
  tempSum = maxSum;

  for (let i = k; i < arr.length; i++) {
    tempSum = tempSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, tempSum);
  }
  return maxSum;
}`,
      hint: 'Notice `i <= arr.length` accesses `arr[arr.length]` which is undefined, turning tempSum into NaN on the last iteration!'
    }
  },
  {
    id: 'quest_3',
    type: 'star',
    pillar: 'Communicate',
    pillarIcon: 'Mic',
    tag: 'Communicate: 60-Second Explainer',
    title: 'Explain Your Project Architecture in 60 Seconds',
    xp: 200,
    estimatedMinutes: 7,
    status: 'pending',
    icon: 'MessageSquare',
    instructions: [
      'Step 1: Watch the short video guide on how top tech candidates answer "Tell Me About Your Project".',
      'Step 2: Fill in your Situation, Task, Action, and Result with quantifiable metrics.',
      'Step 3: Click "Evaluate with AI" to test your structure, or click "Mark as Completed" to claim your XP!'
    ],
    videoRecommendation: {
      title: 'How to Answer "Tell Me About Your Project" (STAR Framework)',
      channel: 'Jeff Su (Tech Interview Coach)',
      duration: '4:50',
      url: 'https://www.youtube.com/watch?v=0m43S1Wf_vU',
      embedUrl: 'https://www.youtube.com/embed/0m43S1Wf_vU',
      keyTakeaways: [
        'Situation & Task: Set the context in 20 seconds. Do not spend too much time on background.',
        'Action: Dedicate 60% of your time here. Explain technical decisions and trade-offs.',
        'Result: Always end with a measurable outcome (e.g., latency dropped 70%, 5,000 active users).'
      ]
    },
    content: {
      prompt: 'Imagine an interviewer asks: "Give me an elevator pitch of your proudest engineering project and how you handled technical trade-offs." Record or write your structured explanation.',
      starPlaceholders: {
        situation: 'e.g. During our capstone portal, we handled 5,000 student registrations simultaneously...',
        task: 'e.g. Database was bottlenecking with 2-second query timeouts during peak slot bookings...',
        action: 'e.g. I implemented a Redis cache-aside layer and benchmarked connection pooling...',
        result: 'e.g. Latency dropped by 78% and system sustained 100% uptime through registration week.'
      }
    }
  }
];

// ==========================================================================
// AI Mock Interview Questions & Scenarios (Priority 8)
// ==========================================================================
export const INTERVIEW_QUESTIONS_BY_ROLE = {
  software_developer: [
    {
      id: 'sd_q1',
      question: 'How would you find the middle element of a singly linked list in a single pass?',
      idealKeywords: ['slow pointer', 'fast pointer', 'two-pointer', 'O(N) time', 'O(1) space', 'null check'],
      context: 'Core DSA Screening Round'
    },
    {
      id: 'sd_q2',
      question: 'Explain the difference between Optimistic and Pessimistic database locking and when to use each.',
      idealKeywords: ['version column', 'collision', 'lock row', 'contention', 'performance', 'transactions'],
      context: 'Backend & Systems Round'
    },
    {
      id: 'sd_q3',
      question: 'Tell me about a challenging bug you investigated. How did you isolate the root cause?',
      idealKeywords: ['logs', 'reproduce', 'hypothesis', 'fix', 'regression test', 'metric impact'],
      context: 'Behavioral & Engineering Craft'
    }
  ],
  fullstack_developer: [
    {
      id: 'fs_q1',
      question: 'Explain what happens during React reconciliation and why keys are necessary in dynamic lists.',
      idealKeywords: ['virtual DOM', 'diffing algorithm', 're-render', 'identity', 'keys', 'performance'],
      context: 'Frontend Architecture Round'
    },
    {
      id: 'fs_q2',
      question: 'How do you design a secure and idempotent payment checkout endpoint?',
      idealKeywords: ['idempotency key', 'token', 'transaction', 'retry', 'deduplication', 'HTTP status'],
      context: 'API & Reliability Round'
    }
  ],
  default: [
    {
      id: 'gen_q1',
      question: 'Explain the difference between SQL and NoSQL databases. When would you choose one over the other?',
      idealKeywords: ['ACID', 'schema', 'relational', 'scalability', 'document', 'consistency', 'transactions'],
      context: 'System Architecture Fundamentals'
    },
    {
      id: 'gen_q2',
      question: 'Tell me about a time you had a strong disagreement with a teammate on architecture. How did you resolve it?',
      idealKeywords: ['data-driven', 'trade-offs', 'objective benchmark', 'active listening', 'consensus', 'result'],
      context: 'Leadership & Behavioral Round'
    }
  ]
};

export const RUBBER_DUCK_SCENARIOS = [
  {
    id: 'scen_1',
    category: 'Technical Articulation',
    topic: 'SQL vs NoSQL Tradeoffs',
    prompt: 'Imagine an interviewer says: "We are building an e-commerce checkout service. Should we use PostgreSQL or MongoDB? Explain your thought process in 60 seconds."',
    targetKeywords: ['ACID', 'schema', 'transaction', 'relations', 'consistency', 'rollback', 'document', 'latency'],
    idealAnswerOutline: '1. State your conclusion right away (PostgreSQL for financial transactions). 2. Highlight ACID guarantees and rollbacks. 3. Acknowledge when NoSQL fits. 4. Summarize trade-off succinctly.'
  },
  {
    id: 'scen_2',
    category: 'System Design Pitch',
    topic: 'How Redis Prevents Database Meltdown',
    prompt: 'You have 60 seconds: "Explain how you would prevent a database from crashing if millions of users suddenly check a viral live score."',
    targetKeywords: ['cache', 'redis', 'in-memory', 'TTL', 'read replica', 'stampede', 'rate limit', 'CDN'],
    idealAnswerOutline: '1. Put an in-memory cache (Redis) or CDN in front. 2. Set aggressive short TTLs. 3. Use mutex distributed locking to avoid cache stampede. 4. Offload static assets.'
  },
  {
    id: 'scen_3',
    category: 'Behavioral Intro',
    topic: 'The 60-Second "Tell Me About Yourself"',
    prompt: '"Tell me about yourself and why you are interested in this software engineering position."',
    targetKeywords: ['passion', 'experience', 'projects', 'impact', 'solved', 'learn', 'collaborate', 'skills'],
    idealAnswerOutline: '1. Present: Who you are and current focus. 2. Past: 1-2 impactful projects. 3. Future: Why this company aligns with what you want to build next.'
  }
];
