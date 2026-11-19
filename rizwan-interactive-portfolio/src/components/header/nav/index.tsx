import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import styles from "./style.module.scss";
import { height, opacity } from "../anim";
import Body from "./body/body";
import Image from "./image/image";
import MotionToggle from "@/components/motion-toggle";

import { links } from "@/components/header/config";
import { config } from "@/data/config";
import { CURRENT_ROLE } from "@/lib/career";
import { cn } from "@/lib/utils";

interface IndexProps {
  setIsActive: (isActive: boolean) => void;
}

interface SelectedLinkState {
  isActive: boolean;
  index: number;
}

const Index: React.FC<IndexProps> = ({ setIsActive }) => {
  const [selectedLink, setSelectedLink] = useState<SelectedLinkState>({
    isActive: false,
    index: 0,
  });

  return (
    <motion.div
      variants={height}
      initial="initial"
      animate="enter"
      exit="exit"
      // Clicking the empty overlay area (anything that isn't a link/control)
      // closes the menu.
      onClick={() => setIsActive(false)}
      className={cn(styles.nav, "relative")}
    >
      {/* fills the viewport below the bar so no half-covered page peeks out underneath */}
      <div className="flex min-h-[calc(100dvh-4rem)] items-center justify-between gap-12 px-2 pb-20 pt-6 md:px-8 lg:px-12">
        <Body
          links={links}
          selectedLink={selectedLink}
          setSelectedLink={setSelectedLink}
          setIsActive={setIsActive}
        />

        {/* desktop: contact details by default, swapped for a page preview while a link is hovered */}
        <div className="relative hidden h-[60vh] w-[min(42vw,720px)] shrink-0 lg:block">
          <motion.div
            variants={opacity}
            initial="initial"
            animate={selectedLink.isActive ? "closed" : "open"}
            className="absolute inset-0 flex flex-col justify-center"
          >
            <InfoPanel />
          </motion.div>
          <Image
            src={links[selectedLink.index].thumbnail}
            title={links[selectedLink.index].title}
            isActive={selectedLink.isActive}
          />
        </div>
      </div>
      {/* Subtle reduced-motion control, tucked into the bottom-right of the menu.
          Stop propagation so toggling motion doesn't also close the menu. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        onClick={(e) => e.stopPropagation()}
        className="absolute bottom-4 right-4 md:right-8 lg:right-12"
      >
        <MotionToggle />
      </motion.div>
    </motion.div>
  );
};

const InfoPanel = () => (
  <div
    className="ml-auto flex w-full max-w-md flex-col gap-8"
    onClick={(e) => e.stopPropagation()}
  >
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-orange-600 dark:text-orange-400">
        Get in touch
      </p>
      <a
        href={`mailto:${config.email}`}
        className="group mt-3 flex items-center gap-2 font-display text-2xl font-bold text-foreground transition-colors hover:text-orange-600 dark:hover:text-orange-400 xl:text-3xl"
      >
        <span className="truncate">{config.email}</span>
        <ArrowUpRight
          aria-hidden
          className="size-6 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </a>
    </div>

    {CURRENT_ROLE && (
      <p className="flex items-center gap-2 text-base text-muted-foreground">
        <MapPin aria-hidden className="size-4" />
        Based in {CURRENT_ROLE.location}
      </p>
    )}

    <div className="flex gap-3 border-t border-slate-900/10 pt-8 dark:border-white/10">
      <SocialLink href={config.social.github} label="GitHub">
        <SiGithub aria-hidden className="size-4" />
      </SocialLink>
      <SocialLink href={config.social.linkedin} label="LinkedIn">
        <FaLinkedin aria-hidden className="size-4" />
      </SocialLink>
    </div>
  </div>
);

const SocialLink = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`${label} (opens in a new tab)`}
    className="flex items-center gap-2 rounded-full border border-slate-900/10 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-orange-500/50 hover:bg-orange-500/10 dark:border-white/15"
  >
    {children}
    {label}
  </a>
);

export default Index;
