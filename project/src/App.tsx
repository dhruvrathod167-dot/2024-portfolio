import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { CustomCursor } from '@/components/CustomCursor';
import { NoiseOverlay } from '@/components/NoiseOverlay';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Skills } from '@/components/Skills';
import { Experience } from '@/components/Experience';
import { Projects } from '@/components/Projects';
import { Education } from '@/components/Education';
import { Contact } from '@/components/Contact';

export default function App() {
  useSmoothScroll();

  return (
    <>
      <CustomCursor />
      <NoiseOverlay />
      <Navigation />
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
    </>
  );
}
