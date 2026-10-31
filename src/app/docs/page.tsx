'use client';

import React, { useState } from 'react';
import { ConsoleLayout } from '@/components/layout/ConsoleLayout';
import {
  BookOpen,
  Code,
  Terminal,
  ShieldCheck,
  Copy,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

export default function DocumentationPage() {
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2000);
  };

  const tsCode = `import { GitFlowClient } from '@gitflow/sdk';

const gitflow = new GitFlowClient({
  apiKey: process.env.GITFLOW_API_KEY,
  githubToken: process.env.GITHUB_TOKEN,
});

// Trigger autonomous repository health sentinel
const run = await gitflow.workflows.execute({
  repository: 'alexrivera-dev/core-workflow-engine',
  branch: 'main',
  requireApproval: true,
});

console.log(\`Pipeline \${run.id} executed successfully. Status: \${run.status}\`);`;

  return (
    <ConsoleLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-git-orange uppercase tracking-wider bg-git-orange/10 px-2 py-0.5 rounded border border-git-orange/20">
                MODULE 29 • SDK & DOCUMENTATION
              </span>
              <span className="text-xs text-text-dim font-mono">TypeScript / Python / REST</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-black text-white">
              Official GIT FLOW API & SDK Documentation
            </h1>
            <p className="text-xs text-text-muted mt-1">
              Integrate the autonomous developer productivity ecosystem into your existing CI/CD and developer toolchains.
            </p>
          </div>
        </div>

        {/* Quickstart Card */}
        <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <span className="font-heading font-bold text-sm text-white">
              TypeScript / Node.js SDK Quickstart
            </span>
            <button
              onClick={() => handleCopy(tsCode, 'ts')}
              className="text-xs font-mono text-text-muted hover:text-white flex items-center gap-1.5"
            >
              {copiedSnippet === 'ts' ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-status-success" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>{copiedSnippet === 'ts' ? 'Copied' : 'Copy Code'}</span>
            </button>
          </div>

          <pre className="p-4 rounded-xl bg-bg-elevated border border-border text-xs font-mono text-text-muted overflow-x-auto leading-relaxed">
            <code>{tsCode}</code>
          </pre>
        </div>

        {/* REST API Endpoints Table */}
        <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-4">
          <h3 className="font-heading font-bold text-sm text-white">Official REST Endpoints</h3>
          <div className="space-y-2 font-mono text-xs">
            {[
              { method: 'GET', endpoint: '/api/github/user', desc: 'Verify official GitHub token and retrieve active scopes' },
              { method: 'GET', endpoint: '/api/repositories', desc: 'List authorized repositories with health scores' },
              { method: 'POST', endpoint: '/api/workflows/run', desc: 'Execute autonomous pipeline with deterministic locks' },
              { method: 'GET', endpoint: '/api/tasks/365', desc: 'Fetch 365-day scheduled daily engineering targets' },
              { method: 'POST', endpoint: '/api/ai/suggest', desc: 'Request AST-contextual code diff improvements' },
            ].map((route, i) => (
              <div
                key={i}
                className="p-3 rounded-lg bg-bg-elevated border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      route.method === 'GET'
                        ? 'text-status-success bg-status-success/10'
                        : 'text-git-orange bg-git-orange/10'
                    }`}
                  >
                    {route.method}
                  </span>
                  <span className="text-white font-bold">{route.endpoint}</span>
                </div>
                <span className="text-text-muted text-[11px]">{route.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ConsoleLayout>
  );
}
