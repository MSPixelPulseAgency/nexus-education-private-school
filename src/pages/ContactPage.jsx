import { ArrowRight, BookOpenCheck, CircleHelp, GraduationCap, Headphones, Mail, MapPin, MessageCircle, Phone, Waypoints } from "lucide-react";
import { Link } from "react-router-dom";
import FAQAccordion from "../components/FAQAccordion";
import { SubmitArea } from "../components/FormStatus";
import Reveal from "../components/Reveal";
import { PageHero, SectionHeading } from "../components/UI";
import { faqGroups } from "../data/content";
import { brand, images } from "../data/site";
import useDemoSubmit from "../hooks/useDemoSubmit";
import { socialLinks } from "../config/socialLinks";

const topics = [[BookOpenCheck, "Course Question", "Codes, grade levels, types and prerequisite context."], [GraduationCap, "Admissions", "Inquiry steps and registration preparation."], [Headphones, "LMS Support", "Registered-student access and technical questions."], [Waypoints, "Academic Planning", "Course sequences, goals and postsecondary research."], [CircleHelp, "Website Accessibility", "Report a barrier or difficult interaction."], [Mail, "General", "Other public website or school questions."]];

export default function ContactPage() {
  const submit = useDemoSubmit();
  return (
    <>
      <PageHero eyebrow="CONTACT NEXUS" title="A Clear Answer Starts With a Good Question." text="Choose the topic that best matches your question and include the context needed to help." image={images.collaboration} imageAlt="Students collaborating and communicating in a modern learning space" />
      <Reveal as="section" className="section container"><SectionHeading eyebrow="CHOOSE A TOPIC" title="Help Your Question Reach the Right Place." /><div className="contact-topic-grid">{topics.map(([Icon, title, text]) => <article key={title}><span className="icon-bubble"><Icon size={21} /></span><h3>{title}</h3><p>{text}</p></article>)}</div></Reveal>
      <Reveal as="section" className="section soft-section"><div className="container contact-layout"><div className="contact-details"><SectionHeading eyebrow="CONTACT DETAILS" title="Tell Us What You Need." text="For course-specific decisions, include the exact course code and your current grade whenever possible." /><div><span><MapPin size={20} /><span><strong>Location context</strong>Toronto, Ontario, Canada</span></span><a href={`mailto:${brand.email}`}><Mail size={20} /><span><strong>Email</strong>{brand.email}</span></a><span><Phone size={20} /><span><strong>Phone</strong>Available after number verification</span></span>{socialLinks.whatsappNumber ? <a href={`https://wa.me/${socialLinks.whatsappNumber}`} target="_blank" rel="noreferrer"><MessageCircle size={20} /><span><strong>WhatsApp Nexus</strong>Open verified WhatsApp contact</span></a> : <span><MessageCircle size={20} /><span><strong>WhatsApp</strong>Configuration requires a verified Nexus number</span></span>}</div><Link className="text-link" to="/student-support">Explore Student Support <ArrowRight size={16} /></Link></div><form className="form-card" onSubmit={submit.onSubmit}><div className="form-heading"><span className="mini-label">SEND A MESSAGE</span><h2>How can Nexus help?</h2><p>Online delivery is being finalized; this form currently prepares the details without transmitting them.</p></div><div className="form-grid"><label>Name<input required autoComplete="name" /></label><label>Email<input required type="email" autoComplete="email" /></label><label>Phone <span>(optional)</span><input type="tel" autoComplete="tel" /></label><label>I am a<select required defaultValue=""><option value="" disabled>Select one</option><option>Student</option><option>Parent / Guardian</option><option>Graduate</option><option>Educator</option><option>Other</option></select></label><label className="field-wide">Topic<select required defaultValue="Course Question">{["Course Question", "Admissions", "LMS Support", "Academic Planning", "General", "Website Accessibility", "Other"].map((item) => <option key={item}>{item}</option>)}</select></label><label className="field-wide">Message<textarea rows="7" required placeholder="Include the course code, page or goal when relevant." /></label><label className="check-control field-wide"><input required type="checkbox" /><span>I consent to Nexus contacting me about this message after secure delivery is configured.</span></label></div><SubmitArea submitted={submit.submitted} label="Review Message" /></form></div></Reveal>
      <Reveal as="section" className="section container faq-home"><SectionHeading eyebrow="QUICK ANSWERS" title="You May Find the Answer Here." /><FAQAccordion items={[...faqGroups.Courses.slice(0, 2), ...faqGroups.LMS]} /></Reveal>
    </>
  );
}
