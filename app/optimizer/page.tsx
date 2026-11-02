'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  GitCompare,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Clock,
  ShieldCheck,
  HelpCircle,
  Flame,
  UserCheck,
  Check,
  X,
  Info,
} from 'lucide-react';
import { useTwinFlow } from '@/context/TwinFlowContext';
import { OptimizerCandidate } from '@/types';
import { cn } from '@/lib/utils';

export default function ContinuityOptimizerPage() {
  const router = useRouter();
  const {
    optimizerCandidates,
    selectedBackupId,
    selectBackup,
    activeScenario,
    setGuidedStep,
  } = useTwinFlow();

  const [confirmingCandidate, setConfirmingCandidate] = useState<OptimizerCandidate | null>(null);

  const handleConfirmBackup = () => {
    if (confirmingCandidate) {
      selectBackup(confirmingCandidate.employee.id);
      setConfirmingCandidate(null);
      setGuidedStep(5);
      router.push('/knowledge');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-xl border border-navy-800 bg-navy-900/60 p-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <GitCompare className="h-5 w-5 text-cyan-400" />
            <span>Least-Disruptive Continuity Optimizer</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Multi-objective optimization engine balancing technical skill parity against available workload bandwidth to prevent burnout and operational friction.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="text-slate-400">Target Role:</span>
          <span className="rounded-lg bg-navy-800 px-2.5 py-1 text-cyan-300 font-mono font-semibold">
            {activeScenario.targetEmployeeName} (14-Day Absence)
          </span>
        </div>
      </div>

      {/* Why This Recommendation Callout Card */}
      <div className="rounded-2xl border border-cyan-500/40 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 p-5 shadow-2xl">
        <div className="flex items-start space-x-3.5">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 ring-1 ring-cyan-500/40">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="rounded bg-cyan-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                Algorithm Justification
              </span>
              <span className="text-xs text-slate-400">Constraint-Based Multi-Objective Formulation</span>
            </div>
            <h3 className="text-base font-bold text-white mt-1">
              Why Sarah Lin is Recommended Over Marcus Vance
            </h3>
            <p className="text-xs text-slate-300 max-w-4xl mt-1 leading-relaxed">
              While <strong>Marcus Vance (Principal Architect)</strong> possesses a marginally higher technical skill match (<strong>96% vs 88%</strong>), he is operating at <strong>98% workload capacity</strong> leading Core Banking API V2. Allocating emergency responsibilities to Marcus would introduce severe secondary project delivery risk and acute burnout vulnerability. In contrast, <strong>Sarah Lin</strong> provides <strong>88% skill overlap</strong> with a healthy <strong>35% bandwidth buffer (65% utilization)</strong>, resulting in the lowest overall organizational disruption.
            </p>
          </div>
        </div>
      </div>

      {/* 3-Candidate Comparison Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {optimizerCandidates.slice(0, 3).map((candidate) => {
          const isSelected = selectedBackupId === candidate.employee.id;
          const isRecommended = candidate.recommendationBadge === 'Recommended';

          return (
            <div
              key={candidate.employee.id}
              className={cn(
                "relative rounded-2xl border p-5 flex flex-col justify-between transition-all shadow-xl",
                isRecommended
                  ? "border-cyan-400/60 bg-gradient-to-b from-navy-900 to-navy-950 ring-1 ring-cyan-500/30"
                  : (candidate.recommendationBadge === 'High Burnout Risk' ? "border-orange-500/30 bg-navy-900/40" : "border-navy-800 bg-navy-900/40")
              )}
            >
              {/* Card Header & Badge */}
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-navy-800 mb-3">
                  <span className="rounded-full bg-navy-800 px-2.5 py-0.5 text-[10px] font-mono text-slate-300 font-semibold">
                    Rank #{candidate.recommendationRank}
                  </span>
                  <span className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-bold border",
                    isRecommended
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                      : (candidate.recommendationBadge === 'High Burnout Risk'
                        ? "bg-orange-500/20 text-orange-300 border-orange-500/40"
                        : "bg-purple-500/20 text-purple-300 border-purple-500/40")
                  )}>
                    {candidate.recommendationBadge}
                  </span>
                </div>

                {/* Candidate Identity */}
                <div className="flex items-center space-x-3 mb-4">
                  <div className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl overflow-hidden ring-2 ring-white/10 shadow-glow">
                    {candidate.employee.avatar ? (
                      <img src={candidate.employee.avatar} alt={candidate.employee.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-gradient-to-tr from-electric-500 to-cyan-500 text-sm font-bold text-white">
                        {candidate.employee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center space-x-1.5">
                      <span>{candidate.employee.name}</span>
                      {isSelected && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
                    </h4>
                    <p className="text-xs text-slate-400">{candidate.employee.role}</p>
                    <p className="text-[11px] text-slate-500">{candidate.employee.department} • {candidate.employee.experienceYears}y exp</p>
                  </div>
                </div>

                {/* Composite Score Circle */}
                <div className="rounded-xl border border-navy-800 bg-navy-950 p-3.5 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Overall Continuity Fit</span>
                      <span className={cn("text-2xl font-extrabold font-mono", isRecommended ? "text-cyan-400" : "text-slate-300")}>
                        {candidate.overallScore}%
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Transition Time</span>
                      <span className="text-base font-bold font-mono text-electric-300">
                        {candidate.transitionEffortHours} Hours
                      </span>
                    </div>
                  </div>
                </div>

                {/* Score Breakdown Sliders */}
                <div className="space-y-2.5 text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                      <span>Skill Compatibility</span>
                      <span className="font-mono font-bold text-slate-200">{candidate.skillMatchScore}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-navy-800 overflow-hidden">
                      <div className="h-full bg-cyan-400" style={{ width: `${candidate.skillMatchScore}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                      <span>Available Bandwidth (Current: {candidate.employee.workloadUtilization}%)</span>
                      <span className={cn("font-mono font-bold", candidate.employee.workloadUtilization > 90 ? "text-red-400" : "text-emerald-400")}>
                        {100 - candidate.employee.workloadUtilization}% Headroom
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-navy-800 overflow-hidden">
                      <div
                        className={cn("h-full", candidate.employee.workloadUtilization > 90 ? "bg-red-400" : "bg-emerald-400")}
                        style={{ width: `${100 - candidate.employee.workloadUtilization}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Explanation Snippet */}
                <p className="mt-4 text-[11px] text-slate-300 leading-relaxed bg-navy-900/80 p-2.5 rounded-lg border border-navy-800">
                  {candidate.explanation}
                </p>
              </div>

              {/* Selection Button */}
              <div className="pt-4 border-t border-navy-800 mt-4">
                {isSelected ? (
                  <div className="flex items-center justify-center space-x-1.5 w-full rounded-lg bg-emerald-500/20 border border-emerald-500/40 py-2 text-xs font-bold text-emerald-300">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Selected Primary Backup</span>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmingCandidate(candidate)}
                    className={cn(
                      "w-full flex items-center justify-center space-x-1.5 rounded-lg py-2 text-xs font-bold transition-all",
                      isRecommended
                        ? "bg-gradient-to-r from-electric-500 to-cyan-500 text-white shadow-glow hover:opacity-95"
                        : "bg-navy-800 hover:bg-navy-750 text-slate-300"
                    )}
                  >
                    <UserCheck className="h-3.5 w-3.5" />
                    <span>Select as Backup</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Manager Confirmation Modal */}
      {confirmingCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="max-w-md w-full rounded-2xl border border-navy-700 bg-navy-900 p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center space-x-3 pb-3 border-b border-navy-800 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400">
                <UserCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Confirm Backup Assignment</h4>
                <p className="text-xs text-slate-400">Executive Confirmation Required</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              You are assigning <strong>{confirmingCandidate.employee.name}</strong> as the interim primary backup for <strong>{activeScenario.targetEmployeeName}</strong> during the planned 14-day absence.
            </p>

            <div className="rounded-xl border border-navy-800 bg-navy-950 p-3.5 space-y-2 text-xs text-slate-300 mb-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Designated Candidate:</span>
                <span className="font-semibold text-white">{confirmingCandidate.employee.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Required Paired Handover:</span>
                <span className="font-semibold text-cyan-300">{confirmingCandidate.transitionEffortHours} Hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Resulting Capacity Headroom:</span>
                <span className="font-semibold text-emerald-400">Healthy Buffer (65% Load)</span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                onClick={() => setConfirmingCandidate(null)}
                className="rounded-lg border border-navy-700 bg-navy-800 px-3 py-1.5 text-xs text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmBackup}
                className="rounded-lg bg-gradient-to-r from-electric-500 to-cyan-500 px-4 py-1.5 text-xs font-bold text-white shadow-glow hover:opacity-95"
              >
                Confirm &amp; Proceed to Handover
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
