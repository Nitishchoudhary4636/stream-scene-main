import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@/lib/nav";
import { useEffect, useState } from "react";
import { TitleCard } from "@/components/TitleCard";
import { byId } from "@/lib/catalog";
import { getSession, getMyList } from "@/lib/auth";

export const Route = createFileRoute("/_app/mylist")({
  head: () => ({ meta: [{ title: "My List — Streamora" }] }),
  component: MyList,
});

function MyList() {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => {
    const s = getSession();
    if (s) setIds(getMyList(s.id));
  }, []);
  const items = ids.map(byId).filter(Boolean) as NonNullable<ReturnType<typeof byId>>[];

  return (
    <div className="px-4 md:px-12 py-12 min-h-[60vh]">
      <h1 className="font-display text-5xl md:text-6xl mb-8">My List</h1>
      {items.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-xl mb-4">Your list is empty.</p>
          <Link to="/browse" className="text-primary hover:underline">Browse titles to add some</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((t) => <TitleCard key={t.id} title={t} />)}
        </div>
      )}
    </div>
  );
}
