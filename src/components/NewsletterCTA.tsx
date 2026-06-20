import { useRef, useState, type MouseEvent } from "react";

export default function NewsletterCTA() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const btn = btnRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  };
  const onLeave = () => {
    if (btnRef.current) btnRef.current.style.transform = "translate(0,0)";
  };

  return (
    <section id="newsletter" className="bg-espresso text-cream py-24 md:py-40 grain relative overflow-hidden">
      <div className="relative z-10 max-w-[1100px] mx-auto px-5 md:px-10 text-center">
        <span className="font-mono-label text-cream/60">Stay close</span>
        <h2 className="font-display text-[12vw] sm:text-6xl md:text-7xl mt-4 leading-[0.95]">
          First sip on us.<br />
          <span className="italic text-caramel">10% off your first order.</span>
        </h2>

        {done ? (
          <p className="mt-12 font-display italic text-2xl">Welcome to the table. ✦</p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setDone(true);
            }}
            className="mt-10 md:mt-12 max-w-xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-2 sm:border-b sm:border-cream/30 sm:pb-3"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-transparent outline-none placeholder:text-cream/40 text-lg py-3 border-b border-cream/30 sm:border-0 text-center sm:text-left"
              aria-label="Email"
            />
            <div
              className="relative p-0 sm:p-4 sm:-m-4 flex justify-center"
              onMouseMove={onMove}
              onMouseLeave={onLeave}
            >
              <button
                ref={btnRef}
                type="submit"
                className="pill bg-cream text-espresso border-cream hover:bg-caramel hover:border-caramel transition-transform duration-200"
              >
                Subscribe <span className="arrow">→</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
