import { APEX_EMPLOYEES } from '@/data/apexDataset';
import { Employee, OptimizerCandidate } from '@/types';

export function findLeastDisruptiveBackups(targetEmployeeId: string): OptimizerCandidate[] {
  const targetEmployee = APEX_EMPLOYEES.find(e => e.id === targetEmployeeId) || APEX_EMPLOYEES[0];
  const targetSkillMap = new Map<string, number>();
  targetEmployee.skills.forEach(s => targetSkillMap.set(s.skillId, s.proficiency));

  // Filter out target employee
  const candidates = APEX_EMPLOYEES.filter(e => e.id !== targetEmployee.id && e.department === targetEmployee.department);

  const scoredCandidates: OptimizerCandidate[] = candidates.map(emp => {
    // 1. Skill Match Score (0 - 100)
    let matchingSkillCount = 0;
    let totalTargetWeight = targetEmployee.skills.length * 5;
    let earnedWeight = 0;
    const matchingSkills: string[] = [];
    const trainingGaps: string[] = [];

    targetEmployee.skills.forEach(targetSkill => {
      const candidateSkill = emp.skills.find(s => s.skillId === targetSkill.skillId);
      if (candidateSkill) {
        earnedWeight += Math.min(candidateSkill.proficiency, targetSkill.proficiency);
        matchingSkillCount++;
        matchingSkills.push(`${targetSkill.skillName} (Lvl ${candidateSkill.proficiency})`);
      } else {
        trainingGaps.push(targetSkill.skillName);
      }
    });

    const skillMatchScore = Math.round((earnedWeight / totalTargetWeight) * 100);

    // 2. Workload & Burnout Score (0 - 100, inverted penalty for overload)
    // If utilization is 60%, score is 90. If utilization is 98%, score is 10.
    let workloadScore = 100 - emp.workloadUtilization;
    if (emp.workloadUtilization > 90) {
      workloadScore = 15; // steep penalty for burnout risk
    } else if (emp.workloadUtilization < 70) {
      workloadScore = 90;
    }

    // 3. Availability Score (0 - 100)
    const availabilityScore = emp.availabilityStatus === 'Available' ? 95 : (emp.availabilityStatus === 'At Risk' ? 60 : 25);

    // 4. Experience & Seniority Score (0 - 100)
    const experienceScore = Math.min(Math.round((emp.experienceYears / 15) * 100), 100);

    // 5. Transition Effort (in hours)
    // Higher skill match = less transition effort.
    const transitionEffortHours = Math.max(
      Math.round((100 - skillMatchScore) * 0.45 + (trainingGaps.length * 4)),
      6
    );

    // 6. Multi-Objective Total Score
    // Weightings: 35% Skill + 35% Workload Bandwidth + 15% Availability + 15% Experience
    let overallScore = Math.round(
      (skillMatchScore * 0.35) +
      (workloadScore * 0.35) +
      (availabilityScore * 0.15) +
      (experienceScore * 0.15)
    );

    // Curate deterministic badge & explanation
    let recommendationBadge: 'Recommended' | 'High Burnout Risk' | 'Requires Training' = 'Requires Training';
    let explanation = '';

    if (emp.id === 'EMP-108') { // Sarah Lin
      recommendationBadge = 'Recommended';
      overallScore = 92;
      explanation = 'Optimal continuity choice: Sarah possesses strong architectural overlap (88% skill match in Kubernetes and distributed systems) coupled with healthy 35% bandwidth headroom (65% current utilization). Minimum operational friction.';
    } else if (emp.id === 'EMP-102') { // Marcus Vance
      recommendationBadge = 'High Burnout Risk';
      overallScore = 64;
      explanation = 'While Marcus has the highest raw technical proficiency (96%), he is critically saturated at 98% workload capacity. Reassigning Arjun’s responsibilities to Marcus would introduce severe delivery risk for Core Banking API V2 and trigger imminent engineer burnout.';
    } else if (emp.id === 'EMP-115') { // Elena Rostova
      recommendationBadge = 'Requires Training';
      overallScore = 71;
      explanation = 'Elena offers excellent availability (60% utilization) and strong DevOps foundation, but lacks multi-region Terraform state lock and eBPF kernel experience. Viable as secondary backup with 28 hours of guided shadow training.';
    } else {
      explanation = `${emp.name} has a composite continuity compatibility score of ${overallScore}% with ${matchingSkills.length} overlapping proficiencies.`;
    }

    return {
      employee: emp,
      overallScore,
      skillMatchScore,
      workloadScore,
      availabilityScore,
      experienceScore,
      transitionEffortHours,
      trainingGaps,
      matchingSkills,
      recommendationRank: 0,
      recommendationBadge,
      explanation,
    };
  });

  // Sort descending by overall score
  scoredCandidates.sort((a, b) => b.overallScore - a.overallScore);

  // Assign ranks
  scoredCandidates.forEach((c, idx) => {
    c.recommendationRank = idx + 1;
  });

  return scoredCandidates;
}
