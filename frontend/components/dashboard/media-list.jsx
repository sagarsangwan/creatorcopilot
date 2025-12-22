"use client";
import api from "@/lib/axios";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function MediaList({ session }) {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await api.get("/media/");
        setMedia(response.data);
      } catch (error) {
        console.error("Fetch error:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, []);
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-[22px] font-medium text-[#111111]">
          Recent Uploads
        </h3>
        <Link
          href="/dashboard/history"
          className="flex items-center gap-1.5 text-[15px] font-medium text-[#4C6FFF] transition-colors hover:text-[#3B5CE8]"
        >
          View all
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-[#E5E5E5]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E5E5E5] bg-[#FAFAFA]">
              <th className="px-6 py-4 text-left text-[14px] font-medium text-[#6A6A6A]">
                Media
              </th>
              <th className="px-6 py-4 text-left text-[14px] font-medium text-[#6A6A6A]">
                Caption
              </th>
              <th className="px-6 py-4 text-left text-[14px] font-medium text-[#6A6A6A]">
                Platforms
              </th>
              <th className="px-6 py-4 text-left text-[14px] font-medium text-[#6A6A6A]">
                Status
              </th>
              <th className="px-6 py-4 text-left text-[14px] font-medium text-[#6A6A6A]">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {media.map((m) => (
              <tr
                key={m.id}
                className="border-b border-[#E5E5E5] last:border-0 transition-colors hover:bg-[#FAFAFA]/50"
              >
                {/* <td className="px-6 py-4">
                  <img
                    src={m.thumbnail || "/placeholder.svg"}
                    alt=""
                    className="h-12 w-12 rounded-lg object-cover"
                  />
                </td> */}
                {/* <td className="px-6 py-4">
                  <p className="max-w-[280px] truncate text-[15px] text-[#111111]">
                    {m.caption}
                  </p>
                </td> */}
                {/* <td className="px-6 py-4">
                <div className="flex gap-1.5">
                  {m.platforms.map((platform) => (
                    <PlatformIcon key={platform} platform={platform} />
                  ))}
                </div>
              </td> */}
                {/* <td className="px-6 py-4">
                <StatusBadge status={m.status} />
              </td> */}
                <td className="px-6 py-4 text-[15px] text-[#6A6A6A]">
                  {m.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MediaList;
