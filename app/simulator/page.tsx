'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Flame,
  Play,
  RotateCcw,
  GitCompare,
  Clock,
  Briefcase,
  CheckSquare,
  AlertOctagon,
  ArrowRight,
  TrendingDown,
  Info,
  Calendar,
  Sparkles,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { useTwinFlow } from '@/context/TwinFlowContext';
import { SimulationScenario } from '@/types';
import { cn } from '@/lib/utils';

export default function DisruptionSimulatorPage() {
  const router = useRouter();
  const {
    employees,
    activeScenario,
    setActiveScenario,
    simulationResult,
    runSimulation,
    setGuidedStep,
  } = useTwinFlow();

  const [selectedEmpId, setSelectedEmpId] = useState(activeScenario.targetEmployeeId);
  const [selectedDisruption, setSelectedDisruption] = useState(activeScenario.disruptionType);
  const [durationDays, setDurationDays] = useState(activeScenario.durationDays);
  const [comparisonMode, setComparisonMode] = useState(false);

  const selectedEmployee = employees.find(e => e.id === selectedEmpId) || employees[0];

  const handleExecuteSimulation = () => {
    const scenario: SimulationScenario = {
      id: `SIM-${Date.now()}`,
      targetEmployeeId: selectedEmployee.id,
      targetEmployeeName: selectedEmployee.name,
      department: selectedEmployee.department,
      disruptionType: selectedDisruption,
      durationDays,
    };
    setActiveScenario(scenario);
    runSimulation(scenario);
  };

  const handleProceedToOptimizer = () => {
    setGuidedStep(4);
    router.push('/optimizer');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-xl border border-navy-800 bg-navy-900/60 p-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <Flame className="h-5 w-5 text-orange-400" />
            <span>What-If Workforce Disruption Simulator</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Model the systemic ripple effects of planned or unplanned employee departures across project delivery, operational processes, and capacity.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setComparisonMode(!comparisonMode)}
            className={cn(
              "flex items-center space-x-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors",
              comparisonMode
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
                : "bg-navy-800 text-slate-300 border-navy-700 hover:text-white"
            )}
          >
            <GitCompare className="h-3.5 w-3.5" />
            <span>{comparisonMode ? 'Single View' : 'Compare 2 Scenarios'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Controls & Parameter Matrix */}
      <div className="rounded-2xl border border-navy-800 bg-navy-900/40 p-5 shadow-xl">
        <div className="flex items-center justify-between pb-3 border-b border-navy-800 mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
            <Layers className="h-4 w-4 text-cyan-400" />
            <span>Simulation Parameters</span>
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            Deterministic Impact Engine (Sample Rules Applied)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Target Employee */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Target Employee
            </label>
            <select
              value={selectedEmpId}
              onChange={(e) => setSelectedEmpId(e.target.value)}
              className="w-full rounded-lg border border-navy-700 bg-navy-900 px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
            >
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name} ({emp.role} • {emp.department}) {emp.isSinglePointOfFailure ? '⚠️ SPOF' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Disruption Type */}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Disruption Event
            </label>
            <select
              value={selectedDisruption}
              onChange={(e: any) => setSelectedDisruption(e.target.value)}
              className="w-full rounded-lg border border-navy-700 bg-navy-900 px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
            >
              <option value="Absence (14 Days)">Unexpected Absence (14 Days)</option>
              <option value="Resignation">Permanent Resignation</option>
              <option value="Long-Term Leave (60 Days)">Medical / Sabbatical (60 Days)</option>
              <option value="Internal Transfer">Internal Department Transfer</option>
              <option value="Hiring Freeze">Hiring Freeze / Attrition Block</option>
            </select>
          </div>

          {/* Duration Slider */}
          <div>
            <div className="flex justify-between text-xs text-slate-400 mb-1.5">
              <label className="font-medium">Absence Duration</label>
              <span className="font-mono text-cyan-400 font-bold">{durationDays} Days</span>
            </div>
            <input
              type="range"
              min="3"
              max="90"
              value={durationDays}
              onChange={(e) => setDurationDays(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer h-2 bg-navy-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>3 Days</span>
              <span>14 Days (Demo)</span>
              <span>90 Days</span>
            </div>
          </div>

          {/* Action Trigger */}
          <div className="flex items-end">
            <button
              onClick={handleExecuteSimulation}
              className="w-full flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 text-xs font-bold text-white shadow-lg hover:opacity-95 transition-opacity"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>Run Disruption Simulation</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scenario Impact Summary & Metrics (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Executive Impact Banner */}
          <div className="rounded-2xl border border-navy-800 bg-navy-900/60 p-5 shadow-xl">
            <div className="flex items-start justify-between pb-4 border-b border-navy-800 mb-4">
              <div className="flex items-center space-x-3.5">
                <div className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl overflow-hidden ring-2 ring-red-500/50 shadow-glow-red">
                  {selectedEmployee.avatar ? (
                    <img src={selectedEmployee.avatar} alt={selectedEmployee.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gradient-to-tr from-orange-500 to-red-500 text-sm font-bold text-white">
                      {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="rounded bg-orange-500/20 px-2 py-0.5 text-[10px] font-bold text-orange-300 border border-orange-500/30">
                      SIMULATION RESULT
                    </span>
                    <span className="text-xs text-slate-400">
                      Target: {simulationResult.scenario.targetEmployeeName} ({simulationResult.scenario.durationDays} Days)
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">
                    Overall Disruption Impact Score: <span className="text-red-400 font-mono">{simulationResult.impactScore}/100</span>
                  </h3>
                </div>
              </div>

              <div className="flex items-center space-x-1.5 rounded-lg bg-red-500/10 border border-red-500/30 px-2.5 py-1 text-xs text-red-300 font-semibold">
                <AlertOctagon className="h-4 w-4 text-red-400" />
                <span>Critical SLA Risk</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-navy-950 p-3.5 rounded-xl border border-navy-800">
              {simulationResult.impactSummary}
            </p>

            {/* Impact Metric Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              <div className="rounded-xl border border-navy-800 bg-navy-900 p-3">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Project Milestone Slip</span>
                <span className="text-xl font-bold font-mono text-red-400">
                  +{simulationResult.projectedDeliveryDelayDays} Days
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">Apollo Critical Path</span>
              </div>

              <div className="rounded-xl border border-navy-800 bg-navy-900 p-3">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Workload Deficit</span>
                <span className="text-xl font-bold font-mono text-amber-400">
                  {simulationResult.workloadGapHours} Hours
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">Unbacked Dev Capacity</span>
              </div>

              <div className="rounded-xl border border-navy-800 bg-navy-900 p-3">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Affected Tasks</span>
                <span className="text-xl font-bold font-mono text-cyan-400">
                  {simulationResult.affectedTaskIds.length} Tasks
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">2 Mission-Critical</span>
              </div>

              <div className="rounded-xl border border-navy-800 bg-navy-900 p-3">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">Transition Effort</span>
                <span className="text-xl font-bold font-mono text-electric-400">
                  {simulationResult.transitionEffortHours} Hours
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">Minimum Handover</span>
              </div>
            </div>
          </div>

          {/* Breakdown Tabs: Affected Deliverables & Blocked Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Affected Tasks */}
            <div className="rounded-2xl border border-navy-800 bg-navy-900/40 p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-2 mb-3">
                <CheckSquare className="h-4 w-4 text-amber-400" />
                <span>Stalled Critical Tasks ({simulationResult.affectedTaskIds.length})</span>
              </h4>
              <div className="space-y-2">
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-2.5 text-xs">
                  <div className="flex items-center justify-between font-semibold text-red-300 mb-0.5">
                    <span>Multi-Region Kubernetes Failover</span>
                    <span className="rounded bg-red-500/20 px-1.5 py-0.2 text-[9px] font-bold">P0 Task</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    No verified backup for etcd cluster split-brain mitigation during outage.
                  </p>
                </div>

                <div className="rounded-lg border border-orange-500/30 bg-orange-500/10 p-2.5 text-xs">
                  <div className="flex items-center justify-between font-semibold text-orange-300 mb-0.5">
                    <span>Terraform State Lock Migrations</span>
                    <span className="rounded bg-orange-500/20 px-1.5 py-0.2 text-[9px] font-bold">P0 Task</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Blocks PR merges for Project Apollo cloud infra deployment pipeline.
                  </p>
                </div>
              </div>
            </div>

            {/* Unavailable Skills */}
            <div className="rounded-2xl border border-navy-800 bg-navy-900/40 p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-2 mb-3">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                <span>Scarcity Skills Dropping to Zero</span>
              </h4>
              <div className="space-y-2">
                {simulationResult.criticalSkillsUnavailable.map((skillName) => (
                  <div key={skillName} className="flex items-center justify-between rounded-lg border border-navy-800 bg-navy-900 p-2 text-xs">
                    <span className="text-slate-200 font-medium">{skillName}</span>
                    <span className="rounded bg-red-500/20 px-2 py-0.5 text-[10px] font-mono text-red-300 border border-red-500/40">
                      0 Certified Backups
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Side Callout & Continuity Optimizer Prompt (1 Col) */}
        <div className="rounded-2xl border border-cyan-500/40 bg-gradient-to-b from-navy-900 via-navy-950 to-navy-900 p-5 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 pb-3 border-b border-navy-800 mb-4">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                Recommended Continuity Action
              </span>
            </div>

            <h4 className="text-base font-bold text-white mb-2">
              Absorb Disruption with Zero Schedule Delay
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              TwinFlow has identified an optimal internal candidate (<span className="text-cyan-300 font-semibold">Sarah Lin</span>) who possesses 88% skill overlap and 35% available bandwidth headroom to absorb Arjun Mehta&apos;s critical responsibilities.
            </p>

            <div className="rounded-xl border border-navy-800 bg-navy-900/80 p-3.5 space-y-2 text-xs mb-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Current Delay Without Backup:</span>
                <span className="text-red-400 font-mono font-bold">+18 Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Projected Delay With Sarah Lin:</span>
                <span className="text-emerald-400 font-mono font-bold">&lt; 2 Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Required Transition Time:</span>
                <span className="text-electric-400 font-mono font-bold">12 Hours</span>
              </div>
            </div>

            <div className="rounded-lg bg-navy-950 p-2.5 text-[11px] text-slate-400 flex items-start space-x-2 border border-navy-800">
              <Info className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span>
                Figures shown are calculated using sample rules based on dependency topology and task estimates.
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-navy-800 mt-4">
            <button
              onClick={handleProceedToOptimizer}
              className="w-full flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-electric-500 to-cyan-500 px-4 py-2.5 text-xs font-bold text-white shadow-glow hover:opacity-95 transition-opacity"
            >
              <span>Launch Continuity Optimizer</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
