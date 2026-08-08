import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { brand, staticMeta } from "../data/site";

function setMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
}

export default function Seo({ title, description, image }) {
  const { pathname } = useLocation();
  const fallback = staticMeta[pathname] || staticMeta["/"];
  const resolvedTitle = title || fallback[0];
  const resolvedDescription = description || fallback[1];
  const canonicalUrl = `${brand.canonical}${pathname === "/" ? "/" : pathname}`;

  useEffect(() => {
    document.title = resolvedTitle;
    setMeta('meta[name="description"]', { name: "description", content: resolvedDescription });
    setMeta('meta[property="og:title"]', { property: "og:title", content: resolvedTitle });
    setMeta('meta[property="og:description"]', { property: "og:description", content: resolvedDescription });
    setMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    setMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    if (image) setMeta('meta[property="og:image"]', { property: "og:image", content: image });
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [canonicalUrl, image, resolvedDescription, resolvedTitle]);
  return null;
}
