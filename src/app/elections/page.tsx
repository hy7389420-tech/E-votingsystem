"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Vote, Calendar, Users, BarChart3, CheckCircle2, ArrowRight, ShieldCheck, Filter } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";
import Button from "@/components/Button";
import { MOCK_ELECTIONS, Election } from "@/lib/mockData";

export default function ElectionsPage() {
  const [filter, setFilter] = useState<"ALL" | "ACTIVE" | "UPCOMING" | "COMPLETED">("ALL");

  const filteredElections = MOCK_ELECTIONS.filter((e) => {
    if (filter === "ALL") return true;
    return e.status === filter;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card rounded-3xl p-6 md:p-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#7C83FD]">
            <Vote size={16} /> Official Electoral Catalog
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-[#EEF0FF]">
            📋 Active & Upcoming Elections
          </h1>
          <p className="text-xs text-[#A5AAD6]">
            Select an active election to review candidates, inspect manifestos, and submit your vote.
          </p>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#14163A]/80 border border-[#7C83FD]/20 self-start md:self-auto">
          {(["ALL", "ACTIVE", "UPCOMING", "COMPLETED"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === tab
                  ? "bg-gradient-to-r from-[#7C83FD] to-[#7C83FD] text-[#14163A] shadow-[0_0_10px_rgba(124, 131, 253,0.4)]"
                  : "text-[#A5AAD6] hover:text-[#EEF0FF]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Elections List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredElections.map((election) => (
          <div
            key={election.id}
            className="glass-card rounded-3xl p-6 border border-[#7C83FD]/20 hover:border-[#7C83FD]/40 transition-all flex flex-col justify-between space-y-6 group"
          >
            {/* Top Info */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-[#4B4FD8]/15 text-[#4B4FD8] border border-[#4B4FD8]/30">
                  {election.type} Election
                </span>
                <span
                  className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                    election.status === "ACTIVE"
                      ? "bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                      : "bg-[#f59e0b]/15 text-[#f59e0b] border-[#f59e0b]/30"
                  }`}
                >
                  {election.status === "ACTIVE" ? "🟢 LIVE VOTING ACTIVE" : "⏳ UPCOMING"}
                </span>
              </div>

              <h2 className="text-xl font-bold text-[#EEF0FF] group-hover:text-[#7C83FD] transition-colors">
                {election.name}
              </h2>

              <p className="text-xs text-[#A5AAD6] leading-relaxed">{election.description}</p>

              {/* Date & Candidates Info */}
              <div className="grid grid-cols-2 gap-2 text-xs text-[#A5AAD6] bg-[#14163A]/50 p-3 rounded-2xl border border-[#7C83FD]/10">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-[#7C83FD]" />
                  <div>
                    <span className="block font-semibold text-[#EEF0FF]">{election.startDate}</span>
                    <span className="text-[10px]">Start Date</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-[#7C83FD]" />
                  <div>
                    <span className="block font-semibold text-[#EEF0FF]">{election.candidatesCount} Candidates</span>
                    <span className="text-[10px]">Registered</span>
                  </div>
                </div>
              </div>

              {/* Turnout Bar */}
              {election.status === "ACTIVE" && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-[#A5AAD6]">Voter Turnout</span>
                    <span className="text-[#10b981]">{election.turnoutPercentage}% ({election.totalVotesCast.toLocaleString('en-IN')} Votes)</span>
                  </div>
                  <div className="w-full h-2 bg-[#14163A] rounded-full overflow-hidden border border-[#10b981]/20">
                    <div
                      className="h-full bg-gradient-to-r from-[#10b981] to-[#7C83FD] rounded-full shadow-[0_0_8px_#10b981]"
                      style={{ width: `${election.turnoutPercentage}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#7C83FD]/15 flex items-center justify-between gap-3">
              <Link href="/candidates" className="flex-1">
                <Button variant="secondary" fullWidth size="sm" icon={Users}>
                  View Candidates
                </Button>
              </Link>

              {election.status === "ACTIVE" ? (
                <Link href="/voting" className="flex-1">
                  <Button variant="primary" fullWidth size="sm" icon={ArrowRight}>
                    Vote Now
                  </Button>
                </Link>
              ) : (
                <Button variant="ghost" fullWidth size="sm" disabled>
                  Coming Soon
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
