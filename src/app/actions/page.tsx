'use client';

import React, { useState } from 'react';
import { ConsoleLayout } from '@/components/layout/ConsoleLayout';
import { useGitFlow } from '@/lib/store';
import {
  PlayCircle,
  CheckCircle2,
  AlertCircle,
  Clock,
  RotateCcw,
  GitBranch,
  ShieldCheck,
  Search,
} from 'lucide-react';

export default function GitHubActionsMonitorPage() {
  const { actions } = useGitFlow();
  const [actionList, setActionList] = useState(actions);
  const [reRunningId, setReRunningId] = useState<string | null>(null);

  const handleReRun = (id: string) => {
    setReRunningId(id);
    setTimeout(() => {
      setActionList((prev) =>
        prev.map((a) => (a.id === id ? { ...a, conclusion: 'success', status: 'completed' } : a))
      );
      setReRunningId(null);
    }, 1000);
  };

  return (
    <ConsoleLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-status-success uppercase tracking-wider bg-status-success/10 px-2 py-0.5 rounded border border-status-success/20">
                MODULE 18 • GIT OPERATIONS
              </span>
              <span className="text-xs text-text-dim font-mono">GitHub Actions CI/CD Telemetry</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-black text-white">
              GitHub Actions Monitor
            </h1>
            <p className="text-xs text-text-muted mt-1">
              Live status of automated test runners, SAST vulnerability scans, and deployment workflows.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-status-success/10 border border-status-success/20 text-status-success text-xs font-mono">
            <CheckCircle2 className="w-4 h-4" />
            <span>All CI Runners Online</span>
          </div>
        </div>

        {/* Action Runs List */}
        <div className="space-y-3">
          {actionList.map((action) => (
            <div
              key={action.id}
              className="p-5 rounded-2xl bg-bg-surface border border-border hover:border-border-bright transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono"
            >
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`flex items-center gap-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                      action.conclusion === 'success'
                        ? 'text-status-success bg-status-success/10 border-status-success/30'
                        : 'text-status-error bg-status-error/10 border-status-error/30'
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    {action.conclusion}
                  </span>
                  <span className="text-white font-bold text-sm">{action.name}</span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-text-dim text-[11px]">
                  <span className="text-git-orange font-medium">{action.repoName}</span>
                  <span>•</span>
                  <span>Branch: {action.branch}</span>
                  <span>•</span>
                  <span>Event: {action.event}</span>
                  <span>•</span>
                  <span>Duration: {action.durationSeconds}s</span>
                </div>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0">
                <span className="px-2.5 py-1 rounded bg-bg-elevated border border-border text-text-dim">
                  {action.commitSha}
                </span>

                <button
                  onClick={() => handleReRun(action.id)}
                  disabled={reRunningId === action.id}
                  className="px-3 py-1.5 rounded-lg bg-bg-elevated hover:bg-bg-elevated/80 border border-border text-text-muted hover:text-white transition-all flex items-center gap-1.5 disabled:opacity-50"
                >
                  <RotateCcw className={`w-3.5 h-3.5 ${reRunningId === action.id ? 'animate-spin' : ''}`} />
                  <span>{reRunningId === action.id ? 'Re-running...' : 'Re-run'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ConsoleLayout>
  );
}
