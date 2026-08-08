import { ArrowRight, BookOpenCheck, CircleHelp, Compass, GraduationCap, Headphones, KeyRound, MonitorCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { CTASection, PageHero, SectionHeading } from "../components/UI";
import { brand, images } from "../data/site";

const support = [[BookOpenCheck, "Course Selection", "Compare course codes, grades, types and related options.", "/courses"], [CircleHelp, "Prerequisites", "Ask for clarification before a course decision becomes urgent.", "/inquiry"], [Compass, "Academic Planning", "Connect current choices with graduation and postsecondary goals.", "/academic-planning"], [KeyRound, "LMS", "Find the registered-student login and the right support route.", brand.lms], [GraduationCap, "University & College Planning", "Research program requirements and map prerequisite chains.", "/academic-planning"], [MonitorCheck, "Technical Support", "Describe the device, browser and issue clearly for faster troubleshooting.", "/contact"]];

export default function StudentSupportPage() {
  return (
    <>
      <PageHero eyebrow="STUDENT SUPPORT" title="Questions Are Part of Progress." text="Find a clear support path for course selection, prerequisites, academic planning, LMS access and technical questions." image={images.mentoring} imageAlt="Teacher supporting students in a bright classroom"><Link className="btn btn-primary" to="/inquiry">Ask a Question <ArrowRight size={17} /></Link><a className="btn btn-secondary" href={brand.lms} target="_blank" rel="noreferrer">Open LMS</a></PageHero>
      <Reveal as="section" className="section container"><SectionHeading eyebrow="SUPPORT CATEGORIES" title="Start With the Kind of Help You Need." /><div className="support-card-grid">{support.map(([Icon, title, text, to]) => { const external = to.startsWith("http"); const content = <><span className="icon-bubble"><Icon size={22} /></span><h3>{title}</h3><p>{text}</p><span className="text-link">Get support <ArrowRight size={15} /></span></>; return external ? <a key={title} href={to} target="_blank" rel="noreferrer">{content}</a> : <Link key={title} to={to}>{content}</Link>; })}</div></Reveal>
      <Reveal as="section" className="section soft-section"><div className="container quick-help"><div><SectionHeading eyebrow="QUICK HELP" title="Make a Support Request Easier to Resolve." /><p>Include the course code, page or LMS area involved, what you expected to happen and the exact step where you became stuck.</p><div className="quick-help-steps"><span><strong>01</strong>Name the course or page</span><span><strong>02</strong>Describe the task</span><span><strong>03</strong>Share what happened</span><span><strong>04</strong>Choose the right topic</span></div></div><div className="quick-help-card"><Headphones size={34} /><h3>Popular student links</h3><Link to="/courses">Course catalogue <ArrowRight size={15} /></Link><Link to="/faq">Frequently asked questions <ArrowRight size={15} /></Link><Link to="/blog">Planning guides <ArrowRight size={15} /></Link><a href={brand.lms} target="_blank" rel="noreferrer">Nexus LMS <ArrowRight size={15} /></a></div></div></Reveal>
      <CTASection title="You Do Not Need Every Answer Before You Ask." text="Share the course, issue or goal you are trying to understand and start from there." />
    </>
  );
}
