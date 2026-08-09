import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import courseRows from "../src/data/courses.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const summaries = courseRows.map(({ outline, ...course }) => ({
  ...course,
  outlineLength: Array.isArray(outline) ? outline.length : 0,
}));
const searchIndex = summaries.map(({ code, title, slug, grade, type, credit, department, prerequisite }) => ({
  code, title, slug, grade, type, credit, department, prerequisite,
}));
const popularCodes = ["MHF4U", "ENG4U", "SPH4U", "SBI4U", "SCH4U", "ICS4U", "BBB4M", "HHS4U"];
const popular = popularCodes.map((code) => summaries.find((course) => course.code === code)).filter(Boolean);
const output = `// Generated from src/data/courses.js. Run npm run generate:course-summaries after catalogue imports.\nexport default ${JSON.stringify(summaries)};\n`;
const indexOutput = `// Generated lightweight index for homepage search.\nexport default ${JSON.stringify(searchIndex)};\n`;
const popularOutput = `// Generated real popular-course records.\nexport default ${JSON.stringify(popular)};\n`;

writeFileSync(resolve(root, "src/data/course-summaries.js"), output);
writeFileSync(resolve(root, "src/data/course-index.js"), indexOutput);
writeFileSync(resolve(root, "src/data/popular-courses.js"), popularOutput);
console.log(`Generated ${summaries.length} lightweight course summaries.`);
