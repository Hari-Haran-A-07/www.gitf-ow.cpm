'use client';

import React, { useState } from 'react';
import { ConsoleLayout } from '@/components/layout/ConsoleLayout';
import { useGitFlow } from '@/lib/store';
import {
  BarChart3,
  Download,
  Calendar,
  Filter,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Layers,
  CheckCircle2,
} from 'lucide-react';

export default function DeveloperAnalyticsPage() {
  const { engineA, engineB, repositories } = useGitFlow();
  const [selectedRange, setSelectedRange] = useState<'30d' | '90d' | '365d'>('365d');

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [
        'Metric Type,Category,Measured/Estimate,Value',
        `Engine A,Total Verified Commits,Measured,${engineA.totalCommits}`,
        `Engine A,Pull Requests,Measured,${engineA.totalPullRequests}`,
        `Engine A,Code Reviews,Measured,${engineA.totalCodeReviews}`,
        `Engine A,Active Days in 365,Measured,${engineA.activeDaysLast365}`,
        `Engine A,Current Streak Days,Measured,${engineA.currentStreakDays}`,
        `Engine B,Automated Tasks Completed,Measured,${engineB.totalAutomatedTasks}`,
        `Engine B,Documentation Updates,Measured,${engineB.documentationUpdates}`,
        `Engine B,Test Executions,Measured,${engineB.testExecutions}`,
        `Engine B,Hours Saved,Estimated,${engineB.estimatedHoursSaved}`,
      ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `gitflow_developer_analytics_${selectedRange}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ConsoleLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-git-orange uppercase tracking-wider bg-git-orange/10 px-2 py-0.5 rounded border border-git-orange/20">
                MODULE 19 • ADVANCED ANALYTICS
              </span>
              <span className="text-xs text-text-dim font-mono">Export Ready</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-black text-white">
              Developer Analytics & Export
            </h1>
            <p className="text-xs text-text-muted mt-1">
              Multi-dimensional telemetry distinguishing verified GitHub measurements from platform productivity estimates.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-git-orange hover:bg-git-orangeHover text-white text-xs font-semibold tracking-wide transition-all shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV Report</span>
            </button>
          </div>
        </div>

        {/* Range Filters */}
        <div className="p-4 rounded-xl bg-bg-surface border border-border flex items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-text-dim">
            <Filter className="w-4 h-4 text-git-orange" />
            <span>Time Horizon:</span>
          </div>

          <div className="flex items-center p-1 rounded-lg bg-bg-elevated border border-border">
            {(['30d', '90d', '365d'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setSelectedRange(r)}
                className={`px-3 py-1 rounded-md transition-all ${
                  selectedRange === r ? 'bg-bg-surface text-white shadow-sm' : 'text-text-muted hover:text-white'
                }`}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Monthly Activity Trends Bar Chart Visual */}
        <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-mono text-xs text-status-success uppercase font-bold tracking-wider">
                MEASURED GITHUB ACTIVITY (ENGINE A)
              </span>
              <h3 className="font-heading font-bold text-lg text-white mt-1">
                Annual Velocity & Commits By Month
              </h3>
            </div>
            <span className="text-xs font-mono text-text-dim">12 Month Parity</span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="h-64 flex items-end justify-between gap-2 pt-8 pb-4 border-b border-border">
            {engineA.monthlyBreakdown.map((m) => {
              const heightPct = Math.min(100, (m.commits / 250) * 100);
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="font-mono text-[10px] text-text-dim opacity-0 group-hover:opacity-100 transition-opacity">
                    {m.commits}
                  </div>
                  <div
                    className="w-full max-w-[36px] bg-gradient-to-t from-status-success/30 to-status-success rounded-t-lg transition-all duration-300 group-hover:bg-status-success"
                    style={{ height: `${heightPct}%` }}
                  />
                  <span className="font-mono text-[11px] text-text-muted">{m.month}</span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between text-xs text-text-muted font-mono">
            <span>● Green: Verified Git Commits</span>
            <span>Total Verified Contributions: {engineA.yearTotalContributions}</span>
          </div>
        </div>

        {/* Language Breakdown & Platform Hours Saved */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Programming Languages */}
          <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-4">
            <span className="font-mono text-xs text-brand-electric font-bold uppercase">
              Repository Language Distribution
            </span>
            <div className="space-y-3 pt-2">
              {engineA.topLanguages.map((lang) => (
                <div key={lang.language} className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-white">{lang.language}</span>
                    <span className="text-text-dim">{lang.percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-bg-elevated rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Productivity Estimates vs Measured Values */}
          <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-4">
            <span className="font-mono text-xs text-git-orange font-bold uppercase">
              Integrity Transparency Statement
            </span>
            <p className="text-xs text-text-muted leading-relaxed">
              To preserve mathematical truth, GIT FLOW never converts internal productivity units into fake Git commits.
              The table below clearly indicates which statistics are directly measured and which are engineering estimates.
            </p>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 rounded bg-bg-elevated flex justify-between items-center">
                <span className="text-white">Git Commits & PRs</span>
                <span className="text-status-success bg-status-success/10 px-2 py-0.5 rounded border border-status-success/20">
                  Measured (GitHub v3)
                </span>
              </div>
              <div className="p-2.5 rounded bg-bg-elevated flex justify-between items-center">
                <span className="text-white">BullMQ Workflow Runs</span>
                <span className="text-status-success bg-status-success/10 px-2 py-0.5 rounded border border-status-success/20">
                  Measured (Engine B)
                </span>
              </div>
              <div className="p-2.5 rounded bg-bg-elevated flex justify-between items-center">
                <span className="text-white">Estimated Hours Saved</span>
                <span className="text-status-warning bg-status-warning/10 px-2 py-0.5 rounded border border-status-warning/20">
                  Estimated (0.75h/op)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ConsoleLayout>
  );
}
