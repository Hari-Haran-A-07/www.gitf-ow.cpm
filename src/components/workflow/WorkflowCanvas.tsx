'use client';

import React, { useState } from 'react';
import { useGitFlow } from '@/lib/store';
import {
  Play,
  RotateCcw,
  Plus,
  CheckCircle2,
  Clock,
  Sparkles,
  GitBranch,
  Shield,
  FileCode,
  Terminal,
  Zap,
  HelpCircle,
  FolderGit2,
  Activity,
  Sliders,
} from 'lucide-react';

interface NodeDef {
  id: string;
  type: string;
  title: string;
  description: string;
  status: 'idle' | 'running' | 'success' | 'failed';
  icon: any;
  category: 'trigger' | 'analysis' | 'action' | 'approval' | 'sync';
}

const defaultPipelineNodes: NodeDef[] = [
  {
    id: 'n1',
    type: 'repo_source',
    title: 'GitHub Repository',
    description: 'Listen to authorized branch pushes & scheduled cron',
    status: 'idle',
    icon: FolderGit2,
    category: 'trigger',
  },
  {
    id: 'n2',
    type: 'repo_monitor',
    title: 'Repository Monitor',
    description: 'Track delta changes, dependency graphs & AST symbols',
    status: 'idle',
    icon: Activity,
    category: 'analysis',
  },
  {
    id: 'n3',
    type: 'ai_analysis',
    title: 'AI Analysis Engine',
    description: 'Identify code quality issues, missing docs & CVEs',
    status: 'idle',
    icon: Sparkles,
    category: 'analysis',
  },
  {
    id: 'n4',
    type: 'task_identifier',
    title: 'Task Identification',
    description: 'Plan legitimate development tasks with activity units',
    status: 'idle',
    icon: Sliders,
    category: 'analysis',
  },
  {
    id: 'n5',
    type: 'code_changes',
    title: 'Code / Doc Changes',
    description: 'Synthesize deterministic changes in sandboxed workspace',
    status: 'idle',
    icon: FileCode,
    category: 'action',
  },
  {
    id: 'n6',
    type: 'automated_tests',
    title: 'Automated Test Suite',
    description: 'Run unit & regression tests with zero false positives',
    status: 'idle',
    icon: CheckCircle2,
    category: 'action',
  },
  {
    id: 'n7',
    type: 'security_validation',
    title: 'Security Validation',
    description: 'SAST scan, secrets leakage detection & license check',
    status: 'idle',
    icon: Shield,
    category: 'action',
  },
  {
    id: 'n8',
    type: 'user_approval',
    title: 'User Approval Gate',
    description: 'Require developer sign-off for sensitive code commits',
    status: 'idle',
    icon: Clock,
    category: 'approval',
  },
  {
    id: 'n9',
    type: 'commit_pr',
    title: 'Commit / Pull Request',
    description: 'Create signed Git commit or verified GitHub pull request',
    status: 'idle',
    icon: GitBranch,
    category: 'action',
  },
  {
    id: 'n10',
    type: 'github_sync',
    title: 'GitHub Synchronization',
    description: 'Sync official branch refs, commits, and webhook ping',
    status: 'idle',
    icon: Zap,
    category: 'sync',
  },
  {
    id: 'n11',
    type: 'analytics_dashboard',
    title: 'Analytics Dashboard',
    description: 'Record execution metrics in Engine B telemetry',
    status: 'idle',
    icon: Activity,
    category: 'sync',
  },
];

