"use client";

import React, { useState, useEffect } from "react";
import {
  Users, BarChart3, Shield, Activity, RefreshCw, Settings,
  TrendingUp, CheckCircle2, AlertTriangle, Server, Database,
  Crown, Eye, ChevronDown
} from "lucide-react";
import StatCard from "@/components/StatCard";
import Alert from "@/components/Alert";
import Button from "@/components/Button";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const USER_GROWTH_DATA = [
  { week: "Week 1", users: 8200 },
  { week: "Week 2", users: 15600 },
  { week: "Week 3", users: 28900 },
  { week: "Week 4", users: 38400 },
  { week: "Week 5", users: 45823 },
];

const ELECTION_PERFORMANCE_DATA = [
  { election: "National 2026", votes: 664780, turnout: 78.4, color: "#7C83FD" },
  { election: "Municipal 2026", votes: 138030, turnout: 64.2, color: "#4B4FD8" },
  { election: "Student Council", votes: 0, turnout: 0, color: "#f59e0b" },
];

const MOCK_USERS = [
  { id: "USR-001234", name: "Harsh Yadav", email: "harsh@example.com", role: "ADMIN", status: "ACTIVE", votes: 1, lastActive: "Just now" },
  { id: "USR-002345", name: "Priya Mehta", email: "priya@example.com", role: "VOTER", status: "ACTIVE", votes: 2, lastActive: "5 min ago" },
  { id: "USR-003456", name: "Amit Shah", email: "amit@example.com", role: "VOTER", status: "ACTIVE", votes: 1, lastActive: "1 hour ago" },
  { id: "USR-004567", name: "Neha Gupta", email: "neha@example.com", role: "VOTER", status: "PENDING", votes: 0, lastActive: "3 hours ago" },
  { id: "USR-005678", name: "Ravi Kumar", email: "ravi@example.com", role: "VOTER", status: "ACTIVE", votes: 3, lastActive: "Yesterday" },
  { id: "USR-006789", name: "Sakshi Joshi", email: "sakshi@example.com", role: "VOTER", status: "SUSPENDED", votes: 0, lastActive: "2 days ago" },
];

const SYSTEM_HEALTH = [
  { label: "API Gateway", status: "OPERATIONAL", value: "99.99%", color: "#10b981" },
  { label: "Vote Ledger DB", status: "OPERATIONAL", value: "100%", color: "#10b981" },
  { label: "Auth Service", status: "OPERATIONAL", value: "99.97%", color: "#10b981" },
  { label: "Biometric Engine", status: "DEGRADED", value: "94.2%", color: "#f59e0b" },
  { label: "QR Receipt CDN", status: "OPERATIONAL", value: "99.98%", color: "#10b981" },
  { label: "WebSocket Feed", status: "OPERATIONAL", value: "99.95%", color: "#10b981" },
];

const roleColors: Record<string, string> = {
  ADMIN: "bg-[#d946ef]/15 text-[#d946ef] border-[#d946ef]/30",
  VOTER: "bg-[#4B4FD8]/15 text-[#4B4FD8] border-[#4B4FD8]/30",
};

const statusColors: Record<string, string> = {
  ACTIVE: "bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30",
  PENDING: "bg-[#f59e0b]/15 text-[#f59e0b] border-[#f59e0b]/30",
  SUSPENDED: "bg-[#ef4444]/15 text-[#ef4444] border-[#ef4444]/30",
};

