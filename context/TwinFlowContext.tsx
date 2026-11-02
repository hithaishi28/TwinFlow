'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Employee,
  Project,
  Task,
  BusinessProcess,
  KnowledgeDocument,
  RiskAlert,
  PlaybookAction,
  SimulationScenario,
  SimulationResult,
  OptimizerCandidate,
} from '@/types';
import {
  APEX_EMPLOYEES,
  APEX_PROJECTS,
  APEX_TASKS,
  APEX_PROCESSES,
  APEX_DOCUMENTS,
  INITIAL_RISK_ALERTS,
  INITIAL_PLAYBOOK_ACTIONS,
} from '@/data/apexDataset';
import { runDisruptionSimulation } from '@/lib/simulationEngine';
import { findLeastDisruptiveBackups } from '@/lib/optimizerEngine';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info' | 'error';
  timestamp: string;
}

interface TwinFlowContextType {
  // Metric Telemetry
  continuityScore: number;
  backupCoverage: number;
  knowledgeResilience: number;
  criticalSPOFCount: number;
  uncoveredResponsibilitiesCount: number;

  // Data Stores
  employees: Employee[];
  projects: Project[];
  tasks: Task[];
  processes: BusinessProcess[];
  documents: KnowledgeDocument[];
  alerts: RiskAlert[];
  playbookActions: PlaybookAction[];

  // Scenario & Simulation
  activeScenario: SimulationScenario;
  setActiveScenario: (scenario: SimulationScenario) => void;
  simulationResult: SimulationResult;
  runSimulation: (scenario?: SimulationScenario) => void;

  // Optimizer & Backups
  optimizerCandidates: OptimizerCandidate[];
  selectedBackupId: string | null;
  selectBackup: (candidateId: string) => void;

  // Playbook Management
  approvePlaybookAction: (actionId: string) => void;
  completePlaybookAction: (actionId: string) => void;
  executeAllPlaybookActions: () => void;
  resetDemoData: () => void;

  // Guided Walkthrough Stepper
  guidedStep: number;
  setGuidedStep: (step: number) => void;
  guidedTourActive: boolean;
  setGuidedTourActive: (active: boolean) => void;

  // Authentication State
  isAuthenticated: boolean;
  login: (role?: string) => void;
  logout: () => void;

