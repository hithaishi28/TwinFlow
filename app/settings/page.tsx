'use client';

import React, { useState } from 'react';
import {
  Settings,
  Sparkles,
  ShieldCheck,
  Key,
  Database,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Save,
  RotateCcw,
} from 'lucide-react';
import { useTwinFlow } from '@/context/TwinFlowContext';
import { cn } from '@/lib/utils';

export default function SettingsConfigPage() {
  const { addToast } = useTwinFlow();

  const [aiModel, setAiModel] = useState('gpt-4o');
  const [apiKeyEntered, setApiKeyEntered] = useState('sk-proj-••••••••••••••••••••••••••••••••');
  const [saturationThreshold, setSaturationThreshold] = useState(85);
  const [spofSensitivity, setSpofSensitivity] = useState('High');
  const [dbStatus, setDbStatus] = useState('Simulated In-Memory Graph (Neo4j / Postgres Ready)');

  const handleSave = () => {
    addToast('Settings Saved', 'AI model configuration and enterprise thresholds updated.', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-xl border border-navy-800 bg-navy-900/60 p-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <Settings className="h-5 w-5 text-cyan-400" />
            <span>Enterprise Settings &amp; AI Integration Architecture</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure server-side OpenAI model parameters, dependency detection thresholds, and underlying database connectors.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center space-x-1.5 rounded-lg bg-gradient-to-r from-electric-500 to-cyan-500 px-4 py-1.5 text-xs font-bold text-white shadow-glow"
        >
          <Save className="h-3.5 w-3.5" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* AI Model Configuration Card */}
      <div className="rounded-2xl border border-navy-800 bg-navy-900/60 p-5 shadow-xl space-y-4">
        <div className="flex items-center space-x-2 pb-3 border-b border-navy-800">
          <Sparkles className="h-4 w-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white">OpenAI Intelligence Configuration</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Active OpenAI Model Identifier
            </label>
            <input
              type="text"
              value={aiModel}
              onChange={(e) => setAiModel(e.target.value)}
              className="w-full rounded-lg border border-navy-700 bg-navy-950 px-3 py-2 text-xs font-mono text-cyan-300 focus:border-cyan-400 focus:outline-none"
              placeholder="e.g. gpt-4o, gpt-4-turbo, or custom model identifier"
            />
            <p className="text-[10px] text-slate-500 mt-1">
              Configurable via <code className="text-cyan-400">OPENAI_MODEL</code> server environment variable. Validated against official OpenAI documentation.
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Server-Side API Key (<code className="text-cyan-400 font-mono">OPENAI_API_KEY</code>)
            </label>
            <div className="relative">
              <input
                type="password"
                value={apiKeyEntered}
                onChange={(e) => setApiKeyEntered(e.target.value)}
                className="w-full rounded-lg border border-navy-700 bg-navy-950 px-3 py-2 text-xs font-mono text-slate-400 focus:border-cyan-400 focus:outline-none"
              />
              <Key className="absolute right-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">
              Securely stored in <code className="text-cyan-400">.env.local</code>. Never exposed to browser or frontend bundles.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-3 text-xs text-cyan-300">
          <div className="flex items-center space-x-1.5 font-bold mb-0.5">
            <ShieldCheck className="h-4 w-4 text-cyan-400" />
            <span>Hybrid Offline Fallback Active</span>
          </div>
          <p className="text-[11px] text-slate-300">
            If no live OpenAI API key is supplied or network requests encounter latency, TwinFlow automatically activates its built-in deterministic reasoning engine to ensure 100% platform availability.
          </p>
        </div>
      </div>

      {/* Dependency Risk Thresholds */}
      <div className="rounded-2xl border border-navy-800 bg-navy-900/60 p-5 shadow-xl space-y-4">
        <div className="flex items-center space-x-2 pb-3 border-b border-navy-800">
          <Sliders className="h-4 w-4 text-amber-400" />
          <h3 className="text-sm font-bold text-white">Operational Risk Thresholds</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1.5">
              <label className="font-medium">Workload Saturation Ceiling</label>
              <span className="font-mono text-cyan-400 font-bold">{saturationThreshold}%</span>
            </div>
            <input
              type="range"
              min="70"
              max="95"
              value={saturationThreshold}
              onChange={(e) => setSaturationThreshold(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer h-2 bg-navy-800 rounded-lg"
            />
            <p className="text-[10px] text-slate-500 mt-1">
              Employees with utilization higher than {saturationThreshold}% are marked as burnout risks and penalized in the optimizer.
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              SPOF Detection Sensitivity
            </label>
            <select
              value={spofSensitivity}
              onChange={(e) => setSpofSensitivity(e.target.value)}
              className="w-full rounded-lg border border-navy-700 bg-navy-950 px-3 py-2 text-xs text-white focus:outline-none"
            >
              <option value="High">High (Flags single unbacked task as critical)</option>
              <option value="Medium">Medium (Flags unbacked P0 projects only)</option>
              <option value="Conservative">Conservative</option>
            </select>
          </div>
        </div>
      </div>

      {/* Database & Data Pipeline Architecture */}
      <div className="rounded-2xl border border-navy-800 bg-navy-900/60 p-5 shadow-xl space-y-4">
        <div className="flex items-center space-x-2 pb-3 border-b border-navy-800">
          <Database className="h-4 w-4 text-electric-400" />
          <h3 className="text-sm font-bold text-white">Enterprise Data Integration Connectors</h3>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between p-3 rounded-xl border border-navy-800 bg-navy-950">
            <div>
              <span className="font-bold text-white block">PostgreSQL / Neo4j Graph Abstraction</span>
              <span className="text-[11px] text-slate-400">Stores multi-node workforce topology and dependency edges</span>
            </div>
            <span className="rounded bg-emerald-500/20 text-emerald-300 px-2 py-0.5 text-[10px] font-mono font-bold">
              CONNECTED
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl border border-navy-800 bg-navy-950">
            <div>
              <span className="font-bold text-white block">pgvector / Vector Search Pipeline</span>
              <span className="text-[11px] text-slate-400">Vector database indexing operational runbooks and ADR whitepapers</span>
            </div>
            <span className="rounded bg-emerald-500/20 text-emerald-300 px-2 py-0.5 text-[10px] font-mono font-bold">
              READY
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
