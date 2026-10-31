import {
  UserProfile,
  Repository,
  CommitRecord,
  PullRequest,
  IssueRecord,
  BranchRecord,
  ActionRun,
  DailyTask,
  TaskCategory,
  AutomationWorkflow,
  WorkflowExecution,
  EngineAContributionIntelligence,
  EngineBAutomationIntelligence,
  AISuggestion,
  TeamMember,
  OrganizationInfo,
  NotificationItem,
} from './types';

export const initialUser: UserProfile = {
  id: 'usr_7f89b21a',
  name: 'Alex Rivera',
  email: 'alex.rivera@gitflow.dev',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  role: 'team_leader',
  plan: 'pro',
  githubConnected: true,
  githubUsername: 'alexrivera-dev',
  githubAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  bio: 'Systems Architect & Autonomous Infrastructure Engineer. Building reliable developer workflows.',
  location: 'San Francisco, CA',
  company: 'Git Flow Labs',
  createdAt: '2025-01-15T08:00:00Z',
  twoFactorEnabled: true,
};

export const initialRepositories: Repository[] = [
  {
    id: 'repo_01',
    name: 'core-workflow-engine',
    fullName: 'alexrivera-dev/core-workflow-engine',
    owner: 'alexrivera-dev',
    description: 'High-throughput event-driven workflow engine with deterministic state machines and retry locks.',
    stars: 342,
    forks: 48,
    openIssues: 5,
    isPrivate: false,
    defaultBranch: 'main',
    language: 'TypeScript',
    topics: ['workflow', 'automation', 'distributed-systems', 'state-machine'],
    lastSyncAt: '2026-10-31T21:00:00Z',
    automationEnabled: true,
    healthScore: 98,
    url: 'https://github.com/alexrivera-dev/core-workflow-engine',
  },
  {
    id: 'repo_02',
    name: 'git-sentinel-scanner',
    fullName: 'alexrivera-dev/git-sentinel-scanner',
    owner: 'alexrivera-dev',
    description: 'Autonomous repository vulnerability analyzer, license compliance checker, and dependency graph scanner.',
    stars: 890,
    forks: 112,
    openIssues: 12,
    isPrivate: false,
    defaultBranch: 'main',
    language: 'Go',
    topics: ['security', 'git', 'scanner', 'devsecops'],
    lastSyncAt: '2026-10-31T20:45:00Z',
    automationEnabled: true,
    healthScore: 94,
    url: 'https://github.com/alexrivera-dev/git-sentinel-scanner',
  },
  {
    id: 'repo_03',
    name: 'docs-ai-sync',
    fullName: 'alexrivera-dev/docs-ai-sync',
    owner: 'alexrivera-dev',
    description: 'Zero-drift automated documentation maintainer. Extracts AST types and maintains Markdown parity.',
    stars: 124,
    forks: 19,
    openIssues: 2,
    isPrivate: false,
    defaultBranch: 'main',
    language: 'TypeScript',
    topics: ['documentation', 'ast', 'markdown', 'automation'],
    lastSyncAt: '2026-10-31T19:30:00Z',
    automationEnabled: true,
    healthScore: 96,
    url: 'https://github.com/alexrivera-dev/docs-ai-sync',
  },
  {
    id: 'repo_04',
    name: 'microservice-auth-gateway',
    fullName: 'alexrivera-dev/microservice-auth-gateway',
    owner: 'alexrivera-dev',
    description: 'High-performance OAuth 2.1 & OIDC token verification gateway with token rotation and Redis cache.',
    stars: 567,
    forks: 73,
    openIssues: 8,
    isPrivate: true,
    defaultBranch: 'production',
    language: 'Rust',
    topics: ['oauth2', 'security', 'gateway', 'rust'],
    lastSyncAt: '2026-10-31T18:15:00Z',
    automationEnabled: false,
    healthScore: 91,
    url: 'https://github.com/alexrivera-dev/microservice-auth-gateway',
  },
  {
    id: 'repo_05',
    name: 'react-enterprise-kit',
    fullName: 'alexrivera-dev/react-enterprise-kit',
    owner: 'alexrivera-dev',
    description: 'Design system primitives with high-contrast dark mode, accessible keyboard navigation, and motion presets.',
    stars: 1420,
    forks: 210,
    openIssues: 14,
    isPrivate: false,
    defaultBranch: 'main',
    language: 'TypeScript',
    topics: ['react', 'design-system', 'tailwind', 'components'],
    lastSyncAt: '2026-10-31T17:00:00Z',
    automationEnabled: true,
    healthScore: 99,
    url: 'https://github.com/alexrivera-dev/react-enterprise-kit',
  },
  {
    id: 'repo_06',
    name: 'cloud-infra-terraform',
    fullName: 'alexrivera-dev/cloud-infra-terraform',
    owner: 'alexrivera-dev',
    description: 'Multi-region AWS ECS, RDS Aurora, Redis cluster, and Cloudflare WAF infrastructure as code.',
    stars: 205,
    forks: 31,
    openIssues: 3,
    isPrivate: true,
    defaultBranch: 'main',
    language: 'HCL',
    topics: ['terraform', 'aws', 'infrastructure', 'devops'],
    lastSyncAt: '2026-10-31T15:20:00Z',
    automationEnabled: true,
    healthScore: 95,
    url: 'https://github.com/alexrivera-dev/cloud-infra-terraform',
  },
];

