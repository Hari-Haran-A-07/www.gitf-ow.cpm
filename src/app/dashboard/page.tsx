'use client';

import React from 'react';
import Link from 'next/link';
import { ConsoleLayout } from '@/components/layout/ConsoleLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { StreakCalendar } from '@/components/dashboard/StreakCalendar';
import { DualEngineComparison } from '@/components/dashboard/DualEngineComparison';
import { useGitFlow } from '@/lib/store';
import {
  Flame,
  GitCommit,
  GitPullRequest,
  AlertCircle,
  Cpu,
  Bot,
  Zap,
  FolderGit2,
  CalendarCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Activity,
} from 'lucide-react';

export default function DashboardPage() {
  const {
    user,
    engineA,
    engineB,
    repositories,
    commits,
    pullRequests,
    issues,
    dailyTasks,
    workflows,
    aiSuggestions,
    approveAISuggestion,
    rejectAISuggestion,
    updateTaskStatus,
  } = useGitFlow();

  const todayTask = dailyTasks.find((t) => t.dayNumber === 305) || dailyTasks[0];
  const pendingSuggestions = aiSuggestions.filter((s) => s.status === 'pending');

  return (
    <ConsoleLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Welcome Banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-bg-surface via-bg-surface to-git-orange/10 border border-border flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-git-orange uppercase tracking-wider bg-git-orange/10 px-2 py-0.5 rounded border border-git-orange/20">
                MODULE 05 • MAIN DASHBOARD
              </span>
              <span className="text-xs text-text-muted font-mono">
                {user.plan.toUpperCase()} TIER • {user.role.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-white">
              Welcome back, {user.name}
            </h1>
            <p className="text-xs sm:text-sm text-text-muted max-w-xl leading-relaxed">
              Autonomous telemetry indicates all 6 connected repositories are healthy.
              Day 305 scheduled development target is 75% complete.
            </p>
          </div>

          {/* Quick Streak Widget */}
          <div className="flex items-center gap-4 bg-bg-elevated p-4 rounded-xl border border-border self-start md:self-auto">
            <div className="w-12 h-12 rounded-xl bg-git-orange/10 border border-git-orange/30 flex items-center justify-center text-git-orange">
              <Flame className="w-6 h-6 fill-git-orange" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-text-dim">Real GitHub Streak</div>
              <div className="font-heading font-black text-2xl text-white">
                {engineA.currentStreakDays} <span className="text-xs text-git-orange font-mono font-normal">Days</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Real GitHub Commits"
            value={engineA.totalCommits}
            subtitle="Verified official v3 git logs"
            icon={GitCommit}
            variant="green"
            badge="Engine A"
            badgeColor="text-status-success bg-status-success/10 border-status-success/20"
          />

          <StatCard
            title="Autonomous Workflows"
            value={engineB.successfulWorkflows}
            subtitle={`${engineB.totalAutomatedTasks} automated ops performed`}
            icon={Cpu}
            variant="purple"
            badge="Engine B"
            badgeColor="text-brand-electric bg-brand-purple/10 border-brand-purple/30"
          />

          <StatCard
            title="Monitored Repositories"
            value={repositories.length}
            subtitle="Avg. Health Score: 96.2%"
            icon={FolderGit2}
            variant="orange"
            badge="Active"
            badgeColor="text-git-orange bg-git-orange/10 border-git-orange/20"
          />

          <StatCard
            title="Engineering Hours Saved"
            value={`${Math.round(engineB.estimatedHoursSaved)}h`}
            subtitle="Via AI & background workers"
            icon={Clock}
            variant="blue"
            badge="Saved"
            badgeColor="text-status-info bg-status-info/10 border-status-info/20"
          />
        </div>

        {/* 365-Day Real Contribution Heatmap (Engine A) */}
        <StreakCalendar />

        {/* Two Independent Analytics Engines Comparison */}
        <DualEngineComparison />

        {/* Middle Split: Today's Task & Pending AI Suggestions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's 365-Day Task Card */}
          {todayTask && (
            <div className="p-6 rounded-2xl bg-bg-surface border border-border flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <CalendarCheck className="w-4 h-4 text-git-orange" />
                    <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                      Day {todayTask.dayNumber} Development Target
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-status-warning bg-status-warning/10 px-2 py-0.5 rounded border border-status-warning/20">
                    {todayTask.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>

                <div className="mt-4 space-y-2">
                  <h3 className="font-heading font-bold text-base text-white">
                    {todayTask.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {todayTask.description}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs font-mono">
                    <span className="text-text-dim">Progress:</span>
                    <span className="text-git-orange font-bold">
                      {todayTask.achievedUnits} / {todayTask.targetUnits} units
                    </span>
                  </div>

                  <div className="h-2 w-full rounded-full bg-bg-elevated overflow-hidden">
                    <div
                      className="h-full bg-git-orange rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(
                          100,
                          (todayTask.achievedUnits / todayTask.targetUnits) * 100
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                <Link
                  href="/tasks"
                  className="text-xs font-mono text-text-muted hover:text-white flex items-center gap-1"
                >
                  <span>View All 365 Days</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>

                {todayTask.status !== 'completed' && (
                  <button
                    onClick={() => updateTaskStatus(todayTask.id, 'completed')}
                    className="px-3.5 py-1.5 rounded-lg bg-status-success hover:bg-status-success/80 text-white text-xs font-mono font-medium flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Complete Day Target</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* AI Code Improvement Suggestions */}
          <div className="p-6 rounded-2xl bg-bg-surface border border-border flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-brand-electric" />
                  <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                    AI Development Recommendations ({pendingSuggestions.length})
                  </span>
                </div>
                <Link
                  href="/ai-assistant"
                  className="text-[11px] font-mono text-brand-electric hover:underline"
                >
                  Open Assistant
                </Link>
              </div>

              <div className="mt-4 space-y-3">
                {pendingSuggestions.length > 0 ? (
                  pendingSuggestions.slice(0, 2).map((sug) => (
                    <div key={sug.id} className="p-3.5 rounded-xl bg-bg-elevated border border-border space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-git-orange font-bold truncate max-w-[200px]">
                          {sug.repoName}
                        </span>
                        <span className="text-[10px] font-mono text-status-warning bg-status-warning/10 px-1.5 py-0.5 rounded uppercase">
                          {sug.severity} Severity
                        </span>
                      </div>
                      <h4 className="text-xs font-semibold text-white">{sug.title}</h4>
                      <p className="text-[11px] text-text-muted line-clamp-2 leading-relaxed">
                        {sug.explanation}
                      </p>

                      <div className="pt-2 flex items-center justify-end gap-2 text-xs font-mono">
                        <button
                          onClick={() => rejectAISuggestion(sug.id)}
                          className="px-2.5 py-1 rounded bg-bg-surface hover:bg-bg-elevated text-text-dim hover:text-white border border-border text-[11px]"
                        >
                          Dismiss
                        </button>
                        <button
                          onClick={() => approveAISuggestion(sug.id)}
                          className="px-3 py-1 rounded bg-brand-purple hover:bg-brand-electric text-white text-[11px] font-medium flex items-center gap-1 shadow-sm"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Approve & Create PR</span>
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-xs font-mono text-text-dim">
                    All suggestions approved or reviewed. Codebase AST in sync.
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-text-dim font-mono">
              <span>Approval policy: Mandatory human sign-off</span>
              <span className="text-status-success">Zero hallucination</span>
            </div>
          </div>
        </div>

        {/* Bottom Split: Recent Commits, PRs, Open Issues */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Commits */}
          <div className="p-5 rounded-2xl bg-bg-surface border border-border space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <span className="font-mono text-xs font-bold text-white uppercase">
                Recent Verified Commits
              </span>
              <Link href="/commits" className="text-[11px] font-mono text-git-orange hover:underline">
                View All
              </Link>
            </div>
            <div className="space-y-2.5">
              {commits.slice(0, 4).map((c) => (
                <div key={c.sha} className="p-2.5 rounded-lg bg-bg-elevated/70 border border-border text-xs space-y-1">
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="text-git-orange">{c.sha}</span>
                    <span className="text-text-dim">{c.repoName}</span>
                  </div>
                  <p className="text-white text-[11px] truncate">{c.message}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pull Requests */}
          <div className="p-5 rounded-2xl bg-bg-surface border border-border space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <span className="font-mono text-xs font-bold text-white uppercase">
                Pull Requests
              </span>
              <Link href="/pull-requests" className="text-[11px] font-mono text-git-orange hover:underline">
                View All
              </Link>
            </div>
            <div className="space-y-2.5">
              {pullRequests.slice(0, 4).map((pr) => (
                <div key={pr.id} className="p-2.5 rounded-lg bg-bg-elevated/70 border border-border text-xs space-y-1">
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="text-brand-cyan">#{pr.number}</span>
                    <span className="text-status-success uppercase">{pr.state}</span>
                  </div>
                  <p className="text-white text-[11px] truncate">{pr.title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Issues */}
          <div className="p-5 rounded-2xl bg-bg-surface border border-border space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <span className="font-mono text-xs font-bold text-white uppercase">
                Open Issues
              </span>
              <Link href="/issues" className="text-[11px] font-mono text-git-orange hover:underline">
                View All
              </Link>
            </div>
            <div className="space-y-2.5">
              {issues.slice(0, 4).map((issue) => (
                <div key={issue.id} className="p-2.5 rounded-lg bg-bg-elevated/70 border border-border text-xs space-y-1">
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="text-status-warning">#{issue.number}</span>
                    <span className="text-text-dim">{issue.repoName}</span>
                  </div>
                  <p className="text-white text-[11px] truncate">{issue.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ConsoleLayout>
  );
}
