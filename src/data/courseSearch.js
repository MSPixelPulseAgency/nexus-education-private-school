export function rankCourses(items, query) {
  const normalized = query.trim().toLowerCase();
  const compact = normalized.replace(/[^a-z0-9]/g, "");
  if (!normalized) return items;

  return items
    .map((course) => {
      const code = course.code.toLowerCase();
      const title = course.title.toLowerCase();
      const compactCode = code.replace(/[^a-z0-9]/g, "");
      const searchText = `${course.code} ${course.title} grade ${course.grade} ${course.type} ${course.department}`.toLowerCase();
      let score = 0;
      if (searchText.includes(normalized)) score = 20;
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
