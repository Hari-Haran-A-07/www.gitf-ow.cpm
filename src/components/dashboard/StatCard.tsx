'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  badge?: string;
  badgeColor?: string;
  variant?: 'orange' | 'purple' | 'green' | 'blue' | 'default';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  badge,
  badgeColor = 'text-git-orange bg-git-orange/10 border-git-orange/20',
  variant = 'default',
}) => {
  const borderVariants = {
    orange: 'hover:border-git-orange/50 hover:shadow-[0_0_20px_rgba(240,80,50,0.15)]',
    purple: 'hover:border-brand-purple/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]',
    green: 'hover:border-status-success/50 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]',
    blue: 'hover:border-status-info/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]',
    default: 'hover:border-border-bright',
  };

  const iconColors = {
    orange: 'text-git-orange bg-git-orange/10 border-git-orange/20',
    purple: 'text-brand-electric bg-brand-purple/10 border-brand-purple/30',
    green: 'text-status-success bg-status-success/10 border-status-success/20',
    blue: 'text-status-info bg-status-info/10 border-status-info/20',
    default: 'text-text-muted bg-bg-elevated border-border',
  };

  return (
    <div
      className={`p-5 rounded-2xl bg-bg-surface border border-border transition-all duration-300 ${borderVariants[variant]}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <span className="text-xs font-mono uppercase tracking-wider text-text-muted">
            {title}
          </span>
          <div className="font-heading font-bold text-2xl sm:text-3xl text-white tracking-tight">
            {value}
          </div>
        </div>

        <div className={`p-2.5 rounded-xl border ${iconColors[variant]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs">
        {subtitle && <span className="text-text-dim truncate">{subtitle}</span>}
        {badge && (
          <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full border ${badgeColor}`}>
            {badge}
          </span>
        )}
      </div>
    </div>
  );
};
