import type { Metadata } from 'next';
import './globals.css';
import { TwinFlowProvider } from '@/context/TwinFlowContext';
import { AppShell } from '@/components/layout/AppShell';
import { ToastContainer } from '@/components/ui/Toast';

export const metadata: Metadata = {
  title: 'TWINFLOW — Workforce Digital Twin for Organizational Continuity',
  description: 'AI-Powered Workforce Digital Twin and Organizational Continuity Intelligence Platform.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-navy-950 text-slate-100 min-h-screen antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        <TwinFlowProvider>
          <AppShell>{children}</AppShell>
          <ToastContainer />
        </TwinFlowProvider>
      </body>
    </html>
  );
}
