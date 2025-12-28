"use client";
import { useEffect, useMemo, useState } from "react";
import { HistoryDetailContent } from "./history-detail-context";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
const JOB_TYPE = "GENERATE_SOCIAL_POSTS";
const POLL_INTERVAL_MS = 120000;
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
  console.log(data);
  const shouldPoll = useMemo(() => {
    const activeJob = jobStatus == "QUEUED" || jobStatus == "RUNNING";
    const actiContent = contentStatus == "PROCESSING";
    return activeJob || actiContent;
  }, [jobStatus, contentStatus]);

  const fetchDetails = async ({ silent = false }) => {
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
        const errorBody = await res.json();
        throw new Error(errorBody?.detail || "Failed to load details");
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
    let timerId;
    let isMounted = true;
    const runpolling = async () => {
      await fetchDetails({ silent: data !== null });
      const scheduleNext = () => {
        if (!isMounted) return;
        if (shouldPoll) {
          timerId = setTimeout(runpolling, POLL_INTERVAL_MS);
        }
      };
      scheduleNext();
    };
    runpolling();
    return () => {
      isMounted = false;
      if (timerId) clearTimeout(timerId);
    };
  }, [contentId, session?.access_token, shouldPoll]);
  useEffect(() => {
    if (!data) return;

    const isDone = jobStatus === "COMPLETED" || contentStatus === "GENERATED";
    const isFailed = jobStatus === "FAILED" || contentStatus === "FAILED";

    if (isDone) {
      toast.success("Generation completed");
      // Optionally: do a final fetch or stop logic here
    } else if (isFailed) {
      toast.error("Generation failed");
    }
  }, [jobStatus, contentStatus]);
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
