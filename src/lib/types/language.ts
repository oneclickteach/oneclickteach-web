export interface Language {
  id: string;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
  isDefault: boolean;
  isActive: boolean;
  flagEmoji: string;
  translations: Record<string, string>;
}

export interface LanguageState {
  languages: Record<string, Language>;
  loading: boolean;
  error: string | null;
  selectedLanguage: Language | null;
  getSelectedLanguage: () => Language | null;
  getLanguages: () => Record<string, Language>;
  isLoading: () => boolean;
  getError: () => string | null;
  setLanguages: (languages: Record<string, Language>) => void;
  setSelectedLanguage: (language: Language) => void;
  fetchLanguages: () => Promise<void>;
  updateLanguageStatus: (code: string, isActive: boolean) => Promise<void>;
}
