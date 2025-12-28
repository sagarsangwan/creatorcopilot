"use client";

import Link from "next/link";
import { FileText, Video, ArrowRight, FolderOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GenerationCard } from "@/components/dashboard/generation-card";
import { mockData, user } from "@/lib/mock-data";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import DashboardLoading from "./loading";
import HistoryLoading from "../history/loading";

export default function DashboardPage() {
  const recentItems = mockData.slice(0, 4);
  const [data, setData] = useState();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLatestPosts = async () => {
      if (status !== "authenticated") return;
      try {
        setLoading(true);
        setError("");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/?limit=2`,
          {
            headers: {
              Authorization: `Bearer ${session?.access_token}`,
            },
          }
        );
        if (!res.ok) {
          const errorBody = await res.json();
          console.log(errorBody);
          throw new Error(errorBody?.detail || "Failed to load details");
        }
        const result = await res.json();
        setData(result);
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : "Failed To Fetch Recent Posts";
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestPosts();
  }, [status, session]);
  console.log(data);
  if (status == "loading") {
    return <DashboardLoading />;
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
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome back, {session?.user?.name.split(" ")[0]} 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Ready to create something amazing today?
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="group hover:shadow-lg transition-all duration-200 border-border/60 hover:border-sky-200 bg-gradient-to-br from-sky-50/50 to-background">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="p-2.5 rounded-xl bg-sky-100 w-fit">
                  <FileText className="h-5 w-5 text-sky-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Work on Blog</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Generate SEO-optimized blog posts and social snippets
                  </p>
                </div>
              </div>
            </div>
            <Button className="mt-4 w-full sm:w-auto" asChild>
              <Link href="/generate/blog">
                Start Writing
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 border-border/60 hover:border-rose-200 bg-gradient-to-br from-rose-50/50 to-background">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="p-2.5 rounded-xl bg-rose-100 w-fit">
                  <Video className="h-5 w-5 text-rose-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Work on Video</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Upload videos and generate captions, hashtags & more
                  </p>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              className="mt-4 w-full sm:w-auto bg-transparent"
              asChild
            >
              <Link href="/generate/video">
                Upload Video
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Generations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Generations</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/history">
              View all
              <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </Button>
        </div>
        {loading ? (
          <HistoryLoading />
        ) : error ? (
          <div>error</div>
        ) : data?.total === 0 ? (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                <FolderOpen className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-1">No generations yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Start creating content to see your work here
              </p>
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
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3">
            {data?.posts.map((item) => (
              <GenerationCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
