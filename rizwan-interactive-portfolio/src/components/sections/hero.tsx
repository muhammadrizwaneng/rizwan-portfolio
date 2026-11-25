import { cn } from "@ix/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, File, MapPin } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";

import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@ix/components/ui/tooltip";
import { usePreloader } from "../preloader";
import { BlurIn, BoxReveal } from "../reveal-animations";
import ScrollDownIcon from "../scroll-down-icon";
import { config } from "@ix/data/config";
import projects from "@ix/data/projects";
import { CERTIFICATES } from "@ix/data/certificates";
import { CAREER_START_YEAR, CURRENT_ROLE, shortCompany } from "@ix/lib/career";
import { useCurrentYear } from "@ix/hooks/use-current-year";
import { usePerfProfile } from "@ix/hooks/use-perf-profile";

import SectionWrapper from "../ui/section-wrapper";
import HeroShowcase from "./hero-showcase";
import BookCall from "../book-call";

// what the rotating line cycles through after "I build"
const BUILDS = [
  "secure backend systems",
  "cross-platform mobile apps",
  "enterprise SSO platforms",
  "AI-integrated products",
];
const ROTATE_MS = 2600;

const pad = (n: number) => String(n).padStart(2, "0");

const HeroSection = () => {
  const { isLoading } = usePreloader();

  return (
    <SectionWrapper id="hero" className={cn("relative w-full h-screen")}>
      {/* below xl the copy gets a wider share so it doesn't feel cramped */}
      <div className="grid md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] xl:grid-cols-2">
        <div
          className={cn(
            "h-[calc(100dvh-3rem)] md:h-[calc(100dvh-4rem)] z-[2]",
            "col-span-1",
            "flex w-full max-w-full flex-col justify-start md:justify-center items-center md:items-start",
            "px-4 pt-24 sm:pb-16 md:px-0 md:py-20 md:pl-12 md:pr-6 lg:py-24 lg:pl-16 lg:pr-8 xl:p-28",
            // big monitors: grow the gutter with the viewport so the copy doesn't float in a small corner
            "2xl:pl-[clamp(7rem,8vw,13rem)] 2xl:pr-0",
            // short laptop screens (e.g. 1366x768): trim vertical padding so nothing hides under the header
            "md:[@media(max-height:820px)]:pb-0 md:[@media(max-height:820px)]:pt-16"
          )}
        >
          {!isLoading && (
            <div className="flex flex-col items-center md:items-start">
              {CURRENT_ROLE && (
                <BlurIn delay={0.5}>
                  <StatusPill
                    company={shortCompany(CURRENT_ROLE.company)}
                    location={CURRENT_ROLE.location}
                  />
                </BlurIn>
              )}

              <BlurIn delay={0.7}>
                <p className="mt-6 cursor-default text-lg font-medium text-neutral-500 dark:text-neutral-400 md:text-xl 2xl:text-2xl">
                  Hi, I am
                </p>
              </BlurIn>

              <BlurIn delay={1}>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>
                    <h1
                      className={cn(
                        "leading-none text-transparent text-neutral-800 text-center md:text-left",
                        "font-bold text-[clamp(2.75rem,11vw,4.5rem)] md:text-7xl lg:text-8xl xl:text-9xl xl:[@media(max-height:820px)]:text-8xl md:-ml-[6px]",
                        // fluid on wide screens: ~170px at 2000px, ~210px at 2560px
                        "2xl:text-[clamp(8rem,8.4vw,14rem)]",
                        "cursor-default text-edge-outline font-display"
                      )}
                    >
                      {/* Last two words of author name fit the display size */}
                      {config.author.split(" ").at(-2)}
                      <br />
                      {config.author.split(" ").at(-1)}
                      <span className="text-orange-500">.</span>
                    </h1>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="dark:bg-white dark:text-black"
                  >
                    theres something waiting for you in devtools
                  </TooltipContent>
                </Tooltip>
              </BlurIn>

              <BlurIn delay={1.2}>
                <RotatingRole />
              </BlurIn>

              <BlurIn delay={1.4}>
                <p className="mt-3 hidden max-w-md text-base lg:max-w-lg 2xl:mt-5 2xl:max-w-xl 2xl:text-lg min-[1900px]:max-w-2xl min-[1900px]:text-xl leading-relaxed text-neutral-600 dark:text-neutral-400 sm:block">
                  Software engineer building secure backends, mobile apps, and
                  AI-assisted delivery with Node.js, Next.js, React Native, and
                  Python — plus AI-assisted development with Cursor and Claude Code.
                </p>
              </BlurIn>

              <HeroActions />

              <BlurIn delay={2.2}>
                <HeroStats />
              </BlurIn>
            </div>
          )}
        </div>
        {!isLoading && <HeroShowcase />}
      </div>
      <div className="absolute bottom-10 left-[50%] translate-x-[-50%]">
        <ScrollDownIcon />
      </div>
    </SectionWrapper>
  );
};

