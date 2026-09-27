import { Cpu, Layers, ShieldCheck, Zap, Globe, Sparkles } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Server Components",
    description: "Render dynamic UI on the server for maximum speed and reduced client bundle size.",
  },
  {
    icon: Layers,
    title: "Modular Component System",
    description: "Built with reusable TypeScript components designed for high maintainability.",
  },
  {
    icon: ShieldCheck,
    title: "Type Safety & Validation",
    description: "End-to-end type check safety with TypeScript and modern linter guidelines.",
  },
  {
    icon: Cpu,
    title: "API & Backend Support",
    description: "Seamlessly integrate serverless functions, database queries, and REST/GraphQL APIs.",
  },
  {
    icon: Globe,
    title: "SEO & OpenGraph Optimized",
    description: "Pre-configured metadata tags for search engine rankings and social preview cards.",
  },
  {
    icon: Sparkles,
    title: "Modern UI Aesthetics",
    description: "Dark mode support, glassmorphism, and responsive Tailwind CSS layout tokens.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight sm:text-4xl">
            Everything you need to build faster
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            A production-ready foundation with pre-configured tools and modern web conventions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
