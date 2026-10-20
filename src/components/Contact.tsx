"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <Section id="contact">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something great"
          description="Send a message for hiring, freelance work, or collaboration. I typically reply within 1–2 business days."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass relative overflow-hidden rounded-3xl p-8 sm:p-10"
        >
          <div className="glow-orb -right-10 -top-10 h-48 w-48 bg-accent/20" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <h3 className="font-display text-lg font-semibold">Direct contact</h3>
              <div className="mt-5 space-y-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 text-sm transition hover:text-accent sm:text-base"
                >
                  <Mail className="shrink-0 text-accent" size={20} />
                  {profile.email}
                </a>
                <a
                  href={`tel:${profile.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-sm text-muted transition hover:text-accent sm:text-base"
                >
                  <Phone className="shrink-0 text-accent" size={20} />
                  {profile.phone}
                </a>
                <p className="flex items-center gap-3 text-sm text-muted sm:text-base">
                  <MapPin className="shrink-0 text-accent" size={20} />
                  {profile.location}
                </p>
              </div>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition hover:border-accent/40 hover:text-accent"
              >
                Download resume PDF
              </a>
            </div>

            <div className="rounded-2xl border border-border bg-background/30 p-5 sm:p-6">
              <h3 className="mb-4 font-display text-lg font-semibold">
                Send a message
              </h3>
              <ContactForm />
            </div>
          </div>
        </motion.div>
    </Section>
  );
}
