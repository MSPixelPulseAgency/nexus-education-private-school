import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function FAQAccordion({ items }) {
  const [active, setActive] = useState(-1);
  return (
    <div className="faq-list">
      {items.map(([question, answer], index) => {
        const open = active === index;
        const id = `faq-answer-${index}`;
        return (
          <div className={`faq-item ${open ? "is-open" : ""}`} key={question}>
            <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setActive(open ? -1 : index)}>
              <span>{question}</span><ChevronDown size={20} aria-hidden="true" />
            </button>
            <div className="faq-answer" id={id} role="region" aria-hidden={!open}><p>{answer}</p></div>
          </div>
        );
      })}
    </div>
  );
}
