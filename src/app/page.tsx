import { About } from "@/components/About";
import { BeyondCode } from "@/components/BeyondCode";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Frame } from "@/components/Frame";
import { Fringes } from "@/components/Fringes";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Projects } from "@/components/Projects";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-background focus:px-3 focus:py-2 focus:underline"
      >
        Skip to content
      </a>

      {/* Fixed, behind everything, recedes on scroll. */}
      <Fringes />

      {/* Fixed, over everything, purely decorative. */}
      <Frame />

      <Nav />

      {/*
        Content runs full-bleed inside the frame's gutter rather than in a
        centred column: the hero is a composition that needs the whole width,
        and each section caps its own reading measure (see Section.tsx).
      */}
      <main
        id="main"
        className="flex-1"
        style={{
          paddingLeft: "var(--gutter)",
          paddingRight: "var(--gutter)",
        }}
      >
        <Hero />
        <About />
        <Projects />
        <BeyondCode />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
