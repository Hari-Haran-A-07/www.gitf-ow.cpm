'use client';

import React, { useState } from 'react';
import { ConsoleLayout } from '@/components/layout/ConsoleLayout';
import { useGitFlow } from '@/lib/store';
import { SaaSPlan } from '@/lib/types';
import {
  CreditCard,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Download,
  ArrowRight,
  Flame,
} from 'lucide-react';

export default function SubscriptionManagementPage() {
  const { user, updateUser } = useGitFlow();
  const [currentPlan, setCurrentPlan] = useState<SaaSPlan>(user.plan);
  const [upgradeMsg, setUpgradeMsg] = useState<string | null>(null);

  const handleSelectPlan = (plan: SaaSPlan) => {
    setCurrentPlan(plan);
    updateUser({ plan });
    setUpgradeMsg(`Successfully switched subscription to ${plan.toUpperCase()} tier!`);
    setTimeout(() => setUpgradeMsg(null), 3000);
  };

  const invoices = [
    { id: 'INV-2026-003', date: 'Oct 01, 2026', amount: '$29.00', status: 'Paid', plan: 'Pro' },
    { id: 'INV-2026-002', date: 'Sep 01, 2026', amount: '$29.00', status: 'Paid', plan: 'Pro' },
    { id: 'INV-2026-001', date: 'Aug 01, 2026', amount: '$29.00', status: 'Paid', plan: 'Pro' },
  ];

  return (
    <ConsoleLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-git-orange uppercase tracking-wider bg-git-orange/10 px-2 py-0.5 rounded border border-git-orange/20">
                MODULE 24 • SAAS & BILLING
              </span>
              <span className="text-xs text-text-dim font-mono">Active Plan: {currentPlan.toUpperCase()}</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-black text-white">
              Subscription Management & Entitlements
            </h1>
            <p className="text-xs text-text-muted mt-1">
              Verify organizational entitlements, adjust seat capacity, and manage recurring payment methods.
            </p>
          </div>
        </div>

        {/* Upgrade Success Notification */}
        {upgradeMsg && (
          <div className="p-4 rounded-xl bg-status-success/10 border border-status-success/30 flex items-center gap-3 text-xs font-mono text-status-success">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{upgradeMsg}</span>
          </div>
        )}

        {/* Pricing Tier Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              id: 'free' as SaaSPlan,
              name: 'Free',
              price: '$0',
              period: '',
              desc: 'For students and individual hobbyists.',
              features: ['1 GitHub Account', '3 Monitored Repos', 'Basic Analytics', 'Manual Workflows'],
            },
            {
              id: 'pro' as SaaSPlan,
              name: 'Pro',
              price: '$29',
              period: '/mo',
              desc: 'For professional software developers.',
              features: ['Unlimited Repos', '365-Day Scheduled Auto', 'Full AI Assistant', 'Dual-Engine Analytics'],
            },
            {
              id: 'team' as SaaSPlan,
              name: 'Team',
              price: '$79',
              period: '/mo',
              desc: 'For fast-shipping product engineering squads.',
              features: ['Up to 15 Members', 'Shared Workflows', 'Velocity Dashboards', 'Priority Workers'],
            },
            {
              id: 'enterprise' as SaaSPlan,
              name: 'Enterprise',
              price: '$299',
              period: '/mo',
              desc: 'Dedicated infrastructure, SAML SSO & SLA.',
              features: ['SAML 2.0 / Okta SSO', 'Dedicated BullMQ Cluster', 'Audit Retention (1yr)', '99.99% SLA'],
            },
          ].map((plan) => {
            const isCurrent = currentPlan === plan.id;
            return (
              <div
                key={plan.id}
                className={`p-6 rounded-2xl bg-bg-surface border flex flex-col justify-between space-y-4 transition-all ${
                  isCurrent
                    ? 'border-git-orange shadow-[0_0_30px_rgba(240,80,50,0.2)] ring-1 ring-git-orange'
                    : 'border-border hover:border-border-bright'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase font-bold text-white">{plan.name}</span>
                    {isCurrent && (
                      <span className="text-[10px] font-mono bg-git-orange text-white px-2 py-0.5 rounded-full font-bold">
                        ACTIVE
                      </span>
                    )}
                  </div>

                  <div className="font-heading font-black text-3xl text-white">
                    {plan.price}
                    <span className="text-xs text-text-dim font-normal font-sans">{plan.period}</span>
                  </div>
                  <p className="text-xs text-text-muted">{plan.desc}</p>

                  <div className="pt-2 space-y-2 text-xs text-text-muted">
                    {plan.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-status-success flex-shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={isCurrent}
                  className={`w-full py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                    isCurrent
                      ? 'bg-bg-elevated text-text-dim cursor-default'
                      : 'bg-git-orange hover:bg-git-orangeHover text-white shadow-md'
                  }`}
                >
                  {isCurrent ? 'Current Plan' : `Switch to ${plan.name}`}
                </button>
              </div>
            );
          })}
        </div>

        {/* Invoice History */}
        <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-4">
          <h3 className="font-heading font-bold text-sm text-white">Billing & Invoices History</h3>
          <div className="space-y-2">
            {invoices.map((inv) => (
              <div
                key={inv.id}
                className="p-3.5 rounded-xl bg-bg-elevated border border-border flex items-center justify-between text-xs font-mono"
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="w-4 h-4 text-git-orange" />
                  <span className="text-white font-bold">{inv.id}</span>
                  <span className="text-text-dim">{inv.date}</span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-white font-bold">{inv.amount}</span>
                  <span className="text-[10px] text-status-success bg-status-success/10 px-2 py-0.5 rounded border border-status-success/20 uppercase font-bold">
                    {inv.status}
                  </span>
                  <button
                    onClick={() => alert(`Downloading invoice receipt for ${inv.id}`)}
                    className="p-1 rounded text-text-dim hover:text-white"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ConsoleLayout>
  );
}
