import { Link } from "@/lib/nav";
import { Play, Plus, ChevronDown } from "lucide-react";
import type { Title } from "@/lib/catalog";

export function TitleCard({ title }: { title: Title }) {
  return (
    <Link
      to="/title/$id"
      params={{ id: title.id }}
      className="group relative shrink-0 w-[240px] md:w-[280px] rounded overflow-hidden transition-transform duration-300 hover:scale-105 hover:z-10"
    >
      <img
        src={title.backdrop}
        alt={title.title}
        loading="lazy"
        className="w-full aspect-video object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
        <h3 className="font-semibold text-sm mb-1 truncate">{title.title}</h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="text-emerald-400 font-semibold">{title.match}% Match</span>
          <span className="border border-muted-foreground/40 px-1 text-[10px]">{title.rating}</span>
          <span>{title.duration}</span>
        </div>
        <div className="flex gap-1 mt-2">
          <button className="btn-large size-7 rounded-full bg-foreground text-background flex items-center justify-center" aria-label="Play">
            <Play className="size-3.5 fill-current" />
          </button>
          <button className="size-7 rounded-full border border-foreground/60 flex items-center justify-center" aria-label="Add">
            <Plus className="size-3.5" />
          </button>
          <button className="size-7 rounded-full border border-foreground/60 flex items-center justify-center ml-auto" aria-label="More">
            <ChevronDown className="size-3.5" />
          </button>
        </div>
      </div>
    </Link>
  );
}
