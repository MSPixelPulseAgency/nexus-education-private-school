import { MessageCircleMore, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const dismissedKey = "nexus-guidance-prompt-dismissed";

export default function GuidancePrompt() {
  const [visible, setVisible] = useState(false);
  const closeRef = useRef(null);

  useEffect(() => {
    if (window.sessionStorage.getItem(dismissedKey)) return undefined;
    const timer = window.setTimeout(() => setVisible(true), 12000);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = () => {
    window.sessionStorage.setItem(dismissedKey, "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside className="guidance-prompt" aria-label="Guidance support" aria-live="polite">
      <button ref={closeRef} className="guidance-prompt-close" type="button" aria-label="Dismiss guidance prompt" onClick={dismiss}><X size={18} /></button>
      <span className="guidance-prompt-icon" aria-hidden="true"><MessageCircleMore size={21} /></span>
      <div>
        <strong>Need help choosing a course?</strong>
        <p>Share the student’s grade, prerequisite and next-step goal.</p>
        <div><Link to="/inquiry" onClick={dismiss}>Talk to Guidance</Link><Link to="/courses" onClick={dismiss}>Browse Courses</Link></div>
      </div>
    </aside>
  );
}
