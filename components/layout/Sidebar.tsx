'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users2,
  Radar,
  ShieldAlert,
  Flame,
  GitCompare,
  BookOpen,
  Sparkles,
  ClipboardList,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Building2,
  HelpCircle,
  RotateCcw,
} from 'lucide-react';
import { useTwinFlow } from '@/context/TwinFlowContext';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
}

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { continuityScore, criticalSPOFCount, resetDemoData } = useTwinFlow();

  const navigation: NavItem[] = [
    { name: 'Overview', href: '/', icon: LayoutDashboard },
    { name: 'Workforce Twin', href: '/workforce', icon: Users2 },
    { 
      name: 'Dependency Radar', 
      href: '/dependencies', 
      icon: Radar,
      badge: `${criticalSPOFCount} SPOF`,
      badgeColor: criticalSPOFCount > 1 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    },
    { name: 'Risk Intelligence', href: '/risk', icon: ShieldAlert },
    { name: 'Disruption Simulator', href: '/simulator', icon: Flame },
    { name: 'Continuity Optimizer', href: '/optimizer', icon: GitCompare },
    { name: 'Knowledge Hub', href: '/knowledge', icon: BookOpen },
    { name: 'AI Copilot', href: '/copilot', icon: Sparkles, badge: 'AI', badgeColor: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' },
    { name: 'Continuity Playbooks', href: '/playbooks', icon: ClipboardList },
    { name: 'Reports & Analytics', href: '/reports', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <aside
      className={cn(
        'relative flex flex-col border-r border-navy-800 bg-navy-950 transition-all duration-300 z-30 select-none min-h-screen',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between border-b border-navy-800 px-4">
        {!collapsed ? (
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-electric-500 to-cyan-400 text-white shadow-glow">
              <Radar className="h-5 w-5 text-white animate-pulse" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white">TWIN<span className="text-cyan-400">FLOW</span></span>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">Continuity Twin</p>
            </div>
          </Link>
        ) : (
          <Link href="/" className="mx-auto flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-electric-500 to-cyan-400 text-white shadow-glow">
            <Radar className="h-5 w-5 text-white" />
          </Link>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex h-7 w-7 items-center justify-center rounded-md border border-navy-800 bg-navy-900 text-slate-400 hover:text-white hover:bg-navy-850"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* Organization Switcher Context */}
      {!collapsed ? (
        <div className="px-3 pt-3">
          <div className="flex items-center justify-between rounded-lg border border-navy-800/80 bg-navy-900/60 p-2 text-xs">
            <div className="flex items-center space-x-2 truncate">
              <Building2 className="h-4 w-4 text-cyan-400 flex-shrink-0" />
              <div className="truncate">
                <p className="font-semibold text-slate-200 truncate">Apex Technologies</p>
                <p className="text-[10px] text-slate-400">Enterprise Digital Twin</p>
              </div>
            </div>
            <div className="flex-shrink-0 rounded bg-navy-800 px-1.5 py-0.5 text-[10px] font-mono text-cyan-300">
              LIVE
            </div>
          </div>
        </div>
      ) : (
        <div className="py-2 flex justify-center">
          <div className="h-2 w-2 rounded-full bg-emerald-400" title="Connected: Apex Technologies" />
        </div>
      )}

      {/* Nav List */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-3">
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'group flex items-center rounded-lg px-2.5 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-electric-500/15 text-white border-l-2 border-cyan-400 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]'
                  : 'text-slate-400 hover:bg-navy-900 hover:text-slate-200'
              )}
              title={collapsed ? item.name : undefined}
            >
              <item.icon
                className={cn(
                  'h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110',
                  isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200',
                  !collapsed && 'mr-3'
                )}
              />
              {!collapsed && (
                <div className="flex flex-1 items-center justify-between truncate">
                  <span className="truncate">{item.name}</span>
                  {item.badge && (
                    <span className={cn('ml-2 rounded-full px-1.5 py-0.5 text-[10px] font-semibold', item.badgeColor)}>
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer State & Reset */}
      <div className="border-t border-navy-800 p-3 space-y-2">
        {!collapsed && (
          <div className="rounded-lg border border-navy-800 bg-navy-900/40 p-2.5">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-400">Readiness Score</span>
              <span className={cn("font-bold font-mono text-sm", continuityScore >= 80 ? "text-emerald-400" : "text-amber-400")}>
                {continuityScore}%
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-navy-800 overflow-hidden">
              <div
                className={cn("h-full transition-all duration-700", continuityScore >= 80 ? "bg-emerald-400" : "bg-gradient-to-r from-amber-400 to-electric-400")}
                style={{ width: `${continuityScore}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          {!collapsed ? (
            <button
              onClick={resetDemoData}
              className="flex w-full items-center justify-center space-x-1.5 rounded-md border border-navy-800 bg-navy-900/80 px-2 py-1.5 text-xs text-slate-400 hover:text-white hover:bg-navy-800"
              title="Reset sample scenario data"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset Demo State</span>
            </button>
          ) : (
            <button
              onClick={resetDemoData}
              className="mx-auto flex h-8 w-8 items-center justify-center rounded-md border border-navy-800 bg-navy-900 text-slate-400 hover:text-white hover:bg-navy-800"
              title="Reset sample scenario data"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
