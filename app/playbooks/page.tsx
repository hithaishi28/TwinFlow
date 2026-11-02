'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  RotateCcw,
  Check,
  X,
  TrendingUp,
  AlertTriangle,
  Info,
} from 'lucide-react';
import { useTwinFlow } from '@/context/TwinFlowContext';
import { PlaybookAction } from '@/types';
import { cn } from '@/lib/utils';

export default function ContinuityPlaybooksPage() {
  const router = useRouter();
  const {
    playbookActions,
    approvePlaybookAction,
    completePlaybookAction,
    executeAllPlaybookActions,
    continuityScore,
    backupCoverage,
    knowledgeResilience,
    criticalSPOFCount,
    activeRole,
    setGuidedStep,
  } = useTwinFlow();

  const [confirmingAction, setConfirmingAction] = useState<PlaybookAction | null>(null);

  const handleApprove = (action: PlaybookAction) => {
    approvePlaybookAction(action.id);
    setConfirmingAction(null);
  };

  const handleVerifyOnDashboard = () => {
    setGuidedStep(8);
    router.push('/');
  };

  const completedCount = playbookActions.filter(a => a.status === 'Completed').length;
  const totalCount = playbookActions.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-xl border border-navy-800 bg-navy-900/60 p-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <ClipboardList className="h-5 w-5 text-cyan-400" />
            <span>Adaptive Continuity Playbook & Before-After Simulator</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Convert analytical risk simulations into binding governance actions. Measure projected organizational readiness improvements before and after execution.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={executeAllPlaybookActions}
            className="flex items-center space-x-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-glow hover:opacity-95 transition-opacity"
            title="Approve and complete all actions to achieve 84% readiness"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Execute All Playbook Actions</span>
          </button>
        </div>
      </div>

      {/* Before / After Impact Comparison Bar */}
      <div className="rounded-2xl border border-navy-800 bg-navy-900/60 p-5 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-navy-800 mb-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <span>Projected Organizational Continuity Improvements</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Impact of executing the 4 continuity actions for Arjun Mehta&apos;s 14-day absence.
            </p>
          </div>
          <span className="rounded-full bg-navy-800 px-3 py-1 text-xs font-mono text-cyan-300">
            {completedCount} of {totalCount} Actions Completed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Readiness Score */}
          <div className="rounded-xl border border-navy-800 bg-navy-950 p-4">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Continuity Readiness</span>
            <div className="flex items-baseline space-x-2">
              <span className="text-slate-400 line-through text-sm font-mono">68%</span>
              <span className="text-cyan-400 text-xs">➔</span>
              <span className="text-2xl font-extrabold font-mono text-emerald-400">84%</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold block mt-1">+16 pts improvement</span>
          </div>

          {/* Backup Coverage */}
          <div className="rounded-xl border border-navy-800 bg-navy-950 p-4">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Backup Coverage</span>
            <div className="flex items-baseline space-x-2">
              <span className="text-slate-400 line-through text-sm font-mono">42%</span>
              <span className="text-cyan-400 text-xs">➔</span>
              <span className="text-2xl font-extrabold font-mono text-cyan-300">78%</span>
            </div>
            <span className="text-[10px] text-cyan-400 font-semibold block mt-1">+36% verified pairings</span>
          </div>

          {/* Knowledge Resilience */}
          <div className="rounded-xl border border-navy-800 bg-navy-950 p-4">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Knowledge Resilience</span>
            <div className="flex items-baseline space-x-2">
              <span className="text-slate-400 line-through text-sm font-mono">57%</span>
              <span className="text-cyan-400 text-xs">➔</span>
              <span className="text-2xl font-extrabold font-mono text-electric-400">85%</span>
            </div>
            <span className="text-[10px] text-electric-400 font-semibold block mt-1">+28% runbook freshness</span>
          </div>

          {/* Critical SPOFs */}
          <div className="rounded-xl border border-navy-800 bg-navy-950 p-4">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Unmitigated SPOFs</span>
            <div className="flex items-baseline space-x-2">
              <span className="text-red-400 line-through text-sm font-mono">4 Nodes</span>
              <span className="text-cyan-400 text-xs">➔</span>
              <span className="text-2xl font-extrabold font-mono text-emerald-400">1 Node</span>
            </div>
            <span className="text-[10px] text-emerald-400 font-semibold block mt-1">Arjun Mehta SPOF cleared</span>
          </div>
        </div>
      </div>

      {/* Action Plan Task Table */}
      <div className="rounded-2xl border border-navy-800 bg-navy-900/40 p-5 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-navy-800 mb-4">
          <h3 className="text-sm font-bold text-white tracking-tight flex items-center space-x-2">
            <ClipboardList className="h-4 w-4 text-cyan-400" />
            <span>Active Continuity Action Items</span>
          </h3>
          <span className="text-xs text-slate-400">
            Manager: <strong className="text-slate-200">{activeRole}</strong>
          </span>
        </div>

        <div className="space-y-3">
          {playbookActions.map((action) => {
            const isCompleted = action.status === 'Completed';
            const isApproved = action.status === 'Approved';

            return (
              <div
                key={action.id}
                className={cn(
                  "flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 rounded-xl border transition-all gap-4",
                  isCompleted
                    ? "border-emerald-500/30 bg-emerald-500/5 text-slate-300"
                    : (isApproved ? "border-cyan-500/40 bg-navy-900/80" : "border-navy-800 bg-navy-900/60 hover:border-navy-700")
                )}
              >
                {/* Left Info */}
                <div className="flex items-start space-x-3.5 flex-1">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-navy-800 text-cyan-400 mt-0.5">
                    {isCompleted ? <CheckCircle2 className="h-5 w-5 text-emerald-400" /> : <ClipboardList className="h-5 w-5" />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-white">{action.title}</span>
                      <span className={cn(
                        "rounded px-2 py-0.2 text-[9px] font-bold uppercase tracking-wider",
                        action.priority === 'P0' ? "bg-red-500/20 text-red-300" : "bg-orange-500/20 text-orange-300"
                      )}>
                        {action.priority}
                      </span>
                      <span className={cn(
                        "rounded-full px-2 py-0.2 text-[10px] font-semibold border",
                        isCompleted
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                          : (isApproved ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40" : "bg-navy-800 text-slate-400 border-navy-700")
                      )}>
                        {action.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                      {action.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 font-mono pt-1">
                      <span>Owner: <strong className="text-slate-300">{action.responsibleOwner}</strong></span>
                      <span>•</span>
                      <span>Due: <strong className="text-slate-300">{action.dueDate}</strong></span>
                      <span>•</span>
                      <span className="text-emerald-400 font-semibold">Impact: +{action.projectedScoreImpact} Readiness Pts</span>
                    </div>
                  </div>
                </div>

                {/* Right Interactive Actions */}
                <div className="flex items-center space-x-2 flex-shrink-0 w-full lg:w-auto justify-end">
                  {!isCompleted && !isApproved && (
                    <button
                      onClick={() => setConfirmingAction(action)}
                      className="rounded-lg bg-electric-500 hover:bg-electric-400 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors"
                    >
                      Approve Action
                    </button>
                  )}

                  {!isCompleted && isApproved && (
                    <button
                      onClick={() => completePlaybookAction(action.id)}
                      className="rounded-lg bg-emerald-500 hover:bg-emerald-400 px-3 py-1.5 text-xs font-bold text-white shadow-glow transition-colors flex items-center space-x-1"
                    >
                      <Check className="h-3.5 w-3.5" />
                      <span>Mark Completed</span>
                    </button>
                  )}

                  {isCompleted && (
                    <span className="text-xs text-emerald-400 font-bold flex items-center space-x-1">
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Verified in Graph</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Navigation */}
        <div className="pt-5 border-t border-navy-800 mt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            Manager approval required for all consequential staffing delegations.
          </span>

          <button
            onClick={handleVerifyOnDashboard}
            className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-electric-500 to-cyan-500 px-4 py-2 text-xs font-bold text-white shadow-glow hover:opacity-95 transition-opacity"
          >
            <span>Return to Executive Dashboard &amp; Verify Score (84%)</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmingAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="max-w-md w-full rounded-2xl border border-navy-700 bg-navy-900 p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center space-x-3 pb-3 border-b border-navy-800 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400">
                <UserCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Authorize Action Execution</h4>
                <p className="text-xs text-slate-400">Acting as: {activeRole}</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Are you sure you want to formally approve &ldquo;<strong>{confirmingAction.title}</strong>&rdquo;? This will authorize immediate handover execution and system privilege delegation.
            </p>

            <div className="flex items-center justify-end space-x-2">
              <button
                onClick={() => setConfirmingAction(null)}
                className="rounded-lg border border-navy-700 bg-navy-800 px-3 py-1.5 text-xs text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleApprove(confirmingAction)}
                className="rounded-lg bg-gradient-to-r from-electric-500 to-cyan-500 px-4 py-1.5 text-xs font-bold text-white shadow-glow"
              >
                Approve as {activeRole}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
