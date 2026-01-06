"use client";
import { useEffect, useMemo, useState } from "react";
import { HistoryDetailContent } from "./history-detail-context";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
const JOB_TYPE = "GENERATE_SOCIAL_POSTS";
const POLL_INTERVAL_MS = 120000;
export default function HistoryDetailPage() {
  const params = useParams();
  const contentId = params.id;
  const { data: session } = useSession();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [jobStatus, setJobStatus] = useState("");
  const contentStatus = data?.content?.status || null;
  const shouldPoll = useMemo(() => {
    const activeJob = jobStatus == "queued" || jobStatus == "running";
    const actiContent = contentStatus == "processing";
    return activeJob || actiContent;
  }, [jobStatus, contentStatus]);

  const fetchDetails = async () => {
    if (!session?.access_token) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);

      const json = await res.json();
      setData(json);
      setJobStatus(data?.job?.status || null);
      setProgress(data?.job?.progress);
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
    <HistoryDetailContent
      progess={progress}
      data={data}
      jobStatus={jobStatus}
      contentStatus={contentStatus}
      loading={loading}
      error={error}
      JOB_TYPE={JOB_TYPE}
      shouldPoll={shouldPoll}
      POLL_INTERVAL_MS={POLL_INTERVAL_MS}
    />
  );
}
