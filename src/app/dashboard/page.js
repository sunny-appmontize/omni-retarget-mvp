"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  Users,
  CreditCard,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Download,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const performanceData = [
  { name: "Mon", conversions: 400, spend: 240 },
  { name: "Tue", conversions: 300, spend: 139 },
  { name: "Wed", conversions: 520, spend: 380 },
  { name: "Thu", conversions: 450, spend: 390 },
  { name: "Fri", conversions: 600, spend: 480 },
  { name: "Sat", conversions: 380, spend: 250 },
  { name: "Sun", conversions: 430, spend: 310 },
];

const recentCampaigns = [
  {
    id: "CMP-001",
    name: "PH Retargeting Q3",
    region: "Philippines",
    status: "Active",
    spend: "$4,200",
    roi: "+24%",
  },
  {
    id: "CMP-002",
    name: "MY Lookalike Drop",
    region: "Malaysia",
    status: "Paused",
    spend: "$1,850",
    roi: "-5%",
  },
  {
    id: "CMP-003",
    name: "PL Black Friday",
    region: "Poland",
    status: "Active",
    spend: "$8,900",
    roi: "+42%",
  },
  {
    id: "CMP-004",
    name: "PH Brand Awareness",
    region: "Philippines",
    status: "Completed",
    spend: "$2,100",
    roi: "+12%",
  },
];

export default function DashboardPage() {
  const [timeframe, setTimeframe] = useState("7D");

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* KPI METRIC CARDS */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Ad Spend"
          value="$12,450"
          trend="+14%"
          isPositive={false}
          icon={<CreditCard className="h-3.5 w-3.5 text-muted-foreground" />}
        />
        <KpiCard
          title="Conversions"
          value="3,080"
          trend="+21%"
          isPositive={true}
          icon={<Activity className="h-3.5 w-3.5 text-muted-foreground" />}
        />
        <KpiCard
          title="Average CTR"
          value="4.2%"
          trend="+1.2%"
          isPositive={true}
          icon={<TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />}
        />
        <KpiCard
          title="Active Audiences"
          value="84,200"
          trend="-2%"
          isPositive={false}
          icon={<Users className="h-3.5 w-3.5 text-muted-foreground" />}
        />
      </div>

      {/* CHARTS SECTION */}
      <div className="grid gap-4 md:grid-cols-7 lg:grid-cols-7">
        {/* MAIN CHART */}
        <Card className="md:col-span-4 shadow-sm border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Conversion Velocity
            </CardTitle>
            <CardDescription className="text-xs">
              Daily conversion volume across all Tier 2 markets.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-0 pb-4">
            <div className="w-full mt-4">
              {/* FIX: Set static height of 250 here and minWidth={0} */}
              <ResponsiveContainer width="100%" height={250} minWidth={0}>
                <AreaChart
                  data={performanceData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorConversions"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="var(--color-primary)"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-primary)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="var(--color-border)"
                    opacity={0.5}
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "var(--color-muted-foreground)",
                      fontSize: 10,
                    }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "var(--color-muted-foreground)",
                      fontSize: 10,
                    }}
                    dx={-10}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      borderColor: "var(--color-border)",
                      borderRadius: "6px",
                      color: "var(--color-foreground)",
                      fontSize: "12px",
                    }}
                    itemStyle={{ color: "var(--color-foreground)" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="conversions"
                    stroke="var(--color-primary)"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorConversions)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* SECONDARY CHART */}
        <Card className="md:col-span-3 shadow-sm border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Spend Distribution
            </CardTitle>
            <CardDescription className="text-xs">
              Daily ad spend allocation.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="w-full mt-4">
              {/* FIX: Set static height of 250 here and minWidth={0} */}
              <ResponsiveContainer width="100%" height={250} minWidth={0}>
                <BarChart
                  data={performanceData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="var(--color-border)"
                    opacity={0.5}
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "var(--color-muted-foreground)",
                      fontSize: 10,
                    }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "var(--color-muted-foreground)",
                      fontSize: 10,
                    }}
                  />
                  <Tooltip
                    cursor={{ fill: "var(--color-muted)", opacity: 0.4 }}
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      borderColor: "var(--color-border)",
                      borderRadius: "6px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar
                    dataKey="spend"
                    fill="var(--color-sidebar-primary)"
                    radius={[3, 3, 0, 0]}
                    maxBarSize={40}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* DATA TABLE SECTION */}
      <Card className="shadow-sm border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">
            Recent Campaigns
          </CardTitle>
          <CardDescription className="text-xs">
            Performance metrics for your latest active and paused sets.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-xs font-medium text-muted-foreground h-9">
                  Campaign
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground h-9">
                  Region
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground h-9">
                  Status
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground h-9 text-right">
                  Spend
                </TableHead>
                <TableHead className="text-xs font-medium text-muted-foreground h-9 text-right">
                  ROI
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentCampaigns.map((campaign) => (
                <TableRow key={campaign.id} className="border-border">
                  <TableCell className="py-2.5">
                    <div className="text-xs font-medium text-foreground">
                      {campaign.name}
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-0.5">
                      {campaign.id}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs py-2.5">
                    {campaign.region}
                  </TableCell>
                  <TableCell className="py-2.5">
                    <Badge
                      variant={
                        campaign.status === "Active" ? "default" : "secondary"
                      }
                      className="text-[10px] px-1.5 py-0 h-4 bg-primary/10 text-primary hover:bg-primary/20 border-0 font-medium"
                    >
                      {campaign.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-right py-2.5">
                    {campaign.spend}
                  </TableCell>
                  <TableCell
                    className={`text-xs text-right font-medium py-2.5 ${campaign.roi.startsWith("+") ? "text-emerald-500" : "text-rose-500"}`}
                  >
                    {campaign.roi}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper component for KPI cards
function KpiCard({ title, value, trend, isPositive, icon }) {
  return (
    <Card className="shadow-sm border-border/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4 px-4">
        <CardTitle className="text-xs font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="pb-4 px-4">
        <div className="text-xl font-bold text-foreground tracking-tight">
          {value}
        </div>
        <p className="text-[10px] mt-1.5 flex items-center">
          <span
            className={cn(
              "flex items-center font-medium",
              isPositive ? "text-emerald-500" : "text-rose-500",
            )}
          >
            {isPositive ? (
              <ArrowUpRight size={12} className="mr-0.5" />
            ) : (
              <ArrowDownRight size={12} className="mr-0.5" />
            )}
            {trend}
          </span>
          <span className="text-muted-foreground ml-1.5">vs last period</span>
        </p>
      </CardContent>
    </Card>
  );
}
