import { ArrowUpRight, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import { imageSets } from "../data/site";

export default function BlogCard({ post, featured = false }) {
  return (
    <article className={`blog-card ${featured ? "is-featured" : ""}`}>
      <Link className="blog-card-image" to={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
        <img src={imageSets.blog[post.visual % imageSets.blog.length]} alt="" loading="lazy" />
      </Link>
      <div className="blog-card-content">
        <div className="blog-card-meta"><span>{post.category}</span><span><Clock3 size={14} /> {post.readTime}</span></div>
        <h3><Link to={`/blog/${post.slug}`}>{post.title}</Link></h3>
        <p>{post.excerpt}</p>
        <Link className="text-link" to={`/blog/${post.slug}`}>Read Article <ArrowUpRight size={15} /></Link>
      </div>
    </article>
  );
}
