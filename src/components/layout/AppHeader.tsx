'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useGitFlow } from '@/lib/store';
import { GitHubMark } from '../brand/GitHubMark';
import {
  RefreshCw,
  Flame,
  CheckCircle2,
  Bell,
  ChevronDown,
  Shield,
  Layers,
  Sparkles,
} from 'lucide-react';

export const AppHeader: React.FC = () => {
  const {
    user,
    repositories,
    activeRepoId,
    setActiveRepoId,
    engineA,
    notifications,
    markNotificationRead,
  } = useGitFlow();

  const [isSyncing, setIsSyncing] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [syncSuccessMsg, setSyncSuccessMsg] = useState(false);

  const activeRepo = repositories.find((r) => r.id === activeRepoId) || repositories[0];
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleQuickSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncSuccessMsg(true);
      setTimeout(() => setSyncSuccessMsg(false), 3000);
    }, 1200);
  };

  return (
    <header className="h-16 border-b border-border bg-bg-surface/50 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Active Repository Selector */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-git-orange" />
          <span className="text-xs font-mono text-text-dim">ACTIVE REPO:</span>
        </div>

        <div className="relative">
          <select
            value={activeRepoId}
            onChange={(e) => setActiveRepoId(e.target.value)}
            className="bg-bg-elevated border border-border rounded-lg text-xs font-mono text-white px-3 py-1.5 pr-8 appearance-none focus:outline-none focus:border-git-orange cursor-pointer"
          >
            {repositories.map((repo) => (
              <option key={repo.id} value={repo.id}>
                {repo.name} ({repo.healthScore}% Health)
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-text-muted absolute right-2.5 top-2.5 pointer-events-none" />
        </div>

        {/* Live Health Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-status-success/10 border border-status-success/20 text-status-success text-xs font-mono">
          <Shield className="w-3.5 h-3.5" />
          <span>Health: {activeRepo?.healthScore || 98}%</span>
        </div>
      </div>

      {/* Right: Quick Controls, Streak, Sync, Notifications */}
      <div className="flex items-center gap-3">
        {/* GitHub Live Connection Status */}
        <Link
          href="/github-connect"
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-elevated border border-border text-xs font-mono text-text-muted hover:text-white hover:border-git-orange transition-all"
        >
          <GitHubMark size={14} fill="#22C55E" />
          <span>{user.githubUsername ? `@${user.githubUsername}` : 'Sync GitHub'}</span>
          <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
        </Link>

        {/* Real Streak Indicator */}
        <Link
          href="/contribution-intelligence"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-git-orange/10 border border-git-orange/30 text-git-orange text-xs font-mono font-medium hover:bg-git-orange/20 transition-all"
        >
          <Flame className="w-3.5 h-3.5 fill-git-orange" />
          <span>{engineA.currentStreakDays}d Real Streak</span>
        </Link>

        {/* Sync Trigger */}
        <button
          onClick={handleQuickSync}
          disabled={isSyncing}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
            syncSuccessMsg
              ? 'bg-status-success/10 border-status-success/30 text-status-success'
              : 'bg-bg-elevated border-border text-text-muted hover:text-white hover:border-brand-purple'
          }`}
          title="Synchronize real GitHub commits and branches"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-git-orange' : ''}`} />
          <span className="hidden sm:inline">{syncSuccessMsg ? 'Synced!' : isSyncing ? 'Syncing...' : 'Sync Git'}</span>
        </button>

        {/* Notifications Popover Trigger */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg bg-bg-elevated border border-border text-text-muted hover:text-white transition-all"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-git-orange text-white text-[9px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl bg-bg-elevated border border-border shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Notifications ({unreadCount})
                </span>
                <Link
                  href="/notifications"
                  onClick={() => setShowNotifications(false)}
                  className="text-[11px] text-git-orange hover:underline font-mono"
                >
                  View All
                </Link>
              </div>

              <div className="mt-3 space-y-2 max-h-64 overflow-y-auto">
                {notifications.slice(0, 4).map((n) => (
                  <div
                    key={n.id}
                    onClick={() => markNotificationRead(n.id)}
                    className={`p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                      n.read
                        ? 'bg-bg-surface/40 border-border/40 text-text-dim'
                        : 'bg-bg-surface border-git-orange/30 text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono font-semibold text-[11px]">
                      <span>{n.title}</span>
                      <span className="text-[9px] text-text-dim">{n.timestamp}</span>
                    </div>
                    <p className="mt-1 text-[11px] text-text-muted line-clamp-2">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <Link href="/profile" className="w-8 h-8 rounded-full border border-border overflow-hidden hover:border-git-orange transition-all">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
    </header>
  );
};
