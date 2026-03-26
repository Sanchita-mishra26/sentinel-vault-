import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Card({ className, children, glow = false }: { className?: string; children: React.ReactNode; glow?: boolean }) {
  return (
    <div className={cn(
      "bg-[#0B1220]/60 backdrop-blur-xl border border-[#1F3B73]/50 rounded-2xl relative overflow-hidden transition-all duration-300",
      glow && "shadow-[0_0_20px_rgba(62,166,255,0.15)] border-[#3EA6FF]/30",
      className
    )}>
      {glow && <div className="absolute -inset-0.5 bg-gradient-to-br from-[#3EA6FF]/20 to-transparent blur-2xl pointer-events-none" />}
      <div className="relative z-10 p-5 md:p-6">
        {children}
      </div>
    </div>
  );
}

export function Button({ className, variant = "primary", children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "danger" | "ghost" }) {
  return (
    <button
      className={cn(
        "px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed",
        variant === "primary" && "bg-gradient-to-r from-[#1F3B73] to-[#3EA6FF] text-white hover:shadow-[0_0_15px_rgba(62,166,255,0.4)] border border-[#6BD3FF]/20",
        variant === "secondary" && "bg-[#1F3B73]/30 text-[#6BD3FF] hover:bg-[#1F3B73]/50 border border-[#1F3B73]",
        variant === "danger" && "bg-gradient-to-r from-[#EF4444]/20 to-[#EF4444]/40 text-red-100 hover:shadow-[0_0_15px_rgba(239,68,68,0.4)] border border-[#EF4444]/50",
        variant === "ghost" && "hover:bg-white/5 text-slate-300 hover:text-white",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Badge({ className, variant = "neutral", children }: { className?: string; variant?: "success" | "warning" | "danger" | "info" | "neutral", children: React.ReactNode }) {
  return (
    <span className={cn(
      "px-2.5 py-1 text-xs font-medium rounded-full border flex items-center gap-1.5",
      variant === "success" && "bg-[#10B981]/10 text-[#34D399] border-[#10B981]/20",
      variant === "warning" && "bg-[#F59E0B]/10 text-[#FBBF24] border-[#F59E0B]/20",
      variant === "danger" && "bg-[#EF4444]/10 text-[#F87171] border-[#EF4444]/20",
      variant === "info" && "bg-[#3EA6FF]/10 text-[#6BD3FF] border-[#3EA6FF]/20",
      variant === "neutral" && "bg-slate-800/50 text-slate-300 border-slate-700",
      className
    )}>
      {children}
    </span>
  );
}

export function StatCard({ title, value, unit, icon: Icon, trend, trendValue }: any) {
  return (
    <Card className="flex flex-col gap-2">
      <div className="flex items-center gap-2 text-slate-400 font-medium text-sm">
        {Icon && <Icon className="w-4 h-4 text-[#3EA6FF]" />}
        {title}
      </div>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold text-white font-mono">{value}</span>
        {unit && <span className="text-sm text-slate-400 mb-1">{unit}</span>}
      </div>
      {trendValue && (
        <div className={cn(
          "text-xs font-semibold mt-1",
          trend === "up" ? "text-[#34D399]" : trend === "down" ? "text-[#EF4444]" : "text-slate-400"
        )}>
          {trend === "up" ? "↑" : trend === "down" ? "↓" : ""} {trendValue}
        </div>
      )}
    </Card>
  );
}
