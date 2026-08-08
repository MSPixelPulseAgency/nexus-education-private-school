import { useState } from "react";
import { BriefcaseBusiness, Check, Clipboard, Mail, MessageSquare, Share2, ThumbsDown, ThumbsUp } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import CourseCard from "../components/CourseCard";
import { SubmitArea } from "../components/FormStatus";
import Reveal from "../components/Reveal";
import Seo from "../components/Seo";
import { CheckList, SectionHeading } from "../components/UI";
import { articleGuides } from "../data/content";
import { blogs, courses } from "../data/catalog";
import { imageSets } from "../data/site";
import useDemoSubmit from "../hooks/useDemoSubmit";
import NotFoundPage from "./NotFoundPage";

export default function BlogDetailPage() {
  const { slug } = useParams();
  const post = blogs.find((item) => item.slug === slug);
  const [helpful, setHelpful] = useState("");
  const [copied, setCopied] = useState(false);
  const comment = useDemoSubmit();
  if (!post) return <NotFoundPage />;
  const guide = articleGuides[post.category];
  const relatedPosts = blogs.filter((item) => item.slug !== post.slug && item.category === post.category).slice(0, 3);
  const gradeMatch = post.category.match(/Grade (9|10|11|12)/)?.[1];
  const relatedCourses = courses.filter((course) => !gradeMatch || course.grade === Number(gradeMatch)).slice(0, 3);
  const image = imageSets.blog[post.visual % imageSets.blog.length];
  const url = typeof window === "undefined" ? "" : window.location.href;
  const shareUrl = encodeURIComponent(url);
  const shareTitle = encodeURIComponent(post.title);
  const copyLink = async () => { await navigator.clipboard?.writeText(url); setCopied(true); window.setTimeout(() => setCopied(false), 1800); };
  const nativeShare = () => navigator.share?.({ title: post.title, text: post.excerpt, url });

  return (
    <>
      <Seo title={`${post.title} | Nexus Journal`} description={post.excerpt} image={image} />
      <header className="article-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/blog">Blog</Link><span>/</span><span aria-current="page">{post.title}</span></nav>
          <div className="article-hero-grid"><div><span className="eyebrow">{post.category}</span><h1>{post.title}</h1><p>{post.excerpt}</p><div className="article-byline"><span>Nexus Education Team</span><span>{post.readTime}</span></div></div><div className="article-hero-image"><img src={image} alt={`Editorial visual for ${post.title}`} fetchPriority="high" /></div></div>
        </div>
      </header>
      <div className="container article-layout">
        <aside className="article-toc"><strong>In this guide</strong>{guide.sections.map(([heading], index) => <a key={heading} href={`#section-${index + 1}`}>{heading}</a>)}<a href="#checklist">Planning checklist</a><a href="#related">Related resources</a></aside>
        <article className="article-content">
          <p className="article-intro">{guide.intro} This guide uses <strong>{post.title.toLowerCase()}</strong> as the starting point and turns it into practical planning steps.</p>
          <div className="article-callout"><span>Start here</span><p>Write down the decision you are trying to make. A specific question makes course research, planning and support much more useful.</p></div>
          {guide.sections.map(([heading, body], index) => <section id={`section-${index + 1}`} key={heading}><span className="section-number">0{index + 1}</span><h2>{heading}</h2><p>{body}</p><h3>Put it into practice</h3><p>Connect this step to your own grade, current workload and next milestone. Keep notes about what is confirmed, what is assumed and what still needs a reliable answer.</p></section>)}
          <section id="checklist"><h2>A practical checklist</h2><CheckList items={guide.checklist} /></section>
          <div className="article-note"><strong>Keep requirements current.</strong><p>Course availability, prerequisites and postsecondary program requirements can change. Verify details with Nexus and the relevant institution before acting.</p></div>
          <div className="article-share"><div><strong>Share this guide</strong><span>Send it to someone planning the same next step.</span></div><div className="share-buttons"><button onClick={copyLink} type="button" aria-label="Copy article link">{copied ? <Check size={17} /> : <Clipboard size={17} />}{copied ? "Copied" : "Copy Link"}</button><a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noreferrer" aria-label="Share on Facebook"><Share2 size={17} /></a><a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noreferrer" aria-label="Share on LinkedIn"><BriefcaseBusiness size={17} /></a><a href={`mailto:?subject=${shareTitle}&body=${shareUrl}`} aria-label="Share by email"><Mail size={17} /></a>{typeof navigator !== "undefined" && navigator.share && <button onClick={nativeShare} type="button" aria-label="Open device share menu"><Share2 size={17} /></button>}</div></div>
          <div className="helpful"><span>Was this guide helpful?</span><button className={helpful === "yes" ? "active" : ""} onClick={() => setHelpful("yes")} type="button"><ThumbsUp size={17} /> Helpful</button><button className={helpful === "no" ? "active" : ""} onClick={() => setHelpful("no")} type="button"><ThumbsDown size={17} /> Not Helpful</button>{helpful && <small role="status">Thanks for the feedback.</small>}</div>
          <section className="comments-section"><div><MessageSquare size={24} /><h2>Join the conversation</h2><p>Comments are moderated. Do not include private student records or sensitive personal information.</p></div><form onSubmit={comment.onSubmit} className="comment-form"><div className="form-grid"><label>Name<input required autoComplete="name" /></label><label>Email<input required type="email" autoComplete="email" /></label><label className="field-wide">Comment<textarea required rows="5" /></label><label className="check-control field-wide"><input required type="checkbox" /><span>I understand this comment may be moderated before public display.</span></label></div><SubmitArea submitted={comment.submitted} label="Submit Comment" /></form></section>
          <section className="subscribe-card"><span className="eyebrow">NEXUS JOURNAL</span><h2>Keep useful planning ideas close.</h2><p>Subscribe to receive new Nexus guides when the newsletter delivery workflow is active.</p><form onSubmit={(event) => event.preventDefault()}><label className="sr-only" htmlFor="article-subscribe">Email address</label><input id="article-subscribe" type="email" required placeholder="you@example.com" /><button className="btn btn-light" type="submit">Subscribe</button></form></section>
        </article>
      </div>
      <Reveal as="section" className="section soft-section" id="related"><div className="container"><SectionHeading eyebrow="RELATED COURSES" title="Continue the Course Search." /><div className="card-grid three">{relatedCourses.map((course) => <CourseCard compact course={course} key={course.code} />)}</div></div></Reveal>
      <Reveal as="section" className="section container"><SectionHeading eyebrow="KEEP READING" title="More From This Category." /><div className="card-grid three">{relatedPosts.map((item) => <BlogCard post={item} key={item.slug} />)}</div></Reveal>
    </>
  );
}
