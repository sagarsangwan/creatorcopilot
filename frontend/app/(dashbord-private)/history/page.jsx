"use client";

import { useState, useMemo, useEffect } from "react";
import { FolderOpen, FileText, Video } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GenerationCard } from "@/components/dashboard/generation-card";
import { HistoryFilters } from "@/components/dashboard/history-filters";
import { mockData } from "@/lib/mock-data";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import HistoryLoading from "./loading";

export default function HistoryPage() {
  const { data: session, status } = useSession();
  console.log(status);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  useEffect(() => {
    const fetchPosts = async () => {
      if (status !== "authenticated") return;
      try {
        setLoading(true);
        setError("");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/`,
          {
            headers: {
              Authorization: `Bearer ${session?.access_token}`,
            },
          }
        );
        if (!res.ok) {
          const errorBody = await res.json();
          throw new Error(errorBody?.detail || "Failed to load details");
        }
        const data = await res.json();
        setData(data);
      } catch (err) {
        const msg =
          err instanceof Error
            ? err.message
            : "Something Went Wrong Failed To Load Posts";
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [status, session]);
  console.log(data);
  if (loading || status == "loading") {
    return <HistoryLoading />;
  }
  if (error) {
    return (
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">History</h1>
        <p className="text-muted-foreground mt-1">{error}</p>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">History</h1>
        <p className="text-muted-foreground mt-1">
          View and manage all your generated content
        </p>
      </div>

      <div className="grid gap-3">
        {data?.total > 0 ? (
          data?.posts.map((item) => (
            <GenerationCard key={item.id} item={item} />
          ))
        ) : (
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
        )}
      </div>
    </div>
  );
}
