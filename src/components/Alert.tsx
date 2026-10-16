"use client";

import React from "react";
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from "lucide-react";

interface AlertProps {
  type?: "success" | "warning" | "error" | "info";
  title?: string;
  message: string;
  onClose?: () => void;
  className?: string;
}

export default function Alert({
  type = "info",
  title,
  message,
  onClose,
  className = ""
}: AlertProps) {
  const configs = {
    success: {
      icon: CheckCircle2,
      border: "border-[#10B981]/40",
      bg: "bg-[#10B981]/10",
      text: "text-[#10B981]",
      titleColor: "text-[#EEF0FF]"
    },
    warning: {
      icon: AlertTriangle,
      border: "border-[#F59E0B]/40",
      bg: "bg-[#F59E0B]/10",
      text: "text-[#F59E0B]",
      titleColor: "text-[#EEF0FF]"
    },
    error: {
      icon: XCircle,
      border: "border-[#EF4444]/40",
      bg: "bg-[#EF4444]/10",
      text: "text-[#EF4444]",
      titleColor: "text-[#EEF0FF]"
    },
    info: {
      icon: Info,
      border: "border-[#7C83FD]/40",
      bg: "bg-[#4B4FD8]/15",
      text: "text-[#7C83FD]",
      titleColor: "text-[#EEF0FF]"
    }
  };

  const config = configs[type];
  const Icon = config.icon;

  return (
    <div
      className={`glass-card rounded-2xl p-4 border ${config.border} ${config.bg} flex items-start gap-3 transition-all ${className}`}
    >
      <Icon size={20} className={`${config.text} shrink-0 mt-0.5`} />
      
      <div className="flex-1 text-xs">
        {title && <h5 className={`font-bold ${config.titleColor} text-sm mb-0.5`}>{title}</h5>}
        <p className="text-[#EEF0FF] leading-relaxed">{message}</p>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="text-[#A5AAD6] hover:text-[#EEF0FF] p-1 rounded-lg hover:bg-white/5 transition-colors"
          aria-label="Dismiss alert"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
