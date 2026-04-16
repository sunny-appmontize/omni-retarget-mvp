"use client";
import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Zap,
  MessageSquare,
  Settings,
  Bell,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-white font-sans text-slate-900 overflow-hidden">
      {/* SIDEBAR */}
      <aside
        className={`bg-slate-950 text-slate-400 transition-all duration-300 border-r border-slate-800 flex flex-col ${
          isCollapsed ? "w-16" : "w-60"
        }`}
      >
        {/* Logo Area */}
        <div className="h-14 flex items-center px-4 border-b border-slate-800">
          <Zap className="h-5 w-5 text-indigo-500 shrink-0" />
          {!isCollapsed && (
            <span className="ml-3 font-bold tracking-tighter text-white text-sm uppercase">
              OmniTarget
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-6 overflow-y-auto">
          <div>
            {!isCollapsed && (
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-3">
                Core
              </p>
            )}
            <div className="space-y-1">
              <NavItem
                href="/dashboard"
                icon={<LayoutDashboard size={18} />}
                label="Journeys"
                active
                isCollapsed={isCollapsed}
              />
              <NavItem
                href="/dashboard/audiences"
                icon={<Users size={18} />}
                label="Audiences"
                isCollapsed={isCollapsed}
              />
              <NavItem
                href="/dashboard/templates"
                icon={<MessageSquare size={18} />}
                label="Templates"
                isCollapsed={isCollapsed}
              />
            </div>
          </div>

          <div>
            {!isCollapsed && (
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-3">
                System
              </p>
            )}
            <div className="space-y-1">
              <NavItem
                href="/dashboard/settings"
                icon={<Settings size={18} />}
                label="Settings"
                isCollapsed={isCollapsed}
              />
            </div>
          </div>
        </nav>

        {/* Bottom Actions */}
        <div className="p-2 border-t border-slate-800 space-y-1">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-900 text-slate-400 hover:text-white transition-colors text-sm"
          >
            {isCollapsed ? (
              <ChevronRight size={18} />
            ) : (
              <>
                <ChevronLeft size={18} /> <span>Collapse</span>
              </>
            )}
          </button>
          <div className="flex items-center gap-3 px-3 py-3 hover:bg-slate-900 text-slate-400 hover:text-white transition-colors cursor-pointer">
            <div className="h-6 w-6 bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
              JS
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white truncate">
                  John Smith
                </p>
              </div>
            )}
            {!isCollapsed && <LogOut size={14} />}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <span>Workspace</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-900 font-bold uppercase tracking-tight">
              Journeys
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-1.5 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all relative">
              <Bell size={16} className="text-slate-600" />
              <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-indigo-600 rounded-full"></span>
            </button>
            <button className="p-1.5 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all">
              <HelpCircle size={16} className="text-slate-600" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6 bg-slate-50/50">
          {children}
        </main>
      </div>
    </div>
  );
}

function NavItem({ href, icon, label, active = false, isCollapsed }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 transition-all text-sm font-medium ${
        active
          ? "bg-indigo-600 text-white shadow-sm"
          : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
      } ${isCollapsed ? "justify-center" : ""}`}
    >
      <span className={active ? "text-white" : "text-slate-400"}>{icon}</span>
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
}
