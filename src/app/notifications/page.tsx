'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ConsoleLayout } from '@/components/layout/ConsoleLayout';
import { useGitFlow } from '@/lib/store';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ShieldCheck,
  Bot,
  Zap,
  Trash2,
} from 'lucide-react';

export default function NotificationsCenterPage() {
  const { notifications, markNotificationRead, clearAllNotifications } = useGitFlow();
  const [filterType, setFilterType] = useState<string>('all');

  const filtered = notifications.filter(
    (n) => filterType === 'all' || n.category === filterType
  );

  return (
    <ConsoleLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-git-orange uppercase tracking-wider bg-git-orange/10 px-2 py-0.5 rounded border border-git-orange/20">
                MODULE 22 • NOTIFICATION ENGINE
              </span>
              <span className="text-xs text-text-dim font-mono">Real-Time In-App & Webhook Alerts</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-black text-white">
              Notifications Center
            </h1>
            <p className="text-xs text-text-muted mt-1">
              Automated workflow success alerts, streak milestones, pull request updates, and security scanning notices.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearAllNotifications}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-bg-surface hover:bg-bg-elevated border border-border text-xs font-mono text-text-muted hover:text-white transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          {['all', 'streak', 'workflow', 'security', 'ai', 'github'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterType(cat)}
              className={`px-3 py-1.5 rounded-lg uppercase transition-all ${
                filterType === cat
                  ? 'bg-git-orange text-white font-bold'
                  : 'bg-bg-surface border border-border text-text-muted hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filtered.length > 0 ? (
            filtered.map((n) => (
              <div
                key={n.id}
                onClick={() => markNotificationRead(n.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-4 ${
                  n.read
                    ? 'bg-bg-surface/50 border-border/60 text-text-dim'
                    : 'bg-bg-surface border-git-orange/40 text-white shadow-sm ring-1 ring-git-orange/20'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-bg-elevated border border-border text-git-orange flex-shrink-0 mt-0.5">
                    {n.category === 'streak' && <Flame className="w-4 h-4 fill-git-orange" />}
                    {n.category === 'security' && <ShieldCheck className="w-4 h-4 text-status-success" />}
                    {n.category === 'workflow' && <Zap className="w-4 h-4 text-brand-electric" />}
                    {n.category === 'ai' && <Bot className="w-4 h-4 text-brand-purple" />}
                    {n.category === 'github' && <CheckCircle2 className="w-4 h-4 text-status-info" />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-heading font-bold text-sm">{n.title}</h4>
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-git-orange animate-pulse" />
                      )}
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed">{n.message}</p>
                    <span className="text-[10px] font-mono text-text-dim block pt-1">
                      {n.timestamp}
                    </span>
                  </div>
                </div>

                {n.link && (
                  <Link
                    href={n.link}
                    className="text-xs font-mono text-git-orange hover:underline flex-shrink-0"
                  >
                    View
                  </Link>
                )}
              </div>
            ))
          ) : (
            <div className="p-12 text-center rounded-2xl bg-bg-surface border border-border font-mono text-xs text-text-dim">
              No notifications matching the selected filter.
            </div>
          )}
        </div>
      </div>
    </ConsoleLayout>
  );
}
