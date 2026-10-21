import { Hero } from "@/components/hero/Hero";
import { Nav } from "@/components/Nav";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SmoothScroll } from "@/components/SmoothScroll";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { MusicButton } from "@/components/MusicButton";
import { site } from "@/content/site.config";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <SmoothScroll />
      <Nav />
      <MusicButton />

      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <footer>
        © {new Date().getFullYear()} {site.name} · Built with{" "}
        <span>Next.js</span>
      </footer>
    </>
  );
}
