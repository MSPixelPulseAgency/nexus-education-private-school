import { ArrowRight, BookOpenCheck, CheckCircle2, ClipboardList, Compass, ExternalLink, GraduationCap, Route } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import { CTASection, SectionHeading } from "../components/UI";
import { courses } from "../data/catalog";
import { brand, getCourseVisual } from "../data/site";
import NotFoundPage from "./NotFoundPage";

export default function CourseDetailPage() {
  const { slug } = useParams();
  const course = courses.find((item) => item.slug === slug);
  if (!course) return <NotFoundPage />;

  const visual = getCourseVisual(course.department);
  const related = courses
    .filter((item) => item.slug !== course.slug && item.department === course.department)
    .sort((a, b) => Math.abs(a.grade - course.grade) - Math.abs(b.grade - course.grade) || a.code.localeCompare(b.code))
    .slice(0, 3);
  const description = `${course.title} | ${course.code} is a Grade ${course.grade} ${course.type} course record in the Nexus Education catalogue. Review its prerequisite, overview and outline.`;

  return (
    <>
      <Seo title={`${course.title} | ${course.code} | Nexus Education`} description={description} image={visual} />
      <section className="course-detail-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/courses">Courses</Link><span>/</span><span aria-current="page">{course.code}</span></nav>
          <div className="course-hero-grid">
            <div className="course-hero-copy">
              <span className="eyebrow">GRADE {course.grade} · {course.type.toUpperCase()}</span>
              <span className="course-code course-code-large">{course.code}</span>
              <h1>{course.title} <span>| {course.code}</span></h1>
              <p>{course.description}</p>
              <div className="button-row"><Link className="btn btn-primary" to={`/inquiry?course=${course.code}`}>Inquire About This Course <ArrowRight size={17} /></Link><Link className="btn btn-secondary" to={`/courses/${course.slug}/outline`}><ClipboardList size={17} /> View Course Outline</Link></div>
            </div>
            <div className="course-hero-side">
              <div className="course-visual-card"><img src={visual} alt={`${course.department} learning environment related to ${course.title}`} fetchPriority="high" /><div><span>{course.department}</span><strong>{course.code}</strong></div></div>
              <div className="course-snapshot"><span className="mini-label">COURSE SNAPSHOT</span><dl><div><dt>Grade</dt><dd>{course.grade}</dd></div><div><dt>Course type</dt><dd>{course.type}</dd></div><div><dt>Credit</dt><dd>{course.credit}</dd></div><div><dt>Department</dt><dd>{course.department}</dd></div></dl></div>
            </div>
          </div>
        </div>
      </section>

      <Reveal as="section" className="section container course-detail-body">
        <article>
          <SectionHeading eyebrow="COURSE OVERVIEW" title="Understand the Course in Context." />
          <p className="large-copy">{course.description}</p>
          <h2>Prerequisite</h2>
          <div className="notice-card"><BookOpenCheck size={22} /><div><strong>{course.prerequisite}</strong><p>Confirm that this prerequisite and the course’s current eligibility rules apply to your record before registration.</p></div></div>
          <h2>Course outline</h2>
          <p>The separate outline page mirrors the current LMS section sequence for {course.code}. It does not replace registration confirmation or course-specific instructions inside the LMS.</p>
          <Link className="outline-link-card" to={`/courses/${course.slug}/outline`}><span className="icon-bubble"><ClipboardList size={22} /></span><span><strong>Open the {course.code} course outline</strong><small>{course.outline.length} LMS sections listed</small></span><ArrowRight size={18} /></Link>
          {course.sourceUrl && <><h2>Curriculum source</h2><p>Use the linked Ontario curriculum page alongside Nexus guidance when checking official course context.</p><a className="text-link" href={course.sourceUrl} target="_blank" rel="noreferrer">Open Ontario curriculum source <ExternalLink size={15} /></a></>}
        </article>
        <aside>
          <div className="planning-card"><Compass size={30} /><span className="mini-label">ACADEMIC PLANNING</span><h2>Check the full pathway.</h2><ul><li><GraduationCap size={17} />Current grade and credits</li><li><Route size={17} />Prerequisite chain</li><li><ExternalLink size={17} />Official program requirements</li></ul><div className="availability-note"><CheckCircle2 size={18} /><span><strong>{course.offeringStatus}</strong>The catalogue record does not guarantee current availability or individual eligibility.</span></div><Link className="btn btn-primary" to={`/inquiry?course=${course.code}`}>Ask About {course.code}</Link><a className="text-link" href={brand.lms} target="_blank" rel="noreferrer">Registered student LMS <ExternalLink size={15} /></a></div>
        </aside>
      </Reveal>

      <Reveal as="section" className="section soft-section"><div className="container"><SectionHeading eyebrow="RELATED COURSES" title={`More ${course.department} Options`} text="Compare nearby catalogue records, then confirm the prerequisite sequence and current availability." /><div className="card-grid three">{related.map((item) => <CourseCard compact course={item} key={item.code} />)}</div></div></Reveal>
      <CTASection title={`Ask About ${course.code}.`} text="Share your current studies and goal so Nexus can help clarify the appropriate next step." />
    </>
  );
}