export const WorkflowCanvas: React.FC = () => {
  const { workflows, runWorkflowNow, repositories, activeRepoId } = useGitFlow();
  const [nodes, setNodes] = useState<NodeDef[]>(defaultPipelineNodes);
  const [selectedNode, setSelectedNode] = useState<NodeDef | null>(defaultPipelineNodes[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(-1);
  const [executionLogs, setExecutionLogs] = useState<string[]>([
    `[2026-10-31 20:00:00] Visual Workflow Canvas initialized in high-throughput mode.`,
    `[2026-10-31 20:00:01] Loaded 11 pipeline nodes with deterministic state lock.`,
  ]);

  const activeRepo = repositories.find((r) => r.id === activeRepoId) || repositories[0];

  const handleExecuteWorkflow = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStepIndex(0);
    setExecutionLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] Starting pipeline execution for ${activeRepo.fullName}...`,
      ...prev,
    ]);

    // Step by step visual simulation
    let current = 0;
    const interval = setInterval(() => {
      setNodes((prevNodes) =>
        prevNodes.map((node, idx) => {
          if (idx < current) return { ...node, status: 'success' };
          if (idx === current) return { ...node, status: 'running' };
          return { ...node, status: 'idle' };
        })
      );

      setExecutionLogs((prev) => [
        `[${new Date().toLocaleTimeString()}] Completed step: ${defaultPipelineNodes[current]?.title} (OK)`,
        ...prev,
      ]);

      current++;
      setActiveStepIndex(current);

      if (current >= defaultPipelineNodes.length) {
        clearInterval(interval);
        setNodes((prevNodes) => prevNodes.map((n) => ({ ...n, status: 'success' })));
        setIsRunning(false);
        setActiveStepIndex(-1);
        if (workflows[0]) runWorkflowNow(workflows[0].id);
        setExecutionLogs((prev) => [
          `[${new Date().toLocaleTimeString()}] Pipeline executed successfully! Telemetry recorded into Engine B.`,
          ...prev,
        ]);
      }
    }, 700);
  };

  const handleReset = () => {
    setNodes(defaultPipelineNodes);
    setActiveStepIndex(-1);
    setIsRunning(false);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'trigger':
        return 'border-status-info/50 text-status-info bg-status-info/5';
      case 'analysis':
        return 'border-brand-purple/50 text-brand-electric bg-brand-purple/5';
      case 'action':
        return 'border-git-orange/50 text-git-orange bg-git-orange/5';
      case 'approval':
        return 'border-status-warning/50 text-status-warning bg-status-warning/5';
      case 'sync':
        return 'border-status-success/50 text-status-success bg-status-success/5';
      default:
        return 'border-border text-text-muted bg-bg-surface';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Toolbar */}
      <div className="p-4 rounded-2xl bg-bg-surface border border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-git-orange uppercase tracking-wider bg-git-orange/10 px-2 py-0.5 rounded border border-git-orange/20">
              VISUAL WORKFLOW ENGINE
            </span>
            <span className="text-xs text-text-muted font-mono">
              Target: <span className="text-white font-medium">{activeRepo.fullName}</span>
            </span>
          </div>
          <h2 className="mt-1 font-heading text-xl font-bold text-white">
            Autonomous Pipeline Editor
          </h2>
          <p className="text-xs text-text-muted">
            Connectable node-based execution with automated tests, security scans, and mandatory user approval gates.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-bg-elevated border border-border text-xs font-mono text-text-muted hover:text-white transition-all disabled:opacity-50"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Nodes</span>
          </button>

          <button
            onClick={handleExecuteWorkflow}
            disabled={isRunning}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-git-orange hover:bg-git-orangeHover text-white text-xs font-semibold tracking-wide transition-all shadow-[0_0_20px_rgba(240,80,50,0.3)] disabled:opacity-50"
          >
            <Play className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Running Pipeline...' : 'Run Pipeline Now'}</span>
          </button>
        </div>
      </div>

      {/* Main Canvas & Inspector Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left/Middle: Interactive Pipeline Canvas */}
        <div className="xl:col-span-2 p-6 rounded-2xl bg-[#09090C] border border-border overflow-x-auto relative">
          <div className="absolute top-3 right-3 text-[10px] font-mono text-text-dim flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
            <span>Node State: Deterministic Idempotency</span>
          </div>

          <div className="min-w-[680px] py-4 space-y-3">
            {nodes.map((node, index) => {
              const Icon = node.icon;
              const isSelected = selectedNode?.id === node.id;
              const isCurrentStep = activeStepIndex === index;

              return (
                <div key={node.id} className="relative">
                  {/* Step connector line */}
                  {index < nodes.length - 1 && (
                    <div className="absolute left-7 top-14 bottom-[-16px] w-0.5 bg-border z-0">
                      {node.status === 'success' && (
                        <div className="w-full h-full bg-status-success transition-all duration-500" />
                      )}
                    </div>
                  )}

                  {/* Node Card */}
                  <div
                    onClick={() => setSelectedNode(node)}
                    className={`relative z-10 flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-git-orange bg-bg-elevated shadow-[0_0_20px_rgba(240,80,50,0.15)] ring-1 ring-git-orange'
                        : 'border-border bg-bg-surface hover:border-border-bright'
                    } ${isCurrentStep ? 'ring-2 ring-brand-purple animate-pulse' : ''}`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Step Number & Icon */}
                      <div
                        className={`w-9 h-9 rounded-xl border flex items-center justify-center ${getCategoryColor(
                          node.category
                        )}`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-heading font-bold text-sm text-white">
                            {node.title}
                          </span>
                          <span className="text-[10px] font-mono uppercase text-text-dim px-1.5 py-0.5 rounded bg-bg-elevated border border-border">
                            Step {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                        <p className="text-xs text-text-muted mt-0.5">{node.description}</p>
                      </div>
                    </div>

                    {/* Status indicator */}
                    <div className="flex items-center gap-2">
                      {node.status === 'success' && (
                        <span className="flex items-center gap-1 text-[10px] font-mono text-status-success bg-status-success/10 px-2 py-0.5 rounded border border-status-success/20">
                          <CheckCircle2 className="w-3 h-3" /> OK
                        </span>
                      )}
                      {node.status === 'running' && (
                        <span className="flex items-center gap-1 text-[10px] font-mono text-brand-electric bg-brand-purple/10 px-2 py-0.5 rounded border border-brand-purple/20 animate-pulse">
                          <Clock className="w-3 h-3 animate-spin" /> In Progress
                        </span>
                      )}
                      {node.status === 'idle' && (
                        <span className="text-[10px] font-mono text-text-dim px-2 py-0.5 rounded bg-bg-elevated">
                          Ready
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Node Inspector & Execution Terminal */}
        <div className="space-y-6">
          {/* Node Inspector */}
          {selectedNode && (
            <div className="p-5 rounded-2xl bg-bg-surface border border-border space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="text-xs font-mono font-bold text-git-orange uppercase tracking-wider">
                  Node Inspector
                </span>
                <span className="text-[10px] font-mono text-text-dim uppercase">
                  ID: {selectedNode.id}
                </span>
              </div>

              <div>
                <h4 className="font-heading font-bold text-base text-white">
                  {selectedNode.title}
                </h4>
                <p className="text-xs text-text-muted mt-1 leading-relaxed">
                  {selectedNode.description}
                </p>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-bg-elevated border border-border flex items-center justify-between">
                  <span className="text-text-dim">Execution Category</span>
                  <span className="text-white capitalize">{selectedNode.category}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-bg-elevated border border-border flex items-center justify-between">
                  <span className="text-text-dim">Failure Policy</span>
                  <span className="text-status-warning">Abort & Notify</span>
                </div>
                <div className="p-2.5 rounded-lg bg-bg-elevated border border-border flex items-center justify-between">
                  <span className="text-text-dim">Audit Logging</span>
                  <span className="text-status-success">Immutable SHA256</span>
                </div>
              </div>
            </div>
          )}

          {/* Execution Terminal Logs */}
          <div className="p-5 rounded-2xl bg-bg-surface border border-border flex flex-col h-80">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-brand-electric" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Live Execution Logs
                </span>
              </div>
              <span className="text-[10px] font-mono text-status-success flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-ping" />
                Active
              </span>
            </div>

            <div className="mt-3 flex-1 overflow-y-auto font-mono text-[11px] space-y-1.5 text-text-muted scrollbar-thin">
              {executionLogs.map((log, idx) => (
                <div
                  key={idx}
                  className={`leading-relaxed ${
                    log.includes('successfully')
                      ? 'text-status-success font-semibold'
                      : log.includes('Starting')
                      ? 'text-git-orange'
                      : 'text-text-muted'
                  }`}
                >
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
