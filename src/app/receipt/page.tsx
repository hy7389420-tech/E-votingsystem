"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, QrCode, Download, Printer, Share2, BarChart3, Copy, Check, ShieldCheck } from "lucide-react";
import Button from "@/components/Button";
import Alert from "@/components/Alert";
import { useVoting } from "@/hooks/useVoting";

export default function ReceiptPage() {
  const { latestReceipt } = useVoting();
  const [copied, setCopied] = useState(false);
  const [downloadAlert, setDownloadAlert] = useState(false);

  // Fallback default receipt if none stored in latest session
  const receipt = latestReceipt || {
    id: "VOTE-84920194",
    voterId: "USR-001234567",
    voterName: "Harsh Yadav",
    electionId: "ELEC-001",
    electionName: "National Lok Sabha Elections 2026",
    candidateId: "CAND-001",
    candidateName: "Rajesh Kumar Singh",
    candidateParty: "Progressive Democratic Alliance",
    candidatePhotoEmoji: "👨‍💼",
    timestamp: "2026-09-27 23:35:12",
    hash: "sha256_a7f2c3d8e9b1f4g5h6i7j8k9l0m1n2o3p4q5r6s7t8u9v0",
    verified: true
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText(receipt.hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    setDownloadAlert(true);
    setTimeout(() => setDownloadAlert(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Success Alert Banner */}
      <Alert
        type="success"
        title="✓ Ballot Submitted & Cryptographically Verified"
        message="Your vote has been signed with your digital key and appended to the immutable election ledger."
      />

      {downloadAlert && (
        <Alert
          type="info"
          message="Receipt PDF download simulated! Your tamper-evident receipt is saved to your local downloads."
          onClose={() => setDownloadAlert(false)}
        />
      )}

      {/* Main Receipt Card */}
      <div className="glass-card rounded-3xl p-6 md:p-8 space-y-6 border border-[#7C83FD]/30 shadow-2xl relative overflow-hidden">
        {/* Background Emblem */}
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-[#7C83FD]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#7C83FD]/15">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#10b981]/15 border border-[#10b981]/30 flex items-center justify-center text-[#10b981]">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h1 className="text-xl font-black text-[#EEF0FF]">Digital Vote Receipt</h1>
              <p className="text-xs text-[#A5AAD6]">Receipt Ref ID: {receipt.id}</p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-[#10b981]/15 text-[#10b981] text-xs font-bold border border-[#10b981]/30 flex items-center gap-1.5">
            <CheckCircle2 size={14} /> VERIFIED ✓
          </span>
        </div>

        {/* Simulated QR Code Canvas Box */}
        <div className="flex flex-col items-center justify-center space-y-3 p-6 rounded-2xl bg-[#14163A]/80 border border-[#7C83FD]/20 text-center">
          <div className="w-44 h-44 rounded-2xl bg-white p-3 flex items-center justify-center shadow-lg relative group">
            {/* SVG Simulated QR Code */}
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#14163A]" fill="currentColor">
              <rect x="0" y="0" width="30" height="30" fill="currentColor" />
              <rect x="5" y="5" width="20" height="20" fill="#fff" />
              <rect x="10" y="10" width="10" height="10" fill="currentColor" />
              
              <rect x="70" y="0" width="30" height="30" fill="currentColor" />
              <rect x="75" y="5" width="20" height="20" fill="#fff" />
              <rect x="80" y="10" width="10" height="10" fill="currentColor" />
              
              <rect x="0" y="70" width="30" height="30" fill="currentColor" />
              <rect x="5" y="75" width="20" height="20" fill="#fff" />
              <rect x="10" y="80" width="10" height="10" fill="currentColor" />
              
              <rect x="35" y="10" width="10" height="10" />
              <rect x="50" y="0" width="15" height="15" />
              <rect x="35" y="35" width="30" height="30" />
              <rect x="42" y="42" width="16" height="16" fill="#fff" />
              <rect x="70" y="35" width="15" height="20" />
              <rect x="35" y="70" width="20" height="20" />
              <rect x="60" y="70" width="25" height="25" />
            </svg>
          </div>
          <p className="text-[11px] text-[#A5AAD6]">
            Scan with any official election verification scanner to validate SHA-256 ledger integrity.
          </p>
        </div>

        {/* Receipt Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-[#1A1D4A]/60 border border-[#7C83FD]/15 space-y-1">
            <span className="text-[10px] font-bold text-[#A5AAD6] uppercase">Election Title</span>
            <p className="font-bold text-[#EEF0FF]">{receipt.electionName}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1A1D4A]/60 border border-[#7C83FD]/15 space-y-1">
            <span className="text-[10px] font-bold text-[#A5AAD6] uppercase">Voted Candidate</span>
            <p className="font-bold text-[#7C83FD] flex items-center gap-1.5">
              <span>{receipt.candidatePhotoEmoji}</span>
              <span>{receipt.candidateName}</span>
              <span className="text-[10px] text-[#A5AAD6]">({receipt.candidateParty})</span>
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1A1D4A]/60 border border-[#7C83FD]/15 space-y-1">
            <span className="text-[10px] font-bold text-[#A5AAD6] uppercase">Voter Record ID</span>
            <p className="font-mono text-[#7C83FD]">{receipt.voterId} ({receipt.voterName})</p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#1A1D4A]/60 border border-[#7C83FD]/15 space-y-1">
            <span className="text-[10px] font-bold text-[#A5AAD6] uppercase">Timestamp</span>
            <p className="font-semibold text-[#EEF0FF]">{receipt.timestamp}</p>
          </div>
        </div>

        {/* SHA-256 Hash Box */}
        <div className="p-4 rounded-2xl bg-[#14163A] border border-[#7C83FD]/25 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C83FD]">
              SHA-256 Cryptographic Vote Hash
            </span>
            <button
              onClick={handleCopyHash}
              className="text-xs text-[#7C83FD] hover:underline flex items-center gap-1 font-semibold"
            >
              {copied ? <Check size={14} className="text-[#10b981]" /> : <Copy size={14} />}
              {copied ? "Copied!" : "Copy Hash"}
            </button>
          </div>
          <p className="font-mono text-[11px] text-[#EEF0FF] break-all bg-[#1A1D4A] p-2.5 rounded-xl border border-[#7C83FD]/10">
            {receipt.hash}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <Button variant="secondary" icon={Download} onClick={handleDownload}>
            Download PDF
          </Button>

          <Button variant="outline" icon={Printer} onClick={handlePrint}>
            Print Receipt
          </Button>

          <Button variant="ghost" icon={Share2} onClick={handleCopyHash}>
            Share Hash
          </Button>
        </div>

        {/* Navigation Link */}
        <div className="pt-4 border-t border-[#7C83FD]/15 text-center">
          <Link href="/results">
            <Button variant="primary" fullWidth icon={BarChart3}>
              Proceed to Live Election Results
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
