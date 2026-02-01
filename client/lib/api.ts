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

export async function getThirdPartyStatus(): Promise<{ tesseract: boolean }> {
  const response = await fetch(`${API_URL}/third-party/status`);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Failed to get status");
  }

  return response.json();
}

export async function installThirdParty(name: string): Promise<{ tesseract: boolean }> {
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

export async function removeThirdParty(name: string): Promise<{ tesseract: boolean }> {
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