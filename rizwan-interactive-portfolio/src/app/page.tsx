"use client";

import React from "react";
import SmoothScroll from "@/components/smooth-scroll";
import { cn } from "@/lib/utils";
import AnimatedBackground from "@/components/animated-background";
import SectionBackdrop from "@/components/section-backdrop";
import ScrollTrain from "@/components/scroll-train";
import SkillsSection from "@/components/sections/skills";
import ConstellationSection from "@/components/sections/constellation";
import ExperienceSection from "@/components/sections/experience";
import CertificatesSection from "@/components/sections/certificates";
import ProjectsSection from "@/components/sections/projects";
import GithubProjectsSection from "@/components/sections/github-projects";
import ContactSection from "@/components/sections/contact";
import HeroSection from "@/components/sections/hero";

function MainPage() {
  return (
    <SmoothScroll>
      <SectionBackdrop />
      <AnimatedBackground />
      <main className={cn("bg-transparent canvas-overlay-mode")}>
        <HeroSection />
        <SkillsSection />
        <ConstellationSection />
        <ExperienceSection />
        <CertificatesSection />
        <ProjectsSection />
        <GithubProjectsSection />
        <ContactSection />
      </main>
      <ScrollTrain />
    </SmoothScroll>
  );
}

export default MainPage;