  // Enterprise Role & Notifications
  activeRole: string;
  setActiveRole: (role: string) => void;
  toasts: ToastMessage[];
  addToast: (title: string, message: string, type?: 'success' | 'warning' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const TwinFlowContext = createContext<TwinFlowContextType | undefined>(undefined);

export const TwinFlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Core Entities State
  const [employees, setEmployees] = useState<Employee[]>(APEX_EMPLOYEES);
  const [projects, setProjects] = useState<Project[]>(APEX_PROJECTS);
  const [tasks, setTasks] = useState<Task[]>(APEX_TASKS);
  const [processes, setProcesses] = useState<BusinessProcess[]>(APEX_PROCESSES);
  const [documents, setDocuments] = useState<KnowledgeDocument[]>(APEX_DOCUMENTS);
  const [alerts, setAlerts] = useState<RiskAlert[]>(INITIAL_RISK_ALERTS);
  const [playbookActions, setPlaybookActions] = useState<PlaybookAction[]>(INITIAL_PLAYBOOK_ACTIONS);

  // Simulation State
  const defaultScenario: SimulationScenario = {
    id: 'SCENARIO-DEMO-01',
    targetEmployeeId: 'EMP-104',
    targetEmployeeName: 'Arjun Mehta',
    department: 'Engineering',
    disruptionType: 'Absence (14 Days)',
    durationDays: 14,
  };
  const [activeScenario, setActiveScenario] = useState<SimulationScenario>(defaultScenario);
  const [simulationResult, setSimulationResult] = useState<SimulationResult>(() =>
    runDisruptionSimulation(defaultScenario)
  );

  // Optimizer State
  const [optimizerCandidates, setOptimizerCandidates] = useState<OptimizerCandidate[]>(() =>
    findLeastDisruptiveBackups('EMP-104')
  );
  const [selectedBackupId, setSelectedBackupId] = useState<string | null>(null);

  // Authentication State (defaults to false so Enterprise Login is the starting page)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Guided Tour & Role State
  const [guidedStep, setGuidedStep] = useState<number>(1);
  const [guidedTourActive, setGuidedTourActive] = useState<boolean>(true);
  const [activeRole, setActiveRole] = useState<string>('Chief Risk Officer');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const login = (role?: string) => {
    if (role) setActiveRole(role);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  // Computed Dynamic Metrics
  const [continuityScore, setContinuityScore] = useState<number>(68);
  const [backupCoverage, setBackupCoverage] = useState<number>(42);
  const [knowledgeResilience, setKnowledgeResilience] = useState<number>(57);
  const [criticalSPOFCount, setCriticalSPOFCount] = useState<number>(4);
  const [uncoveredResponsibilitiesCount, setUncoveredResponsibilitiesCount] = useState<number>(6);

  const addToast = (title: string, message: string, type: 'success' | 'warning' | 'info' | 'error' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, title, message, type, timestamp: new Date().toLocaleTimeString() }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Recalculate metrics whenever actions or backups change
  const recalculateMetrics = (actions: PlaybookAction[], backupId: string | null) => {
    let score = 68;
    let backupCov = 42;
    let knowRes = 57;
    let spofs = 4;
    let uncovered = 6;

    const completed = actions.filter(a => a.status === 'Completed');
    const approved = actions.filter(a => a.status === 'Approved');

    if (backupId === 'EMP-108') {
      backupCov += 20;
      score += 4;
    }

    completed.forEach(act => {
      score += act.projectedScoreImpact;
      if (act.category === 'Backup Assignment') backupCov += 16;
      if (act.category === 'Knowledge Transfer') knowRes += 18;
      if (act.category === 'Process Documentation') knowRes += 10;
      if (act.category === 'Workload Rebalance') score += 2;
      uncovered = Math.max(1, uncovered - 1);
    });

    approved.forEach(act => {
      score += Math.round(act.projectedScoreImpact * 0.4);
    });

    if (completed.length >= 3) {
      spofs = 1; // SPOF resolved for Arjun Mehta
    }

    setContinuityScore(Math.min(94, Math.max(68, score)));
    setBackupCoverage(Math.min(92, Math.max(42, backupCov)));
    setKnowledgeResilience(Math.min(90, Math.max(57, knowRes)));
    setCriticalSPOFCount(spofs);
    setUncoveredResponsibilitiesCount(uncovered);
  };

  const runSimulation = (scenario?: SimulationScenario) => {
    const sc = scenario || activeScenario;
    const result = runDisruptionSimulation(sc);
    setSimulationResult(result);
    setOptimizerCandidates(findLeastDisruptiveBackups(sc.targetEmployeeId));
    addToast(
      'Disruption Simulation Completed',
      `Impact score evaluated at ${result.impactScore}/100 with ${result.projectedDeliveryDelayDays} days projected delivery slip.`,
      result.impactScore > 75 ? 'warning' : 'info'
    );
  };

  const selectBackup = (candidateId: string) => {
    setSelectedBackupId(candidateId);
    const candidate = employees.find(e => e.id === candidateId);
    if (!candidate) return;

    // Update Arjun's backup
    setEmployees(prev =>
      prev.map(emp => {
        if (emp.id === activeScenario.targetEmployeeId) {
          return {
            ...emp,
            backupEmployees: {
              ...emp.backupEmployees,
              primary: candidateId,
            },
            isSinglePointOfFailure: false,
          };
        }
        return emp;
      })
    );

    // Update action ACT-01 assignee
    setPlaybookActions(prev =>
      prev.map(act => (act.id === 'ACT-01' ? { ...act, status: 'Approved' } : act))
    );

    addToast(
      'Backup Assignment Confirmed',
      `${candidate.name} selected as interim lead for ${activeScenario.targetEmployeeName}. Playbook updated.`,
      'success'
    );

    recalculateMetrics(playbookActions, candidateId);
  };

  const approvePlaybookAction = (actionId: string) => {
    setPlaybookActions(prev => {
      const updated = prev.map(a => (a.id === actionId ? { ...a, status: 'Approved' as const } : a));
      recalculateMetrics(updated, selectedBackupId);
      return updated;
    });
    addToast('Action Approved', `Playbook action has been approved by ${activeRole}.`, 'success');
  };

  const completePlaybookAction = (actionId: string) => {
    setPlaybookActions(prev => {
      const updated = prev.map(a => (a.id === actionId ? { ...a, status: 'Completed' as const } : a));
      recalculateMetrics(updated, selectedBackupId);
      return updated;
    });

    // If ACT-01 or ACT-02 completed, resolve Arjun alert
    if (actionId === 'ACT-01' || actionId === 'ACT-02') {
      setAlerts(prev =>
        prev.map(alt => (alt.id === 'ALT-01' ? { ...alt, resolved: true } : alt))
      );
    }

    addToast('Action Completed', `Continuity action marked complete. Readiness indicators updated.`, 'success');
  };

  const executeAllPlaybookActions = () => {
    const updated = playbookActions.map(a => ({ ...a, status: 'Completed' as const }));
    setPlaybookActions(updated);
    setSelectedBackupId('EMP-108');

    // Resolve alerts
    setAlerts(prev =>
      prev.map(alt => ({ ...alt, resolved: true }))
    );

    // Update employees
    setEmployees(prev =>
      prev.map(emp => {
        if (emp.id === 'EMP-104') {
          return {
            ...emp,
            isSinglePointOfFailure: false,
            backupEmployees: { primary: 'EMP-108' },
          };
        }
        if (emp.id === 'EMP-102') {
          return {
            ...emp,
            workloadUtilization: 86, // load rebalanced!
          };
        }
        return emp;
      })
    );

    recalculateMetrics(updated, 'EMP-108');
    setContinuityScore(84);
    setBackupCoverage(78);
    setKnowledgeResilience(85);
    setCriticalSPOFCount(1);
    setUncoveredResponsibilitiesCount(1);

    addToast(
      'Full Continuity Playbook Executed',
      'Readiness Score elevated to 84%. Arjun Mehta SPOF resolved. All actions verified.',
      'success'
    );
  };

  const resetDemoData = () => {
    setEmployees(APEX_EMPLOYEES);
    setProjects(APEX_PROJECTS);
    setTasks(APEX_TASKS);
    setProcesses(APEX_PROCESSES);
    setDocuments(APEX_DOCUMENTS);
    setAlerts(INITIAL_RISK_ALERTS);
    setPlaybookActions(INITIAL_PLAYBOOK_ACTIONS);
    setSelectedBackupId(null);
    setContinuityScore(68);
    setBackupCoverage(42);
    setKnowledgeResilience(57);
    setCriticalSPOFCount(4);
    setUncoveredResponsibilitiesCount(6);
    setGuidedStep(1);
    addToast('Demo State Reset', 'TwinFlow state restored to initial baseline.', 'info');
  };

  return (
    <TwinFlowContext.Provider
      value={{
        continuityScore,
        backupCoverage,
        knowledgeResilience,
        criticalSPOFCount,
        uncoveredResponsibilitiesCount,
        employees,
        projects,
        tasks,
        processes,
        documents,
        alerts,
        playbookActions,
        activeScenario,
        setActiveScenario,
        simulationResult,
        runSimulation,
        optimizerCandidates,
        selectedBackupId,
        selectBackup,
        approvePlaybookAction,
        completePlaybookAction,
        executeAllPlaybookActions,
        resetDemoData,
        guidedStep,
        setGuidedStep,
        guidedTourActive,
        setGuidedTourActive,
        isAuthenticated,
        login,
        logout,
        activeRole,
        setActiveRole,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </TwinFlowContext.Provider>
  );
};

export const useTwinFlow = () => {
  const context = useContext(TwinFlowContext);
  if (!context) {
    throw new Error('useTwinFlow must be used within a TwinFlowProvider');
  }
  return context;
};
