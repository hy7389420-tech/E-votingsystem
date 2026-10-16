"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, User, Mail, Phone, Calendar, MapPin, Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import Alert from "@/components/Alert";
import { useAuth } from "@/hooks/useAuth";

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    city: "",
    password: "",
    confirmPassword: ""
  });

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setError("Please fill in all required personal information fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match. Please check your entries.");
      return;
    }

    if (!agreeTerms) {
      setError("You must agree to the Terms of Service & Privacy Policy.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await signup({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        dob: formData.dob,
        city: formData.city
      });
      // Redirect to Aadhar verification (Step 2 of onboarding flow)
      router.push("/aadhar-verify");
    } catch (err) {
      setError("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#14163A] flex flex-col justify-center items-center p-4 relative overflow-hidden my-6">
      {/* Background Glows */}
      <div className="absolute top-10 right-1/3 w-[500px] h-[500px] bg-[#7C83FD]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-2xl space-y-6 relative z-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#7C83FD] via-[#7C83FD] to-[#4B4FD8] p-[1.5px] shadow-[0_0_30px_rgba(124, 131, 253,0.3)] mb-2">
            <div className="w-full h-full bg-[#14163A] rounded-[14px] flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-[#7C83FD]" />
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-[#EEF0FF] tracking-tight">
            Voter Registration
          </h1>
          <p className="text-xs text-[#A5AAD6]">
            Step 1 of 5 • Create your secure digital voter identity
          </p>
        </div>

        {/* Signup Card */}
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-[#7C83FD]/30 shadow-2xl space-y-6">
          {error && <Alert type="error" message={error} onClose={() => setError("")} />}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="First Name"
                name="firstName"
                placeholder="Harsh"
                icon={User}
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <FormInput
                label="Last Name"
                name="lastName"
                placeholder="Yadav"
                icon={User}
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="harsh.yadav@example.com"
                icon={Mail}
                value={formData.email}
                onChange={handleChange}
                required
              />
              <FormInput
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="+91-9876543210"
                icon={Phone}
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Date of Birth"
                name="dob"
                type="date"
                icon={Calendar}
                value={formData.dob}
                onChange={handleChange}
                required
              />
              <FormInput
                label="City / State"
                name="city"
                placeholder="Bhopal, MP"
                icon={MapPin}
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••••••"
                icon={Lock}
                value={formData.password}
                onChange={handleChange}
                required
              />
              <FormInput
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="••••••••••••"
                icon={Lock}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-2.5 pt-2">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1 rounded bg-[#14163A] border-[#7C83FD]/30 text-[#7C83FD] focus:ring-[#7C83FD]"
              />
              <label htmlFor="agreeTerms" className="text-xs text-[#A5AAD6] leading-relaxed">
                I certify that I am an Indian citizen aged 18+ and agree to the{" "}
                <a href="#" className="text-[#7C83FD] underline">
                  Terms of Voting Service
                </a>{" "}
                and Privacy Policy.
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
              icon={ArrowRight}
              className="mt-4"
            >
              Proceed to Aadhar Verification
            </Button>
          </form>

          {/* Footer Link */}
          <div className="text-center pt-2 text-xs text-[#A5AAD6]">
            Already have an account?{" "}
            <Link href="/login" className="text-[#7C83FD] font-bold hover:underline">
              Sign In Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
