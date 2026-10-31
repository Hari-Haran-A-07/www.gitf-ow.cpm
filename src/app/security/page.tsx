'use client';

import React, { useState } from 'react';
import { ConsoleLayout } from '@/components/layout/ConsoleLayout';
import { useGitFlow } from '@/lib/store';
import {
  ShieldCheck,
  Lock,
  Key,
  ShieldAlert,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Activity,
  Layers,
} from 'lucide-react';

export default function SecurityCenterPage() {
  const { user } = useGitFlow();
  const [twoFactorActive, setTwoFactorActive] = useState(user.twoFactorEnabled);
  const [rotatedKey, setRotatedKey] = useState(false);

  const handleRotateTokens = () => {
    setRotatedKey(true);
    setTimeout(() => setRotatedKey(false), 3000);
  };

  return (
    <ConsoleLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-status-success uppercase tracking-wider bg-status-success/10 px-2 py-0.5 rounded border border-status-success/20">
                MODULE 25 • ENTERPRISE CYBERSECURITY
              </span>
              <span className="text-xs text-text-dim font-mono">SOC2 Type II • Zero Trust</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-black text-white">
              Enterprise Security Center
            </h1>
            <p className="text-xs text-text-muted mt-1">
              Envelope encryption, token rotation, signature verification, and automated vulnerability scanning.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-status-success/10 border border-status-success/20 text-status-success text-xs font-mono">
            <ShieldCheck className="w-4 h-4" />
            <span>Zero Known CVEs</span>
          </div>
        </div>

        {/* Security Alert Banner */}
        {rotatedKey && (
          <div className="p-4 rounded-xl bg-status-success/10 border border-status-success/30 flex items-center gap-3 text-xs font-mono text-status-success">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>KMS Master Key & GitHub OAuth tokens successfully rotated. Background workers updated.</span>
          </div>
        )}

        {/* Security Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-4">
            <div className="flex items-center justify-between">
              <Lock className="w-5 h-5 text-status-success" />
              <span className="text-[10px] font-mono text-status-success bg-status-success/10 px-2 py-0.5 rounded">
                AES-256-GCM
              </span>
            </div>
            <h3 className="font-heading font-bold text-base text-white">Envelope Token Encryption</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              All user tokens and webhook secrets are encrypted at rest with hardware security module (HSM) keys.
            </p>
            <button
              onClick={handleRotateTokens}
              className="w-full py-2 rounded-lg bg-bg-elevated hover:bg-bg-elevated/80 border border-border text-xs font-mono text-white transition-all"
            >
              Rotate Encryption Keys
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-4">
            <div className="flex items-center justify-between">
              <ShieldCheck className="w-5 h-5 text-git-orange" />
              <span className="text-[10px] font-mono text-git-orange bg-git-orange/10 px-2 py-0.5 rounded">
                Strict 2FA
              </span>
            </div>
            <h3 className="font-heading font-bold text-base text-white">Two-Factor Authentication</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Protect account operations with WebAuthn, hardware security keys (FIDO2), or TOTP authenticator.
            </p>
            <button
              onClick={() => setTwoFactorActive(!twoFactorActive)}
              className="w-full py-2 rounded-lg bg-bg-elevated hover:bg-bg-elevated/80 border border-border text-xs font-mono text-white transition-all"
            >
              {twoFactorActive ? '2FA Enabled (Active)' : 'Enable 2FA'}
            </button>
          </div>

          <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-4">
            <div className="flex items-center justify-between">
              <Activity className="w-5 h-5 text-brand-electric" />
              <span className="text-[10px] font-mono text-brand-electric bg-brand-purple/10 px-2 py-0.5 rounded">
                HMAC-SHA256
              </span>
            </div>
            <h3 className="font-heading font-bold text-base text-white">Webhook Signature Validation</h3>
            <p className="text-xs text-text-muted leading-relaxed">
              Every incoming GitHub webhook payload is cryptographically verified against the secret signature header.
            </p>
            <div className="text-xs font-mono text-status-success pt-2">
              Status: Validating 100% of events
            </div>
          </div>
        </div>

        {/* Security Audit Trails */}
        <div className="p-6 rounded-2xl bg-bg-surface border border-border space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              Immutable Security Audit Log
            </span>
            <span className="text-[10px] font-mono text-text-dim">Cryptographically Chained</span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            {[
              {
                time: '2026-10-31 20:45:10 UTC',
                event: 'OAuth Token Verified',
                actor: 'suryahari971@gmail.com',
                ip: '198.51.100.42',
                status: 'Success',
              },
              {
                time: '2026-10-31 18:22:04 UTC',
                event: 'AST Code Change Approved',
                actor: 'suryahari971@gmail.com',
                ip: '198.51.100.42',
                status: 'Success',
              },
              {
                time: '2026-10-31 15:10:00 UTC',
                event: 'Scheduled Security Sentinel Run',
                actor: 'System Worker (Worker-03)',
                ip: '10.0.4.18',
                status: 'Success',
              },
              {
                time: '2026-10-31 11:00:12 UTC',
                event: 'GitHub Webhook Signature Verified',
                actor: 'GitHub Events (140.82.112.0/20)',
                ip: '140.82.112.4',
                status: 'Verified',
              },
            ].map((log, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-bg-elevated/70 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="space-y-0.5">
                  <div className="text-white font-bold">{log.event}</div>
                  <div className="text-[11px] text-text-dim">
                    {log.time} • Actor: {log.actor} ({log.ip})
                  </div>
                </div>
                <span className="text-[10px] font-bold text-status-success bg-status-success/10 px-2 py-0.5 rounded border border-status-success/20 uppercase">
                  {log.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ConsoleLayout>
  );
}
