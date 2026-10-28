// analyzeApi.js — Centralized API service for GearDefect AI
// Configured via VITE_API_BASE_URL (for Vercel deployment), defaulting to local backend for development.

const configuredApiBase = import.meta.env.VITE_API_BASE_URL;
export const API_BASE = (configuredApiBase ? configuredApiBase.trim().replace(/\/+$/, "") : "") || "http://127.0.0.1:8000";

/**
 * Sends an image file to the FastAPI /analyze endpoint.
 * @param {File} file - The image file to analyze
 * @returns {Promise<object>} - The parsed JSON response from the backend
 * @throws {Error} - With a user-friendly message for each error type
 */
export async function analyzeImage(file) {
  // Validate file type before sending
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Please upload a JPG, JPEG, or PNG image.");
  }

  const formData = new FormData();
  formData.append("file", file);

  let response;
  try {
    response = await fetch(`${API_BASE}/analyze`, {
      method: "POST",
      body: formData,
    });
  } catch (networkError) {
    // Network-level failure (backend not reachable, CORS, or cold start)
    throw new Error(
      "Backend server is unreachable. Please verify that the API service is running and CORS allows this origin."
    );
  }

  if (!response.ok) {
    let errorMsg = "Analysis failed. Please try again.";
    try {
      const errorData = await response.json();
      if (errorData?.detail) errorMsg = errorData.detail;
    } catch (_) {
      // ignore parse errors
    }
    throw new Error(errorMsg);
  }

  let data;
  try {
    data = await response.json();
  } catch (_) {
    throw new Error("Analysis failed. Invalid response from server.");
  }

  return data;
}

/**
 * Constructs a full URL for an output image from the backend.
 * Prevents double-prefixing of /outputs.
 * @param {string} filename - The filename returned by the backend
 * @returns {string} - Full URL to the image
 */
export function getOutputImageUrl(filename) {
  if (!filename) return null;
  // If backend already returns full URL, return as-is
  if (filename.startsWith("http")) return filename;
  // Strip leading /outputs/ if somehow already included
  const clean = filename.replace(/^\/?(outputs\/)?/, "");
  return `${API_BASE}/outputs/${clean}`;
}

/**
 * Request translation using Sarvam AI via the backend /api/translate route.
 */
export async function translateWithSarvam(text, targetLang, sourceLang = "en") {
  try {
    const res = await fetch(`${API_BASE}/api/translate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, target_lang: targetLang, source_lang: sourceLang }),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("Sarvam translation API unreachable:", err);
  }
  return { translated_text: text, source: "fallback" };
}

/**
 * Check if Sarvam AI subscription key is configured.
 */
export async function checkSarvamStatus() {
  try {
    const res = await fetch(`${API_BASE}/api/sarvam/status`);
    if (res.ok) return await res.json();
  } catch (_) {}
  return { configured: false };
}
