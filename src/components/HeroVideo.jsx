import { useEffect, useRef, useState } from "react";

const videoPath = "/media/nexus-education-hero.mp4";
const posterPath = "/media/nexus-education-hero-poster.jpg";

export default function HeroVideo() {
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [reduceMotion] = useState(() => (
    typeof window !== "undefined"
      && (window.matchMedia("(prefers-reduced-motion: reduce)").matches || navigator.connection?.saveData)
  ));

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduceMotion || unavailable || !("IntersectionObserver" in window)) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => undefined);
      else video.pause();
    }, { threshold: 0.2 });
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduceMotion, unavailable]);

  return (
    <div className={`hero-video-frame ${ready ? "is-ready" : ""} ${unavailable ? "is-fallback" : ""}`}>
      <img
        className="hero-video-poster"
        src={posterPath}
        alt="A Nexus student working through Calculus and Vectors with teacher support"
        width="1280"
        height="720"
        fetchPriority="high"
        decoding="async"
      />
      {!unavailable && (
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay={!reduceMotion}
          muted
          loop
          playsInline
          preload="metadata"
          poster={posterPath}
          width="1280"
          height="720"
          aria-hidden="true"
          tabIndex="-1"
          onCanPlay={() => setReady(true)}
          onError={() => setUnavailable(true)}
        >
          <source src={videoPath} type="video/mp4" />
        </video>
      )}
      <div className="hero-video-caption" aria-hidden="true">
        <span>ONTARIO LEARNING</span>
        <strong>Built around real student goals.</strong>
      </div>
    </div>
  );
}
