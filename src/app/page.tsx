import React from "react";
import Link from "next/link";
import { Vote, ShieldCheck, BarChart3, IdCard, Users, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="glass-card rounded-3xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#4ec9b0]/20 via-[#00d9ff]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4ec9b0]/15 border border-[#4ec9b0]/30 text-[#4ec9b0] text-xs font-semibold">
            <ShieldCheck size={14} /> SIH 2026 Smart Secure E-Voting Platform
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-[#e0e0ff]">
            Welcome to <span className="bg-gradient-to-r from-[#4ec9b0] via-[#00d9ff] to-[#7f8cff] bg-clip-text text-transparent">Digital Governance</span>
          </h1>
          <p className="text-sm md:text-base text-[#8b8fb0] leading-relaxed">
            Cast your vote securely using multi-factor identity verification, real-time SHA-256 digital QR receipt generation, and transparent live election analytics.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link href="/elections" className="glass-button-primary px-6 py-3 rounded-xl flex items-center gap-2 text-sm">
              <Vote size={18} /> Cast Your Vote <ArrowRight size={16} />
            </Link>
            <Link href="/results" className="glass-button-secondary px-6 py-3 rounded-xl flex items-center gap-2 text-sm">
              <BarChart3 size={18} /> View Live Results
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Active Elections", value: "3", sub: "1 National, 2 Regional", icon: Vote, color: "#4ec9b0" },
          { title: "Aadhar Status", value: "Verified", sub: "UIDAI Simulated ID", icon: IdCard, color: "#10b981" },
          { title: "Biometric Setup", value: "3 / 4", sub: "Face & Fingerprint Active", icon: ShieldCheck, color: "#00d9ff" },
          { title: "Total Turnout", value: "78.2%", sub: "8,456 Verified Votes", icon: Users, color: "#7f8cff" }
        ].map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="glass-card rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#8b8fb0]">{item.title}</span>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                  <Icon size={20} />
                </div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-[#e0e0ff]">{item.value}</div>
                <div className="text-[11px] text-[#8b8fb0] mt-1">{item.sub}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
