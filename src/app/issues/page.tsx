'use client';

import React, { useState } from 'react';
import { ConsoleLayout } from '@/components/layout/ConsoleLayout';
import { useGitFlow } from '@/lib/store';
import {
  AlertCircle,
  Search,
  CheckCircle2,
  Tag,
  MessageSquare,
  Plus,
} from 'lucide-react';

export default function IssueManagerPage() {
  const { issues, repositories } = useGitFlow();
  const [filterState, setFilterState] = useState<'all' | 'open' | 'closed'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = issues.filter((i) => {
    const matchesState = filterState === 'all' || i.state === filterState;
    const matchesSearch =
      i.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.repoName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(i.number).includes(searchTerm);
    return matchesState && matchesSearch;
  });

  return (
    <ConsoleLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-status-warning uppercase tracking-wider bg-status-warning/10 px-2 py-0.5 rounded border border-status-warning/20">
                MODULE 16 • GIT OPERATIONS
              </span>
              <span className="text-xs text-text-dim font-mono">{issues.length} Monitored Issues</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-black text-white">
              Issue Manager & Triaging
            </h1>
            <p className="text-xs text-text-muted mt-1">
              Synchronize GitHub issues, triage bugs, and assign automated remediation tasks.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="p-4 rounded-xl bg-bg-surface border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-text-dim absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search issues, labels..."
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-bg-elevated border border-border text-xs text-white placeholder-text-dim focus:outline-none focus:border-git-orange font-mono"
            />
          </div>

          <div className="flex items-center p-1 rounded-lg bg-bg-elevated border border-border text-xs font-mono">
            {['all', 'open', 'closed'].map((s) => (
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

        {/* Issues List */}
        <div className="space-y-3">
          {filtered.map((issue) => (
            <div
              key={issue.id}
              className="p-5 rounded-2xl bg-bg-surface border border-border hover:border-border-bright transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                      issue.state === 'open'
                        ? 'text-status-warning bg-status-warning/10 border-status-warning/20'
                        : 'text-status-success bg-status-success/10 border-status-success/20'
                    }`}
                  >
                    {issue.state}
                  </span>
                  <span className="text-white font-bold">#{issue.number}</span>
                  <span className="text-git-orange font-medium">{issue.repoName}</span>
                </div>

                <h3 className="font-heading font-bold text-sm text-white">{issue.title}</h3>

                {/* Labels */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {issue.labels.map((lbl) => (
                    <span
                      key={lbl.name}
                      style={{ borderColor: `#${lbl.color}40`, color: `#${lbl.color}` }}
                      className="px-2 py-0.5 rounded text-[10px] bg-bg-elevated border font-mono"
                    >
                      {lbl.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 text-text-dim text-[11px] flex-shrink-0">
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5" /> {issue.commentsCount}
                </span>
                <span>Opened by {issue.author}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ConsoleLayout>
  );
}
