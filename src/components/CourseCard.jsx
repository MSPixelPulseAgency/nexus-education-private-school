import { ArrowRight, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";
import { getCourseVisual } from "../data/site";
import AddToCartButton from "./AddToCartButton";

export default function CourseCard({ course, compact = false }) {
  return (
    <article className={`course-card ${compact ? "is-compact" : ""}`}>
      <Link className="course-card-visual" to={`/courses/${course.slug}`} aria-label={`View ${course.code} ${course.title}`}>
        <img src={getCourseVisual(course)} alt="" width="1400" height="900" loading="lazy" decoding="async" />
        <span className="course-code">{course.code}</span>
      </Link>
      <div className="course-card-content">
        <span className="mini-label">{course.department}</span>
        <h3><Link to={`/courses/${course.slug}`}>{course.title}</Link></h3>
        <div className="tag-row"><span>Grade {course.grade}</span><span>{course.type}</span><span>{course.credit} credit</span></div>
        {!compact && <><p>{course.description}</p><small className="course-prerequisite"><strong>Prerequisite:</strong> {course.prerequisite}</small></>}
      </div>
      <div className="course-actions">
        <Link className="course-detail-link" to={`/courses/${course.slug}`}>View Course <ArrowRight size={15} /></Link>
        <Link className="course-outline-link" to={`/courses/${course.slug}/outline`}><ClipboardList size={14} /> Outline</Link>
        <AddToCartButton course={course} className="btn btn-secondary course-card-cart" compact />
      </div>
    </article>
  );
}
