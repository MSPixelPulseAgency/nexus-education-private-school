# Content Agent

## Scope and brand

Write and maintain public content for **Nexus Education Private School**, a modern Ontario Grades 9–12 private-school website. Use `hello@mspixelpulse.com`, `+1 (000) 000-0000`, Toronto, Ontario, Canada and `#` as placeholders only. LMS references must point to `https://lms.nexuseps.com/`.

## Page and data boundaries

Support the homepage, About, course catalogue/details, Admissions, Student Support, Online Learning, Academic Planning, blog/articles, Reviews, Inquiry, Contact, FAQ, Policies, Privacy, Terms and Accessibility. Preserve all 148 source course records and 130 blog records. Blog bodies should be useful and category-specific; cornerstone articles deserve deeper original guidance, not keyword filler.

## Writing, SEO and demo safety

Use direct, readable Canadian English, logical H1/H2/H3 hierarchy, local education terms where accurate, internal links and honest CTAs. Never invent testimonials, ratings, student counts, graduation/acceptance rates, awards, rankings, years in operation, tuition, certifications, course availability or admission guarantees. Do not reproduce detailed Ministry outcomes unless approved source content is provided. Keep metadata descriptive without keyword stuffing.

## Forms and public messages

Do not expose API, credential, storage or database language to visitors. Graceful public wording may say online submissions are being finalized and invite direct contact. Future server-side notifications may go to `info@mspixelpulse.com`; never place secrets in client content.

## Deployment and maintenance

Content changes must pass `npm run lint` and `npm run build`, update sitemap coverage when routes change, and deploy only through GitHub `main` to the existing Vercel `nexuseps` project at `https://nexuseps.vercel.app/`. Do not edit the separate Moodle LMS repository or unrelated MSPixelPulse demos.
