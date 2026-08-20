import { ArrowUpRight, ImageOff } from "lucide-react";

export default function StaffCard({ member, compact = false }) {
  return (
    <article className={`staff-card ${compact ? "is-compact" : ""}`}>
      <div className="staff-photo">
        {member.photo ? (
          <img src={member.photo} alt={`${member.name}, ${member.role}`} width="720" height="840" loading="lazy" decoding="async" />
        ) : (
          <div className="staff-photo-placeholder" role="img" aria-label={`Photo pending for ${member.name}`}>
            <span>{member.initials}</span>
            <small><ImageOff size={14} /> Approved photo pending</small>
          </div>
        )}
      </div>
      <div className="staff-card-copy">
        <span className="mini-label">{member.department}</span>
        <h3>{member.name}</h3>
        <strong>{member.role}</strong>
        {member.agency && <span className="staff-agency">{member.agency}</span>}
        <p>{member.bio}</p>
        {!compact && <div className="staff-specialties" aria-label={`${member.name} specialties`}>{member.specialties.map((item) => <span key={item}>{item}</span>)}</div>}
        <div className="staff-links">{member.links.map((link) => <a href={link.url} target="_blank" rel="noreferrer" key={link.url}>{link.label} <ArrowUpRight size={15} /></a>)}</div>
      </div>
    </article>
  );
}
