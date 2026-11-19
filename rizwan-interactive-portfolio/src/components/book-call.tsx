"use client";

import { useState } from "react";
import { CalendarDays, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@ix/components/ui/dialog";
import { config } from "@ix/data/config";
import { cn } from "@ix/lib/utils";

/**
 * Calendly inline-embed URL. Always light: Calendly's own page around the widget is
 * white and can't be themed, so a dark widget would sit in a white frame.
 */
const embedUrl = (base: string) => {
  const url = new URL(base);
  url.searchParams.set("embed_type", "Inline");
  url.searchParams.set("embed_domain", window.location.host);
  url.searchParams.set("hide_gdpr_banner", "1");
  url.searchParams.set("primary_color", "f97316");
  url.searchParams.set("background_color", "ffffff");
  url.searchParams.set("text_color", "171717");
  return url.toString();
};

/**
 * "Book a call" trigger that opens the Calendly scheduler in a dialog.
 * Renders nothing until `config.calendly` is set.
 */
export default function BookCall({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  if (!config.calendly) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setLoaded(false);
      }}
    >
      <DialogTrigger asChild>
        {children ?? (
          <button
            type="button"
            className={cn(
              "inline-flex h-11 items-center gap-2 rounded-full bg-orange-500 px-6 text-sm font-semibold text-[#1a0c02] shadow-lg shadow-orange-500/25 transition-[filter,transform] hover:-translate-y-0.5 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400",
              className,
            )}
          >
            <CalendarDays aria-hidden className="size-4" />
            Book a call
          </button>
        )}
      </DialogTrigger>
      {/* `modall` tells Lenis smooth-scroll to leave wheel events to the dialog */}
      <DialogContent className="modall z-[10001] flex h-[min(760px,90dvh)] w-[min(1000px,94vw)] max-w-none flex-col gap-0 overflow-hidden rounded-3xl border-none bg-white p-0 text-neutral-900 [&>button]:text-neutral-500">
        <div className="border-b border-neutral-200 px-6 py-4 pr-14">
          <DialogTitle className="font-display text-xl">Book a call</DialogTitle>
          <DialogDescription className="text-neutral-500">
            Pick a slot that works for you. It lands straight in my calendar.
          </DialogDescription>
        </div>
        <div className="relative flex-1">
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
              <Loader2 aria-hidden className="size-6 animate-spin" />
              <span className="sr-only">Loading calendar</span>
            </div>
          )}
          {open && (
            <iframe
              title="Calendly scheduling"
              src={embedUrl(config.calendly)}
              onLoad={() => setLoaded(true)}
              className="absolute inset-0 h-full w-full"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
