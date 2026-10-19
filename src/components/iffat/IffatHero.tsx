"use client";

import { motion } from "framer-motion";
import { ArrowDown, Mail, MapPin, Phone } from "lucide-react";
import { iffatProfile } from "@/data/iffat-profile";

export function IffatHero() {
  const initials = iffatProfile.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <section className="relative overflow-hidden px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16">
      <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-[var(--accent-soft)] blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-[rgba(61,107,92,0.12)] blur-3xl" />

      <div className="relative mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[var(--accent-secondary)]"
          >
            Content writer · Lahore
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="iffat-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-[3.25rem]"
          >
            {iffatProfile.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-xl text-[var(--accent)] sm:text-2xl"
          >
            {iffatProfile.title}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg"
          >
            {iffatProfile.headline}. I turn research and keywords into readable,
            polished content that supports search visibility and brand trust.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#contact"
              className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Hire me
            </a>
            <a
              href="/iffat-zahra-cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-semibold transition hover:border-[var(--accent)]/40"
            >
              Download CV
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.12 }}
          className="iffat-card rounded-3xl p-6 sm:p-7"
        >
          <div className="iffat-accent-line mb-6 h-1 w-16 rounded-full" />
          <div className="flex items-center gap-4">
            <div className="iffat-display flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--surface-muted)] text-2xl font-semibold text-[var(--accent)]">
              {initials}
            </div>
            <div>
              <p className="font-semibold">{iffatProfile.name}</p>
              <p className="text-sm text-[var(--muted)]">{iffatProfile.title}</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {iffatProfile.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl bg-[var(--surface-muted)] px-4 py-3"
              >
                <p className="iffat-display text-xl font-semibold text-[var(--accent-secondary)]">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-[var(--muted)]">{stat.label}</p>
              </div>
            ))}
          </div>

          <ul className="mt-6 space-y-2.5 text-sm text-[var(--muted)]">
            <li className="flex items-center gap-2">
              <Mail size={15} className="text-[var(--accent)]" />
              {iffatProfile.email}
            </li>
            <li className="flex items-center gap-2">
              <Phone size={15} className="text-[var(--accent)]" />
              {iffatProfile.phoneDisplay}
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={15} className="text-[var(--accent)]" />
              {iffatProfile.location}
            </li>
          </ul>
        </motion.div>
      </div>

      <a
        href="#about"
        className="mx-auto mt-12 flex w-fit flex-col items-center gap-1 text-xs uppercase tracking-widest text-[var(--muted)]"
      >
        Explore
        <ArrowDown size={14} className="animate-bounce" />
      </a>
    </section>
  );
}
