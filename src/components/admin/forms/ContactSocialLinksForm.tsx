"use client";

// React Imports
import { useCallback, useEffect } from "react";

// Third Party Imports
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// UI Components
import { Button } from "@/components/ui/button";

// Store
import { useSettingStore } from "@/lib/store/useSettingStore";
import { SettingInterface } from "@/lib/interfaces";
import { SocialLinkInterface } from "@/lib/interfaces";

const contactSocialLinksFormSchema = z.object({
  contactEmail: z.string().email({ message: "Please enter a valid email address." }).optional().or(z.literal('')),
  socialLinks: z.object({
    linkedin: z.string().url({ message: "Please enter a valid URL for LinkedIn." }).optional().or(z.literal('')),
    twitter: z.string().url({ message: "Please enter a valid URL for Twitter/X." }).optional().or(z.literal('')),
    telegram: z.string().url({ message: "Please enter a valid URL for Telegram." }).optional().or(z.literal('')),
    whatsapp: z.string().url({ message: "Please enter a valid URL for WhatsApp." }).optional().or(z.literal('')),
  }).optional(),
});

type ContactSocialLinksFormValues = z.infer<typeof contactSocialLinksFormSchema>;

export function ContactSocialLinksForm() {
  // Store
  const { settings, updateSocialLinks } = useSettingStore((state) => state);

  // Form
  const form = useForm<ContactSocialLinksFormValues>({
    resolver: zodResolver(contactSocialLinksFormSchema),
    defaultValues: {
      contactEmail: settings?.contact_email || "",
      socialLinks: {
        linkedin: settings?.social_links?.linkedin || "",
        twitter: settings?.social_links?.twitter || "",
        telegram: settings?.social_links?.telegram || "",
        whatsapp: settings?.social_links?.whatsapp || "",
      },
    },
    mode: "onChange",
  });

  // Update form when profile changes
  useEffect(() => {
    form.reset({
      contactEmail: settings?.contact_email || "",
      socialLinks: {
        linkedin: settings?.social_links?.linkedin || "",
        twitter: settings?.social_links?.twitter || "",
        telegram: settings?.social_links?.telegram || "",
        whatsapp: settings?.social_links?.whatsapp || "",
      },
    });
  }, [settings, form]);

  async function onSubmit(data: ContactSocialLinksFormValues) {
    const updatedData: Partial<SettingInterface> = {
      contact_email: data.contactEmail,
      social_links: data.socialLinks as SocialLinkInterface,
    };

    const success = await updateSocialLinks(updatedData as SettingInterface);

    if (success) {
      toast.success("Contact Info Updated", {
        description: "Your contact details and social links have been updated.",
      });
    }
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
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Telegram Profile URL</label>
        <input
          type="url"
          placeholder="https://t.me/yourhandle"
          {...form.register("socialLinks.telegram")}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
        {form.formState.errors.socialLinks?.telegram && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {form.formState.errors.socialLinks?.telegram.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">WhatsApp Profile URL (Optional)</label>
        <input
          type="url"
          placeholder="https://wa.me/yournumber"
          {...form.register("socialLinks.whatsapp")}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
        {form.formState.errors.socialLinks?.whatsapp && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {form.formState.errors.socialLinks?.whatsapp.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={!form.formState.isDirty || !form.formState.isValid}>
        Update Contact Info
      </Button>
      {form.formState.isDirty && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Changes detected. Click "Update Contact Info" to save.
        </p>
      )}
    </form>
  );
}
