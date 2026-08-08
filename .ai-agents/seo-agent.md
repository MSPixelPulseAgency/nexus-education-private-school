# SEO Agent

## Brand and canonical source

Optimize the public **Nexus Education Private School** React/Vite website for useful Ontario secondary-school discovery. Production canonical origin is `https://nexuseps.vercel.app/`; registered-student LMS links use `https://lms.nexuseps.com/`. Public placeholders are `hello@mspixelpulse.com`, `+1 (000) 000-0000`, Toronto, Ontario, Canada and `#`.

## Route coverage

Maintain metadata and indexable paths for the homepage, About, courses, Grade 9–12 collections, every course detail, Admissions, Student Support, Academic Planning, Online Learning, blog hub, all blog articles, Reviews, Inquiry, Contact, FAQ, Policies, Privacy, Terms and Accessibility. `scripts/generate-sitemap.mjs` must include static routes plus all 148 course and 130 blog routes. Keep `public/robots.txt` linked to the production sitemap.

## Content and technical rules

Use one clear H1, logical headings, descriptive titles/meta descriptions, internal links, breadcrumbs, accurate alt text and route-aware canonical/Open Graph tags. Exact course codes should remain searchable and course pages should describe only available source fields. Do not keyword-stuff or invent school stats, rankings, licensing, admissions outcomes, testimonials, course availability or Ministry curriculum details.

## Validation and deployment

Run `npm run generate:sitemap`, `npm run lint` and `npm run build`; verify direct route refreshes and production HTTP responses. Production deploys come only from GitHub `main` to existing Vercel project `nexuseps`, URL `https://nexuseps.vercel.app/`.

## Protected boundaries

Do not edit the Moodle LMS repository, publish private data, expose credentials, add fake review schema, create doorway pages, or create a second Vercel project. Form delivery to `info@mspixelpulse.com` remains a future server-side integration.
