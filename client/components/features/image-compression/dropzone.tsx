"use client";

import { Upload, Clipboard } from "lucide-react";

interface DropzoneProps {
  onOpen: () => void;
  loading: boolean;
  isDragActive?: boolean;
}

export default function Dropzone({ onOpen, loading, isDragActive }: DropzoneProps) {
  return (
    <div
      onClick={loading ? undefined : onOpen}
      className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
        isDragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-gray-400"
      } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <Upload className={`mx-auto h-12 w-12 mb-4 ${isDragActive ? "text-primary" : "text-gray-400"}`} />
      {loading ? (
        <p className="text-gray-600">Processing...</p>
      ) : (
        <>
          <p className="text-gray-600 mb-2">
            {isDragActive ? "Drop image anywhere" : "Click to upload or drag & drop"}
          </p>
          <p className="text-sm text-gray-500 mb-3">PNG, JPG, JPEG</p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <Clipboard className="h-4 w-4" />
            <span>or paste (Ctrl+V) image from clipboard</span>
          </div>
        </>
      )}
    </div>
  );
}
