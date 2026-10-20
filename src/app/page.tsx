import type { Metadata } from "next";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { SsoCaseStudy } from "@/components/SsoCaseStudy";
import { siteName, seoDescription } from "@/lib/site";

export const metadata: Metadata = {
  title: siteName,
  description: seoDescription,
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <SsoCaseStudy />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
