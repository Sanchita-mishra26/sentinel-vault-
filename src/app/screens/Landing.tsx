import { Link } from "react-router";
import { Shield, Lock, Share2, BrainCircuit, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../components/ui";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-200 font-['Sora',sans-serif] selection:bg-[#3EA6FF]/30">
      <div className="absolute inset-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #1F3B73 1px, transparent 0)`, backgroundSize: '32px 32px' }} />
           
      {/* Navigation */}
      <nav className="h-20 border-b border-[#1F3B73]/50 bg-[#0B1220]/80 backdrop-blur-md sticky top-0 z-50 px-6 lg:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3 text-white font-bold text-xl tracking-wide">
          <Shield className="w-8 h-8 text-[#3EA6FF]" />
          SENTINEL-VAULT
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#products" className="hover:text-white transition-colors">Products</a>
          <a href="#security" className="hover:text-white transition-colors">Security</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/auth" className="text-sm font-medium text-slate-300 hover:text-white transition-colors hidden sm:block">Log In</Link>
          <Link to="/app">
            <Button variant="primary" className="py-2 px-6">Get Started</Button>
          </Link>
        </div>
      </nav>

      <main className="relative pt-24 pb-32 overflow-hidden">
        {/* Glowing orb background effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#3EA6FF]/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center z-10 relative">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#6BD3FF]/20 bg-[#1F3B73]/20 text-[#6BD3FF] text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-[#6BD3FF] animate-pulse" />
              Next-Gen Architecture
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-[#6BD3FF] to-[#3EA6FF]">
              Self-Healing <br />
              Distributed Data <br />
              Security Platform
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed font-light">
              Secure sensitive data using AES-256 encryption, intelligent sharding, distributed storage nodes, and AI-powered threat detection.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/app">
                <Button variant="primary" className="w-full sm:w-auto h-14 px-8 text-lg">
                  Deploy Vault <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="secondary" className="w-full sm:w-auto h-14 px-8 text-lg">
                  View Demo
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[500px] flex items-center justify-center"
          >
            {/* Abstract representation of a glowing data cube / nodes */}
            <div className="absolute w-[300px] h-[300px] border-2 border-[#1F3B73] rounded-3xl rotate-45 flex items-center justify-center bg-[#0B1220]/50 backdrop-blur-sm shadow-[0_0_100px_rgba(62,166,255,0.2)] z-10">
              <div className="w-[200px] h-[200px] border-2 border-[#3EA6FF] rounded-2xl rotate-45 flex items-center justify-center bg-gradient-to-br from-[#1F3B73]/40 to-transparent backdrop-blur-md shadow-[0_0_80px_rgba(62,166,255,0.4)] relative">
                <Shield className="w-24 h-24 text-white -rotate-90 opacity-90 filter drop-shadow-[0_0_15px_#fff]" />
              </div>
            </div>

            {/* Connecting Lines and Nodes */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div 
                key={i}
                className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[#3EA6FF] to-transparent"
                style={{ rotate: `${i * 45}deg` }}
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scaleX: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Features */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mt-32 grid md:grid-cols-3 gap-8 relative z-10">
          {[
            { icon: Lock, title: "AES-256 Encryption", desc: "Military-grade end-to-end encryption securing data at rest and in transit." },
            { icon: Share2, title: "Intelligent Data Sharding", desc: "Files are split into erasure-coded shards and distributed globally." },
            { icon: BrainCircuit, title: "AI Threat Detection", desc: "Real-time anomaly detection identifying sophisticated zero-day attacks." }
          ].map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-[#0B1220]/60 backdrop-blur-xl border border-[#1F3B73]/50 rounded-2xl p-8 hover:border-[#3EA6FF]/50 transition-colors shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)] group"
            >
              <div className="w-14 h-14 bg-[#1F3B73]/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#3EA6FF]/20 transition-all">
                <f.icon className="w-7 h-7 text-[#6BD3FF]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
              <p className="text-slate-400 font-light leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
