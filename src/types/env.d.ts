// types/env.d.ts

interface WindowEnv {
    API_BASE_URL: string;
    BASE_URL: string;
    ENVIRONMENT: string;
}

declare global {
    interface Window {
        __ENV__: WindowEnv;
    }
}

export { };