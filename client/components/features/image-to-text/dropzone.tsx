"use client";

import { useDropzone } from "react-dropzone";
import { Upload, Clipboard } from "lucide-react";
import { useEffect } from "react";

interface DropzoneProps {
  onDrop: (file: File) => void;
  loading: boolean;
}

export default function Dropzone({ onDrop, loading }: DropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (files) => files[0] && onDrop(files[0]),
    accept: { "image/*": [] },
    multiple: false,
    disabled: loading,
  });

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (loading) return;
      
      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of Array.from(items)) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) {
            onDrop(file);
            break;
          }
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [onDrop, loading]);

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
        isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
      } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      {loading ? (
        <p className="text-gray-600">Processing...</p>
      ) : (
        <>
          <p className="text-gray-600 mb-2">
            {isDragActive ? "Drop gambar di sini" : "Drag & drop gambar atau klik"}
          </p>
          <p className="text-sm text-gray-500 mb-3">PNG, JPG, JPEG</p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <Clipboard className="h-4 w-4" />
            <span>atau paste (Ctrl+V) gambar dari clipboard</span>
          </div>
        </>
      )}
    </div>
  );
}