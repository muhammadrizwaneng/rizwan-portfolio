"use client";

import { motion } from "framer-motion";
import { BookOpen, Feather, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { IffatHero } from "@/components/iffat/IffatHero";
import { IffatNavbar } from "@/components/iffat/IffatNavbar";
import {
  iffatEducation,
  iffatExperience,
  iffatProfile,
  iffatReference,
  iffatServices,
  iffatSkillGroups,
} from "@/data/iffat-profile";

const serviceIcons = [Feather, Search, BookOpen, Sparkles];

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
        {eyebrow}
      </p>
      <h2 className="iffat-display text-3xl font-semibold sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-3 text-base leading-relaxed text-[var(--muted)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default function IffatPortfolioPage() {
  return (
    <>
      <IffatNavbar />
      <main>
        <IffatHero />

        <section id="about" className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <SectionTitle
              eyebrow="About"
              title="Writer with an editorial mindset"
              description="Literature-trained, detail-oriented, and focused on content that reads naturally while supporting SEO goals."
            />
            <div className="grid gap-6 lg:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="iffat-card rounded-3xl p-6 lg:col-span-2"
              >
                <p className="text-base leading-relaxed text-[var(--muted)]">
                  {iffatProfile.summary}
                </p>
                <p className="mt-4 text-base leading-relaxed text-[var(--muted)]">
                  {iffatProfile.objective}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06 }}
                className="iffat-card rounded-3xl bg-[var(--surface-muted)] p-6"
              >
                <h3 className="iffat-display text-lg font-semibold">Process</h3>
                <ol className="mt-4 space-y-3 text-sm text-[var(--muted)]">
                  <li>
                    <span className="font-medium text-[var(--foreground)]">1. Research</span> — keywords, topic, competitors
                  </li>
                  <li>
                    <span className="font-medium text-[var(--foreground)]">2. Draft</span> — structure, headings, flow
                  </li>
                  <li>
                    <span className="font-medium text-[var(--foreground)]">3. Optimize</span> — on-page SEO elements
                  </li>
                  <li>
                    <span className="font-medium text-[var(--foreground)]">4. Polish</span> — edit, proofread, deliver
                  </li>
                </ol>
              </motion.div>
            </div>
          </div>
        </section>

        <section
          id="services"
          className="border-y border-[var(--border)] bg-[var(--surface-muted)]/60 px-4 py-16 sm:px-6 sm:py-20"
        >
          <div className="mx-auto max-w-5xl">
            <SectionTitle
              eyebrow="Services"
              title="What I can write for you"
              description="Flexible support for blogs, website copy, and research-backed content workflows."
            />
            <div className="grid gap-5 sm:grid-cols-2">
              {iffatServices.map((service, index) => {
                const Icon = serviceIcons[index] ?? Feather;
                return (
                  <motion.article
                    key={service.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="iffat-card rounded-3xl p-6"
                  >
                    <div className="mb-4 inline-flex rounded-xl bg-[var(--accent-soft)] p-3 text-[var(--accent)]">
                      <Icon size={20} />
                    </div>
                    <h3 className="iffat-display text-xl font-semibold">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                      {service.description}
                    </p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="experience" className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <SectionTitle
              eyebrow="Experience"
              title="Professional writing experience"
            />
            {iffatExperience.map((job) => (
              <article key={job.company} className="iffat-card rounded-3xl p-6 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="iffat-display text-2xl font-semibold">
                      {job.role}
                    </h3>
                    <p className="mt-1 text-[var(--accent)]">{job.company}</p>
                  </div>
                  <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--muted)]">
                    {job.period}
                  </span>
                </div>
                <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-[var(--muted)]">
                  {job.highlights.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-secondary)]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section
          id="skills"
          className="border-t border-[var(--border)] bg-[var(--surface)] px-4 py-16 sm:px-6 sm:py-20"
        >
          <div className="mx-auto max-w-5xl">
            <SectionTitle eyebrow="Skills" title="Skills matrix" />
            <div className="grid gap-5 md:grid-cols-2">
              {iffatSkillGroups.map((group, index) => (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                  className="iffat-card rounded-3xl p-5"
                >
                  <h3 className="font-semibold text-[var(--accent-secondary)]">
                    {group.title}
                  </h3>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-1 text-xs"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="education" className="px-4 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-5xl">
            <SectionTitle eyebrow="Education" title="Academic background" />
            <div className="grid gap-5 md:grid-cols-2">
              {iffatEducation.map((item) => (
                <article key={item.degree} className="iffat-card rounded-3xl p-6">
                  <h3 className="iffat-display text-xl font-semibold">
                    {item.degree}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--accent)]">{item.school}</p>
                  <p className="mt-1 text-xs text-[var(--muted)]">{item.period}</p>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                    {item.note}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="border-t border-[var(--border)] bg-[var(--surface-muted)]/70 px-4 py-16 sm:px-6 sm:py-20"
        >
          <div className="mx-auto max-w-5xl">
            <SectionTitle
              eyebrow="Contact"
              title="Let's work together"
              description="Available for content writing, SEO writing support, editing, and internship or freelance opportunities."
            />
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
              <div className="iffat-card rounded-3xl p-6 sm:p-7">
                <h3 className="iffat-display text-xl font-semibold">Get in touch</h3>
                <div className="mt-5 space-y-3 text-sm text-[var(--muted)]">
                  <p>
                    <span className="font-medium text-[var(--foreground)]">Email:</span>{" "}
                    <a
                      href={`mailto:${iffatProfile.email}`}
                      className="text-[var(--accent)] hover:underline"
                    >
                      {iffatProfile.email}
                    </a>
                  </p>
                  <p>
                    <span className="font-medium text-[var(--foreground)]">Phone:</span>{" "}
                    <a
                      href={`tel:${iffatProfile.phone.replace(/\s/g, "")}`}
                      className="hover:text-[var(--accent)]"
                    >
                      {iffatProfile.phoneDisplay}
                    </a>
                  </p>
                  <p>
                    <span className="font-medium text-[var(--foreground)]">Location:</span>{" "}
                    {iffatProfile.location}
                  </p>
                </div>
                <a
                  href={`mailto:${iffatProfile.email}?subject=Content%20writing%20inquiry`}
                  className="mt-6 inline-flex rounded-full bg-[var(--accent-secondary)] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Send email
                </a>
              </div>

              <div className="iffat-card rounded-3xl p-6 sm:p-7">
                <h3 className="iffat-display text-xl font-semibold">Reference</h3>
                <p className="mt-3 text-sm text-[var(--muted)]">
                  {iffatReference.name}
                  <br />
                  {iffatReference.role}
                </p>
                <p className="mt-4 text-sm text-[var(--muted)]">
                  <a
                    href={`mailto:${iffatReference.email}`}
                    className="text-[var(--accent)] hover:underline"
                  >
                    {iffatReference.email}
                  </a>
                  <br />
                  {iffatReference.phone}
                </p>
                <p className="mt-6 rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface-muted)] p-4 text-xs leading-relaxed text-[var(--muted)]">
                  Writing samples can be added here when available (Google Doc /
                  Medium / published URLs). Share links anytime and we&apos;ll update
                  this section.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--border)] px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-sm text-[var(--muted)] sm:flex-row">
          <p>© 2026 {iffatProfile.name}. Content writer portfolio.</p>
          <Link href="/" className="hover:text-[var(--accent)]">
            ← Muhammad Rizwan&apos;s portfolio
          </Link>
        </div>
      </footer>
    </>
  );
}
