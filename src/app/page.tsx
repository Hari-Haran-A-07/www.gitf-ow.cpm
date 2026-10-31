'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GitLogo } from '@/components/brand/GitLogo';
import { GitHubMark } from '@/components/brand/GitHubMark';
import { StreakCalendar } from '@/components/dashboard/StreakCalendar';
import { DualEngineComparison } from '@/components/dashboard/DualEngineComparison';
import { useGitFlow } from '@/lib/store';
import {
  Flame,
  ArrowRight,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  Bot,
  Zap,
  Layers,
  Sparkles,
  GitBranch,
  GitCommit,
  GitPullRequest,
  Lock,
  Users,
  ChevronDown,
  BarChart3,
  CalendarCheck,
  Activity,
  Workflow,
  ShieldAlert,
} from 'lucide-react';

export default function LandingPage() {
  const { engineA, engineB, repositories } = useGitFlow();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Does GIT FLOW create fake commits or fabricate contribution statistics?',
      a: 'Absolutely never. GIT FLOW is built on a strict zero-fabrication pledge. All commits, pull requests, and automated tasks perform legitimate, verified engineering work: repository health checks, documentation updates, dependency security audits, test generation, and approved bug fixes. Engine A displays only verified official GitHub contributions, while Engine B tracks platform automation separately.',
    },
    {
      q: 'How does the 365-Day Daily Contribution Engine work?',
      a: 'The engine generates tailored daily engineering activities (e.g., Day 001: 40 units, Day 002: 35 units, Day 003: 41 units). Each activity represents a real development objective in your authorized repositories—such as writing regression tests, generating OpenAPI specs, or fixing reported issues. Changes undergo tests and developer approval before any PR or commit is made.',
    },
    {
      q: 'What is the difference between Engine A and Engine B?',
      a: 'Engine A (GitHub Contribution Intelligence) tracks official activity recognized by GitHub’s APIs (commits, PRs, issues, code reviews). Engine B (Automation Intelligence) tracks internal platform operations (workflows executed, tests generated, hours saved, security scans). They are completely separate and never conflated.',
    },
    {
      q: 'How does GIT FLOW connect with GitHub securely?',
      a: 'GIT FLOW uses official GitHub REST & GraphQL APIs, GitHub Apps, and OAuth with least-privilege scoping. Tokens are encrypted at rest with AES-256-GCM. We never access private repositories without explicit user authorization, and frontend code never directly exposes raw credentials.',
    },
    {
      q: 'Can I require manual developer approval before code is committed?',
      a: 'Yes. Every automation pipeline supports an immutable User Approval Gate. Autonomous suggestions, refactors, and test suites are staged as draft pull requests or review items that require developer sign-off before merging.',
    },
  ];

  return (
    <div className="min-h-screen bg-bg-primary text-white selection:bg-git-orange/30 overflow-x-hidden">
      {/* 01. Sticky Header */}
      <Navbar />

      {/* 01. CINEMATIC HERO SECTION */}
      <section className="relative pt-20 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Background Radial Glow & Animated Grids */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-git-orange/15 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[400px] bg-brand-purple/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-10 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bg-surface border border-border shadow-sm text-xs font-mono text-text-muted mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-git-orange animate-pulse" />
            <span className="text-white font-medium">THE NEXT-GENERATION GITHUB PRODUCTIVITY PLATFORM</span>
            <span className="text-text-dim">|</span>
            <span className="text-brand-electric">v1.0 ENTERPRISE</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-heading font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase"
          >
            GIT<span className="text-git-orange">FLOW</span>
          </motion.h1>

          {/* Primary Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-3 font-mono font-bold text-lg sm:text-2xl md:text-3xl tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-git-orange via-white to-brand-electric uppercase"
          >
            AUTOMATE. CONTRIBUTE. GROW.
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-base sm:text-lg md:text-xl text-text-muted max-w-2xl font-sans leading-relaxed"
          >
            "Your intelligent GitHub companion for meaningful daily contributions,
            autonomous development workflows, advanced repository management, and
            continuous developer growth."
          </motion.p>

          {/* Additional text & streak */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-4 flex items-center gap-2 text-xs font-mono tracking-widest text-git-orange uppercase font-bold"
          >
            <Flame className="w-4 h-4 fill-git-orange" />
            <span>365 DAYS. REAL CODE. REAL GROWTH.</span>
          </motion.div>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <Link
              href="/github-connect"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-git-orange hover:bg-git-orangeHover text-white font-semibold text-sm tracking-wide transition-all shadow-[0_0_30px_rgba(240,80,50,0.4)] hover:shadow-[0_0_40px_rgba(240,80,50,0.6)] hover:scale-[1.02]"
            >
              <GitHubMark size={18} />
              <span>CONNECT GITHUB</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/dashboard"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-bg-surface hover:bg-bg-elevated border border-border text-white font-medium text-sm transition-all hover:border-border-bright"
            >
              <Terminal className="w-4 h-4 text-brand-electric" />
              <span>EXPLORE PLATFORM</span>
            </Link>
          </motion.div>

          {/* Hero Floating Visual: Official Git Logo & 365 Real Heatmap Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 w-full max-w-5xl rounded-2xl bg-bg-surface/60 border border-border/80 p-4 sm:p-6 backdrop-blur-2xl shadow-2xl relative"
          >
            {/* Ambient Energy Rings visual */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-2xl bg-bg-surface border border-git-orange/40 flex items-center justify-center shadow-[0_0_40px_rgba(240,80,50,0.3)]">
              <GitLogo size={52} />
            </div>

            <div className="pt-8">
              <StreakCalendar />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 02. PRODUCT INTRODUCTION */}
      <section className="py-20 border-t border-border/60 bg-bg-secondary/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="font-mono text-xs font-bold text-git-orange uppercase tracking-wider bg-git-orange/10 px-2.5 py-1 rounded-full border border-git-orange/20">
              02 • PRODUCT INTRODUCTION
            </span>
            <h2 className="mt-4 font-heading font-black text-3xl sm:text-4xl text-white">
              An Autonomous Development Ecosystem Engineered for Excellence
            </h2>
            <p className="mt-4 text-sm sm:text-base text-text-muted leading-relaxed">
              GIT FLOW bridges the gap between ambitious software aspirations and legitimate,
              consistent daily software execution. Millions of students, developers, teams, and
              enterprises use GIT FLOW to turn repository management into an autonomous superpower.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-3">
              <div className="w-10 h-10 rounded-xl bg-git-orange/10 border border-git-orange/30 flex items-center justify-center text-git-orange">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white">Genuine Consistency</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Empower your development journey with continuous 365-day momentum. Every scheduled
                activity produces legitimate value—never empty vanity commits.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-purple/10 border border-brand-purple/30 flex items-center justify-center text-brand-electric">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white">Autonomous Workflows</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Visual node-based automation runs continuous health checks, generates comprehensive unit tests,
                and synchronizes API documentation automatically.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-3">
              <div className="w-10 h-10 rounded-xl bg-status-success/10 border border-status-success/30 flex items-center justify-center text-status-success">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-white">Dual-Engine Integrity</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Independent tracking separates official GitHub contribution statistics from internal platform
                automation metrics. Complete transparency guaranteed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03. WHY GIT FLOW? */}
      <section id="why-gitflow" className="py-20 border-t border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-mono text-xs font-bold text-brand-electric uppercase tracking-wider bg-brand-purple/10 px-2.5 py-1 rounded-full border border-brand-purple/20">
                03 • THE GIT FLOW ADVANTAGE
              </span>
              <h2 className="mt-4 font-heading font-black text-3xl sm:text-4xl text-white leading-tight">
                Why Top Engineers & High-Velocity Teams Choose GIT FLOW
              </h2>
              <p className="mt-4 text-sm text-text-muted leading-relaxed">
                Traditional GitHub maintenance is tedious, reactive, and often broken into sporadic sprints.
                GIT FLOW transforms repository maintenance into an autonomous, proactive engine with continuous
                quality enforcement and verifiable developer progress.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  'Zero Fabricated Commits: 100% legitimate, auditable changes only.',
                  '365-Day Target Planner: Structured targets from Day 001 to Day 365.',
                  'Automated Documentation AST Parity: Zero-drift markdown generator.',
                  'Continuous Dependency & CVE Sentinel: Instant vulnerability alerts.',
                  'Developer Approval Gates: Sensitive actions strictly require human sign-off.',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-status-success flex-shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-text-muted">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-git-orange hover:bg-git-orangeHover text-white text-xs font-semibold tracking-wide transition-all shadow-md"
                >
                  <span>Launch Platform Console</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Visual Comparison Card */}
            <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="font-mono text-xs font-bold text-white uppercase">
                  Ordinary GitHub Workflow vs. GIT FLOW
                </span>
                <span className="text-[10px] font-mono text-git-orange">Zero Drift</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-status-error/5 border border-status-error/20">
                  <span className="font-mono font-bold text-status-error block mb-1">
                    ❌ Traditional Workflow
                  </span>
                  <p className="text-text-muted text-[11px]">
                    Sporadic weekend commits, stale documentation, undetected dependencies CVEs,
                    and manual PR preparation taking hours every sprint.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-status-success/5 border border-status-success/20">
                  <span className="font-mono font-bold text-status-success block mb-1">
                    ✔ GIT FLOW Autonomous Ecosystem
                  </span>
                  <p className="text-text-muted text-[11px]">
                    Deterministic daily targets, automated AST documentation synchronization,
                    AI test suite generation, and dual-engine verified analytics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04. GITHUB INTEGRATION */}
      <section className="py-20 border-t border-border/60 bg-bg-secondary/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto">
          <span className="font-mono text-xs font-bold text-status-info uppercase tracking-wider bg-status-info/10 px-2.5 py-1 rounded-full border border-status-info/20">
            04 • OFFICIAL GITHUB INTEGRATION ENGINE
          </span>
          <h2 className="mt-4 font-heading font-black text-3xl sm:text-4xl text-white">
            Directly Integrated with Official GitHub APIs
          </h2>
          <p className="mt-4 text-sm text-text-muted leading-relaxed">
            GIT FLOW communicates directly with official GitHub REST v3 & GraphQL APIs, GitHub Apps,
            and Webhooks. Connect multiple authorized repositories with fine-grained permissions.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {[
              'Repository Discovery',
              'Branch Management',
              'Commit History',
              'Pull Requests',
              'Issue Tracking',
              'GitHub Actions',
              'Webhook Synchronization',
              'Least-Privilege OAuth',
            ].map((feature, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-lg bg-bg-surface border border-border text-xs font-mono text-white flex items-center gap-1.5"
              >
                <GitHubMark size={14} fill="#8B5CF6" />
                <span>{feature}</span>
              </span>
            ))}
          </div>

          <div className="mt-8">
            <Link
              href="/github-connect"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-bg-surface hover:bg-bg-elevated border border-git-orange/40 text-white text-xs font-mono transition-all"
            >
              <GitHubMark size={16} />
              <span>Configure Authorized GitHub Repositories</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 05. AUTONOMOUS AUTOMATION ENGINE */}
      <section className="py-20 border-t border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="font-mono text-xs font-bold text-git-orange uppercase tracking-wider bg-git-orange/10 px-2.5 py-1 rounded-full border border-git-orange/20">
              05 • AUTONOMOUS AUTOMATION ENGINE
            </span>
            <h2 className="mt-4 font-heading font-black text-3xl sm:text-4xl text-white">
              Autonomous Operations with Mathematical Safety
            </h2>
            <p className="mt-4 text-sm text-text-muted">
              Equipped with safe retries, idempotency locks, duplicate prevention, and developer approval gates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Repository Health Checks',
                desc: 'Audits branch protection rules, linting configurations, and license compliance.',
                icon: ShieldCheck,
                color: 'text-status-success',
              },
              {
                title: 'Documentation Improvements',
                desc: 'Extracts TypeScript types and AST docstrings to maintain 100% Markdown parity.',
                icon: Layers,
                color: 'text-brand-electric',
              },
              {
                title: 'Automated Test Generation',
                desc: 'Identifies untested code branches and constructs high-coverage regression test suites.',
                icon: Cpu,
                color: 'text-git-orange',
              },
              {
                title: 'Dependency & CVE Scanner',
                desc: 'Scans package manifests against GitHub Advisory Database and generates auto PRs.',
                icon: ShieldAlert,
                color: 'text-status-warning',
              },
              {
                title: 'Code Quality Enforcement',
                desc: 'Enforces strict ESLint, Prettier, and AST complexity thresholds across PRs.',
                icon: CheckCircle2,
                color: 'text-brand-cyan',
              },
              {
                title: 'Pull Request Preparation',
                desc: 'Drafts comprehensive semantic pull requests with context-aware changelogs.',
                icon: GitPullRequest,
                color: 'text-status-info',
              },
            ].map((op, idx) => {
              const Icon = op.icon;
              return (
                <div key={idx} className="p-5 rounded-2xl bg-bg-surface border border-border space-y-2">
                  <div className={`w-8 h-8 rounded-lg bg-bg-elevated border border-border flex items-center justify-center ${op.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-heading font-bold text-sm text-white">{op.title}</h4>
                  <p className="text-xs text-text-muted leading-relaxed">{op.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 06. 365-DAY CONTRIBUTION SYSTEM */}
      <section className="py-20 border-t border-border/60 bg-bg-secondary/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-mono text-xs font-bold text-git-orange uppercase tracking-wider bg-git-orange/10 px-2.5 py-1 rounded-full border border-git-orange/20">
              06 • 365-DAY DEVELOPMENT CONSISTENCY
            </span>
            <h2 className="mt-4 font-heading font-black text-3xl sm:text-4xl text-white">
              Deterministic Daily Activity Targets
            </h2>
            <p className="mt-4 text-sm text-text-muted">
              Structured planning targets guide developers from Day 001 through Day 365.
              These represent internal productivity units, never artificially inflated GitHub commits.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-4xl mx-auto">
            {[
              { day: 'Day 001', units: 40, status: 'Completed' },
              { day: 'Day 002', units: 35, status: 'Completed' },
              { day: 'Day 003', units: 41, status: 'Completed' },
              { day: 'Day 004', units: 28, status: 'Completed' },
              { day: 'Day 005', units: 36, status: 'Completed' },
            ].map((d, i) => (
              <div key={i} className="p-4 rounded-xl bg-bg-surface border border-border text-center space-y-1">
                <span className="text-[10px] font-mono text-text-dim uppercase">{d.day}</span>
                <div className="font-heading font-bold text-xl text-white">{d.units} Units</div>
                <span className="text-[9px] font-mono text-status-success bg-status-success/10 px-1.5 py-0.5 rounded">
                  {d.status}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/tasks"
              className="inline-flex items-center gap-2 text-xs font-mono text-git-orange hover:underline"
            >
              <span>Explore all 365 Daily Tasks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 07. AI DEVELOPMENT ASSISTANT */}
      <section className="py-20 border-t border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-mono text-xs font-bold text-brand-electric uppercase tracking-wider bg-brand-purple/10 px-2.5 py-1 rounded-full border border-brand-purple/20">
                07 • AI DEVELOPMENT ASSISTANT
              </span>
              <h2 className="mt-4 font-heading font-black text-3xl sm:text-4xl text-white">
                Context-Aware AI Integrated with Your Codebase
              </h2>
              <p className="mt-4 text-sm text-text-muted leading-relaxed">
                The Git Flow AI Assistant understands entire repository context. It synthesizes
                concrete diffs, catches race conditions, suggests documentation, and explains
                complex algorithms with zero hallucinated files.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  'Deep Repository AST Understanding',
                  'Deterministic Diff Generation with Preview',
                  'Security Vulnerability & Race Condition Audits',
                  'Automated Pull Request Descriptions & Changelogs',
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-text-muted">
                    <Sparkles className="w-4 h-4 text-brand-electric" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  href="/ai-assistant"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-purple hover:bg-brand-electric text-white text-xs font-semibold tracking-wide transition-all shadow-md"
                >
                  <Bot className="w-4 h-4" />
                  <span>Open AI Assistant Console</span>
                </Link>
              </div>
            </div>

            {/* AI Code Diff Preview */}
            <div className="p-5 rounded-2xl bg-bg-surface border border-brand-purple/40 font-mono text-xs shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="text-git-orange font-bold">src/engine/lock-manager.ts</span>
                <span className="text-text-dim text-[10px]">AI Diff Inspection</span>
              </div>
              <pre className="mt-3 p-3 rounded-lg bg-bg-elevated overflow-x-auto text-[11px] leading-relaxed text-text-muted">
                <code>{`@@ -45,7 +45,12 @@
-  async releaseLock(key: string): Promise<boolean> {
-    return await this.redis.del(key);
+  async releaseLock(key: string, lockToken: string): Promise<boolean> {
+    const luaScript = \`
+      if redis.call("get", KEYS[1]) == ARGV[1] then
+        return redis.call("del", KEYS[1])
+      else
+        return 0
+      end\`;
+    return await this.redis.eval(luaScript, 1, key, lockToken) === 1;
   }`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* 08. INTELLIGENT WORKFLOW BUILDER */}
      <section className="py-20 border-t border-border/60 bg-bg-secondary/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto">
          <span className="font-mono text-xs font-bold text-git-orange uppercase tracking-wider bg-git-orange/10 px-2.5 py-1 rounded-full border border-git-orange/20">
            08 • VISUAL WORKFLOW BUILDER
          </span>
          <h2 className="mt-4 font-heading font-black text-3xl sm:text-4xl text-white">
            Drag, Connect, and Deploy Pipelines
          </h2>
          <p className="mt-4 text-sm text-text-muted leading-relaxed">
            Construct enterprise automation graphs with our node-based editor. Connect repository triggers,
            AI analysis, regression test suites, user approval gates, and GitHub synchronization with zero YAML headache.
          </p>

          <div className="mt-8">
            <Link
              href="/workflow-builder"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-git-orange hover:bg-git-orangeHover text-white text-xs font-semibold tracking-wide transition-all shadow-lg"
            >
              <Workflow className="w-4 h-4" />
              <span>Launch Visual Workflow Builder</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 09. REAL-TIME ANALYTICS (DUAL ENGINE) */}
      <section className="py-20 border-t border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-mono text-xs font-bold text-status-success uppercase tracking-wider bg-status-success/10 px-2.5 py-1 rounded-full border border-status-success/20">
              09 • REAL-TIME DUAL-ENGINE ANALYTICS
            </span>
            <h2 className="mt-4 font-heading font-black text-3xl sm:text-4xl text-white">
              Two Strictly Independent Intelligence Engines
            </h2>
            <p className="mt-4 text-sm text-text-muted">
              Engine A: Real GitHub-recognized contributions. Engine B: Platform automation operations.
            </p>
          </div>

          <DualEngineComparison />
        </div>
      </section>

      {/* 10. REPOSITORY MANAGEMENT */}
      <section className="py-20 border-t border-border/60 bg-bg-secondary/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                10 • REPOSITORY EXPLORER
              </span>
              <h2 className="mt-1 font-heading font-bold text-2xl text-white">
                Multi-Repository Portfolio Management
              </h2>
            </div>
            <Link
              href="/repositories"
              className="text-xs font-mono text-git-orange hover:underline flex items-center gap-1"
            >
              <span>View all repositories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {repositories.slice(0, 3).map((repo) => (
              <div key={repo.id} className="p-5 rounded-2xl bg-bg-surface border border-border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-text-dim">{repo.language}</span>
                  <span className="text-[10px] font-mono text-status-success bg-status-success/10 px-2 py-0.5 rounded border border-status-success/20">
                    Health: {repo.healthScore}%
                  </span>
                </div>
                <h4 className="font-heading font-bold text-base text-white truncate">
                  {repo.name}
                </h4>
                <p className="text-xs text-text-muted line-clamp-2 leading-relaxed">
                  {repo.description}
                </p>
                <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-text-dim font-mono">
                  <span>★ {repo.stars} stars</span>
                  <span>{repo.forks} forks</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. DEVELOPER PRODUCTIVITY */}
      <section className="py-20 border-t border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto">
          <span className="font-mono text-xs font-bold text-brand-electric uppercase tracking-wider bg-brand-purple/10 px-2.5 py-1 rounded-full border border-brand-purple/20">
            11 • DEVELOPER PRODUCTIVITY
          </span>
          <h2 className="mt-4 font-heading font-black text-3xl sm:text-4xl text-white">
            Eliminate Context Switching & Burnout
          </h2>
          <p className="mt-4 text-sm text-text-muted leading-relaxed">
            By automating routine chore tasks, generating changelogs, and providing deterministic daily guidance,
            GIT FLOW returns an average of 14 hours per week to individual developers and engineering teams.
          </p>
        </div>
      </section>

      {/* 12. TEAM COLLABORATION */}
      <section className="py-20 border-t border-border/60 bg-bg-secondary/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="font-mono text-xs font-bold text-status-info uppercase tracking-wider bg-status-info/10 px-2.5 py-1 rounded-full border border-status-info/20">
              12 • TEAM & ORGANIZATION WORKSPACE
            </span>
            <h2 className="mt-4 font-heading font-black text-3xl sm:text-4xl text-white">
              Built for Individuals, Teams, and Global Enterprises
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { role: 'Students', desc: 'Build verifiable coding habits and showcase genuine daily commits.' },
              { role: 'Freelancers', desc: 'Maintain client repositories with automated health checks & clean git logs.' },
              { role: 'Startups', desc: 'Ship rapidly without accumulating massive documentation and testing debt.' },
              { role: 'Enterprises', desc: 'Enforce branch policies, SAML SSO, audit trails, and security gates.' },
            ].map((t, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-bg-surface border border-border text-center space-y-2">
                <Users className="w-5 h-5 text-git-orange mx-auto" />
                <h4 className="font-heading font-bold text-base text-white">{t.role}</h4>
                <p className="text-xs text-text-muted leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. ENTERPRISE SECURITY */}
      <section className="py-20 border-t border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="font-mono text-xs font-bold text-status-success uppercase tracking-wider bg-status-success/10 px-2.5 py-1 rounded-full border border-status-success/20">
              13 • ENTERPRISE SECURITY & COMPLIANCE
            </span>
            <h2 className="mt-4 font-heading font-black text-3xl sm:text-4xl text-white">
              Zero-Trust Architecture & AES-256-GCM Encryption
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-2">
              <Lock className="w-5 h-5 text-status-success" />
              <h4 className="font-heading font-bold text-base text-white">Encrypted GitHub Credentials</h4>
              <p className="text-xs text-text-muted leading-relaxed">
                Tokens are encrypted using hardware-isolated KMS keys and AES-256-GCM envelope encryption.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-2">
              <ShieldCheck className="w-5 h-5 text-brand-electric" />
              <h4 className="font-heading font-bold text-base text-white">Role-Based Access Control</h4>
              <p className="text-xs text-text-muted leading-relaxed">
                Strict least-privilege scoping across 7 distinct organizational roles with granular repository permissions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-2">
              <Activity className="w-5 h-5 text-git-orange" />
              <h4 className="font-heading font-bold text-base text-white">Immutable Audit Logging</h4>
              <p className="text-xs text-text-muted leading-relaxed">
                Every workflow execution, approval decision, and webhook sync produces an auditable log entry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 14. PRICING PLANS */}
      <section id="pricing" className="py-20 border-t border-border/60 bg-bg-secondary/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="font-mono text-xs font-bold text-git-orange uppercase tracking-wider bg-git-orange/10 px-2.5 py-1 rounded-full border border-git-orange/20">
              14 • SUBSCRIPTION & SAAS PLANS
            </span>
            <h2 className="mt-4 font-heading font-black text-3xl sm:text-4xl text-white">
              Transparent, Scalable Pricing for Every Stage
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Free */}
            <div className="p-6 rounded-2xl bg-bg-surface border border-border flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs uppercase text-text-dim">Free</span>
                <div className="mt-2 font-heading font-bold text-3xl text-white">$0</div>
                <p className="mt-1 text-xs text-text-muted">For students and individual hobbyists.</p>
                <div className="mt-6 space-y-2 text-xs text-text-muted">
                  <div className="flex items-center gap-2">✓ 1 GitHub Account</div>
                  <div className="flex items-center gap-2">✓ 3 Monitored Repositories</div>
                  <div className="flex items-center gap-2">✓ Basic Analytics Engine A</div>
                  <div className="flex items-center gap-2">✓ Manual Workflows</div>
                </div>
              </div>
              <Link href="/register" className="mt-8 block text-center py-2 rounded-lg bg-bg-elevated border border-border text-xs font-mono text-white hover:bg-bg-elevated/80">
                Get Started
              </Link>
            </div>

            {/* Pro */}
            <div className="p-6 rounded-2xl bg-bg-surface border-2 border-git-orange flex flex-col justify-between shadow-[0_0_30px_rgba(240,80,50,0.2)] relative">
              <span className="absolute -top-3 right-4 text-[10px] font-mono bg-git-orange text-white px-2 py-0.5 rounded-full font-bold">
                POPULAR
              </span>
              <div>
                <span className="font-mono text-xs uppercase text-git-orange font-bold">Pro</span>
                <div className="mt-2 font-heading font-bold text-3xl text-white">$29<span className="text-xs text-text-dim font-normal">/mo</span></div>
                <p className="mt-1 text-xs text-text-muted">For professional developers and contractors.</p>
                <div className="mt-6 space-y-2 text-xs text-text-muted">
                  <div className="flex items-center gap-2 text-white">✓ Unlimited Repositories</div>
                  <div className="flex items-center gap-2 text-white">✓ 365-Day Scheduled Automation</div>
                  <div className="flex items-center gap-2 text-white">✓ Full AI Development Assistant</div>
                  <div className="flex items-center gap-2 text-white">✓ Dual-Engine Analytics</div>
                </div>
              </div>
              <Link href="/register" className="mt-8 block text-center py-2 rounded-lg bg-git-orange text-xs font-semibold text-white hover:bg-git-orangeHover">
                Start Pro Trial
              </Link>
            </div>

            {/* Team */}
            <div className="p-6 rounded-2xl bg-bg-surface border border-brand-purple/40 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs uppercase text-brand-electric font-bold">Team</span>
                <div className="mt-2 font-heading font-bold text-3xl text-white">$79<span className="text-xs text-text-dim font-normal">/mo</span></div>
                <p className="mt-1 text-xs text-text-muted">For high-throughput product development teams.</p>
                <div className="mt-6 space-y-2 text-xs text-text-muted">
                  <div className="flex items-center gap-2">✓ Up to 15 Team Members</div>
                  <div className="flex items-center gap-2">✓ Shared Repositories & Workflows</div>
                  <div className="flex items-center gap-2">✓ Team Velocity Dashboards</div>
                  <div className="flex items-center gap-2">✓ Priority Background Workers</div>
                </div>
              </div>
              <Link href="/register" className="mt-8 block text-center py-2 rounded-lg bg-bg-elevated border border-border text-xs font-mono text-white hover:bg-bg-elevated/80">
                Choose Team
              </Link>
            </div>

            {/* Enterprise */}
            <div className="p-6 rounded-2xl bg-bg-surface border border-border flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs uppercase text-text-dim">Enterprise</span>
                <div className="mt-2 font-heading font-bold text-3xl text-white">Custom</div>
                <p className="mt-1 text-xs text-text-muted">For organizations requiring dedicated SLA and compliance.</p>
                <div className="mt-6 space-y-2 text-xs text-text-muted">
                  <div className="flex items-center gap-2">✓ SAML 2.0 / Okta SSO</div>
                  <div className="flex items-center gap-2">✓ Dedicated Worker Instances</div>
                  <div className="flex items-center gap-2">✓ Custom GitHub Enterprise Host</div>
                  <div className="flex items-center gap-2">✓ 99.99% Guaranteed SLA</div>
                </div>
              </div>
              <Link href="/billing" className="mt-8 block text-center py-2 rounded-lg bg-bg-elevated border border-border text-xs font-mono text-white hover:bg-bg-elevated/80">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 15. FAQ */}
      <section className="py-20 border-t border-border/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-mono text-xs font-bold text-git-orange uppercase tracking-wider bg-git-orange/10 px-2.5 py-1 rounded-full border border-git-orange/20">
              15 • FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="mt-4 font-heading font-black text-3xl sm:text-4xl text-white">
              Everything You Need to Know
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-xl border border-border bg-bg-surface overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-sm font-heading font-bold text-white hover:text-git-orange transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-text-muted transition-transform ${
                      activeFaq === idx ? 'rotate-180 text-git-orange' : ''
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-text-muted leading-relaxed border-t border-border/40 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 16. FINAL CTA */}
      <section className="py-24 border-t border-border/60 bg-gradient-to-b from-bg-surface to-bg-primary text-center px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <GitLogo size={54} className="mx-auto" />
          <h2 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight">
            Build the Future of Consistent Software Development
          </h2>
          <p className="font-mono text-sm tracking-[0.2em] text-git-orange uppercase font-bold">
            AUTOMATE. CONTRIBUTE. GROW.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/github-connect"
              className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-git-orange hover:bg-git-orangeHover text-white font-semibold text-sm transition-all shadow-xl hover:scale-105"
            >
              <GitHubMark size={18} />
              <span>CONNECT GITHUB NOW</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-bg-elevated border border-border text-white font-medium text-sm hover:border-git-orange transition-all"
            >
              <Terminal className="w-4 h-4" />
              <span>Explore Demo Console</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 17. PREMIUM FOOTER */}
      <Footer />
    </div>
  );
}
