'use client';

// UI Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Store
import { useTeacherProfileStore } from '@/lib/store/useTeacherProfileStore';

// Forms
import { BasicInfoForm } from '@/components/admin/forms/BasicInfoForm';
import { TeachingPhilosophyForm } from '@/components/admin/forms/TeachingPhilosophyForm';
import { ContactSocialLinksForm } from '@/components/admin/forms/ContactSocialLinksForm';

export default function AdminProfilePage() {
  const profile = useTeacherProfileStore((state) => state.profile);

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
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Manage Your Profile
        </h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
          Update your personal information, teaching philosophy, contact details, and more.
        </p>
      </header>

      <div className="grid gap-8 lg:gap-12">
        {/* Basic Information Section (Placeholder) */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl">Basic Information</CardTitle>
            <CardDescription>Update your name, tagline, bio, and profile picture URL.</CardDescription>
          </CardHeader>
          <CardContent>
            <BasicInfoForm />
          </CardContent>
        </Card>

        {/* Teaching Philosophy Section (Placeholder) */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl">Teaching Philosophy</CardTitle>
            <CardDescription>Share your unique approach to teaching.</CardDescription>
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
