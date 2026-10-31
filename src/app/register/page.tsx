'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GitFlowLogo } from '@/components/brand/GitFlowLogo';
import { GitHubMark } from '@/components/brand/GitHubMark';
import { useGitFlow } from '@/lib/store';
import { UserRole } from '@/lib/types';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { updateUser } = useGitFlow();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('developer');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      updateUser({
        name: name || 'Elena Rostova',
        email: email || 'elena.rostova@gitflow.dev',
        role,
      });
      setIsLoading(false);
      setSubmitted(true);
      setTimeout(() => {
        router.push('/github-connect');
      }, 1000);
    }, 800);
  };

  const handleGitHubOAuth = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.push('/github-connect');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col justify-center items-center p-4 sm:p-6 relative">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-git-orange/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <GitFlowLogo size="lg" />
          </div>
          <h1 className="font-heading font-black text-2xl text-white">Create Developer Account</h1>
          <p className="text-xs text-text-muted font-mono uppercase tracking-wider">
            AUTOMATE • CONTRIBUTE • GROW
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl bg-bg-surface border border-border shadow-2xl space-y-5">
          {/* GitHub OAuth Button */}
          <button
            type="button"
            onClick={handleGitHubOAuth}
            className="w-full py-2.5 px-4 rounded-xl bg-bg-elevated hover:bg-bg-elevated/80 border border-border text-white text-xs font-mono font-medium flex items-center justify-center gap-2.5 transition-all hover:border-git-orange shadow-sm"
          >
            <GitHubMark size={16} />
            <span>Continue with GitHub OAuth</span>
          </button>

          <div className="flex items-center gap-3 text-text-dim text-[10px] font-mono uppercase">
            <div className="h-px bg-border flex-1" />
            <span>Or register with email</span>
            <div className="h-px bg-border flex-1" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-mono text-text-muted mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Elena Rostova"
                className="w-full px-3.5 py-2.5 rounded-lg bg-bg-elevated border border-border text-white placeholder-text-dim focus:outline-none focus:border-git-orange text-xs"
              />
            </div>

            <div>
              <label className="block font-mono text-text-muted mb-1">Work Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="elena@company.com"
                className="w-full px-3.5 py-2.5 rounded-lg bg-bg-elevated border border-border text-white placeholder-text-dim focus:outline-none focus:border-git-orange text-xs"
              />
            </div>

            <div>
              <label className="block font-mono text-text-muted mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg bg-bg-elevated border border-border text-white placeholder-text-dim focus:outline-none focus:border-git-orange text-xs"
              />
            </div>

            <div>
              <label className="block font-mono text-text-muted mb-1">Developer Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-bg-elevated border border-border text-white focus:outline-none focus:border-git-orange text-xs font-mono"
              >
                <option value="developer">Individual Developer</option>
                <option value="student">Student / Learner</option>
                <option value="freelancer">Freelancer / Consultant</option>
                <option value="team_member">Team Member</option>
                <option value="team_leader">Team Leader</option>
                <option value="org_admin">Organization Administrator</option>
                <option value="platform_admin">Platform Administrator</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 py-2.5 px-4 rounded-xl bg-git-orange hover:bg-git-orangeHover text-white font-semibold text-xs transition-all shadow-[0_0_20px_rgba(240,80,50,0.3)] flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Creating Account...</span>
              ) : submitted ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Success! Redirecting...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-text-muted">
            Already have an account?{' '}
            <Link href="/login" className="text-git-orange hover:underline font-mono">
              Sign In
            </Link>
          </div>
        </div>

        <div className="text-center text-[11px] text-text-dim flex items-center justify-center gap-1.5 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-status-success" />
          <span>Zero Fabricated Commits Policy • AES-256 Encrypted</span>
        </div>
      </div>
    </div>
  );
}
