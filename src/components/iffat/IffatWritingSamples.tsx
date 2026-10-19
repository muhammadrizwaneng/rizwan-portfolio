"use client";

import { motion } from "framer-motion";
import { ExternalLink, TrendingUp } from "lucide-react";
import { iffatWritingSamples } from "@/data/iffat-profile";

export function IffatWritingSamples() {
  return (
    <section
      id="writing"
      className="border-y border-[var(--border)] bg-[var(--surface)] px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 max-w-2xl">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
            Portfolio
          </p>
          <h2 className="iffat-display text-3xl font-semibold sm:text-4xl">
            Published writing samples
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
            Live client work with measurable SEO outcomes where available. Click any
            article to read the full piece on the client site.
          </p>
        </div>

        <div className="space-y-5">
          {iffatWritingSamples.map((sample, index) => (
            <motion.article
              key={sample.url}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="iffat-card rounded-3xl p-6 sm:p-7"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-[var(--accent-secondary)]">
                    {sample.client}
                  </p>
                  <h3 className="iffat-display mt-1 text-xl font-semibold sm:text-2xl">
                    {sample.title}
                  </h3>
                </div>
                {sample.googlePageOne ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[rgba(61,107,92,0.12)] px-3 py-1 text-xs font-semibold text-[var(--accent-secondary)]">
                    <TrendingUp size={14} />
                    Google page 1
                  </span>
                ) : null}
              </div>

              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                {sample.summary}
              </p>

              {sample.targetKeyword ? (
                <p className="mt-3 text-xs text-[var(--muted)]">
                  <span className="font-medium text-[var(--foreground)]">
                    Target keyword:
                  </span>{" "}
                  &ldquo;{sample.targetKeyword}&rdquo;
                </p>
              ) : null}

              <div className="mt-4 flex flex-wrap gap-2">
                {sample.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-2.5 py-1 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={sample.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Read live article
                <ExternalLink size={14} />
              </a>
            </motion.article>
          ))}
        </div>

        <p className="mt-8 text-sm text-[var(--muted)]">
          Additional articles and case studies can be listed here as your portfolio
          grows.
        </p>
      </div>
    </section>
  );
}
