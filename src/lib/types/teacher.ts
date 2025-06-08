export interface Testimonial {
  id: string;
  quote: string;
  studentName: string;
  date?: string;
}

export interface TeachingResource {
  id: string;
  title: string;
  description?: string;
  url: string;
  type?: 'link' | 'download' | 'video';
}

export interface SocialLinks {
  linkedin: string;
  twitter: string;
  website: string;
  github: string;
}

export interface TeacherProfile {
  id: string;
  name: string;
  tagline: string;
  profilePictureUrl: string;
  bioSummary: string;
  teachingPhilosophy: string;
  contactEmail: string;
  socialLinks: SocialLinks;
  testimonials?: Testimonial[];
  resources: TeachingResource[];
  schedulingUrl?: string;
}
