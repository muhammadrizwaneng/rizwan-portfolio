"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/SectionHeading";
import { profile } from "@/data/profile";

export function About() {
  return (
    <section id="about" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About"
          title="Building products that feel fast, secure, and human"
          description="From enterprise identity platforms to AI-assisted marketplaces, I focus on reliable APIs, thoughtful mobile UX, and measurable impact."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-6 lg:col-span-2"
          >
            <p className="text-lg leading-relaxed text-muted">{profile.summary}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="glass rounded-3xl p-6"
          >
            <h3 className="font-display text-lg font-semibold">Focus areas</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li className="flex gap-2">
                <span className="text-accent">▹</span> Authentication, SSO & MFA
              </li>
              <li className="flex gap-2">
                <span className="text-accent">▹</span> React Native & cross-platform apps
              </li>
              <li className="flex gap-2">
                <span className="text-accent">▹</span> Search, APIs & serverless backends
              </li>
              <li className="flex gap-2">
                <span className="text-accent">▹</span> LLM integrations & ML pipelines
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
