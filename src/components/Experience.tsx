"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { experience } from "@/data/profile";

export function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Experience"
          title="Professional journey"
          description="4+ years at SeeBiz delivering enterprise platforms and mobile products."
        />

        <div className="relative space-y-8 before:absolute before:inset-y-2 before:left-[17px] before:w-px before:bg-border sm:before:left-[21px]">
          {experience.map((job, index) => (
            <motion.article
              key={`${job.role}-${job.period}`}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="relative pl-12 sm:pl-14"
            >
              <div className="absolute left-0 top-1 flex h-9 w-9 items-center justify-center rounded-full border border-accent/30 bg-surface text-accent sm:h-10 sm:w-10">
                <Briefcase size={16} />
              </div>

              <div className="glass rounded-3xl p-6 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl font-semibold">
                      {job.role}
                    </h3>
                    <p className="mt-1 text-accent">
                      {job.company} · {job.location}
                    </p>
                  </div>
                  <span className="rounded-full border border-border px-3 py-1 text-xs text-muted">
                    {job.period}
                  </span>
                </div>

                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted">
                  {job.highlights.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
