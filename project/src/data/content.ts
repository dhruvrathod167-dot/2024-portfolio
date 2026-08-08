export const profile = {
  name: 'Dhruv Rathod',
  firstName: 'Dhruv',
  lastName: 'Rathod',
  location: 'Ahmedabad, India',
  email: 'dhruvrathod167@gmail.com',
  phone: '+91 9558779062',
  title: 'Python Django Developer',
  subtitle: 'Full-Stack Web Developer',
  tagline: 'Building efficient digital solutions',
  summary:
    'Dynamic Python Django developer skilled in full-stack web development and responsive website design. Experienced in building modern, user-friendly web applications with Python, Django, HTML, CSS, and JavaScript. Passionate about efficient digital solutions that improve UX and app performance.',
};

export type SkillCategory = {
  index: string;
  label: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    index: '01',
    label: 'Backend',
    skills: ['Python', 'Django Framework', 'RESTful API Integration', 'Database Integration (SQLite / MySQL)'],
  },
  {
    index: '02',
    label: 'Frontend',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Web Design', 'JavaScript Frameworks'],
  },
  {
    index: '03',
    label: 'Practices',
    skills: ['Full-Stack Web Development', 'Website Performance Optimization', 'Code Review'],
  },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  location: string;
  responsibilities: string[];
};

export const experiences: Experience[] = [
  {
    role: 'Python Django Intern',
    company: 'Coding Cloud Company',
    period: 'Internship',
    location: 'Ahmedabad, India',
    responsibilities: [
      'Built web applications using Python and Django to deliver user-friendly solutions',
      'Developed backend functionality and integrated databases for dynamic applications',
      'Improved website performance and optimized application responsiveness',
      'Integrated RESTful APIs to enhance application functionality',
      'Conducted code reviews for quality and best practices',
      'Maintained and updated websites for improved UX',
    ],
  },
];

export type Project = {
  id: string;
  index: string;
  title: string;
  category: string;
  year: string;
  stack: string[];
  summary: string;
  problem: string;
  approach: string;
  outcome: string;
};

export const projects: Project[] = [
  {
    id: 'luxury-brand-showcase',
    index: '01',
    title: 'Luxury Brand Showcase System',
    category: 'Content Platform',
    year: '2024',
    stack: ['Python', 'Django', 'HTML', 'CSS', 'JavaScript', 'Bootstrap', 'SQLite / MySQL'],
    summary:
      'A brand and product showcase platform with admin-managed content, built to let a luxury label present its catalog without touching code.',
    problem:
      'A growing brand needed a way to publish and update a curated product catalog without relying on a developer for every change, while keeping the storefront polished and on-brand.',
    approach:
      'Built a Django-powered content platform with an admin dashboard for managing products and brand assets, paired with a responsive Bootstrap storefront that adapts across devices.',
    outcome:
      'A maintainable showcase system where non-technical staff can manage the full catalog, with a clean public-facing experience that reflects the brand.',
  },
  {
    id: 'furniture-website',
    index: '02',
    title: 'Furniture Website',
    category: 'E-commerce Catalog',
    year: '2024',
    stack: ['Python', 'Django', 'HTML', 'CSS', 'JavaScript', 'Bootstrap', 'SQLite / MySQL'],
    summary:
      'An e-commerce style furniture catalog with responsive product browsing, built on Django with a clean, shoppable layout.',
    problem:
      'A furniture retailer wanted an online catalog that let customers browse products comfortably on any device, without the overhead of a full checkout pipeline.',
    approach:
      'Designed a Django catalog with structured product data, responsive Bootstrap layouts, and JavaScript-driven browsing interactions for filtering and viewing items.',
    outcome:
      'A responsive, shoppable catalog that loads quickly and reads well on mobile, giving customers a clear path from browsing to enquiry.',
  },
];

export const education = {
  degree: 'Bachelor of Computer Applications (BCA)',
  institution: 'Asia Pacific College',
  location: 'Usmanpura, Ahmedabad, Gujarat, India',
};

export const socials = {
  email: 'dhruvrathod167@gmail.com',
  phone: '+91 9558779062',
  github: 'https://github.com/',
  linkedin: 'https://www.linkedin.com/',
};
