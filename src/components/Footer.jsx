import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { brand } from "../data/site";
import { Brand } from "./Header";

const groups = [
  ["Nexus", [["About", "/about"], ["Why Nexus", "/why-nexus"], ["Contact", "/contact"]]],
  ["Academics", [["All Courses", "/courses"], ["Grade 9", "/courses/grade-9"], ["Grade 10", "/courses/grade-10"], ["Grade 11", "/courses/grade-11"], ["Grade 12", "/courses/grade-12"], ["Course Codes", "/understanding-course-codes"]]],
  ["Students", [["Student Support", "/student-support"], ["Academic Planning", "/academic-planning"], ["OSSD Requirements", "/ossd-requirements"], ["University Planning", "/university-planning"], ["College Planning", "/college-planning"]]],
  ["Resources", [["Parent & Guardian Guide", "/parent-guardian-guide"], ["Online Learning", "/online-learning"], ["Blog", "/blog"], ["Reviews", "/reviews"], ["FAQ", "/faq"]]],
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-glow" aria-hidden="true" />
      <div className="container footer-main">
        <div className="footer-about">
          <Brand footer />
          <p>Modern Ontario secondary school learning built around clear pathways, flexible access and meaningful student support.</p>
          <div className="footer-contact">
            <span><MapPin size={16} /> Toronto, Ontario, Canada</span>
            <a href={`mailto:${brand.email}`}><Mail size={16} /> {brand.email}</a>
            <a href={`tel:${brand.phone.replace(/[^+\d]/g, "")}`}><Phone size={16} /> {brand.phone}</a>
          </div>
        </div>
        <div className="footer-links">
          {groups.map(([heading, links]) => (
            <div key={heading}>
              <h2>{heading}</h2>
              {links.map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}
            </div>
          ))}
        </div>
      </div>
      <div className="container footer-lms">
        <div><strong>Already registered?</strong><span>Continue your learning in the secure Nexus LMS.</span></div>
        <a href={brand.lms} target="_blank" rel="noreferrer">Open LMS <ArrowUpRight size={17} /></a>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Nexus Education Private School.</span>
        <span className="legal-links"><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link><Link to="/accessibility">Accessibility</Link></span>
        <span>Website by MSPixelPulse</span>
      </div>
    </footer>
  );
}
