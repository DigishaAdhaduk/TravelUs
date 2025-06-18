// Sample setup - replace with real API calls
export const API_BASE = "http://localhost:8080/api";

export async function fetchGroups() {
  const response = await fetch(`${API_BASE}/groups`);
  return response.json();
}