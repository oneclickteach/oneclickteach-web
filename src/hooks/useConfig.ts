import { useState, useEffect } from 'react';
import { AppConfig, getConfig } from '@/lib/config';

export const useConfig = () => {
  const [config, setConfig] = useState<AppConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Small delay to ensure window.__ENV__ is loaded
    const timer = setTimeout(() => {
      setConfig(getConfig());
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return { config, isLoading };
};