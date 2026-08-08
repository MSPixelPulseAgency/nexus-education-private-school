export const brand = {
  name: "Nexus Education Private School",
  shortName: "Nexus Education",
  email: "hello@mspixelpulse.com",
  phone: "+1 (000) 000-0000",
  lms: "https://lms.nexuseps.com/",
  canonical: "https://nexuseps.vercel.app",
};

export const navigation = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Courses", to: "/courses" },
  { label: "Admissions", to: "/admissions" },
  { label: "Student Support", to: "/student-support" },
  { label: "Blog", to: "/blog" },
  { label: "Reviews", to: "/reviews" },
  { label: "Contact", to: "/contact" },
];

const unsplash = (id, width = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;

export const images = {
  hero: unsplash("photo-1531482615713-2afd69097998", 1600),
  classroom: unsplash("photo-1509062522246-3755977927d7"),
  collaboration: unsplash("photo-1522202176988-66273c2fd55f"),
  science: unsplash("photo-1532094349884-543bc11b234d"),
  graduation: unsplash("photo-1523580846011-d3a5bc25702b"),
  campus: unsplash("photo-1523240795612-9a054b0db644"),
  mentoring: unsplash("photo-1577896851231-70ef18881754"),
  planning: unsplash("photo-1454165804606-c3d57bc86b40"),
};

export const imageSets = {
  home: [images.classroom, images.science, images.collaboration],
  about: [images.campus, images.mentoring, images.graduation],
  blog: [images.planning, images.classroom, images.science, images.collaboration, images.campus, images.graduation],
};

export const staticMeta = {
  "/": ["Nexus Education Private School | Ontario Courses", "Explore Ontario secondary school credit courses, academic pathways and student support for Grades 9–12."],
  "/about": ["About Nexus Education Private School", "Learn about the clear, student-focused and future-ready approach behind Nexus Education Private School."],
  "/why-nexus": ["Why Nexus Education Private School", "Discover the clear, student-focused and future-ready approach behind Nexus Education Private School."],
  "/courses": ["Ontario Credit Courses | Nexus Education", "Search 148 course records by code, title, grade, course type and department."],
  "/admissions": ["Admissions | Nexus Education Private School", "Explore the Nexus inquiry and admissions process, prerequisite guidance and registration preparation."],
  "/student-support": ["Student Support | Nexus Education", "Find support for course selection, prerequisites, academic planning and the Nexus learning platform."],
  "/online-learning": ["Online Learning | Nexus Education", "Learn how Nexus organizes digital learning, assignments, progress tracking and student communication."],
  "/academic-planning": ["Academic Planning | Nexus Education", "Plan Ontario secondary school courses, prerequisites, postsecondary requirements and realistic workloads."],
  "/blog": ["Nexus Journal | Student Planning Guides", "Read practical guides about Ontario courses, study skills, online learning, STEM and academic pathways."],
  "/reviews": ["Reviews | Nexus Education Private School", "Share thoughtful feedback about your Nexus experience through a privacy-aware moderated review form."],
  "/inquiry": ["Start an Inquiry | Nexus Education", "Tell Nexus about your current studies, course interests and academic goals."],
  "/contact": ["Contact Nexus Education Private School", "Contact Nexus about courses, admissions, academic planning, LMS support or website accessibility."],
  "/faq": ["Frequently Asked Questions | Nexus Education", "Answers about Nexus courses, admissions, learning, LMS access and academic planning."],
  "/privacy": ["Privacy | Nexus Education", "Read how Nexus handles website inquiries, contact information and public submissions."],
  "/terms": ["Terms of Use | Nexus Education", "Read the terms for using the Nexus Education Private School website and course catalogue."],
  "/accessibility": ["Accessibility | Nexus Education", "Read the Nexus commitment to an accessible website experience and how to report a barrier."],
  "/policies": ["School Policies | Nexus Education", "Review high-level Nexus policy topics and where registered students can find course-specific expectations."],
};
