'use client';

import React, { useState } from 'react';
import { ConsoleLayout } from '@/components/layout/ConsoleLayout';
import { useGitFlow } from '@/lib/store';
import {
  GitBranch,
  Search,
  ShieldCheck,
  Lock,
  GitCommit,
  Clock,
  ArrowRight,
} from 'lucide-react';

export default function BranchManagerPage() {
  const { branches, repositories } = useGitFlow();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = branches.filter(
    (b) =>
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.repoName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ConsoleLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-brand-electric uppercase tracking-wider bg-brand-purple/10 px-2 py-0.5 rounded border border-brand-purple/30">
                MODULE 17 • GIT OPERATIONS
              </span>
              <span className="text-xs text-text-dim font-mono">{branches.length} Active Branches</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-black text-white">
              Branch Manager & Protection Policies
            </h1>
            <p className="text-xs text-text-muted mt-1">
              Audit branch protection rules, enforce signed commits, and monitor head commits.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-status-success/10 border border-status-success/20 text-status-success text-xs font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>Branch Rules Enforced</span>
          </div>
        </div>

        {/* Search */}
        <div className="p-4 rounded-xl bg-bg-surface border border-border">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-text-dim absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search branch name or repository..."
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-bg-elevated border border-border text-xs text-white placeholder-text-dim focus:outline-none focus:border-git-orange font-mono"
            />
          </div>
        </div>

        {/* Branches List */}
        <div className="space-y-3">
          {filtered.map((b) => (
            <div
              key={`${b.repoName}-${b.name}`}
              className="p-5 rounded-2xl bg-bg-surface border border-border hover:border-border-bright transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-brand-electric" />
                  <span className="text-white font-bold text-sm">{b.name}</span>
                  {b.isDefault && (
                    <span className="text-[10px] font-mono text-git-orange bg-git-orange/10 px-2 py-0.5 rounded border border-git-orange/20">
                      Default
                    </span>
                  )}
                  {b.isProtected && (
                    <span className="flex items-center gap-1 text-[10px] font-mono text-status-success bg-status-success/10 px-2 py-0.5 rounded border border-status-success/20">
                      <Lock className="w-3 h-3" /> Protected
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-text-muted text-[11px]">
                  <span className="text-git-orange">{b.repoName}</span>
                  <span>•</span>
                  <span className="text-white truncate max-w-md">"{b.lastCommitMessage}"</span>
                </div>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0 text-text-dim text-[11px]">
                <span>Updated by {b.author}</span>
                <span className="px-2.5 py-1 rounded bg-bg-elevated border border-border text-git-orange">
                  {b.lastCommitSha}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ConsoleLayout>
  );
}
