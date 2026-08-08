import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skillCategories } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

export function Skills() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set('[data-skill-card]', { opacity: 1, y: 0 });
        return;
      }

      gsap.from('[data-skill-card]', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '[data-skills-grid]',
          start: 'top 80%',
          once: true,
        },
      });

      gsap.from('[data-skill-header]', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 82%',
          once: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="skills" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div
          data-skill-header
          className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-fg-dim">
              02 / Skills
            </div>
            <h2 className="font-sans text-3xl font-medium tracking-tight md:text-5xl">
              The toolkit
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-fg-muted">
            A focused stack for building full-stack web applications end to end.
          </p>
        </div>

        <div
          data-skills-grid
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {skillCategories.map((cat) => (
            <div
              data-skill-card
              key={cat.label}
              data-cursor="hover"
              className="group relative overflow-hidden rounded-xl border border-line bg-ink-soft p-8 transition-colors duration-500 hover:border-accent/40"
            >
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/5 blur-2xl transition-opacity duration-500 group-hover:bg-accent/10" />
              <div className="relative">
                <div className="mb-6 flex items-baseline justify-between">
                  <span className="font-mono text-xs text-fg-dim">{cat.index}</span>
                  <span className="font-mono text-xs uppercase tracking-[0.15em] text-fg-muted">
                    {cat.label}
                  </span>
                </div>

                <ul className="space-y-4">
                  {cat.skills.map((skill, i) => (
                    <li
                      key={skill}
                      className="flex items-center gap-3 text-sm text-fg"
                    >
                      <span className="font-mono text-[10px] text-accent">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="transition-colors duration-300 group-hover:text-fg">
                        {skill}
                      </span>
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
