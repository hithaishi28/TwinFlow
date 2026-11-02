'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShieldAlert,
  AlertTriangle,
  Flame,
  CheckCircle2,
  ArrowRight,
  TrendingDown,
  Layers,
  Sparkles,
  Info,
} from 'lucide-react';
import { useTwinFlow } from '@/context/TwinFlowContext';
import { cn } from '@/lib/utils';

export default function RiskIntelligencePage() {
  const router = useRouter();
  const { alerts, criticalSPOFCount, setGuidedStep } = useTwinFlow();
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');

  const filteredAlerts = alerts.filter(a => selectedSeverity === 'All' || a.severity === selectedSeverity.toLowerCase());

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-xl border border-navy-800 bg-navy-900/60 p-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <ShieldAlert className="h-5 w-5 text-red-400" />
            <span>Organizational Risk Intelligence & Telemetry</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Continuous detection of institutional vulnerability, single points of failure, undocumented operational procedures, and capacity stress.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="rounded-lg border border-navy-700 bg-navy-900 px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical Only</option>
            <option value="High">High Only</option>
          </select>
        </div>
      </div>

      {/* Risk Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className={cn(
              "rounded-2xl border p-5 flex flex-col justify-between shadow-xl transition-all",
              alert.resolved
                ? "border-emerald-500/30 bg-emerald-500/5 text-slate-300"
                : (alert.severity === 'critical' ? "border-red-500/40 bg-gradient-to-b from-navy-900 to-navy-950" : "border-amber-500/30 bg-navy-900/60")
            )}
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-navy-800 mb-3">
                <div className="flex items-center space-x-2">
                  <span className="rounded bg-navy-800 px-2 py-0.5 text-[10px] font-mono text-cyan-300">
                    {alert.category}
                  </span>
                  <span className="text-xs text-slate-400">{alert.department}</span>
                </div>
                {alert.resolved ? (
                  <span className="flex items-center text-[10px] text-emerald-400 font-bold">
                    <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                    Resolved
                  </span>
                ) : (
                  <span className={cn(
                    "rounded px-2 py-0.2 text-[10px] font-bold uppercase",
                    alert.severity === 'critical' ? "bg-red-500/20 text-red-300 border border-red-500/30" : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                  )}>
                    {alert.severity} Risk
                  </span>
                )}
              </div>

              <h4 className="text-sm font-bold text-white mb-1.5">{alert.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">{alert.explanation}</p>

              {/* Supporting Evidence */}
              <div className="rounded-xl border border-navy-800 bg-navy-950 p-3 mb-3 text-xs space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Supporting Evidence:</span>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-300">
                  {alert.supportingEvidence.map((ev, i) => (
                    <li key={i}>{ev}</li>
                  ))}
                </ul>
              </div>

              <div className="text-xs text-cyan-300 bg-cyan-950/20 border border-cyan-800/30 p-2.5 rounded-lg">
                <strong className="text-cyan-400 block text-[10px] uppercase font-bold mb-0.5">Recommended Remediation:</strong>
                {alert.recommendedAction}
              </div>
            </div>

            <div className="pt-4 border-t border-navy-800 mt-4 flex items-center justify-end">
              {!alert.resolved && (
                <button
                  onClick={() => {
                    setGuidedStep(3);
                    router.push('/simulator');
                  }}
                  className="rounded-lg bg-electric-500 hover:bg-electric-400 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors flex items-center space-x-1"
                >
                  <span>Resolve in Workflow</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
