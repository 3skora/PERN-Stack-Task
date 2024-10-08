export const BASE_URL = "http://localhost:3002";
export const API_BASE_URL = `${BASE_URL}/api`;

export function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}
