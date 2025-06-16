"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSettingStore } from "@/lib/store";
import { LanguageInterface } from "@/lib/interfaces";

export function LanguageSelector() {
  const { settings, getSettings, setSelectedLanguage, selectedLanguage } = useSettingStore((state) => state);
  const languages = Object.values(settings?.languages) as LanguageInterface[];

  useEffect(() => {
    getSettings();
  }, [getSettings]);

  const handleLanguageChange = (lang: LanguageInterface) => {
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
          {selectedLanguage?.flag_emoji || '🌐'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages
          .filter((lang: LanguageInterface) => lang.is_active)
          .map((lang: LanguageInterface) => (
            <DropdownMenuItem
              key={lang.id}
              onClick={() => handleLanguageChange(lang)}
              className="flex items-center gap-2"
            >
              {lang.flag_emoji} {lang.name}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
