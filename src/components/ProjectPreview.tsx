"use client";

type ProjectPreviewProps = {
  name: string;
  isMobile: boolean;
};

export function ProjectPreview({ name, isMobile }: ProjectPreviewProps) {
  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="project-preview relative mb-5 aspect-[16/10] overflow-hidden rounded-2xl border border-border"
      aria-hidden
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/25 via-violet-500/15 to-background" />
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/20 blur-2xl" />

      {isMobile ? (
        <div className="absolute left-1/2 top-1/2 h-[76%] w-[32%] min-w-[5.5rem] -translate-x-1/2 -translate-y-1/2">
          <div className="flex h-full flex-col rounded-[1.35rem] border-2 border-white/15 bg-gradient-to-b from-surface-elevated to-background p-2 shadow-2xl shadow-black/40">
            <div className="mx-auto mt-1.5 h-1 w-9 rounded-full bg-white/25" />
            <div className="mt-3 flex flex-1 flex-col items-center justify-center rounded-xl bg-accent/10 px-2">
              <span className="font-display text-2xl font-bold text-accent">
                {initials}
              </span>
              <span className="mt-1 text-center text-[10px] font-medium uppercase tracking-wider text-muted">
                Mobile app
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute inset-3 rounded-xl border border-white/10 bg-background/60 p-3 backdrop-blur-sm sm:inset-4 sm:p-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-400/90" />
            <span className="h-2 w-2 rounded-full bg-amber-400/90" />
            <span className="h-2 w-2 rounded-full bg-emerald-400/90" />
          </div>
          <div className="mt-3 space-y-2">
            <div className="h-2 w-[85%] rounded-full bg-accent/35" />
            <div className="h-2 w-[60%] rounded-full bg-muted/25" />
            <div className="h-2 w-[45%] rounded-full bg-violet/30" />
          </div>
          <p className="mt-4 font-display text-sm font-semibold text-foreground sm:text-base">
            {name}
          </p>
          <p className="text-[10px] uppercase tracking-wider text-muted">
            Platform preview
          </p>
        </div>
      )}
    </div>
  );
}
