'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ConsoleLayout } from '@/components/layout/ConsoleLayout';
import { useGitFlow } from '@/lib/store';
import {
  FolderGit2,
  GitBranch,
  GitCommit,
  GitPullRequest,
  AlertCircle,
  ShieldCheck,
  Zap,
  Play,
  Star,
  GitFork,
  ExternalLink,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';

export default function RepositoryDetailPage() {
  const params = useParams();
  const repoId = (params?.id as string) || 'repo_01';
  const { repositories, commits, pullRequests, issues, workflows, toggleRepoAutomation } = useGitFlow();

  const repo = repositories.find((r) => r.id === repoId) || repositories[0];
  const repoCommits = commits.filter((c) => c.repoName.includes(repo.name) || repo.name.includes(c.repoName));
  const repoPrs = pullRequests.filter((pr) => pr.repoName.includes(repo.name));
  const repoIssues = issues.filter((i) => i.repoName.includes(repo.name));
  const repoWorkflows = workflows.filter((w) => w.targetRepo.includes(repo.name));

  const [activeTab, setActiveTab] = useState<'overview' | 'commits' | 'prs' | 'issues' | 'workflows'>('overview');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  const handleScanNow = () => {
    setIsScanning(true);
    setScanResult(null);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult('Scan completed: Zero high CVEs detected. Code AST in full synchronization.');
    }, 1200);
  };

  return (
    <ConsoleLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Navigation & Header */}
        <div className="space-y-4">
          <Link
            href="/repositories"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-text-muted hover:text-white"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Repository Explorer</span>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 rounded-2xl bg-bg-surface border border-border">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-git-orange uppercase tracking-wider bg-git-orange/10 px-2 py-0.5 rounded border border-git-orange/20">
                  MODULE 07 • REPOSITORY DETAILS
                </span>
                <span className="text-xs font-mono text-text-dim">Branch: {repo.defaultBranch}</span>
              </div>
              <h1 className="font-heading font-black text-2xl sm:text-3xl text-white flex items-center gap-2">
                <FolderGit2 className="w-6 h-6 text-git-orange" />
                <span>{repo.fullName}</span>
              </h1>
              <p className="text-xs text-text-muted max-w-2xl leading-relaxed">
                {repo.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-bg-elevated border border-border text-xs font-mono text-text-muted hover:text-white transition-all"
              >
                <span>GitHub</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleScanNow}
                disabled={isScanning}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-bg-elevated hover:bg-bg-elevated/80 border border-brand-purple text-xs font-mono text-white transition-all shadow-sm disabled:opacity-50"
              >
                <Sparkles className={`w-3.5 h-3.5 text-brand-electric ${isScanning ? 'animate-spin' : ''}`} />
                <span>{isScanning ? 'Running Sentinel...' : 'Scan Repository'}</span>
              </button>

              <button
                onClick={() => toggleRepoAutomation(repo.id)}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 border transition-all ${
                  repo.automationEnabled
                    ? 'bg-status-success/10 border-status-success/30 text-status-success'
                    : 'bg-bg-elevated border-border text-text-dim'
                }`}
              >
                <Zap className={`w-3.5 h-3.5 ${repo.automationEnabled ? 'fill-status-success' : ''}`} />
                <span>{repo.automationEnabled ? 'Automation ON' : 'Automation OFF'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scan Result Alert */}
        {scanResult && (
          <div className="p-4 rounded-xl bg-status-success/10 border border-status-success/30 flex items-center gap-3 text-xs font-mono text-status-success">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{scanResult}</span>
          </div>
        )}

        {/* Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-bg-surface border border-border">
            <span className="text-[10px] font-mono text-text-dim uppercase">Health Score</span>
            <div className="font-heading font-black text-2xl text-status-success mt-1">
              {repo.healthScore}%
            </div>
          </div>
          <div className="p-4 rounded-xl bg-bg-surface border border-border">
            <span className="text-[10px] font-mono text-text-dim uppercase">GitHub Stars</span>
            <div className="font-heading font-black text-2xl text-white mt-1">
              {repo.stars}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-bg-surface border border-border">
            <span className="text-[10px] font-mono text-text-dim uppercase">Forks</span>
            <div className="font-heading font-black text-2xl text-white mt-1">
              {repo.forks}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-bg-surface border border-border">
            <span className="text-[10px] font-mono text-text-dim uppercase">Open Issues</span>
            <div className="font-heading font-black text-2xl text-status-warning mt-1">
              {repo.openIssues}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border flex items-center gap-6 text-xs font-mono">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'commits', label: `Commits (${repoCommits.length})` },
            { id: 'prs', label: `Pull Requests (${repoPrs.length})` },
            { id: 'issues', label: `Issues (${repoIssues.length})` },
            { id: 'workflows', label: `Workflows (${repoWorkflows.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 border-b-2 transition-all font-semibold ${
                activeTab === tab.id
                  ? 'border-git-orange text-git-orange'
                  : 'border-transparent text-text-muted hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-4">
              <h3 className="font-heading font-bold text-sm text-white">Repository Configuration</h3>
              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 rounded bg-bg-elevated flex justify-between">
                  <span className="text-text-dim">Language</span>
                  <span className="text-white">{repo.language}</span>
                </div>
                <div className="p-2.5 rounded bg-bg-elevated flex justify-between">
                  <span className="text-text-dim">Default Branch</span>
                  <span className="text-git-orange">{repo.defaultBranch}</span>
                </div>
                <div className="p-2.5 rounded bg-bg-elevated flex justify-between">
                  <span className="text-text-dim">Visibility</span>
                  <span className="text-status-success">{repo.isPrivate ? 'Private' : 'Public'}</span>
                </div>
                <div className="p-2.5 rounded bg-bg-elevated flex justify-between">
                  <span className="text-text-dim">Last Synchronized</span>
                  <span className="text-text-muted">{new Date(repo.lastSyncAt).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-4">
              <h3 className="font-heading font-bold text-sm text-white">Active Automation Workflows</h3>
              {repoWorkflows.length > 0 ? (
                repoWorkflows.map((wf) => (
                  <div key={wf.id} className="p-3 rounded-xl bg-bg-elevated border border-border space-y-1 text-xs">
                    <div className="flex items-center justify-between font-mono">
                      <span className="text-white font-semibold">{wf.name}</span>
                      <span className="text-[10px] text-status-success bg-status-success/10 px-1.5 py-0.5 rounded">
                        {wf.status}
                      </span>
                    </div>
                    <p className="text-text-muted text-[11px]">{wf.description}</p>
                  </div>
                ))
              ) : (
                <div className="text-xs text-text-muted font-mono p-4 text-center">
                  No custom workflow assigned. Default sentinel enabled.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'commits' && (
          <div className="space-y-3">
            {repoCommits.map((c) => (
              <div key={c.sha} className="p-4 rounded-xl bg-bg-surface border border-border flex items-center justify-between text-xs font-mono">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <GitCommit className="w-4 h-4 text-git-orange" />
                    <span className="text-white font-medium">{c.message}</span>
                  </div>
                  <div className="text-[11px] text-text-dim">
                    {c.author.name} committed on {new Date(c.date).toLocaleDateString()}
                  </div>
                </div>
                <span className="px-2 py-1 rounded bg-bg-elevated border border-border text-git-orange">
                  {c.sha}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'prs' && (
          <div className="space-y-3">
            {repoPrs.map((pr) => (
              <div key={pr.id} className="p-4 rounded-xl bg-bg-surface border border-border flex items-center justify-between text-xs font-mono">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <GitPullRequest className="w-4 h-4 text-brand-cyan" />
                    <span className="text-white font-semibold">#{pr.number} {pr.title}</span>
                  </div>
                  <div className="text-[11px] text-text-dim">
                    Branch: {pr.branch} • Review: {pr.reviewStatus}
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold text-status-success bg-status-success/10 px-2 py-0.5 rounded border border-status-success/20">
                  {pr.state}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'issues' && (
          <div className="space-y-3">
            {repoIssues.map((issue) => (
              <div key={issue.id} className="p-4 rounded-xl bg-bg-surface border border-border flex items-center justify-between text-xs font-mono">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-status-warning" />
                    <span className="text-white font-semibold">#{issue.number} {issue.title}</span>
                  </div>
                  <div className="text-[11px] text-text-dim">
                    Opened by {issue.author}
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold text-status-warning bg-status-warning/10 px-2 py-0.5 rounded border border-status-warning/20">
                  {issue.state}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'workflows' && (
          <div className="space-y-3">
            {repoWorkflows.map((wf) => (
              <div key={wf.id} className="p-4 rounded-xl bg-bg-surface border border-border flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-heading font-bold text-white text-sm">{wf.name}</h4>
                  <p className="text-text-muted text-xs mt-1">{wf.description}</p>
                </div>
                <span className="font-mono text-xs text-status-success bg-status-success/10 px-2 py-0.5 rounded border border-status-success/20">
                  Success: {wf.successRate}%
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </ConsoleLayout>
  );
}
