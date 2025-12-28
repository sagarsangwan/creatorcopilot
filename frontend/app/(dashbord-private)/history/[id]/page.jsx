"use client";
import { useEffect, useMemo, useState } from "react";
import { HistoryDetailContent } from "./history-detail-context";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
const JOB_TYPE = "GENERATE_SOCIAL_POSTS";
const POLL_INTERVAL_MS = 2500;
export default function HistoryDetailPage() {
  const params = useParams();
  const contentId = params.id;
  const { data: session } = useSession();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const jobStatus = data?.job?.status || null;
  const contentStatus = data?.content?.status || null;

  const shouldPoll = useMemo(() => {
    const activeJob = jobStatus == "QUEUED" || jobStatus == "RUNNING";
    const actiContent = contentStatus == "PROCESSING";
    return activeJob || actiContent;
  }, [jobStatus, contentStatus]);

  const fetchDetails = async ({ silent = False }) => {
    if (!session?.access_token) {
      setLoading(false);
      return;
    }
    try {
      if (!silent) {
        setLoading(true);
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${contentId}/?job_type=GENERATE_SOCIAL_POSTS`,
        {
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );
      if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        throw new Error(errorBody?.message || "Failed to load details");
      }
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Network Error";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!contentId) return;
    if (!session?.access_token) return;
    let interval = null;
    let stopped = false;
    const run = async () => {
      await fetchDetails({ silent: false });
      (interval = setInterval(async () => {
        if (stopped) return;
        await fetchDetails({ silent: true });
      })),
        POLL_INTERVAL_MS;
    };
    run();
    return () => {
      stopped = true;
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [contentId, session?.access_token]);
  useEffect(() => {
    if (!data) return;

    const done =
      jobStatus === "COMPLETED" ||
      jobStatus === "FAILED" ||
      contentStatus === "GENERATED" ||
      contentStatus === "FAILED";

    if (done) {
      // We can show a one-time toast when it transitions to done
      if (jobStatus === "COMPLETED" || contentStatus === "GENERATED") {
        toast.success("Generation completed");
      }
      if (jobStatus === "FAILED" || contentStatus === "FAILED") {
        toast.error("Generation failed");
      }
    }
  }, [data, jobStatus, contentStatus]);

  return (
    <HistoryDetailContent
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
