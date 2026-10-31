'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ConsoleLayout } from '@/components/layout/ConsoleLayout';
import { useGitFlow } from '@/lib/store';
import {
  FolderGit2,
  Search,
  Plus,
  Star,
  GitFork,
  AlertCircle,
  ShieldCheck,
  Zap,
  Lock,
  Globe,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export default function RepositoriesPage() {
  const { repositories, toggleRepoAutomation, setActiveRepoId } = useGitFlow();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLanguage, setFilterLanguage] = useState('all');

  const filtered = repositories.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLang = filterLanguage === 'all' || r.language.toLowerCase() === filterLanguage.toLowerCase();
    return matchesSearch && matchesLang;
  });

  return (
    <ConsoleLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-git-orange uppercase tracking-wider bg-git-orange/10 px-2 py-0.5 rounded border border-git-orange/20">
                MODULE 06 • REPOSITORY EXPLORER
              </span>
              <span className="text-xs text-text-dim font-mono">{repositories.length} Repositories Connected</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-black text-white">
              Authorized Repository Portfolio
            </h1>
            <p className="text-xs text-text-muted mt-1">
              Manage connected codebases, audit health metrics, and configure autonomous worker schedules.
            </p>
          </div>

          <Link
            href="/github-connect"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-git-orange hover:bg-git-orangeHover text-white text-xs font-semibold tracking-wide transition-all shadow-md self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Connect New Repository</span>
          </Link>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-bg-surface border border-border">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-text-dim absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search repositories, topics..."
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-bg-elevated border border-border text-xs text-white placeholder-text-dim focus:outline-none focus:border-git-orange"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select
              value={filterLanguage}
              onChange={(e) => setFilterLanguage(e.target.value)}
              className="px-3 py-2 rounded-lg bg-bg-elevated border border-border text-xs font-mono text-white focus:outline-none focus:border-git-orange cursor-pointer"
            >
              <option value="all">All Languages</option>
              <option value="typescript">TypeScript</option>
              <option value="go">Go</option>
              <option value="rust">Rust</option>
              <option value="hcl">HCL (Terraform)</option>
            </select>
          </div>
        </div>

        {/* Repository Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((repo) => (
            <div
              key={repo.id}
              className="p-6 rounded-2xl bg-bg-surface border border-border hover:border-border-bright transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Top Badge & Privacy */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-text-dim flex items-center gap-1.5">
                    {repo.isPrivate ? (
                      <>
                        <Lock className="w-3.5 h-3.5 text-text-muted" /> Private
                      </>
                    ) : (
                      <>
                        <Globe className="w-3.5 h-3.5 text-status-success" /> Public
                      </>
                    )}
                  </span>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      repo.healthScore >= 95
                        ? 'text-status-success bg-status-success/10 border-status-success/20'
                        : 'text-status-warning bg-status-warning/10 border-status-warning/20'
                    }`}
                  >
                    Health: {repo.healthScore}%
                  </span>
                </div>

                {/* Repo Title & Description */}
                <div className="mt-4">
                  <Link
                    href={`/repositories/${repo.id}`}
                    onClick={() => setActiveRepoId(repo.id)}
                    className="font-heading font-bold text-lg text-white hover:text-git-orange transition-colors flex items-center gap-2 group-hover:translate-x-0.5 transition-transform"
                  >
                    <FolderGit2 className="w-4 h-4 text-git-orange" />
                    <span className="truncate">{repo.name}</span>
                  </Link>
                  <p className="mt-2 text-xs text-text-muted line-clamp-2 leading-relaxed">
                    {repo.description}
                  </p>
                </div>

                {/* Topics */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {repo.topics.slice(0, 3).map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-0.5 rounded bg-bg-elevated text-[10px] font-mono text-text-dim border border-border"
                    >
                      #{topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Metrics & Automation Switch */}
              <div className="mt-6 pt-4 border-t border-border space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-text-muted">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-git-orange" /> {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5 text-brand-electric" /> {repo.forks}
                    </span>
                  </div>
                  <span className="text-white font-medium">{repo.language}</span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => toggleRepoAutomation(repo.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 border transition-all ${
                      repo.automationEnabled
                        ? 'bg-status-success/10 border-status-success/30 text-status-success'
                        : 'bg-bg-elevated border-border text-text-dim hover:text-white'
                    }`}
                  >
                    <Zap className={`w-3.5 h-3.5 ${repo.automationEnabled ? 'fill-status-success' : ''}`} />
                    <span>{repo.automationEnabled ? 'Automation Active' : 'Automation Paused'}</span>
                  </button>

                  <Link
                    href={`/repositories/${repo.id}`}
                    onClick={() => setActiveRepoId(repo.id)}
                    className="text-xs font-mono text-git-orange hover:underline flex items-center gap-1"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ConsoleLayout>
  );
}
