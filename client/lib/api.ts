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

export async function compressImage(file: File, quality: number = 31): Promise<{ blob: Blob; filename: string }> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("quality", quality.toString());

  const response = await fetch(`${API_URL}/image-compression/compress?quality=${quality}`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Failed to compress image");
  }

  const blob = await response.blob();
  const contentDisposition = response.headers.get("Content-Disposition");
  let filename = "compressed-image";

  if (contentDisposition) {
    const match = contentDisposition.match(/filename="?([^"]+)"?/);
    if (match && match[1]) {
      filename = match[1];
    }
  }

  return { blob, filename };
}

export async function getThirdPartyStatus(): Promise<{ tesseract: boolean; ffmpeg: boolean }> {
  const response = await fetch(`${API_URL}/third-party/status`);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Failed to get status");
  }

  return response.json();
}

export async function installThirdParty(name: string): Promise<{ tesseract: boolean; ffmpeg: boolean }> {
  const response = await fetch(`${API_URL}/third-party/install`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to install");
  }

  return response.json();
}

export async function removeThirdParty(name: string): Promise<{ tesseract: boolean; ffmpeg: boolean }> {
  const response = await fetch(`${API_URL}/third-party/remove`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to remove");
  }

  return response.json();
}