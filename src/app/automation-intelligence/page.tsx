'use client';

import React from 'react';
import { ConsoleLayout } from '@/components/layout/ConsoleLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { useGitFlow } from '@/lib/store';
import {
  Cpu,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  FileCode,
  AlertTriangle,
} from 'lucide-react';

export default function AutomationIntelligencePage() {
  const { engineB } = useGitFlow();

  const successPercentage = (
    (engineB.successfulWorkflows / (engineB.successfulWorkflows + engineB.failedWorkflows)) *
    100
  ).toFixed(1);

  return (
    <ConsoleLayout>
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-brand-electric uppercase tracking-wider bg-brand-purple/10 px-2 py-0.5 rounded border border-brand-purple/30">
                MODULE 09 • ENGINE B
              </span>
              <span className="text-xs text-text-dim font-mono">Platform Automation Telemetry</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-black text-white">
              Automation Intelligence
            </h1>
            <p className="text-xs text-text-muted mt-1">
              Tracks actual platform operations: scheduled workflows, AST documentation updates, test executions, and verified time saved.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-purple/10 border border-brand-purple/30 text-brand-electric text-xs font-mono">
            <Cpu className="w-4 h-4" />
            <span>Success Rate: {successPercentage}%</span>
          </div>
        </div>

        {/* Core Stat Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Automated Tasks"
            value={engineB.totalAutomatedTasks}
            subtitle="Executed via BullMQ workers"
            icon={Cpu}
            variant="purple"
            badge="Engine B"
            badgeColor="text-brand-electric bg-brand-purple/10 border-brand-purple/30"
          />

          <StatCard
            title="Documentation Updates"
            value={engineB.documentationUpdates}
            subtitle="AST symbol parity maintained"
            icon={Layers}
            variant="blue"
            badge="Docs AST"
            badgeColor="text-status-info bg-status-info/10 border-status-info/20"
          />

          <StatCard
            title="Automated Test Runs"
            value={engineB.testExecutions}
            subtitle="High-coverage regression tests"
            icon={FileCode}
            variant="green"
            badge="Zero Flake"
            badgeColor="text-status-success bg-status-success/10 border-status-success/20"
          />

          <StatCard
            title="Estimated Time Saved"
            value={`${Math.round(engineB.estimatedHoursSaved)} Hours`}
            subtitle="Calculated at 0.75h / operation"
            icon={Clock}
            variant="orange"
            badge="Efficiency"
            badgeColor="text-git-orange bg-git-orange/10 border-git-orange/20"
          />
        </div>

        {/* Detailed Operations Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Operation Breakdown */}
          <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                Operation Category Breakdown
              </span>
              <span className="text-[10px] font-mono text-text-dim">Engine B Totals</span>
            </div>

            <div className="space-y-3">
              {engineB.operationTypeBreakdown.map((item) => (
                <div key={item.type} className="p-3 rounded-xl bg-bg-elevated border border-border space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-white font-medium">{item.type}</span>
                    <span className="text-brand-electric font-bold">{item.count} ops</span>
                  </div>
                  <div className="h-1.5 w-full bg-bg-surface rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-electric rounded-full"
                      style={{ width: `${Math.min(100, (item.count / 450) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Operations History */}
          <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                Recent Daily Operations & Health Score
              </span>
              <span className="text-[10px] font-mono text-status-success">Deterministic Log</span>
            </div>

            <div className="space-y-2">
              {engineB.dailyOperationsHistory.map((day) => (
                <div
                  key={day.date}
                  className="p-3 rounded-lg bg-bg-elevated/70 border border-border flex items-center justify-between text-xs font-mono"
                >
                  <span className="text-white font-bold">{day.date}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-text-muted">
                      <strong className="text-brand-electric">{day.operations}</strong> platform operations
                    </span>
                    <span className="text-status-success bg-status-success/10 px-2 py-0.5 rounded border border-status-success/20">
                      Health: {day.healthScore}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ConsoleLayout>
  );
}
