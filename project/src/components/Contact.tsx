import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, GitBranch, Link as LinkIcon, Copy, Check } from 'lucide-react';
import { profile, socials } from '@/data/content';
import { useMagnetic } from '@/hooks/useMagnetic';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const magneticRef = useMagnetic<HTMLButtonElement>(0.25);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set('[data-contact-reveal]', { opacity: 1, y: 0 });
        return;
      }

      gsap.from('[data-contact-reveal]', {
        y: 40,
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
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const links = [
    { icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: 'Phone', value: profile.phone, href: `tel:${profile.phone}` },
    { icon: GitBranch, label: 'GitHub', value: 'github.com', href: socials.github },
    { icon: LinkIcon, label: 'LinkedIn', value: 'linkedin.com', href: socials.linkedin },
  ];

  return (
    <section
      ref={rootRef}
      id="contact"
      className="relative min-h-screen py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-12 font-mono text-xs uppercase tracking-[0.2em] text-fg-dim">
          06 / Contact
        </div>

        <h2
          data-contact-reveal
          className="max-w-4xl text-balance font-sans text-[clamp(2.5rem,8vw,6rem)] font-semibold leading-[0.95] tracking-[-0.03em]"
        >
          Let's build
          <br />
          <span className="text-accent">something.</span>
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <button
              ref={magneticRef}
              onClick={copyEmail}
              data-cursor="copy"
              data-cursor-label={copied ? 'Copied' : 'Copy'}
              className="group relative inline-flex items-center gap-4"
            >
              <span className="font-sans text-xl font-medium tracking-tight text-fg md:text-3xl">
                {profile.email}
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg-muted transition-colors group-hover:border-accent group-hover:text-accent">
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span
                      key="check"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Check className="h-4 w-4" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Copy className="h-4 w-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
            </button>

            <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  data-cursor="open"
                  data-cursor-label="Open"
                  className="group flex items-center gap-4 bg-ink-soft p-5 transition-colors duration-300 hover:bg-ink-elevated"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg-muted transition-colors group-hover:border-accent group-hover:text-accent">
                    <link.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-fg-dim">
                      {link.label}
                    </div>
                    <div className="text-sm text-fg">{link.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <p data-contact-reveal className="text-balance text-base leading-relaxed text-fg-muted">
              Open to opportunities, collaborations, and conversations about
              building well-crafted web applications. Based in {profile.location} —
              available remotely.
            </p>
          </div>
        </div>

        <footer className="mt-24 flex flex-col gap-4 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <div className="font-mono text-xs text-fg-dim">
            © {new Date().getFullYear()} {profile.name}. Built with React, GSAP & care.
          </div>
          <div className="font-mono text-xs text-fg-dim">
            {profile.title} — {profile.location}
          </div>
        </footer>
      </div>
    </section>
  );
}
