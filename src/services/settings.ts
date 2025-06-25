import { api } from './api';
import { SettingInterface } from '@/lib/interfaces';

export const settingApi = {
  getSettings: async (): Promise<SettingInterface> => {
    const response = await api.get('/settings');
    return response.data;
  },

  updateSettings: async (setting: SettingInterface): Promise<SettingInterface> => {
    const response = await api.patch<SettingInterface>('/settings', setting);
    return response.data;
  },

  updateBasicInfo: async (setting: SettingInterface): Promise<SettingInterface> => {
    const response = await api.patch<SettingInterface>('/settings/basic-info', setting);
    return response.data;
  },

  updateTeachingPhilosophy: async (setting: SettingInterface): Promise<SettingInterface> => {
    const response = await api.patch<SettingInterface>('/settings/teaching-philosophy', setting);
    return response.data;
  },

  updateSocialLinks: async (setting: SettingInterface): Promise<SettingInterface> => {
    const response = await api.patch<SettingInterface>('/settings/social-links', setting);
    return response.data;
  },

  updateTestimonials: async (setting: SettingInterface): Promise<SettingInterface> => {
    const response = await api.patch<SettingInterface>('/settings/testimonials', setting);
    return response.data;
  },

  updateResources: async (setting: SettingInterface): Promise<SettingInterface> => {
    const response = await api.patch<SettingInterface>('/settings/resources', setting);
    return response.data;
  },

  updateSchedulingUrl: async (setting: SettingInterface): Promise<SettingInterface> => {
    const response = await api.patch<SettingInterface>('/settings/scheduling-url', setting);
    return response.data;
  },
};
