'use client';

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  Search,
  Bell,
  Sparkles,
  ShieldCheck,
  UserCheck,
  ChevronDown,
  Info,
  CheckCircle2,
  AlertTriangle,
  PlayCircle,
  LogOut,
} from 'lucide-react';
import { useTwinFlow } from '@/context/TwinFlowContext';
import { cn } from '@/lib/utils';

export const TopHeader: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const {
    continuityScore,
    criticalSPOFCount,
    activeRole,
    setActiveRole,
    logout,
    toasts,
    guidedTourActive,
    setGuidedTourActive,
  } = useTwinFlow();

  const [searchQuery, setSearchQuery] = useState('');
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);

  // Map path to title
  const getPageTitle = () => {
    switch (pathname) {
      case '/':
      case '/dashboard':
        return { title: 'Executive Continuity Command Center', breadcrumb: 'Overview' };
      case '/workforce':
        return { title: 'Workforce Digital Twin', breadcrumb: 'Workforce' };
      case '/dependencies':
        return { title: 'Single Point of Failure (SPOF) Radar', breadcrumb: 'Dependency Radar' };
      case '/risk':
        return { title: 'Organizational Risk Intelligence', breadcrumb: 'Risk Telemetry' };
      case '/simulator':
        return { title: 'What-If Disruption Simulator', breadcrumb: 'Simulator' };
      case '/optimizer':
        return { title: 'Least-Disruptive Continuity Optimizer', breadcrumb: 'Optimizer' };
      case '/knowledge':
        return { title: 'Knowledge Resilience & AI Handover', breadcrumb: 'Knowledge Hub' };
      case '/copilot':
        return { title: 'Explainable AI Copilot & Confidence Intel', breadcrumb: 'AI Copilot' };
      case '/playbooks':
        return { title: 'Adaptive Continuity Playbooks', breadcrumb: 'Playbooks' };
      case '/reports':
        return { title: 'Board & Executive Continuity Reports', breadcrumb: 'Reports' };
      case '/settings':
        return { title: 'Enterprise Configuration & AI Model', breadcrumb: 'Settings' };
      case '/login':
        return { title: 'Enterprise Single Sign-On', breadcrumb: 'Authentication' };
      default:
        return { title: 'Continuity Intelligence', breadcrumb: 'Console' };
    }
  };

  const pageInfo = getPageTitle();

  const roles = [
    'Chief Risk Officer',
    'VP of Engineering',
    'HR Continuity Lead',
    'Operations Director',
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.toLowerCase().trim();
    if (q.includes('arjun') || q.includes('spof') || q.includes('radar')) {
      router.push('/dependencies');
    } else if (q.includes('simulat') || q.includes('absence') || q.includes('14')) {
      router.push('/simulator');
    } else if (q.includes('backup') || q.includes('sarah') || q.includes('optimiz')) {
      router.push('/optimizer');
    } else if (q.includes('handover') || q.includes('knowledg') || q.includes('runbook')) {
      router.push('/knowledge');
    } else if (q.includes('playbook') || q.includes('action')) {
      router.push('/playbooks');
    } else if (q.includes('copilot') || q.includes('ask') || q.includes('ai')) {
      router.push('/copilot');
    } else {
      router.push('/workforce');
    }
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-navy-800 bg-navy-950/90 px-6 backdrop-blur-md">
      {/* Left: Breadcrumb & Title */}
      <div>
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <span>Apex Technologies</span>
          <span>/</span>
          <span className="text-cyan-400 font-medium">{pageInfo.breadcrumb}</span>
        </div>
        <h1 className="text-base font-semibold text-white tracking-tight">{pageInfo.title}</h1>
      </div>

      {/* Center: Global Omnibar Search */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search employees, skills, tasks, SPOFs, runbooks... (e.g. 'Arjun Mehta')"
            className="w-full rounded-lg border border-navy-800 bg-navy-900/80 py-2 pl-9 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          />
        </form>
      </div>

      {/* Right: Controls, Role Switcher & Notifications */}
      <div className="flex items-center space-x-3">
        {/* Guided Demo Button */}
        <button
          onClick={() => setGuidedTourActive(!guidedTourActive)}
          className={cn(
            'flex items-center space-x-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium border transition-colors',
            guidedTourActive
              ? 'bg-cyan-500/15 border-cyan-400/40 text-cyan-300'
              : 'bg-navy-900 border-navy-800 text-slate-400 hover:text-white'
          )}
          title="Toggle 14-Day Disruption Scenario Walkthrough"
        >
          <PlayCircle className="h-3.5 w-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Guided Demo Tour</span>
        </button>



        {/* Readiness Score Pill */}
        <div className="hidden lg:flex items-center space-x-2 rounded-lg border border-navy-800 bg-navy-900 px-3 py-1.5 text-xs">
          <ShieldCheck className={cn("h-4 w-4", continuityScore >= 80 ? "text-emerald-400" : "text-amber-400")} />
          <span className="text-slate-400">Readiness:</span>
          <span className={cn("font-mono font-bold", continuityScore >= 80 ? "text-emerald-400" : "text-amber-400")}>
            {continuityScore}%
          </span>
          {criticalSPOFCount > 0 ? (
            <span className="flex items-center text-[10px] text-red-400 font-medium">
              ({criticalSPOFCount} SPOF)
            </span>
          ) : (
            <span className="flex items-center text-[10px] text-emerald-400 font-medium">
              (Optimal)
            </span>
          )}
        </div>

        {/* Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center space-x-2 rounded-lg border border-navy-800 bg-navy-900 px-2.5 py-1.5 text-xs text-slate-200 hover:bg-navy-850"
          >
            <UserCheck className="h-3.5 w-3.5 text-electric-400" />
            <span className="hidden sm:inline font-medium">{activeRole}</span>
            <ChevronDown className="h-3 w-3 text-slate-400" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-lg border border-navy-800 bg-navy-900 p-1.5 shadow-2xl z-50">
              <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Switch Perspective
              </div>
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setActiveRole(r);
                    setShowRoleMenu(false);
                  }}
                  className={cn(
                    'flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-xs text-left transition-colors',
                    activeRole === r ? 'bg-electric-500/20 text-cyan-300 font-semibold' : 'text-slate-300 hover:bg-navy-800'
                  )}
                >
                  <span>{r}</span>
                  {activeRole === r && <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotificationMenu(!showNotificationMenu)}
            className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-navy-800 bg-navy-900 text-slate-400 hover:text-white"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5 items-center justify-center rounded-full bg-red-500 ring-2 ring-navy-950" />
          </button>

          {showNotificationMenu && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl border border-navy-800 bg-navy-900 p-3 shadow-2xl z-50">
              <div className="flex items-center justify-between pb-2 border-b border-navy-800 mb-2">
                <span className="text-xs font-semibold text-slate-200">Continuity Alerts</span>
                <span className="rounded bg-red-500/20 px-1.5 py-0.5 text-[10px] text-red-300 font-medium">
                  {criticalSPOFCount} Active Risks
                </span>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-2 text-xs">
                  <div className="flex items-center space-x-1.5 font-semibold text-red-300 mb-0.5">
                    <AlertTriangle className="h-3.5 w-3.5 text-red-400" />
                    <span>Single Point of Failure: Arjun Mehta</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Lead Cloud Architect owns 4 critical processes with 0 verified backups.
                  </p>
                </div>
                <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-2 text-xs">
                  <div className="flex items-center space-x-1.5 font-semibold text-amber-300 mb-0.5">
                    <Info className="h-3.5 w-3.5 text-amber-400" />
                    <span>Runbook DOC-101 Outdated</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Multi-Region Disaster Recovery runbook coverage is currently at 45%.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Logout */}
        <div className="flex items-center space-x-2 pl-2 border-l border-navy-800">
          <button
            onClick={logout}
            className="flex items-center space-x-1.5 rounded-lg border border-navy-800 bg-navy-900 px-2.5 py-1.5 text-xs text-slate-400 hover:text-white hover:bg-navy-850 hover:border-red-500/30 transition-colors"
            title="Lock Console / Return to Enterprise Login"
          >
            <LogOut className="h-3.5 w-3.5 text-slate-400 hover:text-red-400" />
            <span className="hidden xl:inline text-[11px]">Lock / Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
