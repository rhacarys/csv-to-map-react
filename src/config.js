const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://csv-to-map-api.herokuapp.com"
    : "http://localhost:8000";

const config = {
  API_URL: `${BASE_URL}/api/v1`,
  API_FILES_ENDPOINT: `${BASE_URL}/api/v1/files`,
};
export default config;
