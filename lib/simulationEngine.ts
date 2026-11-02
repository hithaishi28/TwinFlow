import { APEX_EMPLOYEES, APEX_PROJECTS, APEX_TASKS, APEX_PROCESSES, APEX_SKILLS } from '@/data/apexDataset';
import { SimulationScenario, SimulationResult } from '@/types';

export function runDisruptionSimulation(scenario: SimulationScenario): SimulationResult {
  const employee = APEX_EMPLOYEES.find(e => e.id === scenario.targetEmployeeId) || APEX_EMPLOYEES[0];

  // 1. Identify affected tasks
  const affectedTasks = APEX_TASKS.filter(t => t.ownerId === employee.id);
  const affectedTaskIds = affectedTasks.map(t => t.id);

  // 2. Identify affected projects
  const directProjects = APEX_PROJECTS.filter(p => 
    p.leadEmployeeId === employee.id || p.assignedEmployeeIds.includes(employee.id)
  );
  const taskProjectIds = affectedTasks.map(t => t.associatedProjectId);
  const allAffectedProjectIds = Array.from(new Set([...directProjects.map(p => p.id), ...taskProjectIds]));

  // 3. Identify affected processes
  const affectedProcesses = APEX_PROCESSES.filter(p => p.ownerId === employee.id);
  const affectedProcessIds = affectedProcesses.map(p => p.id);

  // 4. Identify critical skills unavailable
  const rareSkills = APEX_SKILLS.filter(s => s.rarityInOrg <= 2).map(s => s.id);
  const criticalSkillsUnavailable = employee.skills
    .filter(s => s.isPrimary && (s.proficiency >= 4 || rareSkills.includes(s.skillId)))
    .map(s => s.skillName);

  // 5. Workload gap calculation
  // Base daily working hours = 7.5
  const durationFactor = scenario.disruptionType === 'Resignation' ? 60 : scenario.durationDays;
  const workloadGapHours = Math.round(durationFactor * 7.5 * (employee.workloadUtilization / 100));

  // 6. Project delivery delay calculation
  // Formula: Stalled P0 tasks * duration weight * single-point-of-failure multiplier
  let delayMultiplier = 1.0;
  if (employee.isSinglePointOfFailure) delayMultiplier = 1.3;
  if (scenario.disruptionType === 'Resignation') delayMultiplier = 2.0;

  const baseDelayDays = Math.round((scenario.durationDays * 0.8 + (affectedTasks.length * 2.2)) * (delayMultiplier / 1.1));
  const projectedDeliveryDelayDays = Math.min(baseDelayDays, 45);

  // 7. Transition effort needed (in hours)
  const transitionEffortHours = Math.min(
    Math.round(affectedTasks.length * 3.5 + affectedProcesses.length * 4.0),
    40
  );

  // 8. Overall Impact Score (0 - 100)
  let rawScore = (affectedTasks.length * 12) + (affectedProcesses.length * 15) + (criticalSkillsUnavailable.length * 10);
  if (employee.isSinglePointOfFailure) rawScore += 25;
  if (employee.workloadUtilization > 90) rawScore += 10;
  const impactScore = Math.min(Math.max(rawScore, 35), 96);

  const financialOrSlaRiskLevel = impactScore > 75 ? 'critical' : (impactScore > 50 ? 'high' : 'medium');

  const impactSummary = `${employee.name} holds primary responsibility for ${affectedTasks.length} in-flight tasks and ${affectedProcesses.length} critical operational processes across ${allAffectedProjectIds.length} enterprise projects. A ${scenario.durationDays}-day disruption without an approved continuity handover will introduce a ${workloadGapHours}-hour capacity deficit, resulting in an estimated ${projectedDeliveryDelayDays}-day milestone slip for Project Apollo and exposing SLA tier-1 commitments to high financial penalties.`;

  return {
    scenario,
    impactScore,
    affectedProjectIds: allAffectedProjectIds,
    affectedTaskIds,
    affectedProcessIds,
    criticalSkillsUnavailable,
    workloadGapHours,
    projectedDeliveryDelayDays,
    transitionEffortHours,
    financialOrSlaRiskLevel,
    impactSummary,
  };
}
