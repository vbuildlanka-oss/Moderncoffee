import { useGsapContext } from "@/hooks/useGsapContext";
import { gsap, ScrollTrigger, prefersReducedMotion, isMobileViewport } from "@/lib/gsap";

const chapters = [
  {
    label: "Our Story",
    title: "From bean to bloom.",
    body: "We started in a 200-sq-ft corner shop with one machine and a stubborn belief that coffee should be slow, considered, and quietly perfect. Eight years on, that hasn’t changed.",
    img: "https://images.unsplash.com/photo-1442550528053-c431ecb55509?w=1200&q=80",
  },
  {
    label: "The Roast",
    title: "Light hands, dark roast.",
    body: "Every batch is roasted in-house on a 12kg Probat. We profile each origin individually — never chasing a house style, always chasing the bean.",
    img: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=1200&q=80",
  },
  {
    label: "The Pour",
    title: "Twenty seconds of focus.",
    body: "Our baristas train for six months before they pull a shot for you. Because the difference between good and great is measured in milliseconds.",
    img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&q=80",
  },
];

const stats = [
  { value: 8, suffix: "+", label: "Years roasting" },
  { value: 14, suffix: "", label: "Single origins" },
  { value: 312, suffix: "k", label: "Cups poured" },
];

export default function Story() {
  const ref = useGsapContext<HTMLElement>((_self, refObj) => {
    if (prefersReducedMotion()) return;
    const mobile = isMobileViewport();

    if (!mobile) {
      const cards = gsap.utils.toArray<HTMLElement>("[data-story-card]");
      const headings = gsap.utils.toArray<HTMLElement>("[data-story-heading]");

      headings.forEach((h, i) => gsap.set(h, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 20 }));
      cards.forEach((c, i) => gsap.set(c, { opacity: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 0.96 }));

      const total = chapters.length;
      // Scroll distance (in % of viewport height) each chapter is held before
      // advancing. Kept short so a single scroll gesture flips to the next
      // image, instead of the previous ~67vh (several scrolls) dead zone.
      const segmentVh = 22;
      let currentIdx = 0;

      const showChapter = (idx: number) => {
        headings.forEach((h, i) =>
          gsap.to(h, {
            opacity: i === idx ? 1 : 0,
            y: i === idx ? 0 : 20,
            duration: 0.45,
            ease: "power2.out",
            overwrite: true,
          }),
        );
        cards.forEach((c, i) =>
          gsap.to(c, {
            opacity: i === idx ? 1 : 0,
            scale: i === idx ? 1 : 0.96,
            duration: 0.5,
            ease: "power2.out",
            overwrite: true,
          }),
        );
      };

      ScrollTrigger.create({
        // Use the pinned element itself as the trigger so the pin engages
        // exactly when the desktop content reaches the viewport top — no
        // dead-scroll through hidden mobile content above it.
        trigger: ".story-pin",
        start: "top top",
        end: `+=${total * segmentVh}%`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 0.3,
        onUpdate: (self) => {
          const idx = Math.min(total - 1, Math.floor(self.progress * total));
          if (idx === currentIdx) return;
          currentIdx = idx;
          showChapter(idx);
        },
      });
    } else {
      // Mobile: fade chapters in on scroll, no pinning
      gsap.utils.toArray<HTMLElement>("[data-mobile-chapter]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
        });
      });
    }

    gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
      const target = Number(el.dataset.counter);
      const obj = { v: 0 };
      gsap.to(obj, {
        v: target,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
        onUpdate: () => (el.textContent = Math.round(obj.v).toString()),
      });
    });
  }, []);

  return (
    <section ref={ref} id="story" className="relative bg-background">
      {/* Mobile: natural stacked chapters */}
      <div className="lg:hidden max-w-[1400px] mx-auto px-5 py-20 space-y-20">
        {chapters.map((c, i) => (
          <div key={i} data-mobile-chapter className="space-y-6">
            <div className="aspect-[4/5] rounded-md overflow-hidden">
              <img src={c.img} alt={c.title} className="size-full object-cover" loading="lazy" />
            </div>
            <span className="font-mono-label text-mutedtext">{c.label}</span>
            <h2 className="font-display text-5xl leading-[0.95] tracking-tight">{c.title}</h2>
            <p className="text-mutedtext text-base leading-relaxed">{c.body}</p>
          </div>
        ))}
      </div>

      {/* Desktop: pinned scrub */}
      <div className="hidden lg:block">
        <div className="story-pin min-h-[100dvh] flex items-center">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 py-24">
            <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-[60vh]">
              {chapters.map((c, i) => (
                <div
                  key={i}
                  data-story-heading
                  className="absolute inset-0 flex flex-col justify-center"
                >
                  <span className="font-mono-label text-mutedtext">{c.label}</span>
                  <h2 className="font-display text-5xl md:text-7xl leading-[0.95] mt-4">
                    {c.title}
                  </h2>
                  <p className="mt-6 max-w-md text-mutedtext text-lg leading-relaxed">{c.body}</p>
                </div>
              ))}
            </div>

            <div className="lg:col-span-6 relative aspect-[4/5] lg:aspect-auto lg:h-[70vh]">
              {chapters.map((c, i) => (
                <div
                  key={i}
                  data-story-card
                  className="absolute inset-0 rounded-md overflow-hidden"
                >
                  <img
                    src={c.img}
                    alt={c.title}
                    className="size-full object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border bg-background">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
          {stats.map((s) => (
            <div key={s.label} className="py-12 md:py-20 px-6 text-center md:text-left">
              <div className="font-display text-7xl md:text-8xl leading-none tracking-tight">
                <span data-counter={s.value}>0</span>
                <span className="text-caramel">{s.suffix}</span>
              </div>
              <div className="font-mono-label mt-4 text-mutedtext">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
