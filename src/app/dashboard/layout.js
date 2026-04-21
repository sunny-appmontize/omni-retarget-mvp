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
  LogOut,
  Plus,
  ChevronsRight,
  ChevronsLeft,
  ChartColumnBig,
  ChevronUp,
  User,
  ChevronRight,
  CircleUserRound,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ModeToggle";
import { usePathname } from "next/navigation";
import { Card } from "@/components/ui/card";
import { logoutUser } from "@/actions/auth";

export default function DashboardLayout({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const pathname = usePathname();

  const formatSegment = (segment) => {
    return segment.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const segments = pathname.split("/").filter(Boolean);

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <div className="flex h-screen bg-background font-sans text-foreground overflow-hidden">
      {/* PERMANENTLY DARK SIDEBAR (Using exact oklch raw values) */}
      <aside
        className={cn(
          "bg-[oklch(0.214_0.009_43.1)] text-[oklch(0.986_0.002_67.8)] transition-all duration-300 ease-in-out flex flex-col relative z-20 ",
          isCollapsed ? "w-[60px]" : "w-[180px]",
        )}
      >
        {/* Toggle Button */}
        <div className="h-auto flex items-center justify-center px-4 absolute -top-1 -right-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-[oklch(0.714_0.014_41.2)] hover:text-[oklch(0.986_0.002_67.8)] rounded-r-full pl-2 pr-1 bg-[oklch(0.214_0.009_43.1)] w-full hover:bg-[oklch(0.214_0.009_43.1)] "
          >
            {isCollapsed ? (
              <ChevronsRight size={20} />
            ) : (
              <ChevronsLeft size={20} />
            )}
          </Button>
        </div>

        {/* Navigation & Actions */}
        <div className="flex-1 overflow-y-auto py-8 flex flex-col gap-2 custom-scrollbar">
          <div className="pl-1 pr-2 mb-4">
            <Button
              className={cn(
                "w-full bg-[oklch(0.438_0.218_303.724)] hover:bg-[oklch(0.438_0.218_303.724)/90%] text-[oklch(0.977_0.014_308.299)] shadow-md group transition-all duration-300 flex items-center border-0",
                isCollapsed
                  ? "py-4 px-2 justify-center rounded-full"
                  : "py-5 px-4 justify-start rounded-xl",
              )}
            >
              <Plus
                size={20}
                className={cn(
                  "transition-all duration-300 group-hover:rotate-90 shrink-0",
                  !isCollapsed && "mr-2",
                )}
              />
              <span
                className={cn(
                  "font-medium text-xs tracking-wide transition-all duration-300 whitespace-nowrap",
                  isCollapsed
                    ? "opacity-0 translate-x-2 absolute"
                    : "opacity-100 translate-x-0 delay-100",
                )}
              >
                Create New
              </span>
            </Button>
          </div>

          <nav className="flex-1 space-y-1">
            <NavItem
              href="/dashboard"
              icon={<LayoutDashboard size={18} />}
              label="Dashboard"
              active={pathname === "/dashboard"}
              isCollapsed={isCollapsed}
            />
            <NavItem
              href="/dashboard/analytics"
              icon={<ChartColumnBig size={18} />}
              label="Analytics"
              active={pathname == "/dashboard/analytics"}
              isCollapsed={isCollapsed}
            />
            <NavItem
              href="/dashboard/audiences"
              icon={<Users size={18} />}
              label="Audience"
              active={pathname == "/dashboard/audiences"}
              isCollapsed={isCollapsed}
            />
            <NavItem
              href="/dashboard/announcements"
              icon={<Megaphone size={18} />}
              label="Announcements"
              active={pathname === "/dashboard/announcements"}
              isCollapsed={isCollapsed}
            />
            <NavItem
              href="/dashboard/reports"
              icon={<FileText size={18} />}
              label="Reports"
              active={pathname === "/dashboard/reports"}
              isCollapsed={isCollapsed}
            />
            <NavItem
              href="/dashboard/templates"
              icon={<MessageSquare size={18} />}
              label="Templates"
              active={pathname === "/dashboard/templates"}
              isCollapsed={isCollapsed}
            />
          </nav>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-[oklch(1_0_0/10%)] bg-[oklch(0.214_0.009_43.1)]">
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full border-none bg-transparent p-0 outline-none">
              <div
                className={cn(
                  "flex items-center gap-3 p-2 w-full rounded-xl hover:bg-[oklch(0.268_0.011_36.5)] hover:text-[oklch(0.986_0.002_67.8)] transition-all cursor-pointer group text-left",
                  isCollapsed && "justify-center",
                )}
              >
                <Avatar className="h-9 w-9 ring-2 ring-[oklch(1_0_0/10%)] shadow-md transition-transform group-hover:scale-105">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-[oklch(0.438_0.218_303.724)] text-[oklch(0.977_0.014_308.299)] text-xs font-bold">
                    SP
                  </AvatarFallback>
                </Avatar>

                {!isCollapsed && (
                  <>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[oklch(0.986_0.002_67.8)] truncate">
                        Sunny Patel
                      </p>
                      <p className="text-[10px] text-[oklch(0.714_0.014_41.2)] truncate">
                        Admin
                      </p>
                    </div>
                    <ChevronUp
                      size={16}
                      className="text-[oklch(0.714_0.014_41.2)]"
                    />
                  </>
                )}
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align={isCollapsed ? "center" : "end"}
              side={isCollapsed ? "right" : "top"}
              className={`w-38 mb-2 ${isCollapsed ? "ml-2" : ""}`}
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuItem className="cursor-pointer">
                  <Link href={"/accounts"} className="flex items-center">
                    <Settings className="mr-2 h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                {/* <DropdownMenuItem className="cursor-pointer">
                  <Link href={"/user/settings"} className="flex">
                    <Settings className="mr-2 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem> */}

                <DropdownMenuSeparator />

                <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10">
                  <Button
                    onClick={handleLogout}
                    variant="destrective"
                    className={"w-full justify-start p-0 h-auto cursor-pointer"}
                  >
                    <LogOut className="mr-2 w-4" />
                    <span>Logout</span>
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 bg-background z-10 relative">
        <main className="flex-1 overflow-auto px-8 space-y-5">
          <Card className="flex flex-row items-center justify-between w-full h-10 px-4 py-2 rounded-b-xl rounded-t-none bg-card shadow-none  z-10">
            {/* LEFT SIDE: Breadcrumbs */}
            <nav aria-label="breadcrumb" className="flex items-center text-xs">
              {segments.length === 0 ? (
                <span className="font-semibold text-foreground">Dashboard</span>
              ) : (
                <ol className="flex items-center gap-1.5">
                  {segments.map((seg, i) => {
                    const href = "/" + segments.slice(0, i + 1).join("/");
                    const isLast = i === segments.length - 1;

                    return (
                      <li key={i} className="flex items-center gap-1.5">
                        {i > 0 && (
                          <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                        )}

                        {isLast ? (
                          <span className="text-foreground font-semibold">
                            {formatSegment(seg)}
                          </span>
                        ) : (
                          <Link
                            href={href}
                            className="text-muted-foreground hover:text-accent transition-colors"
                          >
                            {formatSegment(seg)}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ol>
              )}
            </nav>

            {/* RIGHT SIDE: Actions */}
            <div className="flex items-center gap-2">
              <ModeToggle />

              <Button
                variant="ghost"
                size="icon"
                className="relative text-muted-foreground hover:text-foreground hover:bg-accent rounded-full transition-colors h-9 w-9"
              >
                <Bell size={18} />
                <span className="absolute top-2 right-2 h-2 w-2 bg-destructive border-2 border-background rounded-full"></span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground hover:bg-accent rounded-full transition-colors h-9 w-9"
              >
                <HelpCircle size={18} />
              </Button>
            </div>
          </Card>
          <div className="mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}

function NavItem({ href, icon, label, active = false, isCollapsed }) {
  return (
    <div className="relative pl-1">
      {/* Spacer to push tab away from left edge */}
      <Link
        href={href}
        className={cn(
          "relative flex items-center gap-3 py-3 group",
          // The ACTIVE state stays dynamic to the page background. The INACTIVE state is forced dark.
          active
            ? "bg-background text-foreground rounded-l-xl z-20"
            : "text-[oklch(0.714_0.014_41.2)] hover:text-[oklch(0.986_0.002_67.8)] hover:bg-[oklch(0.268_0.011_36.5)] rounded-xl mr-3",
          isCollapsed ? "justify-center px-0" : "px-4",
        )}
      >
        <span
          className={cn(
            "relative z-10 transition-colors duration-200",
            // The ACTIVE icon color stays primary. The INACTIVE icon color uses the forced dark hover state.
            active
              ? "text-primary"
              : "group-hover:text-[oklch(0.986_0.002_67.8)]",
          )}
        >
          {icon}
        </span>

        {!isCollapsed && (
          <span
            className={cn(
              "relative z-10 font-medium text-xs tracking-wide",
              active && "font-bold",
            )}
          >
            {label}
          </span>
        )}
      </Link>

      {/* INVERSE CURVES - Dynamically inherits the global background color from theme so it matches the light/dark page exactly */}
      {active && (
        <>
          <div className="absolute right-0 -top-4 w-4 h-4 bg-transparent rounded-br-xl shadow-[5px_5px_0_5px_var(--color-background)] z-10 pointer-events-none" />
          <div className="absolute right-0 -bottom-4 w-4 h-4 bg-transparent rounded-tr-xl shadow-[5px_-5px_0_5px_var(--color-background)] z-10 pointer-events-none" />
        </>
      )}
    </div>
  );
}
