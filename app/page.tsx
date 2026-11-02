'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  Users2,
  BookOpen,
  ArrowRight,
  Layers,
  HelpCircle,
  ExternalLink,
  Flame,
  CheckCircle2,
  Building,
  Sparkles,
  Info,
  Clock,
  Briefcase,
  Zap,
} from 'lucide-react';
import { useTwinFlow } from '@/context/TwinFlowContext';
import { cn } from '@/lib/utils';

export default function DashboardOverviewPage() {
  const router = useRouter();
  const {
    continuityScore,
    backupCoverage,
    knowledgeResilience,
    criticalSPOFCount,
    uncoveredResponsibilitiesCount,
    alerts,
    setGuidedStep,
  } = useTwinFlow();

  const [showFormulaModal, setShowFormulaModal] = useState(false);
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('All');

  const departments = [
    { name: 'Engineering', riskScore: criticalSPOFCount > 1 ? 82 : 28, status: criticalSPOFCount > 1 ? 'Critical' : 'Low', head: 'Devon Scott', spofs: criticalSPOFCount > 1 ? 3 : 0, color: criticalSPOFCount > 1 ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' },
    { name: 'IT & Security', riskScore: 64, status: 'High', head: 'Maya Patel', spofs: 1, color: 'bg-orange-500/10 border-orange-500/30 text-orange-400' },
    { name: 'Operations', riskScore: 48, status: 'Medium', head: 'Rachel Adams', spofs: 0, color: 'bg-amber-500/10 border-amber-500/30 text-amber-400' },
    { name: 'Product', riskScore: 31, status: 'Low', head: 'Thomas Wright', spofs: 0, color: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' },
    { name: 'Human Resources', riskScore: 18, status: 'Low', head: 'Amina Al-Mansoor', spofs: 0, color: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' },
  ];

  const handleStartWorkflow = () => {
    setGuidedStep(2);
    router.push('/dependencies');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Scenario Callout with High-Res Employee Spotlight */}
      {criticalSPOFCount > 1 && (
        <div className="relative overflow-hidden rounded-3xl border border-red-500/40 bg-gradient-to-r from-red-950/50 via-navy-900/90 to-navy-950 p-6 shadow-2xl glass-panel">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start space-x-4">
              {/* High-Res Photo Avatar with Glowing SPOF Halo */}
              <div className="relative flex-shrink-0">
                <img
                  src="/images/arjun-mehta.jpg"
                  alt="Arjun Mehta"
                  className="h-16 w-16 rounded-2xl object-cover ring-2 ring-red-500/60 shadow-lg"
                />
                <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white shadow-glow-red animate-bounce">
                  <AlertTriangle className="h-3 w-3" />
                </span>
              </div>

              <div>
                <div className="flex items-center space-x-2">
                  <span className="rounded-full bg-red-500/20 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-red-300 border border-red-500/30">
                    High Vulnerability Detected
                  </span>
                  <span className="text-xs text-slate-400">Engineering • Cloud Platform</span>
                </div>
                <h2 className="text-lg font-bold text-white mt-1">
                  Critical Dependency Identified: Arjun Mehta (Lead Cloud &amp; SRE Architect)
                </h2>
                <p className="text-xs text-slate-300 max-w-3xl mt-1 leading-relaxed">
                  Arjun is the sole qualified maintainer of Multi-Region Kubernetes cluster failover and eBPF live kernel tracing for <span className="text-cyan-300 font-semibold">Project Apollo</span>. No verified primary backup exists. A 14-day absence will trigger an estimated <strong>18-day schedule delay</strong> and risk enterprise SLAs.
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 flex-shrink-0 w-full lg:w-auto justify-end">
              <button
                onClick={handleStartWorkflow}
                className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 px-5 py-2.5 text-xs font-bold text-white shadow-glow-red hover:opacity-95 transition-all"
              >
                <span>Resolve SPOF Workflow</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Primary Telemetry Metrics Row (Glassmorphic) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Continuity Readiness Score */}
        <div className="relative rounded-2xl border border-white/10 glass-card-interactive p-5">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-400 font-medium">Continuity Readiness</span>
            <button
              onClick={() => setShowFormulaModal(true)}
              className="text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
              title="View score formula"
            >
              <Info className="h-3.5 w-3.5" />
              <span className="text-[10px] underline">Explain</span>
            </button>
          </div>
          <div className="flex items-baseline space-x-3">
            <span className={cn("text-3xl font-extrabold font-mono tracking-tight", continuityScore >= 80 ? "text-emerald-400" : "text-amber-400")}>
              {continuityScore}%
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Target: <span className="text-slate-200">85%</span>
            </span>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-navy-800 overflow-hidden">
            <div
              className={cn("h-full transition-all duration-700", continuityScore >= 80 ? "bg-emerald-400 shadow-glow" : "bg-gradient-to-r from-amber-400 to-electric-400")}
              style={{ width: `${continuityScore}%` }}
            />
          </div>
          <p className="mt-2 text-[11px] text-slate-400">
            {continuityScore >= 80 ? 'Organization is resilient to sudden absences' : 'Elevated operational vulnerability present'}
          </p>
        </div>

        {/* Metric 2: Critical SPOF Count */}
        <div className="rounded-2xl border border-white/10 glass-card-interactive p-5">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-400 font-medium">Single Points of Failure</span>
            <Link href="/dependencies" className="text-cyan-400 hover:underline text-[10px]">
              Radar View
            </Link>
          </div>
          <div className="flex items-baseline space-x-3">
            <span className={cn("text-3xl font-extrabold font-mono", criticalSPOFCount > 1 ? "text-red-400" : "text-emerald-400")}>
              {criticalSPOFCount}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Flagged Positions
            </span>
          </div>
          <div className="mt-3 flex items-center space-x-1 text-[11px] text-slate-400">
            <span className={criticalSPOFCount > 1 ? "text-red-400 font-semibold" : "text-emerald-400 font-semibold"}>
              {criticalSPOFCount > 1 ? 'High Risk' : 'Protected'}
            </span>
            <span>• 11 total dependencies tracked</span>
          </div>
        </div>

        {/* Metric 3: Backup Coverage */}
        <div className="rounded-2xl border border-white/10 glass-card-interactive p-5">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-400 font-medium">Backup Coverage</span>
            <Link href="/optimizer" className="text-cyan-400 hover:underline text-[10px]">
              Optimize
            </Link>
          </div>
          <div className="flex items-baseline space-x-3">
            <span className="text-3xl font-extrabold font-mono text-cyan-400">
              {backupCoverage}%
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Verified Pairings
            </span>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-navy-800 overflow-hidden">
            <div
              className="h-full bg-cyan-400 transition-all duration-700 shadow-glow-cyan"
              style={{ width: `${backupCoverage}%` }}
            />
          </div>
          <p className="mt-2 text-[11px] text-slate-400">
            {backupCoverage >= 70 ? 'Redundancy established across core roles' : '58% of key functions lack designated backup'}
          </p>
        </div>

        {/* Metric 4: Knowledge Resilience */}
        <div className="rounded-2xl border border-white/10 glass-card-interactive p-5">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-400 font-medium">Knowledge Resilience</span>
            <Link href="/knowledge" className="text-cyan-400 hover:underline text-[10px]">
              Hub
            </Link>
          </div>
          <div className="flex items-baseline space-x-3">
            <span className="text-3xl font-extrabold font-mono text-electric-400">
              {knowledgeResilience}%
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Codified Runbooks
            </span>
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-navy-800 overflow-hidden">
            <div
              className="h-full bg-electric-400 transition-all duration-700"
              style={{ width: `${knowledgeResilience}%` }}
            />
          </div>
          <p className="mt-2 text-[11px] text-slate-400">
            {knowledgeResilience >= 80 ? 'Runbooks fresh and verified' : '2 mission-critical runbooks require updating'}
          </p>
        </div>
      </div>

      {/* Main Grid: Department Heatmap & Critical Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Risk Heatmap (2 Cols) */}
        <div className="lg:col-span-2 rounded-3xl border border-white/10 glass-panel p-6 shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-navy-800 mb-4">
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight flex items-center space-x-2">
                <Layers className="h-4 w-4 text-cyan-400" />
                <span>Department Continuity Risk Heatmap</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Composite risk calculated from SPOF count, unbacked responsibilities, and workload stress.
              </p>
            </div>
            <div className="flex items-center space-x-1.5 text-xs">
              <span className="text-slate-400">Filter:</span>
              <select
                value={selectedDeptFilter}
                onChange={(e) => setSelectedDeptFilter(e.target.value)}
                className="rounded-xl border border-navy-700 bg-navy-950 px-3 py-1 text-xs text-slate-200 focus:outline-none"
              >
                <option value="All">All Departments</option>
                <option value="Engineering">Engineering</option>
                <option value="IT & Security">IT &amp; Security</option>
                <option value="Operations">Operations</option>
                <option value="Product">Product</option>
                <option value="Human Resources">Human Resources</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {departments
              .filter(d => selectedDeptFilter === 'All' || d.name === selectedDeptFilter)
              .map((dept) => (
                <div
                  key={dept.name}
                  onClick={() => router.push(dept.name === 'Engineering' ? '/dependencies' : '/workforce')}
                  className="cursor-pointer group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl border border-navy-800/80 bg-navy-950/40 hover:bg-navy-900/80 hover:border-cyan-500/40 transition-all"
                >
                  <div className="flex items-center space-x-3.5 mb-2 sm:mb-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-800 text-slate-300 group-hover:text-cyan-400 group-hover:scale-105 transition-all">
                      <Building className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                          {dept.name}
                        </span>
                        <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold border", dept.color)}>
                          {dept.status} Risk ({dept.riskScore}/100)
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Department Head: {dept.head} • {dept.spofs} Active SPOF Node{dept.spofs !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="w-32 sm:w-36">
                      <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                        <span>Risk Index</span>
                        <span className="font-mono font-bold">{dept.riskScore}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-navy-800 overflow-hidden">
                        <div
                          className={cn("h-full transition-all duration-500", dept.riskScore > 70 ? "bg-red-400" : (dept.riskScore > 40 ? "bg-amber-400" : "bg-emerald-400"))}
                          style={{ width: `${dept.riskScore}%` }}
                        />
                      </div>
                    </div>

                    <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
          </div>

          <div className="mt-5 pt-3 border-t border-navy-800 flex items-center justify-between text-xs text-slate-400">
            <span>Deterministic Graph Logic active (Neo4j Schema abstraction)</span>
            <Link href="/dependencies" className="text-cyan-400 hover:underline flex items-center space-x-1">
              <span>View full graph topology</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Priority Action Alerts (1 Col) */}
        <div className="rounded-3xl border border-white/10 glass-panel p-6 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-navy-800 mb-3">
              <h3 className="text-sm font-bold text-white tracking-tight flex items-center space-x-2">
                <ShieldAlert className="h-4 w-4 text-amber-400" />
                <span>Continuity Action Items</span>
              </h3>
              <span className="rounded-full bg-navy-800 px-2 py-0.5 text-[10px] font-mono text-cyan-300">
                {alerts.filter(a => !a.resolved).length} Pending
              </span>
            </div>

            <div className="space-y-3">
              {alerts.slice(0, 3).map((alert) => (
                <div
                  key={alert.id}
                  className={cn(
                    "rounded-2xl border p-3.5 text-xs transition-all",
                    alert.resolved
                      ? "border-emerald-500/30 bg-emerald-500/5 text-slate-300"
                      : (alert.severity === 'critical' ? "border-red-500/30 bg-red-500/10" : "border-amber-500/30 bg-amber-500/10")
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={cn(
                      "font-semibold",
                      alert.resolved ? "text-emerald-400" : (alert.severity === 'critical' ? "text-red-300" : "text-amber-300")
                    )}>
                      {alert.title}
                    </span>
                    {alert.resolved ? (
                      <span className="flex items-center text-[10px] text-emerald-400 font-bold">
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Resolved
                      </span>
                    ) : (
                      <span className="rounded px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wider bg-navy-900 text-slate-300">
                        {alert.severity}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed mb-2">
                    {alert.explanation}
                  </p>
                  {!alert.resolved && (
                    <button
                      onClick={() => {
                        if (alert.id === 'ALT-01') router.push('/dependencies');
                        else if (alert.id === 'ALT-02') router.push('/optimizer');
                        else router.push('/knowledge');
                      }}
                      className="text-cyan-400 hover:text-cyan-300 text-[11px] font-semibold flex items-center space-x-1"
                    >
                      <span>Take Action</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-navy-800 mt-4">
            <Link
              href="/playbooks"
              className="flex items-center justify-center space-x-2 w-full rounded-xl bg-gradient-to-r from-navy-800 to-navy-750 hover:from-navy-750 hover:to-navy-700 px-4 py-2.5 text-xs font-semibold text-slate-200 transition-all border border-white/5"
            >
              <span>Manage Adaptive Playbooks</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Formula Transparency Modal */}
      {showFormulaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="max-w-lg w-full rounded-3xl border border-white/10 bg-navy-900/90 backdrop-blur-2xl p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-navy-800 mb-4">
              <h4 className="text-base font-bold text-white flex items-center space-x-2">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                <span>Continuity Readiness Score Formula</span>
              </h4>
              <button
                onClick={() => setShowFormulaModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <p>
                TwinFlow calculates the <strong>Continuity Readiness Score</strong> using a transparent multi-factor weighted equation rather than arbitrary machine learning estimates:
              </p>

              <div className="rounded-2xl border border-cyan-500/30 bg-navy-950 p-4 font-mono text-cyan-300 text-xs shadow-inner">
                Score = (0.35 × BackupCoverage) + (0.25 × KnowledgeResilience) + (0.25 × (1 - SPOFRiskIndex)) + (0.15 × CapacityBuffer)
              </div>

              <div className="space-y-2">
                <div className="flex justify-between border-b border-navy-800 pb-1">
                  <span className="text-slate-400">1. Backup Coverage (35% weight):</span>
                  <span className="font-semibold text-slate-200">{backupCoverage}% current</span>
                </div>
                <div className="flex justify-between border-b border-navy-800 pb-1">
                  <span className="text-slate-400">2. Knowledge Resilience (25% weight):</span>
                  <span className="font-semibold text-slate-200">{knowledgeResilience}% current</span>
                </div>
                <div className="flex justify-between border-b border-navy-800 pb-1">
                  <span className="text-slate-400">3. SPOF Risk Mitigation (25% weight):</span>
                  <span className="font-semibold text-slate-200">{criticalSPOFCount > 1 ? '42%' : '88%'} current</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">4. Capacity Headroom (15% weight):</span>
                  <span className="font-semibold text-slate-200">82% current</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400">
                Approving and completing the 4 continuity playbook items for Arjun Mehta elevates this composite score from <strong>68% to 84%</strong>.
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowFormulaModal(false)}
                className="rounded-xl bg-electric-500 px-4 py-2 text-xs font-semibold text-white hover:bg-electric-400 shadow-glow"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
