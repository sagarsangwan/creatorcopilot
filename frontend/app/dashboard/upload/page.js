"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { UploadCard } from "@/components/dashboard/upload-card";
import { useSession } from "next-auth/react";

export default function UploadPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [selectedFile, setSelectedFile] = useState(null);
  if (status == "loading") {
    return <div>loadinggg</div>;
  }
  const initiateUpload = async () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const uploadData = {
      media_type: selectedFile.type.split("/")[0],
      media_format: selectedFile.type.split("/")[1],
      file_size: selectedFile.size,
      file_name: selectedFile.name,
    };
    const result = await fetch(`${backendUrl}/media/initiate-upload/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uploadData),
    });
    const data = await result.json();
    console.log(data);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-10">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-[32px] font-semibold tracking-[-0.5px] text-[#111111]">
          Upload Media
        </h2>
        <p className="mt-2 text-[17px] leading-relaxed text-[#6A6A6A]">
          Upload your image or video to get started with content creation.
        </p>
      </div>

      {/* Upload Card */}
      <UploadCard
        onFileSelect={setSelectedFile}
        selectedFile={selectedFile}
        onClear={() => setSelectedFile(null)}
      />

      {/* Continue Button */}
      {selectedFile && (
        <div className="flex justify-center">
          <button
            onClick={initiateUpload}
            className="flex items-center gap-2 rounded-xl bg-[#4C6FFF] px-6 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#3B5CE8]"
          >
            Upload
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      )}
    </div>
  );
}
