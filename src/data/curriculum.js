export const curriculumMainUrl = "https://www.dcp.edu.gov.on.ca/en/curriculum";
export const courseDescriptionsUrl = "https://www.dcp.edu.gov.on.ca/en/course-descriptions-and-prerequisites";

export const curriculumByDepartment = {
  English: "https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-english",
  Mathematics: "https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-mathematics",
  Science: "https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-science",
  "The Arts": "https://www.dcp.edu.gov.on.ca/en/curriculum/arts",
  "Business Studies": "https://www.dcp.edu.gov.on.ca/en/curriculum/business-studies",
  "Canadian and World Studies": "https://www.dcp.edu.gov.on.ca/en/curriculum/canadian-and-world-studies",
  "Computer Studies": "https://www.dcp.edu.gov.on.ca/en/curriculum/computer-studies",
  "French as a Second Language": "https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-fsl",
  "Guidance and Career Education": "https://www.dcp.edu.gov.on.ca/en/curriculum/guidance-and-career-education",
  "Health and Physical Education": "https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-health-and-physical-education",
  "Social Sciences and Humanities": "https://www.dcp.edu.gov.on.ca/en/curriculum/social-sciences-humanities",
  "Technological Education": "https://www.dcp.edu.gov.on.ca/en/curriculum/technological-education",
  "First Nations, Metis and Inuit Studies": "https://www.dcp.edu.gov.on.ca/en/curriculum/first-nations-metis-inuit-studies",
  "Classical and International Languages": "https://www.dcp.edu.gov.on.ca/en/curriculum/classical-international-languages",
  "American Sign Language as a Second Language": "https://www.dcp.edu.gov.on.ca/en/curriculum/american-sign-language",
  "Interdisciplinary Studies": "https://www.dcp.edu.gov.on.ca/en/curriculum/interdisciplinary-studies",
  "Cooperative Education": "https://www.dcp.edu.gov.on.ca/en/curriculum/cooperative-education",
  "English as a Second Language / English Literacy Development": "https://www.dcp.edu.gov.on.ca/en/curriculum/sec-esl-eld",
  "Ontario Secondary School Literacy Course": "https://www.dcp.edu.gov.on.ca/en/curriculum/ontario-secondary-school-literacy-course",
  "Locally Developed Courses": "https://www.dcp.edu.gov.on.ca/en/curriculum/locally-developed-courses",
  "Native Languages": "https://www.dcp.edu.gov.on.ca/en/curriculum/native-languages",
};

export function getCurriculumUrl(course) {
  return course.sourceUrl || curriculumByDepartment[course.department] || courseDescriptionsUrl;
}

export function learningHighlights(course) {
  const sentences = course.description
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter((item) => item.length > 24);
  return sentences.slice(0, 4);
}

export function courseFaqs(course) {
  const prerequisite = course.prerequisite && course.prerequisite !== "None"
    ? `The catalogue lists ${course.prerequisite}. Nexus should confirm how that prerequisite applies to the student's record before registration.`
    : "The current catalogue record lists no prerequisite. Nexus should still confirm eligibility and current availability before registration.";
  return [
    [`What is ${course.code}?`, `${course.code} is ${course.title}, a Grade ${course.grade} ${course.type} Ontario secondary school course record worth ${course.credit} credit.`],
    [`What is the prerequisite for ${course.code}?`, prerequisite],
    [`Who should consider ${course.code}?`, `Students can consider ${course.code} when its Grade ${course.grade} level, ${course.type} destination and prerequisite sequence fit their academic plan.`],
    [`Can I take ${course.code} online?`, `${course.code} appears in the Nexus online catalogue. Current availability, delivery details and individual eligibility must be confirmed with Nexus before registration.`],
    [`How long does ${course.code} take?`, "The public catalogue does not publish a completion promise. Timing and pacing should be confirmed during registration because they depend on the approved course delivery and the student's circumstances."],
    [`How do I register for ${course.code}?`, `Add ${course.code} to the course cart and continue to registration to prepare the required student and academic information. Secure online delivery is still being configured, and no enrolment is confirmed by the public form.`],
  ];
}

export function outlineDescription(course, section, index) {
  if (index === 0) return "Orientation, course information, expectations and communication for the registered course.";
  if (/final|culminating/i.test(section)) return "A culminating or final-evaluation section identified in the current Nexus LMS sequence.";
  if (/strand/i.test(section)) return `A curriculum strand in ${course.department}. The registered course materials provide the detailed expectations and learning activities.`;
  return `A structured ${course.department.toLowerCase()} learning unit focused on ${section}. Detailed expectations remain in the registered course materials and official Ontario curriculum.`;
}
