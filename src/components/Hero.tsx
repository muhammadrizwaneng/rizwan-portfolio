"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown, Code2, Link2, Mail } from "lucide-react";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 sm:pt-32 sm:pb-28">
      <div className="glow-orb -left-24 top-10 h-72 w-72 bg-cyan-500/20" />
      <div className="glow-orb -right-16 top-32 h-80 w-80 bg-violet-500/20" />
      <div className="grid-bg absolute inset-0 opacity-40" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 text-sm text-muted"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Available for full-stack & mobile roles · {profile.location}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
          >
            <p className="mb-2 text-lg font-medium text-muted sm:text-xl">
              Hi, I&apos;m
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              <span className="text-gradient">{profile.name}</span>
            </h1>
            <p className="mt-3 font-display text-2xl font-semibold text-foreground/90 sm:text-3xl">
              {profile.title}
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            {profile.tagline}. I build secure backends, polished mobile apps, and
            AI-powered products that scale to thousands of users.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#projects"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background shadow-lg shadow-cyan-500/20 transition hover:brightness-110"
            >
              View my work
            </a>
            <a
              href="#contact"
              className="rounded-full border border-border bg-surface/50 px-6 py-3 text-sm font-semibold text-foreground transition hover:border-accent/40 hover:text-accent"
            >
              Get in touch
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-10 flex flex-wrap items-center gap-4 text-sm text-muted"
          >
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition hover:text-accent"
            >
              <Code2 size={18} /> GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition hover:text-accent"
            >
              <Link2 size={18} /> LinkedIn
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 transition hover:text-accent"
            >
              <Mail size={18} /> Email
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-accent/40 via-transparent to-violet/40 blur-xl" />
          <div className="glass relative overflow-hidden rounded-3xl p-6">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl ring-2 ring-accent/30">
                <Image
                  src={profile.avatar}
                  alt={`${profile.name}, Full Stack Software Engineer`}
                  width={80}
                  height={80}
                  sizes="80px"
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              <div>
                <p className="font-display text-xl font-bold">{profile.name}</p>
                <p className="text-sm text-muted">{profile.title}</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {profile.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-border bg-background/40 p-4"
                >
                  <p className="font-display text-2xl font-bold text-accent">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs leading-snug text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-6 rounded-2xl border border-dashed border-border bg-background/30 p-4 text-sm leading-relaxed text-muted">
              Enterprise SSO · Elasticsearch · React Native · FastAPI · OpenAI
              integrations
            </p>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="relative mx-auto mt-14 flex w-fit flex-col items-center gap-2 text-xs uppercase tracking-widest text-muted"
        aria-label="Scroll to about section"
      >
        Scroll
        <ArrowDown size={16} className="animate-bounce text-accent" />
      </motion.a>
    </section>
  );
}
