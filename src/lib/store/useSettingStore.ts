import { create } from "zustand";
import { LanguageInterface, SettingInterface } from "../interfaces";
import { settingApi } from "@/services";
import { DEFAULT_SETTING } from "../constants";

export interface SettingState {
    settings: SettingInterface;
    loading: boolean;
    error: string | null;
    selectedLanguage: LanguageInterface | null,
    getSettings: () => Promise<void>;
    updateSetting: (setting: SettingInterface) => Promise<boolean>;
    updateBasicInfo: (setting: SettingInterface) => Promise<boolean>;
    updateTeachingPhilosophy: (setting: SettingInterface) => Promise<boolean>;
    updateSocialLinks: (setting: SettingInterface) => Promise<boolean>;
    updateTestimonials: (setting: SettingInterface) => Promise<boolean>;
    updateResources: (setting: SettingInterface) => Promise<boolean>;
    updateSchedulingUrl: (setting: SettingInterface) => Promise<boolean>;
    setSelectedLanguage: (language: LanguageInterface) => void;
}

export const useSettingStore = create<SettingState>((set) => ({
    settings: DEFAULT_SETTING,
    loading: false,
    error: null,
    selectedLanguage: null,
    getSettings: async () => {
        try {
            set({ loading: true, error: null });
            const settings = await settingApi.getSettings();
            set({ settings, loading: false });
        } catch (error) {
            console.log(error)
            set({ loading: false, error: 'Failed to fetch settings' });
        }
    },
    updateSetting: async (setting: SettingInterface) => {
        try {
            set({ loading: true, error: null });
            const settings = await settingApi.updateSettings(setting);
            set({ settings, loading: false });
            return true;
        } catch (error) {
            console.log(error)
            set({ loading: false, error: 'Failed to update settings' });
            return false;
        }
    },
    updateBasicInfo: async (setting: SettingInterface) => {
        try {
            set({ loading: true, error: null });
            const settings = await settingApi.updateBasicInfo(setting);
            set({ settings, loading: false });
            return true;
        } catch (error) {
            console.log(error)
            set({ loading: false, error: 'Failed to update basic info' });
            return false;
        }
    },
    updateTeachingPhilosophy: async (setting: SettingInterface) => {
        try {
            set({ loading: true, error: null });
            const settings = await settingApi.updateTeachingPhilosophy(setting);
            set({ settings, loading: false });
            return true;
        } catch (error) {
            console.log(error)
            set({ loading: false, error: 'Failed to update teaching philosophy' });
            return false;
        }
    },
    updateSocialLinks: async (setting: SettingInterface) => {
        try {
            set({ loading: true, error: null });
            const settings = await settingApi.updateSocialLinks(setting);
            set({ settings, loading: false });
            return true;
        } catch (error) {
            console.log(error)
            set({ loading: false, error: 'Failed to update social links' });
            return false;
        }
    },
    updateTestimonials: async (setting: SettingInterface) => {
        try {
            set({ loading: true, error: null });
            const settings = await settingApi.updateTestimonials(setting);
            set({ settings, loading: false });
            return true;
        } catch (error) {
            console.log(error)
            set({ loading: false, error: 'Failed to update testimonials' });
            return false;
        }
    },
    updateResources: async (setting: SettingInterface) => {
        try {
            set({ loading: true, error: null });
            const settings = await settingApi.updateResources(setting);
            set({ settings, loading: false });
            return true;
        } catch (error) {
            console.log(error)
            set({ loading: false, error: 'Failed to update resources' });
            return false;
        }
    },
    updateSchedulingUrl: async (setting: SettingInterface) => {
        try {
            set({ loading: true, error: null });
            const settings = await settingApi.updateSchedulingUrl(setting);
            set({ settings, loading: false });
            return true;
        } catch (error) {
            console.log(error)
            set({ loading: false, error: 'Failed to update scheduling url' });
            return false;
        }
    },
    setSelectedLanguage: (language: LanguageInterface) => {
        set({ selectedLanguage: language });
    },
}));