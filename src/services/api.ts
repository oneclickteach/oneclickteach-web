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
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
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