"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import SimpleFileUpload from "@/components/dashboard/SimpleFileUpload";
import { Loader2, ArrowRight } from "lucide-react";

export default function UploadPage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  // This is the main function that handles both steps
  const handleUploadProcess = async () => {
    if (!(selectedFile instanceof File)) {
      alert("Invalid file selected");
      return;
    }
    if (!selectedFile) return;

    setLoading(true);
    try {
      // Step 1: Get signature from your backend
      const initiateData = await initiateUpload();
      if (!initiateData) return;

      // Step 2: Prepare Cloudinary request
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("api_key", String(initiateData.api_key));
      formData.append("timestamp", initiateData.timestamp);
      formData.append("signature", initiateData.signature);
      formData.append("public_id", initiateData.public_id);
      formData.append("folder", initiateData.folder);

      const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${initiateData.cloud_name}/video/upload`;

      // Step 3: Direct upload to Cloudinary
      const response = await fetch(cloudinaryUrl, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Upload successful!", result);
        alert("Upload complete!");
        // Optional: router.push('/dashboard')
      } else {
        throw new Error(result.error?.message || "Cloudinary upload failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const initiateUpload = async () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    const result = await fetch(`${backendUrl}/media/initiate-upload/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
        "Content-Type": "application/json",
      },
    });

    if (!result.ok) {
      const errorData = await result.json();
      throw new Error(errorData.detail || "Backend failed to sign upload");
    }

    return await result.json(); // Important: must return the data
  };

  return (
    <div className="mx-auto max-w-2xl space-y-10">
      <div className="text-center">
        <h2 className="text-[32px] font-semibold tracking-[-0.5px] text-[#111111]">
          Upload Media
        </h2>
        <p className="mt-2 text-[17px] leading-relaxed text-[#6A6A6A]">
          Upload your image or video to get started with content creation.
        </p>
      </div>

      <SimpleFileUpload
        file={selectedFile}
        onFileSelect={setSelectedFile}
        onClear={() => setSelectedFile(null)}
      />

      {/* ✅ Upload button lives HERE */}
      {selectedFile && (
        <div className="flex justify-center">
          <button
            onClick={handleUploadProcess}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-[#4C6FFF] px-6 py-3.5 text-[15px] font-medium text-white transition-all hover:bg-[#3B5CE8] disabled:bg-[#A5B4FC]"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Uploading…
              </>
            ) : (
              <>
                Upload
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
