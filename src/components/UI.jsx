import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { brand } from "../data/site";
import Reveal from "./Reveal";
import Seo from "./Seo";

export function SectionHeading({ eyebrow, title, text, center = false, light = false }) {
  return (
    <div className={`section-heading ${center ? "is-centered" : ""} ${light ? "is-light" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, text, image, imageAlt, children, metaTitle, metaDescription, breadcrumbs, compact = false, structuredData }) {
  const { pathname } = useLocation();
  const breadcrumbItems = pathname === "/" ? [] : [
    { label: "Home", to: "/" },
    ...(breadcrumbs?.length ? breadcrumbs : [{ label: title.replace(/\.$/, "") }]),
  ];
  const breadcrumbSchema = breadcrumbItems.length ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${brand.canonical}${item.to || pathname}`,
    })),
  } : null;
  const schemas = [structuredData, breadcrumbSchema].filter(Boolean);
  return (
    <>
      <Seo title={metaTitle} description={metaDescription} image={image} structuredData={schemas} />
      <section className={`page-hero ${image ? "page-hero-visual" : ""} ${compact ? "is-compact" : ""}`}>
        <div className="container">
          {breadcrumbItems.length > 0 && <nav className="breadcrumbs" aria-label="Breadcrumb"><ol>{breadcrumbItems.map((item, index) => <li key={`${item.label}-${index}`}>{index > 0 && <span aria-hidden="true">/</span>}{item.to && index < breadcrumbItems.length - 1 ? <Link to={item.to}>{item.label}</Link> : <span aria-current={index === breadcrumbItems.length - 1 ? "page" : undefined}>{item.label}</span>}</li>)}</ol></nav>}
          <div className="page-hero-grid">
            <div className="page-hero-copy">
              <span className="eyebrow">{eyebrow}</span>
              <h1>{title}</h1>
              <p>{text}</p>
              {children && <div className="button-row">{children}</div>}
            </div>
            {image && <div className="page-hero-image"><img src={image} alt={imageAlt} width="1400" height="1050" fetchPriority="high" decoding="async" /></div>}
          </div>
        </div>
      </section>
    </>
  );
}

export function CTASection({ title = "Build Your Next Academic Move.", text = "Tell us what you’re working toward and start with the course that moves you forward." }) {
  return (
    <Reveal as="section" className="cta-section container">
      <div className="cta-shape" aria-hidden="true" />
      <div>
        <span className="eyebrow eyebrow-dark"><Sparkles size={14} /> Ready for what’s next?</span>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
      <div className="button-row">
        <Link className="btn btn-light" to="/inquiry">Start an Inquiry <ArrowRight size={17} /></Link>
        <Link className="btn btn-ghost-light" to="/courses">Explore Courses</Link>
      </div>
    </Reveal>
  );
}

export function CheckList({ items }) {
  return <ul className="check-list">{items.map((item) => <li key={item}><Check size={17} aria-hidden="true" /><span>{item}</span></li>)}</ul>;
}

export function VisualCard({ image, alt, eyebrow, title, text, className = "" }) {
  return (
    <article className={`visual-card ${className}`}>
      <img src={image} alt={alt} width="1400" height="900" loading="lazy" decoding="async" />
      <div><span className="mini-label">{eyebrow}</span><h3>{title}</h3>{text && <p>{text}</p>}</div>
    </article>
  );
}
