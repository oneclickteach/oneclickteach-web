"use client";

// React Imports
import { useEffect } from "react";

// Third Party Imports
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

// UI Components
import { Button } from "@/components/ui/button";

// Store
import { useSettingStore } from "@/lib/store/useSettingStore";
import { SettingInterface } from "@/lib/interfaces";

const teachingPhilosophyFormSchema = z.object({
  teachingPhilosophy: z.string().min(10, {
    message: "Teaching philosophy must be at least 10 characters.",
  }).max(5000, {
    message: "Teaching philosophy must not be longer than 5000 characters.",
  }).optional().or(z.literal('')),
});

type TeachingPhilosophyFormValues = z.infer<typeof teachingPhilosophyFormSchema>;

export function TeachingPhilosophyForm() {
  // Store
  const { settings, updateTeachingPhilosophy } = useSettingStore((state) => state);

  // Form
  const form = useForm<TeachingPhilosophyFormValues>({
    resolver: zodResolver(teachingPhilosophyFormSchema),
    defaultValues: {
      teachingPhilosophy: settings?.teaching_philosophy || "",
    },
    mode: "onChange",
  });

  // Update form when profile changes
  useEffect(() => {
    form.reset({
      teachingPhilosophy: settings?.teaching_philosophy || "",
    });
  }, [settings, form]);

  async function onSubmit(data: TeachingPhilosophyFormValues) {
    const updatedData: Partial<SettingInterface> = {
      teaching_philosophy: data.teachingPhilosophy,
    };

    const success = await updateTeachingPhilosophy(updatedData as SettingInterface);

    if (success) {
      toast.success("Teaching Philosophy Updated", {
        description: "Your teaching philosophy has been successfully updated.",
      });
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Your Teaching Philosophy
        </label>
        <textarea
          placeholder="Describe your approach to teaching, your values, and what students can expect..."
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm resize-y min-h-[200px]"
          {...form.register("teachingPhilosophy")}
        ></textarea>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Share your unique approach and methodology.
        </p>
        {form.formState.errors.teachingPhilosophy && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {form.formState.errors.teachingPhilosophy.message}
          </p>
        )}
      </div>
      <Button type="submit" disabled={!form.formState.isDirty || !form.formState.isValid}>
        Update Philosophy
      </Button>
      {form.formState.isDirty && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {"Changes detected. Click \"Update Philosophy\" to save."}
        </p>
      )}
    </form>
  );
}
