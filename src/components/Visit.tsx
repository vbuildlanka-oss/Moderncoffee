import { useGsapContext } from "@/hooks/useGsapContext";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { MapPin, Clock } from "lucide-react";

export default function Visit() {
  const ref = useGsapContext<HTMLElement>(() => {
    if (prefersReducedMotion()) return;
    gsap.fromTo(
      "[data-visit-clip]",
      { clipPath: "inset(100% 0 0 0)" },
      {
        clipPath: "inset(0% 0 0 0)",
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      },
    );
  }, []);

  return (
    <section ref={ref} id="visit" className="bg-background py-20 md:py-32">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <span className="font-mono-label text-mutedtext">03 / Visit</span>
          <h2 className="font-display text-[14vw] sm:text-6xl md:text-7xl leading-[0.95] mt-3">
            Come <span className="italic text-caramel">slow down.</span>
          </h2>

          <div className="mt-12 space-y-10">
            <div>
              <div className="flex items-center gap-2 font-mono-label text-mutedtext">
                <MapPin className="size-3.5" /> Address
              </div>
              <p className="font-display text-2xl mt-2 leading-snug">
                218 Maple Avenue<br /> Portland, OR 97204
              </p>
            </div>
            <div>
              <div className="flex items-center gap-2 font-mono-label text-mutedtext">
                <Clock className="size-3.5" /> Hours
              </div>
              <div className="mt-2 font-display text-2xl space-y-1 leading-snug">
                <div>Mon — Fri <span className="text-mutedtext">7a — 5p</span></div>
                <div>Sat — Sun <span className="text-mutedtext">8a — 4p</span></div>
              </div>
            </div>
            <a href="#" className="pill pill-primary">
              Get directions <span className="arrow">→</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-5 gap-4">
          <div data-visit-clip className="md:col-span-3 aspect-[4/5] rounded-md overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=1200&q=80"
              alt="Interior of Brew & Bloom coffee shop"
              loading="lazy"
              className="size-full object-cover"
            />
          </div>
          <div className="md:col-span-2 aspect-[4/5] rounded-md overflow-hidden bg-espresso text-cream relative grain">
            <iframe
              title="Map"
              src="https://www.google.com/maps?q=Portland%20Oregon&output=embed&z=13"
              className="size-full grayscale invert opacity-90"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
