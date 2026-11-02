'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Compass,
  ArrowRight,
  CheckCircle2,
  X,
  Play,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useTwinFlow } from '@/context/TwinFlowContext';
import { cn } from '@/lib/utils';

export const GuidedDemoBanner: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    guidedStep,
    setGuidedStep,
    guidedTourActive,
    setGuidedTourActive,
    continuityScore,
    executeAllPlaybookActions,
    resetDemoData,
  } = useTwinFlow();

  if (!guidedTourActive) return null;

  const steps = [
    {
      num: 1,
      title: 'Flag SPOF Dependency',
      route: '/',
      description: 'Observe baseline Continuity Score (68%) and Arjun Mehta flagged as critical SPOF.',
      actionLabel: 'Go to Dependency Radar',
      nextRoute: '/dependencies',
    },
    {
      num: 2,
      title: 'Inspect Graph Nodes',
      route: '/dependencies',
      description: 'Click Arjun Mehta node to view downstream impacts on Project Apollo and etcd failover.',
      actionLabel: 'Launch Simulator',
      nextRoute: '/simulator',
    },
    {
      num: 3,
      title: 'Simulate 14-Day Absence',
      route: '/simulator',
      description: 'Simulate Arjun’s 14-day leave: notice +18 day project delay and 96.6-hour capacity gap.',
      actionLabel: 'Run Optimizer',
      nextRoute: '/optimizer',
    },
    {
      num: 4,
      title: 'Least-Disruptive Optimizer',
      route: '/optimizer',
      description: 'Compare Sarah Lin (88% match, 65% load) vs Marcus Vance (98% overloaded). Select Sarah Lin.',
      actionLabel: 'Generate Handover',
      nextRoute: '/knowledge',
    },
    {
      num: 5,
      title: 'AI Handover Generation',
      route: '/knowledge',
      description: 'Generate 4-module automated handover runbook and credentials transfer checklist.',
      actionLabel: 'Consult AI Copilot',
      nextRoute: '/copilot',
    },
    {
      num: 6,
      title: 'Explainable AI Sourcing',
      route: '/copilot',
      description: 'Query AI Copilot with preset prompts to inspect confidence scores and factual node citations.',
      actionLabel: 'Review Playbooks',
      nextRoute: '/playbooks',
    },
    {
      num: 7,
      title: 'Approve & Execute Playbook',
      route: '/playbooks',
      description: 'Approve assigned actions or click "Execute All" to trigger instantaneous readiness elevation.',
      actionLabel: 'Verify on Dashboard',
      nextRoute: '/',
    },
    {
      num: 8,
      title: 'Continuity Verified (84%)',
      route: '/',
      description: 'Continuity Score elevated from 68% to 84%. Arjun Mehta SPOF resolved with verified backup.',
      actionLabel: 'Restart Scenario',
      nextRoute: '/',
    },
  ];

  const currentStepData = steps[guidedStep - 1] || steps[0];

  const handleNextStep = () => {
    if (guidedStep === 8) {
      resetDemoData();
      return;
    }
    const next = guidedStep + 1;
    setGuidedStep(next);
    const targetRoute = steps[next - 1].route;
    router.push(targetRoute);
  };

  const handleAutoExecute = () => {
    executeAllPlaybookActions();
    setGuidedStep(8);
    router.push('/');
  };

  return (
    <div className="border-b border-cyan-500/30 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 px-6 py-2.5 shadow-md relative z-10">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
        {/* Left: Current Guided Step Info */}
        <div className="flex items-center space-x-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 font-mono text-xs font-bold">
            {guidedStep}/8
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                Maverick Demo Workflow:
              </span>
              <span className="text-xs font-bold text-white">
                {currentStepData.title}
              </span>
            </div>
            <p className="text-xs text-slate-300">
              {currentStepData.description}
            </p>
          </div>
        </div>

        {/* Center: Stepper Dots */}
        <div className="hidden xl:flex items-center space-x-1.5">
          {steps.map((s) => (
            <button
              key={s.num}
              onClick={() => {
                setGuidedStep(s.num);
                router.push(s.route);
              }}
              className={cn(
                'h-2 rounded-full transition-all',
                s.num === guidedStep
                  ? 'w-6 bg-cyan-400 shadow-glow-cyan'
                  : s.num < guidedStep
                  ? 'w-2 bg-emerald-400'
                  : 'w-2 bg-navy-700 hover:bg-navy-600'
              )}
              title={`Step ${s.num}: ${s.title}`}
            />
          ))}
        </div>

        {/* Right: Quick Action Controls */}
        <div className="flex items-center space-x-2 w-full lg:w-auto justify-end">
          <button
            onClick={handleAutoExecute}
            className="flex items-center space-x-1 rounded-md border border-electric-500/40 bg-electric-500/20 px-2.5 py-1 text-xs font-medium text-electric-300 hover:bg-electric-500/30 transition-colors"
            title="Fast-forward entire workflow and elevate score to 84%"
          >
            <Sparkles className="h-3 w-3 text-cyan-400" />
            <span>1-Click Auto Run</span>
          </button>

          <button
            onClick={handleNextStep}
            className="flex items-center space-x-1 rounded-md bg-gradient-to-r from-electric-500 to-cyan-500 px-3 py-1 text-xs font-semibold text-white shadow-glow hover:opacity-95 transition-opacity"
          >
            <span>{currentStepData.actionLabel}</span>
            <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </button>

          <button
            onClick={() => setGuidedTourActive(false)}
            className="text-slate-400 hover:text-white p-1 rounded hover:bg-navy-800"
            title="Dismiss guided tour"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
