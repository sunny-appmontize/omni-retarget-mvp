"use client";

import React, { useState } from "react";
import {
  Search,
  Download,
  Smartphone,
  Mail,
  MessageSquare,
  MessageCircle,
  CheckCircle2,
  XCircle,
  Clock,
  Activity,
  ShoppingCart,
  CreditCard,
  Eye,
  MapPin,
  Flag,
  Globe,
  Milestone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ActivityInfo } from "./ActivityInfo";

export default function UserProfile({ userData }) {
  const [propertySearch, setPropertySearch] = useState("");

  return (
    <Tabs defaultValue="user-info" className="w-full">
      {/* TOP PROFILE CARD */}
      <Card className="border-none shadow-none overflow-hidden bg-card">
        <div className="px-4 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="flex flex-col items-center gap-3 shrink-0">
            <Avatar className="h-20 w-20 ring-4 ring-muted/50">
              <AvatarFallback className="text-2xl font-light bg-muted text-foreground">
                {userData.firstName[0]}
                {userData.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <Badge className="bg-teal-500/10 text-teal-500 hover:bg-teal-500/20 border-0 text-[10px] font-bold px-2 py-0.5 tracking-wider rounded-sm">
              {userData.status}
            </Badge>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6 w-full">
            <DetailItem label="First Name" value={userData.firstName} />
            <DetailItem label="Email (Standard)" value={userData.email} />
            <DetailItem label="OmniTarget ID" value={userData.omniId} />
            <DetailItem label="Last Name" value={userData.lastName} />
            <DetailItem
              label="Mobile Number (Standard)"
              value={userData.mobile}
            />
            <DetailItem label="ID" value={userData.id} />
          </div>
        </div>

        <TabsList className="h-12 bg-transparent w-full justify-start rounded-none px-4 space-x-8">
          <TabsTrigger
            value="user-info"
            className="text-xs font-medium relative"
          >
            User Info
          </TabsTrigger>
          <TabsTrigger
            value="activity-info"
            className="text-xs font-medium relative"
          >
            Activity Info
          </TabsTrigger>
        </TabsList>
      </Card>

      {/* USER INFO TAB */}
      <TabsContent value="user-info" className="mt-4 space-y-6 outline-none">
        {/* SUMMARY STATS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Lifecycle">
            <StatRow
              icon={<Clock size={14} />}
              label="Last Active"
              value={userData.lifecycle.lastActive}
            />
            <div className="mt-4" />
            <StatRow
              icon={<Activity size={14} />}
              label="No of sessions"
              value={userData.lifecycle.sessions}
            />
          </StatCard>

          <StatCard title="Conversion">
            <StatRow
              icon={<ShoppingCart size={14} />}
              label="No of conversions"
              value={userData.conversion.count}
            />
            <div className="mt-4" />
            <StatRow
              icon={<CreditCard size={14} />}
              label="Life Time value"
              value={userData.conversion.ltv}
            />
          </StatCard>

          <StatCard title="Acquisition">
            <StatRow
              icon={<Eye size={14} />}
              label="First Seen"
              value={userData.acquisition.firstSeen}
            />
            <div className="mt-4" />
            <StatRow
              icon={<Globe size={14} />}
              label="Publisher / Campaign"
              value={userData.acquisition.campaign}
            />
          </StatCard>

          <StatCard title="Location">
            <StatRow
              icon={<MapPin size={14} />}
              label="City / State"
              value={userData.location.city}
            />
            <div className="mt-4" />
            <StatRow
              icon={<Flag size={14} />}
              label="Country"
              value={userData.location.country}
            />
          </StatCard>
        </div>
        {/* REACHABILITY SECTION */}
        <div>
          <h3 className="text-sm font-semibold mb-3 text-foreground flex items-center gap-2">
            <Milestone size={20} /> Reachability
          </h3>
          <div className="flex flex-wrap gap-4">
            <ReachabilityBadge
              channel="Push"
              active={false}
              icon={<Smartphone size={14} />}
              platforms={["android", "ios", "web"]}
            />
            <ReachabilityBadge
              channel="Email"
              active={true}
              icon={<Mail size={14} />}
            />
            <ReachabilityBadge
              channel="SMS"
              active={true}
              icon={<MessageSquare size={14} />}
            />
            <ReachabilityBadge
              channel="WhatsApp"
              active={true}
              icon={<MessageCircle size={14} />}
            />
          </div>
        </div>

        {/* USER PROPERTIES SECTION */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Milestone size={20} /> User Properties
            </h3>
            <div className="flex items-center gap-3">
              <div className="relative w-64">
                <Input
                  placeholder="Search Properties"
                  className="h-8 text-xs pl-3 pr-8 bg-card border-none"
                  value={propertySearch}
                  onChange={(e) => setPropertySearch(e.target.value)}
                />
                <Search className="absolute right-2.5 top-2 h-4 w-4 text-muted-foreground" />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="h-8 text-xs text-primary hover:text-primary/80 bg-primary/10 hover:bg-primary/20 gap-1.5"
              >
                <Download size={14} /> Download
              </Button>
            </div>
          </div>

          {/* PROPERTIES MASONRY/GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            {/* LEFT COLUMN */}
            <div className="space-y-6">
              <PropertyCard title="Localization">
                <PropertyRow label="Last Known City" value="Manama" />
                <PropertyRow label="Last Known Country" value="Bahrain" />
                <PropertyRow label="Last Known Pincode" value="0" />
                <PropertyRow label="Last Known State" value="Manama" />
                <PropertyRow label="User Time Zone Offset (Mins)" value="180" />
              </PropertyCard>

              <PropertyCard title="Tracked Custom Attribute">
                <PropertyRow label="Accepts Marketing" value="true" />
                <PropertyRow
                  label="cart_token"
                  value="hWN5wTKU6nDjCWfdtVe0BRNT"
                />
                <PropertyRow label="Country" value="البحرين" />
                <PropertyRow label="DOB" value="16 Sep 2004, 04:00:00 am" />
                <PropertyRow label="Email" value="aishaalamari777@gmail.com" />
                <PropertyRow label="Gender" value="Female" />
                <PropertyRow label="kickbox-reason" value="accepted_email" />
                <PropertyRow label="kickbox-result" value="deliverable" />
                <PropertyRow label="LANGUAGE_CHOSEN" value="ar" />
                <PropertyRow label="Name" value="Aisha Alamari" />
                <PropertyRow label="Orders Count" value="0" />
                <PropertyRow label="Phone" value="+97339666325" />
              </PropertyCard>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-6">
              <PropertyCard title="Reachability">
                <PropertyRow label="Reachability Push" value="404" />
                <PropertyRow
                  label="Reachability Push Web"
                  value="Not reachable due to Push ID not f..."
                />
              </PropertyCard>

              <PropertyCard title="Uninstall">
                <PropertyRow label="Install Status" value="true" />
              </PropertyCard>

              <PropertyCard title="Email Suppression Type">
                <PropertyRow label="Email Opt-in Status" value="TRUE" />
                <PropertyRow label="Hard Bounce" value="false" />
                <PropertyRow label="Spam" value="false" />
                <PropertyRow label="Unsubscribe" value="false" />
              </PropertyCard>

              <PropertyCard title="Device Data">
                <PropertyRow
                  label="Browser Details"
                  value="Safari mobile - iOS 18 - Apple iPho..."
                />
                <PropertyRow label="Mobile User" value="true" />
              </PropertyCard>
            </div>
          </div>
        </div>
      </TabsContent>

      {/* ACTIVITY INFO TAB */}
      <TabsContent value="activity-info" className="mt-4">
        <ActivityInfo userId={userData.id} />
      </TabsContent>
    </Tabs>
  );
}

// --- HELPER COMPONENTS TO KEEP CODE CLEAN ---

function DetailItem({ label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
      <span className="text-xs font-medium text-foreground truncate">
        {value || "—"}
      </span>
    </div>
  );
}

function StatCard({ title, children }) {
  return (
    <Card className="border-none py-4 shadow-none bg-card">
      <CardHeader className="">
        <CardTitle className="text-xs font-semibold text-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="">{children}</CardContent>
    </Card>
  );
}

function StatRow({ icon, label, value }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
        {icon}
        <span className="text-[10px] font-medium uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="text-lg font-semibold text-foreground tracking-tight pl-5 line-clamp-2">
        {value}
      </div>
    </div>
  );
}

function ReachabilityBadge({ channel, active, icon, platforms = [] }) {
  return (
    <div className="flex items-center justify-between border border-none bg-card rounded-md px-4 py-2 w-56 shadow-none ring-1 ring-foreground/10">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center justify-between w-full">
          <span className="text-xs font-medium text-muted-foreground">
            {channel}
          </span>
          {active ? (
            <CheckCircle2 size={14} className="text-emerald-500" />
          ) : (
            <XCircle size={14} className="text-rose-500" />
          )}
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-1">
            {icon && (
              <div
                className={cn(
                  "p-1 rounded-full",
                  active
                    ? "bg-emerald-500/10 text-emerald-500"
                    : "bg-rose-500/10 text-rose-500",
                )}
              >
                {icon}
              </div>
            )}
            {platforms.map((p) => (
              <div
                key={p}
                className={cn(
                  "h-6 w-6 rounded-full flex items-center justify-center text-[8px]",
                  active
                    ? "bg-emerald-500/10 text-emerald-500"
                    : "bg-rose-500/10 text-rose-500 uppercase font-bold",
                )}
              >
                {p.substring(0, 1)}
              </div>
            ))}
          </div>
          <button
            className={cn(
              "text-[10px] font-bold uppercase tracking-wider",
              active
                ? "text-emerald-500 hover:text-emerald-600"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            TEST {channel}
          </button>
        </div>
      </div>
    </div>
  );
}

function PropertyCard({ title, children }) {
  return (
    <Card className="py-4 shadow-none bg-card overflow-hidden">
      <CardHeader className="bg-muted/10 border-b border-none">
        <CardTitle className="text-xs font-semibold text-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <table className="w-full">
          <thead>
            <tr className="border-b border-none bg-muted/5">
              <th className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider text-left py-2 px-4 w-1/2">
                Property Name
              </th>
              <th className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider text-left py-2 px-4 w-1/2">
                Value
              </th>
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </CardContent>
    </Card>
  );
}

function PropertyRow({ label, value }) {
  return (
    <tr className="border border-border/80 last:border-0 odd:bg-muted/50 hover:bg-muted/80 transition-colors">
      <td className="py-2.5 px-4 text-xs font-medium text-muted-foreground flex items-center gap-2">
        <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center text-[8px] text-muted-foreground shrink-0 border border-border/20">
          OT
        </div>
        <span className="line-clamp-2">{label}</span>
      </td>
      <td className="py-2.5 px-4 text-xs text-foreground font-medium truncate max-w-50">
        {value}
      </td>
    </tr>
  );
}
