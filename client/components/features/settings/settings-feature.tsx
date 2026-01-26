"use client";

import { useState, useEffect } from "react";
import ThirdPartyCard from "./third-party-card";

type ThirdPartyStatus = {
  tesseract: boolean;
};

export default function SettingsFeature() {
  const [status, setStatus] = useState<ThirdPartyStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const { getThirdPartyStatus } = await import("@/lib/api");
      const data = await getThirdPartyStatus();
      setStatus(data);
    } catch (error) {
      alert("Error: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleInstall = async (name: string) => {
    setLoading(true);
    try {
      const { installThirdParty } = await import("@/lib/api");
      const data = await installThirdParty(name);
      setStatus(data);
    } catch (error) {
      alert("Error: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (name: string) => {
    setLoading(true);
    try {
      const { removeThirdParty } = await import("@/lib/api");
      const data = await removeThirdParty(name);
      setStatus(data);
    } catch (error) {
      alert("Error: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !status) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <ThirdPartyCard
        name="Tesseract OCR"
        description="OCR engine for image to text conversion. Used in: Image to Text"
        installed={status.tesseract}
        onInstall={() => handleInstall("tesseract")}
        onRemove={() => handleRemove("tesseract")}
        disabled={loading}
      />
    </div>
  );
}