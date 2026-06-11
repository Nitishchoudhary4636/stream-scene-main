import { Link } from "@/lib/nav";
import { Play, Info } from "lucide-react";
import type { Title } from "@/lib/catalog";

export function Hero({ title }: { title: Title }) {
  return (
    <div id="hero" className="featured-products relative h-[85vh] w-full">
      <img src={title.backdrop} alt={title.title} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 side-gradient" />
      <div className="relative z-10 h-full flex flex-col justify-end pb-24 px-4 md:px-12 max-w-2xl">
        <div className="text-xs tracking-[0.3em] text-primary font-semibold mb-3">
          STREAMORA ORIGINAL
        </div>
        <h1 className="font-display text-5xl md:text-7xl mb-4 text-shadow-hero leading-none">
          {title.title}
        </h1>
        <div className="flex items-center gap-3 text-sm mb-3 text-foreground/90">
          <span className="text-emerald-400 font-semibold">{title.match}% Match</span>
          <span>{title.year}</span>
          <span className="border border-muted-foreground/50 px-1 text-xs">{title.rating}</span>
          <span>{title.duration}</span>
        </div>
        <p className="text-base md:text-lg text-foreground/90 mb-6 text-shadow-hero line-clamp-3">
          {title.description}
        </p>
        <div className="flex gap-3">
          <Link
            to="/title/$id"
            params={{ id: title.id }}
            className="flex items-center gap-2 bg-foreground text-background px-7 py-2.5 rounded font-semibold hover:bg-foreground/85 transition"
          >
            <Play className="size-5 fill-current" /> Play
          </Link>
          <Link
            to="/title/$id"
            params={{ id: title.id }}
            className="flex items-center gap-2 bg-muted/70 backdrop-blur text-foreground px-7 py-2.5 rounded font-semibold hover:bg-muted transition"
          >
            <Info className="size-5" /> More Info
          </Link>
        </div>
      </div>
    </div>
  );
}
