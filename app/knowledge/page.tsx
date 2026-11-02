'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  BookOpen,
  Sparkles,
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Download,
  Printer,
  CheckSquare,
  Search,
  Filter,
  ShieldAlert,
  Clock,
  Layers,
  ChevronDown,
} from 'lucide-react';
import { useTwinFlow } from '@/context/TwinFlowContext';
import { generateHandoverPlan, GeneratedHandoverDocument } from '@/lib/handoverEngine';
import { cn } from '@/lib/utils';

export default function KnowledgeHubPage() {
  const router = useRouter();
  const {
    documents,
    activeScenario,
    selectedBackupId,
    employees,
    setGuidedStep,
    addToast,
  } = useTwinFlow();

  const [handoverDoc, setHandoverDoc] = useState<GeneratedHandoverDocument>(() =>
    generateHandoverPlan(
      activeScenario.targetEmployeeId,
      selectedBackupId || 'EMP-108',
      activeScenario.durationDays
    )
  );

  const [activeTab, setActiveTab] = useState<'handover' | 'inventory' | 'upload'>('handover');
  const [isGenerating, setIsGenerating] = useState(false);
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const backupName = employees.find(e => e.id === (selectedBackupId || 'EMP-108'))?.name || 'Sarah Lin';

  const toggleItemCheck = (itemId: string) => {
    setCompletedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleRegenerateHandover = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const plan = generateHandoverPlan(
        activeScenario.targetEmployeeId,
        selectedBackupId || 'EMP-108',
        activeScenario.durationDays
      );
      setHandoverDoc(plan);
      setIsGenerating(false);
      addToast('AI Handover Plan Generated', '4-module transition runbook synthesized successfully.', 'success');
    }, 800);
  };

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileName = e.target.files[0].name;
      setUploadProgress(10);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev === null || prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setUploadProgress(null);
              addToast('Document Ingested & Vectorized', `"${fileName}" successfully parsed into knowledge base.`, 'success');
            }, 600);
            return 100;
          }
          return prev + 30;
        });
      }, 300);
    }
  };

  const handleProceedToCopilot = () => {
    setGuidedStep(6);
    router.push('/copilot');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-xl border border-navy-800 bg-navy-900/60 p-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-cyan-400" />
            <span>Knowledge Resilience & AI Handover Engine</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Prevent institutional memory loss when critical personnel depart. Automatically extract, synthesize, and codify undocumented tacit knowledge.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center space-x-1.5 bg-navy-800 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('handover')}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center space-x-1.5",
              activeTab === 'handover' ? "bg-cyan-500/20 text-cyan-300 shadow-sm" : "text-slate-400 hover:text-white"
            )}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI Handover Plan</span>
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center space-x-1.5",
              activeTab === 'inventory' ? "bg-cyan-500/20 text-cyan-300 shadow-sm" : "text-slate-400 hover:text-white"
            )}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Knowledge Assets ({documents.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center space-x-1.5",
              activeTab === 'upload' ? "bg-cyan-500/20 text-cyan-300 shadow-sm" : "text-slate-400 hover:text-white"
            )}
          >
            <UploadCloud className="h-3.5 w-3.5" />
            <span>Upload Document</span>
          </button>
        </div>
      </div>

      {/* Main View: Handover Plan Mode */}
      {activeTab === 'handover' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Document Preview (2 Cols) */}
          <div className="lg:col-span-2 rounded-2xl border border-navy-800 bg-navy-900/60 p-6 shadow-2xl">
            {/* Document Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-navy-800 mb-5 gap-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="rounded bg-cyan-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-300 border border-cyan-500/30">
                    GENERATED HANDOVER RUNBOOK
                  </span>
                  <span className="text-xs text-slate-400 font-mono">ID: {handoverDoc.id}</span>
                </div>
                <h3 className="text-base font-bold text-white mt-1">
                  {handoverDoc.title}
                </h3>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleRegenerateHandover}
                  disabled={isGenerating}
                  className="flex items-center space-x-1.5 rounded-lg border border-navy-700 bg-navy-800 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white"
                  title="Regenerate plan using OpenAI/Deterministic engine"
                >
                  <Sparkles className={cn("h-3.5 w-3.5 text-cyan-400", isGenerating && "animate-spin")} />
                  <span>{isGenerating ? 'Synthesizing...' : 'Regenerate'}</span>
                </button>
                <button
                  onClick={() => addToast('Handover Exported', 'Document exported to Markdown checklist.', 'info')}
                  className="flex items-center space-x-1.5 rounded-lg border border-navy-700 bg-navy-800 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="rounded-xl border border-navy-800 bg-navy-950 p-4 text-xs text-slate-300 leading-relaxed mb-6">
              <span className="font-bold text-cyan-400 block mb-1">Executive Handover Protocol:</span>
              {handoverDoc.executiveSummary}
            </div>

            {/* Modules & Checklist Items */}
            <div className="space-y-6">
              {handoverDoc.sections.map((section, idx) => (
                <div key={section.heading} className="space-y-3">
                  <div className="border-b border-navy-800/80 pb-2">
                    <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                      <span className="text-cyan-400 font-mono text-xs">0{idx + 1}.</span>
                      <span>{section.heading}</span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">{section.description}</p>
                  </div>

                  <div className="space-y-2.5">
                    {section.items.map((item) => {
                      const isChecked = !!completedItems[item.id];
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleItemCheck(item.id)}
                          className={cn(
                            "cursor-pointer flex items-start space-x-3 rounded-xl border p-3.5 text-xs transition-all",
                            isChecked
                              ? "border-emerald-500/40 bg-emerald-500/10 text-slate-300"
                              : "border-navy-800 bg-navy-900/40 hover:bg-navy-850 hover:border-navy-700"
                          )}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {}}
                            className="mt-0.5 rounded accent-cyan-400 h-4 w-4 cursor-pointer"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className={cn("font-bold", isChecked ? "text-emerald-300 line-through" : "text-white")}>
                                {item.title}
                              </span>
                              <div className="flex items-center space-x-2">
                                {item.evidenceRef && (
                                  <span className="text-[10px] font-mono text-slate-400 bg-navy-800 px-1.5 py-0.5 rounded">
                                    {item.evidenceRef}
                                  </span>
                                )}
                                <span className={cn(
                                  "rounded px-1.5 py-0.2 text-[9px] font-bold",
                                  item.priority === 'P0' ? "bg-red-500/20 text-red-300" : "bg-orange-500/20 text-orange-300"
                                )}>
                                  {item.priority}
                                </span>
                              </div>
                            </div>
                            <p className="text-[11px] text-slate-300 leading-relaxed">
                              {item.details}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Side Info & Progress Panel (1 Col) */}
          <div className="rounded-2xl border border-navy-800 bg-navy-900/40 p-5 flex flex-col justify-between shadow-xl">
            <div>
              <div className="pb-3 border-b border-navy-800 mb-4">
                <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                  <ShieldAlert className="h-4 w-4 text-cyan-400" />
                  <span>Handover Readiness Tracking</span>
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">Live execution telemetry</p>
              </div>

              {/* Progress Summary Card */}
              <div className="rounded-xl border border-navy-800 bg-navy-950 p-4 mb-4">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-slate-400">Handover Checklist Progress:</span>
                  <span className="font-mono font-bold text-cyan-400">
                    {Object.values(completedItems).filter(Boolean).length} / 10 Completed
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-navy-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-electric-400 to-cyan-400 transition-all duration-500"
                    style={{ width: `${(Object.values(completedItems).filter(Boolean).length / 10) * 100}%` }}
                  />
                </div>
              </div>

              {/* Designated Pair with Avatars */}
              <div className="rounded-2xl border border-white/5 bg-navy-950 p-4 space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <img
                      src="/images/arjun-mehta.jpg"
                      alt="Arjun"
                      className="h-9 w-9 rounded-xl object-cover ring-1 ring-red-500/50"
                    />
                    <div>
                      <span className="text-[10px] text-slate-400 block">Departing Lead</span>
                      <span className="font-bold text-white text-xs">Arjun Mehta</span>
                    </div>
                  </div>

                  <ArrowRight className="h-4 w-4 text-cyan-400" />

                  <div className="flex items-center space-x-2.5">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80"
                      alt="Sarah"
                      className="h-9 w-9 rounded-xl object-cover ring-1 ring-emerald-500/50"
                    />
                    <div>
                      <span className="text-[10px] text-slate-400 block">Interim Backup</span>
                      <span className="font-bold text-cyan-300 text-xs">{backupName}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-2 border-t border-navy-800/80 text-xs">
                  <span className="text-slate-400">Handover Buffer:</span>
                  <span className="font-semibold text-emerald-400 font-mono">12 Paired Hours</span>
                </div>
              </div>

              {/* Alert Remediation notice */}
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300">
                <div className="flex items-center space-x-1.5 font-bold mb-1">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Risk Resolution Impact</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-300">
                  Executing this handover addresses Risk Alert ALT-01 and elevates Apex Technologies&apos; Knowledge Resilience score from 57% to 85%.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-navy-800 mt-4 space-y-2">
              <button
                onClick={handleProceedToCopilot}
                className="w-full flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-electric-500 to-cyan-500 px-4 py-2 text-xs font-bold text-white shadow-glow hover:opacity-95 transition-opacity"
              >
                <span>Ask AI Copilot for Full Explanation</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View: Knowledge Assets Inventory Table */}
      {activeTab === 'inventory' && (
        <div className="rounded-2xl border border-navy-800 bg-navy-900/40 p-5 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-navy-800 mb-4">
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center space-x-2">
              <FileText className="h-4 w-4 text-cyan-400" />
              <span>Critical Organizational Knowledge Assets</span>
            </h3>
            <span className="text-xs text-slate-400">
              {documents.length} Codified Technical Runbooks
            </span>
          </div>

          <div className="space-y-3">
            {documents.map((doc) => {
              const isOutdated = doc.verificationStatus === 'Outdated' || doc.verificationStatus === 'Missing';
              return (
                <div
                  key={doc.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border border-navy-800 bg-navy-900/60 hover:border-cyan-500/40 transition-all gap-3"
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-navy-800 text-cyan-400">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-white">{doc.title}</span>
                        <span className={cn(
                          "rounded px-2 py-0.5 text-[10px] font-bold border",
                          doc.verificationStatus === 'Verified' ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" : (
                            doc.verificationStatus === 'Outdated' ? "bg-red-500/20 text-red-300 border-red-500/40" : "bg-purple-500/20 text-purple-300 border-purple-500/40"
                          )
                        )}>
                          {doc.verificationStatus}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 max-w-2xl">{doc.contentSnippet}</p>
                      <div className="flex items-center space-x-3 text-[11px] text-slate-500 mt-1.5 font-mono">
                        <span>Category: {doc.category}</span>
                        <span>•</span>
                        <span>Last Updated: {doc.lastUpdated}</span>
                        <span>•</span>
                        <span>Size: {doc.fileSize}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 flex-shrink-0">
                    <div className="w-24 text-right">
                      <span className="text-[10px] text-slate-400 block">Coverage</span>
                      <span className={cn("text-xs font-mono font-bold", isOutdated ? "text-red-400" : "text-emerald-400")}>
                        {doc.coveragePercentage}%
                      </span>
                    </div>
                    <button
                      onClick={() => addToast('Runbook Preview', `Viewing "${doc.title}".`, 'info')}
                      className="rounded-lg border border-navy-700 bg-navy-800 px-3 py-1.5 text-xs text-slate-200 hover:text-white"
                    >
                      Inspect
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* View: Document Upload */}
      {activeTab === 'upload' && (
        <div className="max-w-xl mx-auto rounded-2xl border border-navy-800 bg-navy-900/60 p-8 text-center shadow-xl">
          <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-2xl bg-cyan-500/20 text-cyan-400 mb-4 ring-1 ring-cyan-500/40">
            <UploadCloud className="h-8 w-8" />
          </div>
          <h3 className="text-base font-bold text-white">Ingest Operational Documents into TwinFlow</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 mb-6">
            Upload system architecture PDFs, on-call runbooks, or API documentation. TwinFlow will vectorize and map content into the employee dependency graph.
          </p>

          <label className="cursor-pointer block border-2 border-dashed border-navy-700 hover:border-cyan-400 rounded-xl p-8 bg-navy-950 transition-colors">
            <input
              type="file"
              onChange={handleSimulateUpload}
              className="hidden"
              accept=".pdf,.docx,.md,.txt"
            />
            <FileText className="h-8 w-8 text-slate-500 mx-auto mb-2" />
            <span className="text-xs font-semibold text-cyan-400">Click to browse or drag and drop files</span>
            <span className="text-[10px] text-slate-500 block mt-1">Supports PDF, Markdown, DOCX (Max 25MB)</span>
          </label>

          {uploadProgress !== null && (
            <div className="mt-4 p-4 rounded-xl border border-navy-700 bg-navy-950">
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Parsing &amp; Vectorizing Knowledge Document...</span>
                <span className="font-mono text-cyan-400">{uploadProgress}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-navy-800 overflow-hidden">
                <div className="h-full bg-cyan-400 transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
