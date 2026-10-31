'use client';

import React from 'react';
import Link from 'next/link';
import { GitFlowLogo } from '../brand/GitFlowLogo';
import { GitLogo } from '../brand/GitLogo';
import { GitHubMark } from '../brand/GitHubMark';
import { ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border bg-bg-secondary text-text-muted text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <GitFlowLogo size="lg" showTagline={true} />
            <p className="text-sm text-text-muted max-w-sm font-sans leading-relaxed">
              The next-generation autonomous GitHub productivity platform.
              Orchestrating legitimate daily development, automated repository maintenance,
              dual-engine intelligence, and continuous developer growth.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-success opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-status-success" />
              </span>
              <span className="font-mono text-xs text-status-success">
                Autonomous Engines: 100% Operational
              </span>
            </div>
          </div>

          {/* Core Modules */}
          <div>
            <h4 className="font-mono font-bold text-white text-xs uppercase tracking-wider mb-4">
              Intelligence & Code
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Main Dashboard
                </Link>
              </li>
              <li>
                <Link href="/contribution-intelligence" className="hover:text-white transition-colors">
                  GitHub Intelligence (A)
                </Link>
              </li>
              <li>
                <Link href="/automation-intelligence" className="hover:text-white transition-colors">
                  Automation Intelligence (B)
                </Link>
              </li>
              <li>
                <Link href="/repositories" className="hover:text-white transition-colors">
                  Repository Explorer
                </Link>
              </li>
              <li>
                <Link href="/commits" className="hover:text-white transition-colors">
                  Commit Explorer
                </Link>
              </li>
              <li>
                <Link href="/pull-requests" className="hover:text-white transition-colors">
                  Pull Request Manager
                </Link>
              </li>
              <li>
                <Link href="/branches" className="hover:text-white transition-colors">
                  Branch Manager
                </Link>
              </li>
            </ul>
          </div>

          {/* Autonomous Operations */}
          <div>
            <h4 className="font-mono font-bold text-white text-xs uppercase tracking-wider mb-4">
              Autonomous Systems
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/tasks" className="hover:text-white transition-colors">
                  365-Day Daily Tasks
                </Link>
              </li>
              <li>
                <Link href="/automation" className="hover:text-white transition-colors">
                  Automation Center
                </Link>
              </li>
              <li>
                <Link href="/workflow-builder" className="hover:text-white transition-colors">
                  Visual Workflow Builder
                </Link>
              </li>
              <li>
                <Link href="/ai-assistant" className="hover:text-white transition-colors">
                  AI Development Assistant
                </Link>
              </li>
              <li>
                <Link href="/actions" className="hover:text-white transition-colors">
                  GitHub Actions Monitor
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="hover:text-white transition-colors">
                  Developer Analytics
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-white transition-colors">
                  Enterprise Security Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Enterprise & Account */}
          <div>
            <h4 className="font-mono font-bold text-white text-xs uppercase tracking-wider mb-4">
              Organization & SaaS
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/teams" className="hover:text-white transition-colors">
                  Team Workspace
                </Link>
              </li>
              <li>
                <Link href="/organizations" className="hover:text-white transition-colors">
                  Organization Management
                </Link>
              </li>
              <li>
                <Link href="/billing" className="hover:text-white transition-colors">
                  Subscription & Billing
                </Link>
              </li>
              <li>
                <Link href="/github-connect" className="hover:text-white transition-colors">
                  GitHub OAuth & Tokens
                </Link>
              </li>
              <li>
                <Link href="/api-settings" className="hover:text-white transition-colors">
                  API & Webhook Settings
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors">
                  Platform Admin
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-white transition-colors">
                  Documentation & SDK
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Trademark Disclaimers */}
        <div className="mt-14 pt-8 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] text-text-dim">
          <div className="flex flex-col gap-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <GitLogo size={14} />
              <span>
                Git and the official Git logo are trademarks of Software Freedom Conservancy.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <GitHubMark size={13} fill="#A1A1AA" />
              <span>
                GitHub and the GitHub Octocat logo are registered trademarks of GitHub, Inc. GIT FLOW is an independent autonomous developer platform and does not imply official GitHub ownership, endorsement, or partnership.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-git-orange">AUTOMATE. CONTRIBUTE. GROW.</span>
            <span>© 2026 GIT FLOW ECOSYSTEM</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
