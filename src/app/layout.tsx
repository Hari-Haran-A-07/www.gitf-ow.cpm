import type { Metadata } from 'next';
import './globals.css';
import { GitFlowProvider } from '@/lib/store';
import { CinematicIntro } from '@/components/intro/CinematicIntro';

export const metadata: Metadata = {
  title: 'GIT FLOW — The Ultimate Autonomous GitHub Productivity Ecosystem',
  description:
    'AUTOMATE. CONTRIBUTE. GROW. 365 DAYS. REAL CODE. REAL CONTRIBUTIONS. REAL DEVELOPER GROWTH. An intelligent, autonomous, scalable developer productivity ecosystem.',
  icons: {
    icon: 'https://git-scm.com/images/logos/downloads/Git-Logo-2Color.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-bg-primary text-white min-h-screen antialiased selection:bg-git-orange/30">
        <GitFlowProvider>
          <CinematicIntro />
          {children}
        </GitFlowProvider>
      </body>
    </html>
  );
}
