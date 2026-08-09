import blogRows from "./blogs.js";

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

export const blogs = blogRows.map((row, index) => ({
  title: row.t,
  slug: row.s,
  category: row.c,
  readTime: `${5 + (index % 5)} min read`,
  excerpt: excerpts[row.c] || "Clear, practical guidance for students and families planning their next academic step.",
  visual: index % 6,
}));

export const blogCategories = [...new Set(blogs.map((post) => post.category))];
