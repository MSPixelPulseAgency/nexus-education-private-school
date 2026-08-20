import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import LazyVideoCard from "../components/LazyVideoCard";
import Reveal from "../components/Reveal";
import { CTASection, PageHero, SectionHeading } from "../components/UI";
import { images } from "../data/site";
import { officialResourceLinks, officialVideos } from "../data/videos";

export default function VideosPage() {
  return (
    <>
      <PageHero eyebrow="STUDENT RESOURCES" title="Official Videos and Ontario Planning Resources." text="Watch current guidance from the organizations responsible for Ontario applications and pathways. Videos load only after you choose Play." image={images.videoLearning} imageAlt="Student watching an education video and taking notes" metaTitle="Ontario Student Videos and Planning Resources | Nexus Education" breadcrumbs={[{ label: "Resources", to: "/resources" }, { label: "Official Videos" }]}><Link className="btn btn-primary" to="/resources">Browse All Resources <ArrowRight size={17} /></Link></PageHero>
      <Reveal as="section" className="section container">
        <SectionHeading eyebrow="OFFICIAL VIDEO GUIDES" title="Learn From the Organizations Running the Process." text="Each card begins as a lightweight thumbnail. The privacy-enhanced YouTube player is created only after you press Play." />
        <div className="lazy-video-grid">{officialVideos.map((video) => <LazyVideoCard video={video} key={video.youtubeId} />)}</div>
      </Reveal>
      <Reveal as="section" className="section soft-section"><div className="container"><SectionHeading eyebrow="PRIMARY SOURCES" title="Keep Planning Information Current." /><div className="resource-link-grid">{officialResourceLinks.map(([title, text, url]) => <a key={url} href={url} target="_blank" rel="noreferrer"><span className="icon-bubble"><ExternalLink size={20} /></span><h2>{title}</h2><p>{text}</p><strong>Open official resource <ExternalLink size={14} /></strong></a>)}</div></div></Reveal>
      <CTASection title="Need Help Connecting a Requirement to a Course?" text="Bring the program or graduation requirement you are researching and ask Nexus about the matching catalogue record." />
    </>
  );
}
