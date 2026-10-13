"use client";

import { motion } from "framer-motion";
import { Code2, ExternalLink, Globe } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { featuredProjects, githubProjects, profile } from "@/data/profile";

export function Projects() {
  return (
    <section id="projects" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Projects"
          title="Featured work & open source"
          description="Production systems, mobile apps, and GitHub projects across MERN, AWS, and AI stacks."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="group glass flex h-full flex-col rounded-3xl p-6 transition hover:border-accent/30 hover:shadow-lg hover:shadow-cyan-500/5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-accent">
                    Featured
                  </p>
                  <h3 className="mt-1 font-display text-xl font-semibold">
                    {project.name}
                  </h3>
                </div>
              </div>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                {project.summary}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-accent/20 bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-4">
                {project.demo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-background transition hover:brightness-110"
                  >
                    <Globe size={14} />
                    Live demo
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-border px-4 py-2 text-xs text-muted">
                    <Globe size={14} />
                    Demo on request
                  </span>
                )}
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground transition hover:border-accent/40 hover:text-accent"
                  >
                    <Code2 size={14} />
                    GitHub
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-xs text-muted">
                    <Code2 size={14} />
                    Private / internal
                  </span>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-14">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl font-semibold">On GitHub</h3>
              <p className="mt-1 text-sm text-muted">
                APIs, ML notebooks, and Next.js experiments.
              </p>
            </div>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
            >
              View all repositories
              <ExternalLink size={14} />
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {githubProjects.map((repo, index) => (
              <motion.a
                key={repo.url}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="glass block rounded-2xl p-5 transition hover:border-violet/40 hover:bg-surface-elevated/80"
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-medium text-foreground">{repo.name}</h4>
                  <span className="rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted">
                    {repo.language}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted">{repo.description}</p>
                <p className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent">
                  View repo <ExternalLink size={12} />
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
