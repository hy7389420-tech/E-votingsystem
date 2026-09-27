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
      border: "border-[#10b981]/40",
      bg: "bg-[#10b981]/10",
      text: "text-[#10b981]",
      titleColor: "text-[#e0e0ff]"
    },
    warning: {
      icon: AlertTriangle,
      border: "border-[#f59e0b]/40",
      bg: "bg-[#f59e0b]/10",
      text: "text-[#f59e0b]",
      titleColor: "text-[#e0e0ff]"
    },
    error: {
      icon: XCircle,
      border: "border-[#ef4444]/40",
      bg: "bg-[#ef4444]/10",
      text: "text-[#ef4444]",
      titleColor: "text-[#e0e0ff]"
    },
    info: {
      icon: Info,
      border: "border-[#00d9ff]/40",
      bg: "bg-[#00d9ff]/10",
      text: "text-[#00d9ff]",
      titleColor: "text-[#e0e0ff]"
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
        <p className="text-[#e0e0ff] leading-relaxed">{message}</p>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="text-[#8b8fb0] hover:text-[#e0e0ff] p-1 rounded-lg hover:bg-white/5 transition-colors"
          aria-label="Dismiss alert"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
