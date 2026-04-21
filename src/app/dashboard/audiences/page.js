"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Download,
  MoreHorizontal,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup, // <-- ADD THIS
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";

// --- MOCK DATA ---
const initialUsers = [
  {
    id: "usr_01",
    name: "Anand Bhatnagar",
    email: "anand.bhatnagar@moengage.com",
    mobile: "+91 98765 43210",
    omniId: "68e3a0e7eb...",
    firstSeen: "06 Oct 2025",
    lastSeen: "13 Oct 2025",
    sessions: 13,
  },
  {
    id: "usr_02",
    name: "Nour Anandif",
    email: "nourabdelbassitissa@gmail.com",
    mobile: "null",
    omniId: "68ea49b850...",
    firstSeen: "11 Oct 2025",
    lastSeen: "11 Oct 2025",
    sessions: 1,
  },
  {
    id: "usr_03",
    name: "Anand B",
    email: "anandbhatnagar1@gmail.com",
    mobile: "null",
    omniId: "68e7b9ef6e...",
    firstSeen: "09 Oct 2025",
    lastSeen: "09 Oct 2025",
    sessions: 1,
  },
  {
    id: "usr_04",
    name: "Guest User",
    email: "anandFalse202@gmail.com",
    mobile: "null",
    omniId: "68c4117471...",
    firstSeen: "12 Sep 2025",
    lastSeen: "12 Sep 2025",
    sessions: 1,
  },
  {
    id: "usr_05",
    name: "Dnia Ebdulrahman",
    email: "anandno202@gmail.com",
    mobile: "+963 9923 4359",
    omniId: "68c1424e3f...",
    firstSeen: "10 Sep 2025",
    lastSeen: "10 Sep 2025",
    sessions: 4,
  },
  {
    id: "usr_06",
    name: "Hanan Aldawoud",
    email: "hanandawood2002@gmail.com",
    mobile: "+49 1791 4582",
    omniId: "68c141e96d...",
    firstSeen: "10 Sep 2025",
    lastSeen: "10 Sep 2025",
    sessions: 2,
  },
  {
    id: "usr_07",
    name: "Roba Hananda",
    email: "robahananda66@gmail.com",
    mobile: "+962 7981 0447",
    omniId: "68c1419891...",
    firstSeen: "10 Sep 2025",
    lastSeen: "10 Sep 2025",
    sessions: 7,
  },
  {
    id: "usr_08",
    name: "Sunny Patel",
    email: "sunnypatel.koder@gmail.com",
    mobile: "+1 555 019 8372",
    omniId: "68c141a37d...",
    firstSeen: "01 Sep 2025",
    lastSeen: "20 Oct 2025",
    sessions: 42,
  },
];

