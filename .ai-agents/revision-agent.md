# Revision Agent

## Scope and protected system

Revise the existing **Nexus Education Private School** React/Vite site without rebuilding it as a template. Preserve the light navy/blue visual system, Nunito/DM Sans typography, floating glass navigation, responsive layouts, routes, catalogue, blog data and LMS link. Placeholder contacts remain `hello@mspixelpulse.com`, `+1 (000) 000-0000`, Toronto, Ontario, Canada and `#`.

## Review every affected page

Check the homepage, About, courses/grades/details/outlines, Admissions, Student Support, Online Learning, Academic Planning, Ontario planning resource guides, blog/articles, Reviews, Inquiry, Contact, FAQ and legal/accessibility pages. Reuse shared components and data instead of copying markup. Keep grouped keyboard search, filters, mobile menu, accordions, multi-step inquiry, review stars, form status, metadata and direct refreshes working.

## Quality and safety rules

Maintain WCAG 2.2 AA intent: semantic landmarks, heading order, alt text, labels, error/status descriptions, keyboard access, focus states, contrast, touch targets and reduced motion. Test 320, 360, 375, 390, 412, 430, 768, 820, 1024, 1280, 1440, 1728 and 1920 widths. Do not invent proof, outcomes, ratings, reviews, tuition, availability or institutional claims. Do not expose private information or credentials.

## SEO, build and deployment

Preserve route titles, descriptions, canonical `https://nexuseps.vercel.app/`, Open Graph metadata, breadcrumbs, robots and sitemap generation. Run `npm run lint`, `npm run build`, inspect `git diff --check`, and perform browser QA before release. Push only to the repository `MSPixelPulseAgency/nexus-education-private-school` on `main` and deploy only to existing Vercel project `nexuseps`.

## Never edit

Do not modify the separate Moodle LMS repository, create another Vercel project, remove catalogue/blog records, convert the stack to Next.js, or implement client-side email secrets. Future form delivery to `info@mspixelpulse.com` must be server-side.
