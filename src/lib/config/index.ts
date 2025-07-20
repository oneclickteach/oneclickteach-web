let runtimeConfig: { API_BASE_URL?: string } = {};

export async function getRuntimeConfig(): Promise<typeof runtimeConfig> {
    if (Object.keys(runtimeConfig).length > 0) return runtimeConfig;

    const res = await fetch('/runtime-config.json');
    runtimeConfig = await res.json();
    return runtimeConfig;
}
