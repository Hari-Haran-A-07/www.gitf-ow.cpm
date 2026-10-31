/**
 * Official GitHub API v3 Service
 * Connects directly to https://api.github.com using Personal Access Token (PAT)
 * or authenticated OAuth bearer token.
 */

export interface GitHubApiRepo {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  default_branch: string;
  topics?: string[];
  updated_at: string;
}

export interface GitHubApiCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      email: string;
      date: string;
    };
  };
  author?: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
}

export interface GitHubApiPullRequest {
  id: number;
  number: number;
  title: string;
  state: 'open' | 'closed';
  user: {
    login: string;
    avatar_url: string;
  };
  created_at: string;
  updated_at: string;
  head: {
    ref: string;
  };
  html_url: string;
}

export interface GitHubApiIssue {
  id: number;
  number: number;
  title: string;
  state: 'open' | 'closed';
  user: {
    login: string;
  };
  labels: { name: string; color: string }[];
  comments: number;
  created_at: string;
  html_url: string;
  pull_request?: any;
}

export class GitHubService {
  private token: string | null = null;
  private baseUrl = 'https://api.github.com';

  constructor(token?: string | null) {
    if (token) {
      this.token = token;
    }
  }

  setToken(token: string) {
    this.token = token;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'GIT-FLOW-Autonomous-Ecosystem-v1',
    };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  async verifyToken(): Promise<{ valid: boolean; user?: any; error?: string }> {
    if (!this.token) return { valid: false, error: 'No token provided' };
    try {
      const res = await fetch(`${this.baseUrl}/user`, {
        headers: this.getHeaders(),
      });
      if (res.ok) {
        const user = await res.json();
        return { valid: true, user };
      }
      return { valid: false, error: `GitHub API error: ${res.statusText}` };
    } catch (e: any) {
      return { valid: false, error: e.message || 'Network error' };
    }
  }

  async getUserRepositories(username?: string): Promise<GitHubApiRepo[]> {
    const endpoint = this.token
      ? `${this.baseUrl}/user/repos?sort=updated&per_page=30`
      : username
      ? `${this.baseUrl}/users/${username}/repos?sort=updated&per_page=30`
      : `${this.baseUrl}/orgs/octocat/repos?per_page=10`;

    const res = await fetch(endpoint, {
      headers: this.getHeaders(),
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch repositories (${res.status})`);
    }
    return await res.json();
  }

  async getRepoCommits(owner: string, repo: string): Promise<GitHubApiCommit[]> {
    const res = await fetch(`${this.baseUrl}/repos/${owner}/${repo}/commits?per_page=20`, {
      headers: this.getHeaders(),
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch commits for ${owner}/${repo}`);
    }
    return await res.json();
  }

  async getRepoPullRequests(owner: string, repo: string): Promise<GitHubApiPullRequest[]> {
    const res = await fetch(`${this.baseUrl}/repos/${owner}/${repo}/pulls?state=all&per_page=15`, {
      headers: this.getHeaders(),
    });
    if (!res.ok) {
      return [];
    }
    return await res.json();
  }

  async getRepoIssues(owner: string, repo: string): Promise<GitHubApiIssue[]> {
    const res = await fetch(`${this.baseUrl}/repos/${owner}/${repo}/issues?state=all&per_page=15`, {
      headers: this.getHeaders(),
    });
    if (!res.ok) {
      return [];
    }
    const data: GitHubApiIssue[] = await res.json();
    // Filter out pull requests since GitHub API issues endpoint returns PRs too
    return data.filter((item) => !item.pull_request);
  }

  async getRepoBranches(owner: string, repo: string): Promise<{ name: string; protected: boolean }[]> {
    const res = await fetch(`${this.baseUrl}/repos/${owner}/${repo}/branches?per_page=20`, {
      headers: this.getHeaders(),
    });
    if (!res.ok) {
      return [{ name: 'main', protected: true }];
    }
    return await res.json();
  }
}
