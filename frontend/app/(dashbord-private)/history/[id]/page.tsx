"use client";
import { useEffect, useMemo, useState } from "react";
import { HistoryDetailContent } from "./history-detail-context";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { StatusPill } from "@/components/dashboard/status-pill";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ContentDetailResponse } from "@/types/content";
import { Button } from "@/components/ui/button";
import fetchContentPosts from "@/lib/api/fetch-posts";
const JOB_TYPE = "GENERATE_SOCIAL_POSTS";
const POLL_INTERVAL_MS = 120000;
import type {Session} from "@auth/core/types"
export default function HistoryDetailPage() {
  const params = useParams();
  const contentId = params.id;
  const { data: session } = useSession();
  const [data, setData] = useState <ContentDetailResponse|null >( null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [jobStatus, setJobStatus] = useState("");

  const fetchDetails = async () => {
    if (!session?.access_token) {
      return;
    }
    try {
      setLoading(true);

      const json = await fetchContentPosts({
        contentId: contentId,
        accessToken: session?.access_token,
      });
      setData(json);
      setJobStatus(json?.job?.status || null);
      setProgress(json?.job?.progress);
      setError(null);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Network Error";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Button variant="ghost" size="sm" className="mb-4" asChild>
        <Link href="/history">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to History
        </Link>
      </Button>
      <div className="mb-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              {data?.content?.title || "Untitled"}
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <Badge variant="outline" className="text-xs">
                JOB: GENERATE_SOCIAL_POSTS
              </Badge>
              <StatusPill status={data.content?.status || "—"} />
              {jobStatus ? <StatusPill status={jobStatus} /> : null}
            </div>
          </div>

          <div className="text-xs text-muted-foreground space-y-1 text-right">
            <div className="flex items-center justify-end gap-1">
              <Calendar className="h-3 w-3" />
              <span>Created: {formatDateTime(data?.content?.created_at)}</span>
            </div>
            <div className="flex items-center justify-end gap-1">
              <Clock className="h-3 w-3" />
              <span>Updated: {formatDateTime(data?.content?.updated_at)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
