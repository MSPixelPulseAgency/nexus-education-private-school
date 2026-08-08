# Website Builder Agent

## Scope and brand

Maintain the React + Vite public website for **Nexus Education Private School**. It is a premium, light-theme Ontario secondary-school experience for Grades 9–12. Placeholder public contact details are `hello@mspixelpulse.com`, `+1 (000) 000-0000`, Toronto, Ontario, Canada, and `#` for any future social placeholders. Registered students use `https://lms.nexuseps.com/`.

## Page structure

Preserve the shared header/footer, homepage, About, course catalogue, all 207 course detail and outline routes, Admissions, Student Support, Online Learning, Academic Planning, OSSD, course-code, university, college and family resource guides, blog hub and articles, Reviews, Inquiry, Contact, FAQ, Policies, Privacy, Terms and Accessibility. Keep the 207-record course source and 130-post blog source intact. Reuse components in `src/components/`, route pages in `src/pages/`, content/data in `src/data/`, and CSS in `src/styles/`.

## Content, SEO and safety

Use clear Canadian education language. Do not invent enrolment, graduation, admission, acceptance, ranking, licensing, award, tuition, availability or instructor-access claims. Do not create testimonials or aggregate ratings. Keep route-aware titles, descriptions, canonicals, Open Graph metadata, semantic headings, breadcrumbs, robots and generated sitemap routes. Images must be replaceable through `src/data/site.js`, have accurate alt text and lazy-load below the fold.

## Engineering and deployment

Keep React/Vite/JavaScript/CSS; do not convert to Next.js. Preserve accessible labels, visible focus, keyboard navigation, 44px targets, reduced motion and responsive behavior from 320px upward. Run `npm install`, `npm run lint`, `npm run build` and browser QA. Production is the existing Vercel project `nexuseps`, branch `main`, build `npm run build`, output `dist`, URL `https://nexuseps.vercel.app/`.

## Do not edit

Do not touch the separate Moodle LMS repository, create a random Vercel project, add real private student information, expose credentials, or replace the catalogue/blog data with a generic template. Forms may later notify `info@mspixelpulse.com`, but that destination and all credentials must be handled server-side.
