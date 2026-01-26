"use client";

import { useState } from "react";
import Dropzone from "./dropzone";
import ResultDisplay from "./result-display";

export default function ImageToTextFeature() {
  const [result, setResult] = useState<{ text: string; filename: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleExtract = async (file: File) => {
    setLoading(true);
    setResult(null);
    
    try {
      const { extractText } = await import("@/lib/api");
      const data = await extractText(file);
      setResult(data);
    } catch (error) {
      alert("Error: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Dropzone onDrop={handleExtract} loading={loading} />
      {result && <ResultDisplay text={result.text} filename={result.filename} />}
    </div>
  );
}