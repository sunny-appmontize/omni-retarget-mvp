// src/app/auth/layout.js
import { Zap } from "lucide-react";

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen w-full bg-card font-sans">
      {/* LEFT PANEL - Permanently Dark Branding (Matches your Sidebar) */}
      <div className="hidden lg:flex w-1/2 bg-[#090E17] border-r border-slate-800/50 flex-col justify-between p-12 relative overflow-hidden">
        {/* Abstract background element */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-indigo-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 flex items-center gap-2 text-white">
          <Zap size={20} className="text-white" />
          <span className="text-xl font-bold tracking-tight">OT</span>
        </div>

        <div className="relative z-10 space-y-6 max-w-md">
          <h1 className="text-3xl font-bold text-white tracking-tight leading-tight">
            Advanced audience intelligence, simplified.
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            Join top marketers using OmniTarget to track programmatic campaigns,
            manage user lifecycles, and drive higher conversions across Tier 2
            markets.
          </p>
        </div>

        <div className="relative z-10 text-xs text-slate-500">
          © {new Date().getFullYear()} OmniTarget Inc. All rights reserved.
        </div>
      </div>

      {/* RIGHT PANEL - The Dynamic Forms */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
