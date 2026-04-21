"use client";

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  Download,
  Filter,
  TrendingUp,
  TrendingDown,
  Mail,
  Smartphone,
  MessageSquare,
  BarChart3,
  MousePointerClick,
  Eye,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// --- MOCK DATA ---
const engagementData = [
  { date: "01 Nov", sent: 12000, opened: 8400, clicked: 3200 },
  { date: "05 Nov", sent: 15000, opened: 9200, clicked: 3800 },
  { date: "10 Nov", sent: 18000, opened: 11000, clicked: 4500 },
  { date: "15 Nov", sent: 14000, opened: 9800, clicked: 4100 },
  { date: "20 Nov", sent: 22000, opened: 14500, clicked: 6200 },
  { date: "25 Nov", sent: 25000, opened: 16800, clicked: 7400 },
  { date: "30 Nov", sent: 21000, opened: 13200, clicked: 5800 },
];

const channelData = [
  { name: "Email", value: 55 },
  { name: "Push", value: 30 },
  { name: "SMS", value: 10 },
  { name: "WhatsApp", value: 5 },
];

const regionalData = [
  { region: "Philippines", revenue: 45000, spend: 12000 },
  { region: "Malaysia", revenue: 32000, spend: 8500 },
  { region: "Poland", revenue: 28000, spend: 9200 },
  { region: "Bahrain", revenue: 15000, spend: 4100 },
];

const topCampaigns = [
  {
    id: "CMP-001",
    name: "Black Friday Early Access",
    channel: "Email",
    sent: "125K",
    openRate: "42.5%",
    clickRate: "12.4%",
    conversions: 1420,
  },
  {
    id: "CMP-002",
    name: "Cart Abandonment Flow",
    channel: "Push",
    sent: "42K",
    openRate: "68.2%",
    clickRate: "24.1%",
    conversions: 890,
  },
  {
    id: "CMP-003",
    name: "Win-back Series 1",
    channel: "Email",
    sent: "85K",
    openRate: "31.4%",
    clickRate: "8.2%",
    conversions: 450,
  },
  {
    id: "CMP-004",
    name: "Flash Sale Alert",
    channel: "SMS",
    sent: "15K",
    openRate: "98.1%",
    clickRate: "14.5%",
    conversions: 310,
  },
];

// Shadcn Theme Colors for Pie Chart
const COLORS = [
  "var(--color-primary)",
  "var(--color-sidebar-primary)",
  "var(--color-muted-foreground)",
  "var(--color-destructive)",
];

