import React from 'react';
import { motion } from 'motion/react';

interface GaugeProps {
  value: number; // 0-100
  color?: string;
  label: string;
  size?: number;
  strokeWidth?: number;
}

export function Gauge({ value, color = '#3EA6FF', label, size = 180, strokeWidth = 12 }: GaugeProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  // Make it a semi-circle (gauge style)
  const dashArray = circumference * 0.75;
  const dashOffset = dashArray - (dashArray * value) / 100;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform rotate-135 drop-shadow-[0_0_10px_rgba(62,166,255,0.4)]">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={dashArray}
          strokeLinecap="round"
          style={{ strokeDashoffset: circumference * 0.25 }} // Offset to start from bottom left
        />
        {/* Animated value track */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={dashArray}
          strokeLinecap="round"
          initial={{ strokeDashoffset: dashArray }}
          animate={{ strokeDashoffset: dashOffset + (circumference * 0.25) }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ 
            filter: `drop-shadow(0 0 8px ${color})`,
          }}
        />
      </svg>
      
      {/* Label inside */}
      <div className="absolute flex flex-col items-center justify-center transform -translate-y-4">
        <span className="text-3xl font-heading font-bold text-white mb-1" style={{ color: color }}>
          {value}%
        </span>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
          {label}
        </span>
      </div>
    </div>
  );
}
