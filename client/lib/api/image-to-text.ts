const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function extractText(file: File): Promise<{ text: string; filename: string }> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/image-to-text/extract`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Failed to extract text");
  }

  return response.json();
}