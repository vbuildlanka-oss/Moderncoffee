import { useGsapContext } from "@/hooks/useGsapContext";
import { gsap, ScrollTrigger, prefersReducedMotion, isMobileViewport } from "@/lib/gsap";
import { Plus } from "lucide-react";

const drinks = [
  { name: "Cortado", price: "$4.50", note: "Equal parts espresso & steamed milk.", img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=900&q=80" },
  { name: "Pour Over", price: "$5.00", note: "Single origin, brewed to order.", img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=900&q=80" },
  { name: "Flat White", price: "$4.75", note: "Velvet microfoam, double ristretto.", img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=900&q=80" },
  { name: "Espresso", price: "$3.50", note: "Our seasonal house blend.", img: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=900&q=80" },
  { name: "Iced Latte", price: "$5.25", note: "Slow-steeped, never bitter.", img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=900&q=80" },
  { name: "Cappuccino", price: "$4.50", note: "Dry foam, dusted with cacao.", img: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=900&q=80" },
];

export default function MenuScroller() {
  const ref = useGsapContext<HTMLElement>(() => {
    if (prefersReducedMotion() || isMobileViewport()) return;
    const track = ref.current?.querySelector<HTMLElement>("[data-menu-track]");
    if (!track) return;

    const getDistance = () => track.scrollWidth - window.innerWidth + 80;

    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: "top top",
      end: () => `+=${getDistance()}`,
      pin: true,
      scrub: 0.8,
      invalidateOnRefresh: true,
      animation: gsap.to(track, { x: () => -getDistance(), ease: "none" }),
    });

    return () => st.kill();
  }, []);

  return (
    <section ref={ref} id="menu" className="relative bg-darkroast text-cream grain overflow-hidden">
      <div className="relative z-10 pt-24 pb-10 px-6 md:px-10 max-w-[1400px] mx-auto flex items-end justify-between gap-6 flex-wrap">
        <div>
          <span className="font-mono-label text-cream/60">02 / Menu</span>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95] mt-3">
            Signature <span className="italic text-caramel">pours.</span>
          </h2>
        </div>
        <p className="max-w-sm text-cream/70">
          A short, rotating menu. Each drink built around a single bean, served the way it deserves.
        </p>
      </div>

      <div className="relative z-10 h-[70vh] overflow-hidden">
        <div data-menu-track className="flex gap-6 pl-6 md:pl-10 h-full items-center will-change-transform">
          {drinks.map((d, i) => (
            <article
              key={d.name}
              className="group relative shrink-0 w-[78vw] sm:w-[420px] md:w-[460px] h-[60vh] rounded-md overflow-hidden bg-espresso"
            >
              <img
                src={d.img}
                alt={d.name}
                loading="lazy"
                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/10 to-transparent" />
              <div className="absolute top-4 left-4 font-mono-label text-cream/80">
                N° {String(i + 1).padStart(2, "0")}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between gap-4">
                <div>
                  <h3 className="font-display text-3xl">{d.name}</h3>
                  <p className="text-cream/70 text-sm mt-1 max-w-[220px]">{d.note}</p>
                </div>
                <button
                  className="pill bg-cream text-espresso border-cream hover:bg-caramel hover:border-caramel"
                  aria-label={`Add ${d.name}`}
                >
                  <Plus className="size-3.5" />
                  {d.price}
                </button>
              </div>
            </article>
          ))}
          <div className="shrink-0 w-20" aria-hidden />
        </div>
      </div>
    </section>
  );
}
