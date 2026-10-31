'use client';

import React, { useState } from 'react';
import { ConsoleLayout } from '@/components/layout/ConsoleLayout';
import { useGitFlow } from '@/lib/store';
import { TeamMember } from '@/lib/types';
import {
  Users,
  Plus,
  Mail,
  ShieldCheck,
  Flame,
  FolderGit2,
  CheckCircle2,
} from 'lucide-react';

export default function TeamWorkspacePage() {
  const { teamMembers, repositories } = useGitFlow();
  const [members, setMembers] = useState<TeamMember[]>(teamMembers);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'Leader' | 'Core Dev' | 'Maintainer' | 'Contributor'>('Contributor');

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName || !inviteEmail) return;

    const newMember: TeamMember = {
      id: `tm_${Date.now()}`,
      name: inviteName,
      email: inviteEmail,
      avatarUrl:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=128&q=80',
      role: inviteRole,
      assignedRepos: ['core-workflow-engine'],
      tasksAssigned: 5,
      streakDays: 1,
    };

    setMembers((prev) => [...prev, newMember]);
    setInviteName('');
    setInviteEmail('');
    setShowInviteModal(false);
  };

  return (
    <ConsoleLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-git-orange uppercase tracking-wider bg-git-orange/10 px-2 py-0.5 rounded border border-git-orange/20">
                MODULE 20 • TEAMS
              </span>
              <span className="text-xs text-text-dim font-mono">{members.length} Active Members</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-black text-white">
              Team Workspace & Collaboration
            </h1>
            <p className="text-xs text-text-muted mt-1">
              Assign repository ownership, track member development streaks, and orchestrate group automation policies.
            </p>
          </div>

          <button
            onClick={() => setShowInviteModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-git-orange hover:bg-git-orangeHover text-white text-xs font-semibold tracking-wide transition-all shadow-md self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Invite Member</span>
          </button>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member) => (
            <div
              key={member.id}
              className="p-6 rounded-2xl bg-bg-surface border border-border hover:border-border-bright transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-border">
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[10px] font-mono text-brand-electric bg-brand-purple/10 px-2 py-0.5 rounded border border-brand-purple/20 font-bold uppercase">
                    {member.role}
                  </span>
                </div>

                <div>
                  <h3 className="font-heading font-bold text-base text-white">{member.name}</h3>
                  <p className="text-xs text-text-muted truncate font-mono">{member.email}</p>
                </div>

                {/* Assigned Repos */}
                <div className="space-y-1 text-xs">
                  <span className="text-[10px] font-mono text-text-dim uppercase">Assigned Repos:</span>
                  <div className="flex flex-wrap gap-1">
                    {member.assignedRepos.map((repo) => (
                      <span
                        key={repo}
                        className="px-2 py-0.5 rounded bg-bg-elevated border border-border text-[10px] font-mono text-git-orange truncate max-w-[140px]"
                      >
                        {repo}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Streak and Tasks */}
              <div className="pt-3 border-t border-border flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-1 text-git-orange">
                  <Flame className="w-3.5 h-3.5 fill-git-orange" />
                  <span>{member.streakDays}d Streak</span>
                </div>
                <span className="text-text-dim">{member.tasksAssigned} Tasks</span>
              </div>
            </div>
          ))}
        </div>

        {/* Invite Member Modal */}
        {showInviteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
            <div className="w-full max-w-md rounded-2xl bg-bg-surface border border-border p-6 space-y-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <h3 className="font-heading font-bold text-base text-white">
                  Invite Team Collaborator
                </h3>
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="text-text-muted hover:text-white font-mono text-xs"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleInviteSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-mono text-text-muted mb-1">Collaborator Name</label>
                  <input
                    type="text"
                    required
                    value={inviteName}
                    onChange={(e) => setInviteName(e.target.value)}
                    placeholder="Marcus Chen"
                    className="w-full px-3 py-2 rounded-lg bg-bg-elevated border border-border text-white focus:outline-none focus:border-git-orange"
                  />
                </div>

                <div>
                  <label className="block font-mono text-text-muted mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="marcus@gitflow.dev"
                    className="w-full px-3 py-2 rounded-lg bg-bg-elevated border border-border text-white focus:outline-none focus:border-git-orange"
                  />
                </div>

                <div>
                  <label className="block font-mono text-text-muted mb-1">Workspace Role</label>
                  <select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg bg-bg-elevated border border-border text-white font-mono focus:outline-none focus:border-git-orange"
                  >
                    <option value="Contributor">Contributor</option>
                    <option value="Core Dev">Core Dev</option>
                    <option value="Maintainer">Maintainer</option>
                    <option value="Leader">Leader</option>
                  </select>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowInviteModal(false)}
                    className="px-4 py-2 rounded-lg bg-bg-elevated border border-border text-text-muted hover:text-white font-mono"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-git-orange hover:bg-git-orangeHover text-white font-semibold font-mono shadow-md"
                  >
                    Send Invitation
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </ConsoleLayout>
  );
}
