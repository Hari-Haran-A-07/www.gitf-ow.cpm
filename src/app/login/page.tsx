'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GitFlowLogo } from '@/components/brand/GitFlowLogo';
import { GitHubMark } from '@/components/brand/GitHubMark';
import { useGitFlow } from '@/lib/store';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { updateUser } = useGitFlow();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 700);
  };

  const handleQuickDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      updateUser({
        name: 'Alex Rivera',
        email: 'alex.rivera@gitflow.dev',
        role: 'team_leader',
        plan: 'pro',
      });
      router.push('/dashboard');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col justify-center items-center p-4 sm:p-6 relative">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-purple/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <GitFlowLogo size="lg" />
          </div>
          <h1 className="font-heading font-black text-2xl text-white">Sign In to GIT FLOW</h1>
          <p className="text-xs text-text-muted font-mono uppercase tracking-wider">
            AUTOMATE • CONTRIBUTE • GROW
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-bg-surface border border-border shadow-2xl space-y-5">
          {/* Quick Demo Login Option */}
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-git-orange/20 to-brand-purple/20 border border-git-orange/40 hover:border-git-orange text-white text-xs font-mono font-medium flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-git-orange" />
            <span>One-Click Demo Sign In (Team Leader)</span>
          </button>

          <div className="flex items-center gap-3 text-text-dim text-[10px] font-mono uppercase">
            <div className="h-px bg-border flex-1" />
            <span>Or continue with credentials</span>
            <div className="h-px bg-border flex-1" />
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block font-mono text-text-muted mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex.rivera@gitflow.dev"
                className="w-full px-3.5 py-2.5 rounded-lg bg-bg-elevated border border-border text-white placeholder-text-dim focus:outline-none focus:border-git-orange text-xs"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-mono text-text-muted">Password</label>
                <button
                  type="button"
                  onClick={() => alert('Password reset link dispatched to authorized email.')}
                  className="text-[10px] font-mono text-git-orange hover:underline"
                >
                  Forgot?
                </button>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg bg-bg-elevated border border-border text-white placeholder-text-dim focus:outline-none focus:border-git-orange text-xs"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 py-2.5 px-4 rounded-xl bg-git-orange hover:bg-git-orangeHover text-white font-semibold text-xs transition-all shadow-[0_0_20px_rgba(240,80,50,0.3)] flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* GitHub OAuth alternative */}
          <button
            type="button"
            onClick={() => router.push('/github-connect')}
            className="w-full py-2.5 px-4 rounded-xl bg-bg-elevated hover:bg-bg-elevated/80 border border-border text-white text-xs font-mono font-medium flex items-center justify-center gap-2.5 transition-all"
          >
            <GitHubMark size={16} />
            <span>Sign In with GitHub</span>
          </button>

          <div className="pt-2 text-center text-xs text-text-muted">
            Don't have an account yet?{' '}
            <Link href="/register" className="text-git-orange hover:underline font-mono">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
