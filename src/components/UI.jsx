import { ArrowRight, Check, Sparkles } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
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

export function PageHero({ eyebrow, title, text, image, imageAlt, children, metaTitle, metaDescription }) {
  const { pathname } = useLocation();
  return (
    <>
      <Seo title={metaTitle} description={metaDescription} image={image} />
      <section className={`page-hero ${image ? "page-hero-visual" : ""}`}>
        <div className="container">
          {pathname !== "/" && <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span aria-current="page">{title.replace(/\.$/, "")}</span></nav>}
          <div className="page-hero-grid">
            <div className="page-hero-copy">
              <span className="eyebrow">{eyebrow}</span>
              <h1>{title}</h1>
              <p>{text}</p>
              {children && <div className="button-row">{children}</div>}
            </div>
            {image && <div className="page-hero-image"><img src={image} alt={imageAlt} fetchPriority="high" /></div>}
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
      <img src={image} alt={alt} loading="lazy" />
      <div><span className="mini-label">{eyebrow}</span><h3>{title}</h3>{text && <p>{text}</p>}</div>
    </article>
  );
}
