import { z } from "zod";

/** Shared by the contact form (instant feedback) and /api/send (the real gate). */
export const CONTACT_LIMITS = {
  nameMin: 2,
  nameMax: 80,
  emailMax: 254,
  messageMin: 10,
  messageMax: 3000,
} as const;

export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Please enter your name")
    .min(CONTACT_LIMITS.nameMin, `Name must be at least ${CONTACT_LIMITS.nameMin} characters`)
    .max(CONTACT_LIMITS.nameMax, `Name must be under ${CONTACT_LIMITS.nameMax} characters`),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address")
    .max(CONTACT_LIMITS.emailMax, "Email address is too long")
    .email("Enter a valid email, like name@example.com"),
  message: z
    .string()
    .trim()
    .min(1, "Please write a message")
    .min(
      CONTACT_LIMITS.messageMin,
      `Message must be at least ${CONTACT_LIMITS.messageMin} characters`
    )
    .max(
      CONTACT_LIMITS.messageMax,
      `Message must be under ${CONTACT_LIMITS.messageMax} characters`
    ),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;
export type ContactFieldErrors = Partial<Record<ContactField, string>>;

/** First error message per field, in a shape both client and server can use. */
export function toFieldErrors(error: z.ZodError<ContactInput>): ContactFieldErrors {
  return error.issues.reduce<ContactFieldErrors>((acc, issue) => {
    const field = issue.path[0] as ContactField;
    return acc[field] ? acc : { ...acc, [field]: issue.message };
  }, {});
}

/** Validates one field on its own (used on blur). */
export function validateField(field: ContactField, value: string): string | undefined {
  const result = contactSchema.shape[field].safeParse(value);
  return result.success ? undefined : result.error.issues[0]?.message;
}
