"use client";

import Link from 'next/link';
import { ModeToggle } from '@/components/toggle-mode';
import Image from 'next/image';
import { LanguageSelector } from "@/components/language-selector";
import { useAuthStore } from '@/lib/store/useAuthStore';
import { LogOut } from 'lucide-react';

export default function Header() {
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center w-full px-8">
        <nav className="flex flex-1 items-center space-x-4 lg:space-x-6">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Image src="/svg/OneClickTeach.svg" alt="OneClickTeach Logo" width={32} height={32} />
            <span className="font-bold sm:inline-block">OneClickTeach</span>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Home
          </Link>
          <Link
            href="/help"
            className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Help
          </Link>
          <Link
            href="/admin"
            className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Admin
          </Link>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Dashboard
          </Link>
        </nav>
        <div className="flex flex-initial items-center justify-end space-x-2">
          {isAuthenticated && (
            <button
              onClick={logout}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background text-foreground hover:bg-destructive hover:text-white h-9 px-4 py-2"
              aria-label="Logout"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </button>
          )}
          <LanguageSelector />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
