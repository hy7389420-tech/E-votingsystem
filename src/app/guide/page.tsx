"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen, UserPlus, IdCard, Fingerprint, Vote, BarChart2, CheckCircle2, ArrowRight, ChevronRight
} from "lucide-react";

const steps = [
  {
    id: 1,
    step: "Step 01",
    icon: UserPlus,
    iconColor: "#7C83FD",
    title: "Create Your Account",
    subtitle: "Start your voter registration",
    description:
      "Visit the Sign Up page and fill in your personal details: full name, email address, phone number, date of birth, and city of residence. Create a strong password and agree to the terms and conditions. Click 'Create Account' to proceed.",
    tips: [
      "Use a government-registered email or phone number",
      "Ensure your Date of Birth matches your Aadhar card",
      "Use a strong password (8+ chars, mixed case, symbols)",
    ],
    route: "/signup",
    routeLabel: "Go to Sign Up",
    color: "#7C83FD",
  },
  {
    id: 2,
    step: "Step 02",
    icon: IdCard,
    iconColor: "#4B4FD8",
    title: "Aadhar Verification",
    subtitle: "Verify your identity — Step 2/5",
    description:
      "Enter your 12-digit Aadhar UID number in the XXXX XXXX XXXX format. An OTP will be sent to your Aadhar-linked mobile number. Enter the 6-digit OTP to confirm your identity. This step is mandatory and ensures one-person-one-vote integrity.",
    tips: [
      "Your Aadhar number is NOT stored after verification",
      "OTP is valid for 10 minutes only",
      "Ensure your Aadhar-linked mobile is accessible",
    ],
    route: "/aadhar-verify",
    routeLabel: "Go to Aadhar Verify",
    color: "#4B4FD8",
  },
  {
    id: 3,
    step: "Step 03",
    icon: Fingerprint,
    iconColor: "#d946ef",
    title: "Biometric Registration",
    subtitle: "Enroll your biometric data — Step 3/5",
    description:
      "Complete biometric enrollment using four scan options: Face Recognition (required), Fingerprint Scan (required), Voter QR Code (required), and Iris Scan (optional). Each scan creates an encrypted biometric template stored securely. This prevents proxy voting.",
    tips: [
      "Face scan requires good lighting and a clear view",
      "Fingerprint works best with a clean, dry finger",
      "Iris scan is optional but recommended for maximum security",
    ],
    route: "/biometric",
    routeLabel: "Go to Biometric",
    color: "#d946ef",
  },
  {
    id: 4,
    step: "Step 04",
    icon: Vote,
    iconColor: "#7C83FD",
    title: "Browse & Select Elections",
    subtitle: "Explore active elections on the dashboard",
    description:
      "After registration, log in to access your dashboard. Navigate to the Elections page to browse all active and upcoming elections. You can view election details, participating candidates, voter turnout stats, and election timelines. Use the Candidates page to research candidate profiles, parties, and promises before deciding.",
    tips: [
      "Check the election status (ACTIVE / UPCOMING)",
      "Read candidate profiles carefully before voting",
      "Filter candidates by party using the dropdown",
    ],
    route: "/elections",
    routeLabel: "Browse Elections",
    color: "#7C83FD",
  },
  {
    id: 5,
    step: "Step 05",
    icon: CheckCircle2,
    iconColor: "#10b981",
    title: "Cast Your Vote",
    subtitle: "Submit your vote securely",
    description:
      "From the Candidates page, click 'Vote' on your chosen candidate. You'll be directed to the Voting Confirmation page showing a preview of your selection. Read the warning about vote finality, check the confirmation checkbox, and click 'Confirm & Submit Vote'. Your vote is cryptographically signed with SHA-256 and recorded.",
    tips: [
      "You can only vote ONCE per election — choose wisely",
      "The confirmation checkbox is mandatory before submitting",
      "Your vote is anonymous — even admins cannot trace it",
    ],
    route: "/voting",
    routeLabel: "Go to Voting",
    color: "#10b981",
  },
  {
    id: 6,
    step: "Step 06",
    icon: BarChart2,
    iconColor: "#f59e0b",
    title: "View Your Receipt & Results",
    subtitle: "Track your vote and monitor live results",
    description:
      "After voting, you'll receive a digital Vote Receipt with a unique QR code, SHA-256 hash, timestamp, and Voter ID for verification. Download, print, or share your receipt. Visit the Results page to monitor live election outcomes with interactive Pie, Line, and Bar charts. Your full voting history is available on the Voting History page.",
    tips: [
      "Save or screenshot your receipt for future reference",
      "Use the QR code to independently verify your vote",
      "Results update in real time as votes are processed",
    ],
    route: "/results",
    routeLabel: "View Live Results",
    color: "#f59e0b",
  },
];

