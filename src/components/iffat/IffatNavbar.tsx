"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { iffatNavLinks, iffatProfile } from "@/data/iffat-profile";

export function IffatNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition ${
        scrolled
          ? "border-[var(--border)] bg-[var(--surface)]/95 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/iffat" className="iffat-display text-lg font-semibold tracking-tight">
          {iffatProfile.name.split(" ")[0]}
          <span className="text-[var(--accent)]">.</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {iffatNavLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--muted)] transition hover:text-[var(--accent)]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/iffat-zahra-cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            CV
          </a>
        </nav>

        <button
          type="button"
          className="rounded-lg border border-[var(--border)] p-2 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open ? (
        <nav className="border-t border-[var(--border)] bg-[var(--surface)] px-4 py-3 md:hidden">
          {iffatNavLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block rounded-lg px-3 py-2.5 text-sm"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/"
            className="mt-2 block px-3 text-xs text-[var(--muted)]"
            onClick={() => setOpen(false)}
          >
            ← Back to main site
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
