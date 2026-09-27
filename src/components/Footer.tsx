import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-600 text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-semibold text-zinc-900 dark:text-white">NextPulse</span>
        </div>

        <p className="text-xs text-zinc-500">
          © {new Date().getFullYear()} NextPulse. Built with Next.js & Tailwind CSS.
        </p>

        <div className="flex items-center gap-6 text-xs text-zinc-500">
          <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Terms</a>
          <a href="https://nextjs.org" target="_blank" rel="noreferrer" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Next.js Docs</a>
        </div>
      </div>
    </footer>
  );
}
