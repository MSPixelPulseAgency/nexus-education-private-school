import { useEffect, useRef, useState } from "react";
import { BookOpen, ChevronDown, GraduationCap, Menu, Monitor, ShoppingCart, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import useCart from "../hooks/useCart";
import { brand } from "../data/site";

const menuGroups = [
  {
    label: "Courses",
    paths: ["/courses", "/credit-recovery", "/upgrade-courses"],
    links: [["All Courses", "/courses"], ["Grade 9", "/courses/grade-9"], ["Grade 10", "/courses/grade-10"], ["Grade 11", "/courses/grade-11"], ["Grade 12", "/courses/grade-12"], ["Upgrade Courses", "/upgrade-courses"], ["Credit Recovery", "/credit-recovery"]],
  },
  {
    label: "Admissions",
    paths: ["/admissions", "/adult-education", "/mature-students", "/register"],
    links: [["Admissions", "/admissions"], ["Register", "/register"], ["Adult Education", "/adult-education"], ["Mature Students", "/mature-students"], ["Start an Inquiry", "/inquiry"]],
  },
  {
    label: "Student Resources",
    paths: ["/student-support", "/academic-planning", "/ossd", "/ouac", "/ocas", "/online-learning", "/student-resources"],
    links: [["Student Support", "/student-support"], ["Academic Planning", "/academic-planning"], ["OSSD", "/ossd"], ["OUAC", "/ouac"], ["OCAS", "/ocas"], ["Online Learning", "/online-learning"], ["Official Videos", "/student-resources/videos"]],
  },
];

export function Brand({ footer = false }) {
  return <Link className={`brand ${footer ? "brand-footer" : ""}`} to="/" aria-label="Nexus Education Private School home"><img className="brand-wordmark" src="/nexus-wordmark.png" alt="" width="800" height="216" decoding="async" /></Link>;
}

function CartLink({ mobile = false, onClick }) {
  const { count } = useCart();
  return <Link className={`cart-link ${mobile ? "is-mobile" : ""}`} to="/cart" onClick={onClick} aria-label={`Course cart with ${count} course${count === 1 ? "" : "s"}`}><ShoppingCart size={mobile ? 22 : 19} /><span className="cart-label">Cart</span><span className="cart-badge" aria-hidden="true">{count}</span></Link>;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState("");
  const [mobileGroup, setMobileGroup] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const menuButtonRef = useRef(null);
  const closeButtonRef = useRef(null);

  const closeMobile = () => {
    setOpen(false);
    setMobileGroup("");
  };

  useEffect(() => {
    closeMobile();
    setDesktopOpen("");
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 40);
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMobile();
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const activeGroup = (group) => group.paths.some((path) => location.pathname === path || location.pathname.startsWith(`${path}/`));

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="nav-shell container" aria-label="Primary navigation">
        <div className="mobile-header-grid">
          <button ref={menuButtonRef} className="menu-toggle" type="button" aria-label="Open navigation" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}><Menu size={23} /></button>
          <Brand />
          <CartLink mobile />
        </div>
        <div className="desktop-brand"><Brand /></div>
        <div className="desktop-nav">
          <NavLink end to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          {menuGroups.map((group) => <div className={`nav-dropdown ${activeGroup(group) ? "is-active" : ""}`} key={group.label}><button type="button" aria-expanded={desktopOpen === group.label} aria-controls={`desktop-${group.label.replace(/\s/g, "-").toLowerCase()}`} onClick={() => setDesktopOpen((value) => value === group.label ? "" : group.label)}>{group.label}<ChevronDown size={15} /></button>{desktopOpen === group.label && <div className="dropdown-panel" id={`desktop-${group.label.replace(/\s/g, "-").toLowerCase()}`}><div className="dropdown-intro"><span className="icon-bubble"><BookOpen size={20} /></span><div><strong>{group.label}</strong><small>Clear links for students and families.</small></div></div>{group.links.map(([label, to]) => <Link key={to} to={to}>{label}<span aria-hidden="true">→</span></Link>)}</div>}</div>)}
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <a href={brand.lms} target="_blank" rel="noreferrer">LMS</a>
        </div>
        <div className="desktop-nav-actions"><CartLink /><Link className="btn btn-primary nav-cta" to="/register">Register</Link></div>
      </nav>
      <div className={`mobile-menu-overlay ${open ? "is-open" : ""}`} aria-hidden={!open} onMouseDown={(event) => event.target === event.currentTarget && closeMobile()}>
        <div className="mobile-menu-sheet" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div className="mobile-menu-head"><Brand /><button ref={closeButtonRef} type="button" aria-label="Close navigation" onClick={() => { closeMobile(); menuButtonRef.current?.focus(); }}><X size={24} /></button></div>
          <div className="mobile-menu-scroll">
            <NavLink end to="/" onClick={closeMobile}>Home</NavLink>
            <NavLink to="/about" onClick={closeMobile}>About Nexus</NavLink>
            <NavLink to="/why-nexus" onClick={closeMobile}>Why Nexus</NavLink>
            {menuGroups.map((group) => <div className={`mobile-menu-group ${activeGroup(group) ? "is-active" : ""}`} key={group.label}><button type="button" aria-expanded={mobileGroup === group.label} onClick={() => setMobileGroup((value) => value === group.label ? "" : group.label)}>{group.label}<ChevronDown size={20} /></button>{mobileGroup === group.label && <div>{group.links.map(([label, to]) => <NavLink key={to} to={to} onClick={closeMobile}>{label}</NavLink>)}</div>}</div>)}
            <NavLink to="/blog" onClick={closeMobile}>Blog</NavLink>
            <NavLink to="/reviews" onClick={closeMobile}>Reviews</NavLink>
            <NavLink to="/contact" onClick={closeMobile}>Contact</NavLink>
          </div>
          <div className="mobile-menu-actions"><a className="btn btn-secondary" href={brand.lms} target="_blank" rel="noreferrer"><Monitor size={17} /> LMS Login</a><Link className="btn btn-primary" to="/register" onClick={closeMobile}><GraduationCap size={17} /> Register Now</Link></div>
        </div>
      </div>
    </header>
  );
}
