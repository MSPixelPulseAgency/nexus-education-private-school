import { ArrowLeft, ArrowRight, BookOpenCheck, CheckCircle2, ClipboardList, ExternalLink } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import { CTASection, SectionHeading } from "../components/UI";
import { courses } from "../data/catalog";
import { getCourseVisual } from "../data/site";
import NotFoundPage from "./NotFoundPage";

export default function CourseOutlinePage() {
  const { slug } = useParams();
  const course = courses.find((item) => item.slug === slug);
  if (!course) return <NotFoundPage />;
  const visual = getCourseVisual(course.department);

  return (
    <>
      <Seo title={`${course.title} | ${course.code} Course Outline | Nexus Education`} description={`Review the public ${course.code} ${course.title} course outline, prerequisite, course type and LMS section sequence from the Nexus catalogue.`} image={visual} />
      <section className="outline-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/courses">Courses</Link><span>/</span><Link to={`/courses/${course.slug}`}>{course.code}</Link><span>/</span><span aria-current="page">Outline</span></nav>
          <div className="outline-hero-grid">
            <div><span className="eyebrow"><ClipboardList size={14} /> COURSE OUTLINE</span><span className="course-code course-code-large">{course.code}</span><h1>{course.title}</h1><p>This outline mirrors the section headings in the current Nexus LMS record and keeps availability, eligibility and final delivery details subject to confirmation.</p><div className="button-row"><Link className="btn btn-primary" to={`/inquiry?course=${course.code}`}>Ask About {course.code} <ArrowRight size={17} /></Link><Link className="btn btn-secondary" to={`/courses/${course.slug}`}><ArrowLeft size={17} /> Course Page</Link></div></div>
            <div className="course-visual-card"><img src={visual} alt={`${course.department} learning environment for ${course.title}`} fetchPriority="high" /><div><span>{course.department}</span><strong>{course.code}</strong></div></div>
          </div>
        </div>
      </section>

      <Reveal as="section" className="section container outline-layout">
        <article>
          <SectionHeading eyebrow="LMS SEQUENCE" title="Course Sections at a Glance." text="The headings below come from the Nexus LMS catalogue. Strand labels remain intentionally general where the source record does not name a more specific unit." />
          <ol className="outline-list">
            {course.outline.map((section, index) => <li key={`${course.code}-${section}-${index}`}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{section}</h2><p>{index === 0 ? "Orientation, course information and communication for this course record." : index === course.outline.length - 1 ? "The final section shown in the current LMS sequence." : "A structured learning section in the current LMS course outline."}</p></div></li>)}
          </ol>
        </article>
        <aside>
          <div className="outline-facts">
            <BookOpenCheck size={28} />
            <span className="mini-label">COURSE FACTS</span>
            <dl><div><dt>Grade</dt><dd>{course.grade}</dd></div><div><dt>Type</dt><dd>{course.type}</dd></div><div><dt>Credit</dt><dd>{course.credit}</dd></div><div><dt>Prerequisite</dt><dd>{course.prerequisite}</dd></div></dl>
            <div className="availability-note"><CheckCircle2 size={18} /><span><strong>Confirm before registering</strong>The catalogue record does not guarantee current availability or individual eligibility.</span></div>
            {course.sourceUrl && <a className="text-link" href={course.sourceUrl} target="_blank" rel="noreferrer">Ontario curriculum source <ExternalLink size={15} /></a>}
          </div>
        </aside>
      </Reveal>
      <CTASection title={`Plan Your Next Step With ${course.code}.`} text="Share your completed courses and goal so the prerequisite and current availability can be confirmed." />
    </>
  );
}
