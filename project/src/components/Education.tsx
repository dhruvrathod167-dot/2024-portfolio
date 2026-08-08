import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { education } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

export function Education() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set('[data-edu-reveal]', { opacity: 1, y: 0 });
        return;
      }

      gsap.from('[data-edu-reveal]', {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 80%',
          once: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="education" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-12 font-mono text-xs uppercase tracking-[0.2em] text-fg-dim">
          05 / Education
        </div>

        <div className="flex flex-col gap-2">
          <h3
            data-edu-reveal
            className="font-sans text-2xl font-medium tracking-tight text-fg md:text-4xl"
          >
            {education.degree}
          </h3>
          <p data-edu-reveal className="text-base text-fg-muted">
            {education.institution}
          </p>
          <p data-edu-reveal className="font-mono text-sm text-fg-dim">
            {education.location}
          </p>
        </div>
      </div>
    </section>
  );
}
