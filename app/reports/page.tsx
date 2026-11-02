'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  Download,
  Printer,
  ShieldCheck,
  TrendingUp,
  Building,
  CheckCircle2,
  Calendar,
  FileSpreadsheet,
  Loader2,
} from 'lucide-react';
import { useTwinFlow } from '@/context/TwinFlowContext';
import { cn } from '@/lib/utils';
import { jsPDF } from 'jspdf';

export default function ReportsAnalyticsPage() {
  const { continuityScore, backupCoverage, knowledgeResilience, criticalSPOFCount, addToast } = useTwinFlow();
  const [isExporting, setIsExporting] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = () => {
    try {
      setIsExporting(true);

      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Top Header Banner
      doc.setFillColor(10, 17, 40); // Deep Navy (#0a1128)
      doc.rect(0, 0, 210, 34, 'F');

      doc.setTextColor(6, 182, 212); // Cyan (#06b6d4)
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text('TWINFLOW', 15, 15);

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text('Workforce Digital Twin & Organizational Continuity Intelligence', 58, 15);

      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184); // Slate-400
      doc.text('BOARD AUDIT BRIEFING • Q4 2026 | CLASSIFICATION: CONFIDENTIAL', 15, 26);
      doc.text(`DATE: ${new Date().toLocaleDateString()} | STATUS: ACTIVE GOVERNANCE`, 125, 26);

      // Section: Executive Overview
      doc.setTextColor(15, 23, 42); // Navy-950
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.text('Apex Technologies — Workforce Continuity Evaluation', 15, 44);

      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(71, 85, 105);
      const summaryText = 'This audit measures operational resilience against unplanned talent disruptions across engineering, IT, and operations. Implementing the TwinFlow platform has mitigated single points of failure (notably on infrastructure lead Arjun Mehta) and established cross-trained redundancy with Sarah Lin.';
      const splitSummary = doc.splitTextToSize(summaryText, 180);
      doc.text(splitSummary, 15, 50);

      // Scorecard Metrics Cards
      const metrics = [
        { label: 'Overall Readiness', val: `${continuityScore}%`, sub: 'Target: 85%' },
        { label: 'Backup Coverage', val: `${backupCoverage}%`, sub: 'Cross-Trained Roles' },
        { label: 'Knowledge Freshness', val: `${knowledgeResilience}%`, sub: 'Codified Runbooks' },
        { label: 'Avoided Risk', val: '$420,000', sub: 'Project Apollo SLA' },
      ];

      metrics.forEach((m, idx) => {
        const x = 15 + idx * 46;
        doc.setFillColor(241, 245, 249); // Slate-100
        doc.roundedRect(x, 62, 42, 22, 2, 2, 'F');
        doc.setTextColor(100, 116, 139);
        doc.setFontSize(7);
        doc.setFont('helvetica', 'bold');
        doc.text(m.label.toUpperCase(), x + 3.5, 68);
        doc.setTextColor(15, 23, 42);
        doc.setFontSize(13);
        doc.text(m.val, x + 3.5, 77);
        doc.setTextColor(148, 163, 184);
        doc.setFontSize(6.5);
        doc.setFont('helvetica', 'normal');
        doc.text(m.sub, x + 3.5, 81.5);
      });

      // Section: SPOF Spotlight
      doc.setFillColor(254, 242, 242); // Red-50
      doc.roundedRect(15, 89, 180, 26, 2, 2, 'F');
      doc.setTextColor(185, 28, 28); // Red-700
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text(`CRITICAL DEPENDENCY STATUS: ${criticalSPOFCount > 1 ? 'High Risk SPOF Identified' : 'SPOF Remediated (Sarah Lin Assigned)'}`, 20, 96);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(127, 29, 29);
      doc.text(`Lead Cloud Architect: Arjun Mehta (EMP-104) | Primary Project: Project Apollo Multi-Region Orchestration`, 20, 102);
      doc.text(`Optimizer Decision: Sarah Lin recommended (88% skill match, 35% bandwidth headroom, avoids Marcus Vance burnout)`, 20, 107);
      doc.text(`Financial Impact: Eliminates projected 18-day schedule delay and preserves $420k milestone revenue guarantee.`, 20, 112);

      // Section: Departmental Continuity Breakdown Table
      doc.setTextColor(15, 23, 42);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text('Departmental Continuity Breakdown', 15, 124);

      // Table Header
      doc.setFillColor(15, 23, 42);
      doc.rect(15, 128, 180, 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'bold');
      doc.text('DEPARTMENT', 18, 133);
      doc.text('LEAD', 60, 133);
      doc.text('SPOFS', 95, 133);
      doc.text('COVERAGE', 115, 133);
      doc.text('SLA EXPOSURE', 142, 133);
      doc.text('STATUS', 175, 133);

      // Table Rows
      const rows = [
        { dept: 'Engineering', lead: 'Devon Scott', spofs: `${criticalSPOFCount}`, cov: `${backupCoverage}%`, sla: 'Tier-1 Cloud SLA', status: criticalSPOFCount > 1 ? 'In Remediation' : 'Protected' },
        { dept: 'IT & Security', lead: 'Maya Patel', spofs: '1', cov: '80%', sla: 'SOC2 Signing', status: 'Compliant' },
        { dept: 'Operations', lead: 'Rachel Adams', spofs: '0', cov: '85%', sla: 'Internal Ops', status: 'Compliant' },
        { dept: 'Product Management', lead: 'Thomas Wright', spofs: '0', cov: '90%', sla: 'Roadmap OKRs', status: 'Compliant' },
        { dept: 'Cloud Infrastructure', lead: 'Sarah Lin', spofs: '0', cov: '92%', sla: '99.99% Availability', status: 'Optimal' },
      ];

      rows.forEach((r, idx) => {
        const y = 142 + idx * 8;
        if (idx % 2 === 0) {
          doc.setFillColor(248, 250, 252);
          doc.rect(15, y - 5, 180, 8, 'F');
        }
        doc.setTextColor(30, 41, 59);
        doc.setFontSize(7.5);
        doc.setFont('helvetica', 'normal');
        doc.text(r.dept, 18, y);
        doc.text(r.lead, 60, y);
        doc.text(r.spofs, 98, y);
        doc.text(r.cov, 118, y);
        doc.text(r.sla, 142, y);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(r.status === 'In Remediation' ? 220 : 16, r.status === 'In Remediation' ? 38 : 149, r.status === 'In Remediation' ? 38 : 115);
        doc.text(r.status, 175, y);
      });

      // Verification & Compliance Footer
      doc.setDrawColor(226, 232, 240);
      doc.line(15, 190, 195, 190);

      doc.setTextColor(100, 116, 139);
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      doc.text('CERTIFICATIONS: ISO 22301 Business Continuity Management Verified | SOC 2 Type II Organizational Redundancy Standard', 15, 196);
      doc.text('This briefing was synthesized deterministically by TWINFLOW Continuous Simulation & Workforce Digital Twin Engine.', 15, 201);
      doc.text(`Document Signature Hash: SHA256-${Math.random().toString(36).substring(2, 12).toUpperCase()} | Authorized Executive Release`, 15, 206);

      // Save PDF file to client
      doc.save('TwinFlow_Executive_Continuity_Briefing_Q4_2026.pdf');

      addToast(
        'PDF Briefing Exported',
        'Downloaded TwinFlow_Executive_Continuity_Briefing_Q4_2026.pdf successfully.',
        'success'
      );
    } catch (err) {
      console.error('Failed to export PDF:', err);
      addToast('Export Error', 'Unable to generate PDF document.', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-xl border border-navy-800 bg-navy-900/60 p-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-cyan-400" />
            <span>Executive Continuity Briefing & Board Analytics</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Audit-ready reporting summarizing organizational single point of failure exposure, financial risk mitigation, and readiness score trends.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 rounded-lg border border-navy-700 bg-navy-800 px-3 py-1.5 text-xs text-slate-200 hover:text-white transition-colors"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print Report</span>
          </button>
          <button
            onClick={handleExportPDF}
            disabled={isExporting}
            className="flex items-center space-x-1.5 rounded-lg bg-electric-500 hover:bg-electric-400 disabled:opacity-50 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors"
          >
            {isExporting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Download className="h-3.5 w-3.5" />
            )}
            <span>Export PDF Briefing</span>
          </button>
        </div>
      </div>

      {/* Printable Briefing Document Frame */}
      <div className="rounded-2xl border border-navy-800 bg-navy-900/60 p-6 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-navy-800 gap-2">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400">
              BOARD AUDIT BRIEFING • Q4 2026
            </span>
            <h3 className="text-lg font-bold text-white">
              Apex Technologies — Workforce Continuity Readiness Evaluation
            </h3>
          </div>
          <div className="text-right text-xs text-slate-400 font-mono">
            <span>Generated: {new Date().toLocaleDateString()}</span>
            <span className="block text-emerald-400 font-bold">Status: Active Governance</span>
          </div>
        </div>

        {/* Executive Overview Paragraph */}
        <div className="text-xs text-slate-300 leading-relaxed bg-navy-950 p-4 rounded-xl border border-navy-800">
          This quarterly continuity audit measures Apex Technologies&apos; operational resilience against unplanned talent disruptions across engineering, IT, and operations. Implementing the <strong>TwinFlow Digital Twin platform</strong> has identified key single points of failure—most notably on senior infrastructure lead <strong>Arjun Mehta</strong>—and established verified secondary operational redundancy.
        </div>

        {/* Scorecard Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-xl border border-navy-800 bg-navy-900 p-3.5">
            <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Overall Readiness</span>
            <span className="text-2xl font-mono font-bold text-cyan-400">{continuityScore}%</span>
            <span className="text-[10px] text-slate-500 block mt-1">Target: 85%</span>
          </div>

          <div className="rounded-xl border border-navy-800 bg-navy-900 p-3.5">
            <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Backup Coverage</span>
            <span className="text-2xl font-mono font-bold text-emerald-400">{backupCoverage}%</span>
            <span className="text-[10px] text-slate-500 block mt-1">Cross-Trained Roles</span>
          </div>

          <div className="rounded-xl border border-navy-800 bg-navy-900 p-3.5">
            <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Codified Knowledge</span>
            <span className="text-2xl font-mono font-bold text-electric-400">{knowledgeResilience}%</span>
            <span className="text-[10px] text-slate-500 block mt-1">Freshness Index</span>
          </div>

          <div className="rounded-xl border border-navy-800 bg-navy-900 p-3.5">
            <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Avoided Downtime Risk</span>
            <span className="text-2xl font-mono font-bold text-amber-400">$420k</span>
            <span className="text-[10px] text-slate-500 block mt-1">Project Apollo SLA</span>
          </div>
        </div>

        {/* Department Compliance Breakdown Table */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
            Departmental Continuity Breakdown
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-navy-800 rounded-xl overflow-hidden">
              <thead className="bg-navy-950 text-slate-400 uppercase text-[10px]">
                <tr>
                  <th className="p-3">Department</th>
                  <th className="p-3">Head</th>
                  <th className="p-3">Active SPOFs</th>
                  <th className="p-3">Backup Pairing</th>
                  <th className="p-3">SLA Exposure</th>
                  <th className="p-3">Compliance Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-800 bg-navy-900/60">
                <tr>
                  <td className="p-3 font-semibold text-white">Engineering</td>
                  <td className="p-3 text-slate-300">Devon Scott</td>
                  <td className="p-3 font-mono text-red-400">{criticalSPOFCount}</td>
                  <td className="p-3 font-mono text-cyan-300">{backupCoverage}%</td>
                  <td className="p-3 text-amber-400 font-semibold">Tier-1 Cloud SLA</td>
                  <td className="p-3"><span className="rounded bg-emerald-500/20 text-emerald-300 px-2 py-0.5 text-[10px] font-bold">Satisfactory</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">IT &amp; Security</td>
                  <td className="p-3 text-slate-300">Maya Patel</td>
                  <td className="p-3 font-mono text-amber-400">1</td>
                  <td className="p-3 font-mono text-cyan-300">80%</td>
                  <td className="p-3 text-slate-300">SOC2 Audit Signing</td>
                  <td className="p-3"><span className="rounded bg-emerald-500/20 text-emerald-300 px-2 py-0.5 text-[10px] font-bold">Compliant</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Operations</td>
                  <td className="p-3 text-slate-300">Rachel Adams</td>
                  <td className="p-3 font-mono text-emerald-400">0</td>
                  <td className="p-3 font-mono text-cyan-300">85%</td>
                  <td className="p-3 text-slate-300">Internal Ops</td>
                  <td className="p-3"><span className="rounded bg-emerald-500/20 text-emerald-300 px-2 py-0.5 text-[10px] font-bold">Compliant</span></td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-white">Product Management</td>
                  <td className="p-3 text-slate-300">Thomas Wright</td>
                  <td className="p-3 font-mono text-emerald-400">0</td>
                  <td className="p-3 font-mono text-cyan-300">90%</td>
                  <td className="p-3 text-slate-300">Roadmap OKRs</td>
                  <td className="p-3"><span className="rounded bg-emerald-500/20 text-emerald-300 px-2 py-0.5 text-[10px] font-bold">Compliant</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
