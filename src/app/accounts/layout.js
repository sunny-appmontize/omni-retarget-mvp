"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Settings as SettingsIcon,
  Bell,
  ShieldAlert,
  ArrowLeft,
} from "lucide-react";

const tabs = [
  { id: "profile", href: "/accounts/profile", label: "Profile", icon: User },
  // {
  //   id: "settings",
  //   href: "/accounts/settings",
  //   label: "Account Settings",
  //   icon: SettingsIcon,
  // },
  {
    id: "notifications",
    href: "/accounts/notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "danger",
    href: "/accounts/danger",
    label: "Danger Zone",
    icon: ShieldAlert,
  },
];

export default function AccountsLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="w-full min-h-screen bg-background p-4 md:p-10 space-y-8">
      {/* --- HEADER --- */}
      <div className="flex mx-auto max-w-5xl gap-5 items-center relative">
        <Link
          href="/dashboard"
          className="inline-flex absolute -left-14 items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-7 w-7" />
        </Link>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Account Settings
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage your identity and security preferences.
          </p>
        </div>
      </div>

      <div className="border-t border-border/60 max-w-5xl mx-auto" />

      {/* --- MAIN LAYOUT --- */}
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12 mx-auto max-w-5xl">
        {/* SIDEBAR - Locked Width */}
        <aside className="w-full md:w-[240px] md:min-w-[240px] md:shrink-0 sticky top-8 self-start">
          <nav className="flex md:flex-col gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = pathname === tab.href;

              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all whitespace-nowrap
                    ${
                      isActive
                        ? // Using your solid --primary color for a massive visual upgrade
                          "bg-primary text-primary-foreground shadow-md"
                        : // Clean hover states using your --muted colors
                          "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }
                  `}
                >
                  <Icon
                    className={`h-4 w-4 ${
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground"
                    }`}
                  />
                  {tab.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* CONTENT AREA - Wrapped in your --card theme with a border */}
        <main className="flex-1 min-w-0 bg-card text-card-foreground border border-border/50 rounded-xl shadow-sm p-6 md:p-8 ">
          {children}
        </main>
      </div>
    </div>
  );
}
