"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { education } from "@/data/profile";

export function Education() {
  return (
    <section id="education" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Education" title="Academic background" />

        <div className="grid gap-5 md:grid-cols-2">
          {education.map((item, index) => (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="glass rounded-3xl p-6"
            >
              <div className="mb-4 inline-flex rounded-xl bg-violet/10 p-3 text-violet">
                <GraduationCap size={20} />
              </div>
              <h3 className="font-display text-lg font-semibold">{item.degree}</h3>
              <p className="mt-1 text-accent">{item.school}</p>
              <p className="mt-1 text-sm text-muted">
                {item.location} · {item.period}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
