import { useEffect, useState } from "react";

import { useLenis } from "@/hooks/useLenis";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Story from "@/components/Story";
import MenuScroller from "@/components/MenuScroller";
import Visit from "@/components/Visit";
import Testimonials from "@/components/Testimonials";
import NewsletterCTA from "@/components/NewsletterCTA";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  useLenis();
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.9;
      const newsletter = document.getElementById("newsletter");
      let nearNewsletter = false;
      if (newsletter) {
        const r = newsletter.getBoundingClientRect();
        nearNewsletter = r.top < window.innerHeight && r.bottom > 0;
      }
      setShowSticky(past && !nearNewsletter);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <Hero />
      <Marquee />
      <Story />
      <MenuScroller />
      <Visit />
      <Testimonials />
      <NewsletterCTA />
      <Footer />

      <a
        href="#newsletter"
        aria-label="Order Online"
        className={`md:hidden fixed bottom-5 right-5 z-40 pill pill-primary shadow-xl transition-all duration-500 ${
          showSticky
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        Order <span className="arrow">→</span>
      </a>
      <Toaster />
    </main>
  );
}
