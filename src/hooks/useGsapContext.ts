import { useLayoutEffect, useRef, type RefObject, type DependencyList } from "react";
import { gsap } from "@/lib/gsap";

export function useGsapContext<T extends HTMLElement = HTMLDivElement>(
  setup: (self: gsap.Context, ref: RefObject<T | null>) => void,
  deps: DependencyList = [],
) {
  const ref = useRef<T | null>(null);
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context((self) => setup(self, ref), ref);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return ref;
}
