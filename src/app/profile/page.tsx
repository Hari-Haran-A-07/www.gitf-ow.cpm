'use client';

import React, { useState } from 'react';
import { ConsoleLayout } from '@/components/layout/ConsoleLayout';
import { useGitFlow } from '@/lib/store';
import { GitHubMark } from '@/components/brand/GitHubMark';
import {
  User,
  Mail,
  MapPin,
  Building,
  ShieldCheck,
  Flame,
  CheckCircle2,
  Save,
} from 'lucide-react';

export default function UserProfilePage() {
  const { user, updateUser, engineA } = useGitFlow();
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio || '');
  const [location, setLocation] = useState(user.location || '');
  const [company, setCompany] = useState(user.company || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, bio, location, company });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <ConsoleLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-git-orange uppercase tracking-wider bg-git-orange/10 px-2 py-0.5 rounded border border-git-orange/20">
                MODULE 23 • IDENTITY
              </span>
              <span className="text-xs text-text-dim font-mono">Member Since Jan 2025</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-black text-white">
              User Profile & Credentials
            </h1>
            <p className="text-xs text-text-muted mt-1">
              Manage personal identity, verified GitHub association, and organizational membership.
            </p>
          </div>
        </div>

        {/* Profile Card Banner */}
        <div className="p-6 rounded-2xl bg-bg-surface border border-border flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-git-orange/40 flex-shrink-0 shadow-lg">
            <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-2 text-center sm:text-left flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="font-heading font-black text-2xl text-white">{user.name}</h2>
              <span className="font-mono text-xs font-bold uppercase bg-git-orange/10 text-git-orange px-2 py-0.5 rounded border border-git-orange/20">
                {user.role.replace('_', ' ')}
              </span>
              <span className="font-mono text-xs font-bold uppercase bg-brand-purple/10 text-brand-electric px-2 py-0.5 rounded border border-brand-purple/20">
                {user.plan} Tier
              </span>
            </div>

            <p className="text-xs text-text-muted leading-relaxed max-w-xl">{user.bio}</p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-mono text-text-dim pt-1">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" /> {user.email}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {user.location}
              </span>
              <span className="flex items-center gap-1">
                <Building className="w-3.5 h-3.5" /> {user.company}
              </span>
            </div>
          </div>

          <div className="flex sm:flex-col items-center gap-2 p-3 rounded-xl bg-bg-elevated border border-border text-center">
            <Flame className="w-5 h-5 text-git-orange fill-git-orange" />
            <div className="font-heading font-bold text-lg text-white">
              {engineA.currentStreakDays}d
            </div>
            <span className="text-[10px] font-mono text-text-dim">Streak</span>
          </div>
        </div>

        {/* Edit Form */}
        <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <h3 className="font-heading font-bold text-sm text-white">Edit Profile Information</h3>
            {savedSuccess && (
              <span className="flex items-center gap-1 text-xs font-mono text-status-success">
                <CheckCircle2 className="w-4 h-4" /> Profile Updated
              </span>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono text-text-muted mb-1">Display Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-bg-elevated border border-border text-white text-xs focus:outline-none focus:border-git-orange"
                />
              </div>

              <div>
                <label className="block font-mono text-text-muted mb-1">Company / Organization</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-bg-elevated border border-border text-white text-xs focus:outline-none focus:border-git-orange"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-text-muted mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-bg-elevated border border-border text-white text-xs focus:outline-none focus:border-git-orange"
              />
            </div>

            <div>
              <label className="block font-mono text-text-muted mb-1">Bio</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-bg-elevated border border-border text-white text-xs focus:outline-none focus:border-git-orange"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-git-orange hover:bg-git-orangeHover text-white text-xs font-semibold font-mono shadow-md transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </ConsoleLayout>
  );
}