// Generate 365 calendar data for Engine A
export const generateEngineAData = (): EngineAContributionIntelligence => {
  const calendarData: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[] = [];
  const today = new Date('2026-10-31T12:00:00Z');
  let totalCommits = 0;

  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];

    // realistic contribution pattern (weekdays higher, weekends lighter, continuous streak)
    const dayOfWeek = d.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const baseCount = isWeekend ? (i % 3 === 0 ? 2 : 1) : Math.floor((i % 7) * 1.5) + 3;
    const count = Math.min(12, Math.max(1, baseCount));
    totalCommits += count;

    let level: 0 | 1 | 2 | 3 | 4 = 1;
    if (count > 7) level = 4;
    else if (count > 4) level = 3;
    else if (count > 2) level = 2;
    else if (count > 0) level = 1;

    calendarData.push({
      date: dateStr,
      count,
      level,
    });
  }

  return {
    totalCommits,
    totalPullRequests: 184,
    totalIssuesOpened: 92,
    totalCodeReviews: 247,
    currentStreakDays: 312,
    longestStreakDays: 312,
    activeDaysLast365: 358,
    yearTotalContributions: totalCommits + 184 + 92 + 247,
    calendarData,
    monthlyBreakdown: [
      { month: 'Nov', commits: 142, prs: 14, reviews: 19 },
      { month: 'Dec', commits: 156, prs: 16, reviews: 21 },
      { month: 'Jan', commits: 178, prs: 18, reviews: 26 },
      { month: 'Feb', commits: 162, prs: 15, reviews: 22 },
      { month: 'Mar', commits: 194, prs: 20, reviews: 28 },
      { month: 'Apr', commits: 181, prs: 17, reviews: 24 },
      { month: 'May', commits: 205, prs: 22, reviews: 31 },
      { month: 'Jun', commits: 189, prs: 19, reviews: 27 },
      { month: 'Jul', commits: 198, prs: 18, reviews: 29 },
      { month: 'Aug', commits: 212, prs: 23, reviews: 33 },
      { month: 'Sep', commits: 203, prs: 21, reviews: 30 },
      { month: 'Oct', commits: 224, prs: 25, reviews: 35 },
    ],
    topLanguages: [
      { language: 'TypeScript', percentage: 48, color: '#3178C6' },
      { language: 'Rust', percentage: 22, color: '#DEA584' },
      { language: 'Go', percentage: 16, color: '#00ADD8' },
      { language: 'Python', percentage: 9, color: '#3572A5' },
      { language: 'Other', percentage: 5, color: '#8B5CF6' },
    ],
  };
};

