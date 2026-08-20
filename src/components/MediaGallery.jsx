import { images } from "../data/site";

const galleryItems = [
  { image: images.elementary, label: "Elementary learning", alt: "Young learners working together in a classroom" },
  { image: images.reading, label: "Reading and literacy", alt: "Student reading and building literacy skills" },
  { image: images.stemTeam, label: "STEM exploration", alt: "Students collaborating on a science and technology activity" },
  { image: images.onlineLesson, label: "Online learning", alt: "Student learning online at a laptop" },
  { image: images.artLearning, label: "Creative learning", alt: "Learners exploring visual art materials" },
  { image: images.graduationGroup, label: "Future pathways", alt: "Graduates celebrating an education milestone" },
];

export default function MediaGallery() {
  return (
    <div className="education-gallery" aria-label="Education experience gallery">
      {galleryItems.map((item, index) => (
        <figure className={`education-gallery-item item-${index + 1}`} key={item.label}>
          <img src={item.image} alt={item.alt} width="900" height="720" loading="lazy" decoding="async" />
          <figcaption>{item.label}</figcaption>
        </figure>
      ))}
    </div>
  );
}
