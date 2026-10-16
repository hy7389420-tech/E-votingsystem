"use client";

import React from "react";
import { AlertCircle } from "lucide-react";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  icon?: React.ElementType;
}

export default function FormInput({
  label,
  error,
  helperText,
  icon: Icon,
  className = "",
  id,
  ...props
}: FormInputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1.5 w-full">
      <label htmlFor={inputId} className="block text-xs font-semibold text-[#EEF0FF] tracking-wide">
        {label}
      </label>

      <div className="relative rounded-xl overflow-hidden">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A5AAD6]">
            <Icon size={18} />
          </div>
        )}

        <input
          id={inputId}
          className={`w-full glass-input px-3.5 py-2.5 rounded-xl text-sm transition-all ${
            Icon ? "pl-10" : ""
          } ${
            error
              ? "border-[#EF4444] focus:border-[#EF4444] shadow-[0_0_15px_rgba(239,68,68,0.25)]"
              : "border-[rgba(124,131,253,0.25)] focus:border-[#7C83FD]"
          } ${className}`}
          {...props}
        />
      </div>

      {error ? (
        <p className="flex items-center gap-1 text-[11px] text-[#EF4444] font-medium pt-0.5">
          <AlertCircle size={12} /> {error}
        </p>
      ) : helperText ? (
        <p className="text-[11px] text-[#A5AAD6] pt-0.5">{helperText}</p>
      ) : null}
    </div>
  );
}
