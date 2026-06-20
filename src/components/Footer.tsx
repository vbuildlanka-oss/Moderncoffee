import { useGsapContext } from "@/hooks/useGsapContext";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const ref = useGsapContext<HTMLElement>(() => {
    const el = ref.current?.querySelector<HTMLElement>("[data-wordmark]");
    if (!el) return;
    if (prefersReducedMotion()) {
      el.style.setProperty("--fill", "100%");
      return;
    }
    gsap.fromTo(
      el,
      { "--fill": "0%" } as gsap.TweenVars,
      {
        "--fill": "100%",
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          end: "bottom 60%",
          scrub: 0.6,
        },
      } as gsap.TweenVars,
    );
  }, []);

  return (
    <footer ref={ref} className="bg-espresso text-cream pt-24 grain relative">
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-20">
          <div>
            <div className="font-mono-label text-cream/60">Brew & Bloom</div>
            <p className="mt-4 text-cream/80 max-w-xs leading-relaxed">
              A small roastery and coffee bar in Portland, Oregon. Slow coffee since 2018.
            </p>
          </div>
          <div>
            <div className="font-mono-label text-cream/60">Visit</div>
            <p className="mt-4 text-cream/80 leading-relaxed">
              218 Maple Avenue<br />Portland, OR 97204<br />hello@brewandbloom.co
            </p>
          </div>
          <div>
            <div className="font-mono-label text-cream/60">Follow</div>
            <div className="mt-4 flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-caramel transition" aria-label="Instagram"><Instagram className="size-5" /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-caramel transition" aria-label="Twitter"><Twitter className="size-5" /></a>
            </div>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            data-wordmark
            className="wordmark-outline font-display text-[22vw] leading-[0.85] tracking-[-0.04em] text-center md:text-left whitespace-nowrap select-none"
          >
            BREW & BLOOM
          </div>
        </div>

        <div className="border-t border-cream/15 mt-10 py-8 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-cream/60">
          <p>© 2026 Brew & Bloom. A VBUILD project. All rights reserved.</p>
          <p className="font-mono-label">Built by VBUILD</p>
        </div>
      </div>
    </footer>
  );
}
