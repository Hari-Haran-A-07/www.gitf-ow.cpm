'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ConsoleLayout } from '@/components/layout/ConsoleLayout';
import { useGitFlow } from '@/lib/store';
import {
  Zap,
  Play,
  Pause,
  RotateCcw,
  Sliders,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  Plus,
} from 'lucide-react';

export default function AutomationCenterPage() {
  const { workflows, toggleWorkflowStatus, runWorkflowNow } = useGitFlow();
  const [runningId, setRunningId] = useState<string | null>(null);

  const handleRun = (id: string) => {
    setRunningId(id);
    runWorkflowNow(id);
    setTimeout(() => {
      setRunningId(null);
    }, 1000);
  };

  return (
    <ConsoleLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-git-orange uppercase tracking-wider bg-git-orange/10 px-2 py-0.5 rounded border border-git-orange/20">
                MODULE 11 • WORKFLOW RUNTIME
              </span>
              <span className="text-xs text-text-dim font-mono">Distributed BullMQ Workers</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-black text-white">
              Automation Center & Scheduler
            </h1>
            <p className="text-xs text-text-muted mt-1">
              Active pipelines with deterministic idempotency locks, safe retries, and duplicate prevention.
            </p>
          </div>

          <Link
            href="/workflow-builder"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-git-orange hover:bg-git-orangeHover text-white text-xs font-semibold tracking-wide transition-all shadow-md self-start sm:self-auto"
          >
            <Sliders className="w-4 h-4" />
            <span>Open Visual Builder</span>
          </Link>
        </div>

        {/* Safety Guarantees Banner */}
        <div className="p-4 rounded-xl bg-status-success/5 border border-status-success/20 flex items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-status-success" />
            <span className="text-white font-medium">
              Zero-Duplication Locking: Redis Redlock active across all scheduled workers.
            </span>
          </div>
          <span className="text-status-success">100% Deterministic</span>
        </div>

        {/* Workflow Cards */}
        <div className="space-y-4">
          {workflows.map((wf) => (
            <div
              key={wf.id}
              className="p-6 rounded-2xl bg-bg-surface border border-border hover:border-border-bright transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-base text-white">{wf.name}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase ${
                        wf.status === 'active'
                          ? 'text-status-success bg-status-success/10 border border-status-success/20'
                          : 'text-text-dim bg-bg-elevated'
                      }`}
                    >
                      {wf.status}
                    </span>
                  </div>
                  <p className="text-xs text-text-muted">{wf.description}</p>
                </div>

                {/* Quick Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleWorkflowStatus(wf.id)}
                    className="px-3 py-1.5 rounded-lg bg-bg-elevated border border-border text-xs font-mono text-text-muted hover:text-white transition-all flex items-center gap-1.5"
                  >
                    {wf.status === 'active' ? (
                      <>
                        <Pause className="w-3.5 h-3.5 text-status-warning" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 text-status-success" />
                        <span>Resume</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleRun(wf.id)}
                    disabled={runningId === wf.id}
                    className="px-4 py-1.5 rounded-lg bg-git-orange hover:bg-git-orangeHover text-white text-xs font-semibold tracking-wide transition-all shadow-sm flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <Play className={`w-3.5 h-3.5 ${runningId === wf.id ? 'animate-spin' : ''}`} />
                    <span>{runningId === wf.id ? 'Executing...' : 'Run Now'}</span>
                  </button>
                </div>
              </div>

              {/* Workflow Details Bar */}
              <div className="pt-3 border-t border-border grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-text-dim uppercase">Target Repository</span>
                  <div className="text-white mt-0.5 truncate">{wf.targetRepo}</div>
                </div>
                <div>
                  <span className="text-[10px] text-text-dim uppercase">Target Branch</span>
                  <div className="text-git-orange mt-0.5">{wf.targetBranch}</div>
                </div>
                <div>
                  <span className="text-[10px] text-text-dim uppercase">Total Runs</span>
                  <div className="text-white mt-0.5">{wf.runCount} executions</div>
                </div>
                <div>
                  <span className="text-[10px] text-text-dim uppercase">Success Rate</span>
                  <div className="text-status-success mt-0.5">{wf.successRate}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ConsoleLayout>
  );
}
