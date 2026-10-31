'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ConsoleLayout } from '@/components/layout/ConsoleLayout';
import {
  HelpCircle,
  Search,
  BookOpen,
  ArrowRight,
  Send,
  CheckCircle2,
  FileQuestion,
  LifeBuoy,
} from 'lucide-react';

export default function HelpCenterPage() {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMsg, setTicketMsg] = useState('');
  const [ticketSent, setTicketSent] = useState(false);

  const handleSendTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMsg) return;
    setTicketSent(true);
    setTimeout(() => {
      setTicketSubject('');
      setTicketMsg('');
      setTicketSent(false);
    }, 3000);
  };

  const guides = [
    {
      title: 'Connecting GitHub Accounts and Authorized Repositories',
      desc: 'Step-by-step instructions for fine-grained Personal Access Tokens (PAT) and OAuth scopes.',
      href: '/docs',
    },
    {
      title: 'How the 365-Day Daily Contribution Engine Plans Activity Units',
      desc: 'Understanding legitimate daily repository operations, target units, and execution logs.',
      href: '/tasks',
    },
    {
      title: 'Configuring Node-Based Workflows with Human Approval Gates',
      desc: 'Setting up automated tests, SAST security scans, and mandatory PR sign-offs.',
      href: '/workflow-builder',
    },
    {
      title: 'Explaining the Dual-Engine Architecture (Engine A vs Engine B)',
      desc: 'Why official GitHub metrics are strictly isolated from platform automation telemetry.',
      href: '/contribution-intelligence',
    },
  ];

  return (
    <ConsoleLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-git-orange uppercase tracking-wider bg-git-orange/10 px-2 py-0.5 rounded border border-git-orange/20">
                MODULE 28 • SUPPORT
              </span>
              <span className="text-xs text-text-dim font-mono">24/7 SLA Support</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-black text-white">
              Help Center & Knowledge Base
            </h1>
            <p className="text-xs text-text-muted mt-1">
              Explore troubleshooting documentation, platform tutorials, and contact dedicated engineering support.
            </p>
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guides.map((g, idx) => (
            <Link
              key={idx}
              href={g.href}
              className="p-5 rounded-2xl bg-bg-surface border border-border hover:border-git-orange transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <BookOpen className="w-5 h-5 text-git-orange" />
                <ArrowRight className="w-4 h-4 text-text-dim group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="font-heading font-bold text-sm text-white group-hover:text-git-orange transition-colors">
                {g.title}
              </h3>
              <p className="text-xs text-text-muted leading-relaxed">{g.desc}</p>
            </Link>
          ))}
        </div>

        {/* Contact Support Ticket Form */}
        <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <LifeBuoy className="w-4 h-4 text-brand-electric" />
              <h3 className="font-heading font-bold text-sm text-white">Open Support Ticket</h3>
            </div>
            <span className="text-xs font-mono text-text-dim">Response SLA: &lt; 2 Hours</span>
          </div>

          {ticketSent ? (
            <div className="p-4 rounded-xl bg-status-success/10 border border-status-success/30 flex items-center gap-3 text-xs font-mono text-status-success">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>Ticket submitted! Our customer engineering team will contact you shortly.</span>
            </div>
          ) : (
            <form onSubmit={handleSendTicket} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-text-muted mb-1">Issue Subject</label>
                <input
                  type="text"
                  required
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  placeholder="e.g., Webhook ping signature failed on custom GitHub Enterprise host"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-bg-elevated border border-border text-white text-xs focus:outline-none focus:border-git-orange"
                />
              </div>

              <div>
                <label className="block text-text-muted mb-1">Details & Diagnostics</label>
                <textarea
                  rows={4}
                  required
                  value={ticketMsg}
                  onChange={(e) => setTicketMsg(e.target.value)}
                  placeholder="Describe your question, repository error logs, or configuration assistance..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-bg-elevated border border-border text-white text-xs focus:outline-none focus:border-git-orange font-sans"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-git-orange hover:bg-git-orangeHover text-white text-xs font-semibold shadow-md transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Ticket</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </ConsoleLayout>
  );
}
