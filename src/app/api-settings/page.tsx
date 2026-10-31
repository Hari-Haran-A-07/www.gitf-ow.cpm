'use client';

import React, { useState } from 'react';
import { ConsoleLayout } from '@/components/layout/ConsoleLayout';
import { useGitFlow } from '@/lib/store';
import {
  Key,
  Webhook,
  Plus,
  Copy,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  Send,
  ExternalLink,
} from 'lucide-react';

export default function APISettingsPage() {
  const [apiKeys, setApiKeys] = useState([
    { id: 'key_prod_01', name: 'CI/CD Automation Pipeline', key: 'gf_live_9a8f23bc41098de2', created: '2026-09-12' },
    { id: 'key_prod_02', name: 'Internal Metric Ingest', key: 'gf_live_55ab41cd99120fe1', created: '2026-10-04' },
  ]);

  const [webhookUrl, setWebhookUrl] = useState('https://api.gitflow.dev/v1/webhooks/github');
  const [webhookSecret, setWebhookSecret] = useState('whsec_89dfa1209bca7109ff');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [testSent, setTestSent] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSendTestWebhook = () => {
    setTestSent(true);
    setTimeout(() => setTestSent(false), 2500);
  };

  const handleGenerateKey = () => {
    const newKey = {
      id: `key_prod_${Date.now().toString().slice(-4)}`,
      name: `Custom Token ${apiKeys.length + 1}`,
      key: `gf_live_${Math.random().toString(36).substring(2, 18)}`,
      created: new Date().toISOString().split('T')[0],
    };
    setApiKeys([...apiKeys, newKey]);
  };

  return (
    <ConsoleLayout>
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-git-orange uppercase tracking-wider bg-git-orange/10 px-2 py-0.5 rounded border border-git-orange/20">
                MODULE 26 • DEVELOPER API
              </span>
              <span className="text-xs text-text-dim font-mono">REST & Webhook Dispatcher</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-black text-white">
              API Settings & Webhooks
            </h1>
            <p className="text-xs text-text-muted mt-1">
              Manage platform API keys, configure incoming GitHub webhook listeners, and dispatch telemetry events.
            </p>
          </div>

          <button
            onClick={handleGenerateKey}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-git-orange hover:bg-git-orangeHover text-white text-xs font-semibold tracking-wide transition-all shadow-md self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Generate New API Key</span>
          </button>
        </div>

        {/* API Keys List */}
        <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-4">
          <h3 className="font-heading font-bold text-sm text-white">Active API Keys</h3>
          <div className="space-y-3">
            {apiKeys.map((k) => (
              <div
                key={k.id}
                className="p-4 rounded-xl bg-bg-elevated border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono"
              >
                <div className="space-y-1">
                  <span className="text-white font-bold text-sm">{k.name}</span>
                  <div className="flex items-center gap-2 text-text-dim text-[11px]">
                    <span className="text-git-orange">{k.key.substring(0, 12)}••••••••</span>
                    <span>•</span>
                    <span>Created on {k.created}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopy(k.key)}
                    className="p-2 rounded-lg bg-bg-surface border border-border text-text-muted hover:text-white"
                    title="Copy Key"
                  >
                    {copiedKey === k.key ? (
                      <CheckCircle2 className="w-4 h-4 text-status-success" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() => setApiKeys(apiKeys.filter((item) => item.id !== k.id))}
                    className="p-2 rounded-lg bg-bg-surface border border-border text-status-error hover:bg-status-error/10"
                    title="Revoke Key"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Webhook Configuration */}
        <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <Webhook className="w-4 h-4 text-brand-electric" />
              <h3 className="font-heading font-bold text-sm text-white">
                Incoming GitHub Webhook Endpoint
              </h3>
            </div>
            <span className="text-xs font-mono text-status-success">Listening (Active)</span>
          </div>

          <div className="space-y-4 text-xs font-mono">
            <div>
              <label className="block text-text-muted mb-1">Payload Delivery URL</label>
              <input
                type="text"
                readOnly
                value={webhookUrl}
                className="w-full px-3.5 py-2.5 rounded-lg bg-bg-elevated border border-border text-white text-xs select-all"
              />
            </div>

            <div>
              <label className="block text-text-muted mb-1">Secret Key (HMAC-SHA256)</label>
              <input
                type="password"
                readOnly
                value={webhookSecret}
                className="w-full px-3.5 py-2.5 rounded-lg bg-bg-elevated border border-border text-white text-xs select-all"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-text-dim">
                Subscribed events: `push`, `pull_request`, `workflow_run`, `issues`
              </span>

              <button
                onClick={handleSendTestWebhook}
                disabled={testSent}
                className="px-4 py-2 rounded-lg bg-bg-elevated hover:bg-bg-elevated/80 border border-border text-xs text-white flex items-center gap-2 transition-all"
              >
                <Send className="w-3.5 h-3.5 text-git-orange" />
                <span>{testSent ? 'Ping Delivered (200 OK)' : 'Send Test Ping'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </ConsoleLayout>
  );
}
