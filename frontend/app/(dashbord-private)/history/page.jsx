"use client";

import { useState, useMemo } from "react";
import { FolderOpen, FileText, Video } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GenerationCard } from "@/components/dashboard/generation-card";
import { HistoryFilters } from "@/components/dashboard/history-filters";
import { mockData } from "@/lib/mock-data";
import Link from "next/link";

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const filteredData = useMemo(() => {
    let data = [...mockData];

    // Filter by type
    if (activeTab === "blogs") {
      data = data.filter((item) => item.type === "BLOG");
    } else if (activeTab === "videos") {
      data = data.filter((item) => item.type === "VIDEO");
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      data = data.filter((item) => item.title.toLowerCase().includes(query));
    }

    // Sort
    data.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });

    return data;
  }, [activeTab, searchQuery, sortBy]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">History</h1>
        <p className="text-muted-foreground mt-1">
          View and manage all your generated content
        </p>
      </div>

      <HistoryFilters
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {filteredData.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <FolderOpen className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="font-medium mb-1">No results found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {searchQuery
                ? "Try a different search term"
                : "Start creating content to see it here"}
            </p>
            {!searchQuery && (
              <div className="flex gap-2 justify-center">
                <Button size="sm" asChild>
                  <Link href="/generate/blog">
                    <FileText className="h-4 w-4 mr-2" />
                    Create Blog
                  </Link>
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/generate/video">
                    <Video className="h-4 w-4 mr-2" />
                    Upload Video
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {filteredData.map((item) => (
            <GenerationCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
