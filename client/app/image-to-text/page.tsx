import ImageToTextFeature from "@/components/features/image-to-text/image-to-text-feature";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ImageToTextPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </Link>
        <h1 className="text-3xl font-bold text-center mb-8">
          Image to Text Converter
        </h1>
        <ImageToTextFeature />
      </div>
    </main>
  );
}