export const initialEngineBData: EngineBAutomationIntelligence = {
  totalAutomatedTasks: 1842,
  documentationUpdates: 432,
  testExecutions: 819,
  successfulWorkflows: 1794,
  failedWorkflows: 48,
  repositoryMaintenanceCount: 294,
  aiSuggestionsGenerated: 628,
  approvedChangesCount: 512,
  estimatedHoursSaved: 468,
  dailyOperationsHistory: [
    { date: '2026-10-25', operations: 28, healthScore: 98 },
    { date: '2026-10-26', operations: 34, healthScore: 97 },
    { date: '2026-10-27', operations: 42, healthScore: 99 },
    { date: '2026-10-28', operations: 39, healthScore: 98 },
    { date: '2026-10-29', operations: 45, healthScore: 99 },
    { date: '2026-10-30', operations: 38, healthScore: 98 },
    { date: '2026-10-31', operations: 41, healthScore: 99 },
  ],
  operationTypeBreakdown: [
    { type: 'Documentation Sync', count: 432 },
    { type: 'Automated Test Gen', count: 386 },
    { type: 'Security Audits', count: 294 },
    { type: 'Dependency Audits', count: 268 },
    { type: 'Code Health Checks', count: 260 },
    { type: 'PR Validations', count: 202 },
  ],
};

export const initialCommits: CommitRecord[] = [
  {
    sha: '8f7a93c',
    message: 'feat(engine): implement distributed lock idempotency with Redis redlock fallback',
    author: { name: 'Alex Rivera', email: 'alex@gitflow.dev' },
    date: '2026-10-31T18:42:11Z',
    repoName: 'core-workflow-engine',
    additions: 148,
    deletions: 12,
    verified: true,
  },
  {
    sha: '4d2e18b',
    message: 'docs(api): update OpenAPI spec with v3 webhook signature validation schema',
    author: { name: 'Git Flow Bot', email: 'bot@gitflow.dev' },
    date: '2026-10-31T15:20:00Z',
    repoName: 'docs-ai-sync',
    additions: 64,
    deletions: 8,
    verified: true,
  },
  {
    sha: '9c5a12f',
    message: 'test(scanner): add regression tests for nested symlink circular reference handling',
    author: { name: 'Alex Rivera', email: 'alex@gitflow.dev' },
    date: '2026-10-31T11:05:43Z',
    repoName: 'git-sentinel-scanner',
    additions: 92,
    deletions: 4,
    verified: true,
  },
  {
    sha: '3b890ef',
    message: 'perf(auth): optimize Ed25519 public key caching pipeline with zero-copy deserialization',
    author: { name: 'Alex Rivera', email: 'alex@gitflow.dev' },
    date: '2026-10-30T19:14:02Z',
    repoName: 'microservice-auth-gateway',
    additions: 83,
    deletions: 29,
    verified: true,
  },
  {
    sha: '2a11b7c',
    message: 'style(ui): improve high contrast focus rings for WCAG AAA compliance',
    author: { name: 'Elena Rostova', email: 'elena@gitflow.dev' },
    date: '2026-10-30T14:30:21Z',
    repoName: 'react-enterprise-kit',
    additions: 38,
    deletions: 14,
    verified: true,
  },
  {
    sha: '7f99a4e',
    message: 'chore(deps): update cross-spawn and tar to address advisories GHSA-3669-72v9-r5v3',
    author: { name: 'Git Flow Bot', email: 'bot@gitflow.dev' },
    date: '2026-10-29T16:11:00Z',
    repoName: 'core-workflow-engine',
    additions: 12,
    deletions: 12,
    verified: true,
  },
];

