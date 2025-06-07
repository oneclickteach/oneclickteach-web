import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// This layout applies to pages within the (pages) group.
// It does not need Metadata, html, body, or ThemeProvider as those are in the root layout.
export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Header and Footer are specific to this (pages) group */}
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
