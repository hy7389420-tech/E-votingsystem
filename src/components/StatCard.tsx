"use client";

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon: React.ElementType;
  iconColor?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
}

export default function StatCard({
  title,
  value,
  subtext,
  icon: Icon,
  iconColor = "#7C83FD",
  trend,
  className = ""
}: StatCardProps) {
  return (
    <div className={`glass-card rounded-2xl p-5 relative overflow-hidden group ${className}`}>
      {/* Background Accent Glow */}
      <div
        className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full blur-2xl transition-opacity opacity-20 group-hover:opacity-40 pointer-events-none"
        style={{ backgroundColor: iconColor }}
      />

      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[#A5AAD6] tracking-wide">{title}</span>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-110"
          style={{
            backgroundColor: `${iconColor}1A`,
            borderColor: `${iconColor}40`,
            color: iconColor
          }}
        >
          <Icon size={20} />
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <div className="flex items-baseline justify-between">
          <span className="text-2xl md:text-3xl font-black text-[#EEF0FF] tracking-tight">{value}</span>
          {trend && (
            <span
              className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
                trend.isPositive
                  ? "bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30"
                  : "bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30"
              }`}
            >
              {trend.isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {trend.value}
            </span>
          )}
        </div>
        {subtext && <p className="text-[11px] text-[#A5AAD6]">{subtext}</p>}
      </div>
    </div>
  );
}
