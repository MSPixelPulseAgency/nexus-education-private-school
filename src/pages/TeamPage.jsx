import { ArrowRight, BadgeCheck, ShieldCheck, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import StaffCard from "../components/StaffCard";
import { CTASection, PageHero, SectionHeading } from "../components/UI";
import { images } from "../data/site";
import { teamContentStatus, teamMembers } from "../data/team";

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT NEXUS"
        title="Meet the Nexus Team."
        text="A transparent team directory for the people supporting learning, guidance, administration and the Nexus digital experience. Only school-approved information is published."
        image={images.collaboration}
        imageAlt="Education professionals collaborating around a table"
        metaTitle="Meet the Nexus Team | Nexus Education"
        breadcrumbs={[{ label: "About Us", to: "/about" }, { label: "Our Team" }]}
      >
        <Link className="btn btn-primary" to="/inquiry">Contact Nexus <ArrowRight size={17} /></Link>
        <Link className="btn btn-secondary" to="/about">About the School</Link>
      </PageHero>

      <Reveal as="section" className="section container team-intro-grid">
        <div>
          <SectionHeading eyebrow="PEOPLE WITH PURPOSE" title="Support should feel human and accountable." text="This directory separates approved public profiles from information still awaiting confirmation, so students and families always know what is verified." />
        </div>
        <div className="team-principles">
          <span><UsersRound size={22} /><strong>Student-centred</strong><small>Roles are explained through the support they provide.</small></span>
          <span><BadgeCheck size={22} /><strong>Fact-checked</strong><small>No invented staff, credentials or qualifications.</small></span>
          <span><ShieldCheck size={22} /><strong>Privacy-aware</strong><small>Only approved public contact details are shown.</small></span>
        </div>
      </Reveal>

      <Reveal as="section" className="section soft-section">
        <div className="container">
          <SectionHeading eyebrow="TECHNOLOGY & LMS" title="Digital Learning Support." text="The currently approved public profile supports the school website and learning-platform implementation." />
          <div className="team-grid">{teamMembers.map((member) => <StaffCard member={member} key={member.slug} />)}</div>
        </div>
      </Reveal>

      <Reveal as="section" className="section container">
        <div className="content-status-panel">
          <span className="icon-bubble"><UsersRound size={22} /></span>
          <div><span className="mini-label">SCHOOL-PROVIDED CONTENT NEEDED</span><h2>{teamContentStatus.title}</h2><p>{teamContentStatus.text}</p></div>
        </div>
      </Reveal>

      <CTASection title="Connect With the Right Nexus Support." text="Share the student’s question and Nexus can route it to the appropriate academic, admissions or technical support path." />
    </>
  );
}
