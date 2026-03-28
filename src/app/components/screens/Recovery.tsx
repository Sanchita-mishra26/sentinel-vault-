import React, { useEffect } from 'react';
import { NetworkMap } from '../NetworkMap';
import { ShieldCheck, CheckCircle2, Home } from 'lucide-react';
import { motion } from 'motion/react';
import { Gauge } from '../Gauge';
import { useNavigate } from 'react-router-dom';
import { useFile } from '../../context/FileContext';

const recoveredNodes = [
  { id: '1', label: 'Node 1', state: 'active', health: 100, x: 20, y: 30 },
  { id: '2', label: 'Node 2', state: 'active', health: 100, x: 80, y: 30 },
  { id: '4', label: 'Node 4', state: 'active', health: 100, x: 50, y: 90 },
  { id: '5', label: 'Node 5', state: 'active', health: 100, x: 15, y: 75 },
  { id: '6', label: 'Node 6', state: 'active', health: 100, x: 85, y: 75 },
] as any;

export function Recovery() {
  const navigate = useNavigate();
  const { fileState, setSystemStatus } = useFile();

  useEffect(() => {
    if (!fileState.file) {
      navigate('/app/upload');
      return;
    }
    setSystemStatus('recovered');
  }, [fileState.file, navigate, setSystemStatus]);

  return (
    <div className="flex flex-col h-full gap-6">
      
      {/* Success Banner */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full bg-green-500/10 border border-green-500/30 p-6 rounded-xl flex items-center gap-6 shadow-[0_0_30px_rgba(74,222,128,0.15)] relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        
        <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center relative z-10">
          <ShieldCheck className="w-8 h-8 text-green-400" />
          <div className="absolute inset-0 rounded-full border border-green-400 animate-ping opacity-50" />
        </div>
        
        <div className="flex-1 relative z-10">
          <h2 className="text-green-400 font-heading font-bold text-2xl mb-1">Self-Healing Recovery Successful</h2>
          <p className="text-green-300/70 text-sm font-mono">Distributed resilience maintained. Zero data loss recorded.</p>
        </div>

        <button onClick={() => navigate('/app/dashboard')} className="px-6 py-3 rounded-xl bg-brand-bg/50 border border-brand-border/50 text-white font-bold text-sm hover:bg-white/10 transition-colors z-10 flex items-center gap-2">
          <Home className="w-4 h-4" /> RETURN TO DASHBOARD
        </button>
      </motion.div>

      <div className="flex-1 flex gap-6">
        {/* Left Side: Restored Network View */}
        <div className="flex-grow glass-card rounded-2xl p-6 flex flex-col relative border-green-500/20">
          <div className="flex justify-between items-center mb-6 z-10">
             <h2 className="text-xl font-heading font-semibold text-white">System Topology</h2>
             <span className="text-xs px-3 py-1.5 bg-green-500/10 text-green-400 border border-green-500/30 rounded-full font-bold flex items-center gap-2">
               <CheckCircle2 className="w-4 h-4" /> OPTIMAL
             </span>
          </div>
          
          <div className="flex-1 border border-brand-border/40 rounded-xl overflow-hidden bg-brand-bg/50">
             <NetworkMap nodes={recoveredNodes} coreState="active" />
          </div>
        </div>

        {/* Right Side: Integrity Dashboard */}
        <div className="w-96 flex flex-col gap-6">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-2xl p-8 border border-green-500/20 flex flex-col items-center flex-1 shadow-[0_0_20px_rgba(74,222,128,0.05)] relative"
          >
            <h3 className="font-heading font-semibold text-xl text-white mb-2">System Integrity</h3>
            <p className="text-sm text-slate-400 mb-12">Post-recovery analysis</p>

            <div className="mb-12 scale-125">
              <Gauge value={100} color="#4ADE80" label="SECURE" size={200} />
            </div>

            <div className="w-full space-y-4 mt-auto">
               {[
                 { label: 'Core Vault', status: 'Online' },
                 { label: 'Active Nodes', status: '5/5' },
                 { label: 'Data Shards', status: 'Synchronized' },
                 { label: 'Threats', status: 'Neutralized' },
               ].map((stat, i) => (
                 <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-brand-bg/50 border border-brand-border/30">
                   <span className="text-sm font-semibold text-slate-400">{stat.label}</span>
                   <span className="text-sm font-bold text-green-400">{stat.status}</span>
                 </div>
               ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
