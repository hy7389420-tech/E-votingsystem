"use client";

import React, { useState } from "react";
import { MessageSquare, Mail, Phone, Bot, Send, CheckCircle2, Clock, Headphones, AlertCircle } from "lucide-react";
import Alert from "@/components/Alert";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";

const supportChannels = [
  {
    id: "email",
    icon: Mail,
    iconColor: "#7C83FD",
    title: "Email Support",
    subtitle: "Response within 24 hours",
    contact: "support@evoting.gov.in",
    description: "Send a detailed email describing your issue. Our technical team will respond with a resolution within one business day.",
    action: "Send Email",
    href: "mailto:support@evoting.gov.in",
    badge: "24h SLA",
    badgeColor: "#7C83FD",
  },
  {
    id: "chat",
    icon: MessageSquare,
    iconColor: "#4B4FD8",
    title: "Live Chat",
    subtitle: "Available Mon–Sat, 9AM–6PM IST",
    contact: "chat.evoting.gov.in",
    description: "Connect instantly with a human support agent via our secure live chat portal. Fastest resolution for most account-related issues.",
    action: "Start Chat",
    href: "#",
    badge: "Fastest",
    badgeColor: "#4B4FD8",
  },
  {
    id: "phone",
    icon: Phone,
    iconColor: "#10b981",
    title: "Phone Support",
    subtitle: "Mon–Fri, 10AM–5PM IST",
    contact: "+91-1234-567-890",
    description: "Speak directly with a certified voter support specialist. Recommended for urgent issues like locked accounts or failed verification.",
    action: "Call Now",
    href: "tel:+911234567890",
    badge: "Urgent Issues",
    badgeColor: "#10b981",
  },
  {
    id: "ai",
    icon: Bot,
    iconColor: "#7C83FD",
    title: "AI Assistant",
    subtitle: "Available 24/7 — instant answers",
    contact: "Powered by Gemini 1.5",
    description: "Our AI chatbot can instantly answer common questions about registration, voting procedures, biometric setup, and receipt verification.",
    action: "Open Chatbot",
    href: "#",
    badge: "24/7 Available",
    badgeColor: "#7C83FD",
  },
];

const recentTickets = [
  { id: "TKT-4821", subject: "Biometric verification not completing", status: "RESOLVED", date: "2026-09-25", statusColor: "#10b981" },
  { id: "TKT-4720", subject: "Cannot access voting history", status: "CLOSED", date: "2026-09-22", statusColor: "#A5AAD6" },
  { id: "TKT-4699", subject: "OTP not received on mobile", status: "RESOLVED", date: "2026-09-20", statusColor: "#10b981" },
];

const subjectOptions = [
  "Account & Login Issues",
  "Aadhar Verification Problem",
  "Biometric Registration Help",
  "Voting or Receipt Issue",
  "Results & Analytics Query",
  "Security Concern",
  "Other / General Inquiry",
];

