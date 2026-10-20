"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { skillGroups } from "@/data/profile";

const categoryStyles = [
  "from-cyan-500/10 to-transparent",
  "from-violet-500/10 to-transparent",
  "from-emerald-500/10 to-transparent",
  "from-amber-500/10 to-transparent",
];

export function Skills() {
  return (
    <Section id="skills">
        <SectionHeading
          eyebrow="Skills"
          title="Skills matrix"
          description="Languages, frontend, backend, and cloud tooling I use to ship production software."
        />

        <div className="grid gap-5 lg:grid-cols-2">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className={`glass relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br ${categoryStyles[index % categoryStyles.length]}`}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-lg font-semibold text-accent">
                  {group.title}
                </h3>
                <span className="text-xs text-muted">
                  {group.items.length} skills
                </span>
              </div>
              {"description" in group && group.description ? (
                <p className="mt-2 text-sm text-muted">{group.description}</p>
              ) : null}
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-border bg-background/50 px-3 py-1.5 text-xs font-medium text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
    </Section>
  );
}
