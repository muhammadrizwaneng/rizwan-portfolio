"use client";
import React, { useState } from "react";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogTrigger,
} from "../ui/responsive-dialog";
import { FloatingDock } from "../ui/floating-dock";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import { motion } from "motion/react";

import projects, { Project } from "@ix/data/projects";
import { SectionHeader } from "./section-header";
import {
  STACK_PEEK_PX,
  STICKY_TOP_PX,
  useStackedCards,
} from "@ix/hooks/use-stacked-cards";

import SectionWrapper from "../ui/section-wrapper";
import ScrollingPreview from "../scrolling-preview";

const hasLink = (url?: string): url is string => Boolean(url && url !== "#");
const displayUrl = (url: string) =>
  url.replace(/^https?:\/\//, "").replace(/\/$/, "");
const pad = (n: number) => String(n).padStart(2, "0");
const MAX_PEEK_STEPS = 4;

// one accent per card so the stack doesn't read as five copies of the same block
const ACCENTS = ["#fb923c", "#38bdf8", "#fbbf24", "#a78bfa", "#fb7185"] as const;
const accentFor = (index: number) => ACCENTS[index % ACCENTS.length];
// deeper twins of ACCENTS so labels stay readable on the white light-mode card
const ACCENT_INKS = ["#c2410c", "#0284c7", "#b45309", "#7c3aed", "#e11d48"] as const;
const accentInkFor = (index: number) => ACCENT_INKS[index % ACCENT_INKS.length];

const ProjectsSection = () => {
  const cardRefs = useStackedCards(projects.length);

  return (
    <SectionWrapper id="projects" className="max-w-6xl 2xl:max-w-7xl mx-auto md:min-h-[130vh] px-4 md:px-8 py-20">
      {/* static (not sticky): the stacked cards would otherwise slide over the heading */}
      <SectionHeader
        id="projects"
        title="Projects"
        desc="Things I've built and shipped."
        className="static mb-12 md:mb-16 mt-0"
      />
      {/* cards are siblings in ONE container so every sticky card stays pinned while later ones slide over */}
      {/* phones: compact two-up grid; sm+: sticky stacked cards */}
      <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-col sm:gap-9">
        {projects.map((project, index) => (
          <article
            key={project.id}
            ref={(node) => {
              cardRefs.current[index] = node;
            }}
            // only the first few cards step down; later ones stick on the last line so a long stack stays on screen
            style={{ top: STICKY_TOP_PX + Math.min(index, MAX_PEEK_STEPS) * STACK_PEEK_PX }}
            className="group/card relative sm:sticky origin-top overflow-hidden will-change-[transform,filter] rounded-[28px] max-sm:rounded-[18px] border border-slate-900/[0.07] bg-white p-3 max-sm:p-1.5 text-neutral-700 shadow-[0_-10px_40px_-24px_rgba(15,23,42,0.18),0_30px_60px_-35px_rgba(15,23,42,0.35)] dark:border-white/10 dark:card-surface dark:text-neutral-200 dark:shadow-[0_-10px_40px_-20px_rgba(0,0,0,0.6),0_40px_70px_-40px_rgba(0,0,0,0.9)]"
          >
            <ProjectCard project={project} index={index} />
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const accent = accentFor(index);

  return (
    <ResponsiveDialog>
      {/* accent glow behind the copy, brightens on hover */}
      <span
        aria-hidden
        style={{ background: accent }}
        className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full opacity-[0.10] blur-3xl transition-opacity duration-700 group-hover/card:opacity-20 dark:opacity-[0.12] dark:group-hover/card:opacity-25"
      />
      {/* oversized ghost index fills the quiet corner of the copy column */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-10 right-4 max-sm:hidden select-none font-display text-[150px] md:text-[220px] font-bold leading-none text-neutral-900/[0.035] dark:text-white/[0.035]"
      >
        {pad(index + 1)}
      </span>

      <div className="relative grid grid-cols-1 md:grid-cols-[1.15fr_1fr] gap-6 max-sm:gap-2 md:gap-10">
        {/* tilted preview; tall screenshots pan on hover, click opens the case study */}
        <ResponsiveDialogTrigger
          aria-label={`Open ${project.title} details`}
          className="relative block w-full bg-transparent p-0 text-left"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
        >
          <div className="flex h-full w-full flex-col overflow-hidden rounded-[18px] max-sm:rounded-[12px] border border-slate-900/10 bg-slate-100 shadow-[0_30px_60px_-30px_rgba(15,23,42,0.45)] dark:border-white/10 dark:bg-[#16181b] dark:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)] transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:[transform:perspective(1100px)_rotateY(-7deg)_rotate(0.8deg)] md:group-hover/card:[transform:perspective(1100px)_rotateY(0deg)]">
            <BrowserBar url={project.live} />
            <div className="relative aspect-video max-sm:aspect-[4/3] max-sm:[--sp-inset:6px] md:aspect-auto md:min-h-[320px] 2xl:min-h-[420px] flex-1">
              <ScrollingPreview
                src={project.src}
                alt={project.title}
                bg={project.bg}
                isHovered={isHovered}
              />
            </div>
          </div>
        </ResponsiveDialogTrigger>

        <ProjectCopy project={project} index={index} accent={accent} />
      </div>

      <ProjectDialogContent project={project} />
    </ResponsiveDialog>
  );
};

// fake browser chrome so each screenshot reads as a real, live site
const BrowserBar = ({ url }: { url: string }) => (
  <div className="flex shrink-0 items-center gap-3 max-sm:gap-1.5 border-b border-slate-900/10 bg-slate-50 px-4 py-2.5 max-sm:px-2 max-sm:py-1.5 max-sm:[&>span:last-child]:hidden dark:border-white/10 dark:bg-[#0f1113]">
    <span aria-hidden className="flex gap-1.5">
      <span className="size-2.5 rounded-full bg-[#ff5f57]" />
      <span className="size-2.5 rounded-full bg-[#febc2e]" />
      <span className="size-2.5 rounded-full bg-[#28c840]" />
    </span>
    <span className="flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-md bg-slate-900/[0.05] px-3 py-1 font-mono text-[11px] text-neutral-500 dark:bg-white/5 dark:text-neutral-400">
      <Lock aria-hidden className="size-3 shrink-0" />
      <span className="truncate">
        {hasLink(url) ? displayUrl(url) : "private build"}
      </span>
    </span>
  </div>
);

interface ProjectCopyProps {
  project: Project;
  index: number;
  accent: string;
}

const ProjectCopy = ({ project, index, accent }: ProjectCopyProps) => {
  const skills = [...project.skills.frontend, ...project.skills.backend].filter(
    (skill, index, list) =>
      list.findIndex((s) => s.title === skill.title) === index
  );
  const ink = accentInkFor(index);

  return (
    <div className="flex flex-col gap-4 max-sm:gap-1.5 px-3 max-sm:px-1.5 pb-4 max-sm:pb-1.5 md:py-6 md:pl-0 md:pr-6">
      <div
        className="flex items-center gap-3 font-mono text-[11px] max-sm:text-[8px] uppercase tracking-[0.25em] max-sm:tracking-[0.12em]"
        style={{ "--accent": accent, "--accent-ink": ink } as React.CSSProperties}
      >
        <span aria-hidden className="h-px w-6 max-sm:hidden bg-[var(--accent-ink)] dark:bg-[var(--accent)]" />
        <span className="truncate text-[var(--accent-ink)] dark:text-[var(--accent)]">{project.category}</span>
        <span className="max-sm:hidden ml-auto shrink-0 whitespace-nowrap text-neutral-500">
          {pad(index + 1)} / {pad(projects.length)}
        </span>
      </div>

      <h3 className="text-4xl max-sm:text-base md:text-5xl 2xl:text-6xl font-bold leading-[1.02] tracking-tight text-neutral-900 dark:text-white">
        {project.title}
      </h3>
      <p className="max-w-md 2xl:max-w-lg text-base max-sm:text-[11px] max-sm:leading-snug max-sm:line-clamp-2 2xl:text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
        {project.summary}
      </p>

      <div className="mt-auto pt-2 max-sm:hidden">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">
          Built with
        </p>
        <ul className="flex flex-wrap gap-2">
          {skills.map((skill, skillIndex) => (
            <li
              key={`${project.title}-${skill.title}-${skillIndex}`}
              className="rounded-full border border-slate-900/10 bg-slate-50 px-3 py-1 text-xs 2xl:px-3.5 2xl:py-1.5 2xl:text-sm text-neutral-700 transition-colors hover:border-slate-900/30 dark:border-white/10 dark:bg-white/[0.04] dark:text-neutral-200 dark:hover:border-white/30"
            >
              {skill.title}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap items-center gap-3 border-t border-slate-900/10 pt-5 max-sm:mt-auto max-sm:pt-2 dark:border-white/10">
        <ResponsiveDialogTrigger
          style={{ background: accent }}
          className="group/btn inline-flex items-center gap-2 rounded-full px-5 py-2.5 max-sm:w-full max-sm:justify-center max-sm:px-2 max-sm:py-1.5 max-sm:text-[11px] text-sm font-semibold text-[#1a0c02] transition-[filter] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <span className="max-sm:hidden">View case study</span>
          <span className="sm:hidden">Details</span>
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
          />
        </ResponsiveDialogTrigger>
        {hasLink(project.live) && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${displayUrl(project.live)} (opens in a new tab)`}
            className="group/link max-sm:hidden inline-flex items-center gap-1.5 rounded-full border border-slate-900/15 px-4 py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:border-slate-900/40 hover:bg-slate-900/5 dark:border-white/15 dark:text-white dark:hover:border-white/40 dark:hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Live site
            <ArrowUpRight
              aria-hidden
              className="size-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
            />
          </a>
        )}
        {"kaggle" in project && hasLink(project.kaggle) && (
          <a
            href={project.kaggle}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link max-sm:hidden inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 px-4 py-2.5 text-sm font-semibold text-sky-700 transition-colors hover:border-sky-500/60 hover:bg-sky-500/10 dark:text-sky-300"
          >
            Kaggle
            <ArrowUpRight aria-hidden className="size-4" />
          </a>
        )}
        {"kaggle" in project && hasLink(project.kaggle) && (
          <a
            href={project.kaggle}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link max-sm:hidden inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 px-4 py-2.5 text-sm font-semibold text-sky-700 transition-colors hover:border-sky-500/60 hover:bg-sky-500/10 dark:text-sky-300"
          >
            Kaggle
            <ArrowUpRight aria-hidden className="size-4" />
          </a>
        )}
      </div>
    </div>
  );
};

const ProjectDialogContent = ({ project }: { project: Project }) => (
  <ResponsiveDialogContent className="md:max-w-4xl md:h-[85vh] md:!flex md:flex-col md:overflow-hidden md:p-0 md:gap-0">
    {/* Sticky header */}
    <div className="shrink-0 border-b border-border bg-background/80 backdrop-blur-sm px-8 py-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <h4 className="font-display text-xl md:text-2xl font-bold text-foreground tracking-tight truncate">
            {project.title}
          </h4>
          <span className="shrink-0 text-[11px] uppercase tracking-widest text-muted-foreground border border-border rounded-full px-3 py-0.5">
            {project.category}
          </span>
        </div>
        <div className="shrink-0 flex items-center gap-4">
          {hasLink(project.github) && (
            <Link
              href={project.github}
              target="_blank"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
            >
              GitHub
            </Link>
          )}
          {"kaggle" in project && hasLink(project.kaggle) && (
            <Link
              href={project.kaggle!}
              target="_blank"
              className="text-xs text-sky-600 hover:text-sky-500 transition-colors underline underline-offset-2"
            >
              Kaggle
            </Link>
          )}
          {hasLink(project.live) && (
            <Link href={project.live} target="_blank">
              <button className="group flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-4 py-1.5 rounded-full hover:bg-primary/80 transition-colors">
                Visit
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>

    {/* Scrollable content */}
    <ScrollArea className="flex-1" type="always" data-lenis-prevent>
      <div className="px-8 py-8">
        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col md:flex-row gap-6 md:gap-10 mb-10"
        >
          {project.skills.frontend?.length > 0 && (
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                Frontend
              </span>
              <FloatingDock items={project.skills.frontend} />
            </div>
          )}
          {project.skills.backend?.length > 0 && (
            <div className="flex flex-col items-center md:items-start gap-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-medium">
                Backend
              </span>
              <FloatingDock items={project.skills.backend} />
            </div>
          )}
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-10" />

        {/* Project content */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {project.content}
        </motion.div>
      </div>
    </ScrollArea>
  </ResponsiveDialogContent>
);

export default ProjectsSection;
