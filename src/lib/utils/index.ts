const isDev = import.meta.env.MODE === "development";

export const previewCookie = [
  "__preview_mode=true",
  "HttpOnly=true",
  "Path=/",
  `SameSite=${!isDev ? "none" : "lax"}`,
  `Secure=${!isDev}`,
].join("; ");

export const clearPreviewCookie = previewCookie + `; Expires=${new Date(0)}`;
