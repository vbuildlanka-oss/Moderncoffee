import { useGsapContext } from "@/hooks/useGsapContext";
import { gsap, ScrollTrigger, prefersReducedMotion, isMobileViewport } from "@/lib/gsap";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const drinks = [
  {
    name: "Cortado",
    price: "$4.50",
    note: "Equal parts espresso & steamed milk.",
    img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=900&q=80",
  },
  {
    name: "Pour Over",
    price: "$5.00",
    note: "Single origin, brewed to order.",
    img: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=900&q=80",
  },
  {
    name: "Flat White",
    price: "$4.75",
    note: "Velvet microfoam, double ristretto.",
    img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=900&q=80",
  },
  {
    name: "Espresso",
    price: "$3.50",
    note: "Our seasonal house blend.",
    img: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=900&q=80",
  },
  {
    name: "Iced Latte",
    price: "$5.25",
    note: "Slow-steeped, never bitter.",
    img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=900&q=80",
  },
  {
    name: "Cappuccino",
    price: "$4.50",
    note: "Dry foam, dusted with cacao.",
    img: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=900&q=80",
  },
];

export default function MenuScroller() {
  const ref = useGsapContext<HTMLElement>(() => {
    if (prefersReducedMotion() || isMobileViewport()) return;
    const panel = ref.current?.querySelector<HTMLElement>("[data-menu-panel]");
    const track = ref.current?.querySelector<HTMLElement>("[data-menu-track]");
    if (!panel || !track) return;

    const getDistance = () => Math.max(0, track.scrollWidth - panel.clientWidth + 80);

    const st = ScrollTrigger.create({
      trigger: panel,
      start: "bottom bottom",
      end: () => `+=${getDistance()}`,
      pin: true,
      // Anticipate the pin so the panel eases into its fixed position rather
      // than snapping/pausing to "settle" the moment smooth scrolling reaches
      // the trigger point.
      anticipatePin: 1,
      // A lower scrub lets the horizontal motion begin promptly once pinned,
      // avoiding a "pinned but nothing moving yet" dead moment at the start.
      scrub: 0.5,
      invalidateOnRefresh: true,
      animation: gsap.to(track, { x: () => -getDistance(), ease: "none" }),
    });

    return () => st.kill();
  }, []);

  return (
    <section ref={ref} id="menu" className="relative bg-darkroast text-cream grain overflow-hidden">
      <div className="relative z-10 pt-20 md:pt-24 pb-8 md:pb-10 px-5 md:px-10 max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-5">
        <div>
          <span className="font-mono-label text-cream/60">Menu</span>
          <h2 className="font-display text-5xl md:text-7xl leading-[0.95] mt-3">
            Signature <span className="italic text-caramel">pours.</span>
          </h2>
        </div>
        <p className="max-w-sm text-cream/70 text-sm md:text-base">
          A short, rotating menu. Each drink built around a single bean, served the way it deserves.
        </p>
      </div>

      <div
        data-menu-panel
        className="relative z-10 h-auto lg:h-[70vh] overflow-hidden pb-12 lg:pb-0 bg-darkroast"
      >
        <div
          data-menu-track
          className="flex gap-4 md:gap-6 pl-5 md:pl-10 h-full items-stretch lg:items-center will-change-transform overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none scroll-px-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {drinks.map((d) => (
            <article
              key={d.name}
              className="group relative shrink-0 snap-start w-[78vw] sm:w-[360px] md:w-[420px] h-[58vh] max-h-[440px] sm:h-auto sm:aspect-[3/4] lg:aspect-auto lg:h-[60vh] rounded-md overflow-hidden bg-espresso"
            >
              <img
                src={d.img}
                alt={d.name}
                loading="lazy"
                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div className="min-w-0">
                  <h3 className="font-display text-2xl md:text-3xl">{d.name}</h3>
                  <p className="text-cream/70 text-xs md:text-sm mt-1 max-w-[180px] md:max-w-[220px]">
                    {d.note}
                  </p>
                </div>
                <button
                  onClick={() =>
                    toast.success(`${d.name} added`, {
                      description: `${d.price} — ready in about 4 minutes.`,
                    })
                  }
                  className="pill bg-cream text-espresso border-cream hover:bg-caramel hover:border-caramel shrink-0"
                  aria-label={`Add ${d.name}`}
                >
                  <Plus className="size-3.5" />
                  {d.price}
                </button>
              </div>
            </article>
          ))}
          <div className="shrink-0 w-5 md:w-20" aria-hidden />
        </div>
      </div>
    </section>
  );
}
