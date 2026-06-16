import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Craft", href: "#story" },
  { label: "Menu", href: "#menu" },
  { label: "Visit", href: "#visit" },
  { label: "Stories", href: "#testimonials" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 backdrop-blur-md bg-background/70 border-b border-border/40"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl tracking-tight">
          Brew<span className="text-caramel">.</span>Bloom
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono-label text-foreground/70 hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#newsletter" className="hidden md:inline-flex pill pill-primary">
          Order Online <span className="arrow">→</span>
        </a>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              className="md:hidden p-2 -mr-2"
              aria-label="Open menu"
            >
              <Menu className="size-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-full bg-espresso text-cream border-0 p-0">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="flex flex-col h-full p-8">
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl">Brew<span className="text-caramel">.</span>Bloom</span>
                <button onClick={() => setOpen(false)} aria-label="Close menu">
                  <X className="size-6" />
                </button>
              </div>
              <nav className="flex-1 flex flex-col justify-center gap-6">
                <AnimatePresence>
                  {links.map((l, i) => (
                    <motion.a
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="font-display text-6xl tracking-tight"
                    >
                      {l.label}
                    </motion.a>
                  ))}
                </AnimatePresence>
              </nav>
              <a
                href="#newsletter"
                onClick={() => setOpen(false)}
                className="pill pill-primary self-start bg-cream text-espresso border-cream"
              >
                Order Online <span className="arrow">→</span>
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
