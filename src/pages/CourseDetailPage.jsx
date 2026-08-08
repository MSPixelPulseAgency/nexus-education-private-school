import { ArrowRight, BookOpenCheck, CheckCircle2, Compass, ExternalLink, GraduationCap, Route } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import { CTASection, SectionHeading } from "../components/UI";
import { courses } from "../data/catalog";
import { brand } from "../data/site";
import NotFoundPage from "./NotFoundPage";

export default function CourseDetailPage() {
  const { slug } = useParams();
  const course = courses.find((item) => item.slug === slug);
  if (!course) return <NotFoundPage />;
  const related = courses.filter((item) => item.slug !== course.slug && (item.grade === course.grade || item.department === course.department)).slice(0, 3);
  const description = `Explore ${course.title} (${course.code}), a Grade ${course.grade} ${course.type} course listed in the Nexus Education catalogue.`;
  return (
    <>
      <Seo title={`${course.title} (${course.code}) | Nexus Education`} description={description} />
      <section className="course-detail-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/courses">Courses</Link><span>/</span><span aria-current="page">{course.code}</span></nav>
          <div className="course-hero-grid">
            <div><span className="eyebrow">GRADE {course.grade} · {course.type.toUpperCase()}</span><span className="course-code course-code-large">{course.code}</span><h1>{course.title}</h1><p>{description}</p><div className="button-row"><Link className="btn btn-primary" to={`/inquiry?course=${course.code}`}>Inquire About This Course <ArrowRight size={17} /></Link><Link className="btn btn-secondary" to="/academic-planning">Academic Planning</Link></div></div>
            <div className="course-snapshot"><span className="mini-label">COURSE SNAPSHOT</span><dl><div><dt>Course code</dt><dd>{course.code}</dd></div><div><dt>Grade</dt><dd>{course.grade}</dd></div><div><dt>Course type</dt><dd>{course.type}</dd></div><div><dt>Credit</dt><dd>{course.credit}</dd></div><div><dt>Department</dt><dd>{course.department}</dd></div></dl><div className="availability-note"><CheckCircle2 size={18} /><span><strong>Availability note</strong>Confirm current availability and eligibility with Nexus before registration.</span></div></div>
          </div>
        </div>
      </section>
      <Reveal as="section" className="section container course-detail-body">
        <article><SectionHeading eyebrow="COURSE OVERVIEW" title="Understand the Course in Context." /><p>{course.description} The public catalogue provides course-identification and pathway context without inventing detailed curriculum outcomes that are not available in the source data.</p><h2>Who this course may suit</h2><p>This course may be worth exploring if it fits your current grade, completed learning and future academic plan. A course title alone does not establish prerequisite eligibility or guarantee that it is the right fit.</p><h2>Prerequisite</h2><div className="notice-card"><BookOpenCheck size={22} /><div><strong>No prerequisite detail is listed in the current catalogue record.</strong><p>Ask Nexus to confirm the current prerequisite and your eligibility before registration.</p></div></div><h2>Pathway context</h2><p>Review how this course connects to your remaining credits, senior course sequence and possible university, college, graduation or career-exploration goals.</p></article>
        <aside><div className="planning-card"><Compass size={30} /><span className="mini-label">ACADEMIC PLANNING</span><h2>Check the full pathway.</h2><ul><li><GraduationCap size={17} />Current grade and credits</li><li><Route size={17} />Prerequisite chain</li><li><ExternalLink size={17} />Official program requirements</li></ul><Link className="btn btn-primary" to={`/inquiry?course=${course.code}`}>Ask About {course.code}</Link><a className="text-link" href={brand.lms} target="_blank" rel="noreferrer">Registered student LMS <ExternalLink size={15} /></a></div></aside>
      </Reveal>
      <Reveal as="section" className="section soft-section"><div className="container"><SectionHeading eyebrow="RELATED COURSES" title={`More Grade ${course.grade} Options`} /><div className="card-grid three">{related.map((item) => <CourseCard compact course={item} key={item.code} />)}</div></div></Reveal>
      <CTASection title={`Ask About ${course.code}.`} text="Share your current studies and goal so Nexus can help clarify the appropriate next step." />
    </>
  );
}