export const initialPullRequests: PullRequest[] = [
  {
    id: 104,
    number: 104,
    title: 'feat: add streaming telemetry endpoint for real-time workflow status',
    author: 'alexrivera-dev',
    state: 'open',
    createdAt: '2026-10-31T14:00:00Z',
    updatedAt: '2026-10-31T18:00:00Z',
    branch: 'feat/telemetry-stream',
    repoName: 'core-workflow-engine',
    reviewStatus: 'approved',
    additions: 312,
    deletions: 45,
    commentsCount: 6,
  },
  {
    id: 88,
    number: 88,
    title: 'fix(scanner): correct false positive on internal monorepo symlinks',
    author: 'alexrivera-dev',
    state: 'open',
    createdAt: '2026-10-30T10:30:00Z',
    updatedAt: '2026-10-31T09:15:00Z',
    branch: 'fix/symlink-scanner',
    repoName: 'git-sentinel-scanner',
    reviewStatus: 'reviewing',
    additions: 84,
    deletions: 19,
    commentsCount: 3,
  },
  {
    id: 72,
    number: 72,
    title: 'docs: synchronize API markdown with latest Rust FFI bindings',
    author: 'gitflow-automation-bot',
    state: 'merged',
    createdAt: '2026-10-29T08:00:00Z',
    updatedAt: '2026-10-29T12:00:00Z',
    branch: 'auto/docs-sync-rust-ffi',
    repoName: 'docs-ai-sync',
    reviewStatus: 'approved',
    additions: 190,
    deletions: 42,
    commentsCount: 2,
  },
  {
    id: 54,
    number: 54,
    title: 'refactor: decouple theme token provider for microfrontend hydration',
    author: 'elena-rostova',
    state: 'merged',
    createdAt: '2026-10-28T16:20:00Z',
    updatedAt: '2026-10-29T10:00:00Z',
    branch: 'refactor/theme-hydration',
    repoName: 'react-enterprise-kit',
    reviewStatus: 'approved',
    additions: 240,
    deletions: 98,
    commentsCount: 8,
  },
];

export const initialIssues: IssueRecord[] = [
  {
    id: 201,
    number: 45,
    title: 'Support custom retry backoff jitter algorithm in workflow execution',
    author: 'dev-sarah',
    state: 'open',
    createdAt: '2026-10-31T08:12:00Z',
    repoName: 'core-workflow-engine',
    labels: [
      { name: 'enhancement', color: 'A855F7' },
      { name: 'priority:high', color: 'EF4444' },
    ],
    commentsCount: 4,
  },
  {
    id: 202,
    number: 39,
    title: 'Memory spike during deep git tree recursion on repositories > 10GB',
    author: 'cloud-eng-mike',
    state: 'open',
    createdAt: '2026-10-30T17:40:00Z',
    repoName: 'git-sentinel-scanner',
    labels: [
      { name: 'performance', color: 'F05032' },
      { name: 'needs-investigation', color: 'F59E0B' },
    ],
    commentsCount: 9,
  },
  {
    id: 203,
    number: 28,
    title: 'Support OpenAPI 3.1.0 schema validator in docs-ai sync worker',
    author: 'alexrivera-dev',
    state: 'closed',
    createdAt: '2026-10-27T11:20:00Z',
    repoName: 'docs-ai-sync',
    labels: [{ name: 'completed', color: '22C55E' }],
    commentsCount: 3,
  },
  {
    id: 204,
    number: 19,
    title: 'Add WCAG AAA contrast ratio tokens to color matrix export',
    author: 'design-lead',
    state: 'closed',
    createdAt: '2026-10-26T14:10:00Z',
    repoName: 'react-enterprise-kit',
    labels: [{ name: 'accessibility', color: '06B6D4' }],
    commentsCount: 5,
  },
];

export const initialBranches: BranchRecord[] = [
  {
    name: 'main',
    repoName: 'core-workflow-engine',
    isDefault: true,
    isProtected: true,
    lastCommitSha: '8f7a93c',
    lastCommitMessage: 'feat(engine): implement distributed lock idempotency',
    author: 'Alex Rivera',
    updatedAt: '2026-10-31T18:42:11Z',
  },
  {
    name: 'feat/telemetry-stream',
    repoName: 'core-workflow-engine',
    isDefault: false,
    isProtected: false,
    lastCommitSha: '1a9f02c',
    lastCommitMessage: 'add web-socket telemetry emitter with ping/pong heartbeat',
    author: 'Alex Rivera',
    updatedAt: '2026-10-31T14:00:00Z',
  },
  {
    name: 'fix/worker-deadlock',
    repoName: 'core-workflow-engine',
    isDefault: false,
    isProtected: false,
    lastCommitSha: '4c7811d',
    lastCommitMessage: 'release lock on unhandled exception in async loop',
    author: 'Git Flow Bot',
    updatedAt: '2026-10-29T10:15:00Z',
  },
  {
    name: 'main',
    repoName: 'git-sentinel-scanner',
    isDefault: true,
    isProtected: true,
    lastCommitSha: '9c5a12f',
    lastCommitMessage: 'test(scanner): add regression tests for symlink recursion',
    author: 'Alex Rivera',
    updatedAt: '2026-10-31T11:05:43Z',
  },
  {
    name: 'fix/symlink-scanner',
    repoName: 'git-sentinel-scanner',
    isDefault: false,
    isProtected: false,
    lastCommitSha: '5b201ee',
    lastCommitMessage: 'detect visited canonical paths to avoid infinite cycles',
    author: 'Alex Rivera',
    updatedAt: '2026-10-30T10:30:00Z',
  },
];

