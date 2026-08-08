import { ArrowRight, BookMarked } from "lucide-react";
import { Link } from "react-router-dom";

export default function CourseCard({ course, compact = false }) {
  return (
    <article className={`course-card ${compact ? "is-compact" : ""}`}>
      <div className="course-card-top">
        <span className="course-code">{course.code}</span>
        <BookMarked size={20} aria-hidden="true" />
      </div>
      <div>
        <span className="mini-label">{course.department}</span>
        <h3>{course.title}</h3>
        <div className="tag-row"><span>Grade {course.grade}</span><span>{course.type}</span><span>{course.credit} credit</span></div>
        {!compact && <p>{course.description}</p>}
      </div>
      <div className="course-actions">
        <Link to={`/courses/${course.slug}`}>View Course <ArrowRight size={15} /></Link>
        <Link to={`/inquiry?course=${course.code}`}>Inquire</Link>
      </div>
    </article>
  );
}
