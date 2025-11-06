// API Configuration
export const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:4000';
export const API_ENDPOINTS = {
  workouts: `${API_BASE_URL}/api/workouts`,
  login: `${API_BASE_URL}/api/user/login`,
  signup: `${API_BASE_URL}/api/user/signup`,
};
