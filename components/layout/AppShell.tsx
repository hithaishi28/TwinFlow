'use client';

import React from 'react';
import { useTwinFlow } from '@/context/TwinFlowContext';
import { Sidebar } from '@/components/layout/Sidebar';
import { TopHeader } from '@/components/layout/TopHeader';
import { GuidedDemoBanner } from '@/components/layout/GuidedDemoBanner';
import LoginPage from '@/app/login/page';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useTwinFlow();

  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen bg-navy-950 flex flex-col justify-center items-center py-6">
        <LoginPage />
      </div>
    );
  }

  return (
    <div className="flex w-full min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <TopHeader />
        <GuidedDemoBanner />
        <main className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-navy-950 via-navy-900/60 to-navy-950">
          {children}
        </main>
      </div>
    </div>
  );
};
