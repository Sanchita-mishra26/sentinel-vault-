import React from 'react';
import { Outlet } from 'react-router-dom';

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-brand-bg relative overflow-hidden flex flex-col font-sans text-slate-200">
      {/* Background Grids and Glows */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[40%] h-[40%] bg-brand-primary/20 rounded-full blur-[200px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-[30%] h-[30%] bg-brand-accent/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      
      <main className="flex-1 relative z-10 w-full max-w-[1440px] mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
