# Dhruv Rathod — Developer Portfolio

A cinematic, Awwwards-caliber portfolio for a Python/Django full-stack developer. Dark, technical elegance with premium motion design.

## Tech Stack

- **React 18 + TypeScript + Vite** — UI foundation
- **Tailwind CSS v4** — styling (configured in CSS via `@theme`)
- **GSAP + ScrollTrigger** — scroll-driven animations, clip-path reveals, staggered intros
- **Lenis** — smooth/inertia scrolling
- **Framer Motion** — micro-interactions and modal transitions
- **React Three Fiber + Three.js** — subtle 3D particle sphere in the hero (reacts to cursor)
- **lucide-react** — icons

## Getting Started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build
npm run preview  # preview the production build
```

## Project Structure

```
src/
├── components/
│   ├── Hero.tsx          # Kinetic typography intro + 3D particle scene
│   ├── HeroScene.tsx     # React Three Fiber particle grid + wireframe sphere
│   ├── About.tsx         # Split layout with animated terminal panel
│   ├── Skills.tsx        # Grouped skill cards with staggered reveals
│   ├── Experience.tsx    # Vertical timeline with scroll-driven progress line
│   ├── Projects.tsx      # Alternating project cards + case-study modal
│   ├── Education.tsx     # Minimal education section
│   ├── Contact.tsx       # Copy-to-clipboard email + magnetic buttons
│   ├── Navigation.tsx    # Auto-hiding nav with animated underlines
│   ├── CustomCursor.tsx  # Custom cursor (dot + contextual ring)
│   └── NoiseOverlay.tsx  # Subtle film grain texture
├── hooks/
│   ├── useSmoothScroll.ts  # Lenis + GSAP ticker integration
│   ├── useCustomCursor.ts  # Cursor tracking + contextual states
│   ├── useReveal.ts        # GSAP ScrollTrigger reveal helper
│   └── useMagnetic.ts      # Magnetic button effect
├── data/
│   └── content.ts        # All personal content (edit this file to update)
├── App.tsx
├── main.tsx
└── index.css             # Theme, fonts, cursor, grain
```

## Customizing Content

All personal data lives in **`src/data/content.ts`**. Edit that file to change:

- Name, title, tagline, summary
- Skill categories and items
- Experience entries (role, company, responsibilities)
- Projects (title, stack, problem/approach/outcome)
- Education
- Email, phone, social URLs

## Swapping In Real Assets

### Project Screenshots

The project cards currently use an abstract numbered visual. To add real screenshots:

1. Place images in `src/assets/projects/` (e.g. `luxury-brand.png`, `furniture.png`)
2. In `src/components/Projects.tsx`, replace the `<ProjectVisual />` component inside each card with an `<img>` tag:

```tsx
<img
  src={projectScreenshot}
  alt={project.title}
  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
/>
```

### Social Links

Update the `socials` object in `src/data/content.ts`:

```ts
export const socials = {
  email: 'dhruvrathod167@gmail.com',
  phone: '+91 9558779062',
  github: 'https://github.com/yourusername',
  linkedin: 'https://www.linkedin.com/in/yourprofile',
};
```

### Accent Color

The accent color is defined as a CSS variable in `src/index.css`:

```css
--color-accent: #6366F1;  /* electric indigo */
```

Change to `#10B981` for emerald, or any other hex value. The change propagates everywhere automatically.

### Dark / Light Theme

The site supports both dark and light themes. A toggle button in the navigation switches between them. The preference is saved to `localStorage` and restores on reload.

Theme variables are defined in `src/index.css` under `:root[data-theme='dark']` and `:root[data-theme='light']`. The light theme uses a near-white background with darker text and a slightly deeper indigo accent for contrast.

## Accessibility

- **`prefers-reduced-motion`** is respected throughout — parallax, pin effects, and smooth scroll are disabled; simple fades remain
- Custom cursor is **desktop-only** (disabled on touch devices via `pointer: coarse` media query)
- Pinned/scroll-scrub effects gracefully degrade to stacked reveals on mobile

## Notes

- The custom cursor sets `cursor: none` globally on desktop. If you want the native cursor visible alongside the custom one, remove the `* { cursor: none; }` rule in `src/index.css`
- The 3D hero scene renders ~1800 particles. On low-end devices it still performs well due to `sizeAttenuation` and additive blending, but you can reduce the count in `HeroScene.tsx` (the `count` variable in `ParticleGrid`)
