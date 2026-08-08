import { useEffect, useRef, useState } from "react";
import { BookOpen, ChevronDown, GraduationCap, Menu, Monitor, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { brand, navigation } from "../data/site";

const academicLinks = [
  ["All Courses", "/courses"],
  ["Grade 9", "/courses/grade-9"],
  ["Grade 10", "/courses/grade-10"],
  ["Grade 11", "/courses/grade-11"],
  ["Grade 12", "/courses/grade-12"],
  ["Academic Planning", "/academic-planning"],
  ["Understanding Course Codes", "/understanding-course-codes"],
  ["OSSD Requirements", "/ossd-requirements"],
  ["Online Learning", "/online-learning"],
];

export function Brand({ footer = false }) {
  return (
    <Link className={`brand ${footer ? "brand-footer" : ""}`} to="/" aria-label="Nexus Education Private School home">
      <img
        className="brand-wordmark"
        src="/nexus-wordmark.png"
        alt=""
        width="800"
        height="216"
        decoding="async"
      />
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [academicsOpen, setAcademicsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);

  useEffect(() => {
    setOpen(false);
    setAcademicsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open && !academicsOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        setAcademicsOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [academicsOpen, open]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="nav-shell container" aria-label="Primary navigation">
        <Brand />
        <div className="desktop-nav">
          {navigation.slice(0, 2).map((item) => (
            <NavLink end={item.to === "/"} key={item.to} to={item.to}>{item.label}</NavLink>
          ))}
          <div className="nav-dropdown">
            <button
              type="button"
              aria-expanded={academicsOpen}
              aria-controls="academics-menu"
              onClick={() => setAcademicsOpen((value) => !value)}
            >
              Courses <ChevronDown size={15} aria-hidden="true" />
            </button>
            {academicsOpen && (
              <div className="dropdown-panel" id="academics-menu">
                <div className="dropdown-intro">
                  <span className="icon-bubble"><BookOpen size={20} /></span>
                  <div><strong>Academics</strong><small>Explore courses and build a pathway.</small></div>
                </div>
                {academicLinks.map(([label, to]) => <Link key={to} to={to}>{label}<span aria-hidden="true">→</span></Link>)}
              </div>
            )}
          </div>
          {navigation.slice(3).map((item) => (
            <NavLink end={item.to === "/"} key={item.to} to={item.to}>{item.label}</NavLink>
          ))}
          <a href={brand.lms} target="_blank" rel="noreferrer">LMS</a>
        </div>
        <Link className="btn btn-primary nav-cta" to="/inquiry">Start Inquiry</Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={23} /> : <Menu size={23} />}
        </button>
      </nav>
      <div className={`mobile-menu-wrap ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="mobile-menu container" id="mobile-menu" ref={menuRef}>
          <div className="mobile-menu-grid">
            {navigation.map((item) => <NavLink end={item.to === "/"} tabIndex={open ? 0 : -1} key={item.to} to={item.to}>{item.label}</NavLink>)}
            <Link tabIndex={open ? 0 : -1} to="/academic-planning">Academic Planning</Link>
            <Link tabIndex={open ? 0 : -1} to="/ossd-requirements">OSSD Requirements</Link>
            <Link tabIndex={open ? 0 : -1} to="/parent-guardian-guide">Parent & Guardian Guide</Link>
            <Link tabIndex={open ? 0 : -1} to="/online-learning">Online Learning</Link>
          </div>
          <div className="mobile-menu-actions">
            <a className="btn btn-secondary" tabIndex={open ? 0 : -1} href={brand.lms} target="_blank" rel="noreferrer"><Monitor size={17} /> LMS Login</a>
            <Link className="btn btn-primary" tabIndex={open ? 0 : -1} to="/inquiry"><GraduationCap size={17} /> Start Inquiry</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
