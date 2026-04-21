"use client";

import React, { useState, useEffect } from "react";
import {
  Filter,
  Download,
  ChevronRight,
  ChevronDown,
  Monitor,
  Smartphone,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { getActivityTimeline } from "../_actions"; // Your API call

export function ActivityInfo({ userId }) {
  const [timeline, setTimeline] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedEvents, setExpandedEvents] = useState(new Set());
  const [sortDesc, setSortDesc] = useState(true);

  // --- DATA FETCHING ---
  useEffect(() => {
    async function loadData() {
      try {
        const data = await getActivityTimeline(userId);

        // Ensure data is an array
        const fetchedData = Array.isArray(data) ? data : [];
        setTimeline(fetchedData);

        // Automatically expand the very first event if data exists
        if (fetchedData.length > 0) {
          setExpandedEvents(new Set([fetchedData[0].id]));
        }
      } catch (error) {
        console.error("Failed to fetch activity:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (userId) {
      loadData();
    }
  }, [userId]);

  // --- UI ACTIONS ---
  const toggleExpand = (id) => {
    const newExpanded = new Set(expandedEvents);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedEvents(newExpanded);
  };

  const expandAll = () => {
    if (expandedEvents.size === timeline.length) {
      setExpandedEvents(new Set());
    } else {
      setExpandedEvents(new Set(timeline.map((e) => e.id)));
    }
  };

  // Sort logic based on state
  const displayEvents = sortDesc ? timeline : [...timeline].reverse();

  return (
    <div className="w-full">
      {/* HEADER */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-4 text-foreground flex items-center gap-2">
          <Activity size={18} /> User Activity
        </h3>

        <Card className="py-0 overflow-hidden bg-card">
          {/* Main Toolbar */}
          <div className="flex items-center justify-between p-3 border-b border-border/50">
            <span className="text-sm font-semibold text-foreground">
              Events
            </span>
            <div
              className={cn(
                "flex items-center justify-end gap-4 p-2 px-4 bg-muted/5 text-[11px] text-muted-foreground font-medium",
                isLoading && "opacity-50 pointer-events-none",
              )}
            >
              <div
                className="flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors"
                onClick={expandAll}
              >
                Event details :{" "}
                <span className="text-primary font-semibold flex items-center ml-1">
                  <ChevronDown size={12} className="mr-0.5" />{" "}
                  {expandedEvents.size > 0 &&
                  expandedEvents.size === timeline.length
                    ? "COLLAPSE ALL"
                    : "EXPAND ALL"}
                </span>
              </div>
              <div
                className="flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors"
                onClick={() => setSortDesc(!sortDesc)}
              >
                Event order :{" "}
                <span className="text-primary font-semibold ml-1">
                  {sortDesc ? "↓ LATEST FIRST" : "↑ OLDEST FIRST"}
                </span>
              </div>
              <div className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors text-primary font-semibold">
                <Download size={12} /> Download
              </div>
            </div>
            {/* <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs text-primary font-semibold gap-1.5 hover:bg-primary/10 disabled:opacity-50"
              disabled={isLoading}
            >
              <Filter size={14} /> FILTER EVENTS
            </Button> */}
          </div>

          {/* Sub Toolbar (Disabled during loading) */}

          {/* LOADING STATE - Advanced Skeleton matching the timeline layout */}
          {isLoading ? (
            <div className="p-6 space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4 w-full">
                  <div className="w-20 shrink-0 flex flex-col items-end pt-1">
                    <Skeleton className="h-3 w-12 mb-2 " />
                    <Skeleton className="h-2 w-16" />
                  </div>
                  <div className="flex flex-col items-center relative ml-2">
                    <Skeleton className="h-2.5 w-2.5 rounded-full" />
                    {i !== 3 && (
                      <div className="w-px h-[60px] bg-border/30 absolute top-3 z-0" />
                    )}
                  </div>
                  <div className="flex-1 pb-2 pl-2">
                    <Skeleton className="h-4 w-1/3 mb-2 " />
                    <Skeleton className="h-3 w-1/4 " />
                  </div>
                </div>
              ))}
            </div>
          ) : timeline.length === 0 ? (
            /* EMPTY STATE */
            <div className="p-12 flex flex-col items-center justify-center text-muted-foreground">
              <Activity size={32} className="mb-4 opacity-20" />
              <p className="text-sm">No activity recorded for this user yet.</p>
            </div>
          ) : (
            /* TIMELINE CONTENT */
            <div className="p-6">
              {displayEvents.map((event, index) => {
                const isExpanded = expandedEvents.has(event.id);
                const isLast = index === displayEvents.length - 1;

                // Robust fallbacks to handle basic API responses gracefully
                const eventTitle =
                  event.title || event.action || "Unknown Event";
                const eventCategory = event.category || "General Activity";
                const eventSource = event.source || "System";
                const eventPlatform = event.platform || "Web";
                const eventDetails = event.details || [];

                // Format dates safely
                let displayTime = event.time;
                let displayDate = event.date;
                if (!displayTime && event.date) {
                  const d = new Date(event.date);
                  if (!isNaN(d.getTime())) {
                    displayTime = d.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    });
                    displayDate = d.toLocaleDateString();
                  }
                }

                return (
                  <div key={event.id} className="relative flex gap-4 w-full">
                    {/* LEFT COLUMN: Time & Gap */}
                    <div className="w-20 shrink-0 flex flex-col items-end pt-0.5 relative z-10">
                      <div className="text-[11px] font-medium text-foreground text-right">
                        {displayTime}
                      </div>
                      <div className="text-[10px] text-muted-foreground text-right">
                        {displayDate}
                      </div>

                      {/* Only show expand chevron if there are details to expand */}
                      {eventDetails.length > 0 && (
                        <button
                          onClick={() => toggleExpand(event.id)}
                          className="absolute -right-5 top-1 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {isExpanded ? (
                            <ChevronDown size={14} />
                          ) : (
                            <ChevronRight size={14} />
                          )}
                        </button>
                      )}

                      {/* Gap indicator */}
                      {!isLast && event.gap && (
                        <div className="text-[10px] text-muted-foreground font-medium my-5">
                          {event.gap}
                        </div>
                      )}
                    </div>

                    {/* MIDDLE COLUMN: The Line & Dot */}
                    <div className="flex flex-col items-center relative z-0 ml-2">
                      <div className="h-2.5 w-2.5 rounded-full bg-teal-500 mt-1.5 z-10 ring-4 ring-card" />
                      {!isLast && (
                        <div className="w-px h-full bg-border/80 absolute top-3 bottom-0 z-0" />
                      )}
                    </div>

                    {/* RIGHT COLUMN: Event Content */}
                    <div
                      className={cn(
                        "flex-1 pb-6 pl-2",
                        isExpanded ? "pb-10" : "",
                      )}
                    >
                      <div
                        className={cn(
                          "text-xs font-semibold text-foreground inline-block pt-0.5 transition-colors",
                          eventDetails.length > 0 &&
                            "cursor-pointer hover:text-primary",
                        )}
                        onClick={() =>
                          eventDetails.length > 0 && toggleExpand(event.id)
                        }
                      >
                        {eventTitle}
                      </div>

                      {!isExpanded && (
                        <div className="text-[10px] text-muted-foreground mt-1">
                          {eventCategory}
                        </div>
                      )}

                      {/* EXPANDED DETAILS */}
                      {isExpanded && eventDetails.length > 0 && (
                        <div className="mt-4 flex flex-col lg:flex-row gap-8 items-start animate-in fade-in slide-in-from-top-2 duration-200">
                          <div className="w-48 shrink-0 space-y-3">
                            <div className="flex items-center gap-2 text-[10px]">
                              <span className="text-muted-foreground w-16">
                                Source:
                              </span>
                              <span className="flex items-center gap-1.5 font-medium text-muted-foreground">
                                <span className="h-4 w-4 rounded-full bg-muted flex items-center justify-center text-[8px] font-bold">
                                  {eventSource.substring(0, 2).toUpperCase()}
                                </span>
                                {eventSource}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px]">
                              <span className="text-muted-foreground w-16">
                                Platform:
                              </span>
                              <span className="flex items-center gap-1.5 font-medium text-muted-foreground">
                                {eventPlatform.toLowerCase() === "web" ? (
                                  <Monitor size={12} />
                                ) : (
                                  <Smartphone size={12} />
                                )}
                                {eventPlatform}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px]">
                              <span className="text-muted-foreground w-16">
                                Type:
                              </span>
                              <span className="font-medium text-muted-foreground">
                                {eventCategory}
                              </span>
                            </div>
                          </div>

                          <div className="flex-1 w-full max-w-2xl">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr>
                                  <th className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider text-left pb-2 border-b border-border/50 w-1/2">
                                    Key
                                  </th>
                                  <th className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider text-left pb-2 border-b border-border/50 w-1/2">
                                    Value
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {eventDetails.map((detail, idx) => (
                                  <tr
                                    key={idx}
                                    className="odd:bg-background/30 border-b border-border/50 last:border-0 hover:bg-background/50 transition-colors"
                                  >
                                    <td className="p-2 text-[11px] font-medium text-muted-foreground pr-4 break-all">
                                      {detail.key}
                                    </td>
                                    <td className="py-2 text-[11px] font-medium text-foreground break-all">
                                      {detail.value}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
