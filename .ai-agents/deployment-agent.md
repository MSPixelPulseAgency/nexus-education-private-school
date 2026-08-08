# Deployment Agent

## Authorized project

Deploy **Nexus Education Private School** from `https://github.com/MSPixelPulseAgency/nexus-education-private-school`, branch `main`, to the existing Vercel project `nexuseps`. Required production URL: `https://nexuseps.vercel.app/`. Framework is Vite, install command `npm install`, build command `npm run build`, output `dist`, root `./`. Never create or link a random replacement project.

## Preflight

Confirm the active path and remote, pull current `origin/main`, preserve user changes, and inspect status. Validate `npm install`, `npm run lint`, `npm run build`, `git diff --check`, sitemap generation and the SPA rewrite in `vercel.json`. The public brand uses `hello@mspixelpulse.com`, `+1 (000) 000-0000`, Toronto, Ontario, Canada and LMS `https://lms.nexuseps.com/`.

## Production QA

After deployment, inspect Vercel logs and verify HTTP 200 plus browser rendering for `/`, About, courses, every grade collection, Admissions, Student Support, Academic Planning, Online Learning, the Ontario planning resources, Blog, Reviews, Inquiry, Contact, FAQ, Privacy, Terms and Accessibility, plus one course, its outline and one blog article. Check desktop/tablet/mobile, navigation, grouped search, filters, forms, metadata and direct refreshes. A `Ready` status alone is not enough.

## Safety and content boundaries

Do not edit or deploy the separate Moodle LMS repository. Do not remove the 207-course or 130-blog datasets, invent school claims/reviews, expose credentials, or place notification secrets in the client. Future submissions may notify `info@mspixelpulse.com` only through a server-side integration.

## Git discipline

Commit intentional source changes only, push `main`, confirm the pushed SHA, and ensure the production deployment corresponds to that source. Do not leave required files only locally. Keep rollback possible through Vercel deployment history and Git.
