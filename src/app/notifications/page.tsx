"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Globe, ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";
import Button from "@/components/Button";
import Alert from "@/components/Alert";
import { useAuth } from "@/hooks/useAuth";

export default function NotificationsPage() {
  const router = useRouter();
  const { updateUser } = useAuth();

  const [preferences, setPreferences] = useState({
    emailAlerts: true,
    smsReceipts: true,
    resultUpdates: true,
    securityAlerts: true
  });

  const [language, setLanguage] = useState("en");
  const [enable2FA, setEnable2FA] = useState(true);
  const [gdprConsent, setGdprConsent] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences({ ...preferences, [key]: !preferences[key] });
  };

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gdprConsent) {
      setError("Please accept the voter data processing consent to finalize onboarding.");
      return;
    }

    setError("");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (updateUser) {
        updateUser({ registrationComplete: true });
      }
      router.push("/");
    }, 800);
  };

  const languages = [
    { code: "en", name: "English (Default)" },
    { code: "hi", name: "हिंदी (Hindi)" },
    { code: "mr", name: "मराठी (Marathi)" },
    { code: "gu", name: "ગુજરાતી (Gujarati)" },
    { code: "te", name: "తెలుగు (Telugu)" }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Onboarding Progress Header */}
      <ProgressBar
        currentStep={4}
        totalSteps={5}
        percentage={80}
        stepTitle="Notifications & Preferences"
      />

      <div className="glass-card rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-4 pb-4 border-b border-[#7C83FD]/15">
          <div className="w-12 h-12 rounded-2xl bg-[#7C83FD]/15 border border-[#7C83FD]/30 flex items-center justify-center text-[#7C83FD] shrink-0">
            <Bell size={24} />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-[#EEF0FF]">
              🔔 Notifications & Preferences
            </h1>
            <p className="text-xs text-[#A5AAD6]">
              Configure language, security 2FA, and election notification settings.
            </p>
          </div>
        </div>

        {error && <Alert type="error" message={error} onClose={() => setError("")} />}

        <form onSubmit={handleComplete} className="space-y-6">
          {/* Notification Preferences Section */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#EEF0FF] flex items-center gap-2">
              <Bell size={16} className="text-[#7C83FD]" /> Election Notifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { key: "emailAlerts", label: "📧 Email alerts when elections open" },
                { key: "smsReceipts", label: "📱 SMS vote confirmation receipts" },
                { key: "resultUpdates", label: "📊 Real-time election turnout alerts" },
                { key: "securityAlerts", label: "🔐 Security & active session alerts" }
              ].map((item) => (
                <div
                  key={item.key}
                  onClick={() => handleToggle(item.key as keyof typeof preferences)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    preferences[item.key as keyof typeof preferences]
                      ? "bg-[#7C83FD]/10 border-[#7C83FD]/40 text-[#EEF0FF]"
                      : "bg-[#1A1D4A]/60 border-[#7C83FD]/15 text-[#A5AAD6]"
                  }`}
                >
                  <span className="text-xs font-semibold">{item.label}</span>
                  <input
                    type="checkbox"
                    checked={preferences[item.key as keyof typeof preferences]}
                    onChange={() => {}}
                    className="rounded bg-[#14163A] border-[#7C83FD]/40 text-[#7C83FD]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Language Selection */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#EEF0FF] flex items-center gap-2">
              <Globe size={16} className="text-[#7C83FD]" /> Regional Language Selection
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full glass-input px-4 py-3 rounded-xl text-sm font-semibold border-[#7C83FD]/30 text-[#EEF0FF] bg-[#14163A]"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-[#14163A] text-[#EEF0FF]">
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Security 2FA Toggle */}
          <div className="p-4 rounded-2xl glass-card border border-[#4B4FD8]/30 flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="text-sm font-bold text-[#EEF0FF] flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#4B4FD8]" /> Two-Factor Authentication (2FA)
              </h4>
              <p className="text-xs text-[#A5AAD6]">Require SMS OTP before confirming final vote submission</p>
            </div>
            <input
              type="checkbox"
              checked={enable2FA}
              onChange={(e) => setEnable2FA(e.target.checked)}
              className="w-5 h-5 rounded bg-[#14163A] border-[#4B4FD8]/40 text-[#4B4FD8] focus:ring-[#4B4FD8]"
            />
          </div>

          {/* GDPR Consent */}
          <div className="flex items-start gap-2.5 pt-2">
            <input
              type="checkbox"
              id="gdpr"
              checked={gdprConsent}
              onChange={(e) => setGdprConsent(e.target.checked)}
              className="mt-1 rounded bg-[#14163A] border-[#7C83FD]/30 text-[#7C83FD]"
            />
            <label htmlFor="gdpr" className="text-xs text-[#A5AAD6] leading-relaxed">
              I consent to the encrypted storage of my voter preferences and biometric verification status in compliance with SIH 2026 data governance guidelines.
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#7C83FD]/15">
            <Button
              type="button"
              variant="ghost"
              icon={ArrowLeft}
              onClick={() => router.push("/biometric")}
            >
              Back to Biometrics
            </Button>

            <Button
              type="submit"
              variant="primary"
              isLoading={isLoading}
              icon={CheckCircle2}
            >
              Complete Onboarding & Go to Dashboard
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
