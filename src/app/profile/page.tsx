"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User as UserIcon, ShieldCheck, Mail, Phone, Calendar, MapPin, CheckCircle2, Edit3, Camera, Fingerprint, QrCode, IdCard, ArrowRight } from "lucide-react";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import FormInput from "@/components/FormInput";
import Alert from "@/components/Alert";
import { useAuth } from "@/hooks/useAuth";

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [phone, setPhone] = useState(user?.phone || "+91-9876543210");
  const [city, setCity] = useState(user?.city || "Bhopal");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (updateUser) {
      updateUser({ phone, city });
    }
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setShowEditModal(false);
    }, 1000);
  };

  const biometrics = [
    { label: "Aadhar Linkage", verified: user?.aadharVerified ?? true, icon: IdCard, text: "UIDAI Verified" },
    { label: "Face Recognition", verified: user?.biometricStatus?.face ?? true, icon: Camera, text: "3D Geometry Saved" },
    { label: "Fingerprint Scan", verified: user?.biometricStatus?.fingerprint ?? true, icon: Fingerprint, text: "Ridge Data Secured" },
    { label: "Voter QR Code", verified: user?.biometricStatus?.qr ?? true, icon: QrCode, text: "Token Activated" }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-card rounded-3xl p-6 md:p-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#4B4FD8] to-[#7C83FD] p-[2px] shadow-lg shrink-0">
            <div className="w-full h-full bg-[#14163A] rounded-[14px] flex items-center justify-center font-black text-xl text-[#7C83FD]">
              HY
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-[#EEF0FF]">{user?.name || "Harsh Yadav"}</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#10b981]/15 text-[#10b981] text-[10px] font-bold border border-[#10b981]/30">
                ACTIVE VOTER
              </span>
            </div>
            <p className="text-xs text-[#A5AAD6]">Voter ID: {user?.id || "USR-001234567"} • B.Tech ECE IV</p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <Button variant="outline" size="sm" icon={Edit3} onClick={() => setShowEditModal(true)}>
            Edit Profile
          </Button>
          <Link href="/security">
            <Button variant="primary" size="sm" icon={ShieldCheck}>
              Security Settings
            </Button>
          </Link>
        </div>
      </div>

      {/* Personal Information Grid */}
      <div className="glass-card rounded-3xl p-6 md:p-8 space-y-4 border border-[#7C83FD]/20 shadow-2xl">
        <h3 className="font-bold text-base text-[#EEF0FF] pb-2 border-b border-[#7C83FD]/15">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-[#14163A]/60 border border-[#7C83FD]/15 space-y-1">
            <span className="text-[10px] text-[#A5AAD6] uppercase font-bold flex items-center gap-1.5">
              <UserIcon size={14} className="text-[#7C83FD]" /> Full Legal Name
            </span>
            <p className="font-bold text-[#EEF0FF] text-sm">{user?.name || "Harsh Yadav"}</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#14163A]/60 border border-[#7C83FD]/15 space-y-1">
            <span className="text-[10px] text-[#A5AAD6] uppercase font-bold flex items-center gap-1.5">
              <Mail size={14} className="text-[#7C83FD]" /> Registered Email
            </span>
            <p className="font-bold text-[#EEF0FF] text-sm">{user?.email || "harsh.yadav@example.com"}</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#14163A]/60 border border-[#7C83FD]/15 space-y-1">
            <span className="text-[10px] text-[#A5AAD6] uppercase font-bold flex items-center gap-1.5">
              <Phone size={14} className="text-[#4B4FD8]" /> Mobile Contact
            </span>
            <p className="font-bold text-[#EEF0FF] text-sm">{user?.phone || "+91-9876543210"}</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#14163A]/60 border border-[#7C83FD]/15 space-y-1">
            <span className="text-[10px] text-[#A5AAD6] uppercase font-bold flex items-center gap-1.5">
              <Calendar size={14} className="text-[#d946ef]" /> Date of Birth
            </span>
            <p className="font-bold text-[#EEF0FF] text-sm">{user?.dob || "2005-05-15"}</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#14163A]/60 border border-[#7C83FD]/15 space-y-1">
            <span className="text-[10px] text-[#A5AAD6] uppercase font-bold flex items-center gap-1.5">
              <MapPin size={14} className="text-[#f59e0b]" /> Constituency / City
            </span>
            <p className="font-bold text-[#EEF0FF] text-sm">{user?.city || "Bhopal, Madhya Pradesh"}</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#14163A]/60 border border-[#7C83FD]/15 space-y-1">
            <span className="text-[10px] text-[#A5AAD6] uppercase font-bold flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-[#10b981]" /> Eligibility Status
            </span>
            <p className="font-bold text-[#10b981] text-sm flex items-center gap-1">
              <CheckCircle2 size={16} /> Verified Citizen (18+ Eligible)
            </p>
          </div>
        </div>
      </div>

      {/* Verified Biometric Status Cards */}
      <div className="glass-card rounded-3xl p-6 md:p-8 space-y-4 border border-[#7C83FD]/20 shadow-2xl">
        <h3 className="font-bold text-base text-[#EEF0FF] pb-2 border-b border-[#7C83FD]/15 flex items-center justify-between">
          <span>Biometric & Identity Credentials</span>
          <Link href="/biometric" className="text-xs text-[#7C83FD] hover:underline flex items-center gap-1">
            Manage Scans <ArrowRight size={14} />
          </Link>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {biometrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#14163A]/80 border border-[#10b981]/30 space-y-2 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-xl bg-[#10b981]/15 text-[#10b981] flex items-center justify-center">
                    <Icon size={18} />
                  </div>
                  <span className="text-[10px] font-bold text-[#10b981] px-2 py-0.5 rounded-full bg-[#10b981]/15">
                    ✓ Verified
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-[#EEF0FF]">{item.label}</h4>
                  <p className="text-[10px] text-[#A5AAD6] mt-0.5">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <Modal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          title="Edit Profile Information"
          maxWidth="md"
        >
          <form onSubmit={handleSaveProfile} className="space-y-4">
            {saveSuccess && <Alert type="success" message="Profile information updated successfully!" />}

            <FormInput
              label="Phone Number"
              placeholder="+91-9876543210"
              icon={Phone}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <FormInput
              label="City / Constituency"
              placeholder="Bhopal, MP"
              icon={MapPin}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />

            <div className="pt-3 flex justify-end gap-3 border-t border-[#7C83FD]/15">
              <Button type="button" variant="ghost" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save Changes
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
