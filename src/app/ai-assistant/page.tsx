'use client';

import React, { useState } from 'react';
import { ConsoleLayout } from '@/components/layout/ConsoleLayout';
import { useGitFlow } from '@/lib/store';
import {
  Bot,
  Sparkles,
  Send,
  CheckCircle2,
  AlertTriangle,
  FolderGit2,
  FileCode,
  Shield,
  Layers,
  Zap,
} from 'lucide-react';

export default function AIAssistantPage() {
  const { repositories, activeRepoId, aiSuggestions, approveAISuggestion, rejectAISuggestion } = useGitFlow();
  const [selectedRepoId, setSelectedRepoId] = useState(activeRepoId);
  const [promptInput, setPromptInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    { sender: 'user' | 'assistant'; text: string; diff?: string; file?: string }[]
  >([
    {
      sender: 'assistant',
      text: 'Hello Hari! I am your Git Flow Autonomous AI Assistant. I have indexed the AST and dependency graphs across all 6 authorized repositories. How can I assist your engineering workflow today?',
    },
  ]);

  const activeRepo = repositories.find((r) => r.id === selectedRepoId) || repositories[0];

  const handleSendPrompt = (textToSend?: string) => {
    const q = textToSend || promptInput;
    if (!q.trim()) return;

    const userMsg = { sender: 'user' as const, text: q };
    setChatMessages((prev) => [...prev, userMsg]);
    setPromptInput('');
    setIsGenerating(true);

    setTimeout(() => {
      let replyText = '';
      let replyDiff = '';
      let fileTarget = '';

      if (q.toLowerCase().includes('race') || q.toLowerCase().includes('lock')) {
        replyText =
          'I analyzed `lock-manager.ts` in `core-workflow-engine`. I identified a potential race condition where the mutex release does not verify the lock token before deleting the Redis key. Here is the verified atomic Lua script fix:';
        fileTarget = 'src/engine/lock-manager.ts';
        replyDiff = `@@ -45,7 +45,12 @@
-  async releaseLock(key: string): Promise<boolean> {
-    return await this.redis.del(key);
+  async releaseLock(key: string, lockToken: string): Promise<boolean> {
+    const luaScript = \`
+      if redis.call("get", KEYS[1]) == ARGV[1] then
+        return redis.call("del", KEYS[1])
+      else
+        return 0
+      end\`;
+    return (await this.redis.eval(luaScript, 1, key, lockToken)) === 1;
   }`;
      } else if (q.toLowerCase().includes('test')) {
        replyText =
          'Synthesized regression unit tests for state machine edge cases, testing invalid state transitions and redis timeout fallbacks.';
        fileTarget = 'tests/engine/state-machine.test.ts';
        replyDiff = `@@ -1,6 +1,18 @@
+describe('StateMachine Resilience', () => {
+  it('should reject invalid transition when state lock expired', async () => {
+    const engine = new WorkflowEngine({ redisMock: true });
+    await expect(engine.transition('step_1', 'step_4')).rejects.toThrow('Illegal Transition');
+  });
+});`;
      } else {
        replyText = `Analysis complete for ${activeRepo.fullName}. Code AST verified against strict TypeScript compiler options. Zero high CVEs detected in package lockfile. Ready for task generation or pull request preparation.`;
      }

      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'assistant',
          text: replyText,
          diff: replyDiff || undefined,
          file: fileTarget || undefined,
        },
      ]);
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <ConsoleLayout>
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-brand-electric uppercase tracking-wider bg-brand-purple/10 px-2 py-0.5 rounded border border-brand-purple/30">
                MODULE 13 • AI ASSISTANT
              </span>
              <span className="text-xs text-text-dim font-mono">AST & Context Aware</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl sm:text-3xl font-black text-white">
              AI Development Assistant
            </h1>
            <p className="text-xs text-text-muted mt-1">
              Autonomous codebase understanding, bug identification, test synthesis, and pull request generation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-text-dim">Context:</span>
            <select
              value={selectedRepoId}
              onChange={(e) => setSelectedRepoId(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-bg-surface border border-border text-xs font-mono text-white focus:outline-none focus:border-git-orange cursor-pointer"
            >
              {repositories.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Prompt Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            'Audit mutex race condition in lock manager',
            'Generate unit tests for state machine',
            'Scan repository for hardcoded secrets',
            'Synchronize OpenAPI documentation',
          ].map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendPrompt(prompt)}
              className="px-3 py-1.5 rounded-lg bg-bg-surface hover:bg-bg-elevated border border-border text-xs font-mono text-text-muted hover:text-white transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-electric" />
              <span>{prompt}</span>
            </button>
          ))}
        </div>

        {/* Chat Stream & Suggestion Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Chat Interface */}
          <div className="lg:col-span-2 p-6 rounded-2xl bg-bg-surface border border-border flex flex-col h-[540px]">
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 text-xs ${
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.sender === 'assistant' && (
                    <div className="w-8 h-8 rounded-xl bg-brand-purple/20 border border-brand-purple/40 flex items-center justify-center flex-shrink-0 text-brand-electric">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`p-4 rounded-xl max-w-xl space-y-2 ${
                      msg.sender === 'user'
                        ? 'bg-git-orange/10 border border-git-orange/30 text-white font-medium'
                        : 'bg-bg-elevated border border-border text-text-muted'
                    }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>

                    {/* Diff Inspection */}
                    {msg.diff && (
                      <div className="mt-3 p-3 rounded-lg bg-[#050505] border border-border font-mono text-[11px] overflow-x-auto text-text-muted">
                        <div className="text-git-orange font-bold mb-1 pb-1 border-b border-border">
                          {msg.file}
                        </div>
                        <pre>
                          <code>{msg.diff}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isGenerating && (
                <div className="flex items-center gap-2 text-xs font-mono text-brand-electric animate-pulse">
                  <Bot className="w-4 h-4 animate-spin" />
                  <span>Synthesizing repository AST & diff...</span>
                </div>
              )}
            </div>

            {/* Prompt Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendPrompt();
              }}
              className="mt-4 pt-4 border-t border-border flex items-center gap-2"
            >
              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder={`Ask AI about ${activeRepo.name} (e.g., refactor, bug audit, docs)...`}
                className="flex-1 px-4 py-2.5 rounded-xl bg-bg-elevated border border-border text-xs text-white placeholder-text-dim focus:outline-none focus:border-brand-purple font-sans"
              />
              <button
                type="submit"
                disabled={isGenerating || !promptInput.trim()}
                className="p-2.5 rounded-xl bg-brand-purple hover:bg-brand-electric text-white disabled:opacity-50 transition-all shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right: Pending Human Approval Feed */}
          <div className="p-6 rounded-2xl bg-bg-surface border border-border flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  Approval Queue ({aiSuggestions.filter((s) => s.status === 'pending').length})
                </span>
                <span className="text-[10px] font-mono text-status-warning">Gate Active</span>
              </div>

              <div className="space-y-3">
                {aiSuggestions
                  .filter((s) => s.status === 'pending')
                  .map((sug) => (
                    <div key={sug.id} className="p-3.5 rounded-xl bg-bg-elevated border border-border space-y-2 text-xs">
                      <div className="flex items-center justify-between font-mono text-[10px]">
                        <span className="text-git-orange font-bold truncate max-w-[160px]">
                          {sug.repoName}
                        </span>
                        <span className="text-status-warning uppercase">{sug.severity}</span>
                      </div>
                      <h4 className="font-semibold text-white">{sug.title}</h4>
                      <p className="text-text-muted text-[11px] line-clamp-2">{sug.explanation}</p>

                      <div className="pt-2 flex items-center justify-end gap-2 font-mono text-[11px]">
                        <button
                          onClick={() => rejectAISuggestion(sug.id)}
                          className="px-2.5 py-1 rounded bg-bg-surface hover:bg-bg-elevated text-text-dim hover:text-white border border-border"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => approveAISuggestion(sug.id)}
                          className="px-3 py-1 rounded bg-brand-purple hover:bg-brand-electric text-white font-medium flex items-center gap-1 shadow-sm"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Approve PR</span>
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border text-[11px] font-mono text-text-dim">
              Security: Destructive changes require manual token confirmation.
            </div>
          </div>
        </div>
      </div>
    </ConsoleLayout>
  );
}
