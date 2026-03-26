import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  ShieldAlert, 
  LayoutDashboard, 
  UploadCloud, 
  ScanLine, 
  LockKeyhole, 
  Activity, 
  AlertTriangle, 
  RotateCcw,
  Zap,
  Database,
  LogOut,
  Hexagon
} from 'lucide-react';

const navItems = [
  { path: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/app/upload', label: 'Upload File', icon: UploadCloud },
  { path: '/app/compliance', label: 'Compliance Check', icon: ScanLine },
  { path: '/app/encryption', label: 'Encryption Flow', icon: LockKeyhole },
  { path: '/app/attack', label: 'Attack Simulation', icon: Activity },
  { path: '/app/isolation', label: 'Node Isolation', icon: AlertTriangle },
  { path: '/app/reconstruction', label: 'Reconstruction', icon: RotateCcw },
  { path: '/app/recovery', label: 'System Recovery', icon: Zap },
];

interface SidebarProps {
  activeView?: string;
  setActiveView?: React.Dispatch<React.SetStateAction<string>>;
}

export function Sidebar({ activeView, setActiveView }: SidebarProps) {
  return (
    <aside className="w-64 h-screen glass-card flex flex-col fixed left-0 top-0 border-r border-brand-border/40 z-20">
      <div className="p-6 flex items-center gap-3 border-b border-brand-border/40">
        <div className="relative flex items-center justify-center w-8 h-8 rounded-md bg-brand-primary/10 border border-brand-primary/30">
          <ShieldAlert className="text-brand-primary w-5 h-5 absolute" />
          <Hexagon className="text-brand-accent w-8 h-8 opacity-50 absolute" />
        </div>
        <h1 className="text-xl font-bold font-heading text-white tracking-wider">
          SENTINEL<span className="text-brand-primary">-VAULT</span>
        </h1>
      </div>
      
      <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-1 px-4">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setActiveView?.(item.path.includes('/upload') ? 'upload' : 'dashboard')}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20 neon-border' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`
            }
          >
            <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-medium text-sm">{item.label}</span>
          </NavLink>
        ))}

        <button
          type="button"
          onClick={() => setActiveView?.('shardManager')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group border ${
            activeView === 'shardManager'
              ? 'bg-brand-primary/10 text-brand-primary border-brand-primary/20 neon-border'
              : 'text-slate-400 hover:text-white hover:bg-white/5 border-transparent'
          }`}
        >
          <Database className="w-5 h-5 group-hover:scale-110 transition-transform" />
          <span className="font-medium text-sm">Shard Manager</span>
        </button>
      </div>

      <div className="p-4 border-t border-brand-border/40">
         <NavLink
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Exit System</span>
          </NavLink>
      </div>
    </aside>
  );
}
