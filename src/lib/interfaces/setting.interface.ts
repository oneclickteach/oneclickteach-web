import { ResourceInterface } from "./resource.interface"
import { TestimonialInterface } from "./testimonial.interface"
import { LanguageInterface } from "./language.interface"

export interface SettingInterface {
  id: string,
  name: string,
  tagline: string,
  profile_picture_url: string,
  bio_summary: string,
  teaching_philosophy: string,
  contact_email: string,
  social_links: {
    linkedin?: string,
    twitter?: string,
    telegram?: string,
    whatsapp?: string
  },
  testimonials: TestimonialInterface[],
  resources: ResourceInterface[],
  scheduling_url?: string,
  languages: LanguageInterface[]
}
