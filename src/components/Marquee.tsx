const items = [
  "Single Origin",
  "Slow Roasted",
  "Hand Poured",
  "Locally Sourced",
  "Est. 2018",
  "Direct Trade",
];

export default function Marquee() {
  const loop = [...items, ...items, ...items];
  return (
    <div className="border-y border-border bg-background py-6 overflow-hidden">
      <div className="flex gap-12 whitespace-nowrap animate-[marquee_40s_linear_infinite]">
        {loop.map((t, i) => (
          <span key={i} className="font-display italic text-3xl md:text-5xl text-foreground/80 flex items-center gap-12">
            {t}
            <span className="text-caramel">✦</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { to { transform: translateX(-33.333%); } }`}</style>
    </div>
  );
}
