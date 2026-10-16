"use client";

import { useState, useEffect } from "react";
import { Candidate, Election } from "@/lib/mockData";
import { useAuth } from "./useAuth";

export interface VoteRecord {
  id: string;
  voterId: string;
  voterName: string;
  electionId: string;
  electionName: string;
  candidateId: string;
  candidateName: string;
  candidateParty: string;
  candidatePhotoEmoji: string;
  timestamp: string;
  hash: string;
  verified: boolean;
}

const VOTES_STORAGE_KEY = "evoting_votes";
const LATEST_RECEIPT_KEY = "evoting_latest_receipt";

function generateSHA256Hash(voterId: string, candidateId: string, timestamp: string): string {
  const raw = `${voterId}-${candidateId}-${timestamp}-${Math.random()}`;
  let hash = 0;
  for (let i = 0; i < raw.length; i++) {
    const char = raw.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const hex1 = Math.abs(hash).toString(16).padStart(8, "0");
  const hex2 = Math.abs(hash * 31).toString(16).padStart(8, "0");
  const hex3 = Math.abs(hash * 127).toString(16).padStart(8, "0");
  const hex4 = Math.abs(hash * 8191).toString(16).padStart(8, "0");
  return `sha256_${hex1}${hex2}${hex3}${hex4}`;
}

export function useVoting() {
  const { user } = useAuth();
  const [votes, setVotes] = useState<VoteRecord[]>([]);
  const [latestReceipt, setLatestReceipt] = useState<VoteRecord | null>(null);

  useEffect(() => {
    try {
      const storedVotes = localStorage.getItem(VOTES_STORAGE_KEY);
      if (storedVotes) {
        setVotes(JSON.parse(storedVotes));
      }
      const storedReceipt = localStorage.getItem(LATEST_RECEIPT_KEY);
      if (storedReceipt) {
        setLatestReceipt(JSON.parse(storedReceipt));
      }
    } catch (e) {
      console.error("Failed to load voting data from localStorage", e);
    }
  }, []);

  const hasVotedInElection = (electionId: string): boolean => {
    return votes.some((v) => v.electionId === electionId);
  };

  const castVote = (election: Election, candidate: Candidate): Promise<VoteRecord> => {
    return new Promise((resolve, reject) => {
      if (hasVotedInElection(election.id)) {
        reject(new Error("You have already cast your vote in this election. Only 1 vote per voter is permitted."));
        return;
      }

      setTimeout(() => {
        const timestamp = new Date().toISOString().replace("T", " ").substring(0, 19);
        const voterId = user?.id || "USR-001234567";
        const voterName = user?.name || "Harsh Yadav";
        const voteHash = generateSHA256Hash(voterId, candidate.id, timestamp);

        const newVote: VoteRecord = {
          id: `VOTE-${Math.floor(10000000 + Math.random() * 90000000)}`,
          voterId,
          voterName,
          electionId: election.id,
          electionName: election.name,
          candidateId: candidate.id,
          candidateName: candidate.name,
          candidateParty: candidate.party,
          candidatePhotoEmoji: candidate.photoEmoji,
          timestamp,
          hash: voteHash,
          verified: true
        };

        const updatedVotes = [newVote, ...votes];
        setVotes(updatedVotes);
        setLatestReceipt(newVote);

        localStorage.setItem(VOTES_STORAGE_KEY, JSON.stringify(updatedVotes));
        localStorage.setItem(LATEST_RECEIPT_KEY, JSON.stringify(newVote));

        resolve(newVote);
      }, 1000);
    });
  };

  return {
    votes,
    latestReceipt,
    castVote,
    hasVotedInElection
  };
}
