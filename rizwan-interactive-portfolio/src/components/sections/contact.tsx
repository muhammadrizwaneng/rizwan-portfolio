"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ix/components/ui/card";
import ContactForm from "../ContactForm";
import { config } from "@ix/data/config";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";
import BookCall from "../book-call";
import { cn } from "@ix/lib/utils";

const ContactSection = () => {
  return (
    <SectionWrapper id="contact" className="min-h-screen max-w-7xl 2xl:max-w-[1600px] mx-auto">
      <SectionHeader id='contact' className="relative mb-14" title={
        <>
          LET&apos;S WORK <br />
          TOGETHER
        </>} />
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] z-[9999] mx-4">
        <Card
          className={cn(
            "mt-10 md:mt-16 rounded-[28px] border-slate-900/[0.07] bg-white/95 shadow-[0_30px_60px_-35px_rgba(15,23,42,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-[#131518]/95",
            "md:p-4 2xl:p-8",
            // roomier fields: the shared ace inputs are compact by default
            "md:[&_input]:h-12 md:[&_input]:text-base md:[&_textarea]:min-h-[180px] md:[&_textarea]:text-base 2xl:[&_textarea]:min-h-[220px]",
            "md:[&_label]:text-[15px] md:[&_button[type=submit]]:h-12 md:[&_button[type=submit]]:text-base",
          )}
        >
          <CardHeader>
            <CardTitle className="text-4xl md:text-5xl 2xl:text-6xl tracking-tight">Contact Form</CardTitle>
            <CardDescription className="md:text-base 2xl:text-lg">
              Please contact me directly at{" "}
              <a
                target="_blank"
                href={`mailto:${config.email}`}
                className="cursor-can-hover rounded-lg font-semibold text-orange-700 underline-offset-4 hover:underline dark:text-orange-400"
              >
                {config.email.replace(/@/g, "(at)")}
              </a>{" "}
              or drop your info here.
            </CardDescription>
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <BookCall />
              <span className="text-sm text-muted-foreground">
                Prefer to talk? Grab a 30-min slot.
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  );
};
export default ContactSection;
