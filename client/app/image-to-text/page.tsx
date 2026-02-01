import ImageToTextFeature from "@/components/features/image-to-text/image-to-text-feature";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ImageToTextPage() {
  return (
    <main className="h-full flex flex-col p-4 md:p-8">
      <div className="flex-1 flex flex-col w-full">
        <h1 className="text-3xl font-bold text-center mb-8">
          Image to Text Converter
        </h1>
        <ImageToTextFeature />
      </div>
    </main>
  );
}