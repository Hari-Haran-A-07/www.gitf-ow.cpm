'use client';

import React from 'react';
import { ConsoleLayout } from '@/components/layout/ConsoleLayout';
import { useGitFlow } from '@/lib/store';
import {
  Building2,
  ShieldCheck,
  Users,
  FolderGit2,
  Zap,
  Key,
  Lock,
  CheckCircle2,
} from 'lucide-react';

export default function OrganizationManagementPage() {
  const { organization } = useGitFlow();

  return (
    <ConsoleLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-brand-electric uppercase tracking-wider bg-brand-purple/10 px-2 py-0.5 rounded border border-brand-purple/30">
                MODULE 21 • ENTERPRISE
              </span>
              <span className="text-xs text-text-dim font-mono">Enterprise Tenant</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-black text-white">
              Organization Management
            </h1>
            <p className="text-xs text-text-muted mt-1">
              Multi-tenant administration, SAML 2.0 Single Sign-On, policy enforcement, and compliance audit exports.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-status-success/10 border border-status-success/20 text-status-success text-xs font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>SAML SSO Active</span>
          </div>
        </div>

        {/* Enterprise Organization Card */}
        <div className="p-6 rounded-2xl bg-bg-surface border border-border flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-bg-elevated border border-border p-2 flex items-center justify-center">
              <Building2 className="w-8 h-8 text-git-orange" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading font-black text-xl text-white">{organization.name}</h2>
                <span className="text-[10px] font-mono uppercase bg-git-orange/10 text-git-orange px-2 py-0.5 rounded border border-git-orange/20 font-bold">
                  {organization.plan}
                </span>
              </div>
              <p className="text-xs text-text-muted mt-1 font-mono">Tenant ID: {organization.slug}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <div className="p-3 rounded-xl bg-bg-elevated border border-border text-center">
              <span className="text-[10px] text-text-dim uppercase block">Members</span>
              <span className="text-white font-bold text-sm">{organization.memberCount}</span>
            </div>
            <div className="p-3 rounded-xl bg-bg-elevated border border-border text-center">
              <span className="text-[10px] text-text-dim uppercase block">Repositories</span>
              <span className="text-white font-bold text-sm">{organization.repoCount}</span>
            </div>
            <div className="p-3 rounded-xl bg-bg-elevated border border-border text-center">
              <span className="text-[10px] text-text-dim uppercase block">Workflows</span>
              <span className="text-git-orange font-bold text-sm">{organization.activeWorkflows}</span>
            </div>
          </div>
        </div>

        {/* Security & Access Policies */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-4">
            <h3 className="font-heading font-bold text-sm text-white">Identity & SSO Configuration</h3>
            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-bg-elevated border border-border flex items-center justify-between">
                <div>
                  <span className="text-white font-semibold block">SAML 2.0 / Okta SSO</span>
                  <span className="text-text-dim text-[11px]">Enforce corporate identity provider</span>
                </div>
                <span className="text-status-success font-bold">Enabled</span>
              </div>

              <div className="p-3 rounded-lg bg-bg-elevated border border-border flex items-center justify-between">
                <div>
                  <span className="text-white font-semibold block">Two-Factor Authentication</span>
                  <span className="text-text-dim text-[11px]">Mandatory for all 48 members</span>
                </div>
                <span className="text-status-success font-bold">Enforced</span>
              </div>

              <div className="p-3 rounded-lg bg-bg-elevated border border-border flex items-center justify-between">
                <div>
                  <span className="text-white font-semibold block">SCIM Provisioning</span>
                  <span className="text-text-dim text-[11px]">Automatic user de-provisioning on offboarding</span>
                </div>
                <span className="text-status-success font-bold">Synced</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-4">
            <h3 className="font-heading font-bold text-sm text-white">Repository Access Control</h3>
            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 rounded-lg bg-bg-elevated border border-border flex items-center justify-between">
                <div>
                  <span className="text-white font-semibold block">Signed Commit Enforcement</span>
                  <span className="text-text-dim text-[11px]">Block unverified Git author signatures</span>
                </div>
                <span className="text-status-success font-bold">Active</span>
              </div>

              <div className="p-3 rounded-lg bg-bg-elevated border border-border flex items-center justify-between">
                <div>
                  <span className="text-white font-semibold block">Immutable Audit Log Retention</span>
                  <span className="text-text-dim text-[11px]">SOC2 Type II compliant log archive</span>
                </div>
                <span className="text-white font-bold">365 Days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ConsoleLayout>
  );
}
