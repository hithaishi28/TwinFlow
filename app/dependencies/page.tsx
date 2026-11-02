'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Radar,
  Users2,
  Zap,
  CheckSquare,
  Briefcase,
  Workflow,
  AlertTriangle,
  ArrowRight,
  Filter,
  Flame,
  Info,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Sparkles,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { buildDependencyGraph, GraphNode, GraphEdge } from '@/lib/graphEngine';
import { useTwinFlow } from '@/context/TwinFlowContext';
import { cn } from '@/lib/utils';

export default function DependencyRadarPage() {
  const router = useRouter();
  const { setGuidedStep } = useTwinFlow();
  const graphData = useMemo(() => buildDependencyGraph(), []);

  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(() => {
    // Default selected node: Arjun Mehta (EMP-104)
    return graphData.nodes.find(n => n.id === 'EMP-104') || graphData.nodes[0];
  });

  const [activeFilter, setActiveFilter] = useState<'all' | 'employee' | 'skill' | 'task' | 'project' | 'process'>('all');
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Pre-calculate fixed 2D layout positions for a stunning aesthetic enterprise visual
  const positionedNodes = useMemo(() => {
    const width = 800;
    const height = 540;
    const centerX = width / 2;
    const centerY = height / 2;

    return graphData.nodes.map((node, i) => {
      let x = centerX;
      let y = centerY;

      if (node.id === 'EMP-104') {
        // Arjun Mehta at center-left focal point
        x = centerX - 120;
        y = centerY - 30;
      } else if (node.id === 'EMP-108') {
        // Sarah Lin
        x = centerX - 140;
        y = centerY + 130;
      } else if (node.id === 'EMP-102') {
        // Marcus Vance
        x = centerX - 260;
        y = centerY - 140;
      } else if (node.id === 'EMP-115') {
        // Elena Rostova
        x = centerX - 290;
        y = centerY + 70;
      } else if (node.id === 'PRJ-01') {
        // Project Apollo
        x = centerX + 180;
        y = centerY - 120;
      } else if (node.id === 'PRJ-02') {
        // Core Banking
        x = centerX + 200;
        y = centerY + 90;
      } else if (node.id === 'TSK-101') {
        // Multi-Region Failover
        x = centerX + 40;
        y = centerY - 140;
      } else if (node.id === 'TSK-102') {
        // Terraform State Lock
        x = centerX + 50;
        y = centerY - 40;
      } else if (node.id === 'TSK-103') {
        // eBPF
        x = centerX + 30;
        y = centerY + 60;
      } else if (node.id === 'PRC-01') {
        // SRE On-call
        x = centerX - 30;
        y = centerY + 180;
      } else if (node.id === 'PRC-02') {
        // Disaster Recovery
        x = centerX + 80;
        y = centerY + 160;
      } else if (node.type === 'skill') {
        const skillIdx = graphData.nodes.filter(n => n.type === 'skill').indexOf(node);
        const angle = (skillIdx * 35) * (Math.PI / 180);
        x = centerX - 80 + Math.cos(angle) * 320;
        y = centerY + Math.sin(angle) * 220;
      } else {
        const angle = (i * 28) * (Math.PI / 180);
        const radius = 220 + (i % 3) * 60;
        x = centerX + Math.cos(angle) * radius;
        y = centerY + Math.sin(angle) * radius;
      }

      return {
        ...node,
        x: Math.max(60, Math.min(width - 60, x)),
        y: Math.max(60, Math.min(height - 60, y)),
      };
    });
  }, [graphData]);

  // Filtered nodes
  const visibleNodes = useMemo(() => {
    if (activeFilter === 'all') return positionedNodes;
    return positionedNodes.filter(n => n.type === activeFilter);
  }, [positionedNodes, activeFilter]);

  const visibleNodeIds = useMemo(() => new Set(visibleNodes.map(n => n.id)), [visibleNodes]);

  const visibleEdges = useMemo(() => {
    return graphData.edges.filter(
      e => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target)
    );
  }, [graphData.edges, visibleNodeIds]);

  // Connected edges for selected node
  const selectedNodeConnected = useMemo(() => {
    if (!selectedNode) return { incoming: [], outgoing: [] };
    const outgoing = graphData.edges.filter(e => e.source === selectedNode.id);
    const incoming = graphData.edges.filter(e => e.target === selectedNode.id);
    return { incoming, outgoing };
  }, [selectedNode, graphData.edges]);

  const getNodeColor = (node: GraphNode) => {
    if (node.isSPOF || node.riskLevel === 'critical') return '#EF4444';
    if (node.riskLevel === 'high') return '#F97316';
    if (node.type === 'employee') return '#0284C7';
    if (node.type === 'project') return '#10B981';
    if (node.type === 'task') return '#F59E0B';
    if (node.type === 'skill') return '#06B6D4';
    return '#8B5CF6';
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'employee': return Users2;
      case 'skill': return Zap;
      case 'task': return CheckSquare;
      case 'project': return Briefcase;
      case 'process': return Workflow;
      default: return Radar;
    }
  };

  const handleLaunchSimulator = (employeeId: string) => {
    setGuidedStep(3);
    router.push('/simulator');
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-xl border border-navy-800 bg-navy-900/60 p-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center space-x-2">
            <Radar className="h-5 w-5 text-cyan-400" />
            <span>Organizational Dependency Radar & Single Point of Failure (SPOF) Detector</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time graph model mapping the critical paths between human capital, technical skills, tasks, and business operations.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto">
          {(['all', 'employee', 'project', 'task', 'process', 'skill'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                'rounded-lg px-2.5 py-1 text-xs font-semibold capitalize transition-colors',
                activeFilter === filter
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'bg-navy-800 text-slate-400 hover:text-slate-200'
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Main Workspace: Graph Canvas + Inspection Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Graph Visualizer (2 Cols) */}
        <div className="lg:col-span-2 relative rounded-2xl border border-navy-800 bg-navy-950 p-3 overflow-hidden shadow-2xl min-h-[560px] flex flex-col justify-between">
          {/* Canvas Background Grid */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#0284c7 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Graph Legend & Zoom Controls */}
          <div className="relative z-10 flex items-center justify-between px-3 py-2 text-xs">
            <div className="flex items-center space-x-3 text-[11px] text-slate-400">
              <span className="flex items-center space-x-1">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-red-400 font-semibold">Critical SPOF</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="h-2 w-2 rounded-full bg-electric-400" />
                <span>Employee</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>Project</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="h-2 w-2 rounded-full bg-amber-400" />
                <span>Task</span>
              </span>
              <span className="flex items-center space-x-1">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                <span>Skill</span>
              </span>
            </div>

            <div className="flex items-center space-x-1 bg-navy-900 border border-navy-800 rounded-lg p-0.5">
              <button
                onClick={() => setZoomLevel(Math.max(0.75, zoomLevel - 0.1))}
                className="p-1 text-slate-400 hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>
              <span className="text-[10px] font-mono px-1 text-slate-400">{Math.round(zoomLevel * 100)}%</span>
              <button
                onClick={() => setZoomLevel(Math.min(1.4, zoomLevel + 0.1))}
                className="p-1 text-slate-400 hover:text-white"
                title="Zoom In"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* SVG Dependency Graph */}
          <div className="relative flex-1 w-full overflow-hidden flex items-center justify-center">
            <svg
              viewBox="0 0 800 540"
              shapeRendering="geometricPrecision"
              textRendering="geometricPrecision"
              className="w-full h-full max-h-[500px] select-none"
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center', transition: 'transform 0.2s ease-out' }}
            >
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="7"
                  markerHeight="5"
                  refX="18"
                  refY="2.5"
                  orient="auto"
                >
                  <polygon points="0 0, 7 2.5, 0 5" fill="#1e3060" />
                </marker>
                <marker
                  id="arrowhead-active"
                  markerWidth="7"
                  markerHeight="5"
                  refX="18"
                  refY="2.5"
                  orient="auto"
                >
                  <polygon points="0 0, 7 2.5, 0 5" fill="#06b6d4" />
                </marker>
              </defs>

              {/* Render Edges */}
              {visibleEdges.map((edge) => {
                const sourceNode = positionedNodes.find(n => n.id === edge.source);
                const targetNode = positionedNodes.find(n => n.id === edge.target);
                if (!sourceNode || !targetNode) return null;

                const isConnectedToSelected = selectedNode && (edge.source === selectedNode.id || edge.target === selectedNode.id);

                return (
                  <line
                    key={edge.id}
                    x1={sourceNode.x}
                    y1={sourceNode.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke={isConnectedToSelected ? '#06b6d4' : '#1e3060'}
                    strokeWidth={isConnectedToSelected ? 2 : 1}
                    strokeDasharray={edge.type === 'backup_for' ? '4 3' : undefined}
                    opacity={isConnectedToSelected ? 0.9 : 0.4}
                    markerEnd={isConnectedToSelected ? 'url(#arrowhead-active)' : 'url(#arrowhead)'}
                  />
                );
              })}

              {/* Render Nodes */}
              {visibleNodes.map((node) => {
                const isSelected = selectedNode?.id === node.id;
                const nodeColor = getNodeColor(node);

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    onClick={() => setSelectedNode(node)}
                    className="cursor-pointer group"
                  >
                    {/* Selected Node Glowing Halo Rings (Native SVG, Zero Flickering) */}
                    {isSelected && (
                      <>
                        <circle
                          r={node.id === 'EMP-104' || node.type === 'project' ? 24 : 19}
                          fill="none"
                          stroke="#06b6d4"
                          strokeWidth={2}
                          opacity={0.8}
                        />
                        <circle
                          r={node.id === 'EMP-104' || node.type === 'project' ? 28 : 23}
                          fill="none"
                          stroke="#06b6d4"
                          strokeWidth={1}
                          opacity={0.35}
                        />
                      </>
                    )}

                    {/* SPOF Warning Ring */}
                    {node.isSPOF && (
                      <circle
                        r={22}
                        fill="none"
                        stroke="#EF4444"
                        strokeWidth={1.5}
                        strokeDasharray="4 2"
                        opacity={0.75}
                      />
                    )}

                    {/* Node Circle */}
                    <circle
                      r={node.id === 'EMP-104' || node.type === 'project' ? 18 : 14}
                      fill="#0a1128"
                      stroke={isSelected ? '#38BDF8' : nodeColor}
                      strokeWidth={isSelected ? 3 : (node.isSPOF ? 2.5 : 1.5)}
                      className="group-hover:stroke-cyan-300 transition-colors"
                    />

                    {/* Central Dot */}
                    <circle
                      r={node.id === 'EMP-104' ? 6 : 4}
                      fill={isSelected ? '#38BDF8' : nodeColor}
                    />

                    {/* Label Text */}
                    <text
                      y={node.id === 'EMP-104' || node.type === 'project' ? 28 : 22}
                      textAnchor="middle"
                      fill={isSelected ? '#38BDF8' : '#94A3B8'}
                      fontSize={node.id === 'EMP-104' ? 11 : 9}
                      fontWeight={isSelected ? 'bold' : 'normal'}
                      className="pointer-events-none select-none font-sans"
                    >
                      {node.name.length > 20 ? `${node.name.slice(0, 18)}…` : node.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="relative z-10 px-3 py-2 border-t border-navy-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Click any node to reveal downstream dependencies and calculate operational vulnerability.</span>
            <span className="font-mono text-cyan-400">Node ID: {selectedNode?.id || 'None'}</span>
          </div>
        </div>

        {/* Node Inspection Drawer / Panel (1 Col) */}
        {selectedNode && (
          <div className="rounded-2xl border border-navy-800 bg-navy-900/60 p-5 flex flex-col justify-between shadow-xl">
            <div>
              {/* Header Badge & Title */}
              <div className="flex items-start justify-between pb-3 border-b border-navy-800 mb-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="rounded bg-navy-800 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                      {selectedNode.type}
                    </span>
                    <span className={cn(
                      "rounded px-2 py-0.5 text-[10px] font-bold border",
                      selectedNode.isSPOF || selectedNode.riskLevel === 'critical'
                        ? "bg-red-500/20 text-red-300 border-red-500/40"
                        : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                    )}>
                      {selectedNode.isSPOF ? 'SPOF Detected' : 'Normal Node'}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-1.5">{selectedNode.name}</h3>
                  <p className="text-xs text-slate-400">
                    {selectedNode.details?.role || selectedNode.department || selectedNode.category || 'System Node'}
                  </p>
                </div>
              </div>

              {/* Specific SPOF Evidence if Arjun */}
              {selectedNode.id === 'EMP-104' && (
                <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs">
                  <div className="flex items-center space-x-1.5 font-bold text-red-300 mb-1.5">
                    <ShieldAlert className="h-4 w-4 text-red-400" />
                    <span>Single Point of Failure Analysis</span>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-slate-300">
                    <li className="flex items-start space-x-1.5">
                      <span className="text-red-400">•</span>
                      <span><strong>Sole Qualified Lead:</strong> Multi-Region Kubernetes cluster failover (Task TSK-101).</span>
                    </li>
                    <li className="flex items-start space-x-1.5">
                      <span className="text-red-400">•</span>
                      <span><strong>Skill Concentration:</strong> 100% of org knowledge in eBPF kernel tracing.</span>
                    </li>
                    <li className="flex items-start space-x-1.5">
                      <span className="text-red-400">•</span>
                      <span><strong>Backup Status:</strong> 0 verified primary backups designated for Tier-3 on-call.</span>
                    </li>
                    <li className="flex items-start space-x-1.5">
                      <span className="text-red-400">•</span>
                      <span><strong>Downstream Exposure:</strong> Direct failure risk for Project Apollo ($42M ARR impact).</span>
                    </li>
                  </ul>
                </div>
              )}

              {/* Connected Relationships Details */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Connected Dependencies ({selectedNodeConnected.outgoing.length + selectedNodeConnected.incoming.length})
                </h4>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {selectedNodeConnected.outgoing.map((edge) => {
                    const targetNode = graphData.nodes.find(n => n.id === edge.target);
                    if (!targetNode) return null;
                    return (
                      <div
                        key={edge.id}
                        onClick={() => setSelectedNode(targetNode)}
                        className="cursor-pointer flex items-center justify-between rounded-lg border border-navy-800 bg-navy-900 p-2 text-xs hover:border-cyan-500/30 transition-colors"
                      >
                        <div className="truncate mr-2">
                          <span className="text-slate-400 text-[10px] block">{edge.label} &rarr;</span>
                          <span className="text-slate-200 font-semibold truncate block">{targetNode.name}</span>
                        </div>
                        <ChevronRight className="h-3.5 w-3.5 text-slate-500 flex-shrink-0" />
                      </div>
                    );
                  })}
                  {selectedNodeConnected.incoming.map((edge) => {
                    const srcNode = graphData.nodes.find(n => n.id === edge.source);
                    if (!srcNode) return null;
                    return (
                      <div
                        key={edge.id}
                        onClick={() => setSelectedNode(srcNode)}
                        className="cursor-pointer flex items-center justify-between rounded-lg border border-navy-800 bg-navy-900 p-2 text-xs hover:border-cyan-500/30 transition-colors"
                      >
                        <div className="truncate mr-2">
                          <span className="text-slate-400 text-[10px] block">&larr; {edge.label}</span>
                          <span className="text-slate-200 font-semibold truncate block">{srcNode.name}</span>
                        </div>
                        <ChevronRight className="h-3.5 w-3.5 text-slate-500 flex-shrink-0" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-navy-800 space-y-2 mt-4">
              {selectedNode.type === 'employee' ? (
                <>
                  <button
                    onClick={() => handleLaunchSimulator(selectedNode.id)}
                    className="flex items-center justify-center space-x-2 w-full rounded-lg bg-gradient-to-r from-red-500 to-orange-500 px-3 py-2 text-xs font-bold text-white shadow-lg hover:opacity-95 transition-opacity"
                  >
                    <Flame className="h-3.5 w-3.5" />
                    <span>Simulate {selectedNode.name.split(' ')[0]} Absence</span>
                  </button>

                  <button
                    onClick={() => {
                      setGuidedStep(4);
                      router.push('/optimizer');
                    }}
                    className="flex items-center justify-center space-x-2 w-full rounded-lg border border-navy-700 bg-navy-800 hover:bg-navy-750 px-3 py-2 text-xs font-semibold text-cyan-300 transition-colors"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Run Continuity Optimizer</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => router.push('/workforce')}
                  className="flex items-center justify-center space-x-2 w-full rounded-lg bg-navy-800 hover:bg-navy-750 px-3 py-2 text-xs font-semibold text-slate-200 transition-colors"
                >
                  <span>Explore Workforce Twin</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
