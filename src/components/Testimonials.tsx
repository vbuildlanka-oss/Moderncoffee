import { useEffect, useRef, useState } from "react";

const quotes = [
  { q: "The best cortado on the West Coast. I’d cross town for it.", a: "Mara K. — Portland Monthly" },
  { q: "Quiet, intentional, and absurdly good. My new ritual.", a: "Daniel R. — Regular since ’21" },
  { q: "They treat coffee the way a good kitchen treats produce.", a: "Sasha L. — Eater PDX" },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    const t = setInterval(() => {
      if (!paused.current) setI((v) => (v + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="testimonials"
      className="bg-cream py-20 md:py-36"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <div className="max-w-[1100px] mx-auto px-5 md:px-10 text-center">
        <span className="font-mono-label text-mutedtext">04 / Stories</span>
        <div className="mt-8 relative min-h-[320px] sm:min-h-[260px] md:min-h-[320px]">
          {quotes.map((q, idx) => (
            <blockquote
              key={idx}
              className={`absolute inset-0 transition-opacity duration-700 ${
                idx === i ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <p className="font-display italic text-[8.5vw] sm:text-4xl md:text-6xl leading-[1.05] tracking-tight">
                “{q.q}”
              </p>
              <footer className="mt-8 font-mono-label text-mutedtext">— {q.a}</footer>
            </blockquote>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-10 md:mt-12">
          {quotes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === i ? "w-10 bg-espresso" : "w-4 bg-espresso/30"
              }`}
              aria-label={`Show quote ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
