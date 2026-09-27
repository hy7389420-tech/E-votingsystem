"use client";

import React from "react";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: React.ElementType;
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  icon: Icon,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";

  const variants = {
    primary: "glass-button-primary",
    secondary: "glass-button-secondary",
    ghost: "bg-transparent hover:bg-[#141829] text-[#e0e0ff] hover:text-[#4ec9b0] border border-transparent hover:border-[#4ec9b0]/20",
    danger: "bg-gradient-to-r from-[#ef4444] to-[#dc2626] text-white shadow-[0_4px_15px_rgba(239,68,68,0.3)] hover:shadow-[0_6px_20px_rgba(239,68,68,0.5)] hover:-translate-y-0.5",
    outline: "bg-transparent border border-[#4ec9b0]/40 text-[#4ec9b0] hover:bg-[#4ec9b0]/10 hover:border-[#4ec9b0]"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-2.5"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="animate-spin text-current" size={size === "sm" ? 14 : size === "lg" ? 20 : 16} />
      ) : Icon ? (
        <Icon size={size === "sm" ? 14 : size === "lg" ? 20 : 16} />
      ) : null}
      <span>{children}</span>
    </button>
  );
}
