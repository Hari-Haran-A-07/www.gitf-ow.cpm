'use client';

import React from 'react';
import { ConsoleLayout } from '@/components/layout/ConsoleLayout';
import { StreakCalendar } from '@/components/dashboard/StreakCalendar';
import { StatCard } from '@/components/dashboard/StatCard';
import { useGitFlow } from '@/lib/store';
import {
  Flame,
  GitCommit,
  GitPullRequest,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  Layers,
} from 'lucide-react';

export default function ContributionIntelligencePage() {
  const { engineA, user } = useGitFlow();

  return (
    <ConsoleLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-status-success uppercase tracking-wider bg-status-success/10 px-2 py-0.5 rounded border border-status-success/20">
                MODULE 08 • ENGINE A
              </span>
              <span className="text-xs text-text-dim font-mono">100% Verified GitHub Activity</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-black text-white">
              GitHub Contribution Intelligence
            </h1>
            <p className="text-xs text-text-muted mt-1">
              Tracks actual GitHub-recognized activity across authorized commits, pull requests, issues, and code reviews.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-status-success/10 border border-status-success/30 text-status-success text-xs font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>Official GitHub Contribution Rules Enforced</span>
          </div>
        </div>

        {/* Core Contribution Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Real GitHub Commits"
            value={engineA.totalCommits}
            subtitle="Default branch commits only"
            icon={GitCommit}
            variant="green"
            badge="Verified"
            badgeColor="text-status-success bg-status-success/10 border-status-success/20"
          />

          <StatCard
            title="Pull Requests"
            value={engineA.totalPullRequests}
            subtitle="Standalone code authoring"
            icon={GitPullRequest}
            variant="blue"
            badge="Official"
            badgeColor="text-status-info bg-status-info/10 border-status-info/20"
          />

          <StatCard
            title="Code Reviews"
            value={engineA.totalCodeReviews}
            subtitle="Approved & change requested"
            icon={CheckCircle2}
            variant="purple"
            badge="Peer Review"
            badgeColor="text-brand-electric bg-brand-purple/10 border-brand-purple/20"
          />

          <StatCard
            title="Active Streak"
            value={`${engineA.currentStreakDays} Days`}
            subtitle={`Longest Streak: ${engineA.longestStreakDays} Days`}
            icon={Flame}
            variant="orange"
            badge="Momentum"
            badgeColor="text-git-orange bg-git-orange/10 border-git-orange/20"
          />
        </div>

        {/* 365-Day Contribution Calendar */}
        <StreakCalendar />

        {/* Monthly Breakdown & Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Breakdown Table */}
          <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                12-Month Official Contribution Activity
              </span>
              <span className="text-[10px] font-mono text-text-dim">Normalized</span>
            </div>

            <div className="space-y-2">
              {engineA.monthlyBreakdown.map((m) => (
                <div
                  key={m.month}
                  className="p-2.5 rounded-lg bg-bg-elevated/70 border border-border flex items-center justify-between text-xs font-mono"
                >
                  <span className="text-white font-bold w-12">{m.month}</span>
                  <div className="flex items-center gap-4 text-text-muted text-[11px]">
                    <span>
                      <strong className="text-status-success">{m.commits}</strong> commits
                    </span>
                    <span>
                      <strong className="text-brand-cyan">{m.prs}</strong> PRs
                    </span>
                    <span>
                      <strong className="text-git-orange">{m.reviews}</strong> reviews
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* GitHub Contribution Eligibility Rules Card */}
          <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-border">
              <HelpCircle className="w-4 h-4 text-git-orange" />
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                Official Contribution Criteria
              </span>
            </div>

            <p className="text-xs text-text-muted leading-relaxed">
              GitHub counts contributions only when specific conditions are met.
              GIT FLOW tracks these exact criteria with complete transparency:
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-bg-elevated border border-border space-y-1">
                <span className="font-bold text-white block">1. Default Branch Commits</span>
                <p className="text-text-muted text-[11px]">
                  Commits must be made to the default branch (e.g. `main` or `production`) or merged via Pull Request.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-bg-elevated border border-border space-y-1">
                <span className="font-bold text-white block">2. Email Matching</span>
                <p className="text-text-muted text-[11px]">
                  The commit author email must match an email verified in your official GitHub account settings.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-bg-elevated border border-border space-y-1">
                <span className="font-bold text-white block">3. Authorized Repositories</span>
                <p className="text-text-muted text-[11px]">
                  Commits must be in a standalone repository (not an unstarred fork) or contributed via Pull Request.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ConsoleLayout>
  );
}
