import { ExternalLink } from "lucide-react";

export default function OfficialResourceGrid({ resources, compact = false }) {
  return (
    <div className={`official-resource-grid ${compact ? "is-compact" : ""}`}>
      {resources.map(({ Icon, organization, title, description, url }) => (
        <a className="official-resource-card" href={url} target="_blank" rel="noreferrer" key={url}>
          <span className="resource-card-icon" aria-hidden="true"><Icon size={22} /></span>
          <span className="official-label">Official External Resource</span>
          <h3>{title}</h3>
          <p>{description}</p>
          <span className="resource-organization">{organization}</span>
          <span className="resource-open">Open official website <ExternalLink size={15} /></span>
        </a>
      ))}
    </div>
  );
}
