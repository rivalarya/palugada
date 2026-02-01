"use client";

import { useState, useEffect } from "react";
import ThirdPartyCard from "./third-party-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

type ThirdPartyStatus = {
  tesseract: boolean;
  ffmpeg: boolean;
};

export default function SettingsFeature() {
  const [status, setStatus] = useState<ThirdPartyStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    setError(null);
    try {
      const { getThirdPartyStatus } = await import("@/lib/api");
      const data = await getThirdPartyStatus();
      setStatus(data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleInstall = async (name: string) => {
    setLoading(true);
    setError(null);
    try {
      const { installThirdParty } = await import("@/lib/api");
      const data = await installThirdParty(name);
      setStatus(data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (name: string) => {
    setLoading(true);
    setError(null);
    try {
      const { removeThirdParty } = await import("@/lib/api");
      const data = await removeThirdParty(name);
      setStatus(data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !status) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      )}

      {status && (
        <>
          <ThirdPartyCard
            name="Tesseract OCR"
            description="OCR engine for image to text conversion. Used in: Image to Text"
            installed={status.tesseract}
            onInstall={() => handleInstall("tesseract")}
            onRemove={() => handleRemove("tesseract")}
            disabled={loading}
          />
          <ThirdPartyCard
            name="FFmpeg"
            description="Video and audio processing tool. Used in: Image Compression"
            installed={status.ffmpeg}
            onInstall={() => handleInstall("ffmpeg")}
            onRemove={() => handleRemove("ffmpeg")}
            disabled={loading}
          />
        </>
      )}
    </div>
  );
}