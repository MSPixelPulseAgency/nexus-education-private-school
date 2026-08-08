import { ArrowUp, BookOpen, GraduationCap, Headphones, HelpCircle, MessageCircle, School, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const options = [
  ["Find a Course", "/courses", BookOpen],
  ["Registration Help", "/register", GraduationCap],
  ["OUAC Help", "/ouac", School],
  ["OCAS Help", "/ocas", School],
  ["LMS Support", "/contact", Headphones],
  ["Contact Nexus", "/contact", HelpCircle],
];

export default function FloatingHelp() {
  const [open, setOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const panelRef = useRef(null);
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 650);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return undefined;
    panelRef.current?.querySelector("a")?.focus();
    const onKeyDown = (event) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);
  return <div className="floating-tools">
    {open && <div className="help-panel" role="dialog" aria-modal="false" aria-label="Nexus guided help" ref={panelRef}><div><span className="mini-label">GUIDED HELP</span><button type="button" aria-label="Close help" onClick={() => setOpen(false)}><X size={19} /></button></div><h2>How can we point you?</h2><p>This is a guided help menu, not an AI chat service.</p>{options.map(([label, to, Icon]) => <Link key={to + label} to={to} onClick={() => setOpen(false)}><Icon size={18} />{label}</Link>)}</div>}
    <div className="floating-tool-buttons">{showTop && <button className="back-to-top" type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><ArrowUp size={21} /></button>}<button className="help-toggle" type="button" aria-label={open ? "Close Nexus help" : "Open Nexus help"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>{open ? <X size={23} /> : <MessageCircle size={23} />}</button></div>
  </div>;
}
