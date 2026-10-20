"use client";

import { FormEvent, useState } from "react";
import { Loader2, Send } from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [feedback, setFeedback] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setFeedback("");
    setFieldErrors({});

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
    };

    const localErrors: Record<string, string> = {};
    if (payload.name.trim().length < 2) {
      localErrors.name = "Name must be at least 2 characters.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim())) {
      localErrors.email = "Enter a valid email.";
    }
    if (payload.message.trim().length < 10) {
      localErrors.message = "Message must be at least 10 characters.";
    }
    if (Object.keys(localErrors).length > 0) {
      setFieldErrors(localErrors);
      setState("error");
      setFeedback("Please fix the highlighted fields.");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as {
        success?: boolean;
        message?: string;
        error?: string;
      };

      if (!response.ok) {
        setState("error");
        setFeedback(data.error ?? "Failed to send message.");
        return;
      }

      setState("success");
      setFeedback(data.message ?? "Message sent successfully.");
      form.reset();
    } catch {
      setState("error");
      setFeedback("Network error. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="form-field w-full rounded-xl border border-border bg-surface-elevated px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
          placeholder="Your name"
        />
        {fieldErrors.name ? (
          <p className="mt-1 text-xs text-red-400">{fieldErrors.name}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="form-field w-full rounded-xl border border-border bg-surface-elevated px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
          placeholder="you@example.com"
        />
        {fieldErrors.email ? (
          <p className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>
        ) : null}
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="form-field w-full resize-y rounded-xl border border-border bg-surface-elevated px-4 py-3 text-sm text-foreground outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/20"
          placeholder="Tell me about your project or role..."
        />
        {fieldErrors.message ? (
          <p className="mt-1 text-xs text-red-400">{fieldErrors.message}</p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={state === "submitting"}
        className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm sm:w-auto"
      >
        {state === "submitting" ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Sending...
          </>
        ) : (
          <>
            <Send size={16} /> Send message
          </>
        )}
      </button>

      {feedback ? (
        <p
          role="status"
          className={`text-sm ${state === "success" ? "text-emerald-400" : "text-red-400"}`}
        >
          {feedback}
        </p>
      ) : null}
    </form>
  );
}
