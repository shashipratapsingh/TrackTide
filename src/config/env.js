const required = (value, fallback) => value || fallback;

export const env = Object.freeze({
  appName: required(import.meta.env.VITE_APP_NAME, "TrackTide"),
  apiBaseUrl: required(import.meta.env.VITE_API_BASE_URL, "http://localhost:8080/api"),
  dataSource: required(import.meta.env.VITE_DATA_SOURCE, "mock"),
  enableMockAuth: import.meta.env.VITE_ENABLE_MOCK_AUTH !== "false"
});
