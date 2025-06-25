import { getApiBaseUrl } from '@/lib/config';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { toast } from 'sonner';

interface ErrorResponse {
  message?: string | string[];
  [key: string]: unknown;
}

export interface ApiAxiosRequestConfig extends AxiosRequestConfig {
  silent?: boolean;
}

export const api = axios.create({
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to set baseURL dynamically
api.interceptors.request.use((config) => {
  // Set baseURL on each request to ensure we have the latest config
  if (!config.baseURL) {
    config.baseURL = getApiBaseUrl();
  }
  return config;
});

// Response error interceptor
api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    const config = error.config as ApiAxiosRequestConfig;
    const silent = config?.silent;

    if (!silent) {
      const data = error?.response?.data as ErrorResponse;
      const status = error?.response?.status;

      // Customize how you handle different status codes
      if (status === 400 || status === 422) {
        const messages = Array.isArray(data?.message) ? data.message : [data?.message || 'Bad Request'];
        toast.error('Validation Error', {
          description: messages.join('\n'),
        });
      } else if (status === 401) {
        toast.error('Unauthorized', {
          description: 'Please login again.',
        });
      } else if (status === 500) {
        toast.error('Server Error', {
          description: 'Something went wrong on our side.',
        });
      } else {
        toast.error('Unexpected Error', {
          description: data?.message || 'An unknown error occurred.',
        });
      }
    }

    return Promise.reject(error); // allow caller to still handle error if needed
  }
);