export const initialActions: ActionRun[] = [
  {
    id: 'act_901',
    name: 'CI / Automated Unit & Integration Suite',
    repoName: 'core-workflow-engine',
    workflowFile: '.github/workflows/ci.yml',
    status: 'completed',
    conclusion: 'success',
    event: 'push',
    branch: 'main',
    durationSeconds: 94,
    createdAt: '2026-10-31T18:45:00Z',
    commitSha: '8f7a93c',
  },
  {
    id: 'act_902',
    name: 'Security Vulnerability & SAST Scan',
    repoName: 'core-workflow-engine',
    workflowFile: '.github/workflows/security.yml',
    status: 'completed',
    conclusion: 'success',
    event: 'schedule',
    branch: 'main',
    durationSeconds: 142,
    createdAt: '2026-10-31T12:00:00Z',
    commitSha: '8f7a93c',
  },
  {
    id: 'act_903',
    name: 'Git Sentinel Security Benchmark',
    repoName: 'git-sentinel-scanner',
    workflowFile: '.github/workflows/benchmark.yml',
    status: 'completed',
    conclusion: 'success',
    event: 'pull_request',
    branch: 'fix/symlink-scanner',
    durationSeconds: 78,
    createdAt: '2026-10-31T11:10:00Z',
    commitSha: '9c5a12f',
  },
  {
    id: 'act_904',
    name: 'Zero-Drift Docs AST Validation',
    repoName: 'docs-ai-sync',
    workflowFile: '.github/workflows/docs-lint.yml',
    status: 'completed',
    conclusion: 'success',
    event: 'push',
    branch: 'main',
    durationSeconds: 42,
    createdAt: '2026-10-31T15:25:00Z',
    commitSha: '4d2e18b',
  },
];

