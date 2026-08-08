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

export default function Seo({ title, description, image, structuredData }) {
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
    document.head.querySelectorAll('script[data-nexus-schema="true"]').forEach((script) => script.remove());
    const schemas = Array.isArray(structuredData) ? structuredData : structuredData ? [structuredData] : [];
    schemas.forEach((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.nexusSchema = "true";
      script.textContent = JSON.stringify(schema).replace(/</g, "\\u003c");
      document.head.appendChild(script);
    });
    return () => document.head.querySelectorAll('script[data-nexus-schema="true"]').forEach((script) => script.remove());
  }, [canonicalUrl, image, resolvedDescription, resolvedTitle, structuredData]);
  return null;
}
