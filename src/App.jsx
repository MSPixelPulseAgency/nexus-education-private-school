import React, { useEffect, useMemo, useState } from 'react'
import courseRows from './data/courses.js'
import blogRows from './data/blogs.js'

const courses = courseRows.map(x => ({
  code: x.c,
  title: x.t,
  slug: x.s,
  grade: x.g,
  type: x.y || 'Ontario Credit',
  credit: 1,
  department: 'Ontario Credit Courses',
  description: `Explore ${x.t} (${x.c}), including grade level, course type and pathway information at Nexus Education Private School.`
}))

const blogs = blogRows.map((x, i) => ({
  title: x.t,
  slug: x.s,
  category: x.c,
  readTime: `${5 + (i % 5)} min read`,
  excerpt: 'Clear, practical guidance to help students and families make confident academic decisions.'
}))

const NAV = [
  ['Home', '/'], ['About', '/about'], ['Courses', '/courses'], ['Admissions', '/admissions'],
  ['Student Support', '/student-support'], ['Blog', '/blog'], ['Reviews', '/reviews'], ['Contact', '/contact']
]

function go(path) {
  history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function Link({ to, children, className = '' }) {
  return <a href={to} className={className} onClick={e => {
    if (to.startsWith('/')) { e.preventDefault(); go(to) }
  }}>{children}</a>
}

function Header() {
  const [open, setOpen] = useState(false)
  useEffect(() => setOpen(false), [location.pathname])
  return <>
    <header className="header-shell">
      <nav className="nav container">
        <Link to="/" className="brand"><span className="mark">NX</span><span>Nexus Education<small>Private School</small></span></Link>
        <div className="navlinks">{NAV.map(([n, p]) => <Link key={p} to={p}>{n}</Link>)}<a href="https://lms.nexuseps.com" target="_blank" rel="noreferrer">LMS</a></div>
        <Link to="/inquiry" className="btn primary navcta">Start Inquiry</Link>
        <button className="menubtn" onClick={() => setOpen(v => !v)} aria-label="Toggle menu" aria-expanded={open}>{open ? '×' : '☰'}</button>
      </nav>
    </header>
    {open && <div className="mobilemenu">{NAV.map(([n, p]) => <Link key={p} to={p}>{n}</Link>)}<a href="https://lms.nexuseps.com">LMS Login</a><Link to="/inquiry" className="btn primary">Start Inquiry</Link></div>}
  </>
}

function Footer() {
  return <footer className="footer">
    <div className="container footergrid">
      <div className="footerbrand"><div className="brand"><span className="mark">NX</span><span>Nexus Education<small>Private School</small></span></div><p>Modern Ontario secondary school learning built around clear pathways, flexible access and student progress.</p></div>
      <div><h4>Academics</h4><Link to="/courses">All Courses</Link><Link to="/courses/grade-9">Grade 9</Link><Link to="/courses/grade-10">Grade 10</Link><Link to="/courses/grade-11">Grade 11</Link><Link to="/courses/grade-12">Grade 12</Link></div>
      <div><h4>Students</h4><Link to="/student-support">Student Support</Link><Link to="/academic-planning">Academic Planning</Link><a href="https://lms.nexuseps.com">LMS Login</a><Link to="/faq">FAQ</Link></div>
      <div><h4>Nexus</h4><Link to="/about">About</Link><Link to="/blog">Blog</Link><Link to="/reviews">Reviews</Link><Link to="/contact">Contact</Link></div>
    </div>
    <div className="container footbottom"><span>© {new Date().getFullYear()} Nexus Education Private School.</span><span><Link to="/privacy">Privacy</Link> · <Link to="/terms">Terms</Link> · <Link to="/accessibility">Accessibility</Link></span></div>
  </footer>
}

function PageHero({ eyebrow, title, text, actions }) {
  return <section className="pagehero-wrap"><div className="pagehero container"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p>{actions && <div className="actions">{actions}</div>}</div></section>
}

function Title({ eye, title, text, center = false }) {
  return <div className={`title ${center ? 'title-center' : ''}`}><span className="eyebrow">{eye}</span><h2>{title}</h2>{text && <p>{text}</p>}</div>
}

function CTA({ title = 'Build Your Next Academic Move.', text = 'Tell us your course goal and we’ll help you identify the right next step.' }) {
  return <section className="cta container"><div><span className="eyebrow dark">READY FOR THE NEXT STEP?</span><h2>{title}</h2><p>{text}</p></div><Link to="/inquiry" className="btn light">Start an Inquiry →</Link></section>
}

function StatStrip() {
  return <section className="trust"><div className="container trustgrid">
    {[['Grades 9–12','Pathways across Ontario secondary grades'],['148+','Course records in the current catalogue'],['Flexible','Course discovery and online access'],['Student First','Clear guidance at every next step']].map(([a,b]) => <div key={a}><strong>{a}</strong><span>{b}</span></div>)}
  </div></section>
}

function Home() {
  const featured = courses.filter(c => ['MHF4U','ENG4U','SPH4U','SBI4U','SCH4U','ICS4U'].includes(c.code)).slice(0, 6)
  return <>
    <section className="hero container">
      <div className="hero-copy"><span className="eyebrow">NEXUS EDUCATION PRIVATE SCHOOL</span><h1>Your Future <span>Starts Here.</span></h1><p className="lead">Explore Ontario secondary school credit courses in a modern learning experience designed around clarity, flexibility and meaningful student support.</p><div className="actions"><Link to="/courses" className="btn primary">Explore Courses →</Link><Link to="/inquiry" className="btn secondary">Start an Inquiry</Link></div><div className="chips"><span>Grades 9–12</span><span>Ontario Credit Courses</span><span>Flexible Learning</span><span>Future Ready</span></div></div>
      <div className="heroart"><div className="hero-panel"><div className="hero-orb orb-a"></div><div className="hero-orb orb-b"></div><div className="screen"><span>STEM</span><span>CODE</span><span>SCIENCE</span></div><div className="desk"></div><div className="student s1"></div><div className="student s2"></div><div className="laptop">N</div></div><div className="float f1"><strong>148+</strong><span>course records</span></div><div className="float f2"><strong>Grade 9–12</strong><span>pathway planning</span></div></div>
    </section>
    <StatStrip/>
    <section className="section container"><Title eye="COURSE FINDER" title="Find Your Next Course" text="Search by course code, title, grade or subject area."/><Link to="/courses" className="finder"><span>Search MHF4U, English, Grade 12…</span><b>Search Courses →</b></Link></section>
    <section className="section container"><Title eye="WHY NEXUS" title="School Should Move You Forward." text="A clear, polished journey from course discovery to learning access."/><div className="grid four">{[['01','Clear Academic Pathways','Understand what comes next and how courses fit your plan.'],['02','Flexible Learning','Make progress with learning options designed for real schedules.'],['03','Modern Digital Experience','Move from discovery to your LMS with less friction.'],['04','Human Support','Get clear guidance when choosing courses or prerequisites.']].map(([n,t,d]) => <div className="card feature" key={t}><span className="feature-num">{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div></section>
    <section className="section soft"><div className="container"><Title eye="EXPLORE" title="Courses by Grade" text="Build your path one year at a time."/><div className="grid four">{[9,10,11,12].map(g => <Link key={g} to={`/courses/grade-${g}`} className="gradecard"><span>0{g}</span><h3>Grade {g}</h3><p>{g===9?'Build a strong foundation and discover your interests.':g===10?'Strengthen core skills and begin shaping your direction.':g===11?'Choose courses aligned with future study and career goals.':'Complete credits and prerequisites supporting your next step.'}</p><b>Explore Grade {g} →</b></Link>)}</div></div></section>
    <section className="section container"><Title eye="FEATURED COURSES" title="Popular Future-Ready Learning" text="Browse a selection from the current Nexus course catalogue."/><div className="grid three">{featured.map(c => <CourseCard c={c} key={c.code}/>)}</div></section>
    <section className="section"><div className="container future"><div><span className="eyebrow dark">THE FUTURE OF EDUCATION</span><h2>Learn Today. Lead Tomorrow.</h2><p>Build confidence, problem-solving skills, digital fluency and the ability to keep learning in a changing world.</p><Link to="/about" className="btn light">Discover Nexus →</Link></div><div className="future-grid"><span>AI</span><span>STEM</span><span>CODE</span><span>CREATE</span></div></div></section>
    <section className="section container"><Title eye="FROM THE BLOG" title="Ideas for Smarter Academic Planning"/><div className="grid three">{blogs.slice(0,6).map(p => <BlogCard p={p} key={p.slug}/>)}</div><div className="center"><Link to="/blog" className="btn secondary">Explore All Articles</Link></div></section>
    <CTA/>
  </>
}

function CourseCard({ c }) {
  return <Link to={`/courses/${c.slug}`} className="card course"><div className="course-top"><span className="code">{c.code}</span><span className="course-arrow">↗</span></div><h3>{c.title}</h3><div className="meta"><span>Grade {c.grade}</span><span>{c.type}</span><span>{c.credit} credit</span></div><p>{c.description}</p><b>View course details →</b></Link>
}

function CourseCatalogue({ grade }) {
  const [q,setQ] = useState('')
  const list = useMemo(() => courses.filter(c => (!grade || c.grade === Number(grade)) && (!q || `${c.code} ${c.title} ${c.type}`.toLowerCase().includes(q.toLowerCase()))), [q,grade])
  return <><PageHero eyebrow="ACADEMICS" title={grade ? `Grade ${grade} Courses` : 'Ontario Credit Courses'} text="Search course codes, titles and grade levels in the Nexus catalogue." actions={<><Link to="/inquiry" className="btn primary">Ask About a Course</Link><Link to="/academic-planning" className="btn secondary">Plan Your Path</Link></>}/><section className="section container"><div className="filterbar"><div className="searchbox"><span>⌕</span><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search MHF4U, English, Science…"/></div><div className="result-pill">{list.length} courses</div></div><div className="grid three">{list.map(c => <CourseCard c={c} key={c.code}/>)}</div>{!list.length && <div className="empty-state"><h3>No courses found</h3><p>Try another course code, title or subject.</p></div>}</section><CTA/></>
}

function CourseDetail({ slug }) {
  const c = courses.find(x => x.slug === slug)
  if (!c) return <NotFound/>
  return <><PageHero eyebrow={`GRADE ${c.grade} · ${c.type}`} title={`${c.title} | ${c.code}`} text={c.description} actions={<Link to={`/inquiry?course=${c.code}`} className="btn primary">Inquire About This Course</Link>}/><section className="section container detailgrid"><div className="card detail-card"><span className="mini-label">COURSE SNAPSHOT</span><h2>Course Details</h2><dl><dt>Course Code</dt><dd>{c.code}</dd><dt>Grade</dt><dd>{c.grade}</dd><dt>Course Type</dt><dd>{c.type}</dd><dt>Credit</dt><dd>{c.credit}</dd><dt>Department</dt><dd>{c.department}</dd></dl></div><div className="card detail-card"><span className="mini-label">BEFORE YOU START</span><h2>Prerequisite</h2><p>{c.prerequisite || 'No prerequisite information is currently listed.'}</p><div className="notice">Course availability and prerequisite eligibility should be confirmed with Nexus before registration.</div><Link to={`/inquiry?course=${c.code}`} className="btn primary">Start Course Inquiry</Link></div></section><CTA/></>
}

function About() {
  return <><PageHero eyebrow="ABOUT NEXUS" title="A Modern School Built Around Student Progress." text="Nexus Education Private School is designed around clear academic choices, thoughtful support and a modern digital learning experience." actions={<><Link to="/courses" className="btn primary">Explore Courses</Link><Link to="/inquiry" className="btn secondary">Start an Inquiry</Link></>}/><section className="section container split"><div><span className="eyebrow">OUR APPROACH</span><h2>Clarity before complexity.</h2><p className="lead-small">Students should understand what they are taking, why it matters, and what comes next. Nexus brings course discovery, pathway thinking and digital learning together in a cleaner experience.</p></div><div className="value-stack">{[['01','Clarity','Make academic information easier to understand.'],['02','Progress','Keep every course choice connected to the next milestone.'],['03','Curiosity','Encourage learning beyond minimum requirements.'],['04','Respect','Build a supportive, student-centred experience.']].map(([n,t,d]) => <div className="value-row" key={t}><span>{n}</span><div><h3>{t}</h3><p>{d}</p></div></div>)}</div></section><section className="section soft"><div className="container"><Title eye="THE NEXUS EXPERIENCE" title="Designed Around Real Student Questions" center/><div className="grid three">{[['What should I take next?','Course information and pathway context help students make better next-step decisions.'],['How does this fit my goal?','Course discovery connects back to grade level, prerequisites and future planning.'],['Where do I go for help?','Support, inquiry and LMS access are easy to find from any device.']].map(([t,d]) => <div className="card" key={t}><h3>{t}</h3><p>{d}</p></div>)}</div></div></section><CTA title="See Where Nexus Can Take You."/></>
}

function Admissions() {
  const steps=[['01','Tell us your goal','Share your current grade, course need or pathway goal.'],['02','Review the right course','Check the course code, grade level and prerequisite information.'],['03','Confirm your next step','Nexus can clarify questions before registration.'],['04','Start learning','Move into the LMS once your course access is ready.']]
  return <><PageHero eyebrow="ADMISSIONS" title="Start With the Right Next Step." text="A simple admissions journey begins with understanding what you need and confirming the right course path." actions={<Link to="/inquiry" className="btn primary">Start an Inquiry</Link>}/><section className="section container"><Title eye="HOW IT WORKS" title="A Clear Four-Step Journey"/><div className="steps-grid">{steps.map(([n,t,d]) => <div className="step-card" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div></section><section className="section soft"><div className="container split"><div><Title eye="BEFORE YOU INQUIRE" title="Have these details ready"/><div className="checklist">{['Current grade','Course code or subject of interest','Any prerequisite information you already have','Your academic or postsecondary goal','Preferred contact details'].map(x => <div key={x}>✓ {x}</div>)}</div></div><div className="card premium-card"><span className="mini-label">NEED GUIDANCE?</span><h3>Not sure which course code you need?</h3><p>That is completely okay. Use the inquiry form to explain your goal and Nexus can help you narrow down the right option.</p><Link to="/inquiry" className="btn primary">Ask Nexus →</Link></div></div></section><CTA/></>
}

function StudentSupport() {
  return <><PageHero eyebrow="STUDENT SUPPORT" title="Questions Are Part of Progress." text="Find the right support path for course selection, prerequisites, LMS access and academic planning."/><section className="section container"><div className="grid four">{[['Course Selection','Compare codes and grade levels before choosing.','/courses'],['Prerequisite Questions','Understand what should come before your next course.','/inquiry'],['Academic Planning','Map current choices against future goals.','/academic-planning'],['LMS Support','Access your learning environment securely.','https://lms.nexuseps.com']].map(([t,d,to]) => <a className="card support-card" href={to} key={t}><span className="support-icon">+</span><h3>{t}</h3><p>{d}</p><b>Get support →</b></a>)}</div></section><section className="section soft"><div className="container"><Title eye="STUDENT TOOLKIT" title="Useful Places to Start"/><div className="resource-grid"><Link to="/courses">Browse all courses <span>→</span></Link><Link to="/faq">Read common questions <span>→</span></Link><Link to="/blog">Explore planning guides <span>→</span></Link><a href="https://lms.nexuseps.com">Open Nexus LMS <span>↗</span></a></div></div></section><CTA/></>
}

function BlogCard({ p, featured = false }) {
  return <Link to={`/blog/${p.slug}`} className={`card article ${featured ? 'article-featured' : ''}`}><div className="article-top"><span className="category">{p.category}</span><span>{p.readTime}</span></div><h3>{p.title}</h3><p>{p.excerpt}</p><b>Read article →</b></Link>
}

function Blog() {
  const [q,setQ] = useState('')
  const [cat,setCat] = useState('')
  const cats=[...new Set(blogs.map(b=>b.category))].sort()
  const list=blogs.filter(b=>(!q||b.title.toLowerCase().includes(q.toLowerCase()))&&(!cat||b.category===cat))
  return <><PageHero eyebrow="NEXUS JOURNAL" title="Ideas That Move Students Forward." text="Practical guides for Ontario course planning, study skills, online learning, parents and future pathways."/><section className="section container"><div className="blog-feature"><div><span className="eyebrow">FEATURED GUIDE</span><h2>{blogs[0]?.title}</h2><p>{blogs[0]?.excerpt}</p><Link to={`/blog/${blogs[0]?.slug}`} className="btn primary">Read Featured Guide</Link></div><div className="blog-visual"><span>N</span><small>Knowledge for what comes next.</small></div></div><div className="filterbar blog-filter"><div className="searchbox"><span>⌕</span><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search articles…"/></div><select value={cat} onChange={e=>setCat(e.target.value)}><option value="">All categories</option>{cats.map(c=><option key={c}>{c}</option>)}</select><div className="result-pill">{list.length} articles</div></div><div className="grid three">{list.map(p=><BlogCard p={p} key={p.slug}/>)}</div></section></>
}

function BlogDetail({ slug }) {
  const p=blogs.find(x=>x.slug===slug)
  if(!p) return <NotFound/>
  const related=blogs.filter(x=>x.slug!==slug&&x.category===p.category).slice(0,3)
  return <><PageHero eyebrow={p.category} title={p.title} text={p.excerpt}/><article className="articlebody container"><div className="article-meta"><span>Nexus Education Team</span><span>{p.readTime}</span><span>Updated for current planning use</span></div><p className="article-lead">Strong academic decisions become easier when students understand their options, prerequisites and next steps.</p><h2>Start with your goal</h2><p>Before choosing a course, identify what you are trying to accomplish. That may be completing a required credit, preparing for a future course, meeting a postsecondary prerequisite or strengthening a subject area.</p><div className="article-callout"><strong>Quick tip</strong><p>Write down your target program, course code or next milestone before comparing options. It makes course planning much clearer.</p></div><h2>Check the details carefully</h2><p>Review the course code, grade level, course type, credit value and prerequisite information. If a requirement is unclear, ask for guidance before registering.</p><h2>Build a realistic plan</h2><p>A good plan considers your full workload, deadlines and future pathway—not only one course in isolation. Leave room for revision, questions and support.</p><h2>Use support early</h2><p>Course planning is easier when questions are answered before deadlines become urgent. Nexus provides an inquiry path for students and families who need help identifying the next best step.</p><div className="articlecta"><div><span className="mini-label">NEED PERSONAL GUIDANCE?</span><h3>Tell us what you are trying to achieve.</h3></div><Link to="/inquiry" className="btn primary">Start an Inquiry →</Link></div></article>{related.length>0&&<section className="section soft"><div className="container"><Title eye="KEEP READING" title="Related Guides"/><div className="grid three">{related.map(x=><BlogCard p={x} key={x.slug}/>)}</div></div></section>}</>
}

function Reviews() {
  return <><PageHero eyebrow="REVIEWS" title="Share Your Nexus Experience." text="Feedback helps build a better student experience. Reviews can be moderated before they appear publicly."/><section className="section container reviews-layout"><div className="review-summary"><span className="eyebrow">COMMUNITY FEEDBACK</span><h2>Your experience matters.</h2><p>Share what was helpful, what could be clearer, and what future students should know.</p><div className="review-points"><span>✓ Moderated before publishing</span><span>✓ Email never displayed publicly</span><span>✓ Mobile-friendly submission</span></div></div><ReviewForm/></section></>
}

function ReviewForm() {
  return <form className="formcard modern-form" onSubmit={e=>e.preventDefault()}><div className="form-head"><span className="mini-label">SUBMIT A REVIEW</span><h3>Tell us about your experience</h3></div><div className="formgrid"><label>First name<input required placeholder="Your first name"/></label><label>Email<input required type="email" placeholder="you@example.com"/></label><label>Rating<select defaultValue="5"><option value="5">5 — Excellent</option><option value="4">4 — Very good</option><option value="3">3 — Good</option><option value="2">2 — Fair</option><option value="1">1 — Needs improvement</option></select></label><label>Course / Program<input placeholder="Optional"/></label><label className="wide">Review<textarea rows="6" required placeholder="What would you like future students or families to know?"/></label><label className="check wide"><input type="checkbox" required/><span>I consent to Nexus processing this submission for review moderation.</span></label><div className="wide form-actions"><button className="btn primary" type="submit">Submit for Moderation →</button><span className="formnote">Live delivery will activate once production email/database credentials are connected.</span></div></div></form>
}

function Inquiry() {
  return <><PageHero eyebrow="INQUIRY" title="Tell Us What You Need." text="Share your current grade, course interest and academic goal. Nexus can use this information to help identify the right next step."/><section className="section container form-layout"><div className="form-side"><span className="eyebrow">BEFORE YOU START</span><h2>Make your inquiry more useful.</h2><p>Include your current grade, course code if known, and the goal you are working toward.</p><div className="review-points"><span>01 Current grade</span><span>02 Course or subject</span><span>03 Academic goal</span><span>04 Preferred contact method</span></div></div><form className="formcard modern-form" onSubmit={e=>e.preventDefault()}><div className="formgrid"><label>First name<input required/></label><label>Last name<input required/></label><label>Email<input type="email" required/></label><label>Phone<input type="tel"/></label><label>Current grade<select defaultValue=""><option value="">Select grade</option>{[9,10,11,12].map(g=><option key={g}>{g}</option>)}</select></label><label>Course code / subject<input placeholder="e.g. MHF4U or Mathematics"/></label><label className="wide">What are you trying to achieve?<textarea rows="6" placeholder="Tell us about your course need, prerequisite, deadline or pathway goal."/></label><label className="check wide"><input type="checkbox" required/><span>I consent to Nexus contacting me about this inquiry.</span></label><div className="wide form-actions"><button className="btn primary">Send Inquiry →</button><span className="formnote">Submission delivery will activate with production form credentials.</span></div></div></form></section></>
}

function Contact() {
  return <><PageHero eyebrow="CONTACT" title="A Clear Answer Starts With a Good Question." text="Use the contact form for general school, course, admissions, LMS or accessibility questions."/><section className="section container contact-grid"><div className="contact-stack">{[['Course Questions','Ask about course codes, grade levels or prerequisites.'],['Admissions','Get help understanding the next registration step.'],['LMS Support','For learning-platform access and technical questions.'],['Website Accessibility','Tell us if something on the site is difficult to use.']].map(([t,d])=><div className="contact-card" key={t}><h3>{t}</h3><p>{d}</p></div>)}</div><form className="formcard modern-form" onSubmit={e=>e.preventDefault()}><div className="formgrid"><label>Name<input required/></label><label>Email<input type="email" required/></label><label className="wide">Topic<select defaultValue="Course Question"><option>Course Question</option><option>Admissions</option><option>LMS Support</option><option>Academic Planning</option><option>Website Accessibility</option><option>Other</option></select></label><label className="wide">Message<textarea rows="7" required/></label><label className="check wide"><input type="checkbox" required/><span>I consent to Nexus contacting me about this message.</span></label><div className="wide form-actions"><button className="btn primary">Send Message →</button></div></div></form></section></>
}

function FAQ() {
  const qs=[['What grades does Nexus serve?','The public course catalogue is organized around Ontario secondary school Grades 9 through 12.'],['How do I find a course by code?','Use the Courses page search box and type a code such as MHF4U.'],['How can I check a prerequisite?','Open a course detail page and review the prerequisite section, then contact Nexus if eligibility is unclear.'],['Where do students log in?','Use the LMS link in the main navigation to access the Nexus learning environment.'],['What if I am not sure which course I need?','Use the inquiry form and explain your academic goal. You do not need to know the exact course code before asking for guidance.']]
  return <><PageHero eyebrow="FAQ" title="Quick Answers for Common Questions." text="Start here for course, pathway, LMS and inquiry questions."/><section className="section container faq">{qs.map(([q,a])=><details key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</section><CTA/></>
}

function InfoPage({ path }) {
  const pages={
    '/academic-planning':['ACADEMIC PLANNING','Make Every Course Choice Count.','Map today’s course decisions against future prerequisites, graduation needs and postsecondary goals.',[['Start with your destination','Write down the program, field or next course you are aiming for.'],['Work backward','Identify prerequisites and grade-level requirements before choosing.'],['Check your workload','Balance academic ambition with a realistic schedule.'],['Review before deadlines','Leave time to ask questions and adjust your plan.']]],
    '/online-learning':['ONLINE LEARNING','Learning That Fits Your Schedule.','A modern digital experience helps students access course content, manage progress and stay organized.',[['Prepare your setup','Use a reliable browser, internet connection and a focused study space.'],['Build a routine','Schedule consistent study blocks instead of waiting for deadlines.'],['Use the LMS intentionally','Check course updates, activities and deadlines regularly.'],['Ask early','Questions are easier to solve before they become urgent.']]],
    '/privacy':['PRIVACY','Privacy Matters.','Nexus aims to collect only information needed to provide website, inquiry and communication services.',[['Information you submit','Inquiry, contact and review forms may collect contact details you choose to provide.'],['How it is used','Information is used to respond, moderate submissions and support website operations.'],['Public display','Private contact information should not be displayed in public reviews or comments.'],['Questions','Contact Nexus if you have a privacy-related website question.']]],
    '/terms':['TERMS','Website Terms of Use.','Use this website for legitimate information, course discovery and communication purposes.',[['Information accuracy','Course availability and operational details should be confirmed before relying on them for registration decisions.'],['Acceptable use','Do not misuse forms, interfere with the site or submit unlawful content.'],['External services','The LMS and third-party services may have their own terms.'],['Updates','Website information may be revised as school services evolve.']]],
    '/accessibility':['ACCESSIBILITY','Designed to Be Easier to Use.','Nexus aims for a website experience that works across devices, keyboards and assistive technologies.',[['Keyboard access','Navigation and forms should remain usable without a mouse.'],['Readable contrast','Text and controls are designed for clear visual contrast.'],['Responsive layouts','Pages adapt across desktop, tablet and mobile sizes.'],['Report a barrier','Use the contact form to tell us about an accessibility problem.']]],
    '/why-nexus':['WHY NEXUS','Your Path. Your Pace. Your Potential.','A modern academic experience should make important next steps easier to understand.',[['Clear pathways','Course details are structured around grades, codes and next-step planning.'],['Easy course discovery','Search and grade-based browsing reduce friction.'],['Student support','Questions have clear routes to inquiry and support.'],['Modern experience','A responsive digital journey connects the website to the LMS.']]],
    '/policies':['POLICIES','Clear Expectations. Better Learning.','A central location for school expectations, academic integrity, attendance and other student policies.',[['Academic integrity','Students should complete work honestly and follow course expectations.'],['Attendance & participation','Students should follow the requirements communicated for their learning format.'],['Assessment','Course-specific assessment expectations should be reviewed inside the LMS.'],['Questions','Contact Nexus if a policy requirement needs clarification.']]]
  }
  const x=pages[path]
  if(!x)return <NotFound/>
  return <><PageHero eyebrow={x[0]} title={x[1]} text={x[2]}/><section className="section container"><div className="grid two">{x[3].map(([t,d],i)=><div className="card info-card" key={t}><span className="feature-num">0{i+1}</span><h3>{t}</h3><p>{d}</p></div>)}</div></section>{!['/privacy','/terms','/accessibility'].includes(path)&&<CTA/>}</>
}

function NotFound(){return <><PageHero eyebrow="404" title="That page moved—or never existed." text="Use the navigation or return to the homepage." actions={<Link to="/" className="btn primary">Back Home</Link>}/></>}

function Router(){
  const [path,setPath]=useState(location.pathname)
  useEffect(()=>{const h=()=>setPath(location.pathname);addEventListener('popstate',h);return()=>removeEventListener('popstate',h)},[])
  if(path==='/')return <Home/>
  if(path==='/about')return <About/>
  if(path==='/admissions')return <Admissions/>
  if(path==='/student-support')return <StudentSupport/>
  if(path==='/blog')return <Blog/>
  if(path.startsWith('/blog/'))return <BlogDetail slug={path.split('/').pop()}/>
  if(path==='/reviews')return <Reviews/>
  if(path==='/inquiry')return <Inquiry/>
  if(path==='/contact')return <Contact/>
  if(path==='/faq')return <FAQ/>
  if(path==='/courses')return <CourseCatalogue/>
  const gm=path.match(/^\/courses\/grade-(9|10|11|12)$/);if(gm)return <CourseCatalogue grade={gm[1]}/>
  if(path.startsWith('/courses/'))return <CourseDetail slug={path.split('/').pop()}/>
  if(['/academic-planning','/online-learning','/privacy','/terms','/accessibility','/why-nexus','/policies'].includes(path))return <InfoPage path={path}/>
  return <NotFound/>
}

export default function App(){return <><Header/><main><Router/></main><Footer/></>}
