
'use client'; // Required for Zustand store and client-side interactions

import Image from 'next/image';
import { Linkedin, Twitter, Globe, Mail, CalendarDays, Download, Link as LinkIcon, GraduationCap, MessageSquare } from 'lucide-react'; // Added Mail, CalendarDays, Download, LinkIcon
import { useTeacherProfileStore } from '@/lib/store/useTeacherProfileStore';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Testimonial } from "@/lib/types/teacher";

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
            {profile.socialLinks.linkedin && (
              <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${profile.name} on LinkedIn`} className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={28} />
              </a>
            )}
            {profile.socialLinks.twitter && (
              <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label={`${profile.name} on Twitter`} className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={28} />
              </a>
            )}
            {profile.socialLinks.website && (
              <a href={profile.socialLinks.website} target="_blank" rel="noopener noreferrer" aria-label={`${profile.name}'s Website`} className="text-muted-foreground hover:text-primary transition-colors">
                <Globe size={28} />
              </a>
            )}
             {profile.socialLinks.github && (
              <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label={`${profile.name} on Github`} className="text-muted-foreground hover:text-primary transition-colors">
                <svg fill="currentColor" viewBox="0 0 16 16" height="28" width="28"><path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.19.01-.82.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21-.15.46-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path></svg>
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
        {profile.testimonials?.length > 0 && (
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl font-bold mb-6">What Students Say</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {profile.testimonials.map((testimonial: Testimonial) => (
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
        {profile.resources && profile.resources.length > 0 && (
          <section className="mb-12 md:mb-16">
            <h2 className="text-3xl font-semibold text-center mb-8 flex items-center justify-center"><Download className="mr-3 h-8 w-8 text-primary"/>Helpful Resources</h2>
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

