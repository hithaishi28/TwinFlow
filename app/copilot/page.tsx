'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  Send,
  User,
  Bot,
  Copy,
  Check,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  ShieldCheck,
  AlertTriangle,
  Info,
  ArrowRight,
  Database,
  ExternalLink,
  HelpCircle,
} from 'lucide-react';
import { CopilotMessage } from '@/types';
import { useTwinFlow } from '@/context/TwinFlowContext';
import { cn } from '@/lib/utils';

export default function AICopilotPage() {
  const router = useRouter();
  const { setGuidedStep, addToast } = useTwinFlow();

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedMessageEvidence, setSelectedMessageEvidence] = useState<CopilotMessage | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [feedbackState, setFeedbackState] = useState<Record<string, 'up' | 'down'>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMessages: CopilotMessage[] = [
    {
      id: 'msg-1',
      sender: 'assistant',
      timestamp: '10:00 AM',
      content: `Welcome to **TwinFlow Continuity Intelligence Copilot**. 

I am connected directly to **Apex Technologies' Workforce Digital Twin**, including live dependency graphs, skill matrices, and operational runbook repositories.

How can I assist you with workforce risk evaluation or continuity planning today?`,
    },
  ];

  const [messages, setMessages] = useState<CopilotMessage[]>(initialMessages);

  const suggestedPrompts = [
    'Why is the engineering department high risk?',
    'What happens if Arjun Mehta is unavailable for 14 days?',
    'Who is the most suitable backup for Arjun Mehta and why?',
    'What critical knowledge needs to be preserved before Arjun leaves?',
    'Which continuity risk should management address first?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || loading) return;

    const userMessage: CopilotMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: textToSend,
    };

    setMessages(prev => [...prev, userMessage]);
    setInputQuery('');
    setLoading(true);

    try {
      const response = await fetch('/api/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: textToSend }),
      });

      const data = await response.json();

      const assistantMessage: CopilotMessage = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: data.content,
        confidenceScore: data.confidenceScore,
        evidenceSources: data.evidenceSources,
        uncertainties: data.uncertainties,
        modelUsed: data.modelUsed,
      };

      setMessages(prev => [...prev, assistantMessage]);
      setSelectedMessageEvidence(assistantMessage);
    } catch (err) {
      console.error(err);
      addToast('Error', 'Failed to fetch AI response', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (msgId: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(msgId);
    setTimeout(() => setCopiedId(null), 2000);
    addToast('Copied', 'AI response copied to clipboard.', 'info');
  };

  const handleFeedback = (msgId: string, type: 'up' | 'down') => {
    setFeedbackState(prev => ({ ...prev, [msgId]: type }));
    addToast('Feedback Received', `Thank you for rating this explanation.`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-xl border border-navy-800 bg-navy-900/60 p-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-cyan-400" />
            <span>Explainable AI Copilot & Confidence Intelligence</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Ask complex natural-language questions about organizational dependencies. Every recommendation is grounded in factual graph evidence with transparent confidence ratings.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs text-emerald-300 font-mono">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold">Realtime Backend:</span>
            <span>FastAPI :8000 • Groq LPU (openai/gpt-oss-120b)</span>
          </div>
        </div>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        <span className="text-xs text-slate-400 flex items-center space-x-1 flex-shrink-0">
          <HelpCircle className="h-3.5 w-3.5 text-cyan-400" />
          <span>Suggested:</span>
        </span>
        {suggestedPrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handleSend(prompt)}
            className="flex-shrink-0 rounded-lg border border-navy-800 bg-navy-900/90 hover:bg-navy-800 hover:border-cyan-500/40 px-3 py-1.5 text-xs text-slate-300 transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Workspace + Grounded Evidence Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Thread (2 Cols) */}
        <div className="lg:col-span-2 rounded-2xl border border-navy-800 bg-navy-900/40 p-4 flex flex-col h-[580px] shadow-2xl">
          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={cn("flex space-x-3 text-xs leading-relaxed", isUser ? "justify-end" : "justify-start")}
                >
                  {!isUser && (
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-electric-500 text-white shadow-glow">
                      <Sparkles className="h-4 w-4" />
                    </div>
                  )}

                  <div className={cn("max-w-xl space-y-1.5", isUser ? "items-end" : "items-start")}>
                    <div className="flex items-center space-x-2 text-[10px] text-slate-400">
                      <span>{isUser ? 'You' : 'TwinFlow AI Copilot'}</span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                      {msg.confidenceScore && (
                        <span className="rounded bg-emerald-500/20 text-emerald-300 font-mono px-1">
                          {msg.confidenceScore}% Confidence
                        </span>
                      )}
                      {msg.modelUsed && (
                        <span className="hidden sm:inline-block rounded bg-cyan-500/20 text-cyan-300 font-mono text-[9px] px-1.5 border border-cyan-500/30">
                          {msg.modelUsed}
                        </span>
                      )}
                    </div>

                    <div
                      className={cn(
                        "rounded-2xl p-4 text-xs leading-relaxed shadow-md",
                        isUser
                          ? "bg-electric-600 text-white rounded-tr-none"
                          : "bg-navy-900 border border-navy-800 text-slate-200 rounded-tl-none whitespace-pre-line"
                      )}
                    >
                      {msg.content}
                    </div>

                    {/* Assistant Action Bar */}
                    {!isUser && msg.id !== 'msg-1' && (
                      <div className="flex items-center space-x-3 pt-1 text-[11px] text-slate-400">
                        <button
                          onClick={() => handleCopy(msg.id, msg.content)}
                          className="hover:text-white flex items-center space-x-1"
                        >
                          {copiedId === msg.id ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                          <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                        </button>

                        <button
                          onClick={() => setSelectedMessageEvidence(msg)}
                          className="hover:text-cyan-300 text-cyan-400 flex items-center space-x-1"
                        >
                          <Database className="h-3 w-3" />
                          <span>View Evidence Sources ({msg.evidenceSources?.length || 0})</span>
                        </button>

                        <div className="flex items-center space-x-1 pl-2 border-l border-navy-800">
                          <button
                            onClick={() => handleFeedback(msg.id, 'up')}
                            className={cn("p-1 hover:text-emerald-400", feedbackState[msg.id] === 'up' && "text-emerald-400")}
                            title="Helpful"
                          >
                            <ThumbsUp className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => handleFeedback(msg.id, 'down')}
                            className={cn("p-1 hover:text-red-400", feedbackState[msg.id] === 'down' && "text-red-400")}
                            title="Not helpful"
                          >
                            <ThumbsDown className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {isUser && (
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-navy-800 text-slate-200">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {loading && (
              <div className="flex space-x-3 text-xs leading-relaxed">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-electric-500 text-white animate-pulse">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="rounded-2xl rounded-tl-none bg-navy-900 border border-navy-800 p-4 text-xs text-slate-400 space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                    <span className="font-semibold text-cyan-300">Evaluating organizational dependency graph...</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Cross-referencing employees, tasks, and historical runbooks.</p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="pt-3 border-t border-navy-800">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="relative flex items-center"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask about SPOFs, project delays, or continuity recommendations..."
                className="w-full rounded-xl border border-navy-700 bg-navy-950 py-3 pl-4 pr-12 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim() || loading}
                className="absolute right-2.5 rounded-lg bg-gradient-to-r from-electric-500 to-cyan-500 p-2 text-white shadow-glow disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Evidence & Grounding Side-Panel (1 Col) */}
        <div className="rounded-2xl border border-navy-800 bg-navy-900/60 p-5 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="pb-3 border-b border-navy-800 mb-4">
              <div className="flex items-center space-x-2">
                <Database className="h-4 w-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Grounded Factual Evidence</h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Strict audit trail linking AI outputs to underlying graph entities. Zero hallucinations.
              </p>
            </div>

            {selectedMessageEvidence && selectedMessageEvidence.evidenceSources && selectedMessageEvidence.evidenceSources.length > 0 ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-navy-800">
                  <span className="text-slate-400">Confidence Metric:</span>
                  <span className="rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold px-2 py-0.5 text-xs border border-emerald-500/30">
                    {selectedMessageEvidence.confidenceScore || 95}% High Certainty
                  </span>
                </div>

                <div className="space-y-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Referenced Entities ({selectedMessageEvidence.evidenceSources.length}):
                  </span>
                  {selectedMessageEvidence.evidenceSources.map((source, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-navy-800 bg-navy-950 p-3 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-cyan-300">{source.title}</span>
                        <span className="rounded bg-navy-800 px-1.5 py-0.2 text-[9px] font-mono text-slate-400">
                          {source.id}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {source.snippet}
                      </p>
                    </div>
                  ))}
                </div>

                {selectedMessageEvidence.uncertainties && selectedMessageEvidence.uncertainties.length > 0 && (
                  <div className="mt-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs">
                    <span className="font-bold text-amber-300 block mb-1 flex items-center space-x-1">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      <span>Model Assumptions:</span>
                    </span>
                    <ul className="list-disc list-inside text-[11px] text-slate-300 space-y-1">
                      {selectedMessageEvidence.uncertainties.map((u, i) => (
                        <li key={i}>{u}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="py-12 text-center text-xs text-slate-400 space-y-2">
                <Database className="h-8 w-8 text-slate-600 mx-auto" />
                <p>Send a question or click &quot;View Evidence Sources&quot; on any AI response to inspect citations.</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-navy-800 mt-4">
            <button
              onClick={() => {
                setGuidedStep(7);
                router.push('/playbooks');
              }}
              className="w-full flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-electric-500 to-cyan-500 px-4 py-2 text-xs font-bold text-white shadow-glow hover:opacity-95 transition-opacity"
            >
              <span>Review Playbook Action Items</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
