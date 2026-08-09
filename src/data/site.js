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
  study: unsplash("photo-1434030216411-0b793f4b4173"),
  adultLearning: unsplash("photo-1516321318423-f06f85e504b3"),
  university: unsplash("photo-1523050854058-8df90110c9f1"),
  college: unsplash("photo-1523240795612-9a054b0db644"),
  videoLearning: unsplash("photo-1584697964358-3e14ca57658b"),
  books: unsplash("photo-1495446815901-a7297e633e8d"),
  chemistry: unsplash("photo-1532187863486-abf9dbad1b69"),
  biology: unsplash("photo-1530210124550-912dc1381cb8"),
  physics: unsplash("photo-1635070041078-e363dbe005cb"),
  coding: unsplash("photo-1461749280684-dccba630e2f6"),
  business: unsplash("photo-1556761175-b413da4baf72"),
  geography: unsplash("photo-1526778548025-fa2f459cd5c1"),
  history: unsplash("photo-1564399579883-451a5d44ec08"),
  language: unsplash("photo-1457369804613-52c61a468e7d"),
  technology: unsplash("photo-1581092160562-40aa08e78837"),
};

export const courseVisuals = {
  "The Arts": unsplash("photo-1549490349-8643362247b5"),
  "Business Studies": images.business,
  "Canadian and World Studies": unsplash("photo-1521295121783-8a321d551ad2"),
  "Computer Studies": images.coding,
  English: images.books,
  "Guidance and Career Education": images.graduation,
  "Health and Physical Education": unsplash("photo-1571019613454-1cb2f99b2d8b"),
  Mathematics: unsplash("photo-1509228468518-180dd4864904"),
  Science: images.science,
  "Social Sciences and Humanities": unsplash("photo-1524995997946-a1c2e315a42f"),
  "Technological Education": images.technology,
};

export const getCourseVisual = (courseOrDepartment) => {
  if (typeof courseOrDepartment === "string") return courseVisuals[courseOrDepartment] || images.classroom;
  const course = courseOrDepartment || {};
  const code = course.code || "";
  const title = (course.title || "").toLowerCase();
  if (/chemistry/.test(title) || /^SCH/.test(code)) return images.chemistry;
  if (/biology/.test(title) || /^SBI/.test(code)) return images.biology;
  if (/physics/.test(title) || /^SPH/.test(code)) return images.physics;
  if (/computer|programming/.test(title) || /^(ICS|ICD|BTA)/.test(code)) return images.coding;
  if (/geograph/.test(title) || /^CG/.test(code)) return images.geography;
  if (/history/.test(title) || /^CH/.test(code)) return images.history;
  if (/english|literacy|writer/.test(title) || /^(ENG|EAE|EWC|OLC)/.test(code)) return images.books;
  if (/french|language/.test(title) || /^(FSF|FIF|FEF|LV)/.test(code)) return images.language;
  return courseVisuals[course.department] || images.classroom;
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
  "/courses": ["Ontario Credit Courses | Nexus Education", "Search 207 Nexus catalogue records by exact code, title, grade, course type and department."],
  "/admissions": ["Admissions | Nexus Education Private School", "Explore the Nexus inquiry and admissions process, prerequisite guidance and enrollment preparation."],
  "/student-support": ["Student Support | Nexus Education", "Find support for course selection, prerequisites, academic planning and the Nexus learning platform."],
  "/online-learning": ["Online Learning | Nexus Education", "Learn how Nexus organizes digital learning, assignments, progress tracking and student communication."],
  "/academic-planning": ["Academic Planning | Nexus Education", "Plan Ontario secondary school courses, prerequisites, postsecondary requirements and realistic workloads."],
  "/blog": ["Nexus Journal | Student Planning Guides", "Read practical guides about Ontario courses, study skills, online learning, STEM and academic pathways."],
  "/reviews": ["Reviews | Nexus Education Private School", "Share thoughtful feedback about your Nexus experience through a privacy-aware moderated review form."],
  "/inquiry": ["Start an Inquiry | Nexus Education", "Tell Nexus about your current studies, course interests and academic goals."],
  "/contact": ["Contact Nexus Education Private School", "Contact Nexus about courses, admissions, academic planning, LMS support or website accessibility."],
  "/faq": ["Frequently Asked Questions | Nexus Education", "Answers about Nexus courses, admissions, learning, LMS access and academic planning."],
  "/cart": ["Course Cart | Nexus Education", "Review selected Ontario secondary course records before preparing a Nexus enrollment request."],
  "/enroll": ["Enroll in Ontario Courses | Nexus Education", "Prepare selected courses and student information for a Nexus enrollment review."],
  "/register": ["Enroll in Ontario Courses | Nexus Education", "Prepare selected courses and student information for a Nexus enrollment review."],
  "/checkout": ["Course Enrollment Review | Nexus Education", "Review selected courses and prepare the required student and academic information."],
  "/credit-recovery": ["Ontario Credit Recovery Guidance | Nexus Education", "Explore course repetition, credit recovery and prerequisite planning with factual Ontario guidance."],
  "/upgrade-courses": ["Upgrade Ontario High School Courses | Nexus Education", "Plan a Grade 11 or Grade 12 course upgrade around verified postsecondary prerequisites."],
  "/adult-education": ["Adult Education and Ontario Credits | Nexus Education", "Explore Ontario secondary credits, prerequisite courses and OSSD planning for adult learners."],
  "/mature-students": ["Mature Student Ontario Course Planning | Nexus Education", "Understand document review, PLAR context and secondary course planning for mature students."],
  "/ossd": ["Ontario OSSD Requirements | Nexus Education", "Review current cohort-aware OSSD credit, literacy, community, online-learning and financial-literacy requirements."],
  "/ouac": ["OUAC Guide for Ontario Students | Nexus Education", "Plan university prerequisite courses and use the official OUAC undergraduate application guide."],
  "/ocas": ["OCAS Guide for Ontario College Applicants | Nexus Education", "Plan college prerequisites, transcripts and applications using official Ontario Colleges guidance."],
  "/student-resources/videos": ["Ontario Student Videos and Planning Resources | Nexus Education", "Watch official OUAC and Ontario Colleges guidance and open verified Ontario education resources."],
  "/understanding-course-codes": ["Ontario High School Course Codes Explained | Nexus Education", "Learn how Ontario secondary course codes identify subject, grade and course type."],
  "/ossd-requirements": ["Ontario OSSD Requirements Planning Guide | Nexus Education", "Review the main Ontario graduation planning areas and confirm the requirements for your Grade 9 entry cohort."],
  "/university-planning": ["Ontario University Course Planning Guide | Nexus Education", "Build a high school course plan around current university prerequisites and official sources."],
  "/college-planning": ["Ontario College Course Planning Guide | Nexus Education", "Compare Ontario college program requirements, prerequisites and preparation."],
  "/parent-guardian-guide": ["Parent and Guardian Course Planning Guide | Nexus Education", "Practical prompts for families supporting course research and independent learning habits."],
  "/privacy": ["Privacy | Nexus Education", "Read how Nexus handles website inquiries, contact information and public submissions."],
  "/terms": ["Terms of Use | Nexus Education", "Read the terms for using the Nexus Education Private School website and course catalogue."],
  "/accessibility": ["Accessibility | Nexus Education", "Read the Nexus commitment to an accessible website experience and how to report a barrier."],
  "/policies": ["School Policies | Nexus Education", "Review high-level Nexus policy topics and where registered students can find course-specific expectations."],
};
