"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Vote,
  Users,
  CheckSquare,
  QrCode,
  BarChart3,
  IdCard,
  Camera,
  BellRing,
  User,
  ShieldAlert,
  History,
  HelpCircle,
  BookOpen,
  Headphones,
  Lock,
  ChevronRight,
  LogOut
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  adminOnly?: boolean;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const navigationGroups: NavGroup[] = [
    {
      title: "Core Platform",
      items: [
        { name: "Dashboard", href: "/", icon: LayoutDashboard },
        { name: "Active Elections", href: "/elections", icon: Vote },
        { name: "Candidates", href: "/candidates", icon: Users },
        { name: "Cast Vote", href: "/voting", icon: CheckSquare },
        { name: "Vote Receipt", href: "/receipt", icon: QrCode },
        { name: "Live Results", href: "/results", icon: BarChart3 },
      ]
    },
    {
      title: "Voter Onboarding",
      items: [
        { name: "Aadhar Verification", href: "/aadhar-verify", icon: IdCard, badge: "Step 2" },
        { name: "Biometric Setup", href: "/biometric", icon: Camera, badge: "Step 3" },
        { name: "Preferences", href: "/notifications", icon: BellRing, badge: "Step 4" },
      ]
    },
    {
      title: "Account & Security",
      items: [
        { name: "My Profile", href: "/profile", icon: User },
        { name: "Security & 2FA", href: "/security", icon: ShieldAlert },
        { name: "Voting History", href: "/voting-history", icon: History },
      ]
    },
    {
      title: "Help & Admin",
      items: [
        { name: "FAQ", href: "/faq", icon: HelpCircle },
        { name: "Voter Guide", href: "/guide", icon: BookOpen },
        { name: "Support Desk", href: "/support", icon: Headphones },
        { name: "Admin Panel", href: "/admin", icon: Lock, adminOnly: true },
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#0a0e27]/80 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-[70px] left-0 bottom-0 w-[280px] glass-sidebar z-40 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {navigationGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-2">
              <h3 className="px-3 text-[11px] font-bold uppercase tracking-wider text-[#8b8fb0]">
                {group.title}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`relative flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                        isActive
                          ? "bg-gradient-to-r from-[#4ec9b0]/20 to-[#00d9ff]/10 text-[#4ec9b0] border border-[#4ec9b0]/30 shadow-[0_0_15px_rgba(78,201,176,0.15)]"
                          : "text-[#8b8fb0] hover:text-[#e0e0ff] hover:bg-[#141829] hover:border hover:border-[#4ec9b0]/15"
                      }`}
                    >
                      {/* Glowing Active Bar */}
                      {isActive && (
                        <span className="absolute left-0 top-2 bottom-2 w-1 bg-[#4ec9b0] rounded-r-full shadow-[0_0_10px_#4ec9b0]" />
                      )}

                      <div className="flex items-center gap-3">
                        <Icon
                          size={18}
                          className={`transition-colors ${
                            isActive ? "text-[#4ec9b0]" : "group-hover:text-[#4ec9b0]"
                          }`}
                        />
                        <span>{item.name}</span>
                      </div>

                      {item.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#7f8cff]/15 text-[#7f8cff] font-bold border border-[#7f8cff]/30">
                          {item.badge}
                        </span>
                      )}

                      {item.adminOnly && (
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#d946ef]/15 text-[#d946ef] font-bold border border-[#d946ef]/30">
                          Admin
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer / System Status */}
        <div className="p-4 border-t border-[#4ec9b0]/15">
          <div className="p-3 rounded-xl bg-[#141829]/80 border border-[#4ec9b0]/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
              <div>
                <p className="text-[11px] font-semibold text-[#e0e0ff]">Node #IN-DEL-04</p>
                <p className="text-[10px] text-[#10b981]">Encrypted & Active</p>
              </div>
            </div>
            <Link
              href="/login"
              className="p-1.5 text-[#8b8fb0] hover:text-[#ef4444] hover:bg-[#ef4444]/10 rounded-lg transition-colors"
              title="Sign Out"
            >
              <LogOut size={16} />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
