import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { Row } from "@/components/Row";
import { titles } from "@/lib/catalog";

export const Route = createFileRoute("/_app/browse/series")({
  head: () => ({ meta: [{ title: "TV Shows — Streamora" }] }),
  component: Series,
});

function Series() {
  const series = titles.filter((t) => /Season|Limited Series/.test(t.duration));
  const featured = series[0];
  const dramas = series.filter((t) => t.genres.includes("Drama"));
  const action = series.filter((t) => t.genres.includes("Action"));
  const mystery = series.filter((t) => t.genres.includes("Mystery") || t.genres.includes("Crime"));
  return (
    <div className="-mt-16">
      <Hero title={featured} />
      <div className="-mt-16 relative z-20">
        <Row heading="All Series" items={series} />
        <Row heading="Drama Series" items={dramas} />
        <Row heading="Action Series" items={action} />
        <Row heading="Mystery & Crime" items={mystery} />
      </div>
    </div>
  );
}
