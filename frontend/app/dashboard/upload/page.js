"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { UploadCard } from "@/components/dashboard/upload-card";

export default function UploadPage() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleContinue = () => {
    router.push("/dashboard/editor");
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
            onClick={handleContinue}
            className="flex items-center gap-2 rounded-xl bg-[#4C6FFF] px-6 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-[#3B5CE8]"
          >
            Continue to Editor
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
      )}
    </div>
  );
}
