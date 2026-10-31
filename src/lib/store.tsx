'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import {
  UserProfile,
  Repository,
  CommitRecord,
  PullRequest,
  IssueRecord,
  BranchRecord,
  ActionRun,
  DailyTask,
  AutomationWorkflow,
  EngineAContributionIntelligence,
  EngineBAutomationIntelligence,
  AISuggestion,
  TeamMember,
  OrganizationInfo,
  NotificationItem,
} from './types';
import {
  initialUser,
  initialRepositories,
  generateEngineAData,
  initialEngineBData,
  initialCommits,
  initialPullRequests,
  initialIssues,
  initialBranches,
  initialActions,
  generate365DailyTasks,
  initialWorkflows,
  initialAISuggestions,
  initialTeams,
  initialOrganization,
  initialNotifications,
} from './mock-data';

interface GitFlowState {
  user: UserProfile;
  githubToken: string | null;
  repositories: Repository[];
  activeRepoId: string;
  commits: CommitRecord[];
  pullRequests: PullRequest[];
  issues: IssueRecord[];
  branches: BranchRecord[];
  actions: ActionRun[];
  dailyTasks: DailyTask[];
  workflows: AutomationWorkflow[];
  aiSuggestions: AISuggestion[];
  engineA: EngineAContributionIntelligence;
  engineB: EngineBAutomationIntelligence;
  teamMembers: TeamMember[];
  organization: OrganizationInfo;
  notifications: NotificationItem[];
  isCinematicIntroComplete: boolean;

  // Actions
  setGitHubToken: (token: string | null) => void;
  updateUser: (updates: Partial<UserProfile>) => void;
  toggleRepoAutomation: (repoId: string) => void;
  setActiveRepoId: (repoId: string) => void;
  updateTaskStatus: (taskId: string, status: DailyTask['status'], achievedUnits?: number) => void;
  toggleWorkflowStatus: (workflowId: string) => void;
  runWorkflowNow: (workflowId: string) => void;
  approveAISuggestion: (suggestionId: string) => void;
  rejectAISuggestion: (suggestionId: string) => void;
  markNotificationRead: (notifId: string) => void;
  clearAllNotifications: () => void;
  addRepository: (repo: Partial<Repository>) => void;
  completeIntro: () => void;
}

const GitFlowContext = createContext<GitFlowState | null>(null);

const STORAGE_KEY = 'gitflow_state_v1';

