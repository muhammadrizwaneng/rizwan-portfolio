"use client";

import React from "react";
import SmoothScroll from "@ix/components/smooth-scroll";
import { cn } from "@ix/lib/utils";
import AnimatedBackground from "@ix/components/animated-background";
import SectionBackdrop from "@ix/components/section-backdrop";
import ScrollTrain from "@ix/components/scroll-train";
import SkillsSection from "@ix/components/sections/skills";
import ConstellationSection from "@ix/components/sections/constellation";
import ExperienceSection from "@ix/components/sections/experience";
import CertificatesSection from "@ix/components/sections/certificates";
import ProjectsSection from "@ix/components/sections/projects";
import GithubProjectsSection from "@ix/components/sections/github-projects";
import ContactSection from "@ix/components/sections/contact";
import HeroSection from "@ix/components/sections/hero";

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
