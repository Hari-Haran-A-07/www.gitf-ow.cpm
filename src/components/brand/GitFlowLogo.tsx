'use client';

import React from 'react';
import Link from 'next/link';
import { GitLogo } from './GitLogo';

interface GitFlowLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  href?: string;
  className?: string;
}

export const GitFlowLogo: React.FC<GitFlowLogoProps> = ({
  size = 'md',
  showTagline = false,
  href = '/',
  className = '',
}) => {
  const sizeMap = {
    sm: { icon: 22, text: 'text-base', badge: 'text-[9px] px-1.5 py-0.5' },
    md: { icon: 28, text: 'text-xl', badge: 'text-[10px] px-2 py-0.5' },
    lg: { icon: 38, text: 'text-2xl', badge: 'text-xs px-2.5 py-0.5' },
    xl: { icon: 54, text: 'text-4xl', badge: 'text-sm px-3 py-1' },
  };

  const { icon, text, badge } = sizeMap[size];

  const content = (
    <div className={`flex items-center gap-2.5 group cursor-pointer select-none ${className}`}>
      {/* Official Git Logo with subtle ambient glow */}
      <div className="relative flex items-center justify-center">
        <div className="absolute -inset-1 rounded-full bg-git-orange/20 blur-sm group-hover:bg-git-orange/40 transition-all duration-300" />
        <GitLogo size={icon} className="relative transition-transform duration-300 group-hover:scale-105" />
      </div>

      {/* Modern Wordmark */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className={`font-heading font-black tracking-wider text-white ${text}`}>
            GIT<span className="text-git-orange">FLOW</span>
          </span>
          <span
            className={`font-mono font-semibold uppercase tracking-widest text-brand-electric bg-brand-purple/10 border border-brand-purple/30 rounded-full ${badge}`}
          >
            ECOSYSTEM
          </span>
        </div>

        {showTagline && (
          <span className="text-[10px] tracking-widest uppercase text-text-muted font-mono mt-0.5">
            Automate • Contribute • Grow
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
};
