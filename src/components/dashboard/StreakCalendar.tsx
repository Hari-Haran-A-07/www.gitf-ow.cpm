'use client';

import React, { useState } from 'react';
import { useGitFlow } from '@/lib/store';
import { Flame, ShieldCheck, Calendar, Info } from 'lucide-react';

export const StreakCalendar: React.FC = () => {
  const { engineA } = useGitFlow();
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null);

  // Group 365 days into 52/53 columns of 7 days
  const weeks: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[][] = [];
  let currentWeek: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[] = [];

  engineA.calendarData.forEach((day, index) => {
    currentWeek.push(day);
    if (currentWeek.length === 7 || index === engineA.calendarData.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  const getLevelColor = (level: number) => {
    switch (level) {
      case 4:
        return 'bg-[#22C55E] hover:ring-2 hover:ring-white'; // High
      case 3:
        return 'bg-[#15803D] hover:ring-2 hover:ring-white';
      case 2:
        return 'bg-[#166534] hover:ring-2 hover:ring-white';
      case 1:
        return 'bg-[#14532D] hover:ring-2 hover:ring-white'; // Low
      default:
        return 'bg-[#1A1A1E] hover:bg-[#27272A]'; // None
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-bg-surface border border-border">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-status-success bg-status-success/10 px-2 py-0.5 rounded border border-status-success/20">
              ENGINE A: GITHUB CONTRIBUTION INTELLIGENCE
            </span>
            <span className="flex items-center gap-1 text-[11px] font-mono text-text-muted">
              <ShieldCheck className="w-3.5 h-3.5 text-status-success" />
              Verified Official Data
            </span>
          </div>
          <h3 className="mt-1 font-heading text-lg font-bold text-white">
            365-Day Real Contribution Heatmap
          </h3>
          <p className="text-xs text-text-muted">
            Measures genuine Git commits, authorized pull requests, code reviews, and issues.
            Never fabricated.
          </p>
        </div>

        {/* Streak Badges */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-git-orange/10 border border-git-orange/30 text-git-orange">
            <Flame className="w-4 h-4 fill-git-orange" />
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider">Current Streak</div>
              <div className="font-heading font-bold text-sm">{engineA.currentStreakDays} Days</div>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-elevated border border-border text-white">
            <Calendar className="w-4 h-4 text-brand-electric" />
            <div>
              <div className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Active Days</div>
              <div className="font-heading font-bold text-sm">{engineA.activeDaysLast365} / 365</div>
            </div>
          </div>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="mt-6 overflow-x-auto pb-2 scrollbar-thin">
        <div className="flex gap-1.5 min-w-[760px]">
          {weeks.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-1.5">
              {week.map((day) => (
                <div
                  key={day.date}
                  onMouseEnter={() => setHoveredDay({ date: day.date, count: day.count })}
                  onMouseLeave={() => setHoveredDay(null)}
                  className={`w-3 h-3 rounded-[3px] transition-all cursor-pointer ${getLevelColor(
                    day.level
                  )}`}
                  title={`${day.date}: ${day.count} verified contributions`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Heatmap Legend & Tooltip Banner */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-text-muted gap-2">
        <div className="font-mono text-[11px] h-5">
          {hoveredDay ? (
            <span className="text-white font-medium">
              <span className="text-status-success font-bold">{hoveredDay.count} verified contributions</span> on{' '}
              {hoveredDay.date}
            </span>
          ) : (
            <span className="text-text-dim flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" /> Hover over any square to view daily verified activity
            </span>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 font-mono text-[10px]">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[#1A1A1E]" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[#14532D]" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[#166534]" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[#15803D]" />
          <div className="w-2.5 h-2.5 rounded-[2px] bg-[#22C55E]" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
};
