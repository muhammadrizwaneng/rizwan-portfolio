import { EmailTemplate, emailText } from "@ix/components/email-template";
import { config } from "@ix/data/config";
import { Resend } from "resend";
import { contactSchema, toFieldErrors } from "@ix/lib/contact-schema";

// Created on first use: `new Resend()` throws without a key, which used to crash
// the whole route at import time (so even validation errors came back as a 500 page).
let resendClient: Resend | null = null;
function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  resendClient ??= new Resend(apiKey);
  return resendClient;
}

const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

const RECEIVED_AT_FORMAT = new Intl.DateTimeFormat("en-GB", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Karachi",
});

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    if (isRateLimited(ip)) {
      return Response.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    const body: unknown = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return Response.json({ error: "Invalid request body." }, { status: 400 });
    }
    const {
      success: zodSuccess,
      data: zodData,
      error: zodError,
    } = contactSchema.safeParse(body);
    if (!zodSuccess)
      return Response.json(
        {
          error: "Please fix the highlighted fields.",
          fieldErrors: toFieldErrors(zodError),
        },
        { status: 400 }
      );

    const resend = getResend();
    if (!resend) {
      console.error("[api/send] RESEND_API_KEY is not set");
      return Response.json(
        { error: "The contact form isn't set up yet. Please email me directly." },
        { status: 503 }
      );
    }

    const emailProps = {
      fullName: zodData.fullName,
      email: zodData.email,
      message: zodData.message,
      receivedAt: `${RECEIVED_AT_FORMAT.format(new Date())} PKT`,
      siteUrl: config.site,
    };

    const { data: resendData, error: resendError } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [config.email],
      // hitting Reply in the inbox answers the visitor, not the Resend sender
      replyTo: zodData.email,
      subject: `New message from ${zodData.fullName} · Portfolio`,
      react: EmailTemplate(emailProps),
      text: emailText(emailProps),
    });

    if (resendError) {
      console.error("[api/send] resend error", resendError);
      return Response.json(
        { error: "Couldn't send your message right now. Please try again in a minute." },
        { status: 502 }
      );
    }

    return Response.json(resendData);
  } catch (error) {
    // never echo raw errors to the client
    console.error("[api/send] unexpected error", error);
    return Response.json(
      { error: "Something went wrong on my side. Please try again." },
      { status: 500 }
    );
  }
}
