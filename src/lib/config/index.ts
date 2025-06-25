
export interface AppConfig {
    apiBaseUrl: string;
    baseUrl: string;
    environment: string;
}

// Default configuration for development/fallback
const defaultConfig: AppConfig = {
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost',
    environment: process.env.NODE_ENV || 'development',
};

// Get configuration from runtime environment or fallback to build-time env
export const getConfig = (): AppConfig => {
    // Server-side rendering or build time
    if (typeof window === 'undefined') {
        return defaultConfig;
    }

    // Client-side with runtime configuration
    if (window.__ENV__) {
        return {
            apiBaseUrl: window.__ENV__.API_BASE_URL,
            baseUrl: window.__ENV__.BASE_URL,
            environment: window.__ENV__.ENVIRONMENT
        };
    }

    // Fallback to default configuration
    return defaultConfig;
};

// Individual getters for convenience
export const getApiBaseUrl = (): string => getConfig().apiBaseUrl;
export const getBaseUrl = (): string => getConfig().baseUrl;
