import { EXPERIENCE, type Experience } from "@/data/constants";

export const PRESENT = "Present";

export const isCurrentRole = (exp: Experience): boolean =>
  exp.periods.some((p) => p.end === PRESENT);

// periods read "Nov 2024" or "2024"; only the year matters here
const yearOf = (value: string): number =>
  Number.parseInt(value.match(/\d{4}/)?.[0] ?? "", 10);

export const roleStartYear = (exp: Experience): number =>
  Math.min(...exp.periods.map((p) => yearOf(p.start)));

export const CAREER_START_YEAR = Math.min(...EXPERIENCE.map(roleStartYear));

// prefer the full-time current job for the hero pill; a freelance gig shouldn't replace it
export const CURRENT_ROLE: Experience | undefined =
  EXPERIENCE.find((exp) => isCurrentRole(exp) && exp.employment === "Full-time") ??
  EXPERIENCE.find(isCurrentRole);

// "SeeBiz Pvt. Ltd." -> "SeeBiz" so it fits stats and pills on one line
export const shortCompany = (name: string): string =>
  name.replace(/\s+(pvt\.?|private|ltd\.?|limited|llc|inc\.?)(\s+.*)?$/i, "");
