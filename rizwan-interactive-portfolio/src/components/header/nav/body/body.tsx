import { motion } from "motion/react";
import Link from "next/link";
import { blur, translate } from "../../anim";
import { Link as LinkType } from "@/types";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import FunnyThemeToggle from "@/components/theme/funny-theme-toggle";

interface SelectedLink {
  isActive: boolean;
  index: number;
}

interface BodyProps {
  links: LinkType[];
  selectedLink: SelectedLink;
  setSelectedLink: (selectedLink: SelectedLink) => void;
  setIsActive: (isActive: boolean) => void;
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function Body({
  links,
  selectedLink,
  setSelectedLink,
  setIsActive,
}: BodyProps) {
  const params = useParams();
  const [currentHref, setCurrentHref] = useState("/");
  useEffect(() => {
    if (typeof window === "undefined") return;
    const { pathname, hash } = window.location;
    setCurrentHref(pathname + hash);
  }, [params]);

  const getChars = (word: string) =>
    word.split("").map((char, i) => (
      <motion.span
        className="pointer-events-none"
        custom={[i * 0.02, (word.length - i) * 0.01]}
        variants={translate}
        initial="initial"
        animate="enter"
        exit="exit"
        key={char + i}
      >
        {char}
      </motion.span>
    ));

  return (
    <div className="flex flex-col items-start">
      <FunnyThemeToggle className="mb-4 flex size-6 md:hidden" />
      {links.map((link, index) => {
        const { title, href, target } = link;
        const current = currentHref === href;

        return (
          <Link
            key={`l_${index}`}
            href={href}
            target={target}
            // no `cursor-can-hover`: the custom cursor blob would cover the big link text
            className="group block rounded-lg"
            onClick={() => setIsActive(false)}
            onMouseOver={() => setSelectedLink({ isActive: true, index })}
            onMouseLeave={() => setSelectedLink({ isActive: false, index })}
            onFocus={() => setSelectedLink({ isActive: true, index })}
            onBlur={() => setSelectedLink({ isActive: false, index })}
          >
            <motion.span
              className="flex items-start gap-3 py-0.5 md:gap-5 md:py-1"
              variants={blur}
              animate={
                selectedLink.isActive && selectedLink.index !== index
                  ? "open"
                  : "closed"
              }
            >
              <span
                className={cn(
                  "mt-[0.6em] w-6 font-mono text-[11px] tabular-nums md:mt-[1.1em] md:w-8 md:text-sm",
                  current ? "text-orange-600 dark:text-orange-400" : "text-muted-foreground"
                )}
              >
                {pad(index + 1)}
              </span>
              <span
                className={cn(
                  "flex overflow-hidden font-display font-extrabold uppercase leading-[0.95] tracking-tight transition-colors duration-300",
                  // fits all links in one viewport: bounded by both width and height
                  "text-[clamp(2.5rem,min(5.5vw,8.5vh),7.5rem)]",
                  "group-hover:text-orange-600 dark:group-hover:text-orange-400",
                  current ? "text-foreground" : "text-foreground/80"
                )}
              >
                {getChars(title)}
              </span>
              {current && (
                <span
                  aria-hidden
                  className="mt-[0.9em] size-2.5 shrink-0 rounded-full bg-orange-500 md:mt-[1.6em] md:size-3"
                />
              )}
            </motion.span>
          </Link>
        );
      })}
    </div>
  );
}
