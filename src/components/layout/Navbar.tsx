'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { GitFlowLogo } from '../brand/GitFlowLogo';
import { GitHubMark } from '../brand/GitHubMark';
import { useGitFlow } from '@/lib/store';
import { Flame, ArrowRight, Menu, X, Sparkles, Terminal } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, engineA } = useGitFlow();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-bg-primary/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <GitFlowLogo size="md" showTagline={false} />

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-text-muted">
          <Link href="/#why-gitflow" className="hover:text-white transition-colors">
            Why Git Flow
          </Link>
          <Link href="/contribution-intelligence" className="hover:text-white transition-colors flex items-center gap-1.5">
            <span>Intelligence</span>
            <span className="text-[10px] font-mono bg-git-orange/10 text-git-orange px-1.5 py-0.5 rounded border border-git-orange/20">
              Dual
            </span>
          </Link>
          <Link href="/workflow-builder" className="hover:text-white transition-colors flex items-center gap-1.5">
            <span>Workflows</span>
            <Sparkles className="w-3.5 h-3.5 text-brand-electric" />
          </Link>
          <Link href="/tasks" className="hover:text-white transition-colors flex items-center gap-1.5">
            <span>365-Day Engine</span>
            <Flame className="w-3.5 h-3.5 text-git-orange" />
          </Link>
          <Link href="/#pricing" className="hover:text-white transition-colors">
            Pricing
          </Link>
          <Link href="/docs" className="hover:text-white transition-colors">
            Docs
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {/* Real Streak Indicator */}
          <Link
            href="/contribution-intelligence"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-git-orange/10 border border-git-orange/30 text-xs font-mono text-git-orange hover:bg-git-orange/20 transition-all"
            title="Active 365-Day Development Streak"
          >
            <Flame className="w-3.5 h-3.5 fill-git-orange" />
            <span>{engineA.currentStreakDays}d Streak</span>
          </Link>

          {/* GitHub Connection CTA */}
          <Link
            href="/github-connect"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-bg-surface hover:bg-bg-elevated border border-border text-xs font-mono text-white transition-all shadow-sm"
          >
            <GitHubMark size={16} />
            <span>{user.githubConnected ? `@${user.githubUsername}` : 'Connect GitHub'}</span>
          </Link>

          {/* Direct Platform Enter */}
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-git-orange hover:bg-git-orangeHover text-white text-xs font-semibold tracking-wide transition-all shadow-[0_0_15px_rgba(240,80,50,0.3)] hover:shadow-[0_0_20px_rgba(240,80,50,0.5)]"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Open Console</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-bg-surface border border-border text-text-muted hover:text-white"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-bg-secondary p-4 space-y-3">
          <Link
            href="/#why-gitflow"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-text-muted hover:text-white"
          >
            Why Git Flow
          </Link>
          <Link
            href="/contribution-intelligence"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-text-muted hover:text-white"
          >
            Dual Analytics Engine
          </Link>
          <Link
            href="/workflow-builder"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-text-muted hover:text-white"
          >
            Workflow Builder
          </Link>
          <Link
            href="/tasks"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-text-muted hover:text-white"
          >
            365-Day Daily Tasks
          </Link>
          <Link
            href="/#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-text-muted hover:text-white"
          >
            Pricing & SaaS Plans
          </Link>
          <Link
            href="/docs"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm text-text-muted hover:text-white"
          >
            Documentation
          </Link>
          <div className="pt-3 border-t border-border flex flex-col gap-2">
            <Link
              href="/github-connect"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2 rounded-lg bg-bg-surface border border-border text-xs text-white"
            >
              <GitHubMark size={16} />
              <span>Connect GitHub</span>
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2 rounded-lg bg-git-orange text-xs font-semibold text-white"
            >
              <Terminal className="w-4 h-4" />
              <span>Open Application Console</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
