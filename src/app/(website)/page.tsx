'use client'; // Required for Zustand store and client-side interactions

import Image from 'next/image';
import { Mail, CalendarDays, Download, Link as LinkIcon, GraduationCap, } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ResourceInterface, TestimonialInterface } from "@/lib/interfaces";
import { LinkedInIcon } from '@/components/social/LinkedInIcon';
import { TwitterIcon } from '@/components/social/TwitterIcon';
import { TelegramIcon } from '@/components/social/TelegramIcon';
import { WhatsAppIcon } from '@/components/social/WhatsAppIcon';
import { useSettingStore } from '@/lib/store/useSettingStore';
import { useEffect } from 'react';

export default function TeacherProfilePage() {
  const { settings, getSettings, loading, error } = useSettingStore((state) => state);

  useEffect(() => {
    getSettings();
  }, [getSettings]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading profile...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero/Profile Section */}
        <section className="text-center mb-12 md:mb-16 pt-8 md:pt-12">
          <div className="mb-6">
            {settings.profile_picture_url && (
              <Image
                src={settings.profile_picture_url}
                alt={settings.name}
                width={150}
                height={150}
                className="rounded-full mx-auto border-4 border-primary shadow-lg object-cover"
                priority
              />
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">
            {settings.name}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-6">
            {settings.tagline}
          </p>
          <p className="max-w-2xl mx-auto text-lg mb-6 leading-relaxed">
            {settings?.bio_summary}
          </p>
          <div className="flex justify-center items-center space-x-4">
            {settings?.social_links?.linkedin && (
              <a href={settings?.social_links?.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${settings?.name} on LinkedIn`} className="text-muted-foreground hover:text-primary transition-colors">
                <LinkedInIcon />
              </a>
            )}
            {settings?.social_links?.twitter && (
              <a href={settings?.social_links?.twitter} target="_blank" rel="noopener noreferrer" aria-label={`${settings?.name} on Twitter`} className="text-muted-foreground hover:text-primary transition-colors">
                <TwitterIcon />
              </a>
            )}
            {settings?.social_links?.telegram && (
              <a href={settings?.social_links?.telegram} target="_blank" rel="noopener noreferrer" aria-label={`${settings?.name} on Telegram`} className="text-muted-foreground hover:text-primary transition-colors">
                <TelegramIcon />
              </a>
            )}
            {settings?.social_links?.whatsapp && (
              <a href={settings?.social_links?.whatsapp} target="_blank" rel="noopener noreferrer" aria-label={`${settings?.name} on WhatsApp`} className="text-muted-foreground hover:text-primary transition-colors">
                <WhatsAppIcon />
              </a>
            )}
          </div>
        </section>

        {/* Teaching Philosophy Section */}
        <section className="mb-12 md:mb-16 bg-card p-6 md:p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-center mb-6 flex items-center justify-center"><GraduationCap className="mr-3 h-8 w-8 text-primary" />My Teaching Philosophy</h2>
          <p className="text-lg text-card-foreground leading-relaxed whitespace-pre-line">
            {settings?.teaching_philosophy}
          </p>
        </section>

        {/* Testimonials Section */}
        {settings?.testimonials?.length && (
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl font-bold mb-6">What Students Say</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {settings?.testimonials?.map((testimonial: TestimonialInterface, index: number) => (
                <Card key={`testimonial-${index}`}>
                  <CardHeader>
                    <CardTitle>{testimonial.student_name}</CardTitle>
                    {testimonial.created_at && <CardDescription>{new Date(testimonial.created_at).toLocaleDateString()}</CardDescription>}
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
        {settings?.resources && settings?.resources.length && (
          <section className="mb-12 md:mb-16">
            <h2 className="text-3xl font-semibold text-center mb-8 flex items-center justify-center"><Download className="mr-3 h-8 w-8 text-primary" />Helpful Resources</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {settings?.resources.map((resource: ResourceInterface, index: number) => (
                <Card key={`resource-${index}`} className="flex flex-col">
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
            <a href={`mailto:${settings?.contact_email}`}>{settings?.contact_email}</a>
          </Button>
          {settings?.scheduling_url && (
            <div className="mt-4">
              <p className="text-lg mb-2">Or schedule a consultation:</p>
              <Button asChild size="lg" variant="secondary">
                <a href={settings?.scheduling_url} target="_blank" rel="noopener noreferrer">
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

