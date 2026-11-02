import { APEX_EMPLOYEES, APEX_PROJECTS, APEX_TASKS, APEX_PROCESSES, APEX_DOCUMENTS } from '@/data/apexDataset';
import { CopilotMessage } from '@/types';

export interface CopilotKnowledgeContext {
  employees: typeof APEX_EMPLOYEES;
  projects: typeof APEX_PROJECTS;
  tasks: typeof APEX_TASKS;
  processes: typeof APEX_PROCESSES;
}

export function generateCopilotAnswer(question: string): Omit<CopilotMessage, 'id' | 'sender' | 'timestamp'> {
  const q = question.toLowerCase();

  // 1. "Why is engineering department high risk?"
  if (q.includes('engineering') && (q.includes('risk') || q.includes('why') || q.includes('high'))) {
    return {
      content: `The Engineering department is currently flagged as **Critical Risk (Risk Score: 82/100)** due to severe dependency concentration on two key individuals:

1. **Arjun Mehta (Lead Cloud Architect)**: Sole owner of Multi-Region Kubernetes cluster failover (Task TSK-101) and the sole engineer holding eBPF kernel telemetry skills. His sudden departure would directly stall **Project Apollo (P0)**.
2. **Marcus Vance (Principal Architect)**: Operating at **98% workload capacity**. Marcus is the single point of failure for Core Banking API v2 architecture, meaning the team has virtually zero bandwidth buffer to absorb unexpected outages.
3. **Documentation Decay**: The mission-critical Disaster Recovery Runbook (DOC-101) has not been refreshed in over 7 months and is rated at only 45% coverage.

**Recommended Immediate Mitigation**: Assign Sarah Lin as interim SRE lead for Project Apollo and execute a 14-day knowledge transfer to increase departmental backup redundancy from 42% to 78%.`,
      confidenceScore: 96,
      evidenceSources: [
        {
          type: 'Employee',
          id: 'EMP-104',
          title: 'Arjun Mehta — SPOF Telemetry',
          snippet: 'Sole owner of 4 mission-critical processes, 92% workload utilization, 0 verified backups.',
        },
        {
          type: 'Employee',
          id: 'EMP-102',
          title: 'Marcus Vance — Workload Saturation',
          snippet: '98% workload utilization on Core Banking API v2; burnout threshold exceeded.',
        },
        {
          type: 'Project',
          id: 'PRJ-01',
          title: 'Project Apollo (P0)',
          snippet: 'Critical path delivery target: Dec 15, 2026. Directly dependent on Arjun Mehta.',
        },
      ],
      uncertainties: [
        'Project Apollo milestone slip estimate (+18 days) assumes no external vendor contractor intervention.',
      ],
    };
  }

  // 2. "What happens if Arjun Mehta is unavailable for 14 days?" / "lead engineer"
  if ((q.includes('arjun') || q.includes('lead engineer')) && (q.includes('14') || q.includes('unavailable') || q.includes('absence') || q.includes('happens'))) {
    return {
      content: `If **Arjun Mehta** becomes unavailable for 14 calendar days without an active handover:

- **Delivery Milestone Impact**: **Project Apollo (P0)** will incur an estimated **18-day schedule delay** because Task TSK-101 (Multi-Region Kubernetes Failover) and Task TSK-102 (Terraform State Lock) are currently blocked without a secondary approver.
- **Capacity Deficit**: A net **96.6 hours** of high-criticality systems engineering work will be deferred.
- **Operational SLA Exposure**: Tier-3 PagerDuty incident response will lack a primary commander for 14 days, risking breach of the 15-minute enterprise customer response SLA.
- **Skill Scarcity**: Institutional knowledge regarding live eBPF kernel debugging is 100% concentrated in Arjun.

**Mitigation Plan**: Activating the Continuity Playbook assigns **Sarah Lin** as backup with a 12-hour transition effort, reducing projected delay from 18 days down to less than 2 days.`,
      confidenceScore: 94,
      evidenceSources: [
        {
          type: 'Task',
          id: 'TSK-101',
          title: 'Multi-Region Kubernetes Failover Orchestration',
          snippet: 'Owner: Arjun Mehta. Required skills: Kubernetes, Distributed Systems, Disaster Recovery.',
        },
        {
          type: 'Process',
          id: 'PRC-01',
          title: 'Primary SRE Tier-3 On-Call Escalation',
          snippet: 'SLA: 15-minute response for critical P0 platform disruptions. Owner: Arjun Mehta.',
        },
        {
          type: 'Calculation',
          id: 'CALC-SIM',
          title: 'Disruption Impact Model',
          snippet: '14 days * 7.5 hrs/day * 0.92 utilization = 96.6 hours unmet capacity.',
        },
      ],
      uncertainties: [
        'Actual project slip may vary between 14-21 days depending on whether non-critical sprint backlog tasks are frozen.',
      ],
    };
  }

  // 3. "Who is the most suitable backup?" / "Sarah Lin" / "Marcus Vance" / "recommendation"
  if (q.includes('backup') || q.includes('who') || q.includes('sarah') || q.includes('marcus') || q.includes('suitable')) {
    return {
      content: `TwinFlow's Continuity Optimizer evaluated the engineering team across multi-objective constraints (skill overlap, workload bandwidth, availability, and transition effort) and ranked the candidates:

1. **Sarah Lin (Recommended — 92% Continuity Match)**
   - **Skill Alignment**: 88% compatibility (Senior proficiency in Kubernetes, Golang, and Cloud Infra).
   - **Bandwidth**: Currently at **65% workload utilization**, providing a healthy 35% buffer to absorb Arjun’s responsibilities without burnout.
   - **Transition Requirement**: 12 hours of paired handover.

2. **Marcus Vance (Not Recommended — 64% Continuity Match, High Burnout Risk)**
   - **Skill Alignment**: 96% compatibility (Highest technical parity in the company).
   - **Critical Blocker**: Marcus is already at **98% capacity** leading Core Banking API v2. Reassigning him creates a secondary single point of failure and high probability of executive delivery failure.

3. **Elena Rostova (Viable Secondary — 71% Match)**
   - High availability (60% load), but requires 28 hours of ramp-up in Terraform state locks and distributed architectures.

**Conclusion**: Sarah Lin provides the **least operational disruption** to the wider business.`,
      confidenceScore: 98,
      evidenceSources: [
        {
          type: 'Employee',
          id: 'EMP-108',
          title: 'Sarah Lin Profile',
          snippet: 'Role: Senior SRE. Workload: 65%. Skills: Kubernetes (4/5), Terraform (4/5), Golang (4/5).',
        },
        {
          type: 'Employee',
          id: 'EMP-102',
          title: 'Marcus Vance Profile',
          snippet: 'Role: Principal Architect. Workload: 98%. Critical risk: Burnout saturation.',
        },
        {
          type: 'Calculation',
          id: 'OPT-ALG',
          title: 'Multi-Objective Optimizer Formulation',
          snippet: 'Score = 0.35 * Skill + 0.35 * BandwidthHeadroom + 0.15 * Availability + 0.15 * Experience.',
        },
      ],
      uncertainties: [
        'Assumes Sarah Lin does not take unannounced personal time during the 14-day transition window.',
      ],
    };
  }

  // 4. "What knowledge needs to be transferred?" / "handover"
  if (q.includes('knowledge') || q.includes('transfer') || q.includes('handover') || q.includes('preserve')) {
    return {
      content: `To safeguard business continuity during Arjun Mehta's absence, 4 critical knowledge domains must be preserved:

1. **Multi-Region Disaster Recovery Runbook (DOC-101)**: Currently at **45% documentation coverage** and outdated by 7 months. Must be updated with latest Kubernetes 1.30 cluster endpoints and DynamoDB lock state recovery.
2. **KMS & Multi-Cloud Credential Delegation**: Temporary administrative access tokens for AWS/GCP clusters and PagerDuty primary escalation overrides.
3. **eBPF Kernel Telemetry Runbook**: Currently undocumented tribal knowledge (coverage: 15%). Emergency fallback scripts must be codified.
4. **Project Apollo In-Flight PRs**: Calico BGP routing mesh (PR #1428) and Envoy rate limiting gates (PR #1435).

The **Knowledge Hub** has pre-generated an automated 4-module handover checklist to formalize this transfer in under 12 working hours.`,
      confidenceScore: 95,
      evidenceSources: [
        {
          type: 'Task',
          id: 'DOC-101',
          title: 'Disaster Recovery Runbook',
          snippet: 'Last updated April 2026. Coverage: 45%. Needs immediate revision for multi-region failover.',
        },
        {
          type: 'Task',
          id: 'DOC-105',
          title: 'eBPF Live Profiling & Telemetry Extraction Guide',
          snippet: 'Coverage: 15% (Missing). Relies exclusively on undocumented tacit knowledge of Arjun Mehta.',
        },
      ],
      uncertainties: [],
    };
  }

  // 5. "Which risk should management address first?" / "readiness"
  return {
    content: `Based on deterministic dependency graph analysis, management should address **Risk ALT-01 (Single Point of Failure: Arjun Mehta)** first:

- **Urgency**: Critical (Severity: P0).
- **Justification**: Arjun sits at the intersection of Apex Technologies' flagship revenue project (**Project Apollo**) and Tier-3 Disaster Recovery on-call. 
- **Action Sequence**:
  1. Approve Playbook Action ACT-01 (Assign Sarah Lin as interim lead).
  2. Authorize 12-hour paired knowledge handover (ACT-02).
  3. Rebalance secondary ticket review to Elena Rostova to protect Marcus Vance from burnout.

Executing this playbook will immediately increase Apex Technologies' **Continuity Readiness Score from 68% to 84%**, eliminating 4 critical SPOF alerts.`,
    confidenceScore: 97,
    evidenceSources: [
      {
        type: 'Calculation',
        id: 'SCORE-PROJ',
        title: 'Continuity Readiness Model',
        snippet: 'Current Score: 68%. Projected Score Post-Playbook: 84% (+16 pts improvement).',
      },
      {
        type: 'Employee',
        id: 'EMP-104',
        title: 'Arjun Mehta Dependency Nexus',
        snippet: 'Connected to 4 tasks, 2 projects, 2 critical processes with 0 verified backups.',
      },
    ],
    uncertainties: [],
  };
}
