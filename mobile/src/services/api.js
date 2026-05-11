import { create } from 'axios';
import { clearAuthSession, getAuthSession } from '../utils/storage';

const API_BASE_URL = 'http://10.22.178.94:5000/api';  

export const api = create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

let onUnauthorized = null;

export function setUnauthorizedHandler(handler) {
  onUnauthorized = handler;
}

api.interceptors.request.use(async (config) => {
  const { token } = await getAuthSession();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await clearAuthSession();
      if (onUnauthorized) {
        onUnauthorized();
      }
    }
    return Promise.reject(error);
  }
);

export function getApiErrorMessage(error) {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.response?.data?.error) {
    return error.response.data.error;
  }
  if (error.message) {
    return error.message;
  }
  return 'Something went wrong. Please try again.';
}
