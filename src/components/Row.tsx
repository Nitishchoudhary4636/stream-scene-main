import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TitleCard } from "./TitleCard";
import type { Title } from "@/lib/catalog";

export function Row({ heading, items }: { heading: string; items: Title[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    ref.current?.scrollBy({ left: dir * (ref.current.clientWidth * 0.85), behavior: "smooth" });
  };

  if (!items.length) return null;

  return (
    <section className="products-section px-4 md:px-12 mb-10 group/row">
      <h2 className="text-lg md:text-xl font-semibold mb-3">{heading}</h2>
      <div className="relative">
        <button
          onClick={() => scroll(-1)}
          aria-label="Scroll left"
          className="absolute left-0 top-0 bottom-0 z-20 px-2 bg-background/60 opacity-0 group-hover/row:opacity-100 transition-opacity hidden md:flex items-center"
        >
          <ChevronLeft className="size-8" />
        </button>
        <div ref={ref} className="plp-products row-scroll flex gap-2 overflow-x-auto scroll-smooth">
          {items.map((t) => (
            <TitleCard key={t.id} title={t} />
          ))}
        </div>
        <button
          onClick={() => scroll(1)}
          aria-label="Scroll right"
          className="absolute right-0 top-0 bottom-0 z-20 px-2 bg-background/60 opacity-0 group-hover/row:opacity-100 transition-opacity hidden md:flex items-center"
        >
          <ChevronRight className="size-8" />
        </button>
      </div>
    </section>
  );
}
