"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Bell, Menu, X, User, CheckCircle2, ChevronDown, Sparkles } from "lucide-react";

interface HeaderProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export default function Header({ onToggleSidebar, isSidebarOpen }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    { id: 1, title: "National Elections 2026 Active", time: "10m ago", read: false },
    { id: 2, title: "Aadhar Verification Successful", time: "1h ago", read: false },
    { id: 3, title: "Biometric Data Recorded", time: "1d ago", read: true },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-[70px] glass-header z-50 px-4 md:px-6 flex items-center justify-between">
      {/* Left: Mobile Toggle & Brand Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 text-[#8b8fb0] hover:text-[#4ec9b0] hover:bg-[#141829] rounded-lg transition-colors md:hidden"
          aria-label="Toggle Navigation Sidebar"
        >
          {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#4ec9b0] via-[#00d9ff] to-[#7f8cff] p-[1.5px] flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_rgba(78,201,176,0.4)] transition-all">
            <div className="w-full h-full bg-[#0a0e27] rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#4ec9b0] group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-wide bg-gradient-to-r from-[#e0e0ff] via-[#4ec9b0] to-[#00d9ff] bg-clip-text text-transparent">
                E-VOTING INDIA
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#4ec9b0] bg-[#4ec9b0]/10 border border-[#4ec9b0]/30 rounded-full">
                SIH 2026
              </span>
            </div>
            <p className="text-[11px] text-[#8b8fb0] hidden sm:block">Smart Secure Digital Governance</p>
          </div>
        </Link>
      </div>

      {/* Right: Status Pill, Notifications & User Avatar */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Verification Status Pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981] text-xs font-semibold">
          <CheckCircle2 size={14} className="animate-pulse" />
          <span>Aadhar Verified</span>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative p-2 text-[#8b8fb0] hover:text-[#e0e0ff] hover:bg-[#141829] rounded-xl border border-transparent hover:border-[#4ec9b0]/20 transition-all"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#4ec9b0] rounded-full ring-2 ring-[#0a0e27] animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#4ec9b0] rounded-full ring-2 ring-[#0a0e27]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 glass-card rounded-2xl p-4 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-[#4ec9b0]/15">
                <h4 className="font-semibold text-sm text-[#e0e0ff]">Notifications</h4>
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#4ec9b0]/10 text-[#4ec9b0]">3 New</span>
              </div>
              <div className="mt-3 space-y-2.5">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className={`p-2.5 rounded-xl border transition-all ${
                      item.read
                        ? "bg-[#141829]/50 border-transparent text-[#8b8fb0]"
                        : "bg-[#4ec9b0]/5 border-[#4ec9b0]/20 text-[#e0e0ff]"
                    }`}
                  >
                    <div className="flex justify-between text-xs font-medium">
                      <span>{item.title}</span>
                      <span className="text-[10px] text-[#8b8fb0]">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2.5 p-1.5 md:px-3 md:py-1.5 rounded-xl bg-[#141829] hover:bg-[#1c223a] border border-[#4ec9b0]/20 transition-all"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#7f8cff] to-[#4ec9b0] flex items-center justify-center font-bold text-xs text-[#0a0e27]">
              HY
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-semibold text-[#e0e0ff]">Harsh Yadav</div>
              <div className="text-[10px] text-[#4ec9b0]">Voter • ECE IV</div>
            </div>
            <ChevronDown size={14} className="text-[#8b8fb0] hidden sm:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-60 glass-card rounded-2xl p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-3 border-b border-[#4ec9b0]/15 mb-1">
                <p className="text-xs font-semibold text-[#e0e0ff]">Harsh Yadav</p>
                <p className="text-[11px] text-[#8b8fb0]">harsh.yadav@example.com</p>
                <div className="mt-2 flex items-center gap-1.5 text-[10px] text-[#10b981] font-semibold">
                  <Sparkles size={12} /> Eligible Voter Status Active
                </div>
              </div>

              <Link
                href="/profile"
                className="flex items-center gap-2.5 px-3 py-2 text-xs text-[#e0e0ff] hover:bg-[#4ec9b0]/10 hover:text-[#4ec9b0] rounded-xl transition-colors"
                onClick={() => setShowProfileMenu(false)}
              >
                <User size={15} /> My Profile
              </Link>
              <Link
                href="/security"
                className="flex items-center gap-2.5 px-3 py-2 text-xs text-[#e0e0ff] hover:bg-[#4ec9b0]/10 hover:text-[#4ec9b0] rounded-xl transition-colors"
                onClick={() => setShowProfileMenu(false)}
              >
                <ShieldCheck size={15} /> Security & 2FA
              </Link>
              <Link
                href="/login"
                className="flex items-center gap-2.5 px-3 py-2 text-xs text-[#ef4444] hover:bg-[#ef4444]/10 rounded-xl transition-colors border-t border-[#4ec9b0]/10 mt-1"
                onClick={() => setShowProfileMenu(false)}
              >
                Sign Out
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
