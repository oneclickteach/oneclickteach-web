import { useTranslation as useTranslationProvider } from "@/components/providers/translation-provider";

export function useTranslation() {
  const { t, language } = useTranslationProvider();
  
  return {
    t,
    language
  };
}