export function GitFlowProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile>(initialUser);
  const [githubToken, setGithubTokenState] = useState<string | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>(initialRepositories);
  const [activeRepoId, setActiveRepoId] = useState<string>('repo_01');
  const [commits, setCommits] = useState<CommitRecord[]>(initialCommits);
  const [pullRequests, setPullRequests] = useState<PullRequest[]>(initialPullRequests);
  const [issues, setIssues] = useState<IssueRecord[]>(initialIssues);
  const [branches, setBranches] = useState<BranchRecord[]>(initialBranches);
  const [actions, setActions] = useState<ActionRun[]>(initialActions);
  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>([]);
  const [workflows, setWorkflows] = useState<AutomationWorkflow[]>(initialWorkflows);
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestion[]>(initialAISuggestions);
  const [engineA, setEngineA] = useState<EngineAContributionIntelligence>(generateEngineAData());
  const [engineB, setEngineB] = useState<EngineBAutomationIntelligence>(initialEngineBData);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeams);
  const [organization, setOrganization] = useState<OrganizationInfo>(initialOrganization);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [isCinematicIntroComplete, setIsCinematicIntroComplete] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize daily tasks and load from localStorage
  useEffect(() => {
    try {
      const generated = generate365DailyTasks();
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.user) setUser(parsed.user);
        if (parsed.githubToken) setGithubTokenState(parsed.githubToken);
        if (parsed.repositories) setRepositories(parsed.repositories);
        if (parsed.workflows) setWorkflows(parsed.workflows);
        if (parsed.aiSuggestions) setAiSuggestions(parsed.aiSuggestions);
        if (parsed.dailyTasks && parsed.dailyTasks.length > 0) {
          setDailyTasks(parsed.dailyTasks);
        } else {
          setDailyTasks(generated);
        }
        if (parsed.isCinematicIntroComplete) setIsCinematicIntroComplete(parsed.isCinematicIntroComplete);
      } else {
        setDailyTasks(generated);
      }
    } catch {
      setDailyTasks(generate365DailyTasks());
    }
    setIsHydrated(true);
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      const toSave = {
        user,
        githubToken,
        repositories,
        workflows,
        aiSuggestions,
        dailyTasks,
        isCinematicIntroComplete,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      console.warn('Could not persist to localStorage:', e);
    }
  }, [user, githubToken, repositories, workflows, aiSuggestions, dailyTasks, isCinematicIntroComplete, isHydrated]);

  const setGitHubToken = (token: string | null) => {
    setGithubTokenState(token);
    if (token) {
      setUser((prev) => ({
        ...prev,
        githubConnected: true,
      }));
      setNotifications((prev) => [
        {
          id: `notif_${Date.now()}`,
          title: 'GitHub Token Connected',
          message: 'Official GitHub REST API authorization active with fine-grained scopes.',
          category: 'github',
          type: 'success',
          read: false,
          timestamp: 'Just now',
          link: '/github-connect',
        },
        ...prev,
      ]);
    }
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  const toggleRepoAutomation = (repoId: string) => {
    setRepositories((prev) =>
      prev.map((r) =>
        r.id === repoId ? { ...r, automationEnabled: !r.automationEnabled } : r
      )
    );
  };

  const updateTaskStatus = (taskId: string, status: DailyTask['status'], achievedUnits?: number) => {
    setDailyTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const units = achievedUnits !== undefined ? achievedUnits : status === 'completed' ? t.targetUnits : t.achievedUnits;
          return {
            ...t,
            status,
            achievedUnits: units,
            executionLog: [
              ...(t.executionLog || []),
              `[${new Date().toISOString()}] Manual status update: ${status}. Target achieved: ${units}/${t.targetUnits} units.`,
            ],
          };
        }
        return t;
      })
    );

    // Update Engine B statistics on legitimate operation
    if (status === 'completed') {
      setEngineB((prev) => ({
        ...prev,
        totalAutomatedTasks: prev.totalAutomatedTasks + 1,
        approvedChangesCount: prev.approvedChangesCount + 1,
        estimatedHoursSaved: prev.estimatedHoursSaved + 0.75,
      }));
    }
  };

  const toggleWorkflowStatus = (workflowId: string) => {
    setWorkflows((prev) =>
      prev.map((wf) => {
        if (wf.id === workflowId) {
          const newStatus = wf.status === 'active' ? 'paused' : 'active';
          return { ...wf, status: newStatus };
        }
        return wf;
      })
    );
  };

  const runWorkflowNow = (workflowId: string) => {
    const wf = workflows.find((w) => w.id === workflowId);
    if (!wf) return;

    // Increment run count and Engine B metrics
    setWorkflows((prev) =>
      prev.map((w) =>
        w.id === workflowId
          ? {
              ...w,
              runCount: w.runCount + 1,
              lastRunAt: new Date().toISOString(),
            }
          : w
      )
    );

    setEngineB((prev) => ({
      ...prev,
      successfulWorkflows: prev.successfulWorkflows + 1,
      totalAutomatedTasks: prev.totalAutomatedTasks + 1,
      estimatedHoursSaved: prev.estimatedHoursSaved + 1.2,
    }));

    setNotifications((prev) => [
      {
        id: `notif_${Date.now()}`,
        title: `Workflow Executed: ${wf.name}`,
        message: `Pipeline succeeded across branch '${wf.targetBranch}' in ${wf.targetRepo}.`,
        category: 'workflow',
        type: 'success',
        read: false,
        timestamp: 'Just now',
        link: '/automation',
      },
      ...prev,
    ]);
  };

  const approveAISuggestion = (suggestionId: string) => {
    const sug = aiSuggestions.find((s) => s.id === suggestionId);
    if (!sug) return;

    setAiSuggestions((prev) =>
      prev.map((s) => (s.id === suggestionId ? { ...s, status: 'approved' } : s))
    );

    // Creates legitimate PR in mock PRs and increments Engine B approved changes
    const newPrNumber = 100 + pullRequests.length + 1;
    const newPr: PullRequest = {
      id: newPrNumber,
      number: newPrNumber,
      title: `auto(${sug.category}): ${sug.title}`,
      author: 'gitflow-autonomous-agent',
      state: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      branch: `auto/${sug.category}-${Date.now().toString().slice(-4)}`,
      repoName: sug.repoName,
      reviewStatus: 'approved',
      additions: 24,
      deletions: 6,
      commentsCount: 1,
    };

    setPullRequests((prev) => [newPr, ...prev]);

    setEngineB((prev) => ({
      ...prev,
      approvedChangesCount: prev.approvedChangesCount + 1,
      totalAutomatedTasks: prev.totalAutomatedTasks + 1,
      estimatedHoursSaved: prev.estimatedHoursSaved + 1.5,
    }));

    setNotifications((prev) => [
      {
        id: `notif_${Date.now()}`,
        title: 'AI Change Approved & PR Prepared',
        message: `Created verified PR #${newPrNumber} for ${sug.repoName}. Ready for merge.`,
        category: 'ai',
        type: 'success',
        read: false,
        timestamp: 'Just now',
        link: '/pull-requests',
      },
      ...prev,
    ]);
  };

  const rejectAISuggestion = (suggestionId: string) => {
    setAiSuggestions((prev) =>
      prev.map((s) => (s.id === suggestionId ? { ...s, status: 'rejected' } : s))
    );
  };

  const markNotificationRead = (notifId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const addRepository = (repo: Partial<Repository>) => {
    const newRepo: Repository = {
      id: `repo_${Date.now()}`,
      name: repo.name || 'new-repo',
      fullName: repo.fullName || `alexrivera-dev/${repo.name || 'new-repo'}`,
      owner: repo.owner || 'alexrivera-dev',
      description: repo.description || 'Imported authorized GitHub repository.',
      stars: repo.stars || 0,
      forks: repo.forks || 0,
      openIssues: repo.openIssues || 0,
      isPrivate: repo.isPrivate ?? false,
      defaultBranch: repo.defaultBranch || 'main',
      language: repo.language || 'TypeScript',
      topics: repo.topics || ['automation'],
      lastSyncAt: new Date().toISOString(),
      automationEnabled: true,
      healthScore: 95,
      url: repo.url || `https://github.com/alexrivera-dev/${repo.name}`,
    };
    setRepositories((prev) => [newRepo, ...prev]);
  };

  const completeIntro = () => {
    setIsCinematicIntroComplete(true);
  };

  return (
    <GitFlowContext.Provider
      value={{
        user,
        githubToken,
        repositories,
        activeRepoId,
        commits,
        pullRequests,
        issues,
        branches,
        actions,
        dailyTasks,
        workflows,
        aiSuggestions,
        engineA,
        engineB,
        teamMembers,
        organization,
        notifications,
        isCinematicIntroComplete,
        setGitHubToken,
        updateUser,
        toggleRepoAutomation,
        setActiveRepoId,
        updateTaskStatus,
        toggleWorkflowStatus,
        runWorkflowNow,
        approveAISuggestion,
        rejectAISuggestion,
        markNotificationRead,
        clearAllNotifications,
        addRepository,
        completeIntro,
      }}
    >
      {children}
    </GitFlowContext.Provider>
  );
}

export function useGitFlow() {
  const context = useContext(GitFlowContext);
  if (!context) {
    throw new Error('useGitFlow must be used within a GitFlowProvider');
  }
  return context;
}
