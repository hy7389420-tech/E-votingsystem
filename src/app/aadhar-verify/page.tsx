"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IdCard, KeyRound, ShieldCheck, ArrowRight, CheckCircle2, RefreshCw } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import Alert from "@/components/Alert";
import { useAuth } from "@/hooks/useAuth";

export default function AadharVerifyPage() {
  const router = useRouter();
  const { user, updateUser } = useAuth();

  const [aadharNumber, setAadharNumber] = useState("5432 8765 1098");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(user?.aadharVerified || false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanAadhar = aadharNumber.replace(/\s+/g, "");

    if (cleanAadhar.length !== 12 || !/^\d+$/.test(cleanAadhar)) {
      setError("Please enter a valid 12-digit Aadhar number.");
      return;
    }

    setError("");
    setIsSendingOtp(true);

    setTimeout(() => {
      setIsSendingOtp(false);
      setOtpSent(true);
      setOtp("123456"); // Pre-fill simulated OTP for demo ease
    }, 800);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setError("Please enter the 6-digit OTP sent to your registered mobile.");
      return;
    }

    setError("");
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      setSuccess(true);
      if (updateUser) {
        updateUser({ aadharVerified: true });
      }
      setTimeout(() => {
        router.push("/biometric");
      }, 1200);
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Onboarding Progress Header */}
      <ProgressBar
        currentStep={2}
        totalSteps={5}
        percentage={40}
        stepTitle="Aadhar Verification"
      />

      {/* Main Verification Card */}
      <div className="glass-card rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-4 pb-4 border-b border-[#7C83FD]/15">
          <div className="w-12 h-12 rounded-2xl bg-[#7C83FD]/15 border border-[#7C83FD]/30 flex items-center justify-center text-[#7C83FD] shrink-0">
            <IdCard size={24} />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-[#EEF0FF]">
              🆔 Aadhar Identity Verification
            </h1>
            <p className="text-xs text-[#A5AAD6]">
              Secure Government Identity Linkage (UIDAI Verification Simulation)
            </p>
          </div>
        </div>

        <Alert
          type="info"
          title="SIH 2026 UIDAI Simulation"
          message="This portal operates on a secure simulated UIDAI sandbox. Enter any 12-digit Aadhar format (e.g., 5432 8765 1098) to trigger OTP validation."
        />

        {error && <Alert type="error" message={error} onClose={() => setError("")} />}

        {success ? (
          <div className="p-6 rounded-2xl bg-[#10b981]/10 border border-[#10b981]/30 text-center space-y-3 animate-in fade-in">
            <CheckCircle2 size={48} className="text-[#10b981] mx-auto animate-bounce" />
            <h3 className="text-lg font-bold text-[#EEF0FF]">Aadhar Verified Successfully!</h3>
            <p className="text-xs text-[#A5AAD6]">
              Your UIDAI identity has been linked. Redirecting to Step 3: Biometric Setup...
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <FormInput
                  label="Aadhar Number (12 Digits)"
                  placeholder="XXXX XXXX XXXX"
                  icon={IdCard}
                  value={aadharNumber}
                  onChange={(e) => setAadharNumber(e.target.value)}
                  helperText="Format: 12 numerical digits registered with UIDAI"
                  required
                />

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={isSendingOtp}
                  icon={ArrowRight}
                >
                  Request OTP to Registered Mobile
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4 animate-in fade-in">
                <Alert
                  type="success"
                  message="OTP dispatched! For SIH testing, 6-digit OTP code 123456 has been auto-filled."
                />

                <FormInput
                  label="Enter 6-Digit OTP"
                  placeholder="123456"
                  icon={KeyRound}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  required
                />

                <div className="flex items-center justify-between text-xs text-[#A5AAD6]">
                  <span>OTP sent to +91-XXXXXX3210</span>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="text-[#7C83FD] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <RefreshCw size={12} /> Resend OTP
                  </button>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={isVerifying}
                  icon={ShieldCheck}
                >
                  Verify Aadhar & Continue
                </Button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
