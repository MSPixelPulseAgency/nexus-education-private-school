import { ArrowRight, BookOpen, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import Reveal from "../components/Reveal";
import { PageHero, SectionHeading } from "../components/UI";
import { blogCategories, blogs } from "../data/catalog";
import { images } from "../data/site";

const PAGE_SIZE = 12;

export default function BlogPage() {
  const [params, setParams] = useSearchParams();
  const query = params.get("q") || "";
  const category = params.get("category") || "";
  const [visible, setVisible] = useState(PAGE_SIZE);
  useEffect(() => setVisible(PAGE_SIZE), [query, category]);
  const update = (key, value) => { const next = new URLSearchParams(params); if (value) next.set(key, value); else next.delete(key); setParams(next, { replace: true }); };
  const filtered = useMemo(() => blogs.filter((post) => (!query || `${post.title} ${post.excerpt}`.toLowerCase().includes(query.toLowerCase())) && (!category || post.category === category)), [category, query]);
  const featured = blogs[0];
  return (
    <>
      <PageHero eyebrow="NEXUS JOURNAL" title="Ideas That Move Students Forward." text="Practical, accessible guides for Ontario course planning, study skills, online learning, parents and future pathways." image={images.planning} imageAlt="Student reading and planning at a desk"><Link className="btn btn-primary" to={`/blog/${featured.slug}`}>Read Featured Guide <ArrowRight size={17} /></Link></PageHero>
      <Reveal as="section" className="section container">
        <article className="blog-feature"><div className="blog-feature-image"><img src={images.classroom} alt="Modern classroom prepared for focused learning" width="1400" height="900" loading="lazy" decoding="async" /><span><BookOpen size={18} /> Featured guide</span></div><div><span className="eyebrow">{featured.category}</span><h2>{featured.title}</h2><p>{featured.excerpt}</p><div className="blog-card-meta"><span>{featured.readTime}</span><span>Nexus Education Team</span></div><Link className="btn btn-primary" to={`/blog/${featured.slug}`}>Read Article <ArrowRight size={17} /></Link></div></article>
      </Reveal>
      <Reveal as="section" className="section soft-section"><div className="container blog-hub"><SectionHeading eyebrow="EXPLORE THE JOURNAL" title="Find Guidance for Your Next Question." text={`${blogs.length} practical guides across ${blogCategories.length} planning and student-success categories.`} />
        <div className="blog-search"><Search size={20} /><label className="sr-only" htmlFor="blog-search">Search Nexus articles</label><input id="blog-search" value={query} onChange={(event) => update("q", event.target.value)} placeholder="Search course planning, study skills, Grade 12…" /><span>{filtered.length} articles</span></div>
        <div className="category-tabs" aria-label="Article categories"><button className={!category ? "active" : ""} onClick={() => update("category", "")} type="button">All</button>{blogCategories.map((item) => <button className={category === item ? "active" : ""} onClick={() => update("category", item)} type="button" key={item}>{item}</button>)}</div>
        {filtered.length ? <><div className="card-grid three blog-grid">{filtered.slice(0, visible).map((post) => <BlogCard post={post} key={post.slug} />)}</div>{visible < filtered.length && <div className="section-action"><button className="btn btn-secondary" type="button" onClick={() => setVisible((count) => count + PAGE_SIZE)}>Load More Articles <ArrowRight size={16} /></button><span>{Math.min(visible, filtered.length)} of {filtered.length}</span></div>}</> : <div className="empty-state"><Search size={34} /><h2>No guides match that search.</h2><p>Try a broader phrase or choose another category.</p><button type="button" className="btn btn-primary" onClick={() => setParams({})}>Clear Search</button></div>}
      </div></Reveal>
    </>
  );
}
