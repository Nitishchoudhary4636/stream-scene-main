import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { TitleCard } from "@/components/TitleCard";
import { search } from "@/lib/catalog";

export const Route = createFileRoute("/_app/search")({
  head: () => ({ meta: [{ title: "Search — Streamora" }] }),
  component: SearchPage,
});

function SearchPage() {
  const [q, setQ] = useState("");
  const results = search(q);

  return (
    <div className="px-4 md:px-12 py-12 min-h-[70vh]">
      <div className="max-w-2xl mx-auto mb-10">
        <div className="flex items-center gap-3 bg-card border border-border rounded px-4 py-3">
          <SearchIcon className="size-5 text-muted-foreground" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search titles, genres, descriptions..."
            className="flex-1 bg-transparent focus:outline-none text-lg"
          />
        </div>
      </div>
      {q && (
        <p className="text-muted-foreground mb-6">
          {results.length} result{results.length === 1 ? "" : "s"} for "{q}"
        </p>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {results.map((t) => <TitleCard key={t.id} title={t} />)}
      </div>
      {!q && (
        <div className="text-center text-muted-foreground py-20">
          <p>Try searching for "drama", "thriller", "Tokyo"…</p>
        </div>
      )}
    </div>
  );
}
