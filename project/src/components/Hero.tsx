import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { profile } from '@/data/content';
import { HeroScene } from '@/components/HeroScene';

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set('[data-hero-line]', { yPercent: 0 });
        gsap.set('[data-hero-fade]', { opacity: 1 });
        return;
      }

      const tl = gsap.timeline({ delay: 0.2 });

      tl.to('[data-hero-line]', {
        yPercent: 0,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.12,
      })
        .from(
          '[data-hero-fade]',
          {
            y: 24,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
          },
          '-=0.5'
        )
        .from(
          '[data-hero-meta]',
          {
            opacity: 0,
            duration: 0.6,
          },
          '-=0.3'
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-transparent to-ink pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-10">
        <div className="max-w-4xl">
          <div
            data-hero-meta
            className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-fg-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            {profile.location}
          </div>

          <h1 className="font-sans text-[clamp(3rem,11vw,9rem)] font-semibold leading-[0.92] tracking-[-0.03em]">
            <span className="mask-line">
              <span data-hero-line className="block translate-y-full clip-reveal">
                Dhruv
              </span>
            </span>
            <span className="mask-line">
              <span
                data-hero-line
                className="block translate-y-full clip-reveal text-fg-muted"
              >
                Rathod
              </span>
            </span>
          </h1>

          <div
            data-hero-fade
            className="mt-8 flex flex-col gap-2 font-mono text-sm uppercase tracking-[0.15em] text-fg-muted md:flex-row md:items-center md:gap-6"
          >
            <span className="text-fg">{profile.title}</span>
            <span className="hidden h-3 w-px bg-line-strong md:block" />
            <span>{profile.subtitle}</span>
          </div>

          <p
            data-hero-fade
            className="mt-6 max-w-md text-balance text-lg leading-relaxed text-fg-muted"
          >
            {profile.tagline}.
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <motion.div
          data-cursor="hover"
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-dim">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="h-4 w-4 text-fg-dim" strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
