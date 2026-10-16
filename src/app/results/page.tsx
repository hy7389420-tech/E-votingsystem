"use client";

import React, { useState, useEffect } from "react";
import { BarChart3, TrendingUp, Users, Crown, RefreshCw, CheckCircle2, ShieldCheck, PieChart as PieIcon } from "lucide-react";
import StatCard from "@/components/StatCard";
import Button from "@/components/Button";
import { MOCK_CANDIDATES, MOCK_ACTIVITY_CHART } from "@/lib/mockData";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, LineChart, Line, XAxis, YAxis, BarChart, Bar } from "recharts";

export default function ResultsPage() {
  const [mounted, setMounted] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("Just now");
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(new Date().toLocaleTimeString());
    }, 600);
  };

  // Prepare Pie Chart Data
  const pieData = MOCK_CANDIDATES.map((c) => ({
    name: c.name,
    value: c.votes,
    color: c.partyColor
  }));

  // Sort candidate standings by votes descending
  const standings = [...MOCK_CANDIDATES].sort((a, b) => b.votes - a.votes);
  const totalVotes = standings.reduce((sum, c) => sum + c.votes, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card rounded-3xl p-6 md:p-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#7C83FD]">
            <BarChart3 size={16} /> Real-Time Cryptographic Vote Ledger Analytics
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-[#EEF0FF]">
            📊 Live Election Results
          </h1>
          <p className="text-xs text-[#A5AAD6]">
            Auditable, real-time vote tallies updated directly from verified polling nodes.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <span className="text-xs text-[#A5AAD6]">Updated: {lastUpdated}</span>
          <Button variant="outline" size="sm" icon={RefreshCw} isLoading={isRefreshing} onClick={handleRefresh}>
            Sync Tally
          </Button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Votes Recorded"
          value={totalVotes.toLocaleString('en-IN')}
          subtext="Verified SHA-256 Hashes"
          icon={BarChart3}
          iconColor="#7C83FD"
          trend={{ value: "+1,240 / hr", isPositive: true }}
        />
        <StatCard
          title="Voter Turnout"
          value="78.2%"
          subtext="664,780 of 847,934 Registered"
          icon={TrendingUp}
          iconColor="#10b981"
        />
        <StatCard
          title="Unique Voters"
          value="10,821"
          subtext="Biometric Verified"
          icon={Users}
          iconColor="#7C83FD"
        />
        <StatCard
          title="System Security"
          value="100% Valid"
          subtext="Zero Tamper Signatures"
          icon={ShieldCheck}
          iconColor="#4B4FD8"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart: Vote Distribution */}
        <div className="glass-card rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-[#EEF0FF] flex items-center gap-2">
                <PieIcon size={18} className="text-[#7C83FD]" /> Candidate Vote Share
              </h3>
              <p className="text-xs text-[#A5AAD6]">Percentage distribution by candidate</p>
            </div>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="#1A1D4A" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1A1D4A", borderColor: "#7C83FD", borderRadius: "12px", color: "#EEF0FF" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-xs text-[#A5AAD6]">Loading Chart...</div>
            )}
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#7C83FD]/15">
            {standings.map((c) => {
              const pct = ((c.votes / totalVotes) * 100).toFixed(1);
              return (
                <div key={c.id} className="flex items-center justify-between text-xs p-1.5 rounded-lg bg-[#14163A]/40">
                  <div className="flex items-center gap-2 truncate">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: c.partyColor }} />
                    <span className="text-[#EEF0FF] font-semibold truncate">{c.name}</span>
                  </div>
                  <span className="font-mono text-[#A5AAD6] shrink-0 ml-1">{pct}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Line Chart: Vote Activity Trend */}
        <div className="glass-card rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-[#EEF0FF] flex items-center gap-2">
                <TrendingUp size={18} className="text-[#7C83FD]" /> Voting Pace & Accumulation
              </h3>
              <p className="text-xs text-[#A5AAD6]">Cumulative votes cast throughout polling day</p>
            </div>
          </div>

          <div className="h-64 w-full">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={MOCK_ACTIVITY_CHART}>
                  <XAxis dataKey="time" stroke="#A5AAD6" fontSize={11} />
                  <YAxis stroke="#A5AAD6" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#1A1D4A", borderColor: "#7C83FD", borderRadius: "12px", color: "#EEF0FF" }}
                  />
                  <Line type="monotone" dataKey="votes" stroke="#7C83FD" strokeWidth={3} dot={{ fill: "#7C83FD", r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-xs text-[#A5AAD6]">Loading Chart...</div>
            )}
          </div>
        </div>
      </div>

      {/* Candidate Standings Table */}
      <div className="glass-card rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-[#EEF0FF]">Official Candidate Standings</h3>
          <span className="text-xs text-[#7C83FD] font-bold bg-[#7C83FD]/15 px-3 py-1 rounded-full border border-[#7C83FD]/30">
            Leader: {standings[0].name}
          </span>
        </div>

        <div className="overflow-x-auto -mx-2 px-2">
          <table className="w-full text-left text-xs text-[#EEF0FF] min-w-[560px]">
            <thead className="bg-[#14163A]/60 text-[#A5AAD6] uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3.5 rounded-l-xl">Rank</th>
                <th className="p-3.5">Candidate</th>
                <th className="p-3.5">Political Party</th>
                <th className="p-3.5">Total Votes</th>
                <th className="p-3.5">Share %</th>
                <th className="p-3.5 rounded-r-xl text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#7C83FD]/10">
              {standings.map((c, index) => {
                const pct = ((c.votes / totalVotes) * 100).toFixed(1);
                const isLeader = index === 0;

                return (
                  <tr key={c.id} className="hover:bg-[#1A1D4A]/60 transition-colors">
                    <td className="p-3.5 font-extrabold text-sm">
                      {isLeader ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/40 font-black">
                          #1
                        </span>
                      ) : (
                        <span className="text-[#A5AAD6] ml-2">#{index + 1}</span>
                      )}
                    </td>

                    <td className="p-3.5 font-bold text-[#EEF0FF] flex items-center gap-2">
                      <span className="text-xl">{c.photoEmoji}</span>
                      <span>{c.name}</span>
                    </td>

                    <td className="p-3.5">
                      <span
                        className="font-bold text-[11px] px-2.5 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${c.partyColor}15`,
                          borderColor: `${c.partyColor}40`,
                          color: c.partyColor,
                          borderWidth: "1px"
                        }}
                      >
                        {c.party}
                      </span>
                    </td>

                    <td className="p-3.5 font-bold font-mono text-[#EEF0FF]">{c.votes.toLocaleString('en-IN')}</td>

                    <td className="p-3.5 font-bold text-[#7C83FD]">{pct}%</td>

                    <td className="p-3.5 text-right">
                      {isLeader ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-1 rounded-full bg-[#f59e0b]/15 text-[#f59e0b] border border-[#f59e0b]/40 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                          <Crown size={12} /> LEADER
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-[#A5AAD6]">Runner-up</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