// 365 Days Daily Tasks Generation
export const generate365DailyTasks = (): DailyTask[] => {
  const tasks: DailyTask[] = [];
  const baseDate = new Date('2026-01-01T00:00:00Z');
  
  // Specific targets from prompt: Day 001: 40, Day 002: 35, Day 003: 41, Day 004: 28, Day 005: 36 ...
  const sampleTargets = [40, 35, 41, 28, 36, 42, 38, 44, 30, 37, 45, 33, 39, 41, 35, 43, 29, 36, 40, 38];
  const categories: TaskCategory[] = [
    'health_check',
    'documentation',
    'bug_fix',
    'test_generation',
    'dependency_analysis',
    'code_quality',
    'pr_prep',
    'security_scan',
  ];

  const repoNames = [
    'core-workflow-engine',
    'git-sentinel-scanner',
    'docs-ai-sync',
    'react-enterprise-kit',
  ];

  const taskTitles = [
    'Audit dependency vulnerabilities and verify zero high CVEs',
    'Generate comprehensive unit tests for state machine transitions',
    'Synchronize API reference documentation with TypeScript types',
    'Verify code formatting and enforce strict ESLint rule set',
    'Prepare changelog and release notes for upcoming semantic patch',
    'Scan git commit tree for accidental API token leakage',
    'Benchmark database query latency and add Redis caching hooks',
    'Automate pull request description generation with diff context',
    'Refactor error handling pipeline to eliminate unhandled rejections',
    'Perform dead code analysis and prune unused exported functions',
  ];

  for (let i = 1; i <= 365; i++) {
    const curDate = new Date(baseDate);
    curDate.setDate(curDate.getDate() + (i - 1));
    const dateStr = curDate.toISOString().split('T')[0];

    const targetUnits = sampleTargets[(i - 1) % sampleTargets.length] + ((i * 3) % 7);
    const category = categories[(i - 1) % categories.length];
    const repoName = repoNames[(i - 1) % repoNames.length];
    const title = taskTitles[(i - 1) % taskTitles.length];

    // Day 305 is today (Oct 31)
    const isPast = i < 305;
    const isToday = i === 305;

    let status: 'pending' | 'in_progress' | 'completed' | 'skipped' = 'pending';
    let achievedUnits = 0;

    if (isPast) {
      status = 'completed';
      achievedUnits = targetUnits;
    } else if (isToday) {
      status = 'in_progress';
      achievedUnits = Math.floor(targetUnits * 0.75);
    } else {
      status = 'pending';
      achievedUnits = 0;
    }

    tasks.push({
      id: `task_day_${String(i).padStart(3, '0')}`,
      dayNumber: i,
      date: dateStr,
      title: `Day ${String(i).padStart(3, '0')}: ${title}`,
      description: `Targeting ${targetUnits} activity units across ${repoName}. Verified legitimate repository operations only.`,
      category,
      status,
      targetUnits,
      achievedUnits,
      repoName,
      branch: 'main',
      prNumber: isPast ? 100 + i : undefined,
      prUrl: isPast ? `https://github.com/alexrivera-dev/${repoName}/pull/${100 + i}` : undefined,
      executionLog: [
        `[${dateStr} 08:00:00] Initialized scheduled day ${i} automation runner.`,
        `[${dateStr} 08:00:15] Repository health check passed on branch 'main'.`,
        `[${dateStr} 08:01:00] Target activity units: ${targetUnits}. Operations queued.`,
        isPast || isToday ? `[${dateStr} 08:04:30] Executed validation suites. Achieved: ${achievedUnits} units.` : 'Pending schedule trigger.',
      ],
    });
  }

  return tasks;
};

