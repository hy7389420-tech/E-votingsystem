"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Bell, Menu, X, User, Search, ChevronDown, CheckCircle2 } from "lucide-react";

interface HeaderProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export default function Header({ onToggleSidebar, isSidebarOpen }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const notifications = [
    { id: 1, title: "National Elections 2026 Live", time: "10m ago", read: false },
    { id: 2, title: "Biometric Identity Confirmed", time: "1h ago", read: false },
    { id: 3, title: "Digital Ballot Receipt Synced", time: "1d ago", read: true },
  ];

  const searchResults = [
    { title: "National Lok Sabha Elections 2026", href: "/voting", type: "Active Election" },
    { title: "Rajesh Kumar Singh (PDA)", href: "/candidates", type: "Candidate" },
    { title: "Priya Sharma (NPP)", href: "/candidates", type: "Candidate" },
    { title: "Digital Voting Step-by-Step Guideline", href: "/guide", type: "Guideline" },
    { title: "Live Turnout & Results", href: "/results", type: "Analytics" },
  ].filter((item) =>
    searchQuery.trim() === ""
      ? false
      : item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header className="fixed top-0 left-0 right-0 h-[70px] glass-header z-50 px-4 md:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Brand Logo */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onToggleSidebar}
          className="p-2 text-[#A5AAD6] hover:text-[#EEF0FF] hover:bg-[#7C83FD]/15 rounded-xl transition-colors md:hidden border border-transparent hover:border-[#7C83FD]/30"
          aria-label="Toggle Navigation Sidebar"
        >
          {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#4B4FD8] to-[#7C83FD] p-[1.5px] flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_rgba(124,131,253,0.4)] transition-all">
            <div className="w-full h-full bg-[#14163A] rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#7C83FD] group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-wide bg-gradient-to-r from-[#EEF0FF] via-[#7C83FD] to-[#A5AAD6] bg-clip-text text-transparent">
                E-VOTING
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#7C83FD] bg-[#4B4FD8]/20 border border-[rgba(124,131,253,0.3)] rounded-full">
                SIH 2026
              </span>
            </div>
            <p className="text-[11px] text-[#A5AAD6]">Secure Digital Governance</p>
          </div>
        </Link>
      </div>

      {/* Middle: Top Bar Search Input */}
      <div className="flex-1 max-w-md relative hidden md:block">
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-[#A5AAD6] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            placeholder="Search elections, candidates, guidelines..."
            className="w-full pl-10 pr-12 py-2 text-xs rounded-xl glass-input placeholder-[#A5AAD6]/70 focus:ring-2 focus:ring-[#7C83FD]/40 transition-all"
          />
          <kbd className="absolute right-3 px-1.5 py-0.5 text-[10px] font-mono text-[#A5AAD6] bg-[#14163A]/80 border border-[rgba(124,131,253,0.25)] rounded">
            ⌘K
          </kbd>
        </div>

        {/* Live Search Quick Results Popover */}
        {isSearchFocused && searchQuery.trim() !== "" && (
          <div className="absolute left-0 right-0 top-full mt-2 glass-card rounded-2xl p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-150">
            {searchResults.length > 0 ? (
              <div className="space-y-1">
                {searchResults.map((result, idx) => (
                  <Link
                    key={idx}
                    href={result.href}
                    className="flex items-center justify-between px-3 py-2 text-xs rounded-xl hover:bg-[#7C83FD]/15 transition-colors"
                  >
                    <span className="text-[#EEF0FF] font-medium">{result.title}</span>
                    <span className="text-[10px] text-[#7C83FD] font-semibold px-2 py-0.5 rounded-md bg-[#4B4FD8]/20 border border-[rgba(124,131,253,0.25)]">
                      {result.type}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-3 text-xs text-[#A5AAD6] text-center">
                No matching elections or candidates found
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right: Notification Icon & User Avatar */}
      <div className="flex items-center gap-3">
        {/* Verification Status Pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] text-xs font-semibold">
          <CheckCircle2 size={14} className="animate-pulse" />
          <span>Verified Voter</span>
        </div>

        {/* Notification Icon & Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative p-2.5 text-[#A5AAD6] hover:text-[#EEF0FF] hover:bg-[#7C83FD]/15 rounded-xl border border-[rgba(124,131,253,0.25)] hover:border-[#7C83FD]/50 transition-all"
            aria-label="Notification Icon"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#7C83FD] rounded-full ring-2 ring-[#14163A] animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#4B4FD8] rounded-full ring-2 ring-[#14163A]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 glass-card rounded-2xl p-4 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-[rgba(124,131,253,0.25)]">
                <h4 className="font-semibold text-sm text-[#EEF0FF]">Notifications</h4>
                <span className="text-[11px] px-2 py-0.5 rounded-md bg-[#4B4FD8]/25 text-[#7C83FD] font-bold border border-[rgba(124,131,253,0.3)]">
                  3 New
                </span>
              </div>
              <div className="mt-3 space-y-2">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className={`p-2.5 rounded-xl border transition-all ${
                      item.read
                        ? "bg-[#14163A]/50 border-transparent text-[#A5AAD6]"
                        : "bg-[#4B4FD8]/15 border-[rgba(124,131,253,0.3)] text-[#EEF0FF]"
                    }`}
                  >
                    <div className="flex justify-between text-xs font-medium">
                      <span>{item.title}</span>
                      <span className="text-[10px] text-[#A5AAD6]">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2.5 p-1.5 md:px-3 md:py-1.5 rounded-xl bg-[rgba(26,29,74,0.65)] hover:bg-[rgba(35,39,95,0.85)] border border-[rgba(124,131,253,0.25)] hover:border-[#7C83FD]/50 transition-all"
            aria-label="User Avatar"
          >
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-[#4B4FD8] to-[#7C83FD] flex items-center justify-center font-bold text-xs text-[#EEF0FF] shadow-inner ring-2 ring-[rgba(124,131,253,0.3)]">
              HY
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-[#10B981] rounded-full ring-2 ring-[#14163A]" />
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-semibold text-[#EEF0FF]">Harsh Yadav</div>
              <div className="text-[10px] text-[#A5AAD6]">Verified Voter • ECE IV</div>
            </div>
            <ChevronDown size={14} className="text-[#A5AAD6] hidden sm:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-60 glass-card rounded-2xl p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-3 border-b border-[rgba(124,131,253,0.25)] mb-1">
                <p className="text-xs font-semibold text-[#EEF0FF]">Harsh Yadav</p>
                <p className="text-[11px] text-[#A5AAD6]">harsh.yadav@example.com</p>
              </div>

              <Link
                href="/profile"
                className="flex items-center gap-2.5 px-3 py-2 text-xs text-[#EEF0FF] hover:bg-[#7C83FD]/15 hover:text-[#7C83FD] rounded-xl transition-colors"
                onClick={() => setShowProfileMenu(false)}
              >
                <User size={15} /> My Profile
              </Link>
              <Link
                href="/security"
                className="flex items-center gap-2.5 px-3 py-2 text-xs text-[#EEF0FF] hover:bg-[#7C83FD]/15 hover:text-[#7C83FD] rounded-xl transition-colors"
                onClick={() => setShowProfileMenu(false)}
              >
                <ShieldCheck size={15} /> Security & Settings
              </Link>
              <Link
                href="/login"
                className="flex items-center gap-2.5 px-3 py-2 text-xs text-[#EF4444] hover:bg-[#EF4444]/15 rounded-xl transition-colors border-t border-[rgba(124,131,253,0.2)] mt-1"
                onClick={() => setShowProfileMenu(false)}
              >
                Log Out
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
