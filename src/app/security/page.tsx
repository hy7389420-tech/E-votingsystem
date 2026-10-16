"use client";

import React, { useState } from "react";
import { ShieldCheck, Lock, Smartphone, Globe, CheckCircle2, KeyRound, AlertTriangle, Trash2, History } from "lucide-react";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import FormInput from "@/components/FormInput";
import Alert from "@/components/Alert";

export default function SecurityPage() {
  const [twoFA, setTwoFA] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [activeSessions, setActiveSessions] = useState([
    { id: 1, device: "Chrome / Windows 11", location: "Bhopal, MP", ip: "192.168.1.45", lastActive: "Just now (Current Session)", current: true },
    { id: 2, device: "Safari / iOS 17 (Mobile)", location: "Indore, MP", ip: "103.45.12.89", lastActive: "Yesterday at 04:20 PM", current: false }
  ]);

  const auditLogs = [
    { id: 1, action: "Vote Submitted & SHA-256 Signed", timestamp: "2026-09-27 23:35:12", ip: "192.168.1.45", status: "SUCCESS" },
    { id: 2, action: "Biometric Face & Fingerprint Verification", timestamp: "2026-09-27 23:10:04", ip: "192.168.1.45", status: "SUCCESS" },
    { id: 3, action: "Aadhar OTP Verification Passed", timestamp: "2026-09-27 23:05:40", ip: "192.168.1.45", status: "SUCCESS" },
    { id: 4, action: "Voter Portal Session Login", timestamp: "2026-09-27 22:45:00", ip: "192.168.1.45", status: "SUCCESS" }
  ];

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPass) {
      setError("Please enter your current password.");
      return;
    }
    if (newPass.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }
    if (newPass !== confirmPass) {
      setError("New passwords do not match.");
      return;
    }

    setError("");
    setSuccessMsg("Password updated successfully!");
    setTimeout(() => {
      setSuccessMsg("");
      setShowPasswordModal(false);
      setCurrentPass("");
      setNewPass("");
      setConfirmPass("");
    }, 1200);
  };

  const handleTerminateSession = (id: number) => {
    setActiveSessions(activeSessions.filter((s) => s.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card rounded-3xl p-6 md:p-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#7C83FD]">
            <ShieldCheck size={16} /> Cryptographic Account Protection
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-[#EEF0FF]">
            🔐 Security & Privacy Settings
          </h1>
          <p className="text-xs text-[#A5AAD6]">
            Manage authentication passwords, 2FA factors, active devices, and security audit logs.
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-[#10b981]/15 text-[#10b981] text-xs font-bold border border-[#10b981]/30 flex items-center gap-1.5 self-start md:self-auto">
          <CheckCircle2 size={14} /> High Security Shield
        </span>
      </div>

      {/* Security Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Password Management Card */}
        <div className="glass-card rounded-3xl p-6 space-y-4 border border-[#7C83FD]/20 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#7C83FD]/15 border border-[#7C83FD]/30 flex items-center justify-center text-[#7C83FD]">
              <Lock size={20} />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#EEF0FF]">Password Management</h3>
              <p className="text-xs text-[#A5AAD6]">
                Last changed 14 days ago. Strong password recommendation active.
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            fullWidth
            icon={KeyRound}
            onClick={() => setShowPasswordModal(true)}
          >
            Change Password
          </Button>
        </div>

        {/* 2FA Toggle Card */}
        <div className="glass-card rounded-3xl p-6 space-y-4 border border-[#4B4FD8]/20 shadow-xl flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#4B4FD8]/15 border border-[#4B4FD8]/30 flex items-center justify-center text-[#4B4FD8]">
              <Smartphone size={20} />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#EEF0FF]">Two-Factor Authentication (2FA)</h3>
              <p className="text-xs text-[#A5AAD6]">
                Requires SMS OTP or Biometric scan before final ballot signoff.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#14163A]/60 border border-[#4B4FD8]/30">
            <span className="text-xs font-bold text-[#EEF0FF]">
              {twoFA ? "🟢 2FA Active & Enforced" : "⚪ 2FA Disabled"}
            </span>
            <input
              type="checkbox"
              checked={twoFA}
              onChange={(e) => setTwoFA(e.target.checked)}
              className="w-5 h-5 rounded bg-[#14163A] border-[#4B4FD8]/40 text-[#4B4FD8] focus:ring-[#4B4FD8]"
            />
          </div>
        </div>
      </div>

      {/* Active Sessions Table */}
      <div className="glass-card rounded-3xl p-6 space-y-4 border border-[#7C83FD]/20 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-[#EEF0FF]">Active Devices & Sessions</h3>
          <span className="text-xs text-[#A5AAD6]">{activeSessions.length} Active Device(s)</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#EEF0FF]">
            <thead className="bg-[#14163A]/60 text-[#A5AAD6] uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3 rounded-l-xl">Device & Browser</th>
                <th className="p-3">Location</th>
                <th className="p-3">IP Address</th>
                <th className="p-3">Last Active</th>
                <th className="p-3 rounded-r-xl text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#7C83FD]/10">
              {activeSessions.map((session) => (
                <tr key={session.id} className="hover:bg-[#1A1D4A]/60 transition-colors">
                  <td className="p-3 font-bold text-[#EEF0FF] flex items-center gap-2">
                    <Globe size={16} className="text-[#7C83FD]" />
                    <span>{session.device}</span>
                    {session.current && (
                      <span className="text-[9px] px-2 py-0.5 rounded bg-[#10b981]/15 text-[#10b981] font-bold border border-[#10b981]/30">
                        Current
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-[#A5AAD6]">{session.location}</td>
                  <td className="p-3 font-mono text-[#A5AAD6]">{session.ip}</td>
                  <td className="p-3 text-[#A5AAD6]">{session.lastActive}</td>
                  <td className="p-3 text-right">
                    {!session.current && (
                      <button
                        onClick={() => handleTerminateSession(session.id)}
                        className="p-1.5 text-[#ef4444] hover:bg-[#ef4444]/15 rounded-lg transition-colors"
                        title="Terminate Session"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Security Audit Log Table */}
      <div className="glass-card rounded-3xl p-6 space-y-4 border border-[#7C83FD]/20 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-[#EEF0FF] flex items-center gap-2">
            <History size={18} className="text-[#7C83FD]" /> Security Event Audit Log
          </h3>
          <span className="text-xs text-[#10b981] font-bold bg-[#10b981]/15 px-3 py-1 rounded-full border border-[#10b981]/30">
            Audit Trail Intact
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#EEF0FF]">
            <thead className="bg-[#14163A]/60 text-[#A5AAD6] uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3 rounded-l-xl">Event Action</th>
                <th className="p-3">Timestamp</th>
                <th className="p-3">IP Address</th>
                <th className="p-3 rounded-r-xl text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#7C83FD]/10">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#1A1D4A]/60 transition-colors">
                  <td className="p-3 font-semibold text-[#EEF0FF]">{log.action}</td>
                  <td className="p-3 font-mono text-[#A5AAD6]">{log.timestamp}</td>
                  <td className="p-3 font-mono text-[#A5AAD6]">{log.ip}</td>
                  <td className="p-3 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <Modal
          isOpen={showPasswordModal}
          onClose={() => setShowPasswordModal(false)}
          title="Change Account Password"
          maxWidth="md"
        >
          <form onSubmit={handleChangePassword} className="space-y-4">
            {error && <Alert type="error" message={error} onClose={() => setError("")} />}
            {successMsg && <Alert type="success" message={successMsg} />}

            <FormInput
              label="Current Password"
              type="password"
              placeholder="••••••••••••"
              icon={Lock}
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
              required
            />

            <FormInput
              label="New Password"
              type="password"
              placeholder="••••••••••••"
              icon={Lock}
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              required
            />

            <FormInput
              label="Confirm New Password"
              type="password"
              placeholder="••••••••••••"
              icon={Lock}
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              required
            />

            <div className="pt-3 flex justify-end gap-3 border-t border-[#7C83FD]/15">
              <Button type="button" variant="ghost" onClick={() => setShowPasswordModal(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Update Password
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
