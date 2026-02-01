import ImageCompressionFeature from "@/components/features/image-compression/image-compression-feature";

export default function ImageCompressionPage() {
  return (
    <main className="h-full flex flex-col p-4 md:p-8">
      <div className="flex-1 flex flex-col w-full">
        <h1 className="text-3xl font-bold text-center mb-8">
          Image Compression
        </h1>
        <ImageCompressionFeature />
      </div>
    </main>
  );
}
