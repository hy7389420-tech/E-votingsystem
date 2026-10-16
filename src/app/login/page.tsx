"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, Mail, Lock, ArrowRight, Globe, Sparkles } from "lucide-react";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import Alert from "@/components/Alert";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your registered email address.");
      return;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      router.push("/");
    } catch (err) {
      setError("Invalid login credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoFill = () => {
    setEmail("harsh.yadav@example.com");
    setPassword("password123");
    setError("");
  };

  return (
    <div className="min-h-screen bg-[#14163A] flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7C83FD]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7C83FD]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#7C83FD] via-[#7C83FD] to-[#4B4FD8] p-[1.5px] shadow-[0_0_30px_rgba(124, 131, 253,0.3)] mb-2">
            <div className="w-full h-full bg-[#14163A] rounded-[14px] flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-[#7C83FD]" />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-[#EEF0FF] tracking-tight">
            Voter Login
          </h1>
          <p className="text-xs text-[#A5AAD6]">
            Smart Secure E-Voting Portal • SIH 2026 Submission
          </p>
        </div>

        {/* Login Card */}
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-[#7C83FD]/30 shadow-2xl space-y-6">
          {error && <Alert type="error" message={error} onClose={() => setError("")} />}

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              label="Email Address"
              type="email"
              placeholder="voter@evoting.gov.in"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <FormInput
              label="Password"
              type="password"
              placeholder="••••••••••••"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between text-xs pt-1">
              <button
                type="button"
                onClick={handleDemoFill}
                className="text-[#7C83FD] hover:underline font-semibold flex items-center gap-1"
              >
                <Sparkles size={13} /> Fill Demo Credentials
              </button>
              <a href="#" className="text-[#A5AAD6] hover:text-[#EEF0FF] transition-colors">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
              icon={ArrowRight}
              className="mt-2"
            >
              Sign In to Vote
            </Button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-[#7C83FD]/15 w-full" />
            <span className="bg-[#1A1D4A] px-3 text-[10px] uppercase font-bold text-[#A5AAD6] absolute">
              Or continue with
            </span>
          </div>

          {/* Social OAuth Buttons */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { name: "Google", icon: Globe },
              { name: "Microsoft", icon: ShieldCheck },
              { name: "Apple", icon: Lock }
            ].map((provider, i) => (
              <button
                key={i}
                type="button"
                onClick={handleDemoFill}
                className="py-2.5 px-3 rounded-xl bg-[#14163A]/60 hover:bg-[#23275F] border border-[#7C83FD]/20 text-[#EEF0FF] text-xs font-semibold flex items-center justify-center gap-2 transition-all hover:border-[#7C83FD]/40"
              >
                <provider.icon size={15} className="text-[#7C83FD]" />
                <span className="hidden sm:inline">{provider.name}</span>
              </button>
            ))}
          </div>

          {/* Footer Link */}
          <div className="text-center pt-2 text-xs text-[#A5AAD6]">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#7C83FD] font-bold hover:underline">
              Create Voter Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
