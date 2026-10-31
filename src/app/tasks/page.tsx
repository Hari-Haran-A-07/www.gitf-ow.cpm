'use client';

import React, { useState } from 'react';
import { ConsoleLayout } from '@/components/layout/ConsoleLayout';
import { useGitFlow } from '@/lib/store';
import { DailyTask, TaskCategory } from '@/lib/types';
import {
  CalendarCheck,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  ArrowRight,
  Flame,
  FileText,
  ShieldAlert,
  Play,
  RotateCcw,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export default function DailyTaskManagerPage() {
  const { dailyTasks, updateTaskStatus } = useGitFlow();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [inspectTask, setInspectTask] = useState<DailyTask | null>(null);

  const filteredTasks = dailyTasks.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(t.dayNumber).includes(searchTerm);
    const matchesCat = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesStat = selectedStatus === 'all' || t.status === selectedStatus;
    return matchesSearch && matchesCat && matchesStat;
  });

  const completedCount = dailyTasks.filter((t) => t.status === 'completed').length;

  return (
    <ConsoleLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-git-orange uppercase tracking-wider bg-git-orange/10 px-2 py-0.5 rounded border border-git-orange/20">
                MODULE 10 • 365-DAY ENGINE
              </span>
              <span className="text-xs text-text-dim font-mono">{completedCount} / 365 Days Completed</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-black text-white">
              Autonomous Daily Task Manager
            </h1>
            <p className="text-xs text-text-muted mt-1">
              Internal daily engineering targets (e.g. Day 001: 40 units, Day 002: 35 units).
              Every task performs legitimate, auditable repository work.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-git-orange/10 border border-git-orange/30 text-git-orange text-xs font-mono">
              <Flame className="w-4 h-4 fill-git-orange" />
              <span>Day 305 Active</span>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 rounded-xl bg-bg-surface border border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-text-dim absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search day number, title, repo..."
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-bg-elevated border border-border text-xs text-white placeholder-text-dim focus:outline-none focus:border-git-orange font-mono"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 rounded-lg bg-bg-elevated border border-border text-xs font-mono text-white focus:outline-none focus:border-git-orange cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="health_check">Health Check</option>
              <option value="documentation">Documentation</option>
              <option value="bug_fix">Bug Fix</option>
              <option value="test_generation">Test Generation</option>
              <option value="dependency_analysis">Dependency Analysis</option>
              <option value="code_quality">Code Quality</option>
              <option value="security_scan">Security Scan</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 rounded-lg bg-bg-elevated border border-border text-xs font-mono text-white focus:outline-none focus:border-git-orange cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="in_progress">In Progress</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          {filteredTasks.slice(0, 30).map((task) => (
            <div
              key={task.id}
              className={`p-4 rounded-xl border transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                task.status === 'completed'
                  ? 'bg-bg-surface border-border hover:border-status-success/40'
                  : task.status === 'in_progress'
                  ? 'bg-git-orange/5 border-git-orange/40 shadow-sm'
                  : 'bg-bg-surface/50 border-border/60 opacity-80'
              }`}
            >
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-white bg-bg-elevated px-2 py-0.5 rounded border border-border">
                    DAY {String(task.dayNumber).padStart(3, '0')}
                  </span>
                  <span className="text-[10px] font-mono uppercase text-git-orange bg-git-orange/10 px-2 py-0.5 rounded">
                    {task.category.replace('_', ' ')}
                  </span>
                  <span className="text-xs font-mono text-text-dim truncate">
                    {task.repoName} ({task.branch})
                  </span>
                  <span className="text-[11px] font-mono text-text-muted">{task.date}</span>
                </div>

                <h3 className="font-heading font-bold text-sm text-white truncate">
                  {task.title}
                </h3>
                <p className="text-xs text-text-muted line-clamp-1">{task.description}</p>
              </div>

              {/* Progress & Target Units */}
              <div className="flex items-center gap-6 flex-shrink-0">
                <div className="text-right">
                  <div className="font-mono text-xs font-bold text-white">
                    {task.achievedUnits} / {task.targetUnits}{' '}
                    <span className="text-[10px] text-text-dim">Units</span>
                  </div>
                  <div className="w-24 h-1.5 bg-bg-elevated rounded-full overflow-hidden mt-1">
                    <div
                      className="h-full bg-git-orange rounded-full"
                      style={{
                        width: `${Math.min(100, (task.achievedUnits / task.targetUnits) * 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 font-mono text-xs">
                  <button
                    onClick={() => setInspectTask(task)}
                    className="p-1.5 rounded-lg bg-bg-elevated border border-border text-text-muted hover:text-white"
                    title="View Execution Log"
                  >
                    <FileText className="w-4 h-4" />
                  </button>

                  {task.status !== 'completed' ? (
                    <button
                      onClick={() => updateTaskStatus(task.id, 'completed')}
                      className="px-3 py-1.5 rounded-lg bg-status-success hover:bg-status-success/80 text-white font-medium flex items-center gap-1.5 transition-all shadow-sm"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Complete</span>
                    </button>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] font-mono text-status-success bg-status-success/10 px-2.5 py-1 rounded-lg border border-status-success/20">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Task Inspector Modal */}
        {inspectTask && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
            <div className="w-full max-w-2xl rounded-2xl bg-bg-surface border border-border p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div>
                  <span className="font-mono text-xs text-git-orange font-bold uppercase">
                    Day {inspectTask.dayNumber} Execution Log
                  </span>
                  <h3 className="font-heading font-bold text-base text-white mt-1">
                    {inspectTask.title}
                  </h3>
                </div>
                <button
                  onClick={() => setInspectTask(null)}
                  className="text-text-muted hover:text-white font-mono text-xs p-1"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 rounded bg-bg-elevated flex justify-between">
                  <span className="text-text-dim">Target Units</span>
                  <span className="text-white">{inspectTask.targetUnits}</span>
                </div>
                <div className="p-2.5 rounded bg-bg-elevated flex justify-between">
                  <span className="text-text-dim">Achieved Units</span>
                  <span className="text-git-orange font-bold">{inspectTask.achievedUnits}</span>
                </div>
                <div className="p-2.5 rounded bg-bg-elevated flex justify-between">
                  <span className="text-text-dim">Repository</span>
                  <span className="text-white">{inspectTask.repoName}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-bg-elevated border border-border font-mono text-[11px] text-text-muted space-y-1 max-h-48 overflow-y-auto">
                {inspectTask.executionLog?.map((line, idx) => (
                  <div key={idx}>{line}</div>
                )) || <div>No logs recorded for this execution.</div>}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setInspectTask(null)}
                  className="px-4 py-2 rounded-lg bg-bg-elevated border border-border text-xs font-mono text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ConsoleLayout>
  );
}
