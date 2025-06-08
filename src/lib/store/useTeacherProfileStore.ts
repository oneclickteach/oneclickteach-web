
// Third Party Imports
import { create } from "zustand";

// Types
import { TeacherProfile } from "@/lib/types/teacher";

interface TeacherProfileState {
  profile: TeacherProfile | null;
  loading: boolean;
  error: string | null;
  setProfile: (profileData: TeacherProfile) => void;
  updateProfileInfo: (updatedInfo: Partial<TeacherProfile>) => Promise<boolean>;
  fetchProfile: () => Promise<void>;
}

export const useTeacherProfileStore = create<TeacherProfileState>((set) => ({
  profile: null,
  loading: true,
  error: null,
  setProfile: (profileData: TeacherProfile) => set({ profile: profileData }),
  updateProfileInfo: async (updatedInfo: Partial<TeacherProfile>) => {
    try {
      const profile = useTeacherProfileStore.getState().profile;
      if (!profile) {
        throw new Error('No profile found');
      }

      const response = await fetch('/api/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: profile.id,
          ...updatedInfo
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedProfile = await response.json();
      set({ profile: updatedProfile });
      return true;
    } catch (error) {
      set({ error: 'Failed to update profile' });
      return false;
    }
  },
  fetchProfile: async () => {
    try {
      const response = await fetch('/api/profile');
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      const profile = await response.json();
      set({ profile, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch profile', loading: false });
    }
  }
}));

// Initialize store with mock data on client side
if (typeof window !== 'undefined') {
  useTeacherProfileStore.getState().fetchProfile();
}
