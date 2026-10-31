'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { AppHeader } from './AppHeader';

export const ConsoleLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen bg-bg-primary text-white overflow-hidden selection:bg-git-orange/30">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Body */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top App Header */}
        <AppHeader />

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 scrollbar-thin">
          {children}
        </main>
      </div>
    </div>
  );
};
