'use client';

// UI Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Store
import { useEffect } from 'react';
import { useTeacherProfileStore } from '@/lib/store/useTeacherProfileStore';
import { useTranslation } from '@/hooks/use-translation';
import { useLanguageStore } from '@/lib/store/useLanguageStore';

// Forms
import { BasicInfoForm } from '@/components/admin/forms/BasicInfoForm';
import { TeachingPhilosophyForm } from '@/components/admin/forms/TeachingPhilosophyForm';
import { ContactSocialLinksForm } from '@/components/admin/forms/ContactSocialLinksForm';
import LanguageManagement from '@/components/admin/LanguageManagement';

export default function AdminProfilePage() {
  const profile = useTeacherProfileStore((state) => state.profile);
  const { t } = useTranslation();
  const { getSelectedLanguage, fetchLanguages } = useLanguageStore();
  const selectedLanguage = getSelectedLanguage();
  const selectedLanguageCode = selectedLanguage?.id || 'en'; // Default to English if no language selected

  // Initialize languages on component mount
  useEffect(() => {
    fetchLanguages();
  }, [fetchLanguages]);

  // The store initializes with mock data, so profile should ideally not be null here
  // after the initial client-side hydration. If it can be null, a robust loading state is good.
  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[calc(100vh-200px)]">
        <p>Loading profile data...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            {t('profile.title', selectedLanguageCode)}
          </h1>
        </div>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
          {t('profile.subtitle', selectedLanguageCode)}
        </p>
      </header>

      <div className="grid gap-8 lg:gap-12">
        {/* Languages Management Section */}
        <LanguageManagement />
        {/* Basic Information Section (Placeholder) */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl">{t('profile.sections.basicInfo.title')}</CardTitle>
            <CardDescription>{t('profile.sections.basicInfo.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <BasicInfoForm />
          </CardContent>
        </Card>

        {/* Teaching Philosophy Section (Placeholder) */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl">{t('profile.sections.teachingPhilosophy.title')}</CardTitle>
            <CardDescription>{t('profile.sections.teachingPhilosophy.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <TeachingPhilosophyForm />
          </CardContent>
        </Card>

        {/* Contact & Social Links Section (Placeholder) */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl">Contact & Social Links</CardTitle>
            <CardDescription>How can students and collaborators reach you?</CardDescription>
          </CardHeader>
          <CardContent>
            <ContactSocialLinksForm />
          </CardContent>
        </Card>

        {/* Placeholder for Testimonials, Resources, Scheduling sections */}
        {/* We will add these progressively */}
      </div>
    </div>
  );
}
