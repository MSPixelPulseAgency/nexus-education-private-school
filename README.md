# Nexus Education Private School

Production React + Vite website for Nexus Education Private School, built and maintained by MSPixelPulseAgency.

- Production: https://nexuseps.vercel.app/
- LMS: https://lms.nexuseps.com/
- GitHub: https://github.com/MSPixelPulseAgency/nexus-education-private-school
- Stack: React 19, Vite, React Router, Lucide React, CSS

## Local development

```bash
npm install
npm run dev
npm run lint
npm run build
```

`npm run build` regenerates `public/sitemap.xml` from all static pages, 148 course records and 130 blog records before creating `dist/`.

## Structure

- `src/components/` — shared navigation, footer, cards, SEO, FAQ and form UI
- `src/pages/` — route-level experiences
- `src/data/` — source catalogue, blog index, structured content and central visual configuration
- `src/styles/` — global tokens, component styles and responsive breakpoints
- `scripts/generate-sitemap.mjs` — sitemap generation
- `.ai-agents/` — maintenance rules for future AI-assisted work

## Production notes

The site must remain linked to the existing Vercel project `nexuseps`, use the `main` production branch, build with `npm run build`, and output `dist`. `vercel.json` provides the SPA rewrite required for direct route refreshes.

The public forms currently provide a graceful local confirmation state. Future email/database delivery should be implemented server-side without exposing credentials in the client. The planned internal notification destination is `info@mspixelpulse.com`.

This repository is only for the public React/Vite website. Do not modify or replace the separate Nexus Moodle LMS repository from this project.
