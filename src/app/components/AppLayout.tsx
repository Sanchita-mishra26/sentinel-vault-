import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import ShardManager from './ShardManager';

export function AppLayout() {
  const [activeView, setActiveView] = useState('dashboard');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('/upload')) {
      setActiveView('upload');
      return;
    }
    setActiveView('dashboard');
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-brand-bg relative overflow-hidden flex font-sans">
      {/* Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-primary/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-brand-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      
      <div className="flex-1 ml-64 flex flex-col min-h-screen relative z-10">
        <TopBar />
        <main className="flex-1 p-8 mt-16 overflow-y-auto">
          {activeView === 'shardManager' ? <ShardManager /> : <Outlet />}
        </main>
      </div>
    </div>
  );
}
