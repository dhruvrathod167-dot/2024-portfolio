import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experiences } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const rootRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set('[data-exp-card]', { opacity: 1, y: 0 });
        gsap.set(lineRef.current, { scaleY: 1 });
        return;
      }

      gsap.from('[data-exp-card]', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '[data-exp-list]',
          start: 'top 80%',
          once: true,
        },
      });

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: '[data-exp-list]',
              start: 'top 70%',
              end: 'bottom 80%',
              scrub: 0.8,
            },
          }
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="work" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-16">
          <div className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-fg-dim">
            03 / Experience
          </div>
          <h2 className="font-sans text-3xl font-medium tracking-tight md:text-5xl">
            Where I've built
          </h2>
        </div>

        <div data-exp-list className="relative pl-8 md:pl-12">
          <div className="absolute left-0 top-0 h-full w-px bg-line">
            <div
              ref={lineRef}
              className="h-full w-full origin-top bg-gradient-to-b from-accent to-accent-dim"
              style={{ transform: 'scaleY(0)' }}
            />
          </div>

          {experiences.map((exp) => (
            <div
              data-exp-card
              key={exp.company}
              className="group relative mb-12 last:mb-0"
            >
              <div className="absolute -left-[33px] top-2 h-3 w-3 rounded-full border-2 border-ink bg-accent md:-left-[49px]" />

              <div className="overflow-hidden rounded-xl border border-line bg-ink-soft p-6 transition-colors duration-500 hover:border-line-strong md:p-8">
                <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-sans text-xl font-medium text-fg md:text-2xl">
                      {exp.role}
                    </h3>
                    <p className="mt-1 font-mono text-sm text-accent">{exp.company}</p>
                  </div>
                  <div className="font-mono text-xs uppercase tracking-[0.15em] text-fg-dim">
                    {exp.location}
                  </div>
                </div>

                <ul className="mt-6 space-y-3">
                  {exp.responsibilities.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-relaxed text-fg-muted"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
