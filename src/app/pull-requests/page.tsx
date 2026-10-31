'use client';

import React, { useState } from 'react';
import { ConsoleLayout } from '@/components/layout/ConsoleLayout';
import { useGitFlow } from '@/lib/store';
import { PullRequest } from '@/lib/types';
import {
  GitPullRequest,
  Search,
  Plus,
  CheckCircle2,
  Clock,
  GitBranch,
  MessageSquare,
  ArrowRight,
} from 'lucide-react';

export default function PullRequestsPage() {
  const { pullRequests, repositories } = useGitFlow();
  const [filterState, setFilterState] = useState<'all' | 'open' | 'merged' | 'closed'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = pullRequests.filter((pr) => {
    const matchesState = filterState === 'all' || pr.state === filterState;
    const matchesSearch =
      pr.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pr.repoName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(pr.number).includes(searchTerm);
    return matchesState && matchesSearch;
  });

  return (
    <ConsoleLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-brand-cyan uppercase tracking-wider bg-brand-cyan/10 px-2 py-0.5 rounded border border-brand-cyan/20">
                MODULE 15 • GIT OPERATIONS
              </span>
              <span className="text-xs text-text-dim font-mono">{pullRequests.length} Total Pull Requests</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-black text-white">
              Pull Request Manager
            </h1>
            <p className="text-xs text-text-muted mt-1">
              Track, review, and merge authorized branch pull requests with automated CI status checks.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-status-success bg-status-success/10 px-3 py-1.5 rounded-lg border border-status-success/20">
              CI Branch Check: Passing
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 rounded-xl bg-bg-surface border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-text-dim absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search PR title, repository, #number..."
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-bg-elevated border border-border text-xs text-white placeholder-text-dim focus:outline-none focus:border-git-orange font-mono"
            />
          </div>

          <div className="flex items-center p-1 rounded-lg bg-bg-elevated border border-border text-xs font-mono">
            {['all', 'open', 'merged', 'closed'].map((s) => (
              <button
                key={s}
                onClick={() => setFilterState(s as any)}
                className={`px-3 py-1.5 rounded-md capitalize transition-all ${
                  filterState === s ? 'bg-bg-surface text-white shadow-sm' : 'text-text-muted hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* PR List */}
        <div className="space-y-3">
          {filtered.map((pr) => (
            <div
              key={pr.id}
              className="p-5 rounded-2xl bg-bg-surface border border-border hover:border-border-bright transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                      pr.state === 'open'
                        ? 'text-status-success bg-status-success/10 border-status-success/20'
                        : pr.state === 'merged'
                        ? 'text-brand-electric bg-brand-purple/10 border-brand-purple/30'
                        : 'text-text-dim bg-bg-elevated border-border'
                    }`}
                  >
                    {pr.state}
                  </span>
                  <span className="text-brand-cyan font-bold">#{pr.number}</span>
                  <span className="text-git-orange font-medium">{pr.repoName}</span>
                  <span className="text-text-dim flex items-center gap-1">
                    <GitBranch className="w-3 h-3" /> {pr.branch}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-sm text-white">{pr.title}</h3>

                <div className="flex items-center gap-3 text-text-dim text-[11px]">
                  <span>Opened by {pr.author}</span>
                  <span>•</span>
                  <span>{new Date(pr.createdAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" /> {pr.commentsCount} comments
                  </span>
                </div>
              </div>

              {/* Status and Actions */}
              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="text-right text-xs">
                  <div className="text-status-success">+{pr.additions} lines</div>
                  <div className="text-status-error">-{pr.deletions} lines</div>
                </div>

                <span
                  className={`text-[10px] uppercase px-2.5 py-1 rounded-lg border font-bold ${
                    pr.reviewStatus === 'approved'
                      ? 'text-status-success bg-status-success/10 border-status-success/30'
                      : 'text-status-warning bg-status-warning/10 border-status-warning/30'
                  }`}
                >
                  {pr.reviewStatus.replace('_', ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ConsoleLayout>
  );
}
