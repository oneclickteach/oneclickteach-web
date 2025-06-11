'use client'; // Required for Zustand store and client-side interactions

import Image from 'next/image';
import { Mail, CalendarDays, Download, Link as LinkIcon, GraduationCap, } from 'lucide-react';
import { useTeacherProfileStore } from '@/lib/store/useTeacherProfileStore';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Testimonial } from "@/lib/types/teacher";
import { LinkedInIcon } from '@/components/social/LinkedInIcon';
import { TwitterIcon } from '@/components/social/TwitterIcon';
import { TelegramIcon } from '@/components/social/TelegramIcon';
import { WhatsAppIcon } from '@/components/social/WhatsAppIcon';

export default function TeacherProfilePage() {
  const { profile, loading, error } = useTeacherProfileStore((state) => state);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading profile...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  }

  if (!profile) {
    return <div className="flex justify-center items-center min-h-screen">No profile data found</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero/Profile Section */}
        <section className="text-center mb-12 md:mb-16 pt-8 md:pt-12">
          <div className="mb-6">
            <Image
              src={profile.profilePictureUrl}
              alt={profile.name}
              width={150}
              height={150}
              className="rounded-full mx-auto border-4 border-primary shadow-lg object-cover"
              priority
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">
            {profile.name}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-6">
            {profile.tagline}
          </p>
          <p className="max-w-2xl mx-auto text-lg mb-6 leading-relaxed">
            {profile.bioSummary}
          </p>
          <div className="flex justify-center items-center space-x-4">
            {profile.socialLinks?.linkedin && (
              <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${profile.name} on LinkedIn`} className="text-muted-foreground hover:text-primary transition-colors">
                <LinkedInIcon />
              </a>
            )}
            {profile.socialLinks?.twitter && (
              <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label={`${profile.name} on Twitter`} className="text-muted-foreground hover:text-primary transition-colors">
                <TwitterIcon />
              </a>
            )}
            {profile.socialLinks?.telegram && (
              <a href={profile.socialLinks.telegram} target="_blank" rel="noopener noreferrer" aria-label={`${profile.name} on Telegram`} className="text-muted-foreground hover:text-primary transition-colors">
                <TelegramIcon />
              </a>
            )}
            {profile.socialLinks?.whatsapp && (
              <a href={profile.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" aria-label={`${profile.name} on WhatsApp`} className="text-muted-foreground hover:text-primary transition-colors">
                <WhatsAppIcon />
              </a>
            )}
          </div>
        </section>

        {/* Teaching Philosophy Section */}
        <section className="mb-12 md:mb-16 bg-card p-6 md:p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-center mb-6 flex items-center justify-center"><GraduationCap className="mr-3 h-8 w-8 text-primary" />My Teaching Philosophy</h2>
          <p className="text-lg text-card-foreground leading-relaxed whitespace-pre-line">
            {profile.teachingPhilosophy}
          </p>
        </section>

        {/* Testimonials Section */}
        {profile.testimonials?.length && (
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl font-bold mb-6">What Students Say</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {profile.testimonials?.map((testimonial: Testimonial) => (
                <Card key={testimonial.id}>
                  <CardHeader>
                    <CardTitle>{testimonial.studentName}</CardTitle>
                    {testimonial.date && <CardDescription>{new Date(testimonial.date).toLocaleDateString()}</CardDescription>}
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="italic text-card-foreground/90">"{testimonial.quote}"</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Resources Section */}
        {profile.resources && profile.resources.length && (
          <section className="mb-12 md:mb-16">
            <h2 className="text-3xl font-semibold text-center mb-8 flex items-center justify-center"><Download className="mr-3 h-8 w-8 text-primary" />Helpful Resources</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profile.resources.map((resource) => (
                <Card key={resource.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center">
                      {resource.type === 'download' ? <Download className="mr-2 h-5 w-5 text-primary" /> : <LinkIcon className="mr-2 h-5 w-5 text-primary" />}
                      {resource.title}
                    </CardTitle>
                    {resource.description && <CardDescription>{resource.description}</CardDescription>}
                  </CardHeader>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        {resource.type === 'download' ? 'Download' : 'Access Resource'}
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Contact Section */}
        <section className="text-center bg-card p-6 md:p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold mb-6 flex items-center justify-center"><Mail className="mr-3 h-8 w-8 text-primary" />Get In Touch</h2>
          <p className="text-lg mb-4">
            Have questions or want to discuss your learning goals? Feel free to reach out!
          </p>
          <Button asChild size="lg" className="mb-4">
            <a href={`mailto:${profile.contactEmail}`}>{profile.contactEmail}</a>
          </Button>
          {profile.schedulingUrl && (
            <div className="mt-4">
              <p className="text-lg mb-2">Or schedule a consultation:</p>
              <Button asChild size="lg" variant="secondary">
                <a href={profile.schedulingUrl} target="_blank" rel="noopener noreferrer">
                  <CalendarDays className="mr-2 h-5 w-5" /> Book a Meeting
                </a>
              </Button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

