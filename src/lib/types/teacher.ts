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

export interface TeacherProfile {
  id: string;
  name: string;
  tagline: string;
  profilePictureUrl: string;
  bioSummary: string;
  teachingPhilosophy: string;
  contactEmail: string;
  socialLinks: {
    linkedin: string;
    twitter: string;
    website: string;
    github: string;
  };
  testimonials?: Testimonial[];
  resources: TeachingResource[];
  schedulingUrl?: string;
}