export default function AudiencesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "lastSeen",
    direction: "desc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Search & Filter Logic
  const filteredUsers = useMemo(() => {
    return initialUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.omniId.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm]);

  // Sorting Logic
  const sortedUsers = useMemo(() => {
    let sortableItems = [...filteredUsers];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredUsers, sortConfig]);

  // Pagination Logic
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleSort = (key) => {
    let direction = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* PAGE HEADER */}
      {/* <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Audience Directory
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Manage and analyze your OmniTarget user segments.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3 text-xs gap-2"
          >
            <Download size={14} />
            Export CSV
          </Button>
          <Button
            size="sm"
            className="h-8 px-4 text-xs bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
          >
            Import Users
          </Button>
        </div>
      </div> */}

      {/* TABLE TOOLBAR */}
      <Card className="border-border/50 shadow-sm overflow-hidden flex flex-col pt-0">
        <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-border/50 bg-muted/20">
          <div className="relative w-full sm:w-[350px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or Omni ID..."
              className="pl-9 h-9 text-xs bg-background"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              className="h-9 text-xs gap-2 w-full sm:w-auto"
            >
              <Filter size={14} />
              Filters
            </Button>
          </div>
        </div>

        {/* MAIN DATA TABLE */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="w-[200px] h-10 py-2 px-4">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("name")}
                    className="h-6 px-2 text-xs font-semibold text-muted-foreground hover:text-foreground -ml-2"
                  >
                    Name <ArrowUpDown size={12} className="ml-2" />
                  </Button>
                </TableHead>
                <TableHead className="h-10 py-2">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("email")}
                    className="h-6 px-2 text-xs font-semibold text-muted-foreground hover:text-foreground -ml-2"
                  >
                    Email <ArrowUpDown size={12} className="ml-2" />
                  </Button>
                </TableHead>
                <TableHead className="h-10 py-2 text-xs font-semibold text-muted-foreground">
                  Mobile
                </TableHead>
                <TableHead className="h-10 py-2 text-xs font-semibold text-muted-foreground">
                  Omni ID
                </TableHead>
                <TableHead className="h-10 py-2">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("firstSeen")}
                    className="h-6 px-2 text-xs font-semibold text-muted-foreground hover:text-foreground -ml-2"
                  >
                    First Seen <ArrowUpDown size={12} className="ml-2" />
                  </Button>
                </TableHead>
                <TableHead className="h-10 py-2">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("lastSeen")}
                    className="h-6 px-2 text-xs font-semibold text-muted-foreground hover:text-foreground -ml-2"
                  >
                    Last Seen <ArrowUpDown size={12} className="ml-2" />
                  </Button>
                </TableHead>
                <TableHead className="h-10 py-2  text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("sessions")}
                    className="h-6 px-2 text-xs font-semibold text-muted-foreground hover:text-foreground justify-end w-full"
                  >
                    Sessions <ArrowUpDown size={12} className="ml-2" />
                  </Button>
                </TableHead>
                <TableHead className="w-[50px] h-10 py-2"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="h-32 text-center text-muted-foreground"
                  >
                    No users found matching your search.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedUsers.map((user) => (
                  <TableRow
                    key={user.id}
                    className="border-border hover:bg-muted/20 transition-colors group"
                  >
                    <TableCell className="py-2.5 px-4">
                      {/* Interactive Name Link */}
                      <Link
                        href={`/dashboard/audiences/${user.id}`}
                        className="text-xs font-semibold text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
                      >
                        {user.name}
                      </Link>
                      <div className="text-[10px] text-muted-foreground mt-0.5 font-mono">
                        {user.id}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground py-2.5">
                      {user.email === "null" ? (
                        <span className="text-muted-foreground/50 italic">
                          Not provided
                        </span>
                      ) : (
                        user.email
                      )}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground py-2.5">
                      {user.mobile === "null" ? (
                        <span className="text-muted-foreground/50 italic">
                          Not provided
                        </span>
                      ) : (
                        user.mobile
                      )}
                    </TableCell>
                    <TableCell className="py-2.5">
                      <Badge
                        variant="outline"
                        className="text-[10px] font-mono text-muted-foreground bg-background px-1.5 py-0 rounded border-border/60"
                      >
                        {user.omniId}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground py-2.5 whitespace-nowrap">
                      {user.firstSeen}
                    </TableCell>
                    <TableCell className="text-xs text-foreground font-medium py-2.5 whitespace-nowrap">
                      {user.lastSeen}
                    </TableCell>
                    <TableCell className="text-right py-2.5">
                      <Badge
                        variant="secondary"
                        className={`text-xs px-2 py-0.5 font-semibold ${user.sessions > 10 ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}
                      >
                        {user.sessions}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-2.5 text-right">
                      <DropdownMenu>
                        {/* FIX 1: Remove `asChild` and style the Trigger directly. 
    This prevents the React DOM prop warning and the nested button error entirely.
  */}
                        <DropdownMenuTrigger className="inline-flex h-8 w-8 items-center justify-center rounded-md p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent hover:text-accent-foreground outline-none border-none bg-transparent cursor-pointer">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-[160px]">
                          {/* FIX 2: Wrap all the items in a DropdownMenuGroup to provide the missing Base UI context
                           */}
                          <DropdownMenuGroup>
                            <DropdownMenuLabel className="text-xs">
                              Actions
                            </DropdownMenuLabel>
                            <DropdownMenuItem
                              className="text-xs cursor-pointer"
                              onClick={() =>
                                navigator.clipboard.writeText(user.id)
                              }
                            >
                              Copy User ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-xs cursor-pointer">
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-xs cursor-pointer">
                              View Journey
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-xs cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10">
                              Delete Data
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* PAGINATION FOOTER */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border/50 bg-muted/10">
          <div className="text-xs text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {Math.min(
                (currentPage - 1) * itemsPerPage + 1,
                sortedUsers.length,
              )}
            </span>{" "}
            to{" "}
            <span className="font-medium text-foreground">
              {Math.min(currentPage * itemsPerPage, sortedUsers.length)}
            </span>{" "}
            of{" "}
            <span className="font-medium text-foreground">
              {sortedUsers.length}
            </span>{" "}
            users
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
