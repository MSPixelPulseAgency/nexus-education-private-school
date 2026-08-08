import { ExternalLink, PlayCircle } from "lucide-react";
import Reveal from "../components/Reveal";
import { CTASection, PageHero, SectionHeading } from "../components/UI";
import { images } from "../data/site";
import { officialResourceLinks, officialVideos } from "../data/videos";

export default function VideosPage() {
  return (
    <>
      <PageHero eyebrow="STUDENT RESOURCES" title="Official Videos and Ontario Planning Resources." text="Watch official OUAC and Ontario Colleges guidance, then use current primary sources for curriculum, diploma and application details." image={images.videoLearning} imageAlt="Student watching an education video and taking notes" metaTitle="Ontario Student Videos and Planning Resources | Nexus Education" />
      <Reveal as="section" className="section container">
        <SectionHeading eyebrow="OFFICIAL VIDEO GUIDES" title="Learn From the Organizations Running the Process." text="Videos are embedded from verified official channels and loaded only when requested by the browser." />
        <div className="video-grid">{officialVideos.map((video) => <article className="video-card" key={video.youtubeId}><div className="video-frame"><iframe src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`} title={video.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div><div><span className="eyebrow"><PlayCircle size={14} /> {video.category}</span><h2>{video.title}</h2><strong>{video.organization}</strong><p>{video.description}</p><a className="text-link" href={video.source} target="_blank" rel="noreferrer">Official source <ExternalLink size={15} /></a></div></article>)}</div>
      </Reveal>
      <Reveal as="section" className="section soft-section"><div className="container"><SectionHeading eyebrow="PRIMARY SOURCES" title="Keep Planning Information Current." /><div className="resource-link-grid">{officialResourceLinks.map(([title, text, url]) => <a key={url} href={url} target="_blank" rel="noreferrer"><span className="icon-bubble"><ExternalLink size={20} /></span><h2>{title}</h2><p>{text}</p><strong>Open official resource</strong></a>)}</div></div></Reveal>
      <CTASection title="Need Help Connecting a Requirement to a Course?" text="Bring the program or graduation requirement you are researching and ask Nexus about the matching catalogue record." />
    </>
  );
}
