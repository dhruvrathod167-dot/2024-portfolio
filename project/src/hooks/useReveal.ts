import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type RevealOptions = {
  y?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  once?: boolean;
};

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: RevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const items = el.querySelectorAll('[data-reveal]');

    if (prefersReduced) {
      gsap.set(items, { opacity: 1, y: 0, clipPath: 'inset(0 0 0 0)' });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(items, {
        y: options.y ?? 28,
        opacity: 0,
        duration: options.duration ?? 0.9,
        ease: 'power3.out',
        stagger: options.stagger ?? 0.08,
        delay: options.delay ?? 0,
        scrollTrigger: {
          trigger: el,
          start: options.start ?? 'top 82%',
          once: options.once ?? true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}
