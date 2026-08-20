import { CircleUserRound, EyeOff, MessageSquareText, Search, ShieldCheck, SlidersHorizontal, Star } from "lucide-react";
import { useMemo, useState } from "react";
import Reveal from "../components/Reveal";
import { PageHero, SectionHeading } from "../components/UI";
import { approvedReviews, reviewBackendRequirements, reviewerTypes, reviewTags } from "../data/reviews";
import { images } from "../data/site";

function StarRating({ value, onChange, error }) {
  return <fieldset className={`star-field field-wide ${error ? "has-error" : ""}`}><legend>Rating <span aria-hidden="true">*</span></legend><div className="star-selector">{[1,2,3,4,5].map((rating) => <button key={rating} type="button" className={rating <= value ? "active" : ""} aria-label={`${rating} star${rating > 1 ? "s" : ""}`} aria-pressed={rating === value} onClick={() => onChange(rating)}><Star size={28} /></button>)}</div><span aria-live="polite">{value ? `${value} out of 5 selected` : "Select a rating"}</span>{error && <small role="alert">Choose a rating before submitting.</small>}</fieldset>;
}

export default function ReviewsPage() {
  const [rating, setRating] = useState(0);
  const [ratingError, setRatingError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [query, setQuery] = useState("");
  const [reviewerType, setReviewerType] = useState("All reviewers");
  const [grade, setGrade] = useState("All grades");
  const [sort, setSort] = useState("Newest");
  const [tag, setTag] = useState("");

  const reviews = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const list = approvedReviews.filter((review) => {
      const matchesQuery = !needle || `${review.title} ${review.review} ${review.name} ${(review.tags || []).join(" ")}`.toLowerCase().includes(needle);
      const matchesType = reviewerType === "All reviewers" || review.reviewerType === reviewerType;
      const matchesGrade = grade === "All grades" || String(review.grade) === grade;
      const matchesTag = !tag || (review.tags || []).includes(tag);
      return matchesQuery && matchesType && matchesGrade && matchesTag;
    });
    if (sort === "Highest rating") return [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "Lowest rating") return [...list].sort((a, b) => a.rating - b.rating);
    return list;
  }, [grade, query, reviewerType, sort, tag]);

  const average = approvedReviews.length ? approvedReviews.reduce((sum, review) => sum + review.rating, 0) / approvedReviews.length : null;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!rating) {
      setRatingError(true);
      return;
    }
    setRatingError(false);
    setSubmitted(true);
  };

  return (
    <>
      <PageHero eyebrow="REVIEWS" title="What Students & Families Say." text="Search approved community feedback or share an experience for moderation. Nexus does not publish anonymous spam, private email addresses or unapproved submissions." image={images.secondaryStudents} imageAlt="Secondary students collaborating around a table" breadcrumbs={[{ label: "Reviews" }]} />

      <Reveal as="section" className="section container review-summary-grid">
        <div className="rating-summary-card"><span className="mini-label">APPROVED REVIEWS</span><strong>{average ? average.toFixed(1) : "—"}</strong><div className="summary-stars" aria-label={average ? `${average.toFixed(1)} out of 5` : "No public average yet"}>{[1,2,3,4,5].map((item) => <Star key={item} size={22} />)}</div><p>{approvedReviews.length ? `Based on ${approvedReviews.length} approved review${approvedReviews.length === 1 ? "" : "s"}.` : "No public average is shown until real reviews are approved."}</p></div>
        <div className="rating-distribution" aria-label="Rating distribution">{[5,4,3,2,1].map((item) => <div key={item}><span>{item} <Star size={13} /></span><span className="rating-track"><i style={{ width: "0%" }} /></span><strong>0</strong></div>)}</div>
        <div className="review-trust-list compact"><span><ShieldCheck size={21} /><span><strong>Moderated first</strong><small>Statuses support pending, approved and rejected review states.</small></span></span><span><EyeOff size={21} /><span><strong>Private by default</strong><small>Email is collected only for verification and is never shown publicly.</small></span></span></div>
      </Reveal>

      <Reveal as="section" className="section soft-section"><div className="container reviews-browser">
        <SectionHeading eyebrow="COMMUNITY FEEDBACK" title="Find the experience most relevant to you." text="Search, sort and filter the approved review collection. The controls remain ready even while the verified collection is empty." />
        <div className="review-toolbar"><div className="review-search"><Search size={20} /><label className="sr-only" htmlFor="review-search">Search reviews</label><input id="review-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search support, courses, guidance…" /></div><label><span><SlidersHorizontal size={15} /> Reviewer</span><select value={reviewerType} onChange={(event) => setReviewerType(event.target.value)}><option>All reviewers</option>{reviewerTypes.map((item) => <option key={item}>{item}</option>)}</select></label><label><span>Grade</span><select value={grade} onChange={(event) => setGrade(event.target.value)}><option>All grades</option><option value="Elementary">Elementary</option>{[9,10,11,12].map((item) => <option value={String(item)} key={item}>Grade {item}</option>)}</select></label><label><span>Sort</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option>Newest</option><option>Highest rating</option><option>Lowest rating</option></select></label></div>
        <div className="review-chips" aria-label="Review topic filters">{reviewTags.map((item) => <button type="button" className={tag === item ? "active" : ""} aria-pressed={tag === item} onClick={() => setTag((current) => current === item ? "" : item)} key={item}>{item}</button>)}</div>
        <div className="review-results-heading"><strong>{reviews.length} approved review{reviews.length === 1 ? "" : "s"}</strong>{(query || reviewerType !== "All reviewers" || grade !== "All grades" || tag) && <button type="button" onClick={() => { setQuery(""); setReviewerType("All reviewers"); setGrade("All grades"); setTag(""); }}>Clear filters</button>}</div>
        {reviews.length ? <div className="review-card-grid">{reviews.map((review) => <article className="review-card" key={review.id}><div>{[1,2,3,4,5].map((item) => <Star className={item <= review.rating ? "active" : ""} size={17} key={item} />)}</div><h3>{review.title}</h3><p>{review.review}</p><strong>{review.name}</strong><span>{review.reviewerType}</span></article>)}</div> : <div className="no-review-state wide"><div aria-hidden="true">{[1,2,3,4,5].map((item) => <Star size={23} key={item} />)}</div><strong>No approved reviews match yet.</strong><p>Be among the first to submit genuine feedback. Nothing appears publicly until moderation is complete.</p></div>}
      </div></Reveal>

      <Reveal as="section" className="section container reviews-layout" id="write-review">
        <div className="reviews-trust"><SectionHeading eyebrow="SHARE YOUR EXPERIENCE" title="Submit feedback for moderation." text="The form architecture is complete, but secure backend delivery and moderator access still need to be configured before submissions can be stored." /><div className="review-trust-list"><span><MessageSquareText size={21} /><span><strong>Useful detail</strong><small>Explain what helped and what could be clearer.</small></span></span><span><CircleUserRound size={21} /><span><strong>Clear context</strong><small>Reviewer type, grade, course and tags are optional public context.</small></span></span></div><div className="backend-status"><strong>Backend required before submissions are accepted</strong><ul>{reviewBackendRequirements.map((item) => <li key={item}>{item}</li>)}</ul></div></div>
        <form className="form-card review-form" onSubmit={handleSubmit}><div className="form-heading"><span className="mini-label">SUBMIT A REVIEW</span><h2>Tell us about your experience.</h2><p>Required fields are labelled. Private contact information will not be published.</p></div><div className="form-grid"><StarRating value={rating} error={ratingError} onChange={(value) => { setRating(value); setRatingError(false); }} /><label>Review title<input required name="title" maxLength="90" /></label><label>Name<input required name="name" autoComplete="name" maxLength="80" /></label><label>Email <span>(private)</span><input required name="email" type="email" autoComplete="email" maxLength="160" /></label><label>Reviewer type<select required name="reviewerType" defaultValue=""><option value="" disabled>Select one</option>{reviewerTypes.map((item) => <option key={item}>{item}</option>)}</select></label><label>Grade <span>(optional)</span><select name="grade" defaultValue=""><option value="">Not specified</option><option>Elementary</option>{[9,10,11,12].map((item) => <option key={item}>Grade {item}</option>)}</select></label><label>Course <span>(optional)</span><input name="course" maxLength="90" placeholder="Course code or title" /></label><label className="field-wide">Topics <span>(optional)</span><select name="tag" defaultValue=""><option value="">Select a topic</option>{reviewTags.map((item) => <option key={item}>{item}</option>)}</select></label><label className="field-wide">Review<textarea rows="7" required name="review" minLength="30" maxLength="1600" placeholder="What would help a future student or family understand your experience?" /></label><label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex="-1" autoComplete="off" /></label><label className="check-control field-wide"><input type="checkbox" required /><span>I consent to Nexus reviewing this submission and understand approved feedback may be published without my private email address.</span></label></div>{submitted ? <div className="form-pending" role="status"><ShieldCheck size={21} /><span><strong>Submission not sent.</strong> The secure review backend and moderation queue are still being configured. No information from this form has been stored.</span></div> : <button className="btn btn-primary" type="submit">Submit for Moderation</button>}</form>
      </Reveal>
    </>
  );
}
