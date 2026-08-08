import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ThemeToggle } from '@/components/ThemeToggle';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > 120 && y > lastY);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    gsap.from('[data-nav-item]', {
      y: -20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.06,
      delay: 0.4,
      ease: 'power3.out',
    });
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-transform duration-500"
      style={{ transform: hidden ? 'translateY(-100%)' : 'translateY(0)' }}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        <a
          href="#hero"
          data-nav-item
          data-cursor="hover"
          className="font-mono text-sm font-medium tracking-tight text-fg"
        >
          DR<span className="text-accent">.</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              data-nav-item
              data-cursor="hover"
              className="group relative font-mono text-xs uppercase tracking-[0.15em] text-fg-muted transition-colors hover:text-fg"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            data-nav-item
            data-cursor="hover"
            className="font-mono text-xs uppercase tracking-[0.15em] text-fg-muted transition-colors hover:text-accent md:hidden"
          >
            Contact
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
