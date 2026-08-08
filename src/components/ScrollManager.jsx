import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    const frame = window.requestAnimationFrame(() => document.getElementById("main-content")?.focus({ preventScroll: true }));
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);
  return null;
}