export default function SupportPage() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: subjectOptions[0], message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="glass-card rounded-3xl p-6 md:p-8 border border-[#7C83FD]/20">
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4B4FD8]/20 to-[#7C83FD]/20 border border-[#4B4FD8]/30 flex items-center justify-center">
              <Headphones size={28} className="text-[#4B4FD8]" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-[#EEF0FF]">Customer Support</h1>
              <p className="text-xs text-[#A5AAD6] mt-1">
                4 support channels • Average response time: &lt; 2 hours
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 text-[10px] font-bold text-[#10b981]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse inline-block"></span>
            All Systems Operational
          </div>
        </div>
      </div>

      {/* Support Channels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {supportChannels.map((ch) => {
          const Icon = ch.icon;
          return (
            <div
              key={ch.id}
              className="glass-card rounded-2xl p-5 border border-[#7C83FD]/15 hover:border-[#7C83FD]/35 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Glow blob */}
              <div
                className="absolute -right-8 -bottom-8 w-28 h-28 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none"
                style={{ backgroundColor: ch.iconColor }}
              />

              <div className="flex items-start gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                  style={{
                    backgroundColor: `${ch.iconColor}15`,
                    color: ch.iconColor,
                    border: `1px solid ${ch.iconColor}30`,
                  }}
                >
                  <Icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#EEF0FF]">{ch.title}</h3>
                    <span
                      className="text-[9px] font-black px-2 py-0.5 rounded-full border"
                      style={{
                        backgroundColor: `${ch.badgeColor}15`,
                        color: ch.badgeColor,
                        borderColor: `${ch.badgeColor}30`,
                      }}
                    >
                      {ch.badge}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#A5AAD6] mt-0.5">{ch.subtitle}</p>
                  <p className="text-[10px] font-mono text-[#EEF0FF]/60 mt-1">{ch.contact}</p>
                </div>
              </div>

              <p className="text-[11px] text-[#A5AAD6] mt-3 leading-relaxed">{ch.description}</p>

              <a
                href={ch.href}
                className="mt-4 w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                style={{
                  background: `linear-gradient(135deg, ${ch.iconColor}25, ${ch.iconColor}10)`,
                  border: `1px solid ${ch.iconColor}35`,
                  color: ch.iconColor,
                }}
              >
                {ch.action} →
              </a>
            </div>
          );
        })}
      </div>

      {/* Contact Form + Ticket History */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Contact Form */}
        <div className="lg:col-span-3 glass-card rounded-2xl p-6 border border-[#7C83FD]/20">
          <h3 className="font-bold text-base text-[#EEF0FF] flex items-center gap-2 mb-5">
            <Send size={16} className="text-[#7C83FD]" />
            Submit a Support Ticket
          </h3>

          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 gap-4 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#10b981]/15 border border-[#10b981]/30 flex items-center justify-center">
                <CheckCircle2 size={32} className="text-[#10b981]" />
              </div>
              <div>
                <p className="font-bold text-[#EEF0FF] text-sm">Ticket Submitted Successfully!</p>
                <p className="text-xs text-[#A5AAD6] mt-1">
                  Your ticket has been assigned ID <span className="font-mono text-[#7C83FD]">TKT-4822</span>.
                  <br />
                  You&apos;ll receive a response at <span className="text-[#7C83FD]">{formData.email}</span> within 24 hours.
                </p>
              </div>
              <button
                onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", subject: subjectOptions[0], message: "" }); }}
                className="glass-button-secondary px-4 py-2 rounded-xl text-xs font-bold"
              >
                Submit Another Ticket
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  label="Full Name"
                  placeholder="Harsh Yadav"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
                <FormInput
                  label="Email Address"
                  type="email"
                  placeholder="harsh@example.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                />
              </div>

              {/* Subject Select */}
              <div>
                <label className="text-xs font-semibold text-[#A5AAD6] mb-1.5 block">Subject / Category</label>
                <select
                  value={formData.subject}
                  onChange={(e) => handleChange("subject", e.target.value)}
                  className="glass-input w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none appearance-none cursor-pointer"
                >
                  {subjectOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#1A1D4A] text-[#EEF0FF]">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="text-xs font-semibold text-[#A5AAD6] mb-1.5 block">Message / Description</label>
                <textarea
                  rows={4}
                  placeholder="Please describe your issue in detail. Include any error messages, steps to reproduce, or screenshots if possible..."
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  className="glass-input w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none resize-none leading-relaxed"
                  required
                />
                <p className="text-[10px] text-[#5c6280] mt-1">{formData.message.length}/500 characters</p>
              </div>

              <Alert
                type="info"
                message="Your ticket will be processed within 24 hours. For urgent issues (locked account, voting failure), use Phone or Live Chat for faster support."
              />

              <Button
                type="submit"
                variant="primary"
                icon={Send}
                className="w-full"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Support Ticket"}
              </Button>
            </form>
          )}
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-4">
          {/* Recent Tickets */}
          <div className="glass-card rounded-2xl p-5 border border-[#7C83FD]/15">
            <h3 className="font-bold text-sm text-[#EEF0FF] flex items-center gap-2 mb-4">
              <Clock size={14} className="text-[#A5AAD6]" />
              Recent Ticket History
            </h3>
            <div className="space-y-3">
              {recentTickets.map((t) => (
                <div key={t.id} className="p-3 rounded-xl bg-[#14163A]/60 border border-[#7C83FD]/10">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-mono text-[10px] text-[#A5AAD6]">{t.id}</span>
                    <span
                      className="text-[9px] font-black px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: `${t.statusColor}15`, color: t.statusColor }}
                    >
                      {t.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#EEF0FF] font-medium leading-snug">{t.subject}</p>
                  <p className="text-[10px] text-[#5c6280] mt-0.5">{t.date}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Support Hours */}
          <div className="glass-card rounded-2xl p-5 border border-[#4B4FD8]/20">
            <h3 className="font-bold text-sm text-[#EEF0FF] flex items-center gap-2 mb-4">
              <AlertCircle size={14} className="text-[#f59e0b]" />
              Support Hours & SLA
            </h3>
            <div className="space-y-2 text-xs">
              {[
                { label: "Email Support", value: "24h SLA, 7 days", color: "#7C83FD" },
                { label: "Live Chat", value: "Mon–Sat, 9AM–6PM IST", color: "#4B4FD8" },
                { label: "Phone Support", value: "Mon–Fri, 10AM–5PM IST", color: "#10b981" },
                { label: "AI Chatbot", value: "24/7 — instant answers", color: "#7C83FD" },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between">
                  <span className="text-[#A5AAD6]">{row.label}</span>
                  <span className="font-semibold" style={{ color: row.color }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
