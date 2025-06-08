import { useLanguageStore } from "@/lib/store/useLanguageStore";

export function useTranslations() {
  const { selectedLanguage } = useLanguageStore();

  const getTranslation = (key: string, fallback?: string) => {
    if (!selectedLanguage || !selectedLanguage.translations) {
      return fallback || key;
    }

    // Split nested keys like 'profile.title' into array
    const keys = key.split('.');
    let current = selectedLanguage.translations;

    // Traverse through nested objects
    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        return fallback || key;
      }
    }

    // Handle cases where we might get an object instead of a string
    if (typeof current === 'object' && current !== null) {
      // If we have an object, try to get the 'title' property if it exists
      if ('title' in current) {
        return current.title;
      }
      // If no title, return the first string value we find
      for (const value of Object.values(current)) {
        if (typeof value === 'string') {
          return value;
        }
      }
      return fallback || key;
    }

    return typeof current === 'string' ? current : fallback || key;
  };

  return {
    t: getTranslation,
    language: selectedLanguage
  };
}
