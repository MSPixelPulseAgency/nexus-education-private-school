import { useDeferredValue, useEffect, useId, useMemo, useRef, useState } from "react";
import { ArrowRight, BookOpen, FileText, Newspaper, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { homeBlogs as blogs, homeCourses as courses, rankCourses } from "../data/homeCatalog";
import { resourceGuides } from "../data/resourceGuides";
import AddToCartButton from "./AddToCartButton";

const searchablePages = [
  ["About Nexus", "/about", "school approach future-ready student-focused"],
  ["Admissions", "/admissions", "inquiry enrollment enrolment prerequisite preparation"],
  ["Enrollment", "/enroll", "enroll enrolment selected courses student information"],
  ["Student Support", "/student-support", "course selection LMS learning help"],
  ["Academic Planning", "/academic-planning", "credits prerequisites pathways university college"],
  ["Online Learning", "/online-learning", "digital learning assignments progress routines"],
  ["Frequently Asked Questions", "/faq", "courses admissions LMS support questions"],
  ["Credit Recovery", "/credit-recovery", "repeat recover strengthen Ontario high school credit"],
  ["Upgrade Courses", "/upgrade-courses", "upgrade repeat marks prerequisites"],
  ["Adult Education", "/adult-education", "adult high school credits Ontario OSSD prerequisites"],
  ["Mature Students", "/mature-students", "PLAR mature student transcript Ontario"],
  ["OSSD", "/ossd", "Ontario diploma credits literacy community online learning"],
  ["OUAC Guide", "/ouac", "Ontario university application prerequisite planning"],
  ["OCAS Guide", "/ocas", "Ontario college application transcripts prerequisites"],
  ["Official Videos", "/student-resources/videos", "OUAC OCAS Ontario education videos"],
  ...resourceGuides.map((guide) => [guide.title.replace(/\.$/, ""), guide.path, `${guide.eyebrow} ${guide.intro}`]),
].map(([title, path, keywords]) => ({ title, path, keywords }));

const typeMeta = {
  course: { label: "Courses", Icon: BookOpen },
  page: { label: "Pages", Icon: FileText },
  blog: { label: "Nexus Journal", Icon: Newspaper },
};

function textScore(title, haystack, query) {
  const normalizedTitle = title.toLowerCase();
  if (normalizedTitle === query) return 75;
  if (normalizedTitle.startsWith(query)) return 60;
  if (normalizedTitle.includes(query)) return 45;
  return haystack.toLowerCase().includes(query) ? 25 : 0;
}

export default function NexusSearch({ className = "" }) {
  const searchId = useId();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const deferredQuery = useDeferredValue(query);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown, true);
    return () => document.removeEventListener("pointerdown", handlePointerDown, true);
  }, []);

  const results = useMemo(() => {
    const normalized = deferredQuery.trim().toLowerCase();
    if (!normalized) return [];
    const courseResults = rankCourses(courses, normalized).slice(0, 8).map((course, index) => ({
      type: "course",
      title: course.title,
      label: `${course.code} · Grade ${course.grade} · ${course.department}`,
      path: `/courses/${course.slug}`,
      key: `course-${course.code}`,
      score: 120 - index,
    }));
    const pageResults = searchablePages.map((page) => ({
      type: "page", title: page.title, label: "Nexus information page", path: page.path,
      key: `page-${page.path}`, score: textScore(page.title, page.keywords, normalized),
    })).filter((item) => item.score);
    const blogResults = blogs.map((post) => ({
      type: "blog", title: post.title, label: post.category, path: `/blog/${post.slug}`,
      key: `blog-${post.slug}`, score: textScore(post.title, `${post.category} ${post.excerpt}`, normalized),
    })).filter((item) => item.score);
    return [...courseResults, ...pageResults, ...blogResults]
      .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
      .slice(0, 8);
  }, [deferredQuery]);

  const choose = (path) => {
    setOpen(false);
    setActiveIndex(-1);
    navigate(path);
  };

  const handleResultClick = (event, path) => {
    event.preventDefault();
    choose(path);
  };

  const onKeyDown = (event) => {
    if (event.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
      inputRef.current?.blur();
      return;
    }
    if (!results.length) {
      if (event.key === "Enter" && query.trim()) choose(`/courses?q=${encodeURIComponent(query.trim())}`);
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((index) => (index + 1) % results.length);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((index) => (index <= 0 ? results.length - 1 : index - 1));
    }
    if (event.key === "Enter") {
      event.preventDefault();
      const exact = courses.find((course) => course.code.toLowerCase() === query.trim().toLowerCase());
      choose(activeIndex >= 0 ? results[activeIndex].path : exact ? `/courses/${exact.slug}` : `/courses?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const groupedTypes = ["course", "page", "blog"].filter((type) => results.some((item) => item.type === type));
  const listOpen = open && Boolean(query.trim());

  return (
    <div ref={rootRef} className={`nexus-search ${className}`}>
      <div className="nexus-search-input">
        <Search size={23} aria-hidden="true" />
        <label className="sr-only" htmlFor={`${searchId}-input`}>Search Nexus courses and resources</label>
        <input
          ref={inputRef}
          id={`${searchId}-input`}
          type="search"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={listOpen}
          aria-controls={`${searchId}-results`}
          aria-activedescendant={activeIndex >= 0 ? `${searchId}-result-${activeIndex}` : undefined}
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(event) => { setQuery(event.target.value); setOpen(true); setActiveIndex(-1); }}
          onKeyDown={onKeyDown}
          placeholder="Search MHF4U, English, Grade 12, course planning…"
        />
        <span>{courses.length} courses</span>
      </div>

      {listOpen && (
        <div className="nexus-search-panel" id={`${searchId}-results`} role="listbox" aria-label="Nexus search suggestions">
          {results.length ? groupedTypes.map((type) => {
            const { label, Icon } = typeMeta[type];
            return (
              <section className="search-result-group" key={type} aria-label={label}>
                <div className="search-group-heading"><Icon size={16} /><span>{label}</span></div>
                {results.filter((item) => item.type === type).map((item) => {
                  const index = results.indexOf(item);
                  const resultLink = <Link id={`${searchId}-result-${index}`} className={activeIndex === index ? "is-active" : ""} role="option" aria-selected={activeIndex === index} to={item.path} onMouseEnter={() => setActiveIndex(index)} onClick={(event) => handleResultClick(event, item.path)}>{item.type === "course" && <span className="course-code">{item.label.split(" · ")[0]}</span>}<span><strong>{item.title}</strong><small>{item.type === "course" ? item.label.split(" · ").slice(1).join(" · ") : item.label}</small></span><ArrowRight size={16} aria-hidden="true" /></Link>;
                  if (item.type !== "course") return <div className="search-result-row" key={item.key}>{resultLink}</div>;
                  const course = courses.find((entry) => `course-${entry.code}` === item.key);
                  return <div className="search-result-row has-cart" key={item.key}>{resultLink}{course && <AddToCartButton course={course} className="search-add-cart" compact />}</div>;
                })}
              </section>
            );
          }) : <div className="search-empty"><strong>No close match for “{query.trim()}”.</strong><span>Try a course code, subject or grade—or choose a helpful next step.</span><div><Link to="/courses" onClick={() => setOpen(false)}>Browse all courses</Link><Link to="/courses/grade-12" onClick={() => setOpen(false)}>Grade 12 courses</Link><Link to="/inquiry" onClick={() => setOpen(false)}>Ask Guidance</Link></div></div>}
          <Link className="search-view-all" to={`/courses${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ""}`} onClick={() => setOpen(false)}>View all course results <ArrowRight size={16} /></Link>
        </div>
      )}

      <div className="search-examples"><span>Popular:</span>{["MHF4U", "ENG4U", "SPH4U", "SBI4U"].map((term) => { const course = courses.find((item) => item.code === term); return course ? <Link key={term} to={`/courses/${course.slug}`}>{term}</Link> : null; })}</div>
    </div>
  );
}
