import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import Reveal from "../components/Reveal";
import { CTASection, PageHero } from "../components/UI";
import { courseTypes, courses, departmentsList, rankCourses } from "../data/catalog";

const PAGE_SIZE = 8;
const pathwayLinks = [["Upgrade / Repeat Courses", "/upgrade-courses"], ["Credit Recovery", "/credit-recovery"], ["Adult Education", "/adult-education"]];

export default function CoursesPage({ gradeOverride = "" }) {
  const routeGrade = gradeOverride;
  const [params, setParams] = useSearchParams();
  const query = params.get("q") || "";
  const grade = routeGrade || params.get("grade") || "";
  const type = params.get("type") || "";
  const department = params.get("department") || "";
  const sort = params.get("sort") || "relevance";
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [filterOpen, setFilterOpen] = useState(false);
  const filterButtonRef = useRef(null);
  const closeFilterRef = useRef(null);

  const closeFilterDrawer = () => {
    setFilterOpen(false);
    window.setTimeout(() => filterButtonRef.current?.focus(), 0);
  };

  useEffect(() => setVisible(PAGE_SIZE), [query, grade, type, department, sort]);
  useEffect(() => {
    if (!filterOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => closeFilterRef.current?.focus(), 40);
    const close = (event) => {
      if (event.key === "Escape") {
        setFilterOpen(false);
        window.setTimeout(() => filterButtonRef.current?.focus(), 0);
      }
    };
    document.addEventListener("keydown", close);
    return () => { window.clearTimeout(focusTimer); document.body.style.overflow = previous; document.removeEventListener("keydown", close); };
  }, [filterOpen]);

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value); else next.delete(key);
    setParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    let list = courses.filter((course) => (!grade || course.grade === Number(grade)) && (!type || course.type === type) && (!department || course.department === department));
    list = rankCourses(list, query);
    if (sort === "code") list = [...list].sort((a, b) => a.code.localeCompare(b.code));
    if (sort === "title") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "grade") list = [...list].sort((a, b) => a.grade - b.grade || a.code.localeCompare(b.code));
    return list;
  }, [department, grade, query, sort, type]);

  const reset = () => setParams({}, { replace: true });
  const hasFilters = query || (!routeGrade && grade) || type || department || sort !== "relevance";

  const filters = <>
    <div className="filter-title"><span><SlidersHorizontal size={18} /> Filters</span>{hasFilters && <button type="button" onClick={reset}>Reset</button>}</div>
    {!routeGrade && <label>Grade<select value={grade} onChange={(event) => update("grade", event.target.value)}><option value="">All grades</option>{[9,10,11,12].map((item) => <option key={item} value={item}>Grade {item}</option>)}</select></label>}
    <label>Department<select value={department} onChange={(event) => update("department", event.target.value)}><option value="">All departments</option>{departmentsList.map((item) => <option key={item}>{item}</option>)}</select></label>
    <label>Course type<select value={type} onChange={(event) => update("type", event.target.value)}><option value="">All course types</option>{courseTypes.map((item) => <option key={item}>{item}</option>)}</select></label>
    <label>Sort by<select value={sort} onChange={(event) => update("sort", event.target.value)}><option value="relevance">Relevance</option><option value="code">Course code</option><option value="title">Course title</option><option value="grade">Grade level</option></select></label>
    <div className="grade-filter-links"><span>Browse by grade</span>{[12,11,10,9].map((item) => <Link className={String(item) === routeGrade ? "active" : ""} key={item} to={`/courses/grade-${item}`}>Grade {item}<ArrowRight size={14} /></Link>)}</div>
    <div className="pathway-filter-links"><span>Pathway guidance</span>{pathwayLinks.map(([label, to]) => <Link key={to} to={to}>{label}<ArrowRight size={14} /></Link>)}</div>
  </>;

  return (
    <>
      <PageHero compact eyebrow="ACADEMICS" title={routeGrade ? `Grade ${routeGrade} Courses` : "Find the Course That Moves You Forward."} text="Search the Nexus catalogue by exact course code, title, grade, course type or department. Exact code matches rank first." metaTitle={routeGrade ? `Grade ${routeGrade} Ontario Courses | Nexus Education` : undefined} metaDescription={routeGrade ? `Explore ${filtered.length} Grade ${routeGrade} Ontario secondary course records in the Nexus Education catalogue.` : undefined} breadcrumbs={[{ label: "Courses", to: routeGrade ? "/courses" : undefined }, ...(routeGrade ? [{ label: `Grade ${routeGrade}` }] : [])]}><Link className="btn btn-primary" to="/enroll">Enroll in Courses <ArrowRight size={17} /></Link><Link className="btn btn-secondary" to="/academic-planning">Plan Your Path</Link></PageHero>
      <Reveal as="section" className="section container course-marketplace">
        <nav className="catalog-grade-tabs" aria-label="Browse courses by grade"><Link className={!routeGrade ? "active" : ""} to="/courses">All Courses</Link>{[12,11,10,9].map((item) => <Link className={String(item) === routeGrade ? "active" : ""} key={item} to={`/courses/grade-${item}`}>Grade {item}</Link>)}</nav>
        <h2 className="sr-only">Course catalogue results</h2>
        <div className="catalog-toolbar"><div className="catalog-search"><Search size={21} /><label className="sr-only" htmlFor="catalog-search">Search courses</label><input id="catalog-search" value={query} onChange={(event) => update("q", event.target.value)} placeholder="Search MHF4U, Physics, Grade 12…" /></div><button ref={filterButtonRef} className="mobile-filter-button" type="button" onClick={() => setFilterOpen(true)}><Filter size={18} /> Filters{hasFilters && <span>Active</span>}</button><div className="catalog-count"><strong>{filtered.length}</strong><span>course{filtered.length === 1 ? "" : "s"} found</span></div></div>
        <div className="catalog-layout"><aside className="catalog-filters" aria-label="Course filters">{filters}</aside><div className="catalog-results"><div className="active-filters" aria-label="Active filters">{query && <button onClick={() => update("q", "")}>Search: {query} <X size={14} /></button>}{!routeGrade && grade && <button onClick={() => update("grade", "")}>Grade {grade} <X size={14} /></button>}{type && <button onClick={() => update("type", "")}>{type} <X size={14} /></button>}{department && <button onClick={() => update("department", "")}>{department} <X size={14} /></button>}{!hasFilters && <span><Filter size={15} /> Showing the full catalogue</span>}</div>{filtered.length ? <><div className="card-grid two catalog-grid">{filtered.slice(0, visible).map((course) => <CourseCard course={course} key={course.code} />)}</div>{visible < filtered.length && <div className="section-action"><button className="btn btn-secondary" type="button" onClick={() => setVisible((count) => count + PAGE_SIZE)}>Load More Courses <ArrowRight size={16} /></button><span>{Math.min(visible, filtered.length)} of {filtered.length}</span></div>}</> : <div className="empty-state"><Search size={34} /><h2>No courses match those filters.</h2><p>Try another code, title, grade or department—or clear the active filters.</p><button className="btn btn-primary" type="button" onClick={reset}>Clear Filters</button></div>}</div></div>
      </Reveal>
      <div className={`filter-drawer-overlay ${filterOpen ? "is-open" : ""}`} aria-hidden={!filterOpen} onMouseDown={(event) => event.target === event.currentTarget && closeFilterDrawer()}><aside className="filter-drawer" role="dialog" aria-modal="true" aria-label="Course filters"><div className="filter-drawer-head"><div><span className="mini-label">COURSE CATALOGUE</span><h2>Filter courses</h2></div><button ref={closeFilterRef} type="button" aria-label="Close filters" onClick={closeFilterDrawer}><X size={24} /></button></div><div className="filter-drawer-scroll">{filters}</div><div className="filter-drawer-actions"><button className="btn btn-secondary" type="button" onClick={reset}>Clear All</button><button className="btn btn-primary" type="button" onClick={closeFilterDrawer}>Apply Filters · {filtered.length}</button></div></aside></div>
      <CTASection />
    </>
  );
}
