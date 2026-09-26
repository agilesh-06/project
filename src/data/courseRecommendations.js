// ==========================================================================
// SkillTree.AI - Sector Course Recommendations & Knowledge Level Evaluation
// ==========================================================================

export const SECTOR_COURSES = {
  'Software Developer': {
    sectorName: 'Core Software Engineering',
    foundationalBasics: [
      {
        concept: 'Data Structures (Arrays, Linked Lists, Stacks, Queues, Hash Maps)',
        importance: 'Forms 70% of coding assessment rounds in tech placements.',
        action: 'Implement each structure from scratch and analyze time/space complexities.'
      },
      {
        concept: 'Algorithmic Complexity & Big-O Notation',
        importance: 'Evaluating worst-case and average-case performance is required in all live coding rounds.',
        action: 'Practice identifying O(1), O(log N), O(N), and O(N^2) patterns.'
      },
      {
        concept: 'Object-Oriented Programming (OOP) Principles',
        importance: 'Encapsulation, Inheritance, Polymorphism, and Abstraction tested in tech screenings.',
        action: 'Build modular classes with proper access specifiers and interface contracts.'
      }
    ],
    beginnerCourses: [
      {
        id: 'sd_beg_1',
        title: 'Computer Science Fundamentals: DSA & Big-O In Depth',
        provider: 'SkillTree Placement Academy',
        level: 'Beginner to Intermediate',
        duration: '18 Hours',
        rating: '4.9',
        skills: ['Arrays & Hash Maps', 'Time Complexity', 'Recursion Fundamentals', 'Two-Pointers'],
        description: 'Comprehensive foundational track covering essential data structures, pointer mechanics, and common technical interview patterns.',
        curriculum: [
          'Module 1: Big-O Asymptotic Analysis & Space-Time Trade-offs',
          'Module 2: Arrays, Strings, and Two-Pointer Traversal',
          'Module 3: Hash Tables, Collisions, and Amortized O(1) Lookups',
          'Module 4: Stack & Queue Implementations with Real-World Applications'
        ]
      },
      {
        id: 'sd_beg_2',
        title: 'Object-Oriented Design & Clean Code Principles',
        provider: 'SkillTree Engineering Labs',
        level: 'Foundational',
        duration: '12 Hours',
        rating: '4.8',
        skills: ['OOP 4 Pillars', 'SOLID Principles', 'Modular Code Hygiene', 'Unit Testing'],
        description: 'Master clean class composition, encapsulation, abstraction, and write bug-resistant object models.',
        curriculum: [
          'Module 1: Encapsulation & Information Hiding with Access Modifiers',
          'Module 2: Polymorphism vs Method Overriding in Practice',
          'Module 3: Introduction to Single Responsibility & Open-Closed Principles',
          'Module 4: Writing Testable Functions and Basic Unit Test Suites'
        ]
      }
    ],
    advancedCourses: [
      {
        id: 'sd_adv_1',
        title: 'Production System Design & Scalable Architecture',
        provider: 'SkillTree Pro Masterclass',
        level: 'Advanced',
        duration: '26 Hours',
        rating: '4.95',
        skills: ['Distributed Systems', 'CAP Theorem', 'Horizontal Partitioning', 'Caching Strategies'],
        description: 'Architect resilient systems capable of handling millions of requests with zero downtime and low latency.',
        curriculum: [
          'Module 1: High-Throughput Load Balancing & Reverse Proxies',
          'Module 2: Distributed Caching with Redis & Cache Invalidation',
          'Module 3: Database Sharding, Replication, and ACID vs BASE',
          'Module 4: Microservices Communication with gRPC and Message Queues'
        ]
      },
      {
        id: 'sd_adv_2',
        title: 'Advanced Graph Algorithms & Dynamic Programming Mastery',
        provider: 'Competitive Placement Core',
        level: 'Advanced',
        duration: '22 Hours',
        rating: '4.9',
        skills: ['Dijkstra & Bellman-Ford', 'Topological Sorting', '1D & 2D Dynamic Programming', 'Bitmask DP'],
        description: 'Tackle the hardest problem sets seen in Tier-1 product company technical interviews.',
        curriculum: [
          'Module 1: Directed Acyclic Graphs & Kahn Topological Ordering',
          'Module 2: Shortest Path Optimization & Network Flow',
          'Module 3: Overlapping Subproblems & Optimal Substructure (Knapsack Variants)',
          'Module 4: Tree Dynamic Programming and State Space Reductions'
        ]
      }
    ]
  },

  'Frontend Engineer': {
    sectorName: 'Frontend & UI Architecture',
    foundationalBasics: [
      {
        concept: 'DOM Tree Manipulation & Browser Event Loop',
        importance: 'Core foundation behind interactive single-page applications.',
        action: 'Learn how bubbling, capturing, and the microtask queue schedule UI repaints.'
      },
      {
        concept: 'CSS Box Model, Flexbox & Responsive Grid',
        importance: 'Required to build pixel-perfect layouts across mobile and desktop viewport sizes.',
        action: 'Build responsive cards without hardcoded pixel widths.'
      },
      {
        concept: 'Component State & Props Lifecycle',
        importance: 'Essential for preventing unnecessary re-renders in modern UI frameworks.',
        action: 'Trace data flow unidirectionally from parent to child components.'
      }
    ],
    beginnerCourses: [
      {
        id: 'fe_beg_1',
        title: 'Modern JavaScript & DOM Mechanics Zero-to-Hero',
        provider: 'SkillTree Web Labs',
        level: 'Foundational',
        duration: '16 Hours',
        rating: '4.9',
        skills: ['ES6+ Syntax', 'Closures & Scopes', 'Event Delegation', 'Fetch & Promises'],
        description: 'Understand the underlying JavaScript engine, asynchronous microtasks, and DOM manipulation principles.',
        curriculum: [
          'Module 1: Variable Scoping (var vs let vs const) & Execution Contexts',
          'Module 2: Event Listeners, Bubbling, Capturing, and Delegation',
          'Module 3: Promises, Async/Await, and Handling API Error States',
          'Module 4: Modern Array Methods (map, filter, reduce) and Immutability'
        ]
      },
      {
        id: 'fe_beg_2',
        title: 'Responsive UI Design: Flexbox, CSS Grid & Accessibility',
        provider: 'UI Craft Academy',
        level: 'Foundational',
        duration: '14 Hours',
        rating: '4.8',
        skills: ['CSS Box Model', 'Flexbox Alignments', 'CSS Grid Fr Units', 'WCAG a11y Standards'],
        description: 'Construct accessible, visually balanced, and mobile-responsive layouts from scratch.',
        curriculum: [
          'Module 1: Box-Sizing Border-Box & Margin Collapse Gotchas',
          'Module 2: Master Flexbox Justify-Content, Align-Items, and Flex-Grow',
          'Module 3: Multi-Column Responsive Layouts with CSS Grid auto-fit',
          'Module 4: Semantic HTML5 Elements & Keyboard Tab Order Navigation'
        ]
      }
    ],
    advancedCourses: [
      {
        id: 'fe_adv_1',
        title: 'High-Performance Web Apps: 60 FPS & Core Web Vitals',
        provider: 'Frontend Masters Lab',
        level: 'Advanced',
        duration: '20 Hours',
        rating: '4.95',
        skills: ['Chrome Performance Profiler', 'LCP / INP / CLS Optimization', 'Virtual DOM Diffing', 'Code-Splitting'],
        description: 'Eliminate main-thread jank, minimize layout shifts, and master modern sub-second asset delivery.',
        curriculum: [
          'Module 1: Profiling Rendering Pipelines: Recalculate Styles, Layout & Paint',
          'Module 2: Virtualized Infinite Lists for 100,000+ DOM Nodes',
          'Module 3: Next.js / Vite Tree Shaking & Dynamic Lazy Bundling',
          'Module 4: Web Workers for Heavy Computation Offloading'
        ]
      },
      {
        id: 'fe_adv_2',
        title: 'Enterprise Micro-Frontends & State Machine Architecture',
        provider: 'Enterprise UI Systems',
        level: 'Advanced',
        duration: '24 Hours',
        rating: '4.9',
        skills: ['Module Federation', 'XState Finite State Machines', 'Design System Tokens', 'End-to-End Cypress'],
        description: 'Architect multi-team frontend applications with isolated micro-apps and deterministic state machines.',
        curriculum: [
          'Module 1: Webpack / Vite Module Federation Cross-App Component Sharing',
          'Module 2: Deterministic State Management with XState and Redux Toolkit',
          'Module 3: Design Tokens & Scalable CSS Glassmorphic Theming Engines',
          'Module 4: Automated CI/CD Visual Regression Testing'
        ]
      }
    ]
  },

  'Backend Developer': {
    sectorName: 'Backend & Server Systems',
    foundationalBasics: [
      {
        concept: 'RESTful API Design & HTTP Verbs (GET, POST, PUT, DELETE)',
        importance: 'Evaluated in every backend developer interview and take-home project.',
        action: 'Design stateless endpoints with standard HTTP status code contracts.'
      },
      {
        concept: 'Relational Database Queries & Indexing (SQL)',
        importance: 'Understanding JOIN operations and B-Tree indexes avoids slow full-table scans.',
        action: 'Write normalized schemas with foreign keys and compound indexes.'
      },
      {
        concept: 'Authentication & Session Security (JWT, Cookies, Hashes)',
        importance: 'Critical for safeguarding protected endpoints against unauthorized access.',
        action: 'Implement bcrypt salted hashing and secure token expiration.'
      }
    ],
    beginnerCourses: [
      {
        id: 'be_beg_1',
        title: 'Backend Engineering 101: REST APIs, Express & SQL',
        provider: 'SkillTree Server Academy',
        level: 'Foundational',
        duration: '18 Hours',
        rating: '4.85',
        skills: ['Node.js / Express', 'REST Conventions', 'PostgreSQL Basics', 'Middleware Architecture'],
        description: 'Construct secure, robust backend web services with structured routing, controllers, and database models.',
        curriculum: [
          'Module 1: Node.js Runtime, Event Loop & Non-Blocking I/O',
          'Module 2: Express Router, Custom Middleware, and Global Error Handlers',
          'Module 3: Relational Tables, Foreign Key Constraints, and SQL CRUD',
          'Module 4: Request Validation (Joi/Zod) and Input Sanitization'
        ]
      },
      {
        id: 'be_beg_2',
        title: 'Database Design & SQL Query Optimization Fundamentals',
        provider: 'Data Systems Lab',
        level: 'Foundational',
        duration: '15 Hours',
        rating: '4.8',
        skills: ['1NF / 2NF / 3NF Normalization', 'INNER vs LEFT JOINs', 'B-Tree Indexes', 'Transactions'],
        description: 'Learn how relational engines store, index, and query data to prevent N+1 query bottlenecks.',
        curriculum: [
          'Module 1: Relational Modeling & Cardinality (One-to-Many, Many-to-Many)',
          'Module 2: Multi-Table JOIN Operations and Aggregations',
          'Module 3: How B-Tree Indexes Accelerate WHERE Clauses',
          'Module 4: ACID Transactions & Rollback Strategies'
        ]
      }
    ],
    advancedCourses: [
      {
        id: 'be_adv_1',
        title: 'Distributed Systems, Message Queues & Microservices',
        provider: 'SkillTree Backend Pro',
        level: 'Advanced',
        duration: '28 Hours',
        rating: '4.95',
        skills: ['Kafka / RabbitMQ', 'Redis Distributed Caching', 'Eventual Consistency', 'Idempotency Keys'],
        description: 'Design decoupled, fault-tolerant backend architectures supporting millions of concurrent transactions.',
        curriculum: [
          'Module 1: Event-Driven Architectures with Kafka Topics & Consumer Groups',
          'Module 2: Distributed Locking & Redlock Algorithm with Redis',
          'Module 3: Two-Phase Commit vs Saga Pattern in Distributed Transactions',
          'Module 4: Rate Limiting Algorithms (Token Bucket, Leaky Bucket, Sliding Window)'
        ]
      },
      {
        id: 'be_adv_2',
        title: 'High-Concurrency Go / Java Server Architecture & gRPC',
        provider: 'Systems Engineering Collective',
        level: 'Advanced',
        duration: '24 Hours',
        rating: '4.9',
        skills: ['Goroutines / Virtual Threads', 'gRPC & Protocol Buffers', 'Connection Pooling', 'Zero-Allocation I/O'],
        description: 'Write blazing-fast network services utilizing binary protocols, lightweight concurrency, and optimized memory pools.',
        curriculum: [
          'Module 1: Concurrency Primitives (Channels, Mutexes, Semaphores)',
          'Module 2: Protobuf Schema Definition & gRPC Streaming Endpoints',
          'Module 3: Connection Pool Sizing and TCP Keep-Alive Optimization',
          'Module 4: Distributed Tracing with OpenTelemetry and Prometheus Metrics'
        ]
      }
    ]
  },

  'Full Stack Developer': {
    sectorName: 'Web & Applications',
    foundationalBasics: [
      {
        concept: 'End-to-End Request-Response Architecture',
        importance: 'The unifying mental model connecting frontend client calls to backend database commits.',
        action: 'Trace a form submit from React state through an HTTP payload to a database insert.'
      },
      {
        concept: 'Stateless JWT vs Stateful Session Cookies',
        importance: 'Crucial for multi-server scalability and user authentication security.',
        action: 'Build token refresh workflows with httpOnly cookie storage.'
      },
      {
        concept: 'Relational (SQL) vs Document (NoSQL) Trade-offs',
        importance: 'Determines project scalability and query flexibility early in development.',
        action: 'Identify when structured relational constraints outperform flexible JSON documents.'
      }
    ],
    beginnerCourses: [
      {
        id: 'fs_beg_1',
        title: 'Full Stack MERN/PERN Web Application Bootcamp',
        provider: 'SkillTree Full Stack Academy',
        level: 'Foundational',
        duration: '22 Hours',
        rating: '4.9',
        skills: ['React UI', 'Node/Express API', 'PostgreSQL / MongoDB', 'JWT Auth'],
        description: 'Build complete production-grade full stack web applications with database persistence and user authentication.',
        curriculum: [
          'Module 1: Unified Frontend-Backend Folder Structure and Monorepo Setup',
          'Module 2: Building Secure REST Endpoints with Express and ORM (Prisma/Sequelize)',
          'Module 3: React Hooks (useState, useEffect, useContext) for Server Data',
          'Module 4: User Registration, Salted Password Hashing, and JWT Tokens'
        ]
      },
      {
        id: 'fs_beg_2',
        title: 'API Integration, Form Validation & State Synchronization',
        provider: 'Web Application Hub',
        level: 'Foundational',
        duration: '15 Hours',
        rating: '4.8',
        skills: ['TanStack Query', 'Zod Schemas', 'Optimistic Updates', 'CORS Configuration'],
        description: 'Connect frontend interfaces with backend servers seamlessly with error boundaries and data caching.',
        curriculum: [
          'Module 1: Server State Management with React Query / TanStack',
          'Module 2: End-to-End Schema Validation with Zod and TypeScript',
          'Module 3: Optimistic UI Updates with Immediate Rollback on Server Error',
          'Module 4: Solving Cross-Origin Resource Sharing (CORS) Headers & Preflight Options'
        ]
      }
    ],
    advancedCourses: [
      {
        id: 'fs_adv_1',
        title: 'Full Stack Next.js 15: Server Actions, SSR & Edge Runtime',
        provider: 'Modern Web Pro Lab',
        level: 'Advanced',
        duration: '26 Hours',
        rating: '4.95',
        skills: ['Next.js App Router', 'React Server Components', 'Server Actions', 'Edge Caching'],
        description: 'Master hybrid rendering architectures where components render on the server with zero client JavaScript overhead.',
        curriculum: [
          'Module 1: Server Components vs Client Components Decision Trees',
          'Module 2: Database Queries directly inside Server Actions without REST overhead',
          'Module 3: Incremental Static Regeneration (ISR) and Edge Middleware',
          'Module 4: Real-time WebSockets and Server-Sent Events (SSE) Pipelines'
        ]
      },
      {
        id: 'fs_adv_2',
        title: 'Production DevOps for Full Stack: Docker, CI/CD & Kubernetes',
        provider: 'Cloud Native Engineering',
        level: 'Advanced',
        duration: '22 Hours',
        rating: '4.9',
        skills: ['Multi-Stage Dockerfiles', 'GitHub Actions CI/CD', 'Nginx Ingress', 'Postgres Backups'],
        description: 'Containerize and deploy full stack web apps with zero-downtime rolling updates and automated testing.',
        curriculum: [
          'Module 1: Writing Lightweight Multi-Stage Docker Builds for Node and React',
          'Module 2: Automated Testing & Linting Pipelines with GitHub Actions',
          'Module 3: Zero-Downtime Deployment with Nginx Reverse Proxy and SSL Certificates',
          'Module 4: Automated Database Migration Rollouts and Disaster Recovery'
        ]
      }
    ]
  },

  'AI / ML Engineer': {
    sectorName: 'Machine Learning & GenAI Systems',
    foundationalBasics: [
      {
        concept: 'Supervised vs Unsupervised Learning Paradigms',
        importance: 'The starting foundation for all ML problem formulation and evaluation metrics.',
        action: 'Formulate classification vs regression problems and pick suitable loss functions.'
      },
      {
        concept: 'Overfitting vs Underfitting (Bias-Variance Trade-off)',
        importance: 'Tested in every data science and machine learning screening interview.',
        action: 'Apply L1/L2 regularization, dropout, and early stopping to stabilize generalization.'
      },
      {
        concept: 'Vector Embeddings, Cosine Similarity & Vector Databases',
        importance: 'Core technology powering modern Generative AI, RAG, and semantic search.',
        action: 'Generate embeddings with an open model and compute dot-product similarity.'
      }
    ],
    beginnerCourses: [
      {
        id: 'ai_beg_1',
        title: 'Machine Learning Foundations: Python, NumPy & Scikit-Learn',
        provider: 'SkillTree AI Academy',
        level: 'Foundational',
        duration: '20 Hours',
        rating: '4.9',
        skills: ['NumPy Matrix Math', 'Pandas Feature Engineering', 'Linear Models', 'Model Evaluation'],
        description: 'Understand the core mathematics of loss gradients, feature scaling, and statistical evaluation metrics.',
        curriculum: [
          'Module 1: Vectorized Array Math and Broadcasting in NumPy',
          'Module 2: Data Cleaning, Missing Value Imputation, and One-Hot Encoding',
          'Module 3: Linear & Logistic Regression with Gradient Descent Intuition',
          'Module 4: Cross-Validation, Precision, Recall, F1-Score, and ROC-AUC Curves'
        ]
      },
      {
        id: 'ai_beg_2',
        title: 'Deep Learning & Neural Networks Zero-to-Hero',
        provider: 'Deep Learning Collective',
        level: 'Foundational',
        duration: '18 Hours',
        rating: '4.85',
        skills: ['PyTorch Tensors', 'Backpropagation', 'Activation Functions', 'CNN Image Basics'],
        description: 'Build your first multi-layer perceptron neural network from scratch using PyTorch.',
        curriculum: [
          'Module 1: Automatic Differentiation with PyTorch autograd',
          'Module 2: Activations (ReLU, Softmax) and Loss Functions (Cross-Entropy, MSE)',
          'Module 3: Forward Pass, Backpropagation, and Optimizer Tuning (Adam vs SGD)',
          'Module 4: Preventing Overfitting with Dropout and Batch Normalization'
        ]
      }
    ],
    advancedCourses: [
      {
        id: 'ai_adv_1',
        title: 'Generative AI & LLM Systems: Fine-Tuning, LoRA & Production RAG',
        provider: 'SkillTree GenAI Research Lab',
        level: 'Advanced',
        duration: '28 Hours',
        rating: '4.95',
        skills: ['Transformer Attention', 'LoRA Parameter-Efficient Fine-Tuning', 'Vector DB Retrieval (Pinecone/Milvus)', 'Quantization'],
        description: 'Build enterprise-grade Retrieval Augmented Generation (RAG) pipelines and fine-tune open weights LLMs.',
        curriculum: [
          'Module 1: Self-Attention Mechanics & Multi-Head Transformer Architecture',
          'Module 2: Production RAG: Chunking, HyDE, Re-ranking & Vector Indexing',
          'Module 3: Parameter-Efficient Fine-Tuning (PEFT / LoRA / QLoRA)',
          'Module 4: LLM Guardrails, Hallucination Mitigation, and Latency Optimization'
        ]
      },
      {
        id: 'ai_adv_2',
        title: 'MLOps: Deploying Scalable ML Models with Triton & Kubernetes',
        provider: 'MLOps Engineering Guild',
        level: 'Advanced',
        duration: '24 Hours',
        rating: '4.9',
        skills: ['Model Serving (Triton/FastAPI)', 'Feature Stores', 'Data Drift Detection', 'TensorRT Optimization'],
        description: 'Transition trained models from Jupyter notebooks into resilient, low-latency microservices with automated retraining.',
        curriculum: [
          'Module 1: Model Serialization (ONNX, TorchScript) and TensorRT Acceleration',
          'Module 2: High-Throughput Inference Microservices with FastAPI & Triton',
          'Module 3: Continuous Monitoring for Concept Drift and Covariate Shift',
          'Module 4: Automated CI/CD Pipelines for Machine Learning (Kubeflow / MLflow)'
        ]
      }
    ]
  },

  'Data Engineer': {
    sectorName: 'Big Data & Data Pipelines',
    foundationalBasics: [
      {
        concept: 'Relational Star Schema vs Snowflake Schema',
        importance: 'The bedrock of modern analytics data warehousing and business intelligence.',
        action: 'Design dimensional models with Fact tables and Dimension tables.'
      },
      {
        concept: 'Batch Processing vs Stream Processing',
        importance: 'Determines whether an ingestion pipeline processes scheduled chunks or real-time events.',
        action: 'Distinguish when nightly ETL batches suffice vs sub-second Kafka streaming.'
      },
      {
        concept: 'SQL Window Functions (ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD)',
        importance: 'Tested heavily in all data engineering technical screening rounds.',
        action: 'Write analytical window queries partitioned by category and ordered by timestamp.'
      }
    ],
    beginnerCourses: [
      {
        id: 'de_beg_1',
        title: 'Data Engineering 101: Advanced SQL, ETL & Data Modeling',
        provider: 'SkillTree Data Lab',
        level: 'Foundational',
        duration: '18 Hours',
        rating: '4.9',
        skills: ['Advanced SQL', 'Star Schema', 'ETL Scripting with Python', 'Postgres Warehousing'],
        description: 'Master dimensional modeling, complex SQL analytical transformations, and automated extraction scripts.',
        curriculum: [
          'Module 1: Advanced Window Functions (OVER, PARTITION BY, LAG, LEAD)',
          'Module 2: Dimensional Modeling: Fact Tables, Slowly Changing Dimensions (SCD)',
          'Module 3: Python Data Ingestion Scripts with Error Retries & Backoff',
          'Module 4: Writing Idempotent Data Pipelines with Automated Validation'
        ]
      },
      {
        id: 'de_beg_2',
        title: 'Data Ingestion & Workflow Orchestration with Apache Airflow',
        provider: 'Pipeline Engineering Academy',
        level: 'Foundational',
        duration: '16 Hours',
        rating: '4.85',
        skills: ['Airflow DAGs', 'Task Dependencies', 'Sensors & Hooks', 'Pipeline Monitoring'],
        description: 'Orchestrate multi-step data pipelines with automated scheduling, dependency management, and alert notifications.',
        curriculum: [
          'Module 1: Airflow Architecture: Scheduler, Webserver, and Celery Workers',
          'Module 2: Authoring Directed Acyclic Graphs (DAGs) in Clean Python',
          'Module 3: Backfilling, Task Retries, and Handling Upstream Failures',
          'Module 4: Interfacing with Cloud Object Storage (S3 / GCS) via Airflow Hooks'
        ]
      }
    ],
    advancedCourses: [
      {
        id: 'de_adv_1',
        title: 'Distributed Big Data with Apache Spark & Delta Lake',
        provider: 'Big Data Mastery Institute',
        level: 'Advanced',
        duration: '26 Hours',
        rating: '4.95',
        skills: ['PySpark DataFrames', 'Catalyst Optimizer', 'Delta Lake ACID', 'Partition Pruning'],
        description: 'Process petabyte-scale datasets across distributed clusters with memory caching and ACID transactions on Lakehouse storage.',
        curriculum: [
          'Module 1: Spark Architecture: Drivers, Executors, Partitions, and Shuffles',
          'Module 2: Eliminating Data Skew & Salting Keys in Large Joins',
          'Module 3: Delta Lake ACID Transactions, Time Travel, and Vacuum Optimization',
          'Module 4: Spark Structured Streaming for Sub-Second Ingestion Pipelines'
        ]
      },
      {
        id: 'de_adv_2',
        title: 'Real-Time Streaming Systems with Apache Kafka & Flink',
        provider: 'Streaming Systems Lab',
        level: 'Advanced',
        duration: '24 Hours',
        rating: '4.9',
        skills: ['Kafka Broker Clusters', 'Exactly-Once Semantics', 'Flink Watermarks', 'Stream Joins'],
        description: 'Build real-time event-driven streaming pipelines with stateful stream processing and exactly-once processing guarantees.',
        curriculum: [
          'Module 1: Kafka Partitions, Consumer Offsets, and Log Compaction',
          'Module 2: Stateful Stream Transformations with Apache Flink',
          'Module 3: Handling Out-of-Order Events with Watermarks and Sliding Windows',
          'Module 4: Exactly-Once Processing Semantics (EOS) End-to-End'
        ]
      }
    ]
  }
};

