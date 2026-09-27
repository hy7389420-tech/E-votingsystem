"use client";

import { ArrowRight, Terminal, ShieldCheck, Zap, Copy, Check } from "lucide-react";
import { useState } from "react";

export function Hero() {
  const [copied, setCopied] = useState(false);
  const command = "npm run dev";

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden py-24 md:py-32 bg-zinc-50 dark:bg-zinc-950 transition-colors">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/10 via-purple-500/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 mb-8 backdrop-blur-sm">
          <Zap className="w-3.5 h-3.5" /> Next.js App Ready
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white max-w-4xl leading-tight">
          Build Modern Web Apps <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            At Lightning Speed
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl font-normal leading-relaxed">
          Your new Next.js project is fully initialized with App Router, Tailwind CSS, TypeScript, and modern design components.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <a
            href="#get-started"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            Explore Dashboard <ArrowRight className="w-4 h-4" />
          </a>

          <div className="w-full sm:w-auto flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-zinc-900 text-zinc-300 font-mono text-xs border border-zinc-800 shadow-inner">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span>{command}</span>
            </div>
            <button
              onClick={handleCopy}
              className="p-1 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
              title="Copy to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Feature stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl border-t border-zinc-200 dark:border-zinc-800/80 pt-10">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-zinc-900 dark:text-white">100%</span>
            <span className="text-xs text-zinc-500 mt-1">TypeScript Ready</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-zinc-900 dark:text-white">App Router</span>
            <span className="text-xs text-zinc-500 mt-1">Next.js Architecture</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-zinc-900 dark:text-white">Tailwind CSS</span>
            <span className="text-xs text-zinc-500 mt-1">Modern Styling</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-zinc-900 dark:text-white">Fullstack</span>
            <span className="text-xs text-zinc-500 mt-1">API Routes Included</span>
          </div>
        </div>
      </div>
    </section>
  );
}
