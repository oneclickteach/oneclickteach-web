"use client";

import { createContext, useContext } from "react";
import { useTranslations } from "@/lib/utils/translations";

const TranslationContext = createContext({
  t: (key: string, fallback?: string) => key,
  language: null as any,
});

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const translations = useTranslations();
  
  return (
    <TranslationContext.Provider value={translations}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  return useContext(TranslationContext);
}
