import { create } from "zustand";
import { Language, LanguageState } from "@/lib/types/language";

export const useLanguageStore = create<LanguageState>((set, get) => ({
  getSelectedLanguage: () => get().selectedLanguage,
  getLanguages: () => get().languages,
  isLoading: () => get().loading,
  getError: () => get().error,
  languages: {} as Record<string, Language>, // Initialize as empty but properly typed
  loading: true,
  error: null,
  selectedLanguage: null,
  setLanguages: (languages: Record<string, Language>) => set({ languages }),
  setSelectedLanguage: (language: Language) => {
    set({ selectedLanguage: language });
    // Update document direction for RTL languages
    if (language.direction === 'rtl') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  },
  fetchLanguages: async () => {
    try {
      const response = await fetch('/api/language');
      if (!response.ok) throw new Error('Failed to fetch languages');
      const data = await response.json();

      // Set languages - we need to access the nested languages object
      set({ languages: data.languages.languages, loading: false });

      // Set default language immediately
      const defaultLang = (Object.values(data.languages.languages) as Language[]).find(lang => lang.isDefault);
      if (defaultLang) {
        set({ selectedLanguage: defaultLang });
      }
    } catch (error) {
      set({ error: 'Failed to fetch languages', loading: false });
    }
  },
  updateLanguageStatus: async (code: string, isActive: boolean) => {
    const currentLanguages = get().languages;
    try {
      const response = await fetch('/api/language/status', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, isActive }),
      });

      if (!response.ok) throw new Error('Failed to update language status');

      const updatedLang = await response.json();
      const languages = get().languages;
      const updatedLanguages = { ...languages, [updatedLang.language.id]: updatedLang.language };
      set({ languages: updatedLanguages });
    } catch (error) {
      set({ error: 'Failed to update language status' });
    }
  },
}));
