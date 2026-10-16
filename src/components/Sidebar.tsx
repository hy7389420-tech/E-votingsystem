"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Vote,
  BookOpen,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  BarChart3,
  Users,
  QrCode,
  IdCard,
  Camera,
  History,
  HelpCircle,
  Headphones,
  Lock,
  Radio
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [showMoreRoutes, setShowMoreRoutes] = useState(false);

  // Reference primary navigation: Dashboard, Vote, Vote Guideline, Settings, Logout
  const primaryNavItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Vote", href: "/voting", icon: Vote, badge: "Active" },
    { name: "Vote Guideline", href: "/guide", icon: BookOpen },
    { name: "Settings", href: "/security", icon: Settings },
  ];

  // Preserved auxiliary routes so no routes/features are removed
  const auxiliaryNavItems = [
    { name: "Active Elections", href: "/elections", icon: Radio },
    { name: "Candidates", href: "/candidates", icon: Users },
    { name: "Vote Receipt", href: "/receipt", icon: QrCode },
    { name: "Live Results", href: "/results", icon: BarChart3 },
    { name: "Aadhar Verification", href: "/aadhar-verify", icon: IdCard },
    { name: "Biometric Setup", href: "/biometric", icon: Camera },
    { name: "Voting History", href: "/voting-history", icon: History },
    { name: "FAQ", href: "/faq", icon: HelpCircle },
    { name: "Support Desk", href: "/support", icon: Headphones },
    { name: "Admin Panel", href: "/admin", icon: Lock },
  ];

  const isAuxActive = auxiliaryNavItems.some((item) => pathname === item.href);

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#14163A]/80 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-[70px] left-0 bottom-0 w-[270px] glass-sidebar z-40 flex flex-col justify-between transition-transform duration-300 ease-in-out border-r border-[rgba(124,131,253,0.25)] ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Main Navigation Section */}
          <div className="space-y-1.5">
            <h3 className="px-3 text-[11px] font-bold uppercase tracking-wider text-[#A5AAD6]">
              Menu
            </h3>

            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`relative flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-semibold transition-all group ${
                    isActive
                      ? "bg-gradient-to-r from-[#4B4FD8]/30 to-[#7C83FD]/20 text-[#EEF0FF] border border-[#7C83FD]/50 shadow-[0_0_20px_rgba(75,79,216,0.25)]"
                      : "text-[#A5AAD6] hover:text-[#EEF0FF] hover:bg-[rgba(124,131,253,0.12)] hover:border hover:border-[rgba(124,131,253,0.25)]"
                  }`}
                >
                  {/* Glowing Active Indicator */}
                  {isActive && (
                    <span className="absolute left-0 top-2.5 bottom-2.5 w-1.5 bg-[#7C83FD] rounded-r-full shadow-[0_0_12px_#7C83FD]" />
                  )}

                  <div className="flex items-center gap-3">
                    <Icon
                      size={19}
                      className={`transition-colors ${
                        isActive ? "text-[#7C83FD]" : "group-hover:text-[#EEF0FF]"
                      }`}
                    />
                    <span>{item.name}</span>
                  </div>

                  {item.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981] font-bold border border-[#10B981]/30">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Collapsible More Services Section (Ensures all 18 routes remain accessible) */}
          <div className="space-y-2 pt-2 border-t border-[rgba(124,131,253,0.15)]">
            <button
              onClick={() => setShowMoreRoutes(!showMoreRoutes)}
              className={`w-full flex items-center justify-between px-3 py-2 text-[11px] font-bold uppercase tracking-wider rounded-xl transition-colors ${
                isAuxActive
                  ? "text-[#7C83FD] bg-[#4B4FD8]/15"
                  : "text-[#A5AAD6] hover:text-[#EEF0FF] hover:bg-[rgba(124,131,253,0.08)]"
              }`}
            >
              <span className="flex items-center gap-1.5">
                More Services {isAuxActive && <span className="w-1.5 h-1.5 rounded-full bg-[#7C83FD]" />}
              </span>
              {showMoreRoutes || isAuxActive ? (
                <ChevronDown size={14} className="text-[#A5AAD6]" />
              ) : (
                <ChevronRight size={14} className="text-[#A5AAD6]" />
              )}
            </button>

            {(showMoreRoutes || isAuxActive) && (
              <div className="space-y-1 pl-1 animate-in fade-in slide-in-from-top-1 duration-150">
                {auxiliaryNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? "bg-[#4B4FD8]/25 text-[#EEF0FF] border border-[#7C83FD]/40 font-semibold"
                          : "text-[#A5AAD6] hover:text-[#EEF0FF] hover:bg-[rgba(124,131,253,0.08)]"
                      }`}
                    >
                      <Icon
                        size={15}
                        className={isActive ? "text-[#7C83FD]" : "text-[#A5AAD6]"}
                      />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer: Node Security Status & Logout */}
        <div className="p-4 border-t border-[rgba(124,131,253,0.25)] space-y-3 bg-[rgba(20,22,58,0.4)]">
          {/* Security Node Pill */}
          <div className="p-3 rounded-2xl bg-[rgba(26,29,74,0.7)] border border-[rgba(124,131,253,0.2)] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
              <div>
                <p className="text-[11px] font-semibold text-[#EEF0FF]">SHA-256 Node</p>
                <p className="text-[10px] text-[#A5AAD6]">IN-DEL-04 • Active</p>
              </div>
            </div>
          </div>

          {/* Reference Logout Item: Icon + Label */}
          <Link
            href="/login"
            onClick={onClose}
            className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-[#A5AAD6] hover:text-[#EF4444] hover:bg-[#EF4444]/15 border border-transparent hover:border-[#EF4444]/30 transition-all group"
          >
            <LogOut size={18} className="text-[#A5AAD6] group-hover:text-[#EF4444] transition-colors" />
            <span>Logout</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
