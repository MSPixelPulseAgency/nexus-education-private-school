import { ArrowLeft, ArrowRight, BookOpenCheck, CheckCircle2, ClipboardList, ExternalLink, GraduationCap } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddToCartButton from "../components/AddToCartButton";
import FAQAccordion from "../components/FAQAccordion";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import { CTASection, CheckList, SectionHeading } from "../components/UI";
import useCart from "../hooks/useCart";
import courseRows from "../data/courses";
import { getCurriculumUrl, learningHighlights, outlineDescription } from "../data/curriculum";
import { brand, getCourseVisual } from "../data/site";
import NotFoundPage from "./NotFoundPage";

export default function CourseOutlinePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addCourse } = useCart();
  const course = courseRows.find((item) => item.slug === slug);
  if (!course) return <NotFoundPage />;
  const visual = getCourseVisual(course);
  const highlights = learningHighlights(course);
  const curriculumUrl = getCurriculumUrl(course);
  const canonical = `${brand.canonical}/courses/${course.slug}/outline`;
  const enrollCourse = () => { addCourse(course); navigate("/enroll"); };
  const schema = [
    { "@context": "https://schema.org", "@type": "Course", name: `${course.code} ${course.title} Course Outline`, description: course.description, courseCode: course.code, provider: { "@type": "EducationalOrganization", name: brand.name, url: brand.canonical }, url: canonical },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${brand.canonical}/` }, { "@type": "ListItem", position: 2, name: "Courses", item: `${brand.canonical}/courses` }, { "@type": "ListItem", position: 3, name: `${course.code} ${course.title}`, item: `${brand.canonical}/courses/${course.slug}` }, { "@type": "ListItem", position: 4, name: "Course Outline", item: canonical }] },
  ];
  const detailPanels = [
    ["Online teaching and learning strategies", "The registered course materials identify the specific teacher-led activities, communication routines and learning tasks. The public outline does not invent delivery details that are not present in the source record."],
    ["Assessment and evaluation", "Assessment types, weighting, deadlines and final-evaluation details must be confirmed in the registered course. No public mark or completion guarantee is made."],
    ["Accommodations and individual needs", "Students should share relevant learning needs through the appropriate confidential school process. Supports are determined from the student's documentation and course context."],
    ["Resources", "Use registered Nexus course resources and the current Ontario curriculum source. Copyrighted curriculum resources are linked rather than reproduced."],
  ];

  return (
    <>
      <Seo title={`${course.code} ${course.title} Course Outline | Nexus Education`} description={`Review the ${course.code} ${course.title} course description, prerequisite, official curriculum link and ${course.outline.length}-section Nexus LMS outline.`} image={visual} structuredData={schema} />
      <section className="outline-hero"><div className="container"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/courses">Courses</Link><span>/</span><Link to={`/courses/grade-${course.grade}`}>Grade {course.grade}</Link><span>/</span><Link to={`/courses/${course.slug}`}>{course.title} | {course.code}</Link><span>/</span><span aria-current="page">Outline</span></nav><div className="outline-hero-grid"><div><span className="eyebrow"><ClipboardList size={14} /> COURSE OUTLINE</span><span className="course-code course-code-large">{course.code}</span><h1>{course.title}</h1><p>{course.description}</p><div className="course-hero-badges"><span>Grade {course.grade}</span><span>{course.type}</span><span>{course.credit} credit</span></div><div className="button-row"><AddToCartButton course={course} /><button className="btn btn-secondary" type="button" onClick={enrollCourse}><GraduationCap size={17} /> Enroll in This Course</button><Link className="text-link" to={`/courses/${course.slug}`}><ArrowLeft size={17} /> Course Page</Link></div></div><div className="course-visual-card"><img src={visual} alt={`${course.department} visual for ${course.title}`} fetchPriority="high" /><div><span>{course.department}</span><strong>{course.code}</strong></div></div></div></div></section>

      <Reveal as="section" className="section container outline-layout outline-layout-expanded">
        <article>
          <SectionHeading eyebrow="COURSE DESCRIPTION" title={`${course.code} at a Glance.`} /><p className="large-copy">{course.description}</p>
          <div className="notice-card"><BookOpenCheck size={22} /><div><strong>Prerequisite: {course.prerequisite}</strong><p>Confirm the prerequisite, current availability and individual eligibility before enrollment.</p></div></div>
          {highlights.length > 0 && <><h2>Learning described in the source record</h2><CheckList items={highlights} /></>}
          <div className="outline-table-heading"><div><span className="mini-label">LMS SEQUENCE</span><h2>{course.code} course outline</h2></div><span>{course.outline.length} sections</span></div>
          <div className="outline-table-wrap"><table className="outline-table"><caption className="sr-only">{course.code} course outline section sequence</caption><thead><tr><th scope="col">Unit order</th><th scope="col">Unit name</th><th scope="col">Description</th></tr></thead><tbody>{course.outline.map((section, index) => <tr key={`${course.code}-${section}-${index}`}><td data-label="Unit order">{index === course.outline.length - 1 && /final/i.test(section) ? "Final" : `Unit ${index + 1}`}</td><th data-label="Unit name" scope="row">{section}</th><td data-label="Description">{outlineDescription(course, section, index)}</td></tr>)}</tbody></table></div>
          <p className="outline-timing-note">Suggested hours and completion timing are not published because they are not verified in the current source record. Confirm delivery and pacing during enrollment.</p>
          <SectionHeading eyebrow="COURSE DELIVERY" title="Details Confirmed in the Enrolled Course." /><FAQAccordion items={detailPanels} />
          <div className="outline-source-banner"><ExternalLink size={22} /><div><strong>Official Ontario curriculum source</strong><p>Review the Ministry curriculum page for current subject context and expectations.</p><a className="text-link" href={curriculumUrl} target="_blank" rel="noreferrer">Open official curriculum <ArrowRight size={15} /></a></div></div>
        </article>
        <aside><div className="outline-facts"><BookOpenCheck size={28} /><span className="mini-label">COURSE FACTS</span><dl><div><dt>Course code</dt><dd>{course.code}</dd></div><div><dt>Grade</dt><dd>{course.grade}</dd></div><div><dt>Type</dt><dd>{course.type}</dd></div><div><dt>Credit</dt><dd>{course.credit}</dd></div><div><dt>Prerequisite</dt><dd>{course.prerequisite}</dd></div></dl><div className="availability-note"><CheckCircle2 size={18} /><span><strong>Confirm before enrolling</strong>The catalogue record does not guarantee current availability or individual eligibility.</span></div><AddToCartButton course={course} /><button className="btn btn-secondary" type="button" onClick={enrollCourse}>Enroll Now</button></div></aside>
      </Reveal>
      <CTASection title={`Plan Your Next Step With ${course.code}.`} text="Share your completed courses and goal so the prerequisite and current availability can be confirmed." />
    </>
  );
}
