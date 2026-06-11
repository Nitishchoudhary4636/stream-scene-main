import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { Row } from "@/components/Row";
import { titles } from "@/lib/catalog";

export const Route = createFileRoute("/_app/browse/movies")({
  head: () => ({ meta: [{ title: "Movies — Streamora" }] }),
  component: Movies,
});

function Movies() {
  const movies = titles.filter((t) => /^\d+h/.test(t.duration));
  const featured = movies[0];
  return (
    <div className="-mt-16">
      <Hero title={featured} />
      <div className="-mt-16 relative z-20">
        <Row heading="All Movies" items={movies} />
        <Row heading="Action & Thriller" items={movies.filter((t) => t.genres.some((g) => ["Action", "Thriller"].includes(g)))} />
        <Row heading="Drama & Romance" items={movies.filter((t) => t.genres.some((g) => ["Drama", "Romance"].includes(g)))} />
        <Row heading="Sci-Fi" items={movies.filter((t) => t.genres.includes("Sci-Fi"))} />
      </div>
    </div>
  );
}
