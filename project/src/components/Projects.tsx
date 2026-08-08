import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { projects, type Project } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (prefersReduced) {
        gsap.set('[data-project-card]', { opacity: 1, y: 0 });
        return;
      }

      gsap.from('[data-project-card]', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: '[data-projects-list]',
          start: 'top 78%',
          once: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [active]);

  return (
    <section ref={rootRef} id="projects" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-fg-dim">
              04 / Projects
            </div>
            <h2 className="font-sans text-3xl font-medium tracking-tight md:text-5xl">
              Selected work
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-fg-muted">
            Case studies built with Python and Django.
          </p>
        </div>

        <div data-projects-list className="space-y-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              reversed={i % 2 === 1}
              onOpen={() => setActive(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && <CaseStudyModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({
  project,
  reversed,
  onOpen,
}: {
  project: Project;
  reversed: boolean;
  onOpen: () => void;
}) {
  return (
    <article
      data-project-card
      data-cursor="view"
      data-cursor-label="View"
      onClick={onOpen}
      className={`group relative grid cursor-pointer grid-cols-1 overflow-hidden rounded-2xl border border-line bg-ink-soft transition-colors duration-500 hover:border-accent/30 lg:grid-cols-12 ${
        reversed ? 'lg:[direction:rtl]' : ''
      }`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-elevated lg:col-span-7 [direction:ltr]">
        <ProjectVisual index={project.index} title={project.title} />
      </div>

      <div className="flex flex-col justify-between gap-8 p-8 lg:col-span-5 [direction:ltr] lg:p-10">
        <div>
          <div className="mb-6 flex items-center gap-4 font-mono text-xs uppercase tracking-[0.15em] text-fg-dim">
            <span>{project.index}</span>
            <span className="h-px w-8 bg-line-strong" />
            <span>{project.category}</span>
          </div>

          <h3 className="font-sans text-2xl font-medium leading-tight tracking-tight text-fg md:text-3xl">
            {project.title}
          </h3>

          <p className="mt-4 text-sm leading-relaxed text-fg-muted">
            {project.summary}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.stack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-line bg-ink px-3 py-1 font-mono text-[10px] text-fg-muted opacity-0 transition-all duration-500 group-hover:opacity-100"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-fg">
          <span className="relative">
            View Case Study
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
          </span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </article>
  );
}

function ProjectVisual({ index, title }: { index: string; title: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />
      <div className="absolute inset-0 opacity-20 bg-grid" />

      <div className="relative z-10 scale-100 transition-transform duration-700 group-hover:scale-105">
        <span className="font-sans text-[8rem] font-semibold leading-none text-fg/5 md:text-[12rem]">
          {index}
        </span>
      </div>

      <div className="absolute bottom-6 left-6 z-10">
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-fg-muted">
          {title}
        </span>
      </div>
    </div>
  );
}

function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const sections = [
    { label: 'Problem', text: project.problem },
    { label: 'Approach', text: project.approach },
    { label: 'Outcome', text: project.outcome },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-ink/80 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className="relative my-10 w-full max-w-3xl rounded-2xl border border-line bg-ink-soft p-8 md:p-12"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          data-cursor="hover"
          className="absolute right-6 top-6 flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg-muted transition-colors hover:border-accent hover:text-fg"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-2 font-mono text-xs uppercase tracking-[0.15em] text-fg-dim">
          {project.index} / {project.category} — {project.year}
        </div>

        <h3 className="mb-8 font-sans text-3xl font-medium tracking-tight text-fg md:text-4xl">
          {project.title}
        </h3>

        <div className="space-y-8">
          {sections.map((s) => (
            <div key={s.label}>
              <h4 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                {s.label}
              </h4>
              <p className="text-base leading-relaxed text-fg-muted">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-line pt-6">
          <h4 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-fg-dim">
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-line bg-ink px-3 py-1 font-mono text-xs text-fg-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
