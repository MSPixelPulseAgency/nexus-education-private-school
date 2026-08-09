import courseRows from "./course-index.js";
import popularCourses from "./popular-courses.js";
import { blogs } from "./blogCatalog.js";
import { rankCourses } from "./courseSearch.js";

export const homeCourses = courseRows;
export const homePopularCourses = popularCourses;
export const homeBlogs = blogs;
export const homeGradeCounts = Object.fromEntries(
  [9, 10, 11, 12].map((grade) => [grade, courseRows.filter((course) => course.grade === grade).length]),
);
export { rankCourses };
