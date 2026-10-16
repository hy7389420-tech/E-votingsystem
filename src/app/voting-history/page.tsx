"use client";

import React, { useState } from "react";
import Link from "next/link";
import { History, CheckCircle2, QrCode, ShieldCheck, ArrowRight, Eye, Copy, Check } from "lucide-react";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import { useVoting, VoteRecord } from "@/hooks/useVoting";

export default function VotingHistoryPage() {
  const { votes } = useVoting();
  const [selectedVote, setSelectedVote] = useState<VoteRecord | null>(null);
  const [copied, setCopied] = useState(false);

  // Fallback demo voting history if empty
  const displayVotes = votes.length > 0 ? votes : [
    {
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
    }
  ];

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card rounded-3xl p-6 md:p-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#7C83FD]">
            <History size={16} /> Immutable Ledger Record
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-[#EEF0FF]">
            📜 My Voting History
          </h1>
          <p className="text-xs text-[#A5AAD6]">
            View and verify all your past election ballots, cryptographic hashes, and receipts.
          </p>
        </div>

        <Link href="/elections" className="self-start md:self-auto">
          <Button variant="primary" icon={ArrowRight}>
            Cast New Vote
          </Button>
        </Link>
      </div>

      {/* History — Mobile Card View (sm and below) */}
      <div className="sm:hidden space-y-3">
        {displayVotes.map((vote) => (
          <div key={vote.id} className="glass-card rounded-2xl p-4 border border-[#7C83FD]/15 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#EEF0FF] leading-snug truncate">{vote.electionName}</p>
                <p className="text-[10px] text-[#A5AAD6] mt-0.5 font-mono">{vote.timestamp}</p>
              </div>
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30 whitespace-nowrap shrink-0 flex items-center gap-1">
                <CheckCircle2 size={10} /> VERIFIED
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-lg">{vote.candidatePhotoEmoji}</span>
              <span className="font-semibold text-[#7C83FD]">{vote.candidateName}</span>
              <span className="text-[#A5AAD6] text-[10px]">• {vote.candidateParty}</span>
            </div>
            <div className="bg-[#14163A] rounded-xl p-2.5 border border-[#7C83FD]/15">
              <p className="text-[9px] font-bold text-[#7C83FD] uppercase mb-1">SHA-256 Hash</p>
              <p className="font-mono text-[10px] text-[#A5AAD6] break-all">{vote.hash}</p>
            </div>
            <Button variant="outline" size="sm" icon={Eye} onClick={() => setSelectedVote(vote)} className="w-full justify-center">
              View Receipt
            </Button>
          </div>
        ))}
      </div>

      {/* History Table — Desktop (sm+) */}
      <div className="hidden sm:block glass-card rounded-3xl p-6 space-y-4 border border-[#7C83FD]/20 shadow-2xl">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-[#EEF0FF]">Personal Vote Logs</h3>
          <span className="text-xs text-[#7C83FD] font-bold bg-[#7C83FD]/15 px-3 py-1 rounded-full border border-[#7C83FD]/30">
            {displayVotes.length} Recorded Ballot(s)
          </span>
        </div>

        <div className="overflow-x-auto -mx-2 px-2">
          <table className="w-full text-left text-xs text-[#EEF0FF] min-w-[640px]">
            <thead className="bg-[#14163A]/60 text-[#A5AAD6] uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-3.5 rounded-l-xl">Election</th>
                <th className="p-3.5">Candidate</th>
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5">Vote SHA-256 Hash</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 rounded-r-xl text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#7C83FD]/10">
              {displayVotes.map((vote) => (
                <tr key={vote.id} className="hover:bg-[#1A1D4A]/60 transition-colors">
                  <td className="p-3.5 font-bold text-[#EEF0FF] max-w-[180px] truncate">
                    {vote.electionName}
                  </td>

                  <td className="p-3.5 font-semibold text-[#7C83FD] whitespace-nowrap">
                    <span className="flex items-center gap-1.5">
                      <span>{vote.candidatePhotoEmoji}</span>
                      <span>{vote.candidateName}</span>
                    </span>
                  </td>

                  <td className="p-3.5 text-[#A5AAD6] font-mono text-[11px] whitespace-nowrap">{vote.timestamp}</td>

                  <td className="p-3.5 font-mono text-[11px] text-[#A5AAD6]">
                    <span className="bg-[#14163A] px-2 py-1 rounded border border-[#7C83FD]/15 inline-block max-w-[140px] truncate">
                      {vote.hash}
                    </span>
                  </td>

                  <td className="p-3.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30 flex items-center gap-1 w-fit">
                      <CheckCircle2 size={12} /> VERIFIED
                    </span>
                  </td>

                  <td className="p-3.5 text-right">
                    <Button variant="outline" size="sm" icon={Eye} onClick={() => setSelectedVote(vote)}>
                      Receipt
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Receipt Modal */}
      {selectedVote && (
        <Modal
          isOpen={!!selectedVote}
          onClose={() => setSelectedVote(null)}
          title={`Vote Receipt Details: ${selectedVote.id}`}
          maxWidth="md"
          footer={
            <div className="flex justify-between items-center w-full">
              <span className="text-xs text-[#A5AAD6]">Verified Cryptographic Ledger</span>
              <Button variant="ghost" size="sm" onClick={() => setSelectedVote(null)}>
                Close
              </Button>
            </div>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#14163A] border border-[#7C83FD]/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#7C83FD] uppercase">Target Election</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#10b981]/15 text-[#10b981]">VERIFIED</span>
              </div>
              <h4 className="text-sm font-bold text-[#EEF0FF]">{selectedVote.electionName}</h4>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[#1A1D4A] border border-[#7C83FD]/15 space-y-0.5">
                <span className="text-[10px] text-[#A5AAD6]">Voted Candidate</span>
                <p className="font-bold text-[#7C83FD]">{selectedVote.candidateName}</p>
                <p className="text-[10px] text-[#A5AAD6]">{selectedVote.candidateParty}</p>
              </div>

              <div className="p-3 rounded-xl bg-[#1A1D4A] border border-[#7C83FD]/15 space-y-0.5">
                <span className="text-[10px] text-[#A5AAD6]">Date & Time</span>
                <p className="font-semibold text-[#EEF0FF]">{selectedVote.timestamp}</p>
                <p className="text-[10px] text-[#A5AAD6]">Voter: {selectedVote.voterId}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#14163A] border border-[#7C83FD]/20 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#7C83FD] uppercase">SHA-256 Hash Signature</span>
                <button
                  onClick={() => handleCopyHash(selectedVote.hash)}
                  className="text-[11px] text-[#7C83FD] hover:underline flex items-center gap-1 font-semibold"
                >
                  {copied ? <Check size={12} className="text-[#10b981]" /> : <Copy size={12} />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="font-mono text-[10px] text-[#EEF0FF] break-all bg-[#1A1D4A] p-2 rounded-lg">
                {selectedVote.hash}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
