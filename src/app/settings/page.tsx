'use client';

import React, { useState } from 'react';
import { ConsoleLayout } from '@/components/layout/ConsoleLayout';
import { useGitFlow } from '@/lib/store';
import {
  Settings,
  ShieldAlert,
  Bell,
  Eye,
  CheckCircle2,
  Trash2,
  Save,
} from 'lucide-react';

export default function AccountSettingsPage() {
  const [emailDigest, setEmailDigest] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [timezone, setTimezone] = useState('America/Los_Angeles');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <ConsoleLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-git-orange uppercase tracking-wider bg-git-orange/10 px-2 py-0.5 rounded border border-git-orange/20">
                MODULE 30 • PREFERENCES
              </span>
              <span className="text-xs text-text-dim font-mono">Global Preferences</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-black text-white">
              Account Settings & Preferences
            </h1>
            <p className="text-xs text-text-muted mt-1">
              Configure notification delivery frequency, timezone schedules, accessibility, and account lifecycle.
            </p>
          </div>
        </div>

        {/* Settings Form */}
        <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <h3 className="font-heading font-bold text-sm text-white">General Preferences</h3>
            {saved && (
              <span className="flex items-center gap-1 text-xs font-mono text-status-success">
                <CheckCircle2 className="w-4 h-4" /> Settings Saved
              </span>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-4 text-xs font-mono">
            <div>
              <label className="block text-text-muted mb-1">Timezone for 365-Day Scheduler</label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-bg-elevated border border-border text-white text-xs focus:outline-none focus:border-git-orange cursor-pointer"
              >
                <option value="America/Los_Angeles">America/Los_Angeles (UTC-7)</option>
                <option value="America/New_York">America/New_York (UTC-4)</option>
                <option value="Europe/London">Europe/London (UTC+0)</option>
                <option value="Asia/Tokyo">Asia/Tokyo (UTC+9)</option>
              </select>
            </div>

            <div className="pt-2 space-y-3">
              <label className="flex items-center justify-between p-3 rounded-xl bg-bg-elevated border border-border cursor-pointer">
                <div>
                  <span className="text-white font-bold block">Weekly Development Digest</span>
                  <span className="text-text-dim text-[11px]">
                    Receive an email summary of verified contributions and hours saved
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={emailDigest}
                  onChange={(e) => setEmailDigest(e.target.checked)}
                  className="w-4 h-4 rounded text-git-orange focus:ring-0 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-bg-elevated border border-border cursor-pointer">
                <div>
                  <span className="text-white font-bold block">High Contrast Mode</span>
                  <span className="text-text-dim text-[11px]">
                    Enforce WCAG AAA maximum contrast ratio across all modules
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={highContrast}
                  onChange={(e) => setHighContrast(e.target.checked)}
                  className="w-4 h-4 rounded text-git-orange focus:ring-0 cursor-pointer"
                />
              </label>
            </div>

            <div className="flex justify-end pt-3">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-git-orange hover:bg-git-orangeHover text-white text-xs font-semibold shadow-md transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save Preferences</span>
              </button>
            </div>
          </form>
        </div>

        {/* Danger Zone */}
        <div className="p-6 rounded-2xl bg-status-error/5 border border-status-error/20 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-status-error/20">
            <ShieldAlert className="w-5 h-5 text-status-error" />
            <h3 className="font-heading font-bold text-sm text-status-error">Danger Zone</h3>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
            <div>
              <span className="text-white font-bold block">Revoke All GitHub OAuth Tokens</span>
              <span className="text-text-muted text-[11px]">
                Immediately cancels repository webhook listeners and active worker authorizations.
              </span>
            </div>

            <button
              onClick={() => alert('All OAuth tokens revoked. Repositories set to paused.')}
              className="px-4 py-2 rounded-lg bg-status-error/20 hover:bg-status-error/30 border border-status-error/40 text-status-error font-bold transition-all self-start sm:self-auto"
            >
              Revoke Tokens
            </button>
          </div>
        </div>
      </div>
    </ConsoleLayout>
  );
}
