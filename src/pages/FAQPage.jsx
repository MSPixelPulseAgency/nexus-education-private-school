import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import FAQAccordion from "../components/FAQAccordion";
import { CTASection, PageHero } from "../components/UI";
import { faqGroups } from "../data/content";

export default function FAQPage() {
  const categories = Object.keys(faqGroups);
  const [category, setCategory] = useState(categories[0]);
  const [query, setQuery] = useState("");
  const items = useMemo(() => Object.entries(faqGroups).flatMap(([group, questions]) => questions.map((item) => ({ group, item }))).filter(({ group, item }) => (!category || group === category) && (!query || `${item[0]} ${item[1]}`.toLowerCase().includes(query.toLowerCase()))).map(({ item }) => item), [category, query]);
  return (
    <>
      <PageHero eyebrow="FREQUENTLY ASKED QUESTIONS" title="Quick Answers for Common Questions." text="Search practical answers about courses, admissions, online learning, LMS access, parents and academic planning." />
      <section className="section container faq-page">
        <div className="faq-search"><Search size={20} /><label className="sr-only" htmlFor="faq-search">Search frequently asked questions</label><input id="faq-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search prerequisites, LMS, Grade 12…" /><span>{items.length} answers</span></div>
        <div className="faq-category-tabs" aria-label="FAQ categories"><button className={!category ? "active" : ""} onClick={() => setCategory("")} type="button">All</button>{categories.map((item) => <button className={category === item ? "active" : ""} type="button" onClick={() => setCategory(item)} key={item}>{item}</button>)}</div>
        {items.length ? <FAQAccordion key={`${category}-${query}`} items={items} /> : <div className="empty-state"><Search size={34} /><h2>No matching answer found.</h2><p>Try another phrase or browse all categories.</p><button className="btn btn-primary" type="button" onClick={() => { setCategory(""); setQuery(""); }}>Clear Search</button></div>}
      </section>
      <CTASection title="Still Have a Question?" text="Tell us the course, goal or issue you are trying to understand." />
    </>
  );
}
