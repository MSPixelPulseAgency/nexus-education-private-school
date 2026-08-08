import { CircleUserRound, EyeOff, MessageSquareText, ShieldCheck, Star } from "lucide-react";
import { useState } from "react";
import { SubmitArea } from "../components/FormStatus";
import Reveal from "../components/Reveal";
import { PageHero, SectionHeading } from "../components/UI";
import { images } from "../data/site";
import useDemoSubmit from "../hooks/useDemoSubmit";

function StarRating({ value, onChange }) {
  return <fieldset className="star-field"><legend>Rating</legend><div className="star-selector">{[1,2,3,4,5].map((rating) => <button key={rating} type="button" className={rating <= value ? "active" : ""} aria-label={`${rating} star${rating > 1 ? "s" : ""}`} aria-pressed={rating === value} onClick={() => onChange(rating)}><Star size={28} /></button>)}</div><span>{value ? `${value} out of 5 selected` : "Select a rating"}</span></fieldset>;
}

export default function ReviewsPage() {
  const [rating, setRating] = useState(0);
  const submit = useDemoSubmit();
  return (
    <>
      <PageHero eyebrow="REVIEWS" title="Share Your Nexus Experience." text="Thoughtful feedback can help improve the student journey. Reviews are moderated for relevance, privacy and respectful communication." image={images.campus} imageAlt="Students sharing a positive moment on a modern campus" />
      <Reveal as="section" className="section container reviews-layout">
        <div className="reviews-trust"><SectionHeading eyebrow="COMMUNITY FEEDBACK" title="Your Experience Can Help the Next Student." text="No fake review average or unapproved testimonial is displayed here. Be among the first to share authentic feedback." /><div className="review-trust-list"><span><MessageSquareText size={21} /><span><strong>Helpful context</strong><small>Share what was useful and what could be clearer.</small></span></span><span><ShieldCheck size={21} /><span><strong>Moderated before publishing</strong><small>Submissions are reviewed for safety and relevance.</small></span></span><span><EyeOff size={21} /><span><strong>Private email stays private</strong><small>Your email is not intended for public display.</small></span></span><span><CircleUserRound size={21} /><span><strong>Clear consent</strong><small>You choose whether your feedback may be published.</small></span></span></div><div className="no-review-state"><div aria-hidden="true">{[1,2,3,4,5].map((item) => <Star size={23} key={item} />)}</div><strong>Be among the first to share your Nexus experience.</strong><p>An aggregate rating will only be meaningful after real, approved feedback exists.</p></div></div>
        <form className="form-card review-form" onSubmit={submit.onSubmit}><div className="form-heading"><span className="mini-label">SUBMIT A REVIEW</span><h2>Tell us about your experience.</h2><p>Fields marked required help moderators understand and verify context.</p></div><div className="form-grid"><label>First name<input required autoComplete="given-name" /></label><label>Last initial <span>(optional)</span><input maxLength="1" aria-describedby="last-initial-help" /><small id="last-initial-help">One letter only</small></label><label>Email<input required type="email" autoComplete="email" /></label><label>Relationship<select required defaultValue=""><option value="" disabled>Select one</option><option>Student</option><option>Parent / Guardian</option><option>Graduate</option><option>Other</option></select></label><label>Course / program<input placeholder="Course code or title" /></label><StarRating value={rating} onChange={setRating} /><label className="field-wide">Review title<input required /></label><label className="field-wide">Review<textarea rows="7" required placeholder="What would help a future student understand your experience?" /></label><label className="check-control field-wide"><input type="checkbox" required /><span>I consent to Nexus reviewing this submission and understand approved feedback may be published without my private email address.</span></label></div><SubmitArea submitted={submit.submitted} label="Submit for Moderation" /></form>
      </Reveal>
    </>
  );
}