export const initialWorkflows: AutomationWorkflow[] = [
  {
    id: 'wf_01',
    name: 'Autonomous Repository Health & Security Sentinel',
    description: 'Continuously monitors dependency trees, verifies git commit signatures, and scans for credential leaks.',
    triggerType: 'scheduled',
    cronExpression: '0 0 * * *',
    status: 'active',
    targetRepo: 'core-workflow-engine',
    targetBranch: 'main',
    lastRunAt: '2026-10-31T00:00:00Z',
    runCount: 312,
    successRate: 99.4,
    nodes: [
      { id: 'node_1', type: 'repo_source', label: 'GitHub Repository: core-workflow-engine', x: 80, y: 150 },
      { id: 'node_2', type: 'repo_monitor', label: 'Continuous Health Monitor', x: 320, y: 150 },
      { id: 'node_3', type: 'ai_analysis', label: 'AI Security Scanner', x: 560, y: 150 },
      { id: 'node_4', type: 'automated_tests', label: 'Regression Test Suite', x: 800, y: 150 },
      { id: 'node_5', type: 'user_approval', label: 'Architect Gate Approval', x: 1040, y: 150 },
      { id: 'node_6', type: 'git_commit_pr', label: 'Create Verified Pull Request', x: 1280, y: 150 },
      { id: 'node_7', type: 'analytics_notify', label: 'Engine B Analytics & Webhook', x: 1520, y: 150 },
    ],
    edges: [
      { id: 'e1-2', source: 'node_1', target: 'node_2' },
      { id: 'e2-3', source: 'node_2', target: 'node_3' },
      { id: 'e3-4', source: 'node_3', target: 'node_4' },
      { id: 'e4-5', source: 'node_4', target: 'node_5' },
      { id: 'e5-6', source: 'node_5', target: 'node_6' },
      { id: 'e6-7', source: 'node_6', target: 'node_7' },
    ],
  },
  {
    id: 'wf_02',
    name: 'Zero-Drift Markdown Documentation Synchronizer',
    description: 'Extracts code symbols, docstrings, and exported TypeScript types; regenerates documentation files.',
    triggerType: 'webhook',
    status: 'active',
    targetRepo: 'docs-ai-sync',
    targetBranch: 'main',
    lastRunAt: '2026-10-31T15:20:00Z',
    runCount: 189,
    successRate: 98.9,
    nodes: [
      { id: 'n1', type: 'repo_source', label: 'Webhook Trigger: Push to main', x: 80, y: 120 },
      { id: 'n2', type: 'ai_analysis', label: 'AST Type Ingestion', x: 340, y: 120 },
      { id: 'n3', type: 'code_changes', label: 'Generate API Markdown', x: 600, y: 120 },
      { id: 'n4', type: 'automated_tests', label: 'Markdown Syntax & Link Verification', x: 860, y: 120 },
      { id: 'n5', type: 'git_commit_pr', label: 'Direct Commit & Push', x: 1120, y: 120 },
    ],
    edges: [
      { id: 'e1', source: 'n1', target: 'n2' },
      { id: 'e2', source: 'n2', target: 'n3' },
      { id: 'e3', source: 'n3', target: 'n4' },
      { id: 'e4', source: 'n4', target: 'n5' },
    ],
  },
  {
    id: 'wf_03',
    name: 'Daily Test Generation & Quality Enforcer',
    description: 'Discovers uncovered code branches in recent commits and constructs high-coverage unit tests.',
    triggerType: 'scheduled',
    cronExpression: '0 6 * * *',
    status: 'active',
    targetRepo: 'react-enterprise-kit',
    targetBranch: 'main',
    lastRunAt: '2026-10-31T06:00:00Z',
    runCount: 204,
    successRate: 97.5,
    nodes: [
      { id: 't1', type: 'repo_source', label: 'Daily Cron Trigger (06:00 UTC)', x: 80, y: 100 },
      { id: 't2', type: 'repo_monitor', label: 'Coverage Delta Calculation', x: 340, y: 100 },
      { id: 't3', type: 'ai_analysis', label: 'AI Test Synthesizer', x: 600, y: 100 },
      { id: 't4', type: 'user_approval', label: 'Dev Review', x: 860, y: 100 },
      { id: 't5', type: 'git_commit_pr', label: 'Draft Pull Request', x: 1120, y: 100 },
    ],
    edges: [
      { id: 'et1', source: 't1', target: 't2' },
      { id: 'et2', source: 't2', target: 't3' },
      { id: 'et3', source: 't3', target: 't4' },
      { id: 'et4', source: 't4', target: 't5' },
    ],
  },
];

export const initialAISuggestions: AISuggestion[] = [
  {
    id: 'sug_01',
    repoName: 'core-workflow-engine',
    fileTarget: 'src/engine/lock-manager.ts',
    title: 'Prevent race condition by implementing double-check locking with Redis TTL',
    category: 'bug_fix',
    severity: 'high',
    explanation:
      'The current mutex release does not verify ownership token before clearing the key. If a workflow run exceeds TTL, a concurrent task could acquire the lock while the previous one releases it prematurely.',
    diffCode: `@@ -45,7 +45,12 @@
-  async releaseLock(key: string): Promise<boolean> {
-    return await this.redis.del(key);
+  async releaseLock(key: string, lockToken: string): Promise<boolean> {
+    const luaScript = \`
+      if redis.call("get", KEYS[1]) == ARGV[1] then
+        return redis.call("del", KEYS[1])
+      else
+        return 0
+      end\`;
+    const result = await this.redis.eval(luaScript, 1, key, lockToken);
+    return result === 1;
   }`,
    status: 'pending',
    createdAt: '2026-10-31T17:30:00Z',
  },
  {
    id: 'sug_02',
    repoName: 'git-sentinel-scanner',
    fileTarget: 'scanner/ast_parser.go',
    title: 'Add support for Go 1.23 range over integers and iterators',
    category: 'refactor',
    severity: 'medium',
    explanation:
      'Modernize loop structures using Go 1.23 slice iterators to reduce slice allocations during deep symbol tree traversals.',
    diffCode: `@@ -112,6 +112,5 @@
-  for i := 0; i < len(node.Children); i++ {
-    child := node.Children[i]
+  for child := range slices.Values(node.Children) {
     traverse(child, depth + 1)
   }`,
    status: 'pending',
    createdAt: '2026-10-31T14:15:00Z',
  },
  {
    id: 'sug_03',
    repoName: 'docs-ai-sync',
    fileTarget: 'README.md',
    title: 'Generate missing documentation for Webhook signature verification',
    category: 'documentation',
    severity: 'low',
    explanation:
      'Exported function `verifyGitHubWebhookSignature` has no usage example in the quick start guide.',
    diffCode: `@@ -80,4 +80,10 @@
+### Webhook Verification
+Ensure every incoming webhook is authentic:
+\`\`\`typescript
+import { verifySignature } from 'git-flow-sdk';
+const isValid = verifySignature(payload, signature, process.env.WEBHOOK_SECRET);
+\`\`\`
`,
    status: 'approved',
    createdAt: '2026-10-30T19:00:00Z',
  },
];

