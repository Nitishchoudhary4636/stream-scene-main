import { createFileRoute } from "@tanstack/react-router";
import { Row } from "@/components/Row";
import { titles } from "@/lib/catalog";

export const Route = createFileRoute("/_app/browse/new")({
  head: () => ({ meta: [{ title: "New & Popular — Streamora" }] }),
  component: NewPopular,
});

function NewPopular() {
  const news = titles.filter((t) => t.newRelease);
  const trending = titles.filter((t) => t.trending);
  return (
    <div className="px-4 md:px-12 pt-12">
      <h1 className="font-display text-5xl md:text-6xl mb-8">New & Popular</h1>
      <div className="-mx-4 md:-mx-12">
        <Row heading="New This Week" items={news} />
        <Row heading="Top 10 Trending" items={trending} />
        <Row heading="Coming Soon" items={titles.slice(20, 28)} />
      </div>
    </div>
  );
}
