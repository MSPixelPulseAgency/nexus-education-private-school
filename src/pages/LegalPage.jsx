import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import { legalContent } from "../data/content";

const links = [["Privacy", "/privacy", "privacy"], ["Terms", "/terms", "terms"], ["Accessibility", "/accessibility", "accessibility"], ["Policies", "/policies", "policies"]];

export default function LegalPage({ type }) {
  const page = legalContent[type];
  return (
    <>
      <Seo />
      <section className="legal-hero"><div className="container"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span aria-current="page">{page.eyebrow}</span></nav><span className="eyebrow">{page.eyebrow}</span><h1>{page.title}</h1><p>{page.intro}</p></div></section>
      <section className="section container legal-layout"><aside><strong>Information pages</strong>{links.map(([label, to, key]) => <Link className={type === key ? "active" : ""} key={to} to={to}>{label}<ArrowRight size={14} /></Link>)}</aside><article>{page.sections.map(([heading, body], index) => <section key={heading}><span className="section-number">0{index + 1}</span><h2>{heading}</h2><p>{body}</p></section>)}<div className="legal-contact"><strong>Need clarification?</strong><p>Use the Contact page and choose the topic that best matches your question.</p><Link className="text-link" to="/contact">Contact Nexus <ArrowRight size={15} /></Link></div></article></section>
    </>
  );
}
