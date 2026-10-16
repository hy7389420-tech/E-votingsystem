"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, Search, ShieldCheck, Vote, RefreshCw, Lock, BarChart2, UserX } from "lucide-react";

const faqs = [
  {
    id: 1,
    icon: Vote,
    iconColor: "#7C83FD",
    question: "How do I cast my vote?",
    answer:
      "After completing registration and biometric verification, navigate to the Elections page. Select your active election, browse the candidate profiles on the Candidates page, choose your preferred candidate, and click 'Vote'. You will be directed to the Voting Confirmation page where you must confirm your selection. A digital receipt with a unique QR code and SHA-256 hash is generated upon successful submission.",
    tag: "Voting"
  },
  {
    id: 2,
    icon: RefreshCw,
    iconColor: "#f59e0b",
    question: "Can I change my vote after submitting?",
    answer:
      "No. Once your vote is submitted and cryptographically signed, it is final and cannot be changed or revoked. The system enforces a strict one-vote-per-election policy to maintain election integrity. You will receive a digital receipt as proof of your confirmed vote. Please review your selection carefully on the Confirmation page before submitting.",
    tag: "Voting Rules"
  },
  {
    id: 3,
    icon: ShieldCheck,
    iconColor: "#10b981",
    question: "Is my personal data and vote secure?",
    answer:
      "Absolutely. Your data is protected by multiple layers of security. All votes are hashed using SHA-256 cryptographic algorithms, making them tamper-proof. Biometric data (face, fingerprint) is stored as encrypted templates and never as raw images. Aadhar verification is simulated to UIDAI API standards. Active sessions are tracked and you can revoke them from the Security page at any time.",
    tag: "Security"
  },
  {
    id: 4,
    icon: Lock,
    iconColor: "#4B4FD8",
    question: "What is Two-Factor Authentication (2FA)?",
    answer:
      "Two-Factor Authentication (2FA) adds an extra layer of security beyond your password. When enabled, you must verify your identity through a second method — typically a 6-digit OTP sent to your registered mobile number — every time you log in. You can enable or disable 2FA from your Security Settings page. We strongly recommend keeping 2FA enabled for maximum account protection.",
    tag: "Security"
  },
  {
    id: 5,
    icon: BarChart2,
    iconColor: "#7C83FD",
    question: "How frequently are live election results updated?",
    answer:
      "Live election results on the Results page are updated in near-real time as votes are processed. The system simulates live data updates at regular intervals, reflecting changing vote counts, turnout percentages, and candidate rankings. Charts automatically refresh to show the latest data. Final certified results are published by the Election Commission after the polling period officially closes.",
    tag: "Results"
  },
  {
    id: 6,
    icon: UserX,
    iconColor: "#ef4444",
    question: "Can I delete my account and all associated data?",
    answer:
      "Account deletion is governed by election data retention policies. You can request account closure from the Security page, but voting records and audit logs may be retained for a legally mandated period (typically 6 months post-election) to maintain accountability and audit trails. Biometric templates will be purged immediately upon verified deletion request. Contact our support team for assistance with data erasure requests.",
    tag: "Account"
  }
];

const tagColors: Record<string, string> = {
  "Voting": "bg-[#7C83FD]/15 text-[#7C83FD] border-[#7C83FD]/30",
  "Voting Rules": "bg-[#f59e0b]/15 text-[#f59e0b] border-[#f59e0b]/30",
  "Security": "bg-[#10b981]/15 text-[#10b981] border-[#10b981]/30",
  "Results": "bg-[#7C83FD]/15 text-[#7C83FD] border-[#7C83FD]/30",
  "Account": "bg-[#ef4444]/15 text-[#ef4444] border-[#ef4444]/30",
};

export default function FAQPage() {
  const [openId, setOpenId] = useState<number | null>(1);
  const [search, setSearch] = useState("");

  const filtered = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase()) ||
      f.tag.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="glass-card rounded-3xl p-6 md:p-8 border border-[#7C83FD]/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4B4FD8]/20 to-[#7C83FD]/20 border border-[#7C83FD]/30 flex items-center justify-center">
              <HelpCircle size={28} className="text-[#7C83FD]" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-[#EEF0FF]">
                Frequently Asked Questions
              </h1>
              <p className="text-xs text-[#A5AAD6] mt-1">
                {faqs.length} questions answered • Tap a card to expand
              </p>
            </div>
          </div>
          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A5AAD6]" />
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="glass-input w-full rounded-xl pl-8 pr-4 py-2 text-sm placeholder-[#5c6280] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* FAQ Grid */}
      {filtered.length === 0 ? (
        <div className="glass-card rounded-3xl p-12 text-center border border-[#7C83FD]/10">
          <HelpCircle size={48} className="mx-auto text-[#A5AAD6] mb-4" />
          <p className="text-[#A5AAD6] font-semibold">No questions match your search.</p>
          <p className="text-xs text-[#5c6280] mt-1">Try a different keyword or browse all questions.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((faq) => {
            const Icon = faq.icon;
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`glass-card rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                  isOpen
                    ? "border-[#7C83FD]/40 shadow-[0_0_24px_rgba(124, 131, 253,0.12)]"
                    : "border-[#7C83FD]/15 hover:border-[#7C83FD]/30"
                }`}
                onClick={() => setOpenId(isOpen ? null : faq.id)}
              >
                {/* Question Row */}
                <div className="flex items-start gap-3 p-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300"
                    style={{
                      backgroundColor: `${faq.iconColor}15`,
                      color: faq.iconColor,
                      border: `1px solid ${faq.iconColor}30`,
                      transform: isOpen ? "scale(1.1)" : "scale(1)"
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${tagColors[faq.tag] || "bg-[#7C83FD]/10 text-[#7C83FD] border-[#7C83FD]/20"}`}
                      >
                        {faq.tag}
                      </span>
                      <div className="text-[#A5AAD6] shrink-0">
                        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    </div>
                    <h3 className="text-sm font-bold text-[#EEF0FF] leading-snug">{faq.question}</h3>
                  </div>
                </div>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 pb-5 pt-0">
                    <div className="border-t border-[#7C83FD]/10 pt-4">
                      <p className="text-xs text-[#A5AAD6] leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer CTA */}
      <div className="glass-card rounded-2xl p-6 border border-[#4B4FD8]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-bold text-sm text-[#EEF0FF]">Didn&apos;t find what you were looking for?</p>
          <p className="text-xs text-[#A5AAD6] mt-0.5">Our support team is available 24/7 to assist you.</p>
        </div>
        <a
          href="/support"
          className="glass-button-primary px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap inline-flex items-center gap-2"
        >
          Contact Support →
        </a>
      </div>
    </div>
  );
}
