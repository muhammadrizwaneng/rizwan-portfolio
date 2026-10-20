"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { education } from "@/data/profile";

export function Education() {
  return (
    <Section id="education">
        <SectionHeading
          eyebrow="Education"
          title="Education & AI training"
          description="Degree background plus structured machine learning, deep learning, and NLP coursework."
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
              {"note" in item && item.note ? (
                <p className="mt-4 text-sm leading-relaxed text-muted">{item.note}</p>
              ) : null}
            </motion.div>
          ))}
        </div>
    </Section>
  );
}
