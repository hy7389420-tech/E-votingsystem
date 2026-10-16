"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

interface ProgressBarProps {
  currentStep?: number;
  totalSteps?: number;
  percentage?: number;
  progress?: number;
  stepTitle?: string;
  label?: string;
  showPercentage?: boolean;
  className?: string;
}

export default function ProgressBar({
  currentStep,
  totalSteps = 5,
  percentage,
  progress,
  stepTitle,
  label,
  showPercentage = true,
  className = ""
}: ProgressBarProps) {
  const finalPercent = Math.min(Math.max(percentage ?? progress ?? 0, 0), 100);
  const displayTitle = stepTitle || label;

  return (
    <div className={`glass-card rounded-2xl p-4 md:p-5 space-y-3 ${className}`}>
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          {currentStep && (
            <span className="px-2.5 py-1 rounded-lg bg-[#4B4FD8]/25 text-[#7C83FD] font-bold border border-[rgba(124,131,253,0.35)]">
              Step {currentStep} of {totalSteps}
            </span>
          )}
          {displayTitle && (
            <span className="font-semibold text-[#EEF0FF]">{displayTitle}</span>
          )}
        </div>
        {showPercentage && (
          <div className="flex items-center gap-1.5 text-[#7C83FD] font-bold">
            <CheckCircle2 size={14} />
            <span>{finalPercent}% Complete</span>
          </div>
        )}
      </div>

      {/* Progress Track */}
      <div className="w-full h-3 bg-[#14163A] rounded-full p-0.5 border border-[rgba(124,131,253,0.25)] overflow-hidden relative">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#4B4FD8] via-[#7C83FD] to-[#A5AAD6] transition-all duration-500 ease-out shadow-[0_0_12px_rgba(124,131,253,0.5)]"
          style={{ width: `${finalPercent}%` }}
        />
      </div>
    </div>
  );
}
