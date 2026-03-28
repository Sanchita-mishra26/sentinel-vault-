import React from 'react';
import { Bell, User, Activity, CheckCircle, ShieldAlert, FileText } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useFile } from '../context/FileContext';

export function TopBar() {
  const location = useLocation();
  const isAttack = location.pathname.includes('attack') || location.pathname.includes('isolation');
  const { fileState } = useFile();
  
  return (
    <header className="h-16 w-full glass-card fixed top-0 left-64 border-b border-brand-border/40 z-10 flex items-center justify-between px-8" style={{ width: 'calc(100% - 16rem)' }}>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20">
          <Activity className="w-4 h-4 text-brand-primary animate-pulse" />
          <span className="text-xs font-semibold text-brand-primary">System Status: {isAttack ? <span className="text-red-500">ATTACK DETECTED</span> : 'ACTIVE'}</span>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20">
          <ShieldAlert className={`w-4 h-4 ${isAttack ? 'text-red-500' : 'text-brand-accent'}`} />
          <span className={`text-xs font-semibold ${isAttack ? 'text-red-500' : 'text-brand-accent'}`}>Threat Level: {isAttack ? 'CRITICAL' : 'LOW'}</span>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span className="text-xs font-semibold text-slate-300">Nodes Online: {isAttack ? '4/5' : '5/5'}</span>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-bg/60 border border-brand-border/60">
          <FileText className="w-4 h-4 text-slate-200" />
          <span className="text-xs font-semibold text-slate-200">
            {fileState.metadata ? `${fileState.metadata.name} · ${fileState.metadata.sessionId}` : 'No active file'}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-full hover:bg-white/10 transition-colors">
          <Bell className="w-5 h-5 text-slate-300" />
          {isAttack && <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>}
        </button>
        <div className="w-8 h-8 rounded-full bg-brand-primary/20 border border-brand-primary/40 flex items-center justify-center cursor-pointer hover:bg-brand-primary/30 transition-colors">
          <User className="w-4 h-4 text-brand-primary" />
        </div>
      </div>
    </header>
  );
}
