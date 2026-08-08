import { ArrowRight, CheckCircle2, ClipboardCheck, FileSearch, ListChecks, MessageSquareText } from "lucide-react";
import { Link } from "react-router-dom";
import FAQAccordion from "../components/FAQAccordion";
import Reveal from "../components/Reveal";
import { CTASection, CheckList, PageHero, SectionHeading } from "../components/UI";
import { faqGroups } from "../data/content";
import { images } from "../data/site";

const process = [[FileSearch, "Explore courses", "Search by code, title, grade or subject and compare real catalogue details."], [ListChecks, "Confirm prerequisites", "Review what should come first and ask when eligibility is unclear."], [MessageSquareText, "Send an inquiry", "Share your current studies, academic goal and course interest."], [ClipboardCheck, "Review next steps", "Confirm current registration expectations, course details and timing."], [CheckCircle2, "Access learning", "Registered students continue in the Nexus digital learning environment."]];

export default function AdmissionsPage() {
  return (
    <>
      <PageHero eyebrow="ADMISSIONS" title="Start With the Right Next Step." text="A clear admissions journey begins by understanding what you need, checking the relevant prerequisite context and asking the right questions." image={images.graduation} imageAlt="Graduates walking together after reaching an academic milestone"><Link className="btn btn-primary" to="/inquiry">Start an Inquiry <ArrowRight size={17} /></Link><Link className="btn btn-secondary" to="/courses">Explore Courses</Link></PageHero>
      <Reveal as="section" className="section container"><SectionHeading eyebrow="THE PROCESS" title="From Course Search to Learning Access." text="Five practical steps keep the process focused without making unsupported promises about admission or timing." /><div className="admissions-process">{process.map(([Icon, title, text], index) => <article key={title}><span className="process-number">0{index + 1}</span><span className="icon-bubble"><Icon size={21} /></span><h3>{title}</h3><p>{text}</p></article>)}</div></Reveal>
      <Reveal as="section" className="section soft-section"><div className="container admissions-prep"><div><SectionHeading eyebrow="WHAT TO PREPARE" title="Bring the Details That Make Guidance Useful." /><CheckList items={["Your current grade and school context", "The course code or subject you are considering", "Any prerequisite information already available", "Your academic or postsecondary goal", "A deadline or preferred timing, if relevant"]} /></div><div className="prep-card"><span className="mini-label">STUDENT CHECKLIST</span><h3>Before you send an inquiry</h3><CheckList items={["Check the catalogue", "Write down your main question", "Include the exact course code when known", "Keep a copy of relevant course information", "Confirm details before registering"]} /><Link className="btn btn-primary" to="/inquiry">Open Inquiry Form</Link></div></div></Reveal>
      <Reveal as="section" className="section container split-feature reverse"><div className="split-feature-image"><img src={images.planning} alt="Academic planning conversation with notes and course information" loading="lazy" /></div><div><SectionHeading eyebrow="PREREQUISITE GUIDANCE" title="Work Backward From the Goal." text="A prerequisite is not just a box to check. It is part of a sequence that may connect today’s choice to a senior course or postsecondary requirement." /><p>Use current institution requirements as the source for university or college planning. Nexus can help clarify the course catalogue, but no public website should guarantee a future admission decision.</p><Link className="text-link" to="/academic-planning">Build an academic plan <ArrowRight size={16} /></Link></div></Reveal>
      <Reveal as="section" className="section container faq-home"><SectionHeading eyebrow="ADMISSIONS FAQ" title="Questions Before You Begin." /><FAQAccordion items={faqGroups.Admissions} /></Reveal>
      <CTASection />
    </>
  );
}