/**
 * Evaluates the student's basic knowledge level based on their diagnostic score,
 * generates specific concepts to learn, and selects recommended courses.
 */
export function evaluateStudentKnowledge(roleTitle, scorePercent, missedQuestions = [], masteredConcepts = []) {
  // Normalize role title to match key
  let sectorKey = Object.keys(SECTOR_COURSES).find(k => 
    roleTitle.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(roleTitle.toLowerCase())
  );
  if (!sectorKey) {
    sectorKey = 'Software Developer';
  }

  const sectorData = SECTOR_COURSES[sectorKey];
  const isHighScorer = scorePercent >= 75;

  let knowledgeLevel = '';
  let levelBadge = '';
  let evaluationSummary = '';
  let recommendedCourses = [];
  let conceptsToReview = [];

  if (isHighScorer) {
    knowledgeLevel = scorePercent >= 90 ? 'Mastery Specialist (Advanced)' : 'Competent Practitioner (Intermediate-Advanced)';
    levelBadge = 'Advanced Mastery Track Unlocked';
    evaluationSummary = `Outstanding work! You demonstrated strong foundational command of ${sectorData.sectorName} (${scorePercent}% score). You have already mastered core basics, so your daily plan and course recommendations are elevated directly to production-grade architecture, system trade-offs, and advanced interview prep.`;
    
    // Recommend advanced courses
    recommendedCourses = sectorData.advancedCourses;

    // Review advanced concepts / edge cases
    conceptsToReview = [
      {
        concept: 'High-Throughput Concurrency & Race Condition Elimination',
        importance: 'Differentiates mid-level engineers from senior product candidates.',
        action: 'Review distributed locks, thread safety, and idempotent API retries.'
      },
      {
        concept: 'Scalable System Architecture & Fault-Tolerant Trade-offs',
        importance: 'Essential for passing system design rounds in top tech companies.',
        action: 'Design multi-tier caching architectures with fallback circuit breakers.'
      }
    ];
  } else {
    knowledgeLevel = scorePercent < 50 ? 'Foundational Novice (Needs Strengthening)' : 'Developing Learner (Core Basics in Progress)';
    levelBadge = 'Foundations Track Assigned';
    evaluationSummary = `You scored ${scorePercent}% in the ${sectorData.sectorName} diagnostic. We detected foundational knowledge gaps that interviewers frequently test. Don't worry — we've assigned a step-by-step 7-Day Foundations Track and foundational courses to master the basics before moving to complex concepts.`;

    // Recommend beginner foundational courses
    recommendedCourses = sectorData.beginnerCourses;

    // Gather missed question basics
    if (missedQuestions.length > 0) {
      conceptsToReview = missedQuestions.map(q => q.basicToLearn || {
        concept: q.topic || 'Core Concept',
        importance: 'Foundational concept tested in technical interviews.',
        action: `Review standard implementation of ${q.topic}.`
      });
    } else {
      conceptsToReview = sectorData.foundationalBasics;
    }
  }

  return {
    roleTitle: sectorKey,
    sectorName: sectorData.sectorName,
    scorePercent,
    isHighScorer,
    knowledgeLevel,
    levelBadge,
    evaluationSummary,
    conceptsToReview,
    recommendedCourses,
    allBasics: sectorData.foundationalBasics,
    assignedDailyTrack: isHighScorer ? 'advanced' : 'foundations',
    nextMilestone: isHighScorer 
      ? 'Complete Day 1 Advanced Systems Challenge & Take AI Mock Interview' 
      : 'Complete Day 1 Foundational Syntax & Data Structures Daily Task'
  };
}
