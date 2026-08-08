import { ArrowRight, BookOpenCheck, Compass, Lightbulb, MonitorSmartphone, Route, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { CTASection, PageHero, SectionHeading, VisualCard } from "../components/UI";
import { blogCategories, courses } from "../data/catalog";
import { images } from "../data/site";

const values = [[Compass, "Clarity", "Make important academic information easier to understand."], [Route, "Progress", "Connect today’s course choice with the next meaningful milestone."], [UsersRound, "Respect", "Create a thoughtful, student-centred experience."], [Lightbulb, "Curiosity", "Encourage learning beyond minimum requirements."], [BookOpenCheck, "Responsibility", "Support informed choices and honest learning habits."], [MonitorSmartphone, "Opportunity", "Make pathways and support easier to discover digitally."]];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="ABOUT NEXUS" title="A Modern School Built Around Student Progress." text="Nexus brings clear course discovery, thoughtful pathway planning and a modern digital experience together for Ontario secondary students." image={images.campus} imageAlt="Students walking together on a modern school campus">
        <Link className="btn btn-primary" to="/courses">Explore Courses <ArrowRight size={17} /></Link><Link className="btn btn-secondary" to="/inquiry">Start an Inquiry</Link>
      </PageHero>
      <Reveal as="section" className="section container about-story">
        <div><span className="eyebrow">OUR APPROACH</span><h2>Clarity before complexity.</h2><p className="large-copy">Students should be able to understand what they are taking, why it matters and what comes next. Nexus organizes course information and support around those practical questions.</p><p>That means thoughtful course discovery, honest pathway context, a clear handoff into digital learning and visible support whenever a decision is uncertain.</p></div>
        <div className="about-stat-panel"><div><strong>{courses.length}+</strong><span>course records in the current catalogue</span></div><div><strong>9–12</strong><span>Ontario secondary grade levels</span></div><div><strong>{blogCategories.length}</strong><span>student and family guide categories</span></div></div>
      </Reveal>
      <Reveal as="section" className="section soft-section"><div className="container"><SectionHeading eyebrow="OUR VALUES" title="Principles That Keep Progress Human." text="A premium digital experience matters most when it makes the academic journey clearer and more respectful." /><div className="feature-grid">{values.map(([Icon, title, text]) => <article className="feature-card" key={title}><span className="icon-bubble"><Icon size={21} /></span><h3>{title}</h3><p>{text}</p></article>)}</div></div></Reveal>
      <Reveal as="section" className="section container"><SectionHeading eyebrow="WHAT MAKES NEXUS DIFFERENT" title="Designed Around Real Student Questions." /><div className="visual-grid three"><VisualCard image={images.planning} alt="Student and mentor reviewing a plan together" eyebrow="ACADEMIC PATHWAYS" title="What should I take next?" text="Course codes, grade levels and pathway context make next steps easier to compare." /><VisualCard image={images.classroom} alt="Students learning in a bright modern classroom" eyebrow="TECHNOLOGY" title="Where does learning happen?" text="The public website connects registered students clearly to a modern LMS experience." /><VisualCard image={images.graduation} alt="Graduates celebrating an academic milestone" eyebrow="MEANINGFUL SUPPORT" title="How does this fit my goal?" text="Planning tools and inquiry paths help connect current choices to future possibilities." /></div></Reveal>
      <Reveal as="section" className="section container split-feature"><div className="split-feature-image"><img src={images.mentoring} alt="Teacher mentoring students in a classroom" loading="lazy" /></div><div><SectionHeading eyebrow="THE NEXUS EXPERIENCE" title="Modern Does Not Have to Mean Impersonal." text="Nexus uses technology to reduce friction while keeping support visible. Students and families can browse, compare, plan and ask before a decision becomes urgent." /><ul className="plain-list"><li>Searchable course catalogue</li><li>Grade-based exploration</li><li>Pathway and prerequisite context</li><li>Clear student-support routes</li><li>Direct LMS access for registered students</li></ul><Link className="text-link" to="/student-support">Explore Student Support <ArrowRight size={16} /></Link></div></Reveal>
      <CTASection title="See Where Nexus Can Take You." text="Start with the course, prerequisite or future goal you want to understand better." />
    </>
  );
}
