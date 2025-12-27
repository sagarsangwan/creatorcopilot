"use client";
import { useEffect, useState } from "react";
import { HistoryDetailContent } from "./history-detail-context";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
export default function HistoryDetailPage() {
  const params = useParams();
  const contentId = params.id;
  const { data: session } = useSession();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    let interval;
    const fetchConetent = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/${contentId}/?job_type=GENERATE_SOCIAL_POSTS`,
          {
            cache: "no-store",
            headers: {
              Authorization: `Bearer ${session.access_token}`,
            },
          }
        );
        let data = null;
        if (!res.ok) {
          throw new Error("Failed to fetch content");
        }
        data = await res.json();
        setData(data);
        if (
          data?.job?.status === "COMPLETED" ||
          data?.job?.status === "COMPLETED"
        ) {
          clearInterval(interval);
          if (interval) clearInterval(interval);
        }
      } catch (err) {
        setError(err.message || "Something went wrong");
        setLoading(false);
      }
    };
    fetchConetent();
    interval = setInterval(fetchConetent, 3000);
    return () => clearInterval(interval);
  }, [contentId, session?.access_token]);
  console.log(data, error);

  return <HistoryDetailContent data={data} />;
}
