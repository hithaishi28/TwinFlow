import { APEX_EMPLOYEES, APEX_PROJECTS, APEX_TASKS, APEX_PROCESSES, APEX_SKILLS } from '@/data/apexDataset';

export interface GraphNode {
  id: string;
  name: string;
  type: 'employee' | 'skill' | 'task' | 'project' | 'process';
  riskLevel: 'critical' | 'high' | 'medium' | 'low';
  category?: string;
  workload?: number;
  isSPOF?: boolean;
  department?: string;
  details?: Record<string, any>;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  type: 'owns' | 'requires_skill' | 'belongs_to' | 'supports' | 'backup_for';
  criticality: 'critical' | 'high' | 'medium' | 'low';
}

export interface DependencyGraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export function buildDependencyGraph(): DependencyGraphData {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];

  // 1. Employees
  APEX_EMPLOYEES.forEach((emp, index) => {
    nodes.push({
      id: emp.id,
      name: emp.name,
      type: 'employee',
      riskLevel: emp.isSinglePointOfFailure ? 'critical' : (emp.workloadUtilization > 85 ? 'high' : 'low'),
      isSPOF: emp.isSinglePointOfFailure,
      workload: emp.workloadUtilization,
      department: emp.department,
      details: {
        role: emp.role,
        seniority: emp.seniority,
        experienceYears: emp.experienceYears,
        email: emp.email,
        spofReasons: emp.spofReasons || [],
      },
    });
  });

  // 2. Skills
  APEX_SKILLS.forEach((skill) => {
    nodes.push({
      id: skill.id,
      name: skill.name,
      type: 'skill',
      riskLevel: skill.rarityInOrg === 1 ? 'critical' : (skill.rarityInOrg <= 2 ? 'high' : 'low'),
      category: skill.category,
      details: {
        rarityInOrg: skill.rarityInOrg,
        category: skill.category,
      },
    });
  });

  // 3. Projects
  APEX_PROJECTS.forEach((proj) => {
    nodes.push({
      id: proj.id,
      name: proj.name,
      type: 'project',
      riskLevel: proj.status === 'Critical Disruption' ? 'critical' : (proj.status === 'At Risk' ? 'high' : 'low'),
      department: proj.department,
      details: {
        priority: proj.priority,
        status: proj.status,
        targetCompletion: proj.targetCompletion,
        revenueOrImpact: proj.revenueOrImpactDescription,
      },
    });
  });

  // 4. Tasks
  APEX_TASKS.forEach((task) => {
    nodes.push({
      id: task.id,
      name: task.name,
      type: 'task',
      riskLevel: task.criticality,
      isSPOF: task.isSinglePointOfFailure,
      details: {
        description: task.description,
        estimatedHours: task.estimatedEffortHours,
        status: task.status,
      },
    });
  });

  // 5. Processes
  APEX_PROCESSES.forEach((proc) => {
    nodes.push({
      id: proc.id,
      name: proc.name,
      type: 'process',
      riskLevel: proc.criticality,
      department: proc.department,
      details: {
        slaCommitment: proc.slaCommitment,
        documentationStatus: proc.documentationStatus,
        lastRunbookUpdate: proc.lastRunbookUpdate,
      },
    });
  });

  // Edges: Employee -> Skills
  APEX_EMPLOYEES.forEach((emp) => {
    emp.skills.forEach((s) => {
      edges.push({
        id: `e-${emp.id}-${s.skillId}`,
        source: emp.id,
        target: s.skillId,
        label: `Proficiency ${s.proficiency}/5`,
        type: 'owns',
        criticality: s.proficiency >= 4 ? 'high' : 'medium',
      });
    });

    // Employee -> Projects
    emp.projectAssignments.forEach((pId) => {
      edges.push({
        id: `e-${emp.id}-${pId}`,
        source: emp.id,
        target: pId,
        label: 'Assigned',
        type: 'supports',
        criticality: emp.isSinglePointOfFailure ? 'critical' : 'medium',
      });
    });
  });

  // Edges: Tasks -> Project & Tasks -> Owner
  APEX_TASKS.forEach((task) => {
    edges.push({
      id: `e-${task.ownerId}-${task.id}`,
      source: task.ownerId,
      target: task.id,
      label: 'Owns Task',
      type: 'owns',
      criticality: task.criticality,
    });

    edges.push({
      id: `e-${task.id}-${task.associatedProjectId}`,
      source: task.id,
      target: task.associatedProjectId,
      label: 'Delivers to',
      type: 'belongs_to',
      criticality: task.criticality,
    });

    // Task -> Required Skills
    task.requiredSkillIds.forEach((skillId) => {
      edges.push({
        id: `e-${task.id}-${skillId}`,
        source: task.id,
        target: skillId,
        label: 'Requires',
        type: 'requires_skill',
        criticality: 'high',
      });
    });
  });

  // Edges: Processes -> Owner
  APEX_PROCESSES.forEach((proc) => {
    edges.push({
      id: `e-${proc.ownerId}-${proc.id}`,
      source: proc.ownerId,
      target: proc.id,
      label: 'Process Owner',
      type: 'owns',
      criticality: proc.criticality,
    });
  });

  return { nodes, edges };
}
