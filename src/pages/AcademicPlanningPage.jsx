import { ArrowRight, BookOpenCheck, CalendarClock, CheckCircle2, GraduationCap, Route, Scale, Target } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { CTASection, CheckList, PageHero, SectionHeading } from "../components/UI";
import { gradeCounts } from "../data/catalog";
import { images } from "../data/site";

const topics = [[Target, "Current Grade", "Start with the requirements and options connected to where you are now."], [CheckCircle2, "Required Credits", "Track graduation needs separately from electives and program prerequisites."], [Route, "Prerequisite Chains", "Work backward from senior courses or target programs before choosing."], [GraduationCap, "Postsecondary Requirements", "Verify current university and college requirements at the source."], [Scale, "Course Workload", "Balance ambition with enough time for understanding, revision and wellbeing."], [CalendarClock, "Deadlines", "Build one planning timeline for course, application and document milestones."]];

export default function AcademicPlanningPage() {
  return (
    <>
      <PageHero eyebrow="ACADEMIC PLANNING" title="Make Every Course Choice Count." text="Connect your current grade, required credits, prerequisite chains and future possibilities in one realistic plan." image={images.planning} imageAlt="Student reviewing an academic pathway plan with a mentor"><Link className="btn btn-primary" to="/courses">Open Course Finder <ArrowRight size={17} /></Link><Link className="btn btn-secondary" to="/inquiry">Ask for Guidance</Link></PageHero>
      <Reveal as="section" className="section container"><SectionHeading eyebrow="PLANNING FOUNDATIONS" title="See the Whole Path, Not Just One Course." /><div className="feature-grid">{topics.map(([Icon, title, text]) => <article className="feature-card" key={title}><span className="icon-bubble"><Icon size={21} /></span><h3>{title}</h3><p>{text}</p></article>)}</div></Reveal>
      <Reveal as="section" className="section soft-section"><div className="container"><SectionHeading eyebrow="PLAN BY GRADE" title="The Questions Change as You Move Forward." /><div className="planning-grade-grid">{[9, 10, 11, 12].map((grade) => <article key={grade}><span className="grade-number">{grade}</span><span className="mini-label">{gradeCounts[grade]} catalogue records</span><h3>Grade {grade} Planning</h3><p>{grade === 9 ? "Build foundations, learn the code system and explore interests." : grade === 10 ? "Look ahead to Grade 11 options and their prerequisite connections." : grade === 11 ? "Map Grade 12 courses against possible programs and pathways." : "Confirm graduation needs, program requirements and application deadlines."}</p><Link className="text-link" to={`/courses/grade-${grade}`}>Explore Grade {grade} <ArrowRight size={15} /></Link></article>)}</div></div></Reveal>
      <Reveal as="section" className="section container pathway-example"><div><SectionHeading eyebrow="PATHWAY EXAMPLE" title="Work Backward From a Possible Goal." text="A planning example is a way to organize research—not a guarantee of admission or a substitute for current institution requirements." /><div className="pathway-chain"><span>Possible program</span><ArrowRight /><span>Required Grade 12 courses</span><ArrowRight /><span>Grade 11 prerequisites</span><ArrowRight /><span>Current choices</span></div></div><div className="planning-checklist"><BookOpenCheck size={30} /><h3>Planning checklist</h3><CheckList items={["Write down several possible goals", "Verify requirements on official program pages", "Map the complete prerequisite chain", "Review the total workload", "Record deadlines", "Revisit the plan when goals change"]} /></div></Reveal>
      <CTASection title="Turn Your Goal Into a Course Plan." text="Share your current grade, possible destination and the course question you want to resolve." />
    </>
  );
}
