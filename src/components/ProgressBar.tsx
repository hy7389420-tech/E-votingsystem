"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps?: number;
  percentage: number;
  stepTitle?: string;
  className?: string;
}

export default function ProgressBar({
  currentStep,
  totalSteps = 5,
  percentage,
  stepTitle,
  className = ""
}: ProgressBarProps) {
  return (
    <div className={`glass-card rounded-2xl p-4 md:p-5 space-y-3 ${className}`}>
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-lg bg-[#4ec9b0]/15 text-[#4ec9b0] font-bold border border-[#4ec9b0]/30">
            Step {currentStep} of {totalSteps}
          </span>
          {stepTitle && <span className="font-semibold text-[#e0e0ff] hidden sm:inline">{stepTitle}</span>}
        </div>
        <div className="flex items-center gap-1.5 text-[#4ec9b0] font-bold">
          <CheckCircle2 size={14} />
          <span>{percentage}% Complete</span>
        </div>
      </div>

      {/* Progress Track */}
      <div className="w-full h-3 bg-[#0a0e27] rounded-full p-0.5 border border-[#4ec9b0]/20 overflow-hidden relative">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#4ec9b0] via-[#00d9ff] to-[#7f8cff] transition-all duration-500 ease-out shadow-[0_0_12px_rgba(78,201,176,0.6)]"
          style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
        />
      </div>
    </div>
  );
}
