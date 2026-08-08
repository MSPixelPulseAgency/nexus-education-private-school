import { useState } from "react";

export default function useDemoSubmit() {
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };
  return { submitted, onSubmit };
}
