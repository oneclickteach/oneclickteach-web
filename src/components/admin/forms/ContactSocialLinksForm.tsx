"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { useTeacherProfileStore } from "@/lib/store/useTeacherProfileStore";
import { TeacherProfile, SocialLinks } from "@/lib/types/teacher";
import { useCallback } from "react";

const contactSocialLinksFormSchema = z.object({
  contactEmail: z.string().email({ message: "Please enter a valid email address." }).optional().or(z.literal('')), 
  socialLinks: z.object({
    linkedin: z.string().url({ message: "Please enter a valid URL for LinkedIn." }).optional().or(z.literal('')), 
    twitter: z.string().url({ message: "Please enter a valid URL for Twitter/X." }).optional().or(z.literal('')), 
    website: z.string().url({ message: "Please enter a valid URL for your website." }).optional().or(z.literal('')), 
    github: z.string().url({ message: "Please enter a valid URL for GitHub." }).optional().or(z.literal('')), 
  }).optional(),
});

type ContactSocialLinksFormValues = z.infer<typeof contactSocialLinksFormSchema>;

export function ContactSocialLinksForm() {
  const getProfile = useCallback(() => useTeacherProfileStore.getState().profile, []);
  const getUpdateProfileInfo = useCallback(() => useTeacherProfileStore.getState().updateProfileInfo, []);
  const profile = getProfile();
  const updateProfileInfo = getUpdateProfileInfo();

  const form = useForm<ContactSocialLinksFormValues>({
    resolver: zodResolver(contactSocialLinksFormSchema),
    defaultValues: {
      contactEmail: profile?.contactEmail || "",
      socialLinks: {
        linkedin: profile?.socialLinks?.linkedin || "",
        twitter: profile?.socialLinks?.twitter || "",
        website: profile?.socialLinks?.website || "",
        github: profile?.socialLinks?.github || "",
      },
    },
    mode: "onChange",
  });

  // Memoize the form reset function
  const resetForm = useCallback(() => {
    form.reset({
      contactEmail: profile?.contactEmail || "",
      socialLinks: {
        linkedin: profile?.socialLinks?.linkedin || "",
        twitter: profile?.socialLinks?.twitter || "",
        website: profile?.socialLinks?.website || "",
        github: profile?.socialLinks?.github || "",
      },
    });
  }, [profile, form]);

  function onSubmit(data: ContactSocialLinksFormValues) {
    const updatedData: Partial<TeacherProfile> = {
      contactEmail: data.contactEmail,
      socialLinks: data.socialLinks as SocialLinks, // Ensure type compatibility
    };
    updateProfileInfo(updatedData);
    toast.success("Contact Info Updated", {
      description: "Your contact details and social links have been updated.",
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact Email</label>
          <input
            type="email"
            placeholder="your.email@example.com"
            {...form.register("contactEmail")}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            The primary email address for students to contact you.
          </p>
          {form.formState.errors.contactEmail && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {form.formState.errors.contactEmail.message}
            </p>
          )}
        </div>

        <h3 className="text-lg font-medium pt-4">Social Media Links</h3>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">LinkedIn Profile URL</label>
          <input
            type="url"
            placeholder="https://linkedin.com/in/yourprofile"
            {...form.register("socialLinks.linkedin")}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
          {form.formState.errors.socialLinks?.linkedin && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {form.formState.errors.socialLinks?.linkedin.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Twitter / X Profile URL</label>
          <input
            type="url"
            placeholder="https://twitter.com/yourhandle"
            {...form.register("socialLinks.twitter")}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
          {form.formState.errors.socialLinks?.twitter && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {form.formState.errors.socialLinks?.twitter.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Personal Website/Portfolio URL</label>
          <input
            type="url"
            placeholder="https://yourwebsite.com"
            {...form.register("socialLinks.website")}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
          {form.formState.errors.socialLinks?.website && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {form.formState.errors.socialLinks?.website.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">GitHub Profile URL (Optional)</label>
          <input
            type="url"
            placeholder="https://github.com/yourusername"
            {...form.register("socialLinks.github")}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
          {form.formState.errors.socialLinks?.github && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {form.formState.errors.socialLinks?.github.message}
            </p>
          )}
        </div>
        
        <Button type="submit" disabled={!form.formState.isDirty || !form.formState.isValid}>
          Update Contact Info
        </Button>
    </form>
  );
}
