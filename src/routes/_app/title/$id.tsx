import { createFileRoute } from "@tanstack/react-router";
import { Link, useNavigate } from "@/lib/nav";
import { useEffect, useState } from "react";
import { Play, Plus, Check, ArrowLeft, ThumbsUp } from "lucide-react";
import { byId, titles } from "@/lib/catalog";
import { TitleCard } from "@/components/TitleCard";
import { getSession, getMyList, toggleMyList } from "@/lib/auth";

export const Route = createFileRoute("/_app/title/$id")({
  head: ({ params }) => ({ meta: [{ title: `${byId(params.id)?.title ?? "Title"} — Streamora` }] }),
  component: TitleDetail,
});

function TitleDetail() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const t = byId(id);
  const session = getSession();
  const [inList, setInList] = useState(false);

  useEffect(() => {
    if (session) setInList(getMyList(session.id).includes(id));
  }, [id, session]);

  if (!t) {
    return (
      <div className="px-4 md:px-12 py-24 text-center">
        <h1 className="text-3xl mb-4">Title not found</h1>
        <Link to="/browse" className="text-primary hover:underline">Back to browse</Link>
      </div>
    );
  }

  const similar = titles.filter((x) => x.id !== t.id && x.genres.some((g) => t.genres.includes(g))).slice(0, 8);

  const onToggle = () => {
    if (!session) return;
    toggleMyList(session.id, t.id);
    setInList((v) => !v);
  };

  return (
    <div className="-mt-16">
      <div className="relative h-[70vh]">
        <img src={t.backdrop} alt={t.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 side-gradient" />
        <button
          onClick={() => navigate({ to: "/browse" })}
          className="absolute top-24 left-4 md:left-12 z-10 bg-background/60 backdrop-blur rounded-full p-2 hover:bg-background/80"
          aria-label="Back"
        >
          <ArrowLeft className="size-5" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 px-4 md:px-12 pb-10 max-w-3xl">
          <h1 className="font-display text-5xl md:text-7xl mb-3 text-shadow-hero leading-none">{t.title}</h1>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-foreground text-background px-7 py-2.5 rounded font-semibold hover:bg-foreground/85">
              <Play className="size-5 fill-current" /> Play
            </button>
            <button
              onClick={onToggle}
              className="btn-large flex items-center gap-2 bg-muted/70 backdrop-blur px-5 py-2.5 rounded font-semibold hover:bg-muted"
            >
              {inList ? <><Check className="size-5" /> In My List</> : <><Plus className="size-5" /> My List</>}
            </button>
            <button className="size-11 rounded-full bg-muted/70 backdrop-blur flex items-center justify-center hover:bg-muted" aria-label="Like">
              <ThumbsUp className="size-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-12 py-10 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 text-sm mb-4 flex-wrap">
              <span className="text-emerald-400 font-semibold">{t.match}% Match</span>
              <span>{t.year}</span>
              <span className="border border-muted-foreground/50 px-1 text-xs">{t.rating}</span>
              <span>{t.duration}</span>
              <span className="border border-foreground/40 px-1.5 text-xs">HD</span>
            </div>
            <p className="text-lg leading-relaxed">{t.description}</p>
          </div>
          <aside className="text-sm space-y-3">
            <div>
              <span className="text-muted-foreground">Genres: </span>
              <span>{t.genres.join(", ")}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Cast: </span>
              <span>Eva Lange, Marcus Chen, Priya Nair, Tomás Rivera</span>
            </div>
            <div>
              <span className="text-muted-foreground">Director: </span>
              <span>Sora Mendel</span>
            </div>
            <div>
              <span className="text-muted-foreground">This show is: </span>
              <span>Suspenseful, Cinematic, Bingeworthy</span>
            </div>
          </aside>
        </div>
      </div>

      {similar.length > 0 && (
        <section className="px-4 md:px-12 pb-12">
          <h2 className="text-2xl font-semibold mb-4">More Like This</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {similar.map((s) => <TitleCard key={s.id} title={s} />)}
          </div>
        </section>
      )}
    </div>
  );
}
