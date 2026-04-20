"use client";
import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Megaphone,
  FileText,
  MessageSquare,
  Settings,
  Bell,
  HelpCircle,
  Menu,
  LogOut,
  Plus,
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans text-slate-900 overflow-hidden">
      {/* LUXURY SIDEBAR */}
      <aside
        className={`bg-slate-950 text-slate-400 transition-all duration-300 ease-in-out border-r border-slate-800/50 flex flex-col relative z-20 shadow-xl shadow-slate-900/10 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Top Control - Expand/Collapse (No Logo) */}
        <div className="h-16 flex items-center justify-center px-4 border-b border-white/5">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200 w-full flex justify-center"
            title="Toggle Sidebar"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Navigation & Actions Container */}
        <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-6 custom-scrollbar">
          {/* Highlighted Action Button */}
          <div className="px-4">
            <button
              className={`flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/20 group ${
                isCollapsed ? "py-3" : "py-3 px-4"
              }`}
            >
              <Plus
                size={20}
                className="transition-transform group-hover:rotate-90 duration-300"
              />
              {!isCollapsed && (
                <span className="font-medium text-sm tracking-wide">
                  Create New
                </span>
              )}
            </button>
          </div>

          {/* Main Navigation */}
          <nav className="flex-1 space-y-1 mt-2">
            <NavItem
              href="/dashboard"
              icon={<LayoutDashboard size={20} />}
              label="Dashboard"
              active={true} // Set this dynamically in your real app
              isCollapsed={isCollapsed}
            />
            <NavItem
              href="/audiences"
              icon={<Users size={20} />}
              label="Audience"
              isCollapsed={isCollapsed}
            />
            <NavItem
              href="/announcements"
              icon={<Megaphone size={20} />}
              label="Announcements"
              isCollapsed={isCollapsed}
            />
            <NavItem
              href="/reports"
              icon={<FileText size={20} />}
              label="Reports"
              isCollapsed={isCollapsed}
            />
            <NavItem
              href="/templates"
              icon={<MessageSquare size={20} />}
              label="Templates"
              isCollapsed={isCollapsed}
            />
          </nav>

          {/* System Navigation */}
          <nav className="space-y-1 pb-4 border-t border-white/5 pt-4">
            <NavItem
              href="/settings"
              icon={<Settings size={20} />}
              label="Settings"
              isCollapsed={isCollapsed}
            />
          </nav>
        </div>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-white/5 bg-slate-950/50">
          <div
            className={`flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer ${isCollapsed ? "justify-center" : ""}`}
          >
            <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center text-sm font-bold shadow-md shrink-0 ring-2 ring-slate-950">
              JS
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  John Smith
                </p>
                <p className="text-xs text-slate-500 truncate">Admin</p>
              </div>
            )}
            {!isCollapsed && (
              <LogOut
                size={16}
                className="text-slate-500 hover:text-white transition-colors"
              />
            )}
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 bg-white shadow-[-10px_0_15px_-3px_rgba(0,0,0,0.03)] z-10 rounded-l-2xl -ml-2 my-2 border border-slate-200/60">
        <header className="h-16 bg-transparent border-b border-slate-100 flex items-center justify-between px-8">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <span>Workspace</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-800 font-semibold tracking-tight">
              Dashboard
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-full transition-all">
              <Bell size={18} />
              <span className="absolute top-2 right-2 h-2 w-2 bg-rose-500 border-2 border-white rounded-full"></span>
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-50 rounded-full transition-all">
              <HelpCircle size={18} />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

function NavItem({ href, icon, label, active = false, isCollapsed }) {
  return (
    <Link
      href={href}
      className={`relative flex items-center gap-3 py-3 transition-all duration-200 group mx-3 rounded-lg overflow-hidden ${
        active
          ? "bg-indigo-500/10 text-white"
          : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
      } ${isCollapsed ? "justify-center px-0" : "px-4"}`}
    >
      {/* Luxury active strip indicator */}
      {active && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
      )}

      <span
        className={`relative z-10 transition-colors ${active ? "text-indigo-400" : "group-hover:text-slate-300"}`}
      >
        {icon}
      </span>

      {!isCollapsed && (
        <span className="relative z-10 font-medium text-sm tracking-wide">
          {label}
        </span>
      )}
    </Link>
  );
}
