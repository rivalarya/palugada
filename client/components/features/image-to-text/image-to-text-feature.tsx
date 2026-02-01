"use client";

import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Dropzone from "./dropzone";
import ResultDisplay from "./result-display";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, UploadCloud } from "lucide-react";

export default function ImageToTextFeature() {
  const [result, setResult] = useState<{ text: string; filename: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExtract = useCallback(async (file: File) => {
    setLoading(true);
    setResult(null);
    setError(null);
    
    try {
      const { extractText } = await import("@/lib/api");
      const data = await extractText(file);
      setResult(data);
    } catch (error) {
      console.error(error);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  const onDrop = useCallback((files: File[]) => {
    if (files[0]) handleExtract(files[0]);
  }, [handleExtract]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
    noClick: true,
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
            handleExtract(file);
            break;
          }
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [handleExtract, loading]);

  return (
    <div {...getRootProps()} className="relative flex flex-col flex-1 min-h-[50vh] outline-none">
      <input {...getInputProps()} />
      
      {/* Full screen drop overlay */}
      {isDragActive && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm border-2 border-dashed border-primary rounded-lg transition-all duration-200">
          <div className="text-center animate-in fade-in zoom-in duration-300">
            <div className="bg-primary/10 p-4 rounded-full inline-block mb-4">
              <UploadCloud className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-primary">Drop image here</h3>
            <p className="text-muted-foreground mt-2">Release to upload</p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <Dropzone onOpen={open} loading={loading} isDragActive={isDragActive} />
        
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        )}

        {result && <ResultDisplay text={result.text} filename={result.filename} />}
      </div>
    </div>
  );
}
