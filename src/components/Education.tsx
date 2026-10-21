"use client";

import { motion } from "framer-motion";
import { Award, GraduationCap } from "lucide-react";
import Image from "next/image";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { education } from "@/data/profile";

export function Education() {
  return (
    <Section id="education">
      <SectionHeading
        eyebrow="Education"
        title="Education & AI training"
        description="Degree background plus SoL-certified machine learning, deep learning, and NLP training."
      />

      <div className="grid gap-5 md:grid-cols-2">
        {education.map((item, index) => (
          <motion.div
            key={item.degree}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
            className={`glass rounded-3xl p-6 ${
              item.certificateImage ? "md:col-span-2" : ""
            }`}
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
              <div className={item.certificateImage ? "lg:max-w-md lg:shrink-0" : ""}>
                <div className="mb-4 inline-flex rounded-xl bg-violet/10 p-3 text-violet">
                  {item.certificateImage ? (
                    <Award size={20} />
                  ) : (
                    <GraduationCap size={20} />
                  )}
                </div>
                <h3 className="font-display text-lg font-semibold">{item.degree}</h3>
                <p className="mt-1 text-accent">{item.school}</p>
                <p className="mt-1 text-sm text-muted">
                  {item.location} · {item.period}
                </p>
                {item.note ? (
                  <p className="mt-4 text-sm leading-relaxed text-muted">{item.note}</p>
                ) : null}
              </div>

              {item.certificateImage ? (
                <a
                  href={item.certificateImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block flex-1 overflow-hidden rounded-2xl border border-border bg-background/50 transition hover:border-accent/40"
                >
                  <div className="relative aspect-[4/3] w-full max-h-72 sm:max-h-80">
                    <Image
                      src={item.certificateImage}
                      alt={item.certificateLabel ?? `${item.degree} certificate`}
                      fill
                      className="object-cover object-top transition duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 1024px) 100vw, 560px"
                    />
                  </div>
                  <p className="border-t border-border px-4 py-3 text-center text-sm font-medium text-accent group-hover:underline">
                    {item.certificateLabel ?? "View certificate"} (opens full size)
                  </p>
                </a>
              ) : null}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
