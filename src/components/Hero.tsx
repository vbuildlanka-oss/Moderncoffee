import { useGsapContext } from "@/hooks/useGsapContext";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function Hero() {
  const ref = useGsapContext<HTMLElement>((self) => {
    if (prefersReducedMotion()) {
      gsap.set("[data-reveal-word], [data-reveal-line]", { opacity: 1, y: 0 });
      return;
    }
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    tl.from("[data-reveal-label]", { y: 30, opacity: 0, duration: 0.8 })
      .from(
        "[data-reveal-word]",
        { yPercent: 110, duration: 1.2, stagger: 0.08 },
        "-=0.4",
      )
      .from("[data-reveal-line]", { y: 20, opacity: 0, duration: 0.9, stagger: 0.1 }, "-=0.7")
      .from("[data-reveal-cta]", { y: 20, opacity: 0, duration: 0.8, stagger: 0.1 }, "-=0.6")
      .from("[data-reveal-media]", { scale: 1.15, opacity: 0, duration: 1.6, ease: "expo.out" }, "<-0.4");

    gsap.to("[data-parallax-img]", {
      yPercent: 18,
      ease: "none",
      scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
    });
    gsap.to("[data-parallax-text]", {
      yPercent: -8,
      ease: "none",
      scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true },
    });
  }, []);

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] flex flex-col justify-end overflow-hidden pt-28 md:pt-32 pb-10 md:pb-20"
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
        <div className="lg:col-span-7 relative z-10 order-2 lg:order-1" data-parallax-text>
          <div className="overflow-hidden">
            <span data-reveal-label className="font-mono-label inline-block text-mutedtext">
              01 — Specialty Coffee, Est. 2018
            </span>
          </div>

          <h1 className="font-display text-[15vw] sm:text-[13vw] lg:text-[10.5vw] leading-[0.92] mt-5 md:mt-6 tracking-[-0.04em]">
            <span className="block overflow-hidden">
              <span data-reveal-word className="inline-block">Slow</span>{" "}
              <span data-reveal-word className="inline-block">coffee.</span>
            </span>
            <span className="block overflow-hidden italic text-caramel">
              <span data-reveal-word className="inline-block">Quietly</span>{" "}
              <span data-reveal-word className="inline-block">perfect.</span>
            </span>
          </h1>

          <p
            data-reveal-line
            className="mt-6 md:mt-8 max-w-md text-mutedtext text-base md:text-lg leading-relaxed"
          >
            A neighborhood roastery pulling shots from single-origin beans we
            source, roast, and brew with intention. No noise. Just craft.
          </p>

          <div className="mt-8 md:mt-10 flex flex-wrap gap-3">
            <a data-reveal-cta href="#menu" className="pill pill-primary">
              View the menu <span className="arrow">→</span>
            </a>
            <a data-reveal-cta href="#visit" className="pill pill-ghost">
              Find the shop <span className="arrow">→</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 relative h-[42vh] sm:h-[50vh] lg:h-[78vh] overflow-hidden rounded-md order-1 lg:order-2" data-reveal-media>
          <img
            data-parallax-img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1400&q=80"
            alt="Barista pouring espresso into a porcelain cup"
            className="absolute inset-0 w-full h-[120%] object-cover -top-[10%]"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 flex items-end justify-between text-cream">
            <span className="font-mono-label text-[0.6rem] md:text-xs">N° 001 / Signature Espresso</span>
            <span className="font-display italic text-xl md:text-2xl">est. ’18</span>
          </div>
        </div>
      </div>
    </section>
  );
}
