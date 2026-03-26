import { Outlet, NavLink, useLocation } from "react-router-dom";
import { 
  Shield, 
  LayoutDashboard, 
  UploadCloud, 
  Server, 
  Activity, 
  BrainCircuit, 
  Bell, 
  UserCircle 
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SIDEBAR_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/app", end: true },
  { label: "Upload File", icon: UploadCloud, path: "/app/upload" },
  { label: "AI Intelligence", icon: BrainCircuit, path: "/app/process" },
  { label: "Security Monitor", icon: Activity, path: "/app/attack" },
  { label: "Node Manager", icon: Server, path: "/app/reconstruction" },
];

export default function DashboardLayout() {
  const location = useLocation();

  // Determine system status based on path to simulate the flow
  let systemStatus = "ACTIVE";
  let systemStatusColor = "text-[#34D399]";
  let threatLevel = "LOW";
  let threatLevelColor = "text-[#34D399]";
  let nodesOnline = 5;

  if (location.pathname.includes("/attack") || location.pathname.includes("/isolation")) {
    systemStatus = "COMPROMISED";
    systemStatusColor = "text-[#EF4444]";
    threatLevel = "CRITICAL";
    threatLevelColor = "text-[#EF4444]";
    nodesOnline = 4;
  } else if (location.pathname.includes("/reconstruction")) {
    systemStatus = "RECOVERING";
    systemStatusColor = "text-[#F59E0B]";
    threatLevel = "ELEVATED";
    threatLevelColor = "text-[#F59E0B]";
    nodesOnline = 5;
  }

  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-200 font-['Sora',sans-serif] flex flex-col selection:bg-[#3EA6FF]/30">
      {/* Top Header */}
      <header className="h-16 border-b border-[#1F3B73]/50 bg-[#0B1220]/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-white font-bold text-lg tracking-wide">
            <Shield className="w-6 h-6 text-[#3EA6FF]" fill="#3EA6FF" fillOpacity={0.2} />
            SENTINEL-VAULT
          </div>
          
          <div className="hidden md:flex items-center gap-6 ml-8 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">System Status:</span>
              <span className={cn("font-semibold font-mono", systemStatusColor)}>{systemStatus}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Threat Level:</span>
              <span className={cn("font-semibold font-mono", threatLevelColor)}>{threatLevel}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Nodes Online:</span>
              <span className="font-semibold text-white">{nodesOnline}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-400 hover:text-white transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#3EA6FF] rounded-full animate-pulse shadow-[0_0_8px_#3EA6FF]" />
          </button>
          <div className="h-8 w-px bg-[#1F3B73]" />
          <button className="flex items-center gap-2 text-sm font-medium hover:text-white transition-colors">
            <UserCircle className="w-8 h-8 text-slate-400" />
            <span className="hidden sm:block">Admin</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-[#1F3B73]/50 bg-[#0B1220]/50 backdrop-blur-sm flex-shrink-0 hidden lg:block overflow-y-auto">
          <nav className="p-4 space-y-2">
            {SIDEBAR_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
                    isActive
                      ? "bg-[#1F3B73]/30 text-[#3EA6FF] shadow-[inset_0_0_20px_rgba(62,166,255,0.1)] border border-[#3EA6FF]/20"
                      : "text-slate-400 hover:bg-[#1F3B73]/10 hover:text-white"
                  )
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium text-sm">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto relative p-4 md:p-6 lg:p-8 bg-gradient-to-br from-[#0B1220] to-[#0F1E3D]">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 pointer-events-none opacity-20" 
               style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #1F3B73 1px, transparent 0)`, backgroundSize: '32px 32px' }} />
          
          <div className="relative z-10 max-w-7xl mx-auto h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
