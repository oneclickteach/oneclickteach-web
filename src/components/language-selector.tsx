"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguageStore } from "@/lib/store/useLanguageStore";
import { Language } from "@/lib/types/language";

export function LanguageSelector() {
  const { languages: languageMap, selectedLanguage, fetchLanguages, setSelectedLanguage } = useLanguageStore();
  const languages = Object.values(languageMap) as Language[];

  useEffect(() => {
    fetchLanguages().catch(console.error);
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setSelectedLanguage(lang);
    // Update document direction for RTL languages
    if (lang.direction === 'rtl') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {selectedLanguage?.flagEmoji || '🌐'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages
          .filter((lang: Language) => lang.isActive)
          .map((lang: Language) => (
            <DropdownMenuItem
              key={lang.id}
              onClick={() => handleLanguageChange(lang)}
              className="flex items-center gap-2"
            >
              {lang.flagEmoji} {lang.name}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
