import { profile } from "@/data/profile";

export function Footer() {
  const year = 2026;

  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted sm:flex-row sm:px-6 lg:px-8">
        <p>
          © {year} {profile.name}. Crafted with Next.js for Vercel.
        </p>
        <div className="flex gap-5">
          <a href={profile.github} className="hover:text-accent" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={profile.linkedin} className="hover:text-accent" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className="hover:text-accent">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
