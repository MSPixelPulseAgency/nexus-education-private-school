export const reviewModerationStatuses = ["pending", "approved", "rejected"];

export const reviewTags = [
  "Teacher Support",
  "Course Material",
  "Online Learning",
  "Guidance",
  "Flexible Learning",
  "Communication",
  "Student Support",
  "Elementary",
  "High School",
  "Graduation",
  "University Preparation",
];

export const reviewerTypes = ["Student", "Parent / Guardian", "Graduate", "Other"];

// Public reviews must be real and explicitly approved. Keep this collection empty
// until a production moderation service returns approved submissions.
export const approvedReviews = [];

export const reviewBackendRequirements = [
  "Secure server-side persistence with pending, approved and rejected states",
  "Server-side validation, sanitization, spam detection and rate limiting",
  "Moderator authentication and an approval workflow",
  "Privacy, retention and deletion rules for reviewer contact information",
];
