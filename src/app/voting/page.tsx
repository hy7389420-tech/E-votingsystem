"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Vote, CheckSquare, AlertTriangle, ShieldCheck, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import Button from "@/components/Button";
import Alert from "@/components/Alert";
import { MOCK_CANDIDATES, MOCK_ELECTIONS, Candidate, Election } from "@/lib/mockData";
import { useVoting } from "@/hooks/useVoting";

export default function VotingPage() {
  const router = useRouter();
  const { castVote, hasVotedInElection } = useVoting();

  const [selectedCandidate, setSelectedCandidate] = useState<Candidate>(MOCK_CANDIDATES[0]);
  const [selectedElection, setSelectedElection] = useState<Election>(MOCK_ELECTIONS[0]);
  const [confirmed, setConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const storedCandidate = localStorage.getItem("evoting_selected_candidate");
      if (storedCandidate) {
        setSelectedCandidate(JSON.parse(storedCandidate));
      }
    } catch (e) {
      console.error("Failed to load selected candidate", e);
    }
  }, []);

  const alreadyVoted = hasVotedInElection(selectedElection.id);

  const handleSubmitVote = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!confirmed) {
      setError("Please confirm the mandatory checkbox acknowledging that your vote is final.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      await castVote(selectedElection, selectedCandidate);
      router.push("/receipt");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to record vote. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="glass-card rounded-3xl p-6 md:p-8 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-[#7C83FD]">
          <Vote size={16} /> Official Digital Ballot Submission
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-[#EEF0FF]">
          🗳️ Confirm & Cast Your Vote
        </h1>
        <p className="text-xs text-[#A5AAD6]">
          Review your chosen candidate selection carefully before submitting your vote to the cryptographic ledger.
        </p>
      </div>

      {alreadyVoted ? (
        <div className="glass-card rounded-3xl p-8 text-center space-y-4">
          <CheckCircle2 size={56} className="text-[#10b981] mx-auto" />
          <h3 className="text-xl font-bold text-[#EEF0FF]">Vote Already Cast in This Election!</h3>
          <p className="text-xs text-[#A5AAD6] max-w-md mx-auto">
            You have already cast your official ballot for {selectedElection.name}. In accordance with election regulations, only 1 vote per registered voter is allowed.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Button variant="primary" onClick={() => router.push("/receipt")}>
              View Your Digital Receipt
            </Button>
            <Button variant="secondary" onClick={() => router.push("/results")}>
              View Live Results
            </Button>
          </div>
        </div>
      ) : (
        <div className="glass-card rounded-3xl p-6 md:p-8 space-y-6 border border-[#7C83FD]/30 shadow-2xl">
          {error && <Alert type="error" message={error} onClose={() => setError("")} />}

          {/* Election Info */}
          <div className="p-4 rounded-2xl bg-[#14163A]/60 border border-[#7C83FD]/20 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-[#7C83FD] uppercase tracking-wider">Target Election</span>
              <h3 className="text-sm font-bold text-[#EEF0FF]">{selectedElection.name}</h3>
            </div>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30">
              🟢 Live Voting
            </span>
          </div>

          {/* Vote Preview Box */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#A5AAD6] uppercase tracking-wider">Selected Candidate</h4>
            
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#1A1D4A] to-[#23275F] border border-[#7C83FD]/30 space-y-4 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#14163A] border border-[#7C83FD]/40 flex items-center justify-center text-3xl shrink-0">
                  {selectedCandidate.photoEmoji}
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#EEF0FF]">{selectedCandidate.name}</h3>
                  <span
                    className="text-xs font-bold px-2.5 py-0.5 rounded-full inline-block mt-1"
                    style={{
                      backgroundColor: `${selectedCandidate.partyColor}15`,
                      borderColor: `${selectedCandidate.partyColor}40`,
                      color: selectedCandidate.partyColor,
                      borderWidth: "1px"
                    }}
                  >
                    {selectedCandidate.party}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#14163A]/50 text-xs text-[#EEF0FF] border border-[#7C83FD]/15 space-y-1">
                <p className="font-semibold text-[#7C83FD]">Key Manifesto Promise:</p>
                <p className="text-[#A5AAD6]">&quot;{selectedCandidate.promises[0]}&quot;</p>
              </div>
            </div>
          </div>

          {/* Warning Banner */}
          <Alert
            type="warning"
            title="⚠️ Important Finality Notice"
            message="Voting is irreversible. Once you submit your ballot, your vote is encrypted with SHA-256 and recorded permanently. It cannot be edited, recalled, or changed."
          />

          {/* Form Confirmation */}
          <form onSubmit={handleSubmitVote} className="space-y-6">
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#f59e0b]/10 border border-[#f59e0b]/30">
              <input
                type="checkbox"
                id="confirmVote"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="mt-1 w-5 h-5 rounded bg-[#14163A] border-[#f59e0b]/40 text-[#f59e0b] focus:ring-[#f59e0b]"
              />
              <label htmlFor="confirmVote" className="text-xs font-semibold text-[#EEF0FF] leading-relaxed cursor-pointer">
                I confirm that I intend to cast my official ballot for{" "}
                <span className="text-[#7C83FD] font-bold">{selectedCandidate.name}</span> in the{" "}
                <span className="text-[#7C83FD] font-bold">{selectedElection.name}</span> and understand that this action is final.
              </label>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Button
                type="button"
                variant="ghost"
                icon={ArrowLeft}
                onClick={() => router.push("/candidates")}
              >
                Change Selection
              </Button>

              <Button
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
                disabled={!confirmed}
                icon={CheckSquare}
                className="w-full sm:w-auto px-8 py-3 text-base"
              >
                Confirm & Submit Vote
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
