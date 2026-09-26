// ==========================================================================
// SkillTree.AI - Role-Specific Diagnostic Assessments & Learning Recommendations
// ==========================================================================

export const SECTOR_ASSESSMENTS = {
  // 1. Software Developer
  'Software Developer': {
    roleId: 'software_developer',
    roleTitle: 'Software Developer',
    sectorName: 'Core Software Engineering',
    description: 'Tests fundamental Computer Science concepts: Data Structures, Algorithms, Time Complexity, and Object-Oriented Programming.',
    questions: [
      {
        id: 'sd_q1',
        topic: 'Time Complexity',
        question: 'What is the time complexity of searching for an element in a sorted array using Binary Search?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N²)'],
        correctIndex: 1,
        explanation: 'Binary Search halves the search space in every iteration, achieving O(log N) logarithmic time.',
        basicToLearn: {
          concept: 'Logarithmic Time Complexity & Divide and Conquer',
          importance: 'Essential for all technical screening rounds to avoid slow O(N) linear scans.',
          keyRule: 'Whenever data is sorted, always consider Binary Search (O(log N)) before linear search (O(N)).',
          action: 'Practice binary search loop invariants (low <= high, mid = low + (high - low)/2).'
        }
      },
      {
        id: 'sd_q2',
        topic: 'Data Structures',
        question: 'Which data structure operates on a FIFO (First-In, First-Out) principle?',
        options: ['Stack', 'Queue', 'Binary Tree', 'Max Heap'],
        correctIndex: 1,
        explanation: 'A Queue processes items in the exact order they arrive (FIFO), whereas a Stack is LIFO.',
        basicToLearn: {
          concept: 'Queue vs Stack Fundamentals',
          importance: 'Queues are used in BFS graph traversal, printer spools, and asynchronous message buffers.',
          keyRule: 'Use a Stack for undo operations and DFS recursion; use a Queue for breadth-first level order traversal.',
          action: 'Implement a Queue using an array or linked list with enqueue and dequeue operations.'
        }
      },
      {
        id: 'sd_q3',
        topic: 'Hash Tables',
        question: 'What is the average time complexity to lookup a key in a well-balanced Hash Table?',
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
        correctIndex: 0,
        explanation: 'Hash functions map keys directly to bucket indices, providing amortized O(1) constant-time lookups.',
        basicToLearn: {
          concept: 'Hash Table Lookups & Collision Resolution',
          importance: 'The Two Sum problem and 90% of array optimization problems rely on Hash Maps for O(1) checks.',
          keyRule: 'Trade memory for time: storing elements in a Set/Map turns O(N²) nested loops into O(N) single-pass scans.',
          action: 'Learn chaining vs open addressing collision handling.'
        }
      },
      {
        id: 'sd_q4',
        topic: 'OOP Concepts',
        question: 'In Object-Oriented Programming, bundling data fields and methods into a single class while restricting direct access is called:',
        options: ['Inheritance', 'Encapsulation', 'Polymorphism', 'Overloading'],
        correctIndex: 1,
        explanation: 'Encapsulation hides internal state and requires all interaction to occur through defined public methods.',
        basicToLearn: {
          concept: 'The 4 Pillars of OOP (Encapsulation, Abstraction, Inheritance, Polymorphism)',
          importance: 'Interviewers ask this in almost every service-based and product-based hiring round.',
          keyRule: 'Encapsulation = Information hiding via private variables with getter/setter access.',
          action: 'Write a simple class demonstrating private variables and public methods.'
        }
      },
      {
        id: 'sd_q5',
        topic: 'Sorting Algorithms',
        question: 'What is the worst-case time complexity of standard QuickSort when the pivot is chosen poorly (e.g., sorted array with first element as pivot)?',
        options: ['O(log N)', 'O(N)', 'O(N log N)', 'O(N²)'],
        correctIndex: 3,
        explanation: 'Without randomized pivots, QuickSort degenerates into O(N²) if partitions are unbalanced (size 1 and N-1).',
        basicToLearn: {
          concept: 'Comparison Sorting & Pivot Selection',
          importance: 'Shows interviewers that you understand edge cases and worst-case algorithmic behavior.',
          keyRule: 'MergeSort guarantees O(N log N) in all cases; QuickSort averages O(N log N) but degrades to O(N²) if pivot selection is deterministic.',
          action: 'Review why randomized pivot or 3-way partitioning prevents worst-case degradation.'
        }
      }
    ],
    curriculumTracks: [
      { level: 'Foundational', topic: 'Arrays, Two-Pointers, and Linear Time Scans' },
      { level: 'Intermediate', topic: 'Binary Search, Hash Maps, and Recursion Stacks' },
      { level: 'Core Interview', topic: 'Trees, BFS/DFS Traversal, and OOP Clean Architecture' }
    ]
  },

  // 2. Full Stack Developer
  'Full Stack Developer': {
    roleId: 'fullstack_developer',
    roleTitle: 'Full Stack Developer',
    sectorName: 'Web & Applications',
    description: 'Tests end-to-end web architecture: Client-Server HTTP, APIs, Relational vs NoSQL Databases, and State Management.',
    questions: [
      {
        id: 'fs_q1',
        topic: 'HTTP Protocol',
        question: 'Which HTTP response status code indicates that a new resource has been successfully created on the server?',
        options: ['200 OK', '201 Created', '204 No Content', '304 Not Modified'],
        correctIndex: 1,
        explanation: 'HTTP 201 Created is the standard RESTful response for a successful POST request that creates a resource.',
        basicToLearn: {
          concept: 'RESTful HTTP Status Codes',
          importance: 'API design is evaluated in every full-stack technical round.',
          keyRule: '200 = Success, 201 = Created, 400 = Bad Client Request, 401 = Unauthorized, 404 = Not Found, 500 = Server Error.',
          action: 'Review proper status code usage for GET, POST, PUT, PATCH, and DELETE endpoints.'
        }
      },
      {
        id: 'fs_q2',
        topic: 'Database Selection',
        question: 'What is the fundamental architectural difference between a Relational Database (SQL) and a Document Database (NoSQL)?',
        options: [
          'SQL databases cannot store text',
          'SQL enforces predefined table schemas and relational joins; Document databases store flexible JSON-like documents',
          'NoSQL databases run entirely in browser memory',
          'SQL databases do not support ACID transactions'
        ],
        correctIndex: 1,
        explanation: 'Relational databases (PostgreSQL, MySQL) enforce strict schemas and foreign keys, while Document stores (MongoDB) support flexible semi-structured JSON.',
        basicToLearn: {
          concept: 'SQL vs NoSQL Trade-offs',
          importance: 'System design interviews always ask: "Why did you choose PostgreSQL over MongoDB?"',
          keyRule: 'Use SQL when data relationships are structured and ACID is critical. Use NoSQL for rapid schema evolution and hierarchical documents.',
          action: 'Understand when normalized tables beat embedded documents.'
        }
      },
      {
        id: 'fs_q3',
        topic: 'Web Security',
        question: 'In client-server web apps, what is the primary role of CORS (Cross-Origin Resource Sharing)?',
        options: [
          'It speeds up database queries on the backend',
          'It is a browser security mechanism that restricts web pages from making API requests to a different domain without permission',
          'It encrypts passwords in the browser',
          'It converts HTML into React components'
        ],
        correctIndex: 1,
        explanation: 'CORS is enforced by browsers to prevent malicious scripts on one origin from accessing sensitive resources on another origin.',
        basicToLearn: {
          concept: 'Browser Security & CORS Mechanics',
          importance: 'Every full stack developer encounters CORS errors when connecting frontend to backend.',
          keyRule: 'CORS is a browser-enforced policy. The backend server must return `Access-Control-Allow-Origin` headers.',
          action: 'Learn how preflight OPTIONS requests work in cross-origin fetch calls.'
        }
      },
      {
        id: 'fs_q4',
        topic: 'Authentication',
        question: 'Why are JSON Web Tokens (JWT) widely favored in modern scalable web architectures?',
        options: [
          'JWT eliminates the need for passwords',
          'JWT is stateless: the server verifies identity cryptographically without needing a session lookup in database memory',
          'JWT compresses images for faster download',
          'JWT can only be decrypted by the browser'
        ],
        correctIndex: 1,
        explanation: 'Because JWTs are self-contained and digitally signed, horizontal server instances can verify the token without shared session databases.',
        basicToLearn: {
          concept: 'Stateless JWT vs Stateful Cookie Sessions',
          importance: 'Essential for architecting secure, horizontally scalable full-stack applications.',
          keyRule: 'Header.Payload.Signature — payload is base64 encoded (NOT encrypted), signature prevents tampering.',
          action: 'Understand token expiration and refresh token rotation.'
        }
      },
      {
        id: 'fs_q5',
        topic: 'Backend ORM',
        question: 'What is the purpose of an Object-Relational Mapper (ORM) like Prisma, Hibernate, or Sequelize?',
        options: [
          'It replaces the frontend UI framework',
          'It translates between object-oriented code in your backend and relational database tables without writing raw SQL strings',
          'It automatically deploys the website to cloud servers',
          'It compresses CSS files'
        ],
        correctIndex: 1,
        explanation: 'An ORM maps database rows to programming language objects and provides type-safe query builders.',
        basicToLearn: {
          concept: 'Database Abstraction & ORMs',
          importance: 'Standard in modern tech stacks to write safe, maintainable database queries.',
          keyRule: 'ORMs protect against SQL Injection through parameterized queries, but watch out for N+1 query performance traps.',
          action: 'Practice basic CRUD queries using an ORM or query builder.'
        }
      }
    ],
    curriculumTracks: [
      { level: 'Foundational', topic: 'Client-Server HTTP, REST Verbs, and Status Codes' },
      { level: 'Intermediate', topic: 'Relational Schemas, Foreign Keys, and ORM Modeling' },
      { level: 'Core Interview', topic: 'Stateless Authentication (JWT) and CORS Configuration' }
    ]
  },

  // 3. Frontend Developer
  'Frontend Developer': {
    roleId: 'frontend_developer',
    roleTitle: 'Frontend Developer',
    sectorName: 'User Interface & Web Performance',
    description: 'Tests core web interfaces: CSS Box Model, JavaScript ES6+ runtime, React state lifecycles, and DOM performance.',
    questions: [
      {
        id: 'fe_q1',
        topic: 'CSS Foundations',
        question: 'From the innermost layer to the outermost layer, what is the correct order of the CSS Box Model?',
        options: [
          'Margin -> Border -> Padding -> Content',
          'Content -> Padding -> Border -> Margin',
          'Content -> Margin -> Padding -> Border',
          'Padding -> Content -> Margin -> Border'
        ],
        correctIndex: 1,
        explanation: 'Content is in the center, surrounded by Padding, wrapped by Border, and spaced by Margin.',
        basicToLearn: {
          concept: 'The CSS Box Model (`box-sizing: border-box`)',
          importance: 'The fundamental building block of all web layouts and responsive UI debugging.',
          keyRule: 'Always use `box-sizing: border-box` so padding and border do not increase the element total width.',
          action: 'Inspect element dimensions using Chrome DevTools.'
        }
      },
      {
        id: 'fe_q2',
        topic: 'JavaScript Types',
        question: 'In JavaScript, what does `typeof null` evaluate to?',
        options: ['"null"', '"undefined"', '"object"', '"boolean"'],
        correctIndex: 2,
        explanation: 'In JavaScript, `typeof null === "object"` is a well-known legacy quirk dating back to the first JS engine in 1995.',
        basicToLearn: {
          concept: 'JavaScript Data Types & Equality (== vs ===)',
          importance: 'Interviewers frequently test JS type coercion and truthy/falsy edge cases.',
          keyRule: 'Always use strict equality (`===`) and check `val === null` directly instead of `typeof val === "object"`.',
          action: 'Review the 7 primitive types: string, number, bigint, boolean, symbol, undefined, null.'
        }
      },
      {
        id: 'fe_q3',
        topic: 'React Hooks',
        question: 'In React, what is the primary purpose of the `useEffect` hook with an empty dependency array `[]`?',
        options: [
          'It re-renders the component on every click',
          'It runs side effects (like data fetching or subscriptions) only once after the component mounts',
          'It defines global CSS styles',
          'It replaces Redux store entirely'
        ],
        correctIndex: 1,
        explanation: 'An empty dependency array `[]` indicates the effect has no reactive dependencies, executing once on initial mount and cleanup on unmount.',
        basicToLearn: {
          concept: 'React Component Lifecycle & Hook Dependency Arrays',
          importance: 'Core question in every React frontend screening interview.',
          keyRule: 'Never omit variables used inside `useEffect` from the dependency array, or you create stale closure bugs.',
          action: 'Practice data fetching with loading, error, and cleanup cancellation states.'
        }
      },
      {
        id: 'fe_q4',
        topic: 'CSS Layouts',
        question: 'Which CSS display property creates a 1-dimensional layout model for aligning items along a main axis or cross axis?',
        options: ['display: block', 'display: inline', 'display: flex', 'display: table'],
        correctIndex: 2,
        explanation: 'Flexbox (`display: flex`) is a 1-dimensional layout engine, while Grid (`display: grid`) is 2-dimensional.',
        basicToLearn: {
          concept: 'Flexbox Layout Mechanics (justify-content vs align-items)',
          importance: 'Modern UI engineering relies on Flexbox for centering and responsive adaptation.',
          keyRule: 'Main axis is controlled by `justify-content`; Cross axis is controlled by `align-items`.',
          action: 'Build a navbar and card grid using Flexbox without manual float or margin hacks.'
        }
      },
      {
        id: 'fe_q5',
        topic: 'Browser Storage',
        question: 'What is the primary difference between `localStorage` and `sessionStorage` in the browser?',
        options: [
          'localStorage can only store numbers',
          'sessionStorage data persists forever, whereas localStorage clears when you close the tab',
          'localStorage persists data across browser restarts; sessionStorage data is wiped when the browser tab closes',
          'localStorage sends data to the server on every HTTP request'
        ],
        correctIndex: 2,
        explanation: '`localStorage` has no expiration date; `sessionStorage` survives page reloads but is destroyed when the tab is closed.',
        basicToLearn: {
          concept: 'Client-Side Web Storage (Cookies vs LocalStorage vs SessionStorage)',
          importance: 'Asked to test if you know where to securely store UI preferences and tokens.',
          keyRule: 'Never store sensitive JWT tokens or passwords in localStorage where XSS attacks can read them.',
          action: 'Compare storage quotas (LocalStorage ~5MB vs Cookie ~4KB).'
        }
      }
    ],
    curriculumTracks: [
      { level: 'Foundational', topic: 'CSS Box Model, Flexbox, and Semantic HTML' },
      { level: 'Intermediate', topic: 'JavaScript ES6+, Promises, and Async/Await' },
      { level: 'Core Interview', topic: 'React State Lifecycle, Custom Hooks, and Virtual DOM' }
    ]
  },

  // 4. Backend Developer
  'Backend Developer': {
    roleId: 'backend_developer',
    roleTitle: 'Backend Developer',
    sectorName: 'Enterprise Cloud & Distributed Systems',
    description: 'Tests backend architecture: Database Indexing, Caching, Concurrency, Microservices, and Fault Tolerance.',
    questions: [
      {
        id: 'be_q1',
        topic: 'Database Optimization',
        question: 'Why do developers add an Index (like a B+Tree index) to a database table column?',
        options: [
          'To encrypt the column contents for security',
          'To speed up search queries (WHERE / ORDER BY) from O(N) full-table scans to O(log N) lookups',
          'To reduce disk storage requirements',
          'To automatically back up the database'
        ],
        correctIndex: 1,
        explanation: 'Indexes create sorted auxiliary data structures that allow the query engine to find rows in O(log N) without scanning every row on disk.',
        basicToLearn: {
          concept: 'Database Indexing & Query Plans',
          importance: 'The #1 performance question asked in backend database interviews.',
          keyRule: 'Indexes speed up reads (SELECT) but slightly slow down writes (INSERT/UPDATE) because index trees must be updated.',
          action: 'Learn how to read an `EXPLAIN ANALYZE` query execution plan.'
        }
      },
      {
        id: 'be_q2',
        topic: 'API Design',
        question: 'In REST API design, what does it mean for an HTTP method to be "Idempotent"?',
        options: [
          'The endpoint can only be accessed by authenticated administrators',
          'Making multiple identical requests produces the exact same side-effects as making a single request',
          'The endpoint returns data in XML format only',
          'The request never times out'
        ],
        correctIndex: 1,
        explanation: 'Methods like GET, PUT, and DELETE are idempotent: repeating `DELETE /users/5` ten times has the same outcome as doing it once.',
        basicToLearn: {
          concept: 'HTTP Method Idempotency & Safe Methods',
          importance: 'Critical when building reliable payment and transaction systems where retries occur.',
          keyRule: 'GET, HEAD = Safe & Idempotent. PUT, DELETE = Idempotent. POST = Non-idempotent.',
          action: 'Understand how idempotency keys prevent duplicate payments on network retries.'
        }
      },
      {
        id: 'be_q3',
        topic: 'Caching Architecture',
        question: 'In the popular "Cache-Aside" (Lazy Loading) caching pattern with Redis, what happens on a read request?',
        options: [
          'Data is written directly to disk without checking memory',
          'Application checks cache first; on a cache miss, it reads from database, updates the cache, and returns data',
          'Redis automatically replicates all SQL tables every 5 minutes',
          'Cache deletes all old data whenever read occurs'
        ],
        correctIndex: 1,
        explanation: 'Cache-Aside only loads requested data into cache on demand, minimizing cache memory usage for inactive rows.',
        basicToLearn: {
          concept: 'Distributed Caching Strategies (Cache-Aside, Write-Through)',
          importance: 'Standard question in system design and backend scaling interviews.',
          keyRule: 'Always set a TTL (Time-To-Live) on cache keys to prevent stale data accumulation.',
          action: 'Study the difference between Cache-Aside and Write-Through caching.'
        }
      },
      {
        id: 'be_q4',
        topic: 'Transactions',
        question: 'Which ACID property guarantees that once a transaction has committed, its changes survive system crashes or power failures?',
        options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
        correctIndex: 3,
        explanation: 'Durability guarantees that committed records are permanently flushed to non-volatile storage (via write-ahead logs).',
        basicToLearn: {
          concept: 'ACID Transactions & Write-Ahead Logging (WAL)',
          importance: 'Foundational for building financial and enterprise-grade backend services.',
          keyRule: 'A = All or nothing, C = Schema rules preserved, I = Concurrency isolation, D = Persisted to disk.',
          action: 'Understand transaction isolation levels: Read Committed vs Serializable.'
        }
      },
      {
        id: 'be_q5',
        topic: 'Infrastructure',
        question: 'What is the primary role of a Reverse Proxy (such as Nginx) placed in front of backend microservices?',
        options: [
          'It compiles Java and Go code into machine binaries',
          'It handles load balancing, SSL termination, rate limiting, and routes incoming traffic to internal services',
          'It replaces the primary relational database',
          'It formats JSON for frontend UI'
        ],
        correctIndex: 1,
        explanation: 'Reverse proxies act as a secure gateway that distributes client traffic, offloads SSL decryption, and shields internal server IPs.',
        basicToLearn: {
          concept: 'Reverse Proxies, Load Balancing & SSL Termination',
          importance: 'Essential for understanding how production web traffic is routed and scaled.',
          keyRule: 'Forward Proxy protects clients; Reverse Proxy protects servers.',
          action: 'Learn basic Round Robin and Least Connections load balancing algorithms.'
        }
      }
    ],
    curriculumTracks: [
      { level: 'Foundational', topic: 'Relational SQL, Indexing, and REST API Conventions' },
      { level: 'Intermediate', topic: 'Redis Caching Patterns, Connection Pooling, and Auth' },
      { level: 'Core Interview', topic: 'Microservices, Reverse Proxies, and ACID Concurrency' }
    ]
  },

  // 5. Data Engineer
  'Data Engineer': {
    roleId: 'data_engineer',
    roleTitle: 'Data Engineer',
    sectorName: 'Data Infrastructure & Pipelines',
    description: 'Tests analytical infrastructure: SQL Aggregations, ETL Pipelines, Star Schemas, Warehouses, and Distributed Processing.',
    questions: [
      {
        id: 'de_q1',
        topic: 'SQL Querying',
        question: 'In SQL, what is the crucial operational difference between the `WHERE` clause and the `HAVING` clause?',
        options: [
          'WHERE filters aggregate results; HAVING filters individual rows',
          'WHERE filters individual rows BEFORE grouping; HAVING filters aggregated groups AFTER `GROUP BY`',
          'HAVING can only be used with subqueries',
          'WHERE is only valid in SQLite'
        ],
        correctIndex: 1,
        explanation: '`WHERE` filters rows before aggregation occurs; `HAVING` applies conditions to grouped summaries (e.g., `HAVING COUNT(*) > 5`).',
        basicToLearn: {
          concept: 'SQL Execution Order & Grouping Filters',
          importance: 'Every data engineering technical test includes complex SQL aggregation queries.',
          keyRule: 'Execution Order: FROM -> WHERE -> GROUP BY -> HAVING -> SELECT -> ORDER BY -> LIMIT.',
          action: 'Practice writing queries using GROUP BY and HAVING filters.'
        }
      },
      {
        id: 'de_q2',
        topic: 'ETL Pipelines',
        question: 'In an ETL (Extract, Transform, Load) pipeline, what does the "Transform" stage do?',
        options: [
          'It copies raw files to physical backup tapes',
          'It cleans, normalizes, deduplicates, validates schema rules, and shapes raw data for business analytics',
          'It deletes old data from customer accounts',
          'It formats numbers for Excel spreadsheets'
        ],
        correctIndex: 1,
        explanation: 'Transformation standardizes data, parses timestamps, removes duplicate records, and computes derived analytical metrics.',
        basicToLearn: {
          concept: 'ETL vs ELT Architecture',
          importance: 'Core knowledge for designing modern data pipelines and lakehouses.',
          keyRule: 'ETL transforms before loading; modern cloud warehouses (BigQuery/Snowflake) use ELT (load raw first, transform in SQL).',
          action: 'Understand idempotent pipeline tasks and pipeline backfilling.'
        }
      },
      {
        id: 'de_q3',
        topic: 'Data Warehousing',
        question: 'Which schema design is widely used in analytical data warehousing, consisting of a central Fact table surrounded by Dimension tables?',
        options: ['Object Schema', 'Star Schema', 'Linked List Schema', 'Document Tree'],
        correctIndex: 1,
        explanation: 'A Star Schema organizes quantifiable business metrics into a central Fact table connected directly to descriptive Dimension tables (Customer, Date, Store).',
        basicToLearn: {
          concept: 'Dimensional Data Modeling (Facts vs Dimensions)',
          importance: 'The cornerstone of enterprise analytical database design.',
          keyRule: 'Fact tables store numerical events (orders, sales); Dimension tables store context (who, where, when).',
          action: 'Design a simple Star Schema for an e-commerce platform.'
        }
      },
      {
        id: 'de_q4',
        topic: 'Analytical Storage',
        question: 'What is the primary difference between an OLTP database and an OLAP database?',
        options: [
          'OLTP is for high-frequency transactional row writes; OLAP is for columnar analytical queries over billions of rows',
          'OLAP runs on mobile phones only',
          'OLTP stores only JSON documents',
          'OLAP cannot perform mathematical aggregations'
        ],
        correctIndex: 0,
        explanation: 'OLTP (PostgreSQL) is optimized for single-row insert/update transactions; OLAP (BigQuery, ClickHouse) stores data by column for massive aggregation speed.',
        basicToLearn: {
          concept: 'Row-Oriented (OLTP) vs Columnar (OLAP) Storage',
          importance: 'Essential for deciding where to route live application data vs business intelligence metrics.',
          keyRule: 'Row-oriented storage is fast for reading whole records; Columnar storage is 100x faster for computing SUM/AVG on specific columns.',
          action: 'Review why columnar compression reduces storage and accelerates analytical scans.'
        }
      },
      {
        id: 'de_q5',
        topic: 'Distributed Processing',
        question: 'In distributed data engines like Apache Spark, what is "Data Skew"?',
        options: [
          'When data files are corrupted on disk',
          'An uneven distribution of partition data where one worker node receives significantly more data than others, becoming a bottleneck',
          'When column names contain spelling errors',
          'A hardware failure in network switches'
        ],
        correctIndex: 1,
        explanation: 'Data skew happens when join or group keys are heavily imbalanced (e.g. 90% of rows have the same ID), causing a single executor to crawl while others sit idle.',
        basicToLearn: {
          concept: 'Distributed Partitions & Data Skew Optimization',
          importance: 'Common troubleshooting question in senior Big Data & Spark interviews.',
          keyRule: 'Use salting (adding random suffixes to popular keys) or broadcast joins to eliminate skew bottlenecks.',
          action: 'Understand how repartitioning and shuffling impact distributed execution time.'
        }
      }
    ],
    curriculumTracks: [
      { level: 'Foundational', topic: 'Advanced SQL, Window Functions, and Schema Modeling' },
      { level: 'Intermediate', topic: 'Star Schemas, Fact/Dimension Tables, and ELT Pipelines' },
      { level: 'Core Interview', topic: 'Distributed Engines (Spark), Columnar Storage, and Shuffling' }
    ]
  },

  // 6. AI/ML Engineer
  'AI/ML Engineer': {
    roleId: 'aiml_engineer',
    roleTitle: 'AI/ML Engineer',
    sectorName: 'Machine Learning & GenAI',
    description: 'Tests applied AI concepts: Model Overfitting, Evaluation Metrics, Activation Functions, Supervised Learning, and Embeddings.',
    questions: [
      {
        id: 'ai_q1',
        topic: 'Model Generalization',
        question: 'What is the primary indicator that a machine learning model is "Overfitting" on its training dataset?',
        options: [
          'High training error and high validation error',
          'Low training error but significantly higher validation/test error',
          'The model trains faster than expected',
          'The model outputs NaN for all predictions'
        ],
        correctIndex: 1,
        explanation: 'Overfitting occurs when a model memorizes training noise instead of general patterns, performing great on training data but failing on unseen validation data.',
        basicToLearn: {
          concept: 'Overfitting vs Underfitting (Bias-Variance Trade-off)',
          importance: 'The fundamental diagnostic in any machine learning problem.',
          keyRule: 'Counter overfitting using regularization (L1/L2), dropout, data augmentation, or early stopping.',
          action: 'Plot training loss vs validation loss curves to visually detect divergence.'
        }
      },
      {
        id: 'ai_q2',
        topic: 'Evaluation Metrics',
        question: 'Why is standard "Accuracy" an unreliable metric when evaluating a model trained on heavily imbalanced data (e.g., 99% benign transactions, 1% fraud)?',
        options: [
          'Accuracy is impossible to calculate on integers',
          'A naive model that predicts "benign" for everything gets 99% accuracy while detecting zero actual fraud cases',
          'Accuracy only works on regression models',
          'Computers cannot round accuracy decimals'
        ],
        correctIndex: 1,
        explanation: 'In imbalanced datasets, accuracy rewards predicting the majority class. Precision, Recall, and F1-Score are required to measure true positive detection.',
        basicToLearn: {
          concept: 'Precision, Recall, F1-Score, and ROC-AUC',
          importance: 'Interviewers look for candidates who avoid vanity accuracy metrics in real-world ML problems.',
          keyRule: 'Precision = Out of all predicted positives, how many were right? Recall = Out of all actual positives, how many did we catch?',
          action: 'Understand when to optimize for Recall (medical/fraud) vs Precision (spam filter).'
        }
      },
      {
        id: 'ai_q3',
        topic: 'Neural Networks',
        question: 'What is the fundamental role of an Activation Function (like ReLU or Sigmoid) in deep neural networks?',
        options: [
          'To save model weights to disk',
          'To introduce non-linearity, allowing the network to learn complex non-linear patterns beyond simple linear combinations',
          'To convert Python code to C++',
          'To automatically double the training dataset'
        ],
        correctIndex: 1,
        explanation: 'Without non-linear activation functions, stacking 100 neural layers is mathematically equivalent to a single linear regression (W1 * W2 * x = W_combined * x).',
        basicToLearn: {
          concept: 'Non-Linear Activation Functions (ReLU, GELU, Softmax)',
          importance: 'Foundational concept for all deep learning and transformer models.',
          keyRule: 'ReLU (f(x) = max(0, x)) is standard for hidden layers because it avoids vanishing gradients during backpropagation.',
          action: 'Compare ReLU vs Sigmoid gradient flow during backpropagation.'
        }
      },
      {
        id: 'ai_q4',
        topic: 'ML Paradigms',
        question: 'What is the core distinction between Supervised Learning and Unsupervised Learning?',
        options: [
          'Supervised models only run on GPU hardware',
          'Supervised learning trains on labeled input-output pairs; Unsupervised learning discovers latent patterns from unlabeled data',
          'Unsupervised learning requires humans to manually verify every prediction',
          'Supervised models cannot classify images'
        ],
        correctIndex: 1,
        explanation: 'Supervised learning maps inputs to target ground-truth labels (X -> y); Unsupervised learning clusters or compresses data without explicit labels.',
        basicToLearn: {
          concept: 'Supervised vs Unsupervised vs Self-Supervised Learning',
          importance: 'Defines how data annotation workflows and loss functions are formulated.',
          keyRule: 'Classification & Regression = Supervised. Clustering & PCA = Unsupervised. LLM Next-Token Prediction = Self-Supervised.',
          action: 'Categorize real-world tasks (e.g. churn prediction vs customer segmentation).'
        }
      },
      {
        id: 'ai_q5',
        topic: 'Generative AI & LLMs',
        question: 'In modern GenAI and semantic search, what is a "Vector Embedding"?',
        options: [
          'A bitmap screenshot of the model',
          'A high-dimensional numerical array where semantically similar words or concepts are located close to each other in vector space',
          'A type of compressed zip file for neural weights',
          'An SQL table with only two columns'
        ],
        correctIndex: 1,
        explanation: 'Embeddings translate text or images into continuous vector spaces where cosine similarity measures conceptual and semantic closeness.',
        basicToLearn: {
          concept: 'Vector Embeddings, Cosine Similarity & Vector Databases',
          importance: 'The backbone of Retrieval-Augmented Generation (RAG) and modern AI systems.',
          keyRule: 'Cosine similarity of 1.0 means vectors point in the identical semantic direction.',
          action: 'Understand how RAG retrieves relevant document chunks using vector distance lookups.'
        }
      }
    ],
    curriculumTracks: [
      { level: 'Foundational', topic: 'Linear Algebra, Train/Val Splits, and Loss Minimization' },
      { level: 'Intermediate', topic: 'Overfitting Mitigation, Evaluation Metrics (F1), and Feature Engineering' },
      { level: 'Core Interview', topic: 'Neural Activations, Transformer Attention, and Vector Embeddings' }
    ]
  }
};

/**
 * Returns assessment data for any role, falling back to Software Developer if not matched
 */
export function getAssessmentForRole(roleTitle) {
  if (!roleTitle) return SECTOR_ASSESSMENTS['Software Developer'];
  
  // Direct match
  if (SECTOR_ASSESSMENTS[roleTitle]) {
    return SECTOR_ASSESSMENTS[roleTitle];
  }

  // Fuzzy match
  const normalized = roleTitle.toLowerCase();
  const matchedKey = Object.keys(SECTOR_ASSESSMENTS).find(k => 
    normalized.includes(k.toLowerCase()) || k.toLowerCase().includes(normalized)
  );

  return matchedKey ? SECTOR_ASSESSMENTS[matchedKey] : SECTOR_ASSESSMENTS['Software Developer'];
}
