"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Fingerprint, QrCode, Eye, CheckCircle2, ArrowRight, ArrowLeft, Loader2, Sparkles } from "lucide-react";
import ProgressBar from "@/components/ProgressBar";
import Button from "@/components/Button";
import Alert from "@/components/Alert";
import { useBiometric } from "@/hooks/useBiometric";

export default function BiometricPage() {
  const router = useRouter();
  const { biometrics, verifyBiometric, allRequiredVerified } = useBiometric();

  const [scanningType, setScanningType] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleScan = async (type: keyof typeof biometrics) => {
    setScanningType(type);
    setError("");
    try {
      await verifyBiometric(type);
    } catch (err) {
      setError("Failed to process biometric scan. Please retry.");
    } finally {
      setScanningType(null);
    }
  };

  const handleComplete = () => {
    if (!allRequiredVerified) {
      setError("Please complete all 3 required biometric scans (Face, Fingerprint, QR Code).");
      return;
    }
    router.push("/notifications");
  };

  const scanItems = [
    {
      id: "face",
      title: "📸 Face Recognition Scan",
      desc: "Live 3D facial geometry mapping & anti-spoofing check",
      required: true,
      icon: Camera,
      status: biometrics.face
    },
    {
      id: "fingerprint",
      title: "👆 Fingerprint Authentication",
      desc: "Multi-finger biometric ridge capture simulation",
      required: true,
      icon: Fingerprint,
      status: biometrics.fingerprint
    },
    {
      id: "qr",
      title: "📱 Voter QR Verification",
      desc: "Mobile identity token & digital cryptographic key",
      required: true,
      icon: QrCode,
      status: biometrics.qr
    },
    {
      id: "iris",
      title: "👁️ Iris Pattern Scan",
      desc: "High-precision ocular biometric verification (Optional)",
      required: false,
      icon: Eye,
      status: biometrics.iris
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Onboarding Progress Header */}
      <ProgressBar
        currentStep={3}
        totalSteps={5}
        percentage={60}
        stepTitle="Biometric Registration"
      />

      <div className="glass-card rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#7C83FD]/15">
          <div>
            <h1 className="text-xl md:text-2xl font-black text-[#EEF0FF]">
              📸 Biometric Registration
            </h1>
            <p className="text-xs text-[#A5AAD6]">
              Register multi-layer biometric credentials for tamper-proof vote authorization.
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7C83FD]/10 text-[#7C83FD] text-xs font-bold border border-[#7C83FD]/30">
            <Sparkles size={14} /> AI Biometric Engine Active
          </span>
        </div>

        {error && <Alert type="error" message={error} onClose={() => setError("")} />}

        {/* 2x2 Grid of Scan Option Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scanItems.map((item) => {
            const Icon = item.icon;
            const isScanning = scanningType === item.id;
            const isVerified = item.status;

            return (
              <div
                key={item.id}
                className={`glass-card rounded-2xl p-5 border transition-all flex flex-col justify-between space-y-4 ${
                  isVerified
                    ? "border-[#10b981]/40 bg-[#10b981]/5 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                    : "border-[#7C83FD]/20 hover:border-[#7C83FD]/40"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-[#EEF0FF]">{item.title}</h3>
                      {item.required ? (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#ef4444]/15 text-[#ef4444] font-semibold border border-[#ef4444]/30">
                          Required
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#A5AAD6]/15 text-[#A5AAD6] font-semibold">
                          Optional
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#A5AAD6]">{item.desc}</p>
                  </div>

                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                      isVerified
                        ? "bg-[#10b981]/20 border-[#10b981]/40 text-[#10b981]"
                        : "bg-[#7C83FD]/15 border-[#7C83FD]/30 text-[#7C83FD]"
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                </div>

                <div className="pt-2 border-t border-[#7C83FD]/10 flex items-center justify-between">
                  <span className="text-xs font-semibold">
                    {isVerified ? (
                      <span className="flex items-center gap-1.5 text-[#10b981]">
                        <CheckCircle2 size={16} /> Verified & Secured
                      </span>
                    ) : (
                      <span className="text-[#A5AAD6]">Status: Pending Capture</span>
                    )}
                  </span>

                  <button
                    onClick={() => handleScan(item.id as keyof typeof biometrics)}
                    disabled={isScanning}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                      isVerified
                        ? "bg-[#10b981]/15 text-[#10b981] hover:bg-[#10b981]/25 border border-[#10b981]/30"
                        : "glass-button-primary"
                    }`}
                  >
                    {isScanning ? (
                      <>
                        <Loader2 size={14} className="animate-spin" /> Scanning...
                      </>
                    ) : isVerified ? (
                      "Re-Scan"
                    ) : (
                      "Start Scan"
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#7C83FD]/15">
          <Button
            variant="ghost"
            icon={ArrowLeft}
            onClick={() => router.push("/aadhar-verify")}
          >
            Back to Aadhar Verification
          </Button>

          <Button
            variant="primary"
            icon={ArrowRight}
            onClick={handleComplete}
            disabled={!allRequiredVerified}
          >
            Proceed to Step 4: Preferences
          </Button>
        </div>
      </div>
    </div>
  );
}
