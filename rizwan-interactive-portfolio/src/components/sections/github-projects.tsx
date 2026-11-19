"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Code2 } from "lucide-react";
import { SiGithub } from "react-icons/si";

import { config } from "@ix/data/config";
import { GITHUB_PROJECTS, GITHUB_REPOS_URL } from "@ix/data/github-projects";
import { cn } from "@ix/lib/utils";
import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";

const CARD =
  "rounded-2xl border border-slate-900/[0.07] bg-white p-5 text-neutral-700 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.35)] transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-slate-900/20 dark:border-white/10 dark:bg-[#131518] dark:[background-image:radial-gradient(120%_90%_at_100%_0%,rgba(249,115,22,0.08)_0%,transparent_55%)] dark:text-neutral-200 dark:shadow-[0_40px_70px_-40px_rgba(0,0,0,0.9)]";

const GithubProjectsSection = () => (
  <SectionWrapper
    id="github"
    className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 md:px-8 py-20"
  >
    <SectionHeader
      id="github"
      title="GitHub"
      desc="Open-source repos — web, mobile, Python APIs, and ML notebooks."
      className="static mb-10 md:mb-12 mt-0"
    />

    <div className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-900/10 bg-white/90 px-5 py-4 dark:border-white/10 dark:bg-[#131518]/90">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3"
      >
        <SiGithub className="size-8 text-neutral-900 dark:text-white" aria-hidden />
        <div>
          <p className="font-display text-lg font-bold text-neutral-900 dark:text-white">
            @{config.githubUsername}
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            39+ public repositories — MERN, React Native, FastAPI, Jupyter
          </p>
        </div>
      </motion.div>
      <Link
        href={GITHUB_REPOS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        All repositories
        <ArrowUpRight className="size-4" aria-hidden />
      </Link>
    </div>

    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {GITHUB_PROJECTS.map((repo, index) => (
        <motion.li
          key={repo.url}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.03 }}
        >
          <Link
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(CARD, "group block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400")}
          >
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-neutral-900 dark:text-white">
                {repo.name}
              </h3>
              <span className="shrink-0 rounded-full border border-slate-900/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-neutral-500 dark:border-white/15">
                {repo.language}
              </span>
            </div>
            {repo.statusLabel ? (
              <span className="mt-2 inline-flex rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-orange-700 dark:text-orange-300">
                {repo.statusLabel}
              </span>
            ) : null}
            <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
              {repo.description}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 dark:text-orange-400">
              <Code2 className="size-3.5" aria-hidden />
              View repo
              <ArrowUpRight
                className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </span>
          </Link>
        </motion.li>
      ))}
    </ul>
  </SectionWrapper>
);

export default GithubProjectsSection;