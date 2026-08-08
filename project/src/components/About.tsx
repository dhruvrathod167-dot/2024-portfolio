import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profile } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

const terminalLines = [
  { prompt: '$', text: 'whoami', type: 'cmd' },
  { text: '→ dhruv_rathod', type: 'out' },
  { prompt: '$', text: 'cat summary.txt', type: 'cmd' },
  { text: 'Python · Django · Full-Stack', type: 'out' },
  { text: 'Ahmedabad, IN', type: 'out' },
  { prompt: '$', text: 'python -m philosophy', type: 'cmd' },
  { text: 'Efficient digital solutions.', type: 'out' },
  { text: 'Better UX. Faster apps.', type: 'out' },
  { prompt: '$', text: '_', type: 'cursor' },
];

export function About() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set('[data-about-reveal]', { opacity: 1, y: 0 });
        return;
      }

      gsap.from('[data-about-reveal]', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      gsap.from('[data-terminal-line]', {
        opacity: 0,
        x: -10,
        duration: 0.4,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '[data-terminal]',
          start: 'top 80%',
          once: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="about"
      className="relative min-h-screen py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div
              data-about-reveal
              className="mb-10 font-mono text-xs uppercase tracking-[0.2em] text-fg-dim"
            >
              01 / About
            </div>
            <h2
              data-about-reveal
              className="text-balance font-sans text-3xl font-medium leading-tight tracking-tight md:text-5xl"
            >
              A developer focused on building things that{' '}
              <span className="text-accent">work well</span> and feel good to use.
            </h2>
            <p
              data-about-reveal
              className="mt-8 max-w-md text-balance text-base leading-relaxed text-fg-muted"
            >
              {profile.summary}
            </p>

            <div data-about-reveal className="mt-10 flex flex-wrap gap-3">
              {['Python', 'Django', 'Full-Stack', 'Responsive Design'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line bg-ink-elevated px-4 py-1.5 font-mono text-xs text-fg-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div
              data-terminal
              data-about-reveal
              className="relative overflow-hidden rounded-xl border border-line bg-ink-soft shadow-2xl"
            >
              <div className="flex items-center gap-2 border-b border-line px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                <span className="ml-3 font-mono text-xs text-fg-dim">~/dhruv — zsh</span>
              </div>
              <div className="space-y-2 p-6 font-mono text-sm leading-relaxed">
                {terminalLines.map((line, i) => (
                  <div data-terminal-line key={i} className="flex items-center gap-3">
                    {line.prompt && (
                      <span className="text-accent">{line.prompt}</span>
                    )}
                    {line.type === 'cursor' ? (
                      <span className="inline-block h-4 w-2 animate-pulse bg-accent" />
                    ) : (
                      <span
                        className={line.type === 'cmd' ? 'text-fg' : 'text-fg-muted'}
                      >
                        {line.text}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
