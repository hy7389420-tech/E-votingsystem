"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Users, Search, Filter, Sparkles, CheckCircle2 } from "lucide-react";
import CandidateCard from "@/components/CandidateCard";
import FormInput from "@/components/FormInput";
import { MOCK_CANDIDATES, Candidate } from "@/lib/mockData";

export default function CandidatesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedParty, setSelectedParty] = useState("ALL");

  const parties = ["ALL", ...Array.from(new Set(MOCK_CANDIDATES.map((c) => c.party)))];

  const filteredCandidates = MOCK_CANDIDATES.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.party.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.promises.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesParty = selectedParty === "ALL" || candidate.party === selectedParty;

    return matchesSearch && matchesParty;
  });

  const handleSelectVote = (candidate: Candidate) => {
    // Store selected candidate in localStorage for voting confirmation page
    localStorage.setItem("evoting_selected_candidate", JSON.stringify(candidate));
    router.push("/voting");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card rounded-3xl p-6 md:p-8">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold text-[#7C83FD]">
            <Users size={16} /> National Candidates Directory
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-[#EEF0FF]">
            👥 Candidate Profiles & Manifestos
          </h1>
          <p className="text-xs text-[#A5AAD6]">
            Inspect background credentials, education, track record, and promises before casting your vote.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#7C83FD]/10 border border-[#7C83FD]/30 text-[#7C83FD] text-xs font-bold self-start md:self-auto">
          <Sparkles size={16} /> 4 Nominated Candidates
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-card rounded-2xl p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <FormInput
            label="Search Candidates"
            placeholder="Search by candidate name, party, or manifesto keyword..."
            icon={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#EEF0FF] tracking-wide">
            Filter by Political Party
          </label>
          <div className="relative">
            <select
              value={selectedParty}
              onChange={(e) => setSelectedParty(e.target.value)}
              className="w-full glass-input px-3.5 py-2.5 rounded-xl text-sm font-semibold text-[#EEF0FF] bg-[#14163A]"
            >
              {parties.map((p) => (
                <option key={p} value={p} className="bg-[#14163A] text-[#EEF0FF]">
                  {p === "ALL" ? "All Political Parties" : p}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Candidates Grid */}
      {filteredCandidates.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center space-y-3">
          <Users size={48} className="text-[#A5AAD6] mx-auto" />
          <h3 className="text-base font-bold text-[#EEF0FF]">No Candidates Found</h3>
          <p className="text-xs text-[#A5AAD6]">
            No candidate matched your search query &quot;{searchQuery}&quot;. Try adjusting your search term or party filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredCandidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              onSelectVote={handleSelectVote}
            />
          ))}
        </div>
      )}
    </div>
  );
}
