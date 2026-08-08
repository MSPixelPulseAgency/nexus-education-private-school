import courseRows from "./courses.js";
import blogRows from "./blogs.js";

const codeFixes = { TEa4E: "TEJ4E", TEa4M: "TEJ4M", TTz0E: "TTJ4E" };

const departments = {
  A: "The Arts",
  C: "Canadian & World Studies",
  H: "Social Sciences & Humanities",
  P: "Health & Physical Education",
  T: "Technological Education",
};

export const courses = courseRows.map((row) => {
  const code = codeFixes[row.c] || row.c;
  return {
    code,
    title: row.t,
    slug: row.s,
    grade: row.g,
    type: row.y || "Ontario Credit",
    credit: 1,
    department: departments[code.charAt(0)] || "Ontario Credit Courses",
    description: `${row.t} (${code}) is listed in the Nexus catalogue as a Grade ${row.g} ${row.y || "Ontario credit"} course.`,
  };
});

export const blogs = blogRows.map((row, index) => ({
  title: row.t,
  slug: row.s,
  category: row.c,
  readTime: `${5 + (index % 5)} min read`,
  excerpt: excerptFor(row.c),
  visual: index % 6,
}));

function excerptFor(category) {
  const excerpts = {
    "Ontario Credits & Course Planning": "Understand Ontario course codes, prerequisites and the choices that shape a clear secondary-school plan.",
    "Grade 9": "Practical guidance for building a confident Grade 9 foundation and making the transition into secondary school.",
    "Grade 10": "Make thoughtful Grade 10 choices while strengthening core skills and beginning to explore future pathways.",
    "Grade 11": "Connect Grade 11 course decisions with prerequisites, interests and the options you may want after high school.",
    "Grade 12 & Postsecondary": "Plan Grade 12 with graduation, university, college and future program requirements in view.",
    "Study Skills & Student Success": "Use realistic routines, planning tools and study strategies to make steady academic progress.",
    "Online Learning": "Create a focused digital-learning routine with practical organization, communication and technology habits.",
    "STEM & Future Skills": "Explore how science, technology, creativity and problem solving can support future-ready learning.",
    "Parents & Families": "Clear prompts and planning ideas to help families support students without taking over their decisions.",
    "Academic Pathways & Careers": "Connect current courses with possible programs, careers and the prerequisites that may come next.",
    "School Life & Motivation": "Small, sustainable habits that help students navigate busy weeks, transitions and changing goals.",
  };
  return excerpts[category] || "Clear, practical guidance for students and families planning their next academic step.";
}

export const gradeCounts = Object.fromEntries(
  [9, 10, 11, 12].map((grade) => [grade, courses.filter((course) => course.grade === grade).length]),
);

export const departmentsList = [...new Set(courses.map((course) => course.department))].sort();
export const courseTypes = [...new Set(courses.map((course) => course.type))].sort();
export const blogCategories = [...new Set(blogs.map((post) => post.category))];

export const featuredCourses = ["CGC1W", "CHC2D", "HSP3U", "PSK4U", "CLN4U", "TGJ4M"]
  .map((code) => courses.find((course) => course.code === code))
  .filter(Boolean);

export function rankCourses(items, query) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return items;
  return items
    .map((course) => {
      const code = course.code.toLowerCase();
      const title = course.title.toLowerCase();
      const haystack = `${code} ${title} grade ${course.grade} ${course.type} ${course.department}`.toLowerCase();
      let score = haystack.includes(normalized) ? 1 : 0;
      if (title.startsWith(normalized)) score = 3;
      if (code.startsWith(normalized)) score = 5;
      if (code === normalized) score = 10;
      return { course, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.course.code.localeCompare(b.course.code))
    .map(({ course }) => course);
}
