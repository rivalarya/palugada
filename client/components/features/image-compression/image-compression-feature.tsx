"use client";

import { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Dropzone from "./dropzone";
import ResultDisplay from "./result-display";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AlertCircle, UploadCloud, Download } from "lucide-react";
import { compressImage } from "@/lib/api/image-compression";
import { getThirdPartyStatus, installThirdParty } from "@/lib/api/third-party";

export default function ImageCompressionFeature() {
  const [result, setResult] = useState<{ blob: Blob; filename: string } | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quality, setQuality] = useState(31);
  const [ffmpegInstalled, setFfmpegInstalled] = useState<boolean | null>(null);
  const [installingFfmpeg, setInstallingFfmpeg] = useState(false);

  const handleCompress = useCallback(async (file: File) => {
    if (ffmpegInstalled === false) {
      setError("ffmpeg-not-installed");
      return;
    }
    
    setLoading(true);
    setResult(null);
    setOriginalFile(file);
    setError(null);
    
    try {
      const data = await compressImage(file, quality);
      setResult(data);
    } catch (error) {
      console.error(error);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, [quality, ffmpegInstalled]);

  const onDrop = useCallback((files: File[]) => {
    if (files[0]) handleCompress(files[0]);
  }, [handleCompress]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
    noClick: true,
    disabled: loading,
  });

  useEffect(() => {
    const checkFfmpegStatus = async () => {
      try {
        const status = await getThirdPartyStatus();
        setFfmpegInstalled(status.ffmpeg);
      } catch (error) {
        console.error("Failed to check ffmpeg status:", error);
        setFfmpegInstalled(false);
      }
    };

    checkFfmpegStatus();
  }, []);

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (loading) return;
      
      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of Array.from(items)) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) {
            handleCompress(file);
            break;
          }
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [handleCompress, loading]);

  const handleInstallFfmpeg = async () => {
    setInstallingFfmpeg(true);
    setError(null);
    try {
      await installThirdParty("ffmpeg");
      const status = await getThirdPartyStatus();
      setFfmpegInstalled(status.ffmpeg);
    } catch (error) {
      console.error(error);
      setError((error as Error).message);
    } finally {
      setInstallingFfmpeg(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setOriginalFile(null);
    setError(null);
  };

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
        {ffmpegInstalled === false && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>FFmpeg Required</AlertTitle>
            <AlertDescription className="flex flex-col items-start gap-2">
              <span>FFmpeg is not installed. This feature requires FFmpeg to compress images.</span>
              <Button
                variant="outline" 
                size="sm" 
                onClick={handleInstallFfmpeg}
                disabled={installingFfmpeg}
                className="w-fit bg-background text-foreground hover:bg-accent"
              >
                <Download className="h-4 w-4 mr-2" />
                {installingFfmpeg ? "Installing..." : "Install FFmpeg"}
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {error && error !== "ffmpeg-not-installed" && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && originalFile ? (
          <ResultDisplay
            originalFile={originalFile}
            compressedBlob={result.blob}
            filename={result.filename}
            onReset={handleReset}
          />
        ) : (
          <div className="space-y-6">
            <div className="bg-muted p-4 rounded-lg">
              <Label htmlFor="quality-slider" className="mb-3 block">
                Compression Quality
              </Label>
              <Slider
                id="quality-slider"
                min={1}
                max={31}
                value={quality}
                onInput={(e) => setQuality(Number((e.target as HTMLInputElement).value))}
                label="Quality"
                valueLabel={`${quality} (${quality === 1 ? 'Best' : quality === 31 ? 'Smallest' : 'Balanced'})`}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>Best Quality</span>
                <span>Smallest Size</span>
              </div>
            </div>
            <Dropzone
              onOpen={open}
              loading={loading}
              isDragActive={isDragActive}
            />
          </div>
        )}
      </div>
    </div>
  );
}
