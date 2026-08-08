import courseRows from "./courses.js";
import blogRows from "./blogs.js";

export const courses = courseRows.map((row) => ({
  ...row,
  searchText: `${row.code} ${row.title} grade ${row.grade} ${row.type} ${row.department}`.toLowerCase(),
}));

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

export const featuredCourses = ["MHF4U", "ENG4U", "SPH4U", "SBI4U", "ICS4U", "HSP3U"]
  .map((code) => courses.find((course) => course.code === code))
  .filter(Boolean);

export function rankCourses(items, query) {
  const normalized = query.trim().toLowerCase();
  const compact = normalized.replace(/[^a-z0-9]/g, "");
  if (!normalized) return items;

  return items
    .map((course) => {
      const code = course.code.toLowerCase();
      const title = course.title.toLowerCase();
      const compactCode = code.replace(/[^a-z0-9]/g, "");
      let score = 0;
      if (course.searchText.includes(normalized)) score = 20;
      if (title.includes(normalized)) score = 35;
      if (title.startsWith(normalized)) score = 55;
      if (compact && compactCode.includes(compact)) score = 70;
      if (compact && compactCode.startsWith(compact)) score = 90;
      if (compact && compactCode === compact) score = 120;
      return { course, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.course.code.localeCompare(b.course.code))
    .map(({ course }) => course);
}
