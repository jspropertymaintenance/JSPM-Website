"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowIcon } from "./Icons";

type Slide = { title: string; text: string };

const INTERVAL = 4000;

export default function TradesCarousel({ title, slides }: { title: string; slides: Slide[] }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (i: number) => {
      const el = track.current;
      if (!el) return;
      const next = (i + slides.length) % slides.length;
      el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
    },
    [slides.length],
  );

  // Keep the active dot in sync with swipes and button clicks.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => setIndex(Math.round(el.scrollLeft / el.clientWidth));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-advance, unless paused or the visitor prefers reduced motion.
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => goTo(index + 1), INTERVAL);
    return () => window.clearInterval(id);
  }, [paused, index, goTo]);

  return (
    <section
      className="card carousel"
      aria-roledescription="carousel"
      aria-label={title}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <div className="carousel__head">
        <h3>{title}</h3>
        <span className="carousel__count" aria-hidden="true">
          {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      <div className="carousel__track" ref={track}>
        {slides.map((s, i) => (
          <div
            className="carousel__slide"
            key={s.title}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}: ${s.title}`}
          >
            <p className="carousel__title">{s.title}</p>
            <p className="carousel__text">{s.text}</p>
          </div>
        ))}
      </div>

      <div className="carousel__controls">
        <div className="carousel__dots">
          {slides.map((s, i) => (
            <button
              key={s.title}
              type="button"
              className="carousel__dot"
              aria-label={`Show ${s.title}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        <div className="carousel__arrows">
          <button type="button" aria-label="Previous trade" onClick={() => goTo(index - 1)}>
            <ArrowIcon className="flip" />
          </button>
          <button type="button" aria-label="Next trade" onClick={() => goTo(index + 1)}>
            <ArrowIcon />
          </button>
        </div>
      </div>
    </section>
  );
}
