import React, { useEffect, useState } from 'react';
import { ShieldCheck, FileText, AlertTriangle, ScanLine, CheckCircle2, Building, User, Calendar, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useFile } from '../../context/FileContext';

export function Compliance() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { fileState, setComplianceReport } = useFile();

  useEffect(() => {
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 1000)); setStep(1); // Scan started
      await new Promise(r => setTimeout(r, 2000)); setStep(2); // PII Detected
      await new Promise(r => setTimeout(r, 1500)); setStep(3); // Action suggested
    };
    sequence();
  }, []);

  useEffect(() => {
    setComplianceReport({
      status: 'pending',
      piiCategories: 0,
      entities: { fullNames: 0, datesOfBirth: 0, identificationNums: 0 },
    });
  }, [setComplianceReport]);

  useEffect(() => {
    if (step === 0) return;

    if (step === 1) {
      setComplianceReport({
        status: 'scanning',
        piiCategories: 0,
        entities: { fullNames: 0, datesOfBirth: 0, identificationNums: 0 },
      });
      return;
    }

    if (step === 2) {
      setComplianceReport({
        status: 'scanning',
        piiCategories: 3,
        entities: { fullNames: 2, datesOfBirth: 1, identificationNums: 2 },
        detectedContent: 'PII markers detected during NLP scan',
      });
      return;
    }

    setComplianceReport({
      status: 'completed',
      piiCategories: 3,
      entities: { fullNames: 2, datesOfBirth: 1, identificationNums: 2 },
      detectedContent: 'File flagged for enhanced encryption and sharding',
    });
  }, [step, setComplianceReport]);

  return (
    <div className="flex flex-col h-full gap-8 p-8 max-w-6xl mx-auto">
      <div className="flex items-center gap-4">
        <ScanLine className="w-8 h-8 text-brand-accent animate-pulse" />
        <h1 className="text-3xl font-heading font-bold text-white">AI PII Scanning & Compliance</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="px-4 py-3 rounded-2xl bg-brand-bg border border-brand-border/50 flex items-center gap-3 flex-1">
          <FileText className="w-5 h-5 text-brand-primary" />
          {fileState.metadata ? (
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">{fileState.metadata.name}</span>
              <span className="text-xs text-slate-400 font-mono">
                Session {fileState.metadata.sessionId} • Uploaded {fileState.metadata.uploadTimestamp}
              </span>
            </div>
          ) : (
            <span className="text-sm text-slate-400">No file selected yet. Upload a file to view live compliance data.</span>
          )}
        </div>
        <div className="px-3 py-2 rounded-xl bg-green-500/10 border border-green-500/30 text-xs text-green-300 font-semibold">
          {fileState.complianceReport?.status === 'completed' ? 'Compliance ready' : 'Awaiting scan'}
        </div>
      </div>

      <div className="flex-1 flex gap-8">
        
        {/* Left Side: Document Preview (Simulated) */}
        <div className="flex-1 glass-card rounded-3xl p-8 border border-brand-border/40 relative overflow-hidden flex flex-col items-center justify-center min-h-[500px]">
          
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
          
          <FileText className="w-24 h-24 text-slate-700/50 mb-6" />
          
          {step === 0 && (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="flex flex-col items-center gap-4"
             >
                <div className="w-12 h-12 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" />
                <span className="text-sm font-semibold text-slate-400">Initializing NLP Engine...</span>
             </motion.div>
          )}

          {step > 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-sm bg-brand-bg rounded-xl border border-brand-border/50 p-6 relative overflow-hidden"
            >
              {step === 1 && <div className="absolute top-0 left-0 w-full h-1 bg-brand-primary animate-[scan_2s_ease-in-out_infinite_alternate]" style={{ boxShadow: '0 0 15px #3EA6FF' }} />}
              
              <div className="space-y-3 font-mono text-xs text-slate-500 blur-[2px]">
                <p>EMPLOYMENT CONTRACT 2026</p>
                <p>Between Sentinel Corp and [Johnathan Doe]</p>
                <p>Address: 123 Cyber St, San Francisco, CA</p>
                <p>SSN: [XXX-XX-1234] DOB: [05/12/1985]</p>
                <p>Salary details and financial routing info: ACC #[987654321] RTN #[123456789]</p>
                <p>...Confidential information regarding project Alpha...</p>
              </div>

              {step > 1 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-brand-bg/80 backdrop-blur-sm flex items-center justify-center p-6 border-2 border-yellow-500/50 rounded-xl"
                >
                   <div className="flex flex-col items-center text-center gap-3">
                     <AlertTriangle className="w-12 h-12 text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)] animate-pulse" />
                     <h3 className="text-xl font-heading font-bold text-yellow-500">Sensitive Data Found</h3>
                     <p className="text-sm text-slate-300">High concentration of PII detected in document.</p>
                   </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>

        {/* Right Side: Analysis Results */}
        <div className="w-96 flex flex-col gap-6">
          <div className="glass-card rounded-2xl p-6 border border-brand-border/40 flex-1">
             <h3 className="font-heading font-semibold text-white mb-6 border-b border-brand-border/40 pb-4">Compliance Report</h3>
             
             <div className="space-y-6">
               <div className="flex flex-col gap-2">
                 <span className="text-xs font-semibold text-slate-400 uppercase">Detection Status</span>
                 <div className="flex items-center gap-3 bg-brand-bg/50 p-3 rounded-lg border border-brand-border/30">
                    {step === 0 && <span className="text-slate-500 text-sm italic">Waiting...</span>}
                    {step === 1 && <span className="text-brand-primary text-sm font-semibold animate-pulse">Scanning Document...</span>}
                    {step >= 2 && <span className="text-yellow-500 text-sm font-bold flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> 4 PII Categories Found</span>}
                 </div>
               </div>

               <AnimatePresence>
                 {step >= 2 && (
                   <motion.div 
                     key="identified-entities"
                     initial={{ opacity: 0, height: 0 }}
                     animate={{ opacity: 1, height: 'auto' }}
                     exit={{ opacity: 0, height: 0 }}
                     className="flex flex-col gap-3"
                   >
                     <span className="text-xs font-semibold text-slate-400 uppercase">Identified Entities</span>
                     {[
                       { icon: User, label: 'Full Names', count: 2 },
                       { icon: Calendar, label: 'Dates of Birth', count: 1 },
                       { icon: CreditCard, label: 'Identification Nums', count: 2 },
                     ].map((entity, i) => (
                       <motion.div 
                         initial={{ opacity: 0, x: 20 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: i * 0.1 }}
                         key={entity.label} 
                         className="flex items-center justify-between bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-lg"
                       >
                         <div className="flex items-center gap-3">
                           <entity.icon className="w-4 h-4 text-yellow-500" />
                           <span className="text-sm font-semibold text-yellow-400">{entity.label}</span>
                         </div>
                         <span className="text-xs font-bold bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded-full">{entity.count}</span>
                       </motion.div>
                     ))}
                   </motion.div>
                 )}

                 {step >= 3 && (
                   <motion.div 
                     key="required-action"
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: 20 }}
                     className="mt-8 pt-6 border-t border-brand-border/40 flex flex-col gap-4"
                   >
                     <span className="text-xs font-semibold text-slate-400 uppercase">Required Action</span>
                     <div className="bg-brand-primary/10 border border-brand-primary/30 p-4 rounded-xl shadow-[0_0_15px_rgba(62,166,255,0.15)]">
                       <p className="text-sm text-brand-primary font-medium mb-4 leading-relaxed">
                         Flagging file for strict Zero-Knowledge Encryption and distributed sharding before storage.
                       </p>
                       <button onClick={() => navigate('/app/encryption')} className="w-full py-3 rounded-lg bg-brand-primary text-brand-bg font-bold shadow-[0_0_20px_rgba(62,166,255,0.3)] hover:shadow-[0_0_30px_rgba(62,166,255,0.6)] transition-all flex items-center justify-center gap-2">
                         <ShieldCheck className="w-5 h-5" /> Proceed to Encryption
                       </button>
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>
          </div>

          <div className="flex justify-between items-center bg-brand-card/50 p-4 rounded-xl border border-brand-border/40">
            {[
              { label: 'GDPR Ready', active: step >= 2 },
              { label: 'HIPAA Aligned', active: step >= 2 },
              { label: 'Zero-Knowledge', active: step >= 3 }
            ].map((tag, i) => (
              <div key={i} className={`flex flex-col items-center gap-1 transition-opacity duration-500 ${tag.active ? 'opacity-100' : 'opacity-40'}`}>
                <CheckCircle2 className={`w-5 h-5 ${tag.active ? 'text-green-400' : 'text-slate-600'}`} />
                <span className={`text-[10px] font-bold uppercase tracking-wider ${tag.active ? 'text-green-400' : 'text-slate-500'}`}>{tag.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
