import { APEX_EMPLOYEES, APEX_PROJECTS, APEX_TASKS, APEX_PROCESSES } from '@/data/apexDataset';

export interface GeneratedHandoverDocument {
  id: string;
  title: string;
  generatedAt: string;
  targetEmployeeName: string;
  backupEmployeeName: string;
  duration: string;
  executiveSummary: string;
  sections: {
    heading: string;
    description: string;
    items: {
      id: string;
      title: string;
      priority: 'P0' | 'P1' | 'P2';
      status: 'Pending' | 'Completed';
      details: string;
      evidenceRef?: string;
    }[];
  }[];
}

export function generateHandoverPlan(
  targetEmployeeId: string = 'EMP-104',
  backupEmployeeId: string = 'EMP-108',
  durationDays: number = 14
): GeneratedHandoverDocument {
  const target = APEX_EMPLOYEES.find(e => e.id === targetEmployeeId) || APEX_EMPLOYEES[0];
  const backup = APEX_EMPLOYEES.find(e => e.id === backupEmployeeId) || APEX_EMPLOYEES[1];

  return {
    id: `HANDOVER-${target.id}-${backup.id}`,
    title: `Operational Continuity & Knowledge Handover Plan: ${target.name} ➔ ${backup.name}`,
    generatedAt: new Date().toISOString().split('T')[0],
    targetEmployeeName: target.name,
    backupEmployeeName: backup.name,
    duration: `${durationDays} Calendar Days`,
    executiveSummary: `This continuity handover document formalizes the temporary transfer of mission-critical systems engineering, cloud architecture governance, and incident commander authorities from ${target.name} (${target.role}) to ${backup.name} (${backup.role}) for a planned ${durationDays}-day absence period at Apex Technologies. Execution of these 4 modules guarantees zero disruption to Project Apollo and maintains compliance with Tier-1 enterprise SLAs.`,
    sections: [
      {
        heading: 'Module 1: Critical System Access & Secret Delegation',
        description: 'Temporary delegation of elevated administrative privileges, KMS key access, and incident bridge escalation rights.',
        items: [
          {
            id: 'ITM-01',
            title: 'Multi-Region Kubernetes Admin RBAC Delegation',
            priority: 'P0',
            status: 'Pending',
            details: 'Grant cluster-admin context to Sarah Lin for ap-northeast-1 and us-east-1 production clusters via Okta PAM temporary role assignment.',
            evidenceRef: 'Task #TSK-101',
          },
          {
            id: 'ITM-02',
            title: 'Terraform Cloud Enterprise Workspace Locking Rights',
            priority: 'P0',
            status: 'Pending',
            details: 'Transfer VCS workspace unlocking privileges and DynamoDB distributed state lock bypass tokens.',
            evidenceRef: 'Task #TSK-102',
          },
          {
            id: 'ITM-03',
            title: 'PagerDuty Tier-3 Primary Incident Commander Rotation Schedule',
            priority: 'P0',
            status: 'Pending',
            details: 'Override primary on-call schedule in PagerDuty for the 14-day duration to automatically route P0 alerts to Sarah Lin.',
            evidenceRef: 'Process #PRC-01',
          },
        ],
      },
      {
        heading: 'Module 2: In-Flight Deliverable Runbooks & Project Apollo Handoff',
        description: 'Detailed operational procedures for active tasks currently on the critical path of active project milestones.',
        items: [
          {
            id: 'ITM-04',
            title: 'Kubernetes Multi-Region Etcd Quorum Disaster Recovery Procedure',
            priority: 'P0',
            status: 'Pending',
            details: 'Step-by-step verification of cross-region Raft consensus health checks and automated snapshot restore automation.',
            evidenceRef: 'Runbook #DOC-101',
          },
          {
            id: 'ITM-05',
            title: 'Project Apollo Sprint 44 Pull Request Approvals & Release Gate',
            priority: 'P1',
            status: 'Pending',
            details: 'Review and merge PR #1428 (Calico BGP routing mesh) and PR #1435 (Envoy ingress gateway rate limiting).',
            evidenceRef: 'Project #PRJ-01',
          },
          {
            id: 'ITM-06',
            title: 'eBPF Telemetry Daemonset Failover Strategy',
            priority: 'P1',
            status: 'Pending',
            details: 'In event of kernel panic or memory spike, execute daemonset fallback script `/opt/sre/ebpf-fallback.sh`.',
            evidenceRef: 'Task #TSK-103',
          },
        ],
      },
      {
        heading: 'Module 3: Daily & Weekly Operating Cadence',
        description: 'Mandatory recurring meetings, architectural reviews, and stakeholder syncs requiring interim representation.',
        items: [
          {
            id: 'ITM-07',
            title: 'Technical Architecture Review Board (TARB) Representation',
            priority: 'P1',
            status: 'Pending',
            details: 'Represent Cloud Infrastructure team on Tuesdays at 10:00 AM PST alongside Marcus Vance.',
            evidenceRef: 'Employee #EMP-102',
          },
          {
            id: 'ITM-08',
            title: 'Weekly Core Banking Integration Sync with Product',
            priority: 'P2',
            status: 'Pending',
            details: 'Provide status updates to Priya Sharma (Staff PM) on cloud database latency benchmarks.',
            evidenceRef: 'Employee #EMP-106',
          },
        ],
      },
      {
        heading: 'Module 4: Shadow Sessions & Knowledge Transfer Curriculum',
        description: 'Structured 12-hour paired mentoring and live simulation runs prior to absence departure.',
        items: [
          {
            id: 'ITM-09',
            title: 'Simulated Production Region Failover Shadow Session (4 Hours)',
            priority: 'P0',
            status: 'Pending',
            details: 'Arjun and Sarah execute a simulated failover drill in the staging Kubernetes cluster environment.',
            evidenceRef: 'Process #PRC-02',
          },
          {
            id: 'ITM-10',
            title: 'Architecture Deep-Dive: DynamoDB State Lock Race Conditions (2 Hours)',
            priority: 'P1',
            status: 'Pending',
            details: 'Paired walkthrough of Terraform edge-case recovery tools and rollback scripts.',
            evidenceRef: 'Task #TSK-102',
          },
        ],
      },
    ],
  };
}
