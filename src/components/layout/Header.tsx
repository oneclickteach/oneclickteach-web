"use client";

import Link from 'next/link';
import { ModeToggle } from '@/components/toggle-mode';
import Image from 'next/image';
import { LanguageSelector } from "@/components/language-selector";
import { useAuthStore } from '@/lib/store/useAuthStore';

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
        </nav>
        <div className="flex flex-initial items-center justify-end space-x-2">
          {isAuthenticated && (
            <button
              onClick={logout}
              className="text-sm font-medium text-foreground/60 transition-colors hover:text-foreground/80"
            >
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
