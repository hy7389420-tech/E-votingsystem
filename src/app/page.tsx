"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Vote,
  ShieldCheck,
  BarChart3,
  Users,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Clock,
  Radio,
  FileCheck,
  Check
} from "lucide-react";
import StatCard from "@/components/StatCard";
import Button from "@/components/Button";
import CandidateCard from "@/components/CandidateCard";
import Modal from "@/components/Modal";
import { MOCK_CANDIDATES, Candidate } from "@/lib/mockData";
import { useAuth } from "@/hooks/useAuth";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

export default function Home() {
  const { user } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isVoteConfirmed, setIsVoteConfirmed] = useState(false);
  const [hasVotedFor, setHasVotedFor] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Recharts Data & Colors (#4B4FD8, #7C83FD, #A5AAD6)
  const candidateVoteResults = [
    { name: "R. Singh (PDA)", votes: 32450, fill: "#4B4FD8" },
    { name: "P. Sharma (NPP)", votes: 28910, fill: "#7C83FD" },
    { name: "A. Patel (SVP)", votes: 21540, fill: "#A5AAD6" },
    { name: "V. Verma (IND)", votes: 18230, fill: "#7C83FD" },
  ];

  const votingProcessData = [
    { name: "Completed Votes", value: 664780, percentage: "78.4%", color: "#4B4FD8" },
    { name: "Verified / In-Process", value: 102400, percentage: "12.1%", color: "#7C83FD" },
    { name: "Pending Ballots", value: 80754, percentage: "9.5%", color: "#A5AAD6" },
  ];

  const handleCastVote = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
  };

  const confirmVote = () => {
    if (selectedCandidate) {
      setHasVotedFor(selectedCandidate.id);
      setIsVoteConfirmed(true);
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* 1. ONGOING ELECTION CARD */}
      <section className="glass-card rounded-3xl p-6 md:p-8 relative overflow-hidden border border-[rgba(124,131,253,0.35)] shadow-2xl">
        {/* Ambient Radial Gradient Glow */}
        <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-gradient-to-bl from-[#4B4FD8]/30 via-[#7C83FD]/20 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-4xl">
          {/* Header Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981]/15 text-[#10B981] text-xs font-bold border border-[#10B981]/30">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              LIVE ONGOING ELECTION
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4B4FD8]/25 text-[#EEF0FF] text-xs font-semibold border border-[rgba(124,131,253,0.35)]">
              <Radio size={14} className="text-[#7C83FD]" /> Parliamentary General Assembly
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgba(124,131,253,0.15)] text-[#A5AAD6] text-xs font-medium border border-[rgba(124,131,253,0.25)]">
              <Clock size={14} /> Ends in 2 Days, 4 Hours
            </span>
          </div>

          {/* Title & Voter Salutation */}
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#EEF0FF]">
              National Lok Sabha Elections 2026
            </h1>
            <p className="text-xs sm:text-sm text-[#A5AAD6] mt-2 leading-relaxed max-w-2xl">
              Cast your digital ballot securely via your verified Aadhar & biometric credentials.
              Your vote is cryptographically secured with SHA-256 end-to-end receipt verification.
            </p>
          </div>

          {/* Key Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-2xl bg-[#14163A]/80 border border-[rgba(124,131,253,0.2)]">
              <span className="text-[10px] uppercase font-bold text-[#A5AAD6] tracking-wider block">Turnout</span>
              <span className="text-lg font-black text-[#EEF0FF]">78.4%</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#14163A]/80 border border-[rgba(124,131,253,0.2)]">
              <span className="text-[10px] uppercase font-bold text-[#A5AAD6] tracking-wider block">Votes Cast</span>
              <span className="text-lg font-black text-[#7C83FD]">664,780</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#14163A]/80 border border-[rgba(124,131,253,0.2)]">
              <span className="text-[10px] uppercase font-bold text-[#A5AAD6] tracking-wider block">Candidates</span>
              <span className="text-lg font-black text-[#EEF0FF]">4 Verified</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#14163A]/80 border border-[rgba(124,131,253,0.2)]">
              <span className="text-[10px] uppercase font-bold text-[#A5AAD6] tracking-wider block">Status</span>
              <span className="text-lg font-black text-[#10B981]">Eligible</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href="/voting">
              <Button variant="primary" size="md" icon={Vote}>
                Cast Your Vote Now
              </Button>
            </Link>
            <Link href="/guide">
              <Button variant="secondary" size="md">
                Vote Guidelines
              </Button>
            </Link>
            <Link href="/results">
              <Button variant="outline" size="md" icon={BarChart3}>
                Live Results
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SUMMARY STATS GRID */}
      <section className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#A5AAD6]">
          Election Summary Statistics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Votes Cast"
            value="664,780"
            subtext="+14.2% pace vs previous cycle"
            icon={Vote}
            iconColor="#4B4FD8"
            trend={{ value: "+14.2%", isPositive: true }}
          />
          <StatCard
            title="Registered Voters"
            value="847,934"
            subtext="UIDAI Aadhaar Verified"
            icon={Users}
            iconColor="#7C83FD"
          />
          <StatCard
            title="Voter Turnout Rate"
            value="78.4%"
            subtext="Exceeds National Benchmark"
            icon={TrendingUp}
            iconColor="#10B981"
            trend={{ value: "+6.8%", isPositive: true }}
          />
          <StatCard
            title="Cryptographic Ledger"
            value="99.99%"
            subtext="SHA-256 Tamper Proof Node"
            icon={ShieldCheck}
            iconColor="#7C83FD"
            trend={{ value: "Secure", isPositive: true }}
          />
        </div>
      </section>

      {/* 3. CHARTS GRID: VOTE RESULTS BAR CHART & VOTING PROCESS DONUT CHART */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Vote Results Bar Chart (7 cols on lg) */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 space-y-4 border border-[rgba(124,131,253,0.25)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-base text-[#EEF0FF] flex items-center gap-2">
                <BarChart3 size={18} className="text-[#7C83FD]" /> Vote Results
              </h3>
              <p className="text-xs text-[#A5AAD6]">Candidate ballot distribution (Live tallies)</p>
            </div>
            <span className="text-[11px] font-bold text-[#7C83FD] bg-[#4B4FD8]/20 px-2.5 py-1 rounded-full border border-[rgba(124,131,253,0.3)]">
              Live Feed
            </span>
          </div>

          <div className="h-64 w-full pt-2">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={candidateVoteResults} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <XAxis
                    dataKey="name"
                    stroke="#A5AAD6"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: "rgba(124,131,253,0.25)" }}
                  />
                  <YAxis
                    stroke="#A5AAD6"
                    fontSize={11}
                    tickLine={false}
                    axisLine={{ stroke: "rgba(124,131,253,0.25)" }}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(124,131,253,0.08)" }}
                    contentStyle={{
                      backgroundColor: "#14163A",
                      borderColor: "rgba(124,131,253,0.4)",
                      borderRadius: "14px",
                      color: "#EEF0FF",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.5)"
                    }}
                  />
                  <Bar dataKey="votes" radius={[8, 8, 0, 0]}>
                    {candidateVoteResults.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-[#A5AAD6]">
                Loading Results Analytics...
              </div>
            )}
          </div>

          <div className="flex items-center justify-around pt-2 border-t border-[rgba(124,131,253,0.15)] text-[11px] text-[#A5AAD6]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4B4FD8]" /> Leading: PDA (32.4K)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7C83FD]" /> Runner-up: NPP (28.9K)
            </span>
          </div>
        </div>

        {/* Voting Process Donut Chart (5 cols on lg) */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 space-y-4 border border-[rgba(124,131,253,0.25)] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-base text-[#EEF0FF] flex items-center gap-2">
                <Radio size={18} className="text-[#4B4FD8]" /> Voting Process
              </h3>
              <p className="text-xs text-[#A5AAD6]">Turnout stages & participation breakdown</p>
            </div>
            <span className="text-[11px] font-bold text-[#10B981] bg-[#10B981]/15 px-2.5 py-1 rounded-full border border-[#10B981]/30">
              78.4% Done
            </span>
          </div>

          {/* Donut Chart Container with Center Metric */}
          <div className="relative h-56 w-full flex items-center justify-center">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={votingProcessData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {votingProcessData.map((entry, index) => (
                      <Cell key={`donut-${index}`} fill={entry.color} stroke="transparent" />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#14163A",
                      borderColor: "rgba(124,131,253,0.4)",
                      borderRadius: "14px",
                      color: "#EEF0FF"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-xs text-[#A5AAD6]">Loading Process Chart...</div>
            )}

            {/* Donut Center Turnout Badge */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-[#EEF0FF]">78.4%</span>
              <span className="text-[10px] uppercase font-bold text-[#A5AAD6] tracking-wider">Turnout</span>
            </div>
          </div>

          {/* Donut Legend */}
          <div className="space-y-2 pt-2 border-t border-[rgba(124,131,253,0.15)]">
            {votingProcessData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[#EEF0FF]">{item.name}</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-[#A5AAD6]">{item.value.toLocaleString('en-IN')}</span>
                  <span className="font-bold text-[#EEF0FF]" style={{ color: item.color }}>{item.percentage}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CANDIDATE CARDS (Circular photo, name, Vote button) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-[#EEF0FF] tracking-tight">
              Election Candidates
            </h2>
            <p className="text-xs text-[#A5AAD6]">
              Review verified candidates and cast your ballot for the National Assembly
            </p>
          </div>
          <Link
            href="/candidates"
            className="text-xs font-bold text-[#7C83FD] hover:text-[#EEF0FF] flex items-center gap-1 transition-colors"
          >
            View All Candidates <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_CANDIDATES.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              onSelectVote={handleCastVote}
              isVoted={hasVotedFor === candidate.id}
            />
          ))}
        </div>
      </section>

      {/* Vote Confirmation Modal */}
      <Modal
        isOpen={selectedCandidate !== null && !isVoteConfirmed}
        onClose={() => setSelectedCandidate(null)}
        title="Confirm Your Vote"
        maxWidth="md"
        footer={
          <div className="flex items-center justify-between w-full">
            <Button variant="ghost" size="sm" onClick={() => setSelectedCandidate(null)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={confirmVote} icon={Check}>
              Confirm & Submit Vote
            </Button>
          </div>
        }
      >
        {selectedCandidate && (
          <div className="space-y-4 text-xs text-[#EEF0FF]">
            <p className="text-[#A5AAD6]">
              You are about to cast your official democratic ballot for:
            </p>
            <div className="p-4 rounded-2xl bg-[#14163A] border border-[rgba(124,131,253,0.3)] flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#4B4FD8]/20 border border-[#7C83FD]/50 flex items-center justify-center text-2xl">
                {selectedCandidate.photoEmoji}
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#EEF0FF]">{selectedCandidate.name}</h4>
                <p className="text-xs font-semibold text-[#7C83FD]">{selectedCandidate.party}</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#4B4FD8]/10 border border-[rgba(124,131,253,0.2)] text-[11px] text-[#A5AAD6] space-y-1">
              <p>• Your vote is cryptographically encrypted with SHA-256 hash.</p>
              <p>• Once cast, this choice cannot be modified or re-voted.</p>
            </div>
          </div>
        )}
      </Modal>

      {/* Vote Success Notification Modal */}
      <Modal
        isOpen={isVoteConfirmed}
        onClose={() => {
          setIsVoteConfirmed(false);
          setSelectedCandidate(null);
        }}
        title="Vote Cast Successfully!"
        maxWidth="md"
        footer={
          <div className="flex items-center justify-end gap-3 w-full">
            <Link href="/receipt">
              <Button variant="primary" size="sm" icon={FileCheck}>
                View Digital QR Receipt
              </Button>
            </Link>
          </div>
        }
      >
        <div className="space-y-4 text-center py-2">
          <div className="w-14 h-14 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 mx-auto flex items-center justify-center text-[#10B981]">
            <CheckCircle2 size={32} />
          </div>
          <div className="space-y-1">
            <h4 className="font-extrabold text-base text-[#EEF0FF]">
              Thank You for Voting, {user?.name || "Harsh Yadav"}!
            </h4>
            <p className="text-xs text-[#A5AAD6]">
              Your vote for {selectedCandidate?.name} has been recorded on SHA-256 node IN-DEL-04.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
