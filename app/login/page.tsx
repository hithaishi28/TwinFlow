'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Radar,
  Lock,
  Mail,
  Building2,
  ShieldCheck,
  ArrowRight,
  UserCheck,
  Eye,
  EyeOff,
  Sparkles,
  Shield,
  Layers,
  KeyRound,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import { useTwinFlow } from '@/context/TwinFlowContext';
import { cn } from '@/lib/utils';

export default function LoginPage() {
  const router = useRouter();
  const { activeRole, setActiveRole, isAuthenticated, login, addToast } = useTwinFlow();

  const [email, setEmail] = useState('cro.alexander@apextechnologies.internal');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState(activeRole);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const demoCredentials = [
    {
      role: 'Chief Risk Officer',
      name: 'Alexander Ward',
      email: 'cro.alexander@apextechnologies.internal',
      icon: '🛡️',
      desc: 'Full enterprise oversight & board risk posture',
    },
    {
      role: 'VP of Engineering',
      name: 'Devon Scott',
      email: 'devon.scott@apextechnologies.internal',
      icon: '💻',
      desc: 'Technical dependencies & delivery protection',
    },
    {
      role: 'HR Continuity Lead',
      name: 'Amina Al-Mansoor',
      email: 'amina.almansoor@apextechnologies.internal',
      icon: '🤝',
      desc: 'Talent succession & knowledge retention',
    },
    {
      role: 'Operations Director',
      name: 'Rachel Adams',
      email: 'rachel.adams@apextechnologies.internal',
      icon: '⚡',
      desc: 'SLA commitments & tier-3 on-call health',
    },
  ];

  const handleQuickSelect = (cred: typeof demoCredentials[0]) => {
    setSelectedRole(cred.role);
    setEmail(cred.email);
    setPassword('Maverick2026!TwinFlow');
    addToast('Credentials Auto-Filled', `Selected perspective: ${cred.role} (${cred.name})`, 'info');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    login(selectedRole);

    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/');
    }, 300);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-2 sm:p-6 lg:p-10">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden border border-white/10 shadow-2xl glass-panel relative">
        {/* Ambient Glows */}
        <div className="absolute top-0 -left-20 w-96 h-96 bg-electric-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Left Side Hero Showcase (7 Cols) */}
        <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-navy-800/80 bg-gradient-to-br from-navy-950 via-navy-900/90 to-navy-950 relative overflow-hidden">
          {/* Subtle Graphic Accents */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }} />

          {/* Top Brand Header */}
          <div className="relative z-10 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-electric-500 to-cyan-400 text-white shadow-glow">
                <Radar className="h-6 w-6 text-white animate-pulse" />
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-white">TWIN<span className="text-cyan-400">FLOW</span></span>
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Enterprise Workforce Continuity Twin</p>
              </div>
            </div>

            <div className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              <span className="font-semibold">RNS Maverick Innovation Platform</span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-tight pt-2">
              See the workforce. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-electric-400 to-blue-400">
                Understand the dependencies.
              </span> <br />
              Protect the business.
            </h1>

            <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
              AI-powered organizational decision intelligence that predicts operational disruption, matches optimal internal backups without burnout, and preserves critical institutional memory before absences occur.
            </p>
          </div>

          {/* Live Telemetry Showcase Badges */}
          <div className="grid grid-cols-3 gap-3 my-8 relative z-10">
            <div className="rounded-2xl border border-white/5 bg-navy-900/60 p-3.5 backdrop-blur-md">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Value Protected</span>
              <span className="text-lg font-bold font-mono text-emerald-400">$42M ARR</span>
              <span className="text-[10px] text-slate-500 block">Project Apollo Delivery</span>
            </div>

            <div className="rounded-2xl border border-white/5 bg-navy-900/60 p-3.5 backdrop-blur-md">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">SPOF Analytics</span>
              <span className="text-lg font-bold font-mono text-cyan-400">11 Nodes</span>
              <span className="text-[10px] text-slate-500 block">Multi-Node Graph</span>
            </div>

            <div className="rounded-2xl border border-white/5 bg-navy-900/60 p-3.5 backdrop-blur-md">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">AI Engine</span>
              <span className="text-lg font-bold font-mono text-electric-400">Groq LPU</span>
              <span className="text-[10px] text-slate-500 block">openai/gpt-oss-120b</span>
            </div>
          </div>

          {/* Enterprise Certifications Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-navy-800/80 text-[11px] text-slate-400 relative z-10">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="h-4 w-4 text-cyan-400" />
              <span>SOC2 Type II • ISO 27001 • SAML 2.0</span>
            </div>
            <span className="font-mono text-slate-500">Apex Technologies Org ID: #APX-9481</span>
          </div>
        </div>

        {/* Right Side Login Form & Demo Credentials (5 Cols) */}
        <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between bg-navy-900/40 backdrop-blur-2xl">
          <div>
            {/* Form Title */}
            <div className="mb-6">
              {isAuthenticated && (
                <div className="mb-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2.5 flex items-center justify-between text-xs text-emerald-300">
                  <span className="flex items-center space-x-1.5 font-semibold">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Active Session: {activeRole}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => router.push('/')}
                    className="underline hover:text-white font-bold"
                  >
                    Go to Dashboard ➔
                  </button>
                </div>
              )}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white tracking-tight">Enterprise Console Access</h2>
                <span className="rounded-full bg-emerald-500/20 text-emerald-400 px-2 py-0.5 text-[10px] font-mono font-bold border border-emerald-500/30">
                  SSO ACTIVE
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Authenticate with your corporate identity or select a demo perspective below.
              </p>
            </div>

            {/* Quick Demo Credentials for Judges */}
            <div className="mb-6 rounded-2xl border border-cyan-500/30 bg-cyan-950/20 p-3.5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-cyan-300 flex items-center space-x-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                  <span>1-Click Demo Profiles for Judges:</span>
                </span>
                <span className="text-[9px] text-slate-400 font-mono">Click to autofill</span>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                {demoCredentials.map((cred) => (
                  <button
                    key={cred.role}
                    type="button"
                    onClick={() => handleQuickSelect(cred)}
                    className={cn(
                      "text-left p-2 rounded-xl border text-[11px] transition-all flex flex-col justify-between",
                      selectedRole === cred.role
                        ? "border-cyan-400 bg-cyan-500/20 text-white shadow-glow-cyan"
                        : "border-navy-800 bg-navy-950/60 text-slate-300 hover:border-cyan-500/40 hover:bg-navy-900"
                    )}
                  >
                    <span className="font-bold flex items-center space-x-1">
                      <span>{cred.icon}</span>
                      <span className="truncate">{cred.role}</span>
                    </span>
                    <span className="text-[9px] text-slate-400 truncate">{cred.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1.5">
                  Corporate Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-xl border border-navy-700 bg-navy-950/80 py-2.5 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-slate-300 font-medium">Password</label>
                  <span className="text-[10px] text-cyan-400 hover:underline cursor-pointer">
                    Demo Mode (Any password works)
                  </span>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-xl border border-navy-700 bg-navy-950/80 py-2.5 pl-9 pr-10 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 font-mono"
                  />
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1.5">
                  Active Persona Perspective
                </label>
                <div className="relative">
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full rounded-xl border border-navy-700 bg-navy-950/80 py-2.5 pl-9 pr-4 text-xs text-white focus:border-cyan-400 focus:outline-none"
                  >
                    <option value="Chief Risk Officer">Chief Risk Officer (Executive Overview)</option>
                    <option value="VP of Engineering">VP of Engineering (Departmental Lead)</option>
                    <option value="HR Continuity Lead">HR Continuity Lead (Talent Mobility)</option>
                    <option value="Operations Director">Operations Director (SLA Protection)</option>
                  </select>
                  <UserCheck className="absolute left-3 top-3 h-4 w-4 text-cyan-400" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-electric-500 via-cyan-500 to-electric-500 py-3 text-xs font-bold text-white shadow-glow hover:opacity-95 transition-all mt-6"
              >
                <span>{isSubmitting ? 'Authenticating...' : `Enter Console as ${selectedRole}`}</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </form>
          </div>

          <div className="pt-6 border-t border-navy-800 text-center text-[10px] text-slate-500">
            Protected by Zero-Trust Architecture • SAML 2.0 Identity Federation
          </div>
        </div>
      </div>
    </div>
  );
}
