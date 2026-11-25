"use client";

import { motion } from "framer-motion";
import { Award, GraduationCap } from "lucide-react";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { certifications, education } from "@/data/profile";

export function Education() {
  return (
    <Section id="education">
      <SectionHeading
        eyebrow="Education"
        title="Education & training"
        description="Degree background plus instructor-led AI / ML courses."
      />

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
            {item.note ? (
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {item.note}
              </p>
            ) : null}
          </motion.div>
        ))}
        {certifications.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (education.length + index) * 0.06 }}
            className="glass rounded-3xl p-6"
          >
            <div className="mb-4 inline-flex rounded-xl bg-accent-soft p-3 text-accent">
              <Award size={20} />
            </div>
            <h3 className="font-display text-lg font-semibold">{item.title}</h3>
            <p className="mt-1 text-accent">{item.issuer}</p>
            <p className="mt-1 text-sm text-muted">{item.period}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">{item.note}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
