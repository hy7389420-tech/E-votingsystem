"use client";

import React, { useState } from "react";
import { Star, CheckCircle2, Award, FileText, ArrowRight, Check } from "lucide-react";
import { Candidate } from "@/lib/mockData";
import Modal from "./Modal";
import Button from "./Button";

interface CandidateCardProps {
  candidate: Candidate;
  onSelectVote?: (candidate: Candidate) => void;
  isVoted?: boolean;
}

export default function CandidateCard({ candidate, onSelectVote, isVoted = false }: CandidateCardProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="glass-card rounded-2xl p-5 border border-[rgba(124,131,253,0.25)] hover:border-[#7C83FD]/50 transition-all flex flex-col justify-between space-y-4 group">
        {/* Top: Circular Photo, Name & Party */}
        <div className="space-y-3.5">
          <div className="flex items-center gap-3.5">
            {/* Circular Photo */}
            <div className="relative shrink-0">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#14163A] to-[#4B4FD8]/40 border-2 border-[#7C83FD]/40 group-hover:border-[#7C83FD] flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(124,131,253,0.25)] group-hover:scale-105 transition-all">
                {candidate.photoEmoji}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#14163A] border border-[rgba(124,131,253,0.3)] flex items-center justify-center text-[10px] text-[#F59E0B]">
                <Star size={10} className="fill-[#F59E0B]" />
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-extrabold text-base text-[#EEF0FF] group-hover:text-[#7C83FD] transition-colors truncate">
                {candidate.name}
              </h3>
              <span
                className="text-[11px] font-bold px-2.5 py-0.5 rounded-full inline-block mt-0.5"
                style={{
                  backgroundColor: `${candidate.partyColor}20`,
                  borderColor: `${candidate.partyColor}50`,
                  color: candidate.partyColor,
                  borderWidth: "1px"
                }}
              >
                {candidate.party}
              </span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-2 text-[11px] text-[#A5AAD6] bg-[#14163A]/70 p-2.5 rounded-xl border border-[rgba(124,131,253,0.18)]">
            <div>
              <span className="block font-semibold text-[#EEF0FF] truncate">{candidate.education}</span>
              <span>Education</span>
            </div>
            <div>
              <span className="block font-semibold text-[#EEF0FF] truncate">{candidate.experience}</span>
              <span>Experience</span>
            </div>
          </div>

          {/* Top Promise Highlight */}
          <div className="text-xs text-[#EEF0FF] bg-[#4B4FD8]/10 p-2.5 rounded-xl border border-[rgba(124,131,253,0.2)] flex items-start gap-2">
            <CheckCircle2 size={14} className="text-[#7C83FD] shrink-0 mt-0.5" />
            <span className="line-clamp-2 text-[#EEF0FF] leading-snug">{candidate.promises[0]}</span>
          </div>
        </div>

        {/* Card Actions: Details & Vote Button */}
        <div className="pt-3 border-t border-[rgba(124,131,253,0.2)] flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
            onClick={() => setShowModal(true)}
            icon={FileText}
          >
            Manifesto
          </Button>

          {onSelectVote && (
            <Button
              variant="primary"
              size="sm"
              className="flex-1 text-xs"
              onClick={() => onSelectVote(candidate)}
              disabled={isVoted}
              icon={isVoted ? Check : ArrowRight}
            >
              {isVoted ? "Voted" : "Vote"}
            </Button>
          )}
        </div>
      </div>

      {/* Candidate Profile Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={`Candidate Profile: ${candidate.name}`}
        maxWidth="lg"
        footer={
          <div className="flex items-center gap-3 w-full justify-between">
            <span className="text-xs text-[#A5AAD6]">Candidate ID: {candidate.id}</span>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => setShowModal(false)}>
                Close
              </Button>
              {onSelectVote && !isVoted && (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setShowModal(false);
                    onSelectVote(candidate);
                  }}
                  icon={ArrowRight}
                >
                  Vote For Candidate
                </Button>
              )}
            </div>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#14163A]/80 border border-[rgba(124,131,253,0.25)]">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#14163A] to-[#4B4FD8]/40 border-2 border-[#7C83FD]/50 flex items-center justify-center text-4xl shadow-md">
              {candidate.photoEmoji}
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-[#EEF0FF]">{candidate.name}</h4>
              <p className="text-xs font-bold" style={{ color: candidate.partyColor }}>
                {candidate.party}
              </p>
              <p className="text-xs text-[#A5AAD6]">
                {candidate.age} Years Old • {candidate.education}
              </p>
            </div>
          </div>

          <div>
            <h5 className="font-bold text-xs text-[#A5AAD6] uppercase tracking-wider mb-2">Biography</h5>
            <p className="text-xs leading-relaxed text-[#EEF0FF]">{candidate.bio}</p>
          </div>

          <div>
            <h5 className="font-bold text-xs text-[#A5AAD6] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-[#7C83FD]" /> Key Manifesto Promises
            </h5>
            <ul className="space-y-2">
              {candidate.promises.map((item, idx) => (
                <li key={idx} className="text-xs text-[#EEF0FF] bg-[#4B4FD8]/10 p-2.5 rounded-xl border border-[rgba(124,131,253,0.2)] flex items-start gap-2">
                  <span className="font-bold text-[#7C83FD]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-xs text-[#A5AAD6] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Award size={14} className="text-[#7C83FD]" /> Notable Achievements
            </h5>
            <ul className="space-y-2">
              {candidate.achievements.map((item, idx) => (
                <li key={idx} className="text-xs text-[#EEF0FF] bg-[rgba(124,131,253,0.08)] p-2.5 rounded-xl border border-[rgba(124,131,253,0.2)] flex items-start gap-2">
                  <span className="font-bold text-[#7C83FD]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Modal>
    </>
  );
}
