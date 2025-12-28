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
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  useEffect(() => {
    const fetchPosts = async () => {
      if (status !== "authenticated") return;
      try {
        setLoading(true);
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
          console.log(errorBody, "errorbody");
          throw new Error(errorBody?.detail || "Failed to load details");
        }
        const data = res.json();
        setPosts(data);
      } catch (err) {
        console.log(err);
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
      (
      <div className="grid gap-3">
        {posts.map((item) => (
          <GenerationCard key={item.id} item={item} />
        ))}
      </div>
      )
    </div>
  );
}
