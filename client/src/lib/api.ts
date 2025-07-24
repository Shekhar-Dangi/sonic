export const getApiBaseUrl = (): string => {
  return import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
};

export const createApiUrl = (path: string): string => {
  const baseUrl = getApiBaseUrl();

  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};