// ─── Custom Tooltip ──────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-xl px-3 py-2 border border-[#7C83FD]/20 text-xs">
        <p className="text-[#A5AAD6] mb-1">{label}</p>
        {payload.map((p, i) => (
          <p key={i} className="font-bold" style={{ color: p.color }}>
            {p.name}: {typeof p.value === "number" && p.value > 1000 ? p.value.toLocaleString('en-IN') : p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ─── Component ───────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [lastSync, setLastSync] = useState("Just now");

  useEffect(() => { setMounted(true); }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastSync(new Date().toLocaleTimeString());
    }, 800);
  };

  const filteredUsers = MOCK_USERS.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.id.toLowerCase().includes(userSearch.toLowerCase());
    const matchRole = roleFilter === "ALL" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const degradedServices = SYSTEM_HEALTH.filter((s) => s.status !== "OPERATIONAL").length;

  return (
    <div className="space-y-6">
      {/* ── Page Header ── */}
      <div className="glass-card rounded-3xl p-6 md:p-8 border border-[#d946ef]/20">
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d946ef]/20 to-[#4B4FD8]/20 border border-[#d946ef]/30 flex items-center justify-center">
              <Crown size={28} className="text-[#d946ef]" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#d946ef] mb-1">
                <Shield size={12} /> ADMIN ACCESS — PRIVILEGED
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-[#EEF0FF]">
                Admin Control Panel
              </h1>
              <p className="text-xs text-[#A5AAD6] mt-1">
                Platform oversight, user management & system monitoring
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <span className="text-xs text-[#A5AAD6]">Synced: {lastSync}</span>
            <Button variant="outline" size="sm" icon={RefreshCw} isLoading={isRefreshing} onClick={handleRefresh}>
              Refresh
            </Button>
            <Button variant="ghost" size="sm" icon={Settings}>
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* ── Degraded Alert ── */}
      {degradedServices > 0 && (
        <Alert
          type="warning"
          message={`${degradedServices} system service(s) showing degraded performance. Check the System Health panel below.`}
        />
      )}

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Registered Users"
          value="45,823"
          subtext="+1,240 this week"
          icon={Users}
          iconColor="#7C83FD"
          trend={{ value: "+2.8%", isPositive: true }}
        />
        <StatCard
          title="Active Elections"
          value="3"
          subtext="2 Active • 1 Upcoming"
          icon={BarChart3}
          iconColor="#4B4FD8"
          trend={{ value: "+1", isPositive: true }}
        />
        <StatCard
          title="Total Votes Cast"
          value="142,567"
          subtext="Across all elections"
          icon={TrendingUp}
          iconColor="#10b981"
          trend={{ value: "+12.4%", isPositive: true }}
        />
        <StatCard
          title="System Health"
          value="99.99%"
          subtext="1 service degraded"
          icon={Activity}
          iconColor="#d946ef"
          trend={{ value: "SLA Met", isPositive: true }}
        />
      </div>

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* User Growth Line Chart */}
        <div className="glass-card rounded-2xl p-5 border border-[#7C83FD]/15">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-[#EEF0FF] flex items-center gap-2">
                <Users size={14} className="text-[#7C83FD]" />
                User Growth Trend
              </h3>
              <p className="text-[10px] text-[#A5AAD6] mt-0.5">Registered users over 5 weeks</p>
            </div>
            <span className="text-xs font-bold text-[#10b981] px-2 py-1 rounded-full bg-[#10b981]/10 border border-[#10b981]/20">
              ↑ 45.8K
            </span>
          </div>
          {mounted ? (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={USER_GROWTH_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(124, 131, 253,0.08)" />
                <XAxis dataKey="week" tick={{ fontSize: 10, fill: "#A5AAD6" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#A5AAD6" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone" dataKey="users" name="Users"
                  stroke="#7C83FD" strokeWidth={2.5}
                  dot={{ fill: "#7C83FD", strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 6, fill: "#7C83FD", stroke: "#14163A", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-[#5c6280] text-xs">Loading chart...</div>
          )}
        </div>

        {/* Election Performance Bar Chart */}
        <div className="glass-card rounded-2xl p-5 border border-[#4B4FD8]/15">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-[#EEF0FF] flex items-center gap-2">
                <BarChart3 size={14} className="text-[#4B4FD8]" />
                Election Performance
              </h3>
              <p className="text-[10px] text-[#A5AAD6] mt-0.5">Votes cast per election</p>
            </div>
            <span className="text-xs font-bold text-[#4B4FD8] px-2 py-1 rounded-full bg-[#4B4FD8]/10 border border-[#4B4FD8]/20">
              3 Elections
            </span>
          </div>
          {mounted ? (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={ELECTION_PERFORMANCE_DATA} barSize={36}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(75, 79, 216,0.08)" />
                <XAxis dataKey="election" tick={{ fontSize: 9, fill: "#A5AAD6" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 9, fill: "#A5AAD6" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="votes" name="Votes" fill="#4B4FD8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-[#5c6280] text-xs">Loading chart...</div>
          )}
        </div>
      </div>

      {/* ── User Management Table ── */}
      <div className="glass-card rounded-2xl border border-[#7C83FD]/15 overflow-hidden">
        {/* Table Header */}
        <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#7C83FD]/10">
          <h3 className="font-bold text-sm text-[#EEF0FF] flex items-center gap-2">
            <Users size={14} className="text-[#7C83FD]" />
            User Management
            <span className="text-[10px] text-[#A5AAD6] font-normal ml-1">({filteredUsers.length} shown)</span>
          </h3>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="glass-input rounded-xl px-3 py-2 text-xs w-40 focus:outline-none"
              />
            </div>
            {/* Role Filter */}
            <div className="relative">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="glass-input rounded-xl px-3 py-2 text-xs focus:outline-none appearance-none pr-7 cursor-pointer"
              >
                <option value="ALL" className="bg-[#1A1D4A]">All Roles</option>
                <option value="ADMIN" className="bg-[#1A1D4A]">Admin</option>
                <option value="VOTER" className="bg-[#1A1D4A]">Voter</option>
              </select>
              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#A5AAD6] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {/* Mobile Cards (xs) */}
          <div className="sm:hidden p-4 space-y-3">
            {filteredUsers.map((u) => (
              <div key={u.id} className="p-3 rounded-xl bg-[#14163A]/60 border border-[#7C83FD]/10 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-xs text-[#EEF0FF]">{u.name}</span>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${statusColors[u.status]}`}>{u.status}</span>
                </div>
                <p className="text-[10px] text-[#A5AAD6]">{u.email}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${roleColors[u.role]}`}>{u.role}</span>
                  <span className="text-[10px] text-[#A5AAD6] font-mono">{u.id}</span>
                  <span className="text-[10px] text-[#7C83FD] font-black">{u.votes} votes</span>
                </div>
              </div>
            ))}
            {filteredUsers.length === 0 && (
              <p className="text-center text-xs text-[#A5AAD6] py-6">No users match your search criteria.</p>
            )}
          </div>

          {/* Desktop Table (sm+) */}
          <table className="hidden sm:table w-full text-xs min-w-[760px]">
            <thead>
              <tr className="border-b border-[#7C83FD]/10">
                {["User ID", "Name", "Email", "Role", "Status", "Votes", "Last Active", "Actions"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] font-bold text-[#5c6280] uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u, i) => (
                <tr
                  key={u.id}
                  className={`border-b border-[#7C83FD]/05 hover:bg-[#7C83FD]/03 transition-colors ${
                    i % 2 === 0 ? "bg-transparent" : "bg-[#14163A]/20"
                  }`}
                >
                  <td className="px-4 py-3 font-mono text-[10px] text-[#A5AAD6]">{u.id}</td>
                  <td className="px-4 py-3 font-bold text-[#EEF0FF] whitespace-nowrap">{u.name}</td>
                  <td className="px-4 py-3 text-[#A5AAD6] whitespace-nowrap">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${roleColors[u.role]}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${statusColors[u.status]}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-black text-[#7C83FD]">{u.votes}</span>
                  </td>
                  <td className="px-4 py-3 text-[#A5AAD6] whitespace-nowrap">{u.lastActive}</td>
                  <td className="px-4 py-3">
                    <button className="text-[#4B4FD8] hover:text-[#EEF0FF] transition-colors p-1 rounded-lg hover:bg-[#4B4FD8]/10">
                      <Eye size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredUsers.length === 0 && (
            <div className="hidden sm:block py-10 text-center text-[#A5AAD6] text-xs">
              No users match your search criteria.
            </div>
          )}
        </div>
      </div>

      {/* ── System Health ── */}
      <div className="glass-card rounded-2xl p-5 border border-[#10b981]/15">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-sm text-[#EEF0FF] flex items-center gap-2">
            <Server size={14} className="text-[#10b981]" />
            System Health Monitor
          </h3>
          <div className="flex items-center gap-2 text-[10px] text-[#A5AAD6]">
            <Database size={12} />
            Overall SLA: <span className="text-[#10b981] font-bold ml-1">99.99%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SYSTEM_HEALTH.map((service) => (
            <div
              key={service.label}
              className="p-3 rounded-xl bg-[#14163A]/60 border flex items-center justify-between"
              style={{ borderColor: `${service.color}25` }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: service.color, boxShadow: `0 0 6px ${service.color}` }}
                />
                <span className="text-xs font-semibold text-[#EEF0FF]">{service.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xs" style={{ color: service.color }}>{service.value}</span>
                {service.status === "OPERATIONAL" ? (
                  <CheckCircle2 size={13} className="text-[#10b981]" />
                ) : (
                  <AlertTriangle size={13} className="text-[#f59e0b]" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
