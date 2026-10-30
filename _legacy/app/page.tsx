import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { FAQ } from "@/sections/FAQ";
import { Hero } from "@/sections/Hero";
import { Process } from "@/sections/Process";
import { Projects } from "@/sections/Projects";
import { Services } from "@/sections/Services";
import { Skills } from "@/sections/Skills";
import { Timeline } from "@/sections/Timeline";

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1} aria-label="Abdullah Saeed portfolio home">
      <Hero />
      <About />
      <Services />
      <Projects />
      <Skills />
      <Process />
      <Timeline />
      <FAQ />
      <Contact />
    </main>
  );
}
