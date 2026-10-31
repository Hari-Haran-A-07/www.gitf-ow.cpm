'use client';

import React, { useState } from 'react';
import { ConsoleLayout } from '@/components/layout/ConsoleLayout';
import { useGitFlow } from '@/lib/store';
import {
  ShieldAlert,
  Server,
  Activity,
  Cpu,
  Database,
  Users,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [cacheCleared, setCacheCleared] = useState(false);

  const handleClearCache = () => {
    setCacheCleared(true);
    setTimeout(() => setCacheCleared(false), 2500);
  };

  return (
    <ConsoleLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-status-error uppercase tracking-wider bg-status-error/10 px-2 py-0.5 rounded border border-status-error/20">
                MODULE 27 • PLATFORM ADMIN
              </span>
              <span className="text-xs text-text-dim font-mono">Cluster Infrastructure</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-black text-white">
              Platform Administrator Console
            </h1>
            <p className="text-xs text-text-muted mt-1">
              Global telemetry, background queue throughput, database replication, and system maintenance switches.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-status-success/10 border border-status-success/20 text-status-success text-xs font-mono">
            <CheckCircle2 className="w-4 h-4" />
            <span>All Cluster Nodes Healthy</span>
          </div>
        </div>

        {/* Global Cluster Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-bg-surface border border-border">
            <span className="text-[10px] font-mono text-text-dim uppercase">Total Platform Users</span>
            <div className="font-heading font-black text-2xl text-white mt-1">14,289</div>
            <span className="text-[10px] font-mono text-status-success mt-1 block">+18% this month</span>
          </div>

          <div className="p-4 rounded-xl bg-bg-surface border border-border">
            <span className="text-[10px] font-mono text-text-dim uppercase">BullMQ Workers</span>
            <div className="font-heading font-black text-2xl text-git-orange mt-1">32 Active</div>
            <span className="text-[10px] font-mono text-text-dim mt-1 block">0 Failed Jobs</span>
          </div>

          <div className="p-4 rounded-xl bg-bg-surface border border-border">
            <span className="text-[10px] font-mono text-text-dim uppercase">Redis Memory Usage</span>
            <div className="font-heading font-black text-2xl text-brand-electric mt-1">1.84 GB</div>
            <span className="text-[10px] font-mono text-text-dim mt-1 block">Cluster Cap: 32 GB</span>
          </div>

          <div className="p-4 rounded-xl bg-bg-surface border border-border">
            <span className="text-[10px] font-mono text-text-dim uppercase">PostgreSQL TPS</span>
            <div className="font-heading font-black text-2xl text-status-info mt-1">1,240 /s</div>
            <span className="text-[10px] font-mono text-text-dim mt-1 block">P99 Latency: 2.4ms</span>
          </div>
        </div>

        {/* Operations Switch Board */}
        <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-4">
          <h3 className="font-heading font-bold text-sm text-white">Cluster Operations & Maintenance</h3>
          <div className="space-y-3 text-xs font-mono">
            <div className="p-4 rounded-xl bg-bg-elevated border border-border flex items-center justify-between">
              <div>
                <span className="text-white font-bold block">Global Maintenance Mode</span>
                <span className="text-text-dim text-[11px]">
                  Pause all scheduled background workflows and API write requests
                </span>
              </div>
              <button
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                className={`px-3 py-1.5 rounded-lg border font-bold transition-all ${
                  maintenanceMode
                    ? 'bg-status-error text-white border-status-error'
                    : 'bg-bg-surface border-border text-text-dim hover:text-white'
                }`}
              >
                {maintenanceMode ? 'ACTIVE (Paused)' : 'Disabled'}
              </button>
            </div>

            <div className="p-4 rounded-xl bg-bg-elevated border border-border flex items-center justify-between">
              <div>
                <span className="text-white font-bold block">Global Cache Invalidation</span>
                <span className="text-text-dim text-[11px]">
                  Flush edge CDN cache and local Redis query buffers
                </span>
              </div>
              <button
                onClick={handleClearCache}
                className="px-3 py-1.5 rounded-lg bg-bg-surface border border-border text-text-muted hover:text-white transition-all"
              >
                {cacheCleared ? 'Cache Cleared!' : 'Purge All Caches'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </ConsoleLayout>
  );
}
