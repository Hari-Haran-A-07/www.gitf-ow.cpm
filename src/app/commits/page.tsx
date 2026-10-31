'use client';

import React, { useState } from 'react';
import { ConsoleLayout } from '@/components/layout/ConsoleLayout';
import { useGitFlow } from '@/lib/store';
import {
  GitCommit,
  Search,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Filter,
} from 'lucide-react';

export default function CommitExplorerPage() {
  const { commits, repositories } = useGitFlow();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRepo, setSelectedRepo] = useState('all');

  const filteredCommits = commits.filter((c) => {
    const matchesSearch =
      c.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.sha.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.author.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRepo = selectedRepo === 'all' || c.repoName === selectedRepo;
    return matchesSearch && matchesRepo;
  });

  return (
    <ConsoleLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-git-orange uppercase tracking-wider bg-git-orange/10 px-2 py-0.5 rounded border border-git-orange/20">
                MODULE 14 • GIT OPERATIONS
              </span>
              <span className="text-xs text-text-dim font-mono">{commits.length} Recorded Commits</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-black text-white">
              Commit Explorer
            </h1>
            <p className="text-xs text-text-muted mt-1">
              Synchronized official Git commit tree with verified GPG signatures and diff telemetry.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-status-success/10 border border-status-success/20 text-status-success text-xs font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>GPG Verification Active</span>
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 rounded-xl bg-bg-surface border border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-text-dim absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search commit SHA, message, author..."
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-bg-elevated border border-border text-xs text-white placeholder-text-dim focus:outline-none focus:border-git-orange font-mono"
            />
          </div>

          <select
            value={selectedRepo}
            onChange={(e) => setSelectedRepo(e.target.value)}
            className="px-3 py-2 rounded-lg bg-bg-elevated border border-border text-xs font-mono text-white focus:outline-none focus:border-git-orange cursor-pointer w-full md:w-auto"
          >
            <option value="all">All Repositories</option>
            {repositories.map((r) => (
              <option key={r.id} value={r.name}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        {/* Commits List */}
        <div className="space-y-3">
          {filteredCommits.map((c) => (
            <div
              key={c.sha}
              className="p-4 rounded-xl bg-bg-surface border border-border hover:border-border-bright transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <GitCommit className="w-4 h-4 text-git-orange" />
                  <span className="text-white font-medium text-sm">{c.message}</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-text-dim text-[11px]">
                  <span>{c.author.name} ({c.author.email})</span>
                  <span>•</span>
                  <span>{new Date(c.date).toLocaleString()}</span>
                  <span>•</span>
                  <span className="text-git-orange font-semibold">{c.repoName}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0">
                {/* Additions / Deletions */}
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-status-success">+{c.additions}</span>
                  <span className="text-status-error">-{c.deletions}</span>
                </div>

                {/* Verified Badge */}
                {c.verified && (
                  <span className="flex items-center gap-1 text-[10px] text-status-success bg-status-success/10 border border-status-success/20 px-2 py-0.5 rounded">
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </span>
                )}

                {/* SHA */}
                <span className="px-2.5 py-1 rounded bg-bg-elevated border border-border text-git-orange">
                  {c.sha}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ConsoleLayout>
  );
}
