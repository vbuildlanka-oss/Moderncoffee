import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

export function useLenis() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    // Frame-rate independent lerp smoothing: continuously eases toward the
    // target scroll position, so it stays responsive to input while feeling
    // smooth. Lenis normalises the lerp by delta time internally, so this
    // behaves consistently on 60Hz and 120Hz displays. Touch is left native
    // (syncTouch off) so mobile scrolling stays snappy.
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      syncTouch: false,
    });

    // Avoid ScrollTrigger recalculating on every mobile URL-bar show/hide,
    // which otherwise causes pinned/scrubbed sections to jump.
    ScrollTrigger.config({ ignoreMobileResize: true });

    // Drive Lenis from GSAP's ticker so scroll + ScrollTrigger stay in sync.
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Recalculate trigger positions now that Lenis controls the scroll.
    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
    };
  }, []);
}
