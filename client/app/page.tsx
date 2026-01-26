import Link from "next/link";
import { FileText } from "lucide-react";

const features = [
  {
    title: "Image to Text",
    description: "Extract teks dari gambar menggunakan OCR",
    href: "/image-to-text",
    icon: FileText,
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">
          Tools Collection
        </h1>
        <p className="text-gray-600 text-center mb-12">
          Pilih tool yang ingin digunakan
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {features.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 block"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <feature.icon className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h2 className="font-semibold text-lg mb-1">
                    {feature.title}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}