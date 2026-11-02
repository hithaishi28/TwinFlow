export type RiskLevel = 'critical' | 'high' | 'medium' | 'low';

export type Department = 
  | 'Engineering' 
  | 'Product' 
  | 'Operations' 
  | 'IT' 
  | 'Human Resources';

export interface Skill {
  id: string;
  name: string;
  category: 'Cloud Infrastructure' | 'Software Engineering' | 'Security & Compliance' | 'Product Management' | 'DevOps & SRE' | 'Data & ML';
  criticality: RiskLevel;
  proficiencyLevel?: number; // 1 to 5
  rarityInOrg: number; // number of employees who hold this skill
}

export interface EmployeeSkill {
  skillId: string;
  skillName: string;
  proficiency: number; // 1-5
  yearsOfExperience: number;
  isPrimary: boolean;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  avatar: string;
  department: Department;
  role: string;
  seniority: 'Lead' | 'Principal' | 'Senior' | 'Staff' | 'Mid' | 'Junior';
  skills: EmployeeSkill[];
  experienceYears: number;
  workloadUtilization: number; // percentage, e.g. 85 for 85%
  availabilityStatus: 'Available' | 'On Leave' | 'At Risk' | 'Overloaded';
  projectAssignments: string[]; // project IDs
  primaryResponsibilities: string[]; // task/process names
  backupEmployees: {
    primary?: string; // employee ID
    secondary?: string; // employee ID
  };
  isSinglePointOfFailure: boolean;
  spofReasons?: string[];
  location: string;
  hireDate: string;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  ownerId: string; // employee ID
  requiredSkillIds: string[];
  criticality: RiskLevel;
  estimatedEffortHours: number;
  associatedProjectId: string;
  isSinglePointOfFailure: boolean;
  backupEmployeeId?: string;
  status: 'In Progress' | 'Blocked' | 'At Risk' | 'Completed';
}

export interface Project {
  id: string;
  name: string;
  code: string;
  department: Department;
  priority: 'P0' | 'P1' | 'P2' | 'P3';
  status: 'On Track' | 'At Risk' | 'Delayed' | 'Critical Disruption';
  assignedEmployeeIds: string[];
  leadEmployeeId: string;
  criticalDependencies: string[];
  targetCompletion: string;
  revenueOrImpactDescription: string;
}

export interface BusinessProcess {
  id: string;
  name: string;
  department: Department;
  ownerId: string;
  supportingEmployeeIds: string[];
  requiredTaskIds: string[];
  criticality: RiskLevel;
  slaCommitment: string;
  documentationStatus: 'Verified' | 'Needs Review' | 'Outdated' | 'Missing';
  lastRunbookUpdate: string;
  verifiedBackupId?: string;
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  category: 'System Architecture' | 'On-Call Runbook' | 'Security & Keys' | 'API & Workflows' | 'Standard Operating Procedure';
  relatedEmployeeId: string;
  relatedProcessId?: string;
  lastUpdated: string;
  verificationStatus: 'Verified' | 'Needs Review' | 'Outdated' | 'Missing' | 'In Draft';
  coveragePercentage: number;
  contentSnippet: string;
  fileSize?: string;
}

export interface RiskAlert {
  id: string;
  title: string;
  category: 'SPOF Employee' | 'Skill Rarity' | 'Process Orphan' | 'Project Dependency' | 'Documentation Gap';
  severity: RiskLevel;
  department: Department;
  targetId: string;
  targetName: string;
  explanation: string;
  supportingEvidence: string[];
  recommendedAction: string;
  resolved: boolean;
}

export interface SimulationScenario {
  id: string;
  targetEmployeeId: string;
  targetEmployeeName: string;
  department: Department;
  disruptionType: 'Absence (14 Days)' | 'Resignation' | 'Long-Term Leave (60 Days)' | 'Internal Transfer' | 'Hiring Freeze';
  durationDays: number;
}

export interface SimulationResult {
  scenario: SimulationScenario;
  impactScore: number; // 0 - 100
  affectedProjectIds: string[];
  affectedTaskIds: string[];
  affectedProcessIds: string[];
  criticalSkillsUnavailable: string[];
  workloadGapHours: number;
  projectedDeliveryDelayDays: number;
  transitionEffortHours: number;
  financialOrSlaRiskLevel: RiskLevel;
  impactSummary: string;
}

export interface OptimizerCandidate {
  employee: Employee;
  overallScore: number; // 0 - 100
  skillMatchScore: number; // 0 - 100
  workloadScore: number; // 0 - 100 (higher = healthier availability)
  availabilityScore: number; // 0 - 100
  experienceScore: number; // 0 - 100
  transitionEffortHours: number;
  trainingGaps: string[];
  matchingSkills: string[];
  recommendationRank: number;
  recommendationBadge?: 'Recommended' | 'High Burnout Risk' | 'Requires Training';
  explanation: string;
}

export interface PlaybookAction {
  id: string;
  title: string;
  description: string;
  category: 'Backup Assignment' | 'Knowledge Transfer' | 'Cross-Training' | 'Workload Rebalance' | 'Process Documentation';
  responsibleOwner: string;
  assigneeId?: string;
  targetEmployeeId: string;
  priority: 'P0' | 'P1' | 'P2';
  dueDate: string;
  status: 'Pending Review' | 'Approved' | 'In Progress' | 'Completed' | 'Rejected';
  supportingEvidence: string;
  projectedScoreImpact: number; // e.g. +4 points
}

export interface ContinuityPlan {
  id: string;
  scenarioTitle: string;
  targetEmployeeId: string;
  selectedBackupId?: string;
  actions: PlaybookAction[];
  overallStatus: 'Draft' | 'Approved' | 'In Execution' | 'Completed';
  createdAt: string;
  approvedBy?: string;
}

export interface CopilotMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  content: string;
  evidenceSources?: {
    type: 'Employee' | 'Project' | 'Task' | 'Process' | 'Calculation';
    id: string;
    title: string;
    snippet: string;
  }[];
  confidenceScore?: number;
  uncertainties?: string[];
  isThinking?: boolean;
  modelUsed?: string;
}