export const initialTeams: TeamMember[] = [
  {
    id: 'tm_01',
    name: 'Alex Rivera',
    email: 'alex.rivera@gitflow.dev',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80',
    role: 'Leader',
    assignedRepos: ['core-workflow-engine', 'git-sentinel-scanner'],
    tasksAssigned: 18,
    streakDays: 312,
  },
  {
    id: 'tm_02',
    name: 'Elena Rostova',
    email: 'elena.rostova@gitflow.dev',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=128&q=80',
    role: 'Core Dev',
    assignedRepos: ['react-enterprise-kit', 'docs-ai-sync'],
    tasksAssigned: 14,
    streakDays: 240,
  },
  {
    id: 'tm_03',
    name: 'Marcus Chen',
    email: 'marcus.chen@gitflow.dev',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&q=80',
    role: 'Maintainer',
    assignedRepos: ['microservice-auth-gateway'],
    tasksAssigned: 11,
    streakDays: 188,
  },
  {
    id: 'tm_04',
    name: 'Sarah Connor',
    email: 'sarah.connor@gitflow.dev',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&q=80',
    role: 'Contributor',
    assignedRepos: ['cloud-infra-terraform'],
    tasksAssigned: 9,
    streakDays: 154,
  },
];

export const initialOrganization: OrganizationInfo = {
  id: 'org_enterprise_01',
  name: 'Git Flow Global Labs',
  slug: 'gitflow-global',
  plan: 'enterprise',
  avatarUrl: 'https://git-scm.com/images/logos/downloads/Git-Logo-2Color.png',
  memberCount: 48,
  repoCount: 26,
  activeWorkflows: 84,
  samlSsoEnabled: true,
};

export const initialNotifications: NotificationItem[] = [
  {
    id: 'notif_01',
    title: 'Day 305 Task Target Achieved',
    message: 'Completed 38/41 activity units for today across core-workflow-engine.',
    category: 'streak',
    type: 'success',
    read: false,
    timestamp: '10 minutes ago',
    link: '/tasks',
  },
  {
    id: 'notif_02',
    title: 'Autonomous Security Sentinel Passed',
    message: 'Zero vulnerabilities detected across 6 monitored production repositories.',
    category: 'security',
    type: 'info',
    read: false,
    timestamp: '2 hours ago',
    link: '/security',
  },
  {
    id: 'notif_03',
    title: 'AI Code Suggestion Ready for Review',
    message: 'High priority mutex fix proposed for core-workflow-engine lock-manager.ts.',
    category: 'ai',
    type: 'warning',
    read: true,
    timestamp: '4 hours ago',
    link: '/ai-assistant',
  },
  {
    id: 'notif_04',
    title: 'GitHub Webhook Ping Synchronized',
    message: 'Repository commits and branches synced with official GitHub API v3.',
    category: 'github',
    type: 'success',
    read: true,
    timestamp: '6 hours ago',
    link: '/contribution-intelligence',
  },
];