export default function ReportsPage() {
  const [reportType, setReportType] = useState("engagement");

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      {/* PAGE HEADER & GLOBAL FILTERS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Performance Reports
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Analyze campaign metrics, deliverability, and channel ROI.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Simulated Date Picker Button */}
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs font-normal justify-start text-left bg-card w-[220px]"
          >
            <CalendarIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
            <span>Nov 01, 2025 - Nov 30, 2025</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs gap-1.5 bg-card"
          >
            <Download size={14} /> Export PDF
          </Button>
        </div>
      </div>

      {/* TABS & LOCAL FILTERS */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-2 rounded-xl border border-border/50 shadow-sm">
        <Tabs
          value={reportType}
          onValueChange={setReportType}
          className="w-full sm:w-auto"
        >
          <TabsList className="h-8 bg-muted/50">
            <TabsTrigger value="engagement" className="text-xs h-6">
              Engagement
            </TabsTrigger>
            <TabsTrigger value="deliverability" className="text-xs h-6">
              Deliverability
            </TabsTrigger>
            <TabsTrigger value="revenue" className="text-xs h-6">
              Revenue
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select defaultValue="all-channels">
            <SelectTrigger className="h-8 w-[130px] text-xs bg-background">
              <SelectValue placeholder="Channel" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-channels" className="text-xs">
                All Channels
              </SelectItem>
              <SelectItem value="email" className="text-xs">
                Email
              </SelectItem>
              <SelectItem value="push" className="text-xs">
                Push Notifications
              </SelectItem>
              <SelectItem value="sms" className="text-xs">
                SMS
              </SelectItem>
            </SelectContent>
          </Select>

          <Select defaultValue="all-regions">
            <SelectTrigger className="h-8 w-[130px] text-xs bg-background">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-regions" className="text-xs">
                All Regions
              </SelectItem>
              <SelectItem value="philippines" className="text-xs">
                Philippines
              </SelectItem>
              <SelectItem value="malaysia" className="text-xs">
                Malaysia
              </SelectItem>
              <SelectItem value="poland" className="text-xs">
                Poland
              </SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <Filter size={14} />
          </Button>
        </div>
      </div>

      {/* TOP-LEVEL METRICS */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <ReportMetricCard
          title="Total Messages Sent"
          value="842.5K"
          trend="+12.5%"
          icon={<Mail size={16} />}
        />
        <ReportMetricCard
          title="Unique Opens"
          value="384.2K"
          trend="+8.2%"
          icon={<Eye size={16} />}
        />
        <ReportMetricCard
          title="Total Clicks"
          value="112.4K"
          trend="+14.1%"
          icon={<MousePointerClick size={16} />}
        />
        <ReportMetricCard
          title="Conversion Rate"
          value="3.84%"
          trend="-0.4%"
          isNegative
          icon={<BarChart3 size={16} />}
        />
      </div>

      {/* CHARTS GRID */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* MAIN MULTI-LINE CHART */}
        <Card className="md:col-span-2 border-border/50 shadow-sm bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Engagement Funnel Over Time
            </CardTitle>
            <CardDescription className="text-xs">
              Comparing Sent, Opened, and Clicked volumes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height={300} minWidth={0}>
                <AreaChart
                  data={engagementData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="var(--color-muted-foreground)"
                        stopOpacity={0.1}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-muted-foreground)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                    <linearGradient
                      id="colorOpened"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="var(--color-sidebar-primary)"
                        stopOpacity={0.2}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--color-sidebar-primary)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                    <linearGradient
                      id="colorClicked"
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
                    dataKey="date"
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
                      fontSize: "11px",
                    }}
                    itemStyle={{ color: "var(--color-foreground)" }}
                  />
                  <Legend
                    iconType="circle"
                    wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }}
                  />
                  <Area
                    type="monotone"
                    name="Sent"
                    dataKey="sent"
                    stroke="var(--color-muted-foreground)"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorSent)"
                  />
                  <Area
                    type="monotone"
                    name="Opened"
                    dataKey="opened"
                    stroke="var(--color-sidebar-primary)"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorOpened)"
                  />
                  <Area
                    type="monotone"
                    name="Clicked"
                    dataKey="clicked"
                    stroke="var(--color-primary)"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorClicked)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* DONUT CHART */}
        <Card className="md:col-span-1 border-border/50 shadow-sm bg-card flex flex-col">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm font-semibold">
              Channel Distribution
            </CardTitle>
            <CardDescription className="text-xs">
              Volume by delivery channel.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col items-center justify-center pb-6">
            <div className="h-[220px] w-full">
              <ResponsiveContainer width="100%" height={220} minWidth={0}>
                <PieChart>
                  <Pie
                    data={channelData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {channelData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      borderColor: "var(--color-border)",
                      borderRadius: "6px",
                      fontSize: "11px",
                    }}
                    itemStyle={{ color: "var(--color-foreground)" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Custom Legend */}
            <div className="flex flex-wrap justify-center gap-3 w-full px-4">
              {channelData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-1.5">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-[10px] font-medium text-muted-foreground">
                    {entry.name} ({entry.value}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* BOTTOM ROW: STACKED BAR & TABLE */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* REGIONAL PERFORMANCE CHART */}
        <Card className="border-border/50 shadow-sm bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Regional ROI Breakdown
            </CardTitle>
            <CardDescription className="text-xs">
              Ad Spend vs Revenue by target region.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full mt-4">
              <ResponsiveContainer width="100%" height={250} minWidth={0}>
                <BarChart
                  data={regionalData}
                  layout="vertical"
                  margin={{ top: 0, right: 10, left: 10, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    horizontal={false}
                    stroke="var(--color-border)"
                    opacity={0.5}
                  />
                  <XAxis
                    type="number"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "var(--color-muted-foreground)",
                      fontSize: 10,
                    }}
                  />
                  <YAxis
                    type="category"
                    dataKey="region"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: "var(--color-muted-foreground)",
                      fontSize: 10,
                    }}
                    width={80}
                  />
                  <Tooltip
                    cursor={{ fill: "var(--color-muted)", opacity: 0.2 }}
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      borderColor: "var(--color-border)",
                      borderRadius: "6px",
                      fontSize: "11px",
                    }}
                  />
                  <Legend
                    iconType="circle"
                    wrapperStyle={{ fontSize: "11px" }}
                  />
                  <Bar
                    dataKey="spend"
                    name="Ad Spend"
                    stackId="a"
                    fill="var(--color-muted-foreground)"
                    opacity={0.4}
                    radius={[0, 0, 0, 0]}
                    barSize={20}
                  />
                  <Bar
                    dataKey="revenue"
                    name="Revenue Generated"
                    stackId="a"
                    fill="var(--color-primary)"
                    radius={[0, 4, 4, 0]}
                    barSize={20}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* TOP CAMPAIGNS TABLE */}
        <Card className="border-border/50 shadow-sm bg-card flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">
              Top Performing Campaigns
            </CardTitle>
            <CardDescription className="text-xs">
              Highest converting flows this period.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50 bg-muted/5 hover:bg-muted/5">
                  <TableHead className="text-[10px] uppercase font-semibold h-8 py-1">
                    Campaign
                  </TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold h-8 py-1">
                    Type
                  </TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold h-8 py-1 text-right">
                    Sent
                  </TableHead>
                  <TableHead className="text-[10px] uppercase font-semibold h-8 py-1 text-right">
                    Conv.
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topCampaigns.map((campaign) => (
                  <TableRow
                    key={campaign.id}
                    className="border-border/50 hover:bg-muted/10 transition-colors"
                  >
                    <TableCell className="py-2.5">
                      <div className="text-xs font-semibold text-foreground truncate max-w-[150px]">
                        {campaign.name}
                      </div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">
                        {campaign.id}
                      </div>
                    </TableCell>
                    <TableCell className="py-2.5">
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[9px] uppercase px-1.5 py-0 rounded-sm border-0 font-bold tracking-wider",
                          campaign.channel === "Email"
                            ? "bg-blue-500/10 text-blue-500"
                            : campaign.channel === "Push"
                              ? "bg-purple-500/10 text-purple-500"
                              : "bg-emerald-500/10 text-emerald-500",
                        )}
                      >
                        {campaign.channel}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-2.5 text-xs text-muted-foreground text-right">
                      {campaign.sent}
                    </TableCell>
                    <TableCell className="py-2.5 text-xs font-bold text-foreground text-right">
                      {campaign.conversions}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// --- HELPER COMPONENT ---
function ReportMetricCard({ title, value, trend, icon, isNegative = false }) {
  return (
    <Card className="border-border/50 shadow-sm bg-card relative overflow-hidden group">
      {/* Subtle background glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <CardContent className="p-4 relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-medium text-muted-foreground">
            {title}
          </span>
          <div className="p-1.5 rounded-md bg-muted/50 text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
            {icon}
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-bold tracking-tight text-foreground">
            {value}
          </h3>
          <span
            className={cn(
              "text-[10px] font-bold flex items-center px-1 rounded-sm",
              isNegative
                ? "text-rose-500 bg-rose-500/10"
                : "text-emerald-500 bg-emerald-500/10",
            )}
          >
            {isNegative ? (
              <TrendingDown size={10} className="mr-0.5" />
            ) : (
              <TrendingUp size={10} className="mr-0.5" />
            )}
            {trend}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
