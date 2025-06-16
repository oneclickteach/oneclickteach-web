"use client";

// React Imports
import { useCallback, useEffect } from "react";

// Third Party Imports
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

// UI Components
import { Button } from "@/components/ui/button";

// Store
import { useSettingStore } from "@/lib/store/useSettingStore";
import { SettingInterface } from "@/lib/interfaces";

const basicInfoFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }).max(100, {
    message: "Name must not be longer than 100 characters.",
  }),
  tagline: z.string().max(200, {
    message: "Tagline must not be longer than 200 characters.",
  }).optional(),
  profilePictureUrl: z.string().optional(),
  bioSummary: z.string().max(1000, {
    message: "Bio summary must not be longer than 1000 characters.",
  }).optional(),
});

type BasicInfoFormValues = z.infer<typeof basicInfoFormSchema>;

export function BasicInfoForm() {
  // Store
  const { settings, updateBasicInfo } = useSettingStore((state) => state);

  // Form
  const form = useForm<BasicInfoFormValues>({
    resolver: zodResolver(basicInfoFormSchema),
    defaultValues: {
      name: settings?.name || "",
      tagline: settings?.tagline || "",
      profilePictureUrl: settings?.profile_picture_url || undefined,
      bioSummary: settings?.bio_summary || "",
    },
    mode: "onChange",
  });

  // Reset form when profile changes
  useEffect(() => {
    form.reset({
      name: settings?.name || "",
      tagline: settings?.tagline || "",
      profilePictureUrl: settings?.profile_picture_url || undefined,
      bioSummary: settings?.bio_summary || "",
    });
  }, [settings, form]);

  async function onSubmit(data: BasicInfoFormValues) {
    const updatedData: Partial<SettingInterface> = {
      name: data.name,
      tagline: data.tagline,
      profile_picture_url: data.profilePictureUrl || undefined,
      bio_summary: data.bioSummary
    };

    const success = await updateBasicInfo(updatedData as SettingInterface);

    if (success) {
      toast.success("Basic Info Updated", {
        description: "Your basic information has been successfully updated.",
      });
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
        <input
          type="text"
          placeholder="Your full name"
          {...form.register("name")}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          This is your public display name.
        </p>
        {form.formState.errors.name && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tagline / Short Professional Title</label>
        <input
          type="text"
          placeholder="e.g., Passionate Language Educator"
          {...form.register("tagline")}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          A brief, catchy phrase that describes you.
        </p>
        {form.formState.errors.tagline && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {form.formState.errors.tagline.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Profile Picture URL</label>
        <input
          type="url"
          placeholder="https://example.com/your-image.jpg"
          {...form.register("profilePictureUrl")}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        />
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Link to your publicly hosted profile picture.
        </p>
        {form.formState.errors.profilePictureUrl && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {form.formState.errors.profilePictureUrl.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bio Summary</label>
        <textarea
          placeholder="Tell us a little bit about yourself and your teaching experience..."
          {...form.register("bioSummary")}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        ></textarea>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          A short summary about you that will be displayed on your profile.
        </p>
        {form.formState.errors.bioSummary && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {form.formState.errors.bioSummary.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={!form.formState.isDirty || !form.formState.isValid}>
        Update Basic Info
      </Button>
      {form.formState.isDirty && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Changes detected. Click "Update Basic Info" to save.
        </p>
      )}
    </form>
  );
}
