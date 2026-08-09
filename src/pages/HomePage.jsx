import {
  ArrowLeft, ArrowRight, Atom, BookOpenCheck, Bot, BrainCircuit, BriefcaseBusiness,
  Calculator, ChevronRight, CircleUserRound, Code2, Compass, Cpu, GraduationCap,
  Headphones, Languages, Laptop2, Lightbulb, Landmark, Palette, ShieldCheck,
  Sparkles, Star, Target, UsersRound,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import CourseCard from "../components/CourseCard";
import FAQAccordion from "../components/FAQAccordion";
import NexusSearch from "../components/NexusSearch";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import { CTASection, SectionHeading } from "../components/UI";
import { homeBlogs as blogs, homeCourses as courses, homeGradeCounts as gradeCounts, homePopularCourses as featuredCourses } from "../data/homeCatalog";
import { faqGroups } from "../data/content";
import { images } from "../data/site";

const trustItems = [
  [GraduationCap, "Grades 9–12", "Four secondary grade levels"],
  [Compass, "Flexible Pathways", "Choices connected to next steps"],
  [CircleUserRound, "Student-Focused Support", "Clear routes when questions arise"],
  [Laptop2, "Modern Digital Learning", "Website-to-LMS continuity"],
];

const advantages = [
  [Compass, "Clear Academic Pathways", "See how grade, course type and prerequisites shape the next choice."],
  [Laptop2, "Flexible Learning", "Explore course options around real schedules and academic goals."],
  [Sparkles, "Modern Digital Experience", "Move from search to inquiry to the LMS with less friction."],
  [UsersRound, "Human Support", "Know exactly where to ask about courses, planning or access."],
  [BrainCircuit, "Future-Ready Skills", "Build problem solving, digital fluency and confident learning habits."],
  [BookOpenCheck, "Course Transparency", "Compare codes, grades, types, credits and pathway context clearly."],
];

const subjectLinks = [
  [Calculator, "Mathematics"],
  [Languages, "English"],
  [Atom, "Science"],
  [BriefcaseBusiness, "Business Studies"],
  [Code2, "Computer Studies"],
  [Landmark, "Social Sciences and Humanities"],
  [Cpu, "Technological Education"],
  [Palette, "The Arts"],
];

const preloadCoursesPage = () => import("./CoursesPage");

export default function HomePage() {
  const courseCarouselRef = useRef(null);
  const homeFaqs = Object.values(faqGroups).flat().filter((_, index) => [0, 1, 2, 4, 6, 9, 12].includes(index)).slice(0, 7);

  useEffect(() => {
    const schedule = window.requestIdleCallback || ((callback) => window.setTimeout(callback, 450));
    const cancel = window.cancelIdleCallback || window.clearTimeout;
    const handle = schedule(preloadCoursesPage);
    return () => cancel(handle);
  }, []);

  const scrollCourses = (direction) => {
    const carousel = courseCarouselRef.current;
    if (!carousel) return;
    carousel.scrollBy({ left: direction * Math.max(300, carousel.clientWidth * 0.86), behavior: "smooth" });
  };

  return (
    <>
      <Seo image={images.hero} />
      <section className="home-hero container">
        <div className="home-hero-copy">
          <span className="eyebrow"><Sparkles size={14} /> NEXUS EDUCATION PRIVATE SCHOOL</span>
          <h1>Your Future <span>Starts Here.</span></h1>
          <p>Explore Ontario secondary school credit courses in a modern learning environment built around clear pathways, flexible access and meaningful student support.</p>
          <div className="button-row">
            <Link className="btn btn-primary" to="/courses" onFocus={preloadCoursesPage} onPointerEnter={preloadCoursesPage}>Explore Courses <ArrowRight size={17} /></Link>
            <Link className="btn btn-secondary" to="/inquiry">Start an Inquiry</Link>
          </div>
          <div className="hero-chips" aria-label="Nexus highlights"><span>Grades 9–12</span><span>Ontario Credit Courses</span><span>Flexible Learning</span><span>Future Ready</span></div>
        </div>
        <div className="hero-visual">
          <div className="hero-photo"><img src={images.hero} alt="Diverse students collaborating around a laptop in a modern learning space" width="1600" height="1067" fetchPriority="high" decoding="async" /></div>
          <div className="hero-stat hero-stat-one"><span className="icon-bubble"><BookOpenCheck size={20} /></span><span><strong>{courses.length}</strong><small>Course records</small></span></div>
          <div className="hero-stat hero-stat-two"><span className="icon-bubble"><Target size={20} /></span><span><strong>Grades 9–12</strong><small>Clear pathways</small></span></div>
          <div className="hero-subjects" aria-hidden="true"><span>STEM</span><span>CODE</span><span>CREATE</span></div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Nexus experience highlights"><div className="container trust-grid">{trustItems.map(([Icon, title, text]) => <div key={title}><Icon size={21} /><span><strong>{title}</strong><small>{text}</small></span></div>)}</div></section>

      <Reveal as="section" className="section container">
        <div className="home-finder">
          <div className="home-finder-heading">
            <div><span className="eyebrow">INTERACTIVE NEXUS SEARCH</span><h2>Find a Course or Planning Answer.</h2><p>Search exact course codes, titles, departments, grades, resource pages and the Nexus Journal.</p></div>
            <Link className="text-link" to="/courses" onFocus={preloadCoursesPage} onPointerEnter={preloadCoursesPage}>View All Courses <ArrowRight size={16} /></Link>
          </div>
          <NexusSearch />
        </div>
      </Reveal>

      <Reveal as="section" className="section container popular-courses-section">
        <div className="carousel-heading"><SectionHeading eyebrow="POPULAR COURSES" title="High-Interest Ontario Courses." text="Explore eight frequently searched course records from the Nexus catalogue. Availability is always confirmed before enrollment." /><div className="carousel-controls" aria-label="Popular course carousel controls"><button type="button" aria-label="Show previous popular courses" onClick={() => scrollCourses(-1)}><ArrowLeft size={20} /></button><button type="button" aria-label="Show next popular courses" onClick={() => scrollCourses(1)}><ArrowRight size={20} /></button></div></div>
        <div className="course-carousel" ref={courseCarouselRef} role="region" aria-label="Popular courses" tabIndex="0">{featuredCourses.map((course) => <CourseCard course={course} key={course.code} />)}</div>
        <div className="carousel-hint"><span>Swipe or use the arrow controls to explore</span><Link className="text-link" to="/courses">View all {courses.length} courses <ArrowRight size={16} /></Link></div>
      </Reveal>

      <Reveal as="section" className="section soft-section">
        <div className="container"><SectionHeading eyebrow="BROWSE BY SUBJECT" title="Start With the Subject You Need." text="Jump into the complete catalogue with the department filter already applied." />
          <div className="subject-grid">{subjectLinks.map(([Icon, title]) => <Link key={title} to={`/courses?department=${encodeURIComponent(title)}`}><span className="icon-bubble"><Icon size={22} /></span><strong>{title}</strong><ArrowRight size={17} /></Link>)}</div>
        </div>
      </Reveal>

      <Reveal as="section" className="section container">
        <SectionHeading eyebrow="COURSES BY GRADE" title="Build Your Path One Year at a Time." text="Explore real catalogue counts and course options for each Ontario secondary grade." />
        <div className="grade-grid">{[9, 10, 11, 12].map((grade, index) => <Link className={`grade-card accent-${index + 1}`} to={`/courses/grade-${grade}`} key={grade}><span className="grade-number">{grade}</span><div><span className="mini-label">{gradeCounts[grade]} courses</span><h3>Grade {grade}</h3><p>{grade === 9 ? "Build a strong foundation and discover new interests." : grade === 10 ? "Strengthen core skills and start shaping your direction." : grade === 11 ? "Align course choices with future study and career goals." : "Complete credits and prerequisites for your next step."}</p><span className="text-link">Explore Grade {grade} <ArrowRight size={15} /></span></div></Link>)}</div>
      </Reveal>

      <Reveal as="section" className="section container">
        <SectionHeading eyebrow="WHY NEXUS" title="School Should Move You Forward." text="Every part of the experience is designed to make the next academic step easier to understand." />
        <div className="feature-grid">{advantages.map(([Icon, title, text], index) => <article className="feature-card" key={title}><span className="feature-index">0{index + 1}</span><span className="icon-bubble"><Icon size={21} /></span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </Reveal>

      <Reveal as="section" className="section container">
        <div className="future-panel">
          <div><span className="eyebrow eyebrow-dark"><Bot size={14} /> THE FUTURE OF EDUCATION</span><h2>Learn Today.<br />Lead Tomorrow.</h2><p>Build confidence, problem-solving skills, digital fluency and the ability to keep learning in a changing world.</p><Link className="btn btn-light" to="/about">Discover the Nexus Approach <ArrowRight size={17} /></Link></div>
          <div className="future-visual"><img src={images.science} alt="Students learning together in a modern science environment" width="1400" height="900" loading="lazy" decoding="async" /><div className="future-topics" aria-label="Future-ready learning themes">{["AI", "STEM", "CODE", "SCIENCE", "CREATE", "ENGINEERING"].map((topic) => <span key={topic}>{topic}</span>)}</div></div>
        </div>
      </Reveal>

      <Reveal as="section" className="section container">
        <SectionHeading eyebrow="STUDENT JOURNEY" title="From Goal to Course in Four Simple Steps." />
        <div className="journey-grid">{[["Tell Us Your Goal", "Share your grade, timing and what you want to accomplish."], ["Choose the Right Course", "Compare codes, course types and prerequisite context."], ["Start Learning", "Move into the digital learning environment when access is ready."], ["Keep Moving Forward", "Stay connected to the next credit, prerequisite or pathway goal."]].map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div>
      </Reveal>

      <Reveal as="section" className="section soft-section">
        <div className="container"><SectionHeading eyebrow="ACADEMIC PATHWAYS" title="Build the Path That Fits Your Goal." text="Explore several destinations without unsupported guarantees." />
          <div className="pathway-grid">{[[GraduationCap, "University"], [BookOpenCheck, "College"], [ShieldCheck, "Graduation"], [Target, "Prerequisite Upgrade"], [Lightbulb, "Career Exploration"]].map(([Icon, title]) => <Link key={title} to="/academic-planning"><span className="icon-bubble"><Icon size={22} /></span><strong>{title}</strong><ChevronRight size={17} /></Link>)}</div>
        </div>
      </Reveal>

      <Reveal as="section" className="section container support-split">
        <div className="support-image"><img src={images.mentoring} alt="Teacher supporting students in a bright classroom" width="1400" height="900" loading="lazy" decoding="async" /><div><Headphones size={22} /><span><strong>Questions are welcome.</strong><small>Find the right support path quickly.</small></span></div></div>
        <div><SectionHeading eyebrow="STUDENT SUPPORT" title="Support That Meets the Question." text="Get a clear route for course selection, prerequisite questions, academic planning, LMS support and postsecondary research." />
          <div className="support-links">{[["Course Selection", "/courses"], ["Prerequisite Questions", "/inquiry"], ["Academic Planning", "/academic-planning"], ["LMS Support", "/student-support"], ["Postsecondary Planning", "/academic-planning"]].map(([label, to]) => <Link key={label} to={to}>{label}<ArrowRight size={16} /></Link>)}</div>
          <Link className="btn btn-primary" to="/student-support">Explore Student Support</Link>
        </div>
      </Reveal>

      <Reveal as="section" className="section container">
        <div className="reviews-preview reviews-carousel" role="region" aria-label="Nexus review status">
          <div><span className="eyebrow">COMMUNITY FEEDBACK</span><h2>Be Among the First to Share Your Nexus Experience.</h2><p>No approved public reviews are displayed yet. Thoughtful feedback can help future students while moderation and privacy keep the space responsible.</p><Link className="btn btn-primary" to="/reviews">Share Your Experience <ArrowRight size={17} /></Link></div>
          <div className="review-empty-visual"><div aria-hidden="true">{[1,2,3,4,5].map((star) => <Star key={star} size={26} />)}</div><strong>No average shown until real reviews are approved.</strong><span><ShieldCheck size={17} /> Moderated before publishing</span><span><CircleUserRound size={17} /> Private email is not displayed</span></div>
        </div>
      </Reveal>

      <Reveal as="section" className="section soft-section">
        <div className="container"><SectionHeading eyebrow="NEXUS JOURNAL" title="Ideas That Move Students Forward." text="Practical guidance for course planning, learning habits and future pathways." />
          <div className="card-grid three">{blogs.slice(0, 3).map((post) => <BlogCard post={post} key={post.slug} />)}</div>
          <div className="section-action"><Link className="btn btn-secondary" to="/blog">Explore the Journal <ArrowRight size={17} /></Link></div>
        </div>
      </Reveal>

      <Reveal as="section" className="section container faq-home"><SectionHeading eyebrow="FREQUENTLY ASKED" title="Clear Answers, Without the Runaround." /><FAQAccordion items={homeFaqs} /><div className="section-action"><Link className="text-link" to="/faq">Browse every FAQ <ArrowRight size={16} /></Link></div></Reveal>
      <CTASection />
    </>
  );
}
