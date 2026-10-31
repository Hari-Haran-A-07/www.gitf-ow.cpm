'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GitFlowLogo } from '../brand/GitFlowLogo';
import { useGitFlow } from '@/lib/store';
import {
  LayoutDashboard,
  GitBranch,
  CalendarCheck,
  Bot,
  Sliders,
  FolderGit2,
  GitCommit,
  GitPullRequest,
  AlertCircle,
  PlayCircle,
  BarChart3,
  Users,
  Building2,
  Bell,
  User,
  CreditCard,
  ShieldCheck,
  Key,
  Flame,
  HelpCircle,
  BookOpen,
  Settings,
  ShieldAlert,
  Binary,
  Layers,
  Zap,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { user, notifications, dailyTasks, workflows, engineA } = useGitFlow();

  const unreadCount = notifications.filter((n) => !n.read).length;
  const todayTask = dailyTasks.find((t) => t.dayNumber === 305);
  const activeWorkflowsCount = workflows.filter((w) => w.status === 'active').length;

  const navigationSections = [
    {
      title: 'CORE PLATFORM',
      items: [
        { label: 'Main Dashboard', href: '/dashboard', icon: LayoutDashboard },
        {
          label: 'GitHub Intelligence',
          href: '/contribution-intelligence',
          icon: Flame,
          badge: `${engineA.currentStreakDays}d`,
          badgeColor: 'text-git-orange bg-git-orange/10 border-git-orange/20',
        },
        {
          label: 'Automation Intelligence',
          href: '/automation-intelligence',
          icon: Binary,
          badge: 'Engine B',
          badgeColor: 'text-brand-electric bg-brand-purple/10 border-brand-purple/30',
        },
        { label: 'Repository Explorer', href: '/repositories', icon: FolderGit2 },
      ],
    },
    {
      title: 'AUTONOMOUS ENGINE',
      items: [
        {
          label: 'Daily Task Manager',
          href: '/tasks',
          icon: CalendarCheck,
          badge: todayTask?.status === 'completed' ? 'Done' : 'Day 305',
          badgeColor: 'text-status-success bg-status-success/10 border-status-success/20',
        },
        {
          label: 'Automation Center',
          href: '/automation',
          icon: Zap,
          badge: `${activeWorkflowsCount} Live`,
          badgeColor: 'text-git-orange bg-git-orange/10 border-git-orange/20',
        },
        { label: 'Visual Workflow Builder', href: '/workflow-builder', icon: Sliders },
        { label: 'AI Development Assistant', href: '/ai-assistant', icon: Bot },
      ],
    },
    {
      title: 'GIT OPERATIONS',
      items: [
        { label: 'Commit Explorer', href: '/commits', icon: GitCommit },
        { label: 'Pull Request Manager', href: '/pull-requests', icon: GitPullRequest },
        { label: 'Issue Manager', href: '/issues', icon: AlertCircle },
        { label: 'Branch Manager', href: '/branches', icon: GitBranch },
        { label: 'GitHub Actions Monitor', href: '/actions', icon: PlayCircle },
        { label: 'Developer Analytics', href: '/analytics', icon: BarChart3 },
      ],
    },
    {
      title: 'TEAMS & WORKSPACE',
      items: [
        { label: 'Team Workspace', href: '/teams', icon: Users },
        { label: 'Organization Management', href: '/organizations', icon: Building2 },
        {
          label: 'Notifications Center',
          href: '/notifications',
          icon: Bell,
          badge: unreadCount > 0 ? `${unreadCount}` : undefined,
          badgeColor: 'text-white bg-git-orange',
        },
      ],
    },
    {
      title: 'SYSTEM & SECURITY',
      items: [
        { label: 'GitHub Connection', href: '/github-connect', icon: Layers },
        { label: 'User Profile', href: '/profile', icon: User },
        { label: 'Subscription / Billing', href: '/billing', icon: CreditCard },
        { label: 'Security Center', href: '/security', icon: ShieldCheck },
        { label: 'API & Webhooks', href: '/api-settings', icon: Key },
        { label: 'Platform Admin', href: '/admin', icon: ShieldAlert },
        { label: 'Help Center', href: '/help', icon: HelpCircle },
        { label: 'Documentation', href: '/docs', icon: BookOpen },
        { label: 'Account Settings', href: '/settings', icon: Settings },
      ],
    },
  ];

  return (
    <aside className="w-64 flex-shrink-0 border-r border-border bg-bg-secondary flex flex-col h-screen sticky top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <GitFlowLogo size="md" />
      </div>

      {/* Navigation Links Scrollable Area */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 scrollbar-thin">
        {navigationSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            <h3 className="px-3 text-[10px] font-mono font-bold tracking-wider text-text-dim uppercase">
              {section.title}
            </h3>
            <div className="space-y-0.5 pt-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${
                      isActive
                        ? 'bg-git-orange/10 text-git-orange border border-git-orange/20 shadow-sm'
                        : 'text-text-muted hover:text-white hover:bg-bg-surface'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon
                        className={`w-4 h-4 flex-shrink-0 transition-colors ${
                          isActive ? 'text-git-orange' : 'text-text-muted group-hover:text-white'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full border ${item.badgeColor || 'border-border'}`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer User Badge */}
      <div className="p-3 border-t border-border bg-bg-surface/50">
        <Link
          href="/profile"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-bg-elevated transition-colors"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden border border-border flex items-center justify-center">
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span className="font-bold text-xs text-git-orange">HH</span>
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium text-white truncate">{user.name}</span>
            <span className="text-[10px] font-mono text-brand-electric capitalize">
              {user.role.replace('_', ' ')} • {user.plan}
            </span>
          </div>
        </Link>
      </div>
    </aside>
  );
};
