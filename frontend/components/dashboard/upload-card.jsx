"use client";

import { useState, useCallback } from "react";
import { Upload, X, FileImage, FileVideo, File } from "lucide-react";
import { cn } from "@/lib/utils";

export function UploadCard({ onFileSelect, selectedFile, onClear }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) {
        const uploadedFile = {
          name: file.name,
          size: file.size,
          type: file.type,
          preview: file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : undefined,
        };
        onFileSelect?.(uploadedFile);
      }
    },
    [onFileSelect]
  );

  const handleFileChange = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const uploadedFile = {
          name: file.name,
          size: file.size,
          type: file.type,
          preview: file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : undefined,
        };
        onFileSelect?.(uploadedFile);
      }
    },
    [onFileSelect]
  );

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (type) => {
    if (type.startsWith("image/")) return FileImage;
    if (type.startsWith("video/")) return FileVideo;
    return File;
  };

  if (selectedFile) {
    const FileIcon = getFileIcon(selectedFile.type);

    return (
      <div className="rounded-2xl border border-[#E5E5E5] bg-background p-7">
        <div className="flex items-start gap-5">
          {selectedFile.preview ? (
            <img
              src={selectedFile.preview || "/placeholder.svg"}
              alt={selectedFile.name}
              className="h-24 w-24 rounded-xl object-cover"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-[#FAFAFA]">
              <FileIcon
                className="h-10 w-10 text-[#6A6A6A]"
                strokeWidth={1.5}
              />
            </div>
          )}

          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[17px] font-medium text-[#111111]">
                  {selectedFile.name}
                </p>
                <p className="mt-1 text-[15px] text-[#6A6A6A]">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
              <button
                onClick={onClear}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#6A6A6A] transition-colors hover:bg-[#FAFAFA] hover:text-[#111111]"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <div className="h-1.5 flex-1 rounded-full bg-[#E5E5E5]">
                <div className="h-full w-full rounded-full bg-[#4C6FFF]" />
              </div>
              <span className="text-[13px] font-medium text-[#4C6FFF]">
                Ready
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative rounded-2xl border-2 border-dashed transition-colors",
        isDragging
          ? "border-[#4C6FFF] bg-[#4C6FFF]/5"
          : "border-[#E5E5E5] bg-background"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*,video/*"
        onChange={handleFileChange}
        className="absolute inset-0 cursor-pointer opacity-0"
      />

      <div className="flex flex-col items-center justify-center py-16 px-8">
        <div
          className={cn(
            "flex h-16 w-16 items-center justify-center rounded-2xl transition-colors",
            isDragging ? "bg-[#4C6FFF]/10" : "bg-[#FAFAFA]"
          )}
        >
          <Upload
            className={cn(
              "h-8 w-8 transition-colors",
              isDragging ? "text-[#4C6FFF]" : "text-[#6A6A6A]"
            )}
            strokeWidth={1.5}
          />
        </div>

        <h3 className="mt-6 text-[18px] font-medium text-[#111111]">
          {isDragging ? "Drop your file here" : "Drag and drop your file"}
        </h3>
        <p className="mt-2 text-[15px] text-[#6A6A6A]">
          or click to browse from your computer
        </p>

        <div className="mt-6 flex items-center gap-3">
          <span className="rounded-lg bg-[#FAFAFA] px-3 py-1.5 text-[13px] font-medium text-[#6A6A6A]">
            PNG
          </span>
          <span className="rounded-lg bg-[#FAFAFA] px-3 py-1.5 text-[13px] font-medium text-[#6A6A6A]">
            JPG
          </span>
          <span className="rounded-lg bg-[#FAFAFA] px-3 py-1.5 text-[13px] font-medium text-[#6A6A6A]">
            MP4
          </span>
          <span className="rounded-lg bg-[#FAFAFA] px-3 py-1.5 text-[13px] font-medium text-[#6A6A6A]">
            MOV
          </span>
        </div>
      </div>
    </div>
  );
}
