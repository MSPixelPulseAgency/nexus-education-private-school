import { Search, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import OfficialResourceGrid from "../components/OfficialResourceGrid";
import Reveal from "../components/Reveal";
import { CTASection, PageHero, SectionHeading } from "../components/UI";
import { officialResources, resourceCategories } from "../data/officialResources";
import { images } from "../data/site";

export default function ResourcesPage() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => officialResources.filter((resource) => {
    const matchesCategory = category === "All" || resource.category === category;
    const haystack = `${resource.title} ${resource.organization} ${resource.description}`.toLowerCase();
    return matchesCategory && haystack.includes(query.trim().toLowerCase());
  }), [category, query]);

  return (
    <>
      <PageHero
        eyebrow="STUDENT RESOURCES"
        title="Official Ontario & Canada Education Resources."
        text="Use current primary sources for curriculum, graduation planning, postsecondary applications, student aid, careers and skilled trades. Nexus is not affiliated with the organizations listed here."
        image={images.planning}
        imageAlt="Student organizing education and pathway planning resources"
        metaTitle="Official Ontario Education Resources | Nexus Education"
        breadcrumbs={[{ label: "Resources" }]}
      >
        <Link className="btn btn-primary" to="/student-resources/videos">Watch Official Videos</Link>
        <Link className="btn btn-secondary" to="/academic-planning">Academic Planning</Link>
      </PageHero>

      <Reveal as="section" className="section container resources-section">
        <div className="resource-toolbar" aria-label="Filter official resources">
          <div className="resource-search"><Search size={20} /><label className="sr-only" htmlFor="resource-search">Search official resources</label><input id="resource-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search curriculum, OSAP, careers…" /></div>
          <div className="resource-chips">{resourceCategories.map((item) => <button className={category === item ? "active" : ""} type="button" aria-pressed={category === item} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div>
          <span className="resource-result-count">{filtered.length} official resource{filtered.length === 1 ? "" : "s"}</span>
        </div>
        {filtered.length ? <OfficialResourceGrid resources={filtered} /> : <div className="empty-state"><Search size={34} /><h2>No resources match that search.</h2><p>Try a broader term or select All.</p><button className="btn btn-primary" type="button" onClick={() => { setQuery(""); setCategory("All"); }}>Clear Search</button></div>}
      </Reveal>

      <Reveal as="section" className="section soft-section"><div className="container resource-disclaimer"><ShieldCheck size={28} /><div><SectionHeading eyebrow="SOURCE CHECK" title="Official links, without implied affiliation." text="Each card opens the named organization’s website in a new tab. Requirements and application details can change, so always confirm the current source before acting." /><p>Last content review: August 20, 2026.</p></div></div></Reveal>
      <CTASection title="Turn Official Information Into a Course Plan." text="Bring the source, program or requirement you are researching and ask Nexus how it connects to the course catalogue." />
    </>
  );
}
