"use client";
import { AlertCircle, ChevronRight, Loader2 } from "lucide-react";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/ace-input";
import { Textarea } from "./ui/ace-textarea";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import {
  CONTACT_LIMITS,
  contactSchema,
  toFieldErrors,
  validateField,
  type ContactField,
  type ContactFieldErrors,
  type ContactInput,
} from "@/lib/contact-schema";

const EMPTY_FORM: ContactInput = { fullName: "", email: "", message: "" };
const REDIRECT_DELAY_MS = 1000;
const ERROR_RING = "ring-2 ring-red-500/80 focus-visible:ring-red-500 dark:focus-visible:ring-red-500";

const errorId = (field: ContactField) => `contact-${field}-error`;

const FieldError = ({ field, message }: { field: ContactField; message?: string }) =>
  message ? (
    <p
      id={errorId(field)}
      role="alert"
      className="flex items-center gap-1.5 text-sm text-red-500"
    >
      <AlertCircle className="size-3.5 shrink-0" aria-hidden />
      {message}
    </p>
  ) : null;

const ContactForm = () => {
  const [values, setValues] = React.useState<ContactInput>(EMPTY_FORM);
  const [errors, setErrors] = React.useState<ContactFieldErrors>({});
  const [loading, setLoading] = React.useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const handleChange =
    (field: ContactField) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = e.target.value;
      setValues((prev) => ({ ...prev, [field]: value }));
      // once a field shows an error, re-check live so it clears as soon as it's fixed
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
      }
    };

  const handleBlur = (field: ContactField) => () => {
    // don't nag about untouched empty fields; submit will catch those
    if (!values[field].trim()) return;
    setErrors((prev) => ({ ...prev, [field]: validateField(field, values[field]) }));
  };

  const fieldProps = (field: ContactField) => ({
    value: values[field],
    onChange: handleChange(field),
    onBlur: handleBlur(field),
    "aria-invalid": Boolean(errors[field]),
    "aria-describedby": errors[field] ? errorId(field) : undefined,
    className: cn(errors[field] && ERROR_RING),
  });

  const showErrorToast = (description: string) =>
    toast({
      title: "Message not sent",
      description,
      className: cn(
        "top-0 w-full flex justify-center fixed md:max-w-7xl md:top-4 md:right-4"
      ),
      variant: "destructive",
    });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = contactSchema.safeParse(values);
    if (!result.success) {
      const fieldErrors = toFieldErrors(result.error);
      setErrors(fieldErrors);
      const firstInvalid = (Object.keys(fieldErrors) as ContactField[])[0];
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const data: { error?: string; fieldErrors?: ContactFieldErrors } = await res
        .json()
        .catch(() => ({}));

      if (!res.ok) {
        if (data.fieldErrors) setErrors(data.fieldErrors);
        showErrorToast(data.error ?? "Something went wrong! Please try again.");
        return;
      }

      toast({
        title: "Thank you!",
        description: "I'll get back to you as soon as possible.",
        variant: "default",
        className: cn("top-0 mx-auto flex fixed md:top-4 md:right-4"),
      });
      setValues(EMPTY_FORM);
      setTimeout(() => router.push("/"), REDIRECT_DELAY_MS);
    } catch {
      showErrorToast("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const messageLength = values.message.trim().length;
  const messageTooShort = messageLength > 0 && messageLength < CONTACT_LIMITS.messageMin;

  return (
    <form
      className="min-w-7xl mx-auto sm:mt-4"
      onSubmit={handleSubmit}
      aria-busy={loading}
      // our own messages replace the browser's inconsistent tooltips
      noValidate
    >
      <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4">
        <LabelInputContainer>
          <Label htmlFor="contact-fullName">Full name</Label>
          <Input
            id="contact-fullName"
            name="name"
            placeholder="Your Name"
            type="text"
            autoComplete="name"
            maxLength={CONTACT_LIMITS.nameMax}
            {...fieldProps("fullName")}
          />
          <FieldError field="fullName" message={errors.fullName} />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="contact-email">Email Address</Label>
          <Input
            id="contact-email"
            name="email"
            placeholder="you@example.com"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            maxLength={CONTACT_LIMITS.emailMax}
            {...fieldProps("email")}
          />
          <FieldError field="email" message={errors.email} />
        </LabelInputContainer>
      </div>
      <div className="grid w-full gap-1.5 mb-4">
        <Label htmlFor="contact-message">Your Message</Label>
        <Textarea
          placeholder="Tell me about your project..."
          id="contact-message"
          name="message"
          maxLength={CONTACT_LIMITS.messageMax}
          {...fieldProps("message")}
        />
        <div className="flex items-start justify-between gap-4">
          <div className="min-h-5">
            <FieldError field="message" message={errors.message} />
          </div>
          <span
            className={cn(
              "shrink-0 font-mono text-xs tabular-nums",
              messageTooShort ? "text-amber-500" : "text-muted-foreground"
            )}
            aria-live="polite"
          >
            {messageLength}/{CONTACT_LIMITS.messageMax}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          I&apos;ll never share your data with anyone else. Pinky promise!
        </p>
      </div>
      <Button
        disabled={loading}
        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
        type="submit"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <p>Please wait</p>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            Send Message <ChevronRight className="w-4 h-4 ml-4" />
          </div>
        )}
        <BottomGradient />
      </Button>
    </form>
  );
};

export default ContactForm;

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-brand to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent orange-400 to-transparent" />
    </>
  );
};
