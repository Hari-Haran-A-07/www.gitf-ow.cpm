export type UserRole =
  | 'developer'
  | 'student'
  | 'freelancer'
  | 'team_member'
  | 'team_leader'
  | 'org_admin'
  | 'platform_admin';

export type SaaSPlan = 'free' | 'pro' | 'team' | 'enterprise';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
  plan: SaaSPlan;
  githubConnected: boolean;
  githubUsername?: string;
  githubAvatar?: string;
  bio?: string;
  location?: string;
  company?: string;
  createdAt: string;
  twoFactorEnabled: boolean;
}

export interface Repository {
  id: string;
  name: string;
  fullName: string;
  owner: string;
  description: string;
  stars: number;
  forks: number;
  openIssues: number;
  isPrivate: boolean;
  defaultBranch: string;
  language: string;
  topics: string[];
  lastSyncAt: string;
  automationEnabled: boolean;
  healthScore: number;
  url: string;
}

export interface CommitRecord {
  sha: string;
  message: string;
  author: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
  date: string;
  repoName: string;
  additions: number;
  deletions: number;
  verified: boolean;
  url?: string;
}

export interface PullRequest {
  id: number;
  number: number;
  title: string;
  author: string;
  avatarUrl?: string;
  state: 'open' | 'closed' | 'merged';
  createdAt: string;
  updatedAt: string;
  branch: string;
  repoName: string;
  reviewStatus: 'approved' | 'changes_requested' | 'pending' | 'reviewing';
  additions: number;
  deletions: number;
  commentsCount: number;
}

export interface IssueRecord {
  id: number;
  number: number;
  title: string;
  author: string;
  state: 'open' | 'closed';
  createdAt: string;
  repoName: string;
  labels: { name: string; color: string }[];
  commentsCount: number;
}

export interface BranchRecord {
  name: string;
  repoName: string;
  isDefault: boolean;
  isProtected: boolean;
  lastCommitSha: string;
  lastCommitMessage: string;
  author: string;
  updatedAt: string;
}

export interface ActionRun {
  id: string;
  name: string;
  repoName: string;
  workflowFile: string;
  status: 'completed' | 'in_progress' | 'queued' | 'failed';
  conclusion: 'success' | 'failure' | 'neutral' | 'cancelled' | null;
  event: string;
  branch: string;
  durationSeconds: number;
  createdAt: string;
  commitSha: string;
}

export type TaskCategory =
  | 'health_check'
  | 'documentation'
  | 'bug_fix'
  | 'test_generation'
  | 'dependency_analysis'
  | 'code_quality'
  | 'pr_prep'
  | 'security_scan';

export interface DailyTask {
  id: string;
  dayNumber: number;
  date: string;
  title: string;
  description: string;
  category: TaskCategory;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
  targetUnits: number;
  achievedUnits: number;
  repoName: string;
  branch: string;
  prNumber?: number;
  prUrl?: string;
  executionLog?: string[];
}

export interface WorkflowNode {
  id: string;
  type:
    | 'repo_source'
    | 'repo_monitor'
    | 'ai_analysis'
    | 'task_identifier'
    | 'code_changes'
    | 'automated_tests'
    | 'security_scan'
    | 'user_approval'
    | 'git_commit_pr'
    | 'github_sync'
    | 'analytics_notify';
  label: string;
  status?: 'idle' | 'running' | 'success' | 'failed';
  config?: Record<string, any>;
  x: number;
  y: number;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
}

export interface AutomationWorkflow {
  id: string;
  name: string;
  description: string;
  triggerType: 'scheduled' | 'webhook' | 'manual';
  cronExpression?: string;
  status: 'active' | 'paused' | 'stopped';
  targetRepo: string;
  targetBranch: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  lastRunAt: string;
  runCount: number;
  successRate: number;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  workflowName: string;
  targetRepo: string;
  status: 'success' | 'failed' | 'running';
  startedAt: string;
  durationSeconds: number;
  steps: {
    name: string;
    status: 'success' | 'failed' | 'running';
    durationMs: number;
    details: string;
  }[];
  logs: string[];
}

export interface GitHubContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface EngineAContributionIntelligence {
  totalCommits: number;
  totalPullRequests: number;
  totalIssuesOpened: number;
  totalCodeReviews: number;
  currentStreakDays: number;
  longestStreakDays: number;
  activeDaysLast365: number;
  yearTotalContributions: number;
  calendarData: GitHubContributionDay[];
  monthlyBreakdown: { month: string; commits: number; prs: number; reviews: number }[];
  topLanguages: { language: string; percentage: number; color: string }[];
}

export interface EngineBAutomationIntelligence {
  totalAutomatedTasks: number;
  documentationUpdates: number;
  testExecutions: number;
  successfulWorkflows: number;
  failedWorkflows: number;
  repositoryMaintenanceCount: number;
  aiSuggestionsGenerated: number;
  approvedChangesCount: number;
  estimatedHoursSaved: number;
  dailyOperationsHistory: { date: string; operations: number; healthScore: number }[];
  operationTypeBreakdown: { type: string; count: number }[];
}

export interface AISuggestion {
  id: string;
  repoName: string;
  fileTarget: string;
  title: string;
  category: 'documentation' | 'test' | 'refactor' | 'security' | 'bug_fix';
  severity: 'low' | 'medium' | 'high';
  explanation: string;
  diffCode: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: 'Leader' | 'Core Dev' | 'Maintainer' | 'Contributor';
  assignedRepos: string[];
  tasksAssigned: number;
  streakDays: number;
}

export interface OrganizationInfo {
  id: string;
  name: string;
  slug: string;
  plan: SaaSPlan;
  avatarUrl: string;
  memberCount: number;
  repoCount: number;
  activeWorkflows: number;
  samlSsoEnabled: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: 'workflow' | 'github' | 'security' | 'streak' | 'ai';
  type: 'success' | 'warning' | 'error' | 'info';
  read: boolean;
  timestamp: string;
  link?: string;
}
