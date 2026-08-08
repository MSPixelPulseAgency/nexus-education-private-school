import { ArrowRight, BookOpenCheck, CheckCircle2, ExternalLink, Route, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { CTASection, PageHero, SectionHeading } from "../components/UI";
import { resourceGuideBySlug } from "../data/resourceGuides";
import { images } from "../data/site";
import NotFoundPage from "./NotFoundPage";

const icons = [BookOpenCheck, Route, ShieldCheck];

export default function ResourceGuidePage({ slug }) {
  const guide = resourceGuideBySlug[slug];
  if (!guide) return <NotFoundPage />;
  return (
    <>
      <PageHero eyebrow={guide.eyebrow} title={guide.title} text={guide.intro} image={images[guide.imageKey]} imageAlt={`Students and families working through ${guide.title.toLowerCase()}`} metaTitle={guide.metaTitle} metaDescription={guide.metaDescription}>
        <Link className="btn btn-primary" to="/courses">Search Courses <ArrowRight size={17} /></Link>
        <Link className="btn btn-secondary" to="/inquiry">Ask a Planning Question</Link>
      </PageHero>
      <Reveal as="section" className="section container">
        <div className="guide-highlight-grid">{guide.highlights.map((item, index) => { const Icon = icons[index]; return <article key={item}><span className="icon-bubble"><Icon size={21} /></span><strong>{item}</strong></article>; })}</div>
      </Reveal>
      <Reveal as="section" className="section soft-section">
        <div className="container guide-content-grid">
          <article><SectionHeading eyebrow="PLANNING GUIDE" title="Use a Clear, Evidence-Based Process." />{guide.sections.map((section, index) => <section key={section.title}><span className="section-number">0{index + 1}</span><h2>{section.title}</h2><p>{section.text}</p></section>)}</article>
          <aside><div className="source-card"><CheckCircle2 size={28} /><h2>Keep information current.</h2><p>Use official sources for requirements and confirm Nexus course availability before acting on a plan.</p>{guide.sources.map((source) => <a className="text-link" href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.label} <ExternalLink size={15} /></a>)}</div></aside>
        </div>
      </Reveal>
      <CTASection title="Turn Research Into a Course Plan." text="Bring your current credits, intended destination and open questions to the next conversation." />
    </>
  );
}