export default function GuidePage() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="glass-card rounded-3xl p-6 md:p-8 border border-[#7C83FD]/20">
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#7C83FD]/20 to-[#4B4FD8]/20 border border-[#7C83FD]/30 flex items-center justify-center">
              <BookOpen size={28} className="text-[#7C83FD]" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-[#EEF0FF]">
                Complete Voter Guide
              </h1>
              <p className="text-xs text-[#A5AAD6] mt-1">
                6-step walkthrough • From registration to results
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#A5AAD6]">
            <span className="w-2 h-2 rounded-full bg-[#10b981] inline-block"></span>
            All steps verified for SIH 2026
          </div>
        </div>

        {/* Progress bar showing 6 steps */}
        <div className="mt-6 flex gap-1.5">
          {steps.map((s) => (
            <div
              key={s.id}
              className="h-1.5 flex-1 rounded-full transition-all duration-300"
              style={{ backgroundColor: `${s.color}40` }}
            />
          ))}
        </div>
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {steps.map((step) => {
          const Icon = step.icon;
          const isActive = activeStep === step.id;
          return (
            <div
              key={step.id}
              className={`glass-card rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                isActive
                  ? "border-opacity-60 shadow-lg"
                  : "border-[#7C83FD]/15 hover:border-[#7C83FD]/30"
              }`}
              style={isActive ? { borderColor: `${step.color}50`, boxShadow: `0 0 24px ${step.color}15` } : {}}
              onClick={() => setActiveStep(isActive ? null : step.id)}
            >
              {/* Step Header */}
              <div className="p-5 flex items-start gap-4">
                {/* Step Number Badge */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 font-black text-xs"
                  style={{
                    backgroundColor: `${step.color}15`,
                    color: step.color,
                    border: `1px solid ${step.color}30`,
                  }}
                >
                  <Icon size={22} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className="text-[10px] font-black tracking-widest"
                      style={{ color: step.color }}
                    >
                      {step.step}
                    </span>
                    <ChevronRight
                      size={14}
                      className={`text-[#A5AAD6] transition-transform duration-300 shrink-0 ${isActive ? "rotate-90" : ""}`}
                    />
                  </div>
                  <h3 className="text-sm font-bold text-[#EEF0FF] mt-0.5">{step.title}</h3>
                  <p className="text-[11px] text-[#A5AAD6]">{step.subtitle}</p>
                </div>
              </div>

              {/* Expanded Content */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isActive ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-5 pb-5 space-y-4">
                  <div className="border-t border-white/5 pt-4">
                    <p className="text-xs text-[#A5AAD6] leading-relaxed">{step.description}</p>
                  </div>

                  {/* Tips */}
                  <div
                    className="rounded-xl p-4 space-y-2"
                    style={{ backgroundColor: `${step.color}08`, border: `1px solid ${step.color}20` }}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: step.color }}>
                      💡 Pro Tips
                    </p>
                    {step.tips.map((tip, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] text-[#A5AAD6]">
                        <span style={{ color: step.color }} className="mt-0.5 shrink-0">•</span>
                        {tip}
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link href={step.route} onClick={(e) => e.stopPropagation()}>
                    <button
                      className="w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                      style={{
                        background: `linear-gradient(135deg, ${step.color}25, ${step.color}10)`,
                        border: `1px solid ${step.color}40`,
                        color: step.color,
                      }}
                    >
                      {step.routeLabel} <ArrowRight size={13} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Need Help Banner */}
      <div className="glass-card rounded-2xl p-6 border border-[#4B4FD8]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-bold text-sm text-[#EEF0FF]">Still have questions?</p>
          <p className="text-xs text-[#A5AAD6] mt-0.5">Browse our FAQ or reach out to our 24/7 support team.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/faq">
            <button className="glass-button-secondary px-4 py-2.5 rounded-xl text-xs font-bold">
              View FAQ
            </button>
          </Link>
          <Link href="/support">
            <button className="glass-button-primary px-4 py-2.5 rounded-xl text-xs font-bold">
              Get Support →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
