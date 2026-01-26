"use client";

import { useState } from "react";
import { FileText, Copy, Check } from "lucide-react";

interface ResultDisplayProps {
  text: string;
  filename: string;
}

export default function ResultDisplay({ text, filename }: ResultDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-500" />
          <h2 className="font-semibold">{filename}</h2>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span className="text-sm">Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="bg-gray-50 rounded p-4 max-h-96 overflow-y-auto">
        <pre className="whitespace-pre-wrap text-sm">{text || "No text detected"}</pre>
      </div>
    </div>
  );
}