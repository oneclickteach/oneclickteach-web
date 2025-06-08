"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useLanguageStore } from "@/lib/store/useLanguageStore";
import { useTranslation } from "@/hooks/use-translation";
import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function LanguageManagement() {
  const { languages, updateLanguageStatus, fetchLanguages } = useLanguageStore();
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchLanguages().catch(console.error);
  }, [fetchLanguages]);

  if (!languages || Object.keys(languages).length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center">Loading languages...</p>
      </div>
    );
  }

  const handleLanguageStatusChange = async (langId: string, checked: boolean) => {
    try {
      setLoading(langId);
      setError(null);
      await updateLanguageStatus(langId, checked);
    } catch (err) {
      setError(t('common.error.updateLanguage'));
      console.error('Failed to update language status:', err);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{t('languages.title')}</h1>
        <p className="mt-2 text-muted-foreground">{t('languages.subtitle')}</p>
      </header>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4">
        {Object.values(languages).map((lang) => (
          <Card key={lang.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{lang.flagEmoji}</span>
                <div>
                  <CardTitle>{lang.name}</CardTitle>
                  <CardDescription>{lang.nativeName}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{t('languages.status')}</span>
                  <div key={`switch-${lang.id}`} className="flex items-center">
                    <label htmlFor={`lang-${lang.id}`} className="sr-only">
                      {t('languages.toggleStatus', lang.name)}
                    </label>
                    <Switch
                      id={`lang-${lang.id}`}
                      checked={lang.isActive}
                      onCheckedChange={(checked) => handleLanguageStatusChange(lang.id, checked)}
                      disabled={loading === lang.id}
                    />
                  </div>
                </div>
                {loading === lang.id && (
                  <div className="text-sm text-muted-foreground">
                    Updating status...
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}