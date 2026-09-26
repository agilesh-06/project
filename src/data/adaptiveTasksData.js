// ==========================================================================
// SkillTree.AI - Adaptive Daily Tasks by Domain & Diagnostic Performance
// Dynamically assigns daily tasks based on student score:
// Low Score (<60%): Foundations Track (Core Basics & Remediation)
// Mid Score (60-79%): Core Competence Track (Targeted Gap Bridging)
// High Score (>=80%): Advanced Mastery Track (Enhanced & System Design Challenges)
// Strictly NO emojis.
// ==========================================================================

export const ADAPTIVE_TRACKS = {
  // ========================================================================
  // 1. FRONTEND DEVELOPER
  // ========================================================================
  'Frontend Developer': {
    foundations: {
      trackName: 'Foundations Track',
      trackTier: 'Beginner to Intermediate',
      badgeColor: '#f59e0b',
      summary: 'Focused on core web fundamentals, DOM basics, CSS layouts, and simple React component state.',
      description: 'Your diagnostic results show core fundamentals need strengthening. Follow this step-by-step daily guide to build confidence from the basics.',
      days: [
        {
          day: 1,
          title: 'Day 1 · HTML5 Semantic Tags & The Box Model',
          goal: 'Understand header, nav, main, footer semantic tags and margin/padding/border box sizing.',
          duration: '30 mins',
          difficulty: 'Beginner',
          xp: 150,
          why: 'Interviewers look for clean, accessible HTML before evaluating complex frameworks.',
          keyExercise: 'Create a semantic card layout with proper box-sizing: border-box and margin collapsing prevention.'
        },
        {
          day: 2,
          title: 'Day 2 · CSS Flexbox Alignment Fundamentals',
          goal: 'Master justify-content, align-items, flex-direction, and flex-wrap without guessing.',
          duration: '35 mins',
          difficulty: 'Beginner',
          xp: 150,
          why: 'Tested in 100% of frontend screening rounds. Flexbox eliminates float and absolute positioning hacks.',
          keyExercise: 'Build a responsive navbar with brand on left, links centered, and login button pinned to the right.'
        },
        {
          day: 3,
          title: 'Day 3 · JavaScript Variables, Scopes & Array Methods',
          goal: 'Differentiate let, const, var, and practice .map(), .filter(), .reduce() on objects.',
          duration: '35 mins',
          difficulty: 'Beginner',
          xp: 180,
          why: 'Modern React code is 90% declarative JavaScript array transformations.',
          keyExercise: 'Transform a list of raw student test objects into sorted passing grades using .filter() and .map().'
        },
        {
          day: 4,
          title: 'Day 4 · DOM Event Listeners & Event Bubbling',
          goal: 'Understand addEventListener, event.target vs event.currentTarget, and preventDefault.',
          duration: '30 mins',
          difficulty: 'Beginner',
          xp: 180,
          why: 'Standard interview question: explain how event delegation handles dynamic click events on lists.',
          keyExercise: 'Attach a single click listener to a parent <ul> to delete clicked child items via event delegation.'
        },
        {
          day: 5,
          title: 'Day 5 · React useState & Component Props',
          goal: 'Pass props down to child components and update state immutably without direct mutation.',
          duration: '40 mins',
          difficulty: 'Beginner',
          xp: 200,
          why: 'React renders depend on reference equality. Mutating arrays directly causes silent rendering bugs.',
          keyExercise: 'Build a simple counter with step increments and an input box controlled by useState.'
        },
        {
          day: 6,
          title: 'Day 6 · useEffect & Fetching Data from APIs',
          goal: 'Understand the dependency array, avoid infinite render loops, and handle loading/error states.',
          duration: '35 mins',
          difficulty: 'Beginner',
          xp: 200,
          why: 'Every single frontend job requires displaying asynchronous API data on screen cleanly.',
          keyExercise: 'Fetch a list of users from jsonplaceholder.typicode.com and display loading, error, and data states.'
        },
        {
          day: 7,
          title: 'Day 7 · 60-Second Frontend Concepts Articulation',
          goal: 'Practice explaining: (1) Virtual DOM, (2) Box Model, and (3) useState out loud clearly.',
          duration: '25 mins',
          difficulty: 'Beginner',
          xp: 250,
          why: 'Clear communication separates candidates who only copy code from those who truly understand.',
          keyExercise: 'Record a 60-second voice answer explaining what happens when a button is clicked in React.'
        }
      ]
    },
    advanced: {
      trackName: 'Advanced Mastery Track',
      trackTier: 'Senior & Production Challenges',
      badgeColor: '#10b981',
      summary: 'Focuses on 60fps rendering, Virtual DOM fiber reconciler, Core Web Vitals (LCP/INP), and frontend system design.',
      description: 'You scored well on the diagnostic test! You have unlocked enhanced, production-grade tasks to target Tier-1 tech placements.',
      days: [
        {
          day: 1,
          title: 'Day 1 · React Fiber Reconciler & Concurrent Rendering',
          goal: 'Deep-dive into how React 18 uses lane-based scheduling, time-slicing, and startTransition.',
          duration: '45 mins',
          difficulty: 'Advanced',
          xp: 250,
          why: 'Tier-1 product companies test whether you understand browser frame budgets (16ms) and rendering pipelines.',
          keyExercise: 'Simulate heavy list filtering using useTransition and useDeferredValue to maintain 60fps responsiveness.'
        },
        {
          day: 2,
          title: 'Day 2 · Core Web Vitals & Real-Time Performance Profiling',
          goal: 'Optimize Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS).',
          duration: '40 mins',
          difficulty: 'Advanced',
          xp: 250,
          why: 'Google search rankings and top consumer apps heavily evaluate frontend candidates on web performance metrics.',
          keyExercise: 'Use Chrome Performance DevTools to identify long tasks (>50ms) and optimize render blocking resources.'
        },
        {
          day: 3,
          title: 'Day 3 · Custom Hooks & Complex State Management Architecture',
          goal: 'Implement a custom useAsync hook with abort controllers, retry exponential backoff, and cache deduplication.',
          duration: '45 mins',
          difficulty: 'Advanced',
          xp: 250,
          why: 'Demonstrates enterprise code reusability and leak-free memory cleanup during component unmounts.',
          keyExercise: 'Write an auto-cancelling search autocomplete hook using AbortController and debouncing.'
        },
        {
          day: 4,
          title: 'Day 4 · Micro-Frontends & Module Federation',
          goal: 'Understand how large teams decouple monolithic frontends using Webpack Module Federation or Vite federation.',
          duration: '40 mins',
          difficulty: 'Advanced',
          xp: 260,
          why: 'Key architecture question for senior product engineering and high-scale enterprise platforms.',
          keyExercise: 'Architect shared dependency versioning and isolated sandbox state between remote applications.'
        },
        {
          day: 5,
          title: 'Day 5 · Frontend Security: XSS, CSRF & CSP Hardening',
          goal: 'Defend web apps against Reflected/DOM XSS, secure JWT storage, and configure Content Security Policy headers.',
          duration: '35 mins',
          difficulty: 'Advanced',
          xp: 250,
          why: 'Security interview rounds specifically test if candidates know why localStorage is vulnerable to XSS.',
          keyExercise: 'Audit a web form for dangerouslySetInnerHTML risks and implement sanitized DOMPurify pipelines.'
        },
        {
          day: 6,
          title: 'Day 6 · Frontend System Design: Design Google Docs or Netflix Web',
          goal: 'Design end-to-end client architecture: pagination, infinite scroll virtualization, WebSocket sync, and offline cache.',
          duration: '50 mins',
          difficulty: 'Advanced',
          xp: 300,
          why: 'Standard Round 2 or Round 3 interview for top tier tech firms. Evaluates state layout and network caching.',
          keyExercise: 'Draw the component hierarchy, data fetching layer, and virtualized list buffer for a feed of 100,000 items.'
        },
        {
          day: 7,
          title: 'Day 7 · Hard Live Technical Simulation & Whiteboard Defense',
          goal: 'Defend architectural trade-offs: SSR vs CSR vs SSG, and execute a live coding problem under time pressure.',
          duration: '40 mins',
          difficulty: 'Advanced',
          xp: 300,
          why: 'Prepares you for the final hiring committee review with polished, confident articulation.',
          keyExercise: 'Deliver a structured 3-minute oral defense of Server-Driven UI versus Client Component trees.'
        }
      ]
    }
  },

  // ========================================================================
  // 2. BACKEND DEVELOPER
  // ========================================================================
  'Backend Developer': {
    foundations: {
      trackName: 'Foundations Track',
      trackTier: 'Beginner to Intermediate',
      badgeColor: '#f59e0b',
      summary: 'Focused on HTTP methods, simple REST endpoints, basic SQL queries, and error handling.',
      description: 'Your diagnostic assessment showed gaps in core backend fundamentals. Follow this structured roadmap to master the essentials.',
      days: [
        {
          day: 1,
          title: 'Day 1 · HTTP Verbs, Status Codes & Request Lifecycles',
          goal: 'Understand GET, POST, PUT, DELETE, and status codes (200, 201, 400, 401, 403, 404, 500).',
          duration: '30 mins',
          difficulty: 'Beginner',
          xp: 150,
          why: 'The first technical question in every backend interview tests correct status code usage.',
          keyExercise: 'Write down the correct HTTP verb and status code for creating a user, finding no record, and invalid inputs.'
        },
        {
          day: 2,
          title: 'Day 2 · Building Your First REST Endpoint with Express/Node',
          goal: 'Create a route with route parameters (:id), query strings, and JSON body parsing.',
          duration: '35 mins',
          difficulty: 'Beginner',
          xp: 160,
          why: 'Core practical skill required for all web development internship and junior roles.',
          keyExercise: 'Build a simple in-memory CRUD server for books with GET /books and POST /books endpoints.'
        },
        {
          day: 3,
          title: 'Day 3 · Relational SQL Basics: SELECT, WHERE & JOINs',
          goal: 'Master INNER JOIN, LEFT JOIN, foreign keys, and primary keys on normalized tables.',
          duration: '35 mins',
          difficulty: 'Beginner',
          xp: 180,
          why: 'SQL joins are evaluated in every backend interview to see if you can retrieve connected records.',
          keyExercise: 'Write an INNER JOIN query connecting Users and Orders tables to find total spent per customer.'
        },
        {
          day: 4,
          title: 'Day 4 · Input Validation & Centralized Error Middleware',
          goal: 'Validate incoming request payloads and catch unhandled promise rejections cleanly.',
          duration: '30 mins',
          difficulty: 'Beginner',
          xp: 180,
          why: 'Production backends must never crash or leak raw stack traces to the public.',
          keyExercise: 'Implement a validation middleware that rejects missing email or password before reaching controllers.'
        },
        {
          day: 5,
          title: 'Day 5 · Database Indexing in Plain English',
          goal: 'Understand why a database index speeds up SELECT WHERE email = ? from O(N) to O(log N).',
          duration: '35 mins',
          difficulty: 'Beginner',
          xp: 200,
          why: 'Interviewers always ask: what is the cost of adding an index to every column?',
          keyExercise: 'Explain the trade-off between faster reads and slower INSERT/UPDATE statements.'
        },
        {
          day: 6,
          title: 'Day 6 · Password Hashing & JWT Authentication Basics',
          goal: 'Learn why passwords must be salted and hashed with bcrypt or PBKDF2 instead of plain MD5.',
          duration: '35 mins',
          difficulty: 'Beginner',
          xp: 200,
          why: 'Security round question: how do you safely store credentials and verify tokens?',
          keyExercise: 'Write a signup controller that hashes password with bcrypt salt before storing in database.'
        },
        {
          day: 7,
          title: 'Day 7 · 60-Second Backend Interview Drill',
          goal: 'Practice speaking aloud: (1) REST vs RPC, (2) SQL vs NoSQL, and (3) Indexing mechanics.',
          duration: '25 mins',
          difficulty: 'Beginner',
          xp: 250,
          why: 'Converts technical understanding into fluent interview presentation.',
          keyExercise: 'Record a concise 60-second answer explaining what happens when a client sends a POST request.'
        }
      ]
    },
    advanced: {
      trackName: 'Advanced Mastery Track',
      trackTier: 'Senior & Distributed Systems',
      badgeColor: '#10b981',
      summary: 'Focuses on distributed caching, B+Tree internals, rate limiting, event queues, and high-concurrency database isolation.',
      description: 'You demonstrated strong backend knowledge! Tackle these enhanced distributed systems tasks.',
      days: [
        {
          day: 1,
          title: 'Day 1 · Database Internals: B+Trees & Write-Ahead Logs (WAL)',
          goal: 'Analyze storage engine disk pages, pointer lookups, and crash recovery via write-ahead logging.',
          duration: '45 mins',
          difficulty: 'Advanced',
          xp: 250,
          why: 'Essential for high-paying product firms (Uber, Amazon, Stripe) that test storage fundamentals.',
          keyExercise: 'Analyze a SQL EXPLAIN ANALYZE plan comparing index seek vs sequential table scan.'
        },
        {
          day: 2,
          title: 'Day 2 · Distributed Caching Patterns: Cache-Aside & Stampede Defense',
          goal: 'Implement Cache-Aside with Redis, TTL jitter, and mutex locks to prevent cache stampedes.',
          duration: '40 mins',
          difficulty: 'Advanced',
          xp: 250,
          why: 'Standard system design question: how do you serve 100,000 queries per second without overloading SQL?',
          keyExercise: 'Write a Redis caching layer with fallback locks for a hot trending article.'
        },
        {
          day: 3,
          title: 'Day 3 · Database Concurrency: ACID Isolation Levels & Deadlocks',
          goal: 'Understand Dirty Reads, Non-Repeatable Reads, Phantom Reads, and Pessimistic vs Optimistic Locking.',
          duration: '45 mins',
          difficulty: 'Advanced',
          xp: 260,
          why: 'Critical for fintech and e-commerce interviews where double-spending or stock over-allocation is fatal.',
          keyExercise: 'Implement optimistic concurrency control using a version column on an inventory checkout query.'
        },
        {
          day: 4,
          title: 'Day 4 · Asynchronous Message Queues & Event-Driven Architecture',
          goal: 'Decouple long-running tasks using RabbitMQ or Kafka with at-least-once delivery guarantees.',
          duration: '40 mins',
          difficulty: 'Advanced',
          xp: 260,
          why: 'Evaluates your ability to design resilient, non-blocking background workers.',
          keyExercise: 'Design an idempotent payment webhook listener that rejects duplicate transaction IDs.'
        },
        {
          day: 5,
          title: 'Day 5 · API Rate Limiting Algorithms: Token Bucket & Leaky Bucket',
          goal: 'Implement a Token Bucket algorithm in Redis to protect endpoints against brute-force DDoS.',
          duration: '40 mins',
          difficulty: 'Advanced',
          xp: 250,
          why: 'Frequently tested in both coding interviews and system design architecture rounds.',
          keyExercise: 'Write a rate limiter middleware limiting each IP address to 100 requests per minute.'
        },
        {
          day: 6,
          title: 'Day 6 · System Design: Design a Scalable URL Shortener (TinyURL)',
          goal: 'Design data model, base62 encoding vs MD5 hashing, caching strategy, and database sharding.',
          duration: '50 mins',
          difficulty: 'Advanced',
          xp: 300,
          why: 'The quintessential system design benchmark question for backend software engineering interviews.',
          keyExercise: 'Estimate QPS, storage requirements for 5 years, and diagram cache-aside lookup architecture.'
        },
        {
          day: 7,
          title: 'Day 7 · Distributed Transactions & Mock Architectural Defense',
          goal: 'Explain the 2-Phase Commit (2PC) vs Saga pattern out loud and defend your design trade-offs.',
          duration: '40 mins',
          difficulty: 'Advanced',
          xp: 300,
          why: 'Prepares you to articulate complex technical trade-offs with calmness and executive presence.',
          keyExercise: 'Conduct a 15-minute simulated system design interview defending your microservice boundaries.'
        }
      ]
    }
  },

  // ========================================================================
  // 3. SOFTWARE DEVELOPER (DSA & Core CS)
  // ========================================================================
  'Software Developer': {
    foundations: {
      trackName: 'Foundations Track',
      trackTier: 'Beginner to Intermediate',
      badgeColor: '#f59e0b',
      summary: 'Focuses on Two Pointers, Array traversals, Hash Tables, basic recursion, and OOP principles.',
      description: 'Strengthen your core DSA and problem-solving baseline with these foundational daily exercises.',
      days: [
        {
          day: 1,
          title: 'Day 1 · Two-Pointer Traversal & Array Reversal',
          goal: 'Master two pointers starting from opposite ends to replace O(N²) nested loops with O(N).',
          duration: '30 mins',
          difficulty: 'Beginner',
          xp: 150,
          why: 'Tested in 85% of software developer screening rounds.',
          keyExercise: 'Solve Two Sum II (Sorted Array) and Valid Palindrome.'
        },
        {
          day: 2,
          title: 'Day 2 · Hash Maps for O(1) Lookups',
          goal: 'Trade memory for time by checking complements in constant time.',
          duration: '35 mins',
          difficulty: 'Beginner',
          xp: 160,
          why: 'Turns slow quadratic searches into efficient single-pass algorithms.',
          keyExercise: 'Solve Two Sum (Unsorted) and Contains Duplicate using a Set/Map.'
        },
        {
          day: 3,
          title: 'Day 3 · Sliding Window for Subarrays & Substrings',
          goal: 'Expand and contract window boundaries to find maximum sums and longest substrings.',
          duration: '35 mins',
          difficulty: 'Beginner',
          xp: 180,
          why: 'Essential pattern for array and string technical rounds.',
          keyExercise: 'Solve Maximum Subarray of Size K and Longest Substring Without Repeating Characters.'
        },
        {
          day: 4,
          title: 'Day 4 · Binary Search Loop Invariants',
          goal: 'Master low <= high boundary conditions and mid calculation to avoid overflow.',
          duration: '30 mins',
          difficulty: 'Beginner',
          xp: 180,
          why: 'Interviewers test if you avoid infinite loops and boundary bugs.',
          keyExercise: 'Implement Binary Search on a rotated sorted array.'
        },
        {
          day: 5,
          title: 'Day 5 · Recursion Call Stacks & Base Cases',
          goal: 'Visualize how function frames are pushed and popped on the call stack.',
          duration: '35 mins',
          difficulty: 'Beginner',
          xp: 200,
          why: 'Recursion is the absolute prerequisite for tree and graph traversals.',
          keyExercise: 'Write recursive functions for factorial and climbing stairs with memoization.'
        },
        {
          day: 6,
          title: 'Day 6 · Binary Tree DFS: Preorder, Inorder & Postorder',
          goal: 'Traverse binary trees recursively and calculate maximum tree depth.',
          duration: '35 mins',
          difficulty: 'Beginner',
          xp: 200,
          why: 'Tree questions are standard in Round 1 software engineering interviews.',
          keyExercise: 'Solve Maximum Depth of Binary Tree and Invert Binary Tree.'
        },
        {
          day: 7,
          title: 'Day 7 · 60-Second Time & Space Complexity Articulation',
          goal: 'Practice explaining Big-O trade-offs out loud to an interviewer clearly.',
          duration: '25 mins',
          difficulty: 'Beginner',
          xp: 250,
          why: 'Demonstrates communication confidence during live whiteboard coding.',
          keyExercise: 'Articulate the exact time and space complexity of MergeSort vs QuickSort.'
        }
      ]
    },
    advanced: {
      trackName: 'Advanced Mastery Track',
      trackTier: 'Senior & Competitive Coding',
      badgeColor: '#10b981',
      summary: 'Focuses on Dynamic Programming, Graph Dijkstra/Topological Sort, Bit Manipulation, and Concurrency.',
      description: 'You demonstrated strong algorithmic fundamentals! Tackle these enhanced competitive and system challenges.',
      days: [
        {
          day: 1,
          title: 'Day 1 · Dynamic Programming: 1D & 2D Memoization',
          goal: 'Identify overlapping subproblems, define state transitions, and convert recursion to iterative DP.',
          duration: '45 mins',
          difficulty: 'Advanced',
          xp: 260,
          why: 'Top tech firms use DP questions to assess structured mathematical deduction.',
          keyExercise: 'Solve Coin Change and Longest Increasing Subsequence (LIS) in O(N log N).'
        },
        {
          day: 2,
          title: 'Day 2 · Graph Algorithms: Dijkstra & Topological Sort (Kahn’s Algorithm)',
          goal: 'Find shortest paths with weighted priority queues and detect cycles in DAG dependency graphs.',
          duration: '45 mins',
          difficulty: 'Advanced',
          xp: 260,
          why: 'Directly mirrors real-world build systems and package dependency resolution.',
          keyExercise: 'Solve Course Schedule II and Network Delay Time.'
        },
        {
          day: 3,
          title: 'Day 3 · Monotonic Stack & Sliding Window Deque',
          goal: 'Maintain strictly decreasing/increasing stacks to solve Next Greater Element in O(N).',
          duration: '40 mins',
          difficulty: 'Advanced',
          xp: 250,
          why: 'Distinguishes top 5% candidates from average applicants in technical rounds.',
          keyExercise: 'Solve Daily Temperatures and Trapping Rain Water using a Monotonic Stack.'
        },
        {
          day: 4,
          title: 'Day 4 · Trie (Prefix Tree) & Bit Manipulation Tricks',
          goal: 'Implement prefix search and XOR operations (finding the single non-duplicate number in O(1) space).',
          duration: '40 mins',
          difficulty: 'Advanced',
          xp: 250,
          why: 'Common in search autocomplete and low-level systems programming assessments.',
          keyExercise: 'Implement Trie with insert(), search(), and startsWith() methods.'
        },
        {
          day: 5,
          title: 'Day 5 · Multi-threading, Locks & Producer-Consumer Queues',
          goal: 'Understand race conditions, mutex locks, semaphores, and thread-safe data structures.',
          duration: '45 mins',
          difficulty: 'Advanced',
          xp: 260,
          why: 'Crucial for high-concurrency systems, operating systems, and core backend roles.',
          keyExercise: 'Implement a thread-safe bounded blocking queue using condition variables.'
        },
        {
          day: 6,
          title: 'Day 6 · System Architecture & LFU Cache Design',
          goal: 'Design a Least Frequently Used (LFU) cache with O(1) get() and put() using Doubly Linked Lists & Hash Maps.',
          duration: '50 mins',
          difficulty: 'Advanced',
          xp: 300,
          why: 'Hardest standard data structure design question asked in Google/Meta technical interviews.',
          keyExercise: 'Implement LFU Cache with O(1) frequency bucket management.'
        },
        {
          day: 7,
          title: 'Day 7 · Live Mock Coding Simulation with Tough Edge Cases',
          goal: 'Solve a Hard LeetCode problem live while articulating edge cases (null inputs, integer overflows, duplicates).',
          duration: '45 mins',
          difficulty: 'Advanced',
          xp: 300,
          why: 'Prepares you for the intensity and mental endurance of live engineering screening rounds.',
          keyExercise: 'Complete a timed 45-minute live interview simulation on Alien Dictionary.'
        }
      ]
    }
  },

  // ========================================================================
  // 4. FULL STACK DEVELOPER
  // ========================================================================
  'Full Stack Developer': {
    foundations: {
      trackName: 'Foundations Track',
      trackTier: 'Beginner to Intermediate',
      badgeColor: '#f59e0b',
      summary: 'Focuses on client-server request flows, basic REST APIs, database schemas, and simple full stack deployment.',
      description: 'Build your end-to-end full stack foundation step-by-step with these essential daily tasks.',
      days: [
        {
          day: 1,
          title: 'Day 1 · Client-Server Model & HTTP Networking',
          goal: 'Understand how a React frontend makes HTTP fetch requests to a Node.js backend.',
          duration: '30 mins',
          difficulty: 'Beginner',
          xp: 150,
          why: 'Fundamental architecture concept evaluated in every full stack screening interview.',
          keyExercise: 'Trace an HTTP GET request from browser URL bar to DNS, server port, and JSON response.'
        },
        {
          day: 2,
          title: 'Day 2 · Building Clean RESTful Endpoints',
          goal: 'Create an Express backend supporting GET, POST, PUT, DELETE with JSON payloads.',
          duration: '35 mins',
          difficulty: 'Beginner',
          xp: 160,
          why: 'Core building block for modern web application and microservice development.',
          keyExercise: 'Build a task management backend with route parameters and body parsing.'
        },
        {
          day: 3,
          title: 'Day 3 · Database Schema Design & Normalization',
          goal: 'Design relational tables with foreign keys and eliminate duplicate data.',
          duration: '35 mins',
          difficulty: 'Beginner',
          xp: 180,
          why: 'Interviewers test if you can structure entities cleanly before writing queries.',
          keyExercise: 'Design an e-commerce schema with Users, Products, and OrderItems tables.'
        },
        {
          day: 4,
          title: 'Day 4 · Connecting Frontend UI to Backend APIs',
          goal: 'Use useEffect to fetch backend data, handle loading spinners, and render items dynamically.',
          duration: '35 mins',
          difficulty: 'Beginner',
          xp: 180,
          why: 'The primary day-to-day task of any full stack software engineer.',
          keyExercise: 'Connect your React task list to your Express backend with CORS enabled.'
        },
        {
          day: 5,
          title: 'Day 5 · User Authentication & Protected Routes',
          goal: 'Implement token-based login, save JWT in memory, and restrict private pages.',
          duration: '40 mins',
          difficulty: 'Beginner',
          xp: 200,
          why: 'Every commercial product requires secure user authentication and permissions.',
          keyExercise: 'Create a login form that stores user session and hides the dashboard until authenticated.'
        },
        {
          day: 6,
          title: 'Day 6 · Full Stack Form Validation & Error Handling',
          goal: 'Validate inputs on client for fast UX, and re-validate on server for bulletproof security.',
          duration: '35 mins',
          difficulty: 'Beginner',
          xp: 200,
          why: 'Never trust client-side validation alone; secure backends must validate all incoming data.',
          keyExercise: 'Add email regex and password length validation on both frontend and backend.'
        },
        {
          day: 7,
          title: 'Day 7 · 60-Second Full Stack Architecture Articulation',
          goal: 'Practice explaining: (1) CORS errors, (2) State Management, and (3) API security.',
          duration: '25 mins',
          difficulty: 'Beginner',
          xp: 250,
          why: 'Prepares you to explain complete full stack systems clearly in placement interviews.',
          keyExercise: 'Record a 60-second explanation of what happens when a user clicks "Checkout" in a web app.'
        }
      ]
    },
    advanced: {
      trackName: 'Advanced Mastery Track',
      trackTier: 'Senior Full Stack & Architecture',
      badgeColor: '#10b981',
      summary: 'Focuses on Server-Side Rendering (SSR), WebSocket real-time pipelines, database connection pools, and containerized CI/CD.',
      description: 'You passed the diagnostic test with flying colors! Advance to enhanced production-grade full stack challenges.',
      days: [
        {
          day: 1,
          title: 'Day 1 · Next.js Server Components vs Client Components',
          goal: 'Optimize initial page loads using React Server Components (RSC) and streaming HTML.',
          duration: '45 mins',
          difficulty: 'Advanced',
          xp: 250,
          why: 'Modern full stack roles heavily demand Next.js and server-side rendering proficiency.',
          keyExercise: 'Build an SSR dashboard fetching database data directly on server without client waterfalls.'
        },
        {
          day: 2,
          title: 'Day 2 · Real-Time Bi-Directional WebSockets & Event Sync',
          goal: 'Implement Socket.io or native WebSockets with heartbeat reconnects and room subscriptions.',
          duration: '45 mins',
          difficulty: 'Advanced',
          xp: 260,
          why: 'Essential for collaborative apps like Figma, Slack, or real-time trading dashboards.',
          keyExercise: 'Build a live notification feed that broadcasts alerts across multiple active browser tabs.'
        },
        {
          day: 3,
          title: 'Day 3 · Database Connection Pooling & Query Optimization',
          goal: 'Configure database connection pools, eliminate N+1 query problems, and add composite indexes.',
          duration: '40 mins',
          difficulty: 'Advanced',
          xp: 250,
          why: 'Interviewers look for candidates who know how to prevent database crashes under traffic spikes.',
          keyExercise: 'Refactor a slow loop querying items in N database trips into a single batched SQL query.'
        },
        {
          day: 4,
          title: 'Day 4 · Distributed Caching & Session Storage with Redis',
          goal: 'Store session states and cached API responses in a shared Redis cluster.',
          duration: '40 mins',
          difficulty: 'Advanced',
          xp: 250,
          why: 'Ensures horizontal scalability when running multiple instances of your Node.js server.',
          keyExercise: 'Implement Redis session storage for a load-balanced multi-instance backend.'
        },
        {
          day: 5,
          title: 'Day 5 · Dockerizing Full Stack Apps & Multi-Stage Builds',
          goal: 'Write optimized Dockerfiles with multi-stage builds to produce tiny production containers (<100MB).',
          duration: '40 mins',
          difficulty: 'Advanced',
          xp: 260,
          why: 'Standard DevOps requirement for senior full stack developers deploying to cloud clusters.',
          keyExercise: 'Containerize a React + Node + PostgreSQL application with Docker Compose.'
        },
        {
          day: 6,
          title: 'Day 6 · Full Stack System Design: Design an E-Commerce Platform',
          goal: 'Architect frontend checkout, payment webhook handlers, inventory locks, and read replicas.',
          duration: '50 mins',
          difficulty: 'Advanced',
          xp: 300,
          why: 'Evaluates your holistic understanding of scaling both frontend UX and backend consistency.',
          keyExercise: 'Diagram the architecture handling high-traffic Flash Sales with queue rate-limiting.'
        },
        {
          day: 7,
          title: 'Day 7 · Full Stack Mock Interview & Trade-Off Defense',
          goal: 'Defend SQL vs NoSQL, Monolith vs Microservices, and perform live full stack debugging.',
          duration: '45 mins',
          difficulty: 'Advanced',
          xp: 300,
          why: 'Prepares you for the comprehensive full-day technical rounds at top product companies.',
          keyExercise: 'Conduct a simulated 30-minute full stack architecture review with real-world edge cases.'
        }
      ]
    }
  },

  // ========================================================================
  // 5. AI/ML ENGINEER
  // ========================================================================
  'AI/ML Engineer': {
    foundations: {
      trackName: 'Foundations Track',
      trackTier: 'Beginner to Intermediate',
      badgeColor: '#f59e0b',
      summary: 'Focuses on Python fundamentals, NumPy vectorization, train/test splitting, and linear models.',
      description: 'Build your machine learning and AI foundations from the ground up with these daily missions.',
      days: [
        {
          day: 1,
          title: 'Day 1 · Python for AI: List Comprehensions & NumPy Vectors',
          goal: 'Master NumPy ndarrays, broadcasting, dot products, and vectorized operations without slow loops.',
          duration: '30 mins',
          difficulty: 'Beginner',
          xp: 150,
          why: 'Vectorized operations are the mathematical bedrock of all neural networks.',
          keyExercise: 'Compute Euclidean distance and matrix multiplication using NumPy vectorization.'
        },
        {
          day: 2,
          title: 'Day 2 · Data Preprocessing with Pandas & Handling Missing Values',
          goal: 'Clean raw tabular datasets, handle nulls, and encode categorical variables with One-Hot encoding.',
          duration: '35 mins',
          difficulty: 'Beginner',
          xp: 160,
          why: '80% of machine learning engineering in industry involves data preparation and cleaning.',
          keyExercise: 'Clean a customer churn dataset and normalize numeric columns using StandardScaler.'
        },
        {
          day: 3,
          title: 'Day 3 · Linear Regression & Gradient Descent Intuition',
          goal: 'Understand mean squared error (MSE), learning rates, and gradient descent optimization.',
          duration: '35 mins',
          difficulty: 'Beginner',
          xp: 180,
          why: 'Gradient descent is the optimization engine powering both linear models and deep neural networks.',
          keyExercise: 'Implement a simple linear regression model using scikit-learn and plot residuals.'
        },
        {
          day: 4,
          title: 'Day 4 · Classification & Logistic Regression',
          goal: 'Understand sigmoid activation, binary cross-entropy, and probability thresholds.',
          duration: '35 mins',
          difficulty: 'Beginner',
          xp: 180,
          why: 'Standard interview question: why use logistic regression instead of linear regression for labels?',
          keyExercise: 'Train a binary classification model and evaluate accuracy on test data.'
        },
        {
          day: 5,
          title: 'Day 5 · Overfitting, Regularization & Train/Test Splits',
          goal: 'Prevent model memorization using L1 (Lasso), L2 (Ridge) penalties, and cross-validation.',
          duration: '35 mins',
          difficulty: 'Beginner',
          xp: 200,
          why: 'Interviewers look for candidates who know how to detect high variance vs high bias.',
          keyExercise: 'Compare train vs validation loss curves to identify the exact point of overfitting.'
        },
        {
          day: 6,
          title: 'Day 6 · Model Evaluation: Precision, Recall & F1-Score',
          goal: 'Understand why accuracy is misleading for imbalanced datasets and master confusion matrices.',
          duration: '35 mins',
          difficulty: 'Beginner',
          xp: 200,
          why: 'Guaranteed question in every data science and AI screening round.',
          keyExercise: 'Calculate precision, recall, and ROC-AUC for a fraud detection scenario with 99% negative cases.'
        },
        {
          day: 7,
          title: 'Day 7 · 60-Second Machine Learning Concepts Articulation',
          goal: 'Practice explaining: (1) Bias-Variance Tradeoff, (2) Gradient Descent, and (3) Precision vs Recall.',
          duration: '25 mins',
          difficulty: 'Beginner',
          xp: 250,
          why: 'Prepares you to explain machine learning theory clearly without relying on slides.',
          keyExercise: 'Record a 60-second explanation of why a model might have high accuracy but zero recall.'
        }
      ]
    },
    advanced: {
      trackName: 'Advanced Mastery Track',
      trackTier: 'Senior AI & LLM Systems',
      badgeColor: '#10b981',
      summary: 'Focuses on Transformer architectures, vector embeddings, RAG pipelines, model quantization, and low-latency API serving.',
      description: 'You scored high on the diagnostic test! Step up to enhanced generative AI and deep learning challenges.',
      days: [
        {
          day: 1,
          title: 'Day 1 · Transformer Attention Mechanisms & Self-Attention Math',
          goal: 'Understand Scaled Dot-Product Attention: Q, K, V matrix multiplications and softmax scaling.',
          duration: '45 mins',
          difficulty: 'Advanced',
          xp: 260,
          why: 'The core architecture underlying modern LLMs (Gemini, GPT) and vision transformers.',
          keyExercise: 'Write out the mathematical self-attention formula and explain why scaling by sqrt(d_k) is required.'
        },
        {
          day: 2,
          title: 'Day 2 · Vector Embeddings & Vector Databases (Pinecone/Chroma)',
          goal: 'Generate dense text embeddings and query top-k similar documents using cosine similarity and HNSW index.',
          duration: '45 mins',
          difficulty: 'Advanced',
          xp: 260,
          why: 'Fundamental skill for building Retrieval-Augmented Generation (RAG) and semantic search engines.',
          keyExercise: 'Implement a semantic document retrieval pipeline with chunking and cosine similarity.'
        },
        {
          day: 3,
          title: 'Day 3 · Building an End-to-End RAG System with Gemini API',
          goal: 'Design a retrieval pipeline with context injection, system instructions, and hallucination guardrails.',
          duration: '45 mins',
          difficulty: 'Advanced',
          xp: 260,
          why: 'The most requested applied generative AI feature across modern tech companies today.',
          keyExercise: 'Build a document Q&A assistant that grounds replies strictly in provided reference chunks.'
        },
        {
          day: 4,
          title: 'Day 4 · Fine-Tuning LLMs: LoRA & QLoRA Techniques',
          goal: 'Understand Parameter-Efficient Fine-Tuning (PEFT) and low-rank adapter decomposition.',
          duration: '40 mins',
          difficulty: 'Advanced',
          xp: 250,
          why: 'Shows you know how to adapt large models without spending millions on full parameter retraining.',
          keyExercise: 'Explain the difference between Prompt Engineering, RAG, and LoRA Fine-Tuning.'
        },
        {
          day: 5,
          title: 'Day 5 · Model Deployment & Inference Optimization (vLLM / ONNX)',
          goal: 'Optimize inference latency using token streaming, KV-caching, and 8-bit/4-bit quantization.',
          duration: '40 mins',
          difficulty: 'Advanced',
          xp: 260,
          why: 'Interviewers look for engineers who can serve AI models efficiently within production GPU budgets.',
          keyExercise: 'Measure latency improvement and memory footprint reduction after quantizing a model.'
        },
        {
          day: 6,
          title: 'Day 6 · AI System Design: Design a Real-Time Recommendation Engine',
          goal: 'Architect candidate generation (collaborative filtering), ranking (deep neural net), and real-time reranking.',
          duration: '50 mins',
          difficulty: 'Advanced',
          xp: 300,
          why: 'Standard machine learning system design interview for Netflix, Spotify, and Amazon.',
          keyExercise: 'Diagram the two-stage recommendation pipeline handling 50 million active users.'
        },
        {
          day: 7,
          title: 'Day 7 · Generative AI Mock Technical Interview',
          goal: 'Deliver a structured oral defense on evaluating LLMs with ROUGE, BLEU, and human-in-the-loop benchmarks.',
          duration: '45 mins',
          difficulty: 'Advanced',
          xp: 300,
          why: 'Prepares you for senior AI research and applied machine learning interview rounds.',
          keyExercise: 'Conduct a simulated 20-minute defense of temperature sampling and context window management.'
        }
      ]
    }
  },

  // ========================================================================
  // 6. DATA ENGINEER
  // ========================================================================
  'Data Engineer': {
    foundations: {
      trackName: 'Foundations Track',
      trackTier: 'Beginner to Intermediate',
      badgeColor: '#f59e0b',
      summary: 'Focuses on SQL queries, window functions, basic ETL pipelines, and CSV/JSON ingestion.',
      description: 'Strengthen your core data engineering baseline with these step-by-step daily exercises.',
      days: [
        {
          day: 1,
          title: 'Day 1 · Advanced SQL Joins & Aggregate Functions',
          goal: 'Master GROUP BY, HAVING, COUNT, SUM, and multi-table joins.',
          duration: '30 mins',
          difficulty: 'Beginner',
          xp: 150,
          why: 'Essential for all data analyst and data engineering technical screenings.',
          keyExercise: 'Write queries calculating monthly sales totals and customer retention groups.'
        },
        {
          day: 2,
          title: 'Day 2 · SQL Window Functions: ROW_NUMBER & RANK',
          goal: 'Understand OVER (PARTITION BY ... ORDER BY ...) to compute running totals and rankings.',
          duration: '35 mins',
          difficulty: 'Beginner',
          xp: 160,
          why: 'Tested in 90% of data interviews to separate beginners from competent engineers.',
          keyExercise: 'Find the top 3 highest-spending transactions per department using ROW_NUMBER().'
        },
        {
          day: 3,
          title: 'Day 3 · Building a Simple Python ETL Pipeline',
          goal: 'Extract data from CSV, transform column formats, and load into a clean database.',
          duration: '35 mins',
          difficulty: 'Beginner',
          xp: 180,
          why: 'The core practical responsibility of any junior data engineer.',
          keyExercise: 'Write a Python script that sanitizes dirty dates and strips whitespace from raw customer data.'
        },
        {
          day: 4,
          title: 'Day 4 · Data Warehousing: Star Schema vs Snowflake Schema',
          goal: 'Understand Fact tables versus Dimension tables and why denormalization speeds up BI queries.',
          duration: '30 mins',
          difficulty: 'Beginner',
          xp: 180,
          why: 'Standard conceptual question in data warehouse and business intelligence interviews.',
          keyExercise: 'Draw a Star Schema for an e-commerce platform with FactSales and DimCustomer/DimProduct.'
        },
        {
          day: 5,
          title: 'Day 5 · Database Partitioning & Sharding Basics',
          goal: 'Understand how table partitioning by date reduces scan costs and accelerates queries.',
          duration: '35 mins',
          difficulty: 'Beginner',
          xp: 200,
          why: 'Critical for cloud query cost optimization on BigQuery or Snowflake.',
          keyExercise: 'Explain the difference between horizontal table partitioning and vertical column sharding.'
        },
        {
          day: 6,
          title: 'Day 6 · Batch vs Stream Processing Fundamentals',
          goal: 'Differentiate scheduled daily batch jobs from real-time stream processing.',
          duration: '35 mins',
          difficulty: 'Beginner',
          xp: 200,
          why: 'Evaluates if you can recommend the right architecture for different business latency needs.',
          keyExercise: 'Classify 5 business use cases (e.g. payroll vs fraud detection) into batch vs stream processing.'
        },
        {
          day: 7,
          title: 'Day 7 · 60-Second Data Pipeline Articulation',
          goal: 'Practice explaining: (1) Data Lake vs Data Warehouse, (2) Window Functions, and (3) ETL vs ELT.',
          duration: '25 mins',
          difficulty: 'Beginner',
          xp: 250,
          why: 'Converts technical data processing skills into fluent interview delivery.',
          keyExercise: 'Deliver a 60-second summary explaining why modern companies prefer ELT over ETL.'
        }
      ]
    },
    advanced: {
      trackName: 'Advanced Mastery Track',
      trackTier: 'Senior Data Architect',
      badgeColor: '#10b981',
      summary: 'Focuses on Apache Spark distributed computing, Kafka streaming, Iceberg lakehouse architectures, and DAG orchestration.',
      description: 'You scored high on the diagnostic test! Tackle these enhanced big data and distributed pipeline challenges.',
      days: [
        {
          day: 1,
          title: 'Day 1 · Apache Spark: Resilient Distributed Datasets (RDD) & DataFrames',
          goal: 'Understand lazy evaluation, DAG execution plans, and memory partition shuffling.',
          duration: '45 mins',
          difficulty: 'Advanced',
          xp: 260,
          why: 'The gold standard distributed computing framework asked in big tech data interviews.',
          keyExercise: 'Write a PySpark script optimizing broad transformations to prevent data skew.'
        },
        {
          day: 2,
          title: 'Day 2 · Apache Kafka & Real-Time Stream Ingestion',
          goal: 'Configure Kafka topics, partitions, consumer groups, and offset commit semantics.',
          duration: '45 mins',
          difficulty: 'Advanced',
          xp: 260,
          why: 'Evaluates your ability to build fault-tolerant event streams handling millions of events/sec.',
          keyExercise: 'Design an at-least-once message processing pipeline with dead letter queues.'
        },
        {
          day: 3,
          title: 'Day 3 · Lakehouse Architecture: Apache Iceberg & Delta Lake',
          goal: 'Implement ACID transactions, time travel queries, and schema evolution on object storage.',
          duration: '40 mins',
          difficulty: 'Advanced',
          xp: 250,
          why: 'The modern standard replacing slow traditional Hive tables across cloud data platforms.',
          keyExercise: 'Execute a time-travel query restoring a table to a snapshot before a corrupted batch load.'
        },
        {
          day: 4,
          title: 'Day 4 · Workflow Orchestration: Apache Airflow DAG Authoring',
          goal: 'Write idempotent Airflow DAGs with retries, SLA alerts, and dynamic task mapping.',
          duration: '40 mins',
          difficulty: 'Advanced',
          xp: 250,
          why: 'Standard tool used across the industry to orchestrate complex dependencies.',
          keyExercise: 'Author an Airflow DAG with branching logic that only triggers reports on successful ingestion.'
        },
        {
          day: 5,
          title: 'Day 5 · Data Quality, Lineage & Great Expectations',
          goal: 'Automate schema validation, null checks, and anomaly detection in production data pipelines.',
          duration: '40 mins',
          difficulty: 'Advanced',
          xp: 260,
          why: 'Shows hiring managers that you care about data integrity and prevention of silent corruption.',
          keyExercise: 'Write automated test assertions validating that ID columns contain zero duplicates.'
        },
        {
          day: 6,
          title: 'Day 6 · Big Data System Design: Design a Real-Time Metrics Pipeline',
          goal: 'Architect ingestion (Kafka), stream processing (Flink), analytical storage (ClickHouse), and dashboards.',
          duration: '50 mins',
          difficulty: 'Advanced',
          xp: 300,
          why: 'Comprehensive data engineering system design round testing end-to-end distributed systems.',
          keyExercise: 'Diagram the architecture handling 1 billion telemetry events per day with <2 second latency.'
        },
        {
          day: 7,
          title: 'Day 7 · Data Architecture Defense & Mock Placement Interview',
          goal: 'Defend batch vs stream trade-offs, explain CAP theorem, and resolve simulated pipeline outages.',
          duration: '45 mins',
          difficulty: 'Advanced',
          xp: 300,
          why: 'Prepares you for the final technical rounds at top data-driven companies.',
          keyExercise: 'Conduct a simulated 20-minute root cause analysis of a pipeline bottleneck under pressure.'
        }
      ]
    }
  }
};

/**
 * Returns the adaptive task plan based on role and diagnostic score.
 */
export function getAdaptiveTasksForRole(roleTitle, scorePercent = 50) {
  const roleData = ADAPTIVE_TRACKS[roleTitle] || ADAPTIVE_TRACKS['Software Developer'];
  const isHighScorer = scorePercent >= 75;

  return {
    roleTitle,
    scorePercent,
    isHighScorer,
    activeTrack: isHighScorer ? roleData.advanced : roleData.foundations
  };
}
