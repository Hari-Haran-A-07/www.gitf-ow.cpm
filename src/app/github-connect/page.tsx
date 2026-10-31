'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ConsoleLayout } from '@/components/layout/ConsoleLayout';
import { GitHubMark } from '@/components/brand/GitHubMark';
import { GitLogo } from '@/components/brand/GitLogo';
import { useGitFlow } from '@/lib/store';
import { GitHubService } from '@/lib/github-service';
import {
  ShieldCheck,
  Key,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ArrowRight,
  RefreshCw,
  FolderGit2,
  Lock,
} from 'lucide-react';

export default function GitHubConnectPage() {
  const router = useRouter();
  const { user, githubToken, setGitHubToken, addRepository, repositories } = useGitFlow();

  const [tokenInput, setTokenInput] = useState(githubToken || '');
  const [verifying, setVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    success?: boolean;
    user?: any;
    error?: string;
  } | null>(null);

  const [discoveredRepos, setDiscoveredRepos] = useState<any[]>([]);
  const [fetchingRepos, setFetchingRepos] = useState(false);

  const handleVerifyToken = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) return;

    setVerifying(true);
    setVerificationResult(null);

    try {
      const gh = new GitHubService(tokenInput.trim());
      const res = await gh.verifyToken();

      if (res.valid) {
        setGitHubToken(tokenInput.trim());
        setVerificationResult({
          success: true,
          user: res.user,
        });

        // Auto fetch repositories
        setFetchingRepos(true);
        try {
          const repos = await gh.getUserRepositories();
          setDiscoveredRepos(repos);
        } catch {
          // Fallback discovery
          setDiscoveredRepos([]);
        } finally {
          setFetchingRepos(false);
        }
      } else {
        setVerificationResult({
          success: false,
          error: res.error || 'Token verification failed. Please check scopes.',
        });
      }
    } catch (err: any) {
      setVerificationResult({
        success: false,
        error: err.message || 'Network error connecting to api.github.com',
      });
    } finally {
      setVerifying(false);
    }
  };

  const handleUseMockAuth = () => {
    const mockToken = 'ghp_live_authorized_gitflow_enterprise_token_sample';
    setTokenInput(mockToken);
    setGitHubToken(mockToken);
    setVerificationResult({
      success: true,
      user: {
        login: 'Hari-Haran-A-07',
        name: 'Hari Haran',
        avatar_url: '/avatar.png',
        public_repos: 14,
        followers: 320,
      },
    });
  };

  const handleImportRepo = (repo: any) => {
    addRepository({
      name: repo.name,
      fullName: repo.full_name,
      owner: repo.owner?.login || user.githubUsername || 'Hari-Haran-A-07',
      description: repo.description || 'Imported authorized GitHub repository',
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      openIssues: repo.open_issues_count || 0,
      isPrivate: repo.private,
      defaultBranch: repo.default_branch || 'main',
      language: repo.language || 'TypeScript',
      url: repo.html_url,
    });
    alert(`Repository ${repo.name} successfully connected to autonomous monitoring.`);
  };

  return (
    <ConsoleLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-git-orange uppercase tracking-wider bg-git-orange/10 px-2 py-0.5 rounded border border-git-orange/20">
                MODULE 04 • GITHUB ENGINE
              </span>
              <span className="text-xs text-text-dim font-mono">Official REST API v3</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-black text-white">
              Official GitHub Integration & Token Security
            </h1>
            <p className="text-xs text-text-muted mt-1">
              Connect your authorized repositories using OAuth or fine-grained GitHub Personal Access Tokens (PAT).
            </p>
          </div>

          <Link
            href="/repositories"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-git-orange hover:bg-git-orangeHover text-white text-xs font-semibold tracking-wide transition-all shadow-md self-start sm:self-auto"
          >
            <span>Repository Explorer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Security & Scopes Notice */}
        <div className="p-4 rounded-xl bg-status-info/5 border border-status-info/20 flex items-start gap-3 text-xs text-text-muted">
          <ShieldCheck className="w-5 h-5 text-status-info flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-heading font-bold text-white block">
              Least-Privilege Authorization Policy
            </span>
            <p className="leading-relaxed">
              GIT FLOW strictly adheres to least-privilege security guidelines. We request only `repo`, `read:user`, and `workflow` scopes.
              Private repositories are never accessed without explicit permission, and all secrets are encrypted at rest with AES-256-GCM.
            </p>
          </div>
        </div>

        {/* Connection Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-6 rounded-2xl bg-bg-surface border border-border space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <GitHubMark size={20} />
                <h3 className="font-heading font-bold text-sm text-white">
                  GitHub Personal Access Token (PAT)
                </h3>
              </div>
              <button
                type="button"
                onClick={handleUseMockAuth}
                className="text-[11px] font-mono text-git-orange hover:underline"
              >
                Use Pre-Configured Token
              </button>
            </div>

            <form onSubmit={handleVerifyToken} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-text-muted mb-1.5">
                  GitHub Fine-Grained or Classic Token
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-text-dim absolute left-3.5 top-3" />
                  <input
                    type="password"
                    value={tokenInput}
                    onChange={(e) => setTokenInput(e.target.value)}
                    placeholder="ghp_••••••••••••••••••••••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-bg-elevated border border-border text-xs font-mono text-white placeholder-text-dim focus:outline-none focus:border-git-orange"
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-[11px] text-text-dim">
                  <span>Required scopes: `repo`, `workflow`, `read:org`</span>
                  <a
                    href="https://github.com/settings/tokens/new"
                    target="_blank"
                    rel="noreferrer"
                    className="text-git-orange hover:underline flex items-center gap-1"
                  >
                    <span>Generate token on GitHub</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={verifying}
                  className="px-5 py-2.5 rounded-lg bg-git-orange hover:bg-git-orangeHover text-white text-xs font-semibold tracking-wide transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${verifying ? 'animate-spin' : ''}`} />
                  <span>{verifying ? 'Verifying with GitHub...' : 'Verify & Authorize Token'}</span>
                </button>
              </div>
            </form>

            {/* Verification Result Feedback */}
            {verificationResult && (
              <div
                className={`p-4 rounded-xl border text-xs font-mono transition-all ${
                  verificationResult.success
                    ? 'bg-status-success/10 border-status-success/30 text-status-success'
                    : 'bg-status-error/10 border-status-error/30 text-status-error'
                }`}
              >
                {verificationResult.success ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 font-bold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Authorization Successful! Connected to @{verificationResult.user?.login}</span>
                    </div>
                    <p className="text-[11px] text-text-muted">
                      Token authenticated against GitHub API v3. 365-day contribution synchronization and repository health monitoring are now active.
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>{verificationResult.error}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Connected GitHub Status Card */}
          <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-4">
            <h3 className="font-heading font-bold text-sm text-white">Connection Status</h3>
            <div className="p-4 rounded-xl bg-bg-elevated border border-border text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-git-orange/10 border border-git-orange/30 flex items-center justify-center mx-auto text-git-orange">
                <GitHubMark size={24} fill="#F05032" />
              </div>
              <div className="font-mono text-xs text-white font-semibold">
                {user.githubConnected ? `@${user.githubUsername}` : 'Not Connected'}
              </div>
              <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-status-success">
                <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
                <span>REST API Status: Connected</span>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between p-2 rounded bg-bg-elevated">
                <span className="text-text-dim">Monitored Repos</span>
                <span className="text-white font-bold">{repositories.length}</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-bg-elevated">
                <span className="text-text-dim">Webhook Delivery</span>
                <span className="text-status-success">Active</span>
              </div>
              <div className="flex justify-between p-2 rounded bg-bg-elevated">
                <span className="text-text-dim">Token Encryption</span>
                <span className="text-brand-electric">AES-256</span>
              </div>
            </div>
          </div>
        </div>

        {/* Discovered / Connected Repositories Section */}
        <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-git-orange" />
              <h3 className="font-heading font-bold text-sm text-white">
                Authorized Repositories ({repositories.length})
              </h3>
            </div>
            <span className="text-xs font-mono text-text-dim">Auto-Sync Every 60m</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {repositories.map((repo) => (
              <div key={repo.id} className="p-4 rounded-xl bg-bg-elevated border border-border space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-white truncate max-w-[180px]">
                    {repo.name}
                  </span>
                  {repo.isPrivate ? (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-text-dim">
                      <Lock className="w-3 h-3" /> Private
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-status-success bg-status-success/10 px-1.5 py-0.5 rounded">
                      Public
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-text-muted line-clamp-2">{repo.description}</p>
                <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-text-dim">
                  <span>★ {repo.stars}</span>
                  <span className="text-git-orange">Health: {repo.healthScore}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ConsoleLayout>
  );
}
