'use client';

// UI Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Store
import { useEffect } from 'react';
import { useSettingStore } from '@/lib/store/useSettingStore';

// Forms
import { BasicInfoForm } from '@/components/admin/forms/BasicInfoForm';
import { TeachingPhilosophyForm } from '@/components/admin/forms/TeachingPhilosophyForm';
import { ContactSocialLinksForm } from '@/components/admin/forms/ContactSocialLinksForm';

export default function AdminProfilePage() {
  const { settings, selectedLanguage, setSelectedLanguage, getSettings } = useSettingStore((state) => state);

  useEffect(() => {
    getSettings();
  }, [getSettings]);

  if (!settings) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[calc(100vh-200px)]">
        <p>Loading setting data...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Manage Your Profile
          </h1>
        </div>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
          Update your personal information, teaching philosophy, contact details, and more.
        </p>
      </header>

      <div className="grid gap-8 lg:gap-12">
        {/* Basic Information Section (Placeholder) */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl">Basic Information</CardTitle>
            <CardDescription>Update your basic information here.</CardDescription>
          </CardHeader>
          <CardContent>
            <BasicInfoForm />
          </CardContent>
        </Card>

        {/* Teaching Philosophy Section (Placeholder) */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl">Teaching Philosophy</CardTitle>
            <CardDescription>Update your teaching philosophy here.</CardDescription>
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
