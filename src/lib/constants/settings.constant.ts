import { SettingInterface } from "../interfaces";

export const DEFAULT_SETTING: SettingInterface = {
    id: '',
    name: '',
    tagline: '',
    profile_picture_url: '',
    bio_summary: '',
    teaching_philosophy: '',
    contact_email: '',
    social_links: {
        linkedin: '',
        twitter: '',
        telegram: '',
        whatsapp: ''
    },
    testimonials: [],
    resources: [],
    scheduling_url: undefined,
};