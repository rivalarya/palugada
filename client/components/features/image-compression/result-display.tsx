"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, CheckCircle, ArrowRight } from "lucide-react";
import { formatBytes } from "@/lib/utils";

interface ResultDisplayProps {
  originalFile: File;
  compressedBlob: Blob;
  filename: string;
  onReset: () => void;
}

export default function ResultDisplay({ originalFile, compressedBlob, filename, onReset }: ResultDisplayProps) {
  const originalSize = originalFile.size;
  const compressedSize = compressedBlob.size;
  const savings = originalSize - compressedSize;
  const savingsPercent = Math.round((savings / originalSize) * 100);

  const handleDownload = () => {
    const url = URL.createObjectURL(compressedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Compression Complete
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Original</p>
              <p className="text-lg font-bold">{formatBytes(originalSize)}</p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">Compressed</p>
              <p className="text-lg font-bold text-green-600">{formatBytes(compressedSize)}</p>
            </div>
            <div className="text-center border-l pl-4">
              <p className="text-sm font-medium text-muted-foreground">Saved</p>
              <p className="text-lg font-bold text-green-600">
                {savingsPercent}% ({formatBytes(savings)})
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleDownload} className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Download Compressed Image
            </Button>
            <Button variant="outline" onClick={onReset}>
              Compress Another
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
