"use client";

import { useRef } from "react";

export default function SimpleFileUpload({ file, onFileSelect, onClear }) {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    onFileSelect(selected);
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-4">
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleChange}
        className="hidden"
      />

      {!file && (
        <button
          onClick={() => inputRef.current?.click()}
          className="w-full rounded-lg border border-dashed border-gray-300 py-8 text-sm text-gray-600 hover:border-gray-400"
        >
          Click to select image or video
        </button>
      )}

      {file && (
        <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
          <div className="text-sm">
            <p className="font-medium text-gray-900">{file.name}</p>
            <p className="text-gray-500">{formatSize(file.size)}</p>
          </div>

          <button
            onClick={onClear}
            className="text-sm text-red-600 hover:underline"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
