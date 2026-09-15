import { ComplianceReport, OCRResponse, StatsResponse } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export async function uploadImageApi(file: File): Promise<{ filename: string; file_url: string; original_name: string }> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ detail: "Upload failed" }));
    throw new Error(err.detail || "Failed to upload image");
  }

  return response.json();
}

export async function runOcrApi(filename: string): Promise<OCRResponse> {
  const formData = new FormData();
  formData.append("filename", filename);

  const response = await fetch(`${API_BASE_URL}/ocr`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ detail: "OCR processing failed" }));
    throw new Error(err.detail || "OCR Extraction failed");
  }

  return response.json();
}

export async function checkComplianceApi(payload: {
  text: string;
  category?: string;
  product_name?: string;
  image_filename?: string | null;
  confidence?: number;
}): Promise<ComplianceReport> {
  const response = await fetch(`${API_BASE_URL}/check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ detail: "Compliance check failed" }));
    throw new Error(err.detail || "Compliance verification failed");
  }

  return response.json();
}

export async function getHistoryApi(search?: string, category?: string, status?: string): Promise<ComplianceReport[]> {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (category) params.append("category", category);
  if (status) params.append("status", status);

  const response = await fetch(`${API_BASE_URL}/history?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch scan history");
  }

  return response.json();
}

export async function getReportByIdApi(id: string | number): Promise<ComplianceReport> {
  const response = await fetch(`${API_BASE_URL}/report/${id}`);
  if (!response.ok) {
    throw new Error("Compliance report not found");
  }

  return response.json();
}

export async function deleteScanApi(id: number): Promise<{ message: string }> {
  const response = await fetch(`${API_BASE_URL}/scan/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete scan record");
  }
  return response.json();
}

export async function getStatsApi(): Promise<StatsResponse> {
  const response = await fetch(`${API_BASE_URL}/stats`);
  if (!response.ok) {
    throw new Error("Failed to fetch analytics");
  }

  return response.json();
}

export async function seedSampleDataApi(): Promise<{ message: string }> {
  const response = await fetch(`${API_BASE_URL}/seed`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Failed to seed sample data");
  }
  return response.json();
}

export function getPdfDownloadUrl(id: number): string {
  return `${API_BASE_URL}/report/${id}/pdf`;
}
