"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { ssoCaseStudy } from "@/data/sso-case-study";

export function SsoCaseStudy() {
  return (
    <Section id="case-study" className="border-y border-border bg-surface/30">
      <SectionHeading
        eyebrow="Case study"
        title="Enterprise SSO at scale"
        description="Flagship identity platform work — problem, approach, and measurable outcomes."
      />

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass overflow-hidden rounded-3xl"
      >
        <div className="border-b border-border bg-accent/5 px-6 py-5 sm:px-8 sm:py-6">
          <div className="flex flex-wrap items-start gap-4">
            <div className="rounded-xl bg-accent/15 p-3 text-accent">
              <Shield size={22} />
            </div>
            <div>
              <h3 className="font-display text-2xl font-semibold">
                {ssoCaseStudy.title}
              </h3>
              <p className="mt-1 text-sm text-accent">
                {ssoCaseStudy.company} · {ssoCaseStudy.role}
              </p>
              <p className="mt-1 text-xs text-muted">{ssoCaseStudy.timeframe}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-accent">
                Problem
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                {ssoCaseStudy.problem}
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-accent">
                What I built
              </h4>
              <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-muted">
                {ssoCaseStudy.approach.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              {ssoCaseStudy.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {ssoCaseStudy.outcomes.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-2xl border border-border bg-background/40 p-4 sm:p-5"
              >
                <p className="font-display text-2xl font-bold text-accent sm:text-3xl">
                  {item.value}
                </p>
                <p className="mt-2 text-xs leading-snug text-muted sm:text-sm">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.article>
    </Section>
  );
}