interface StatusPillProps {
  company: string;
  location: string;
}

const StatusPill = ({ company, location }: StatusPillProps) => (
  <span className="inline-flex items-center gap-2.5 rounded-full border border-slate-900/10 bg-white/80 py-1.5 pl-2.5 pr-4 text-sm 2xl:py-2 2xl:pl-3 2xl:pr-5 2xl:text-base text-neutral-700 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-neutral-300">
    <span className="relative flex size-2.5">
      <span className="absolute inset-0 rounded-full bg-orange-400 motion-safe:animate-ping" />
      <span className="relative size-2.5 rounded-full bg-orange-500" />
    </span>
    <span>
      Engineer at{" "}
      <span className="font-semibold text-neutral-900 dark:text-white">
        {company}
      </span>
    </span>
    <span
      aria-hidden
      className="hidden h-3.5 w-px bg-slate-900/15 dark:bg-white/15 sm:block"
    />
    <span className="hidden items-center gap-1 sm:flex">
      <MapPin aria-hidden className="size-3.5" />
      {location.split(",")[0]}
    </span>
  </span>
);

const RotatingRole = () => {
  const { reducedMotion } = usePerfProfile();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % BUILDS.length),
      ROTATE_MS
    );
    return () => window.clearInterval(id);
  }, [reducedMotion]);

  return (
    <p className="mt-5 flex flex-wrap items-baseline justify-center gap-x-2 text-xl font-medium text-neutral-600 dark:text-neutral-400 md:justify-start md:text-2xl 2xl:mt-7 2xl:text-3xl min-[1900px]:text-4xl">
      <span className="sr-only">I build {BUILDS.join(", ")}.</span>
      <span aria-hidden>I build</span>
      {/* every word sits in the same grid cell; invisible copies reserve the widest one so nothing shifts */}
      <span aria-hidden className="grid overflow-hidden">
        {BUILDS.map((word) => (
          <span
            key={word}
            className="invisible col-start-1 row-start-1 whitespace-nowrap font-semibold"
          >
            {word}
          </span>
        ))}
        <AnimatePresence initial={false}>
          <motion.span
            key={BUILDS[index]}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-110%", opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="col-start-1 row-start-1 whitespace-nowrap font-semibold text-orange-600 dark:text-orange-400 text-center md:text-left"
          >
            {BUILDS[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </p>
  );
};

// xl+: as wide as its buttons, not the copy column, so the row stays on one line
const HeroActions = () => (
  <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start xl:w-max 2xl:mt-10 2xl:gap-4 2xl:[&_button]:h-12 2xl:[&_button]:text-base 2xl:[&_button.size-11]:w-12">
    <BookCall />
    <BoxReveal delay={1.8}>
      <Link href="/attractive/resume">
        <Button className="flex h-11 items-center gap-2 rounded-full px-6">
          <File size={18} aria-hidden />
          Resume
        </Button>
      </Link>
    </BoxReveal>
    <Link href="#contact" className="group">
      <Button
        variant="outline"
        className="flex h-11 items-center gap-2 rounded-full px-6"
      >
        Hire Me
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
        />
      </Button>
    </Link>
    <Link
      href={config.social.github}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub profile (opens in a new tab)"
      className="cursor-can-hover"
    >
      <Button variant="outline" size="icon" className="size-11 rounded-full">
        <SiGithub size={20} aria-hidden />
      </Button>
    </Link>
    <Link
      href={config.social.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn profile (opens in a new tab)"
      className="cursor-can-hover"
    >
      <Button variant="outline" size="icon" className="size-11 rounded-full">
        <FaLinkedin size={20} aria-hidden />
      </Button>
    </Link>
  </div>
);

const HeroStats = () => {
  const currentYear = useCurrentYear();
  const stats = [
    {
      value: currentYear ? `${currentYear - CAREER_START_YEAR}+` : "—",
      label: "Years experience",
    },
    { value: pad(projects.length), label: "Projects shipped" },
    { value: pad(CERTIFICATES.length), label: "Certifications" },
  ];

  return (
    <dl className="mt-10 hidden items-center gap-6 border-t border-slate-900/10 pt-6 dark:border-white/10 sm:flex md:gap-8 2xl:mt-14 2xl:gap-12 2xl:pt-8">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-1">
          <dd className="font-display text-3xl 2xl:text-4xl min-[1900px]:text-5xl font-bold leading-none text-neutral-900 dark:text-white">
            {stat.value}
          </dd>
          <dt className="font-mono text-[10px] 2xl:text-xs uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
            {stat.label}
          </dt>
        </div>
      ))}
    </dl>
  );
};

export default HeroSection;
