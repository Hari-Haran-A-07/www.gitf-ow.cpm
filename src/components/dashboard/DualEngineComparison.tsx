'use client';

import React, { useState } from 'react';
import { useGitFlow } from '@/lib/store';
import {
  Flame,
  Binary,
  GitCommit,
  GitPullRequest,
  CheckCircle2,
  Cpu,
  Clock,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

export const DualEngineComparison: React.FC = () => {
  const { engineA, engineB } = useGitFlow();
  const [activeTab, setActiveTab] = useState<'both' | 'engineA' | 'engineB'>('both');

  return (
    <div className="space-y-6">
      {/* Principle Banner */}
      <div className="p-4 rounded-xl bg-bg-surface/80 border border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-git-orange/10 border border-git-orange/30 text-git-orange">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-heading font-bold text-white">
              Strict Dual-Engine Architecture
            </h4>
            <p className="text-xs text-text-muted">
              GIT FLOW maintains two strictly separate intelligence engines. GitHub contribution data is verified against GitHub's official APIs and is never artificially inflated by platform automation.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 rounded-lg bg-bg-elevated border border-border text-xs font-mono">
          <button
            onClick={() => setActiveTab('both')}
            className={`px-3 py-1 rounded-md transition-all ${
              activeTab === 'both' ? 'bg-bg-surface text-white shadow-sm' : 'text-text-muted hover:text-white'
            }`}
          >
            Unified View
          </button>
          <button
            onClick={() => setActiveTab('engineA')}
            className={`px-3 py-1 rounded-md transition-all ${
              activeTab === 'engineA' ? 'bg-status-success/20 text-status-success shadow-sm' : 'text-text-muted hover:text-white'
            }`}
          >
            Engine A (GitHub)
          </button>
          <button
            onClick={() => setActiveTab('engineB')}
            className={`px-3 py-1 rounded-md transition-all ${
              activeTab === 'engineB' ? 'bg-brand-purple/20 text-brand-electric shadow-sm' : 'text-text-muted hover:text-white'
            }`}
          >
            Engine B (Automation)
          </button>
        </div>
      </div>

      {/* Side-by-side Dual Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ENGINE A: GITHUB CONTRIBUTION INTELLIGENCE */}
        {(activeTab === 'both' || activeTab === 'engineA') && (
          <div className="p-6 rounded-2xl bg-bg-surface border border-status-success/30 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-status-success/5 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-status-success animate-pulse" />
                  <span className="font-mono text-xs font-bold text-status-success uppercase tracking-wider">
                    ENGINE A: GITHUB CONTRIBUTION INTELLIGENCE
                  </span>
                </div>
                <span className="font-mono text-[10px] bg-status-success/10 text-status-success px-2 py-0.5 rounded border border-status-success/20">
                  Real Git Activity
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-bg-elevated border border-border">
                  <div className="flex items-center gap-1.5 text-text-dim text-[10px] font-mono">
                    <GitCommit className="w-3 h-3 text-status-success" />
                    <span>Commits</span>
                  </div>
                  <div className="mt-1 font-heading font-bold text-xl text-white">
                    {engineA.totalCommits}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-bg-elevated border border-border">
                  <div className="flex items-center gap-1.5 text-text-dim text-[10px] font-mono">
                    <GitPullRequest className="w-3 h-3 text-brand-cyan" />
                    <span>Pull Requests</span>
                  </div>
                  <div className="mt-1 font-heading font-bold text-xl text-white">
                    {engineA.totalPullRequests}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-bg-elevated border border-border">
                  <div className="flex items-center gap-1.5 text-text-dim text-[10px] font-mono">
                    <TrendingUp className="w-3 h-3 text-git-orange" />
                    <span>Code Reviews</span>
                  </div>
                  <div className="mt-1 font-heading font-bold text-xl text-white">
                    {engineA.totalCodeReviews}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-bg-elevated border border-border">
                  <div className="flex items-center gap-1.5 text-text-dim text-[10px] font-mono">
                    <Flame className="w-3 h-3 text-git-orange" />
                    <span>Current Streak</span>
                  </div>
                  <div className="mt-1 font-heading font-bold text-xl text-git-orange">
                    {engineA.currentStreakDays}d
                  </div>
                </div>
              </div>

              {/* Language breakdown */}
              <div className="mt-5 space-y-2">
                <span className="text-[11px] font-mono text-text-muted">Verified Code Distribution</span>
                <div className="h-2 w-full rounded-full bg-bg-elevated flex overflow-hidden">
                  {engineA.topLanguages.map((lang) => (
                    <div
                      key={lang.language}
                      style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                      title={`${lang.language}: ${lang.percentage}%`}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-3 pt-1 text-[10px] font-mono text-text-muted">
                  {engineA.topLanguages.map((l) => (
                    <span key={l.language} className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: l.color }} />
                      <span>{l.language} ({l.percentage}%)</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
              <span className="text-xs font-mono text-text-dim">Source: Official GitHub REST v3</span>
              <Link
                href="/contribution-intelligence"
                className="text-xs font-mono text-status-success hover:underline flex items-center gap-1"
              >
                <span>Full Intelligence View</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}

        {/* ENGINE B: AUTOMATION INTELLIGENCE */}
        {(activeTab === 'both' || activeTab === 'engineB') && (
          <div className="p-6 rounded-2xl bg-bg-surface border border-brand-purple/40 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/5 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-electric animate-pulse" />
                  <span className="font-mono text-xs font-bold text-brand-electric uppercase tracking-wider">
                    ENGINE B: AUTOMATION INTELLIGENCE
                  </span>
                </div>
                <span className="font-mono text-[10px] bg-brand-purple/10 text-brand-electric px-2 py-0.5 rounded border border-brand-purple/30">
                  Platform Operations
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-bg-elevated border border-border">
                  <div className="flex items-center gap-1.5 text-text-dim text-[10px] font-mono">
                    <Cpu className="w-3 h-3 text-brand-electric" />
                    <span>Auto Tasks</span>
                  </div>
                  <div className="mt-1 font-heading font-bold text-xl text-white">
                    {engineB.totalAutomatedTasks}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-bg-elevated border border-border">
                  <div className="flex items-center gap-1.5 text-text-dim text-[10px] font-mono">
                    <CheckCircle2 className="w-3 h-3 text-status-success" />
                    <span>Workflows OK</span>
                  </div>
                  <div className="mt-1 font-heading font-bold text-xl text-white">
                    {engineB.successfulWorkflows}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-bg-elevated border border-border">
                  <div className="flex items-center gap-1.5 text-text-dim text-[10px] font-mono">
                    <Sparkles className="w-3 h-3 text-brand-purple" />
                    <span>Approved Fixes</span>
                  </div>
                  <div className="mt-1 font-heading font-bold text-xl text-white">
                    {engineB.approvedChangesCount}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-bg-elevated border border-border">
                  <div className="flex items-center gap-1.5 text-text-dim text-[10px] font-mono">
                    <Clock className="w-3 h-3 text-git-orange" />
                    <span>Hours Saved</span>
                  </div>
                  <div className="mt-1 font-heading font-bold text-xl text-brand-electric">
                    {Math.round(engineB.estimatedHoursSaved)}h
                  </div>
                </div>
              </div>

              {/* Operation Breakdown */}
              <div className="mt-5 space-y-2">
                <span className="text-[11px] font-mono text-text-muted">Automated Maintenance Breakdown</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {engineB.operationTypeBreakdown.slice(0, 4).map((op) => (
                    <div key={op.type} className="flex items-center justify-between p-2 rounded-lg bg-bg-elevated/70 border border-border/60">
                      <span className="text-text-muted truncate">{op.type}</span>
                      <span className="font-mono font-bold text-white">{op.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
              <span className="text-xs font-mono text-text-dim">Source: BullMQ & Node.js Workers</span>
              <Link
                href="/automation-intelligence"
                className="text-xs font-mono text-brand-electric hover:underline flex items-center gap-1"
              >
                <span>Full Automation View</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
