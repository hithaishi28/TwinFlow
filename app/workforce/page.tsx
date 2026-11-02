'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users2,
  Search,
  Filter,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ArrowRight,
  ExternalLink,
  Briefcase,
  Zap,
  MapPin,
  Calendar,
  Layers,
} from 'lucide-react';
import { useTwinFlow } from '@/context/TwinFlowContext';
import { Employee } from '@/types';
import { cn } from '@/lib/utils';

export default function WorkforceTwinPage() {
  const router = useRouter();
  const { employees, setActiveScenario, setGuidedStep } = useTwinFlow();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedRisk, setSelectedRisk] = useState<string>('All');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.skills.some(s => s.skillName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDept = selectedDept === 'All' || emp.department === selectedDept;

    const matchesRisk =
      selectedRisk === 'All' ||
      (selectedRisk === 'SPOF' && emp.isSinglePointOfFailure) ||
      (selectedRisk === 'Overloaded' && emp.workloadUtilization > 90);

    return matchesSearch && matchesDept && matchesRisk;
  });

  const handleSimulateEmployee = (emp: Employee) => {
    setActiveScenario({
      id: `SIM-${Date.now()}`,
      targetEmployeeId: emp.id,
      targetEmployeeName: emp.name,
      department: emp.department,
      disruptionType: 'Absence (14 Days)',
      durationDays: 14,
    });
    setGuidedStep(3);
    router.push('/simulator');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-xl border border-navy-800 bg-navy-900/60 p-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <Users2 className="h-5 w-5 text-cyan-400" />
            <span>Workforce Digital Twin — Enterprise Talent Graph</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Connected digital profiles mapping tacit skills, delivery commitments, workload bandwidth, and backup dependencies across all personnel.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="rounded-lg bg-navy-800 px-3 py-1 text-slate-300 font-mono">
            {filteredEmployees.length} of {employees.length} Personnel Visible
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 rounded-xl border border-navy-800 bg-navy-900/40 p-3">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, role, or technical skill (e.g. 'Kubernetes')..."
            className="w-full rounded-lg border border-navy-700 bg-navy-950 py-2 pl-9 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
          />
        </div>

        <div>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full rounded-lg border border-navy-700 bg-navy-950 px-3 py-2 text-xs text-slate-200 focus:outline-none"
          >
            <option value="All">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="IT">IT &amp; Security</option>
            <option value="Product">Product</option>
            <option value="Human Resources">Human Resources</option>
          </select>
        </div>

        <div>
          <select
            value={selectedRisk}
            onChange={(e) => setSelectedRisk(e.target.value)}
            className="w-full rounded-lg border border-navy-700 bg-navy-950 px-3 py-2 text-xs text-slate-200 focus:outline-none"
          >
            <option value="All">All Risk Profiles</option>
            <option value="SPOF">Single Points of Failure (SPOF)</option>
            <option value="Overloaded">Overloaded Bandwidth (&gt;90%)</option>
          </select>
        </div>
      </div>

      {/* Employees Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEmployees.map((emp) => {
          const isOverloaded = emp.workloadUtilization > 90;

          return (
            <div
              key={emp.id}
              onClick={() => setSelectedEmployee(emp)}
              className={cn(
                "cursor-pointer group rounded-2xl border p-4.5 flex flex-col justify-between transition-all hover:scale-[1.01] shadow-lg",
                emp.isSinglePointOfFailure
                  ? "border-red-500/40 bg-gradient-to-b from-navy-900 to-navy-950 ring-1 ring-red-500/30"
                  : "border-navy-800 bg-navy-900/60 hover:border-cyan-500/40"
              )}
            >
              <div>
                {/* Header & Badges */}
                <div className="flex items-start justify-between pb-3 border-b border-navy-800/80 mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl overflow-hidden ring-2 ring-white/10 shadow-md group-hover:ring-cyan-400/50 transition-all">
                      {emp.avatar ? (
                        <img src={emp.avatar} alt={emp.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-gradient-to-tr from-cyan-500 to-electric-500 text-sm font-bold text-white">
                          {emp.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {emp.name}
                      </h4>
                      <p className="text-xs text-slate-400">{emp.role}</p>
                    </div>
                  </div>

                  {emp.isSinglePointOfFailure ? (
                    <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-[9px] font-bold text-red-300 border border-red-500/40 animate-pulse">
                      SPOF Node
                    </span>
                  ) : (
                    <span className="rounded-full bg-navy-800 px-2 py-0.5 text-[9px] font-mono text-slate-400">
                      {emp.department}
                    </span>
                  )}
                </div>

                {/* Telemetry Row */}
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div className="rounded-lg bg-navy-950 p-2 border border-navy-800">
                    <span className="text-[10px] text-slate-400 block">Workload Load</span>
                    <span className={cn("font-mono font-bold", isOverloaded ? "text-red-400" : "text-emerald-400")}>
                      {emp.workloadUtilization}% Capacity
                    </span>
                  </div>
                  <div className="rounded-lg bg-navy-950 p-2 border border-navy-800">
                    <span className="text-[10px] text-slate-400 block">Experience</span>
                    <span className="font-mono font-bold text-slate-200">
                      {emp.experienceYears} Years ({emp.seniority})
                    </span>
                  </div>
                </div>

                {/* Primary Skills Tags */}
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Core Competencies:</span>
                  <div className="flex flex-wrap gap-1">
                    {emp.skills.slice(0, 3).map((s) => (
                      <span
                        key={s.skillId}
                        className="rounded bg-navy-800/80 px-2 py-0.5 text-[10px] text-slate-300 border border-navy-700 font-mono"
                      >
                        {s.skillName} (Lvl {s.proficiency})
                      </span>
                    ))}
                    {emp.skills.length > 3 && (
                      <span className="rounded bg-navy-800/80 px-1.5 py-0.5 text-[10px] text-slate-400">
                        +{emp.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Trigger */}
              <div className="pt-3 border-t border-navy-800/80 mt-4 flex items-center justify-between">
                <span className="text-[11px] text-cyan-400 group-hover:underline">View Digital Twin Profile</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSimulateEmployee(emp);
                  }}
                  className="rounded-lg bg-navy-800 hover:bg-orange-500/20 hover:text-orange-300 text-slate-300 px-2.5 py-1 text-[11px] font-semibold transition-colors flex items-center space-x-1"
                >
                  <Flame className="h-3 w-3 text-orange-400" />
                  <span>Simulate</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Employee Profile Detailed Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="max-w-xl w-full rounded-2xl border border-navy-700 bg-navy-900 p-6 shadow-2xl animate-in zoom-in-95 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 border-b border-navy-800 mb-4">
              <div className="flex items-center space-x-3.5">
                <div className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl overflow-hidden ring-2 ring-cyan-400/50 shadow-glow">
                  {selectedEmployee.avatar ? (
                    <img src={selectedEmployee.avatar} alt={selectedEmployee.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gradient-to-tr from-cyan-500 to-electric-500 text-base font-bold text-white">
                      {selectedEmployee.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{selectedEmployee.name}</h3>
                  <p className="text-xs text-slate-400">{selectedEmployee.role} • {selectedEmployee.department}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedEmployee(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              {/* Telemetry Summary */}
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-xl border border-navy-800 bg-navy-950 p-2.5 text-center">
                  <span className="text-[10px] text-slate-400 block">Workload</span>
                  <span className="font-mono font-bold text-sm text-cyan-400">{selectedEmployee.workloadUtilization}%</span>
                </div>
                <div className="rounded-xl border border-navy-800 bg-navy-950 p-2.5 text-center">
                  <span className="text-[10px] text-slate-400 block">Seniority</span>
                  <span className="font-mono font-bold text-sm text-white">{selectedEmployee.seniority}</span>
                </div>
                <div className="rounded-xl border border-navy-800 bg-navy-950 p-2.5 text-center">
                  <span className="text-[10px] text-slate-400 block">Location</span>
                  <span className="font-mono font-bold text-sm text-slate-200">{selectedEmployee.location.split(',')[0]}</span>
                </div>
              </div>

              {/* SPOF Callout */}
              {selectedEmployee.isSinglePointOfFailure && (
                <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-3.5 text-red-300">
                  <span className="font-bold block mb-1 flex items-center space-x-1">
                    <ShieldAlert className="h-4 w-4" />
                    <span>Single Point of Failure Vulnerabilities:</span>
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-300">
                    {selectedEmployee.spofReasons?.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Skills Table */}
              <div>
                <span className="font-bold text-white uppercase text-[10px] tracking-wider block mb-2">
                  Verified Skills Matrix:
                </span>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {selectedEmployee.skills.map((skill) => (
                    <div
                      key={skill.skillId}
                      className="flex items-center justify-between rounded-lg border border-navy-800 bg-navy-950 p-2"
                    >
                      <span className="font-medium text-slate-200">{skill.skillName}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] text-slate-400">{skill.yearsOfExperience}y exp</span>
                        <span className="rounded bg-navy-800 px-1.5 py-0.5 text-[10px] font-mono text-cyan-300">
                          Level {skill.proficiency}/5
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Primary Responsibilities */}
              <div>
                <span className="font-bold text-white uppercase text-[10px] tracking-wider block mb-1.5">
                  Assigned Operational Responsibilities:
                </span>
                <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-300">
                  {selectedEmployee.primaryResponsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-2 pt-3 border-t border-navy-800">
              <button
                onClick={() => setSelectedEmployee(null)}
                className="rounded-lg border border-navy-700 bg-navy-800 px-3 py-1.5 text-xs text-slate-300 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => handleSimulateEmployee(selectedEmployee)}
                className="rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-4 py-1.5 text-xs font-bold text-white shadow-lg"
              >
                Simulate Disruption
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
