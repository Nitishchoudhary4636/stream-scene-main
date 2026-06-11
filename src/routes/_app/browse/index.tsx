import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { Row } from "@/components/Row";
import { categories, byCategory, featured } from "@/lib/catalog";

export const Route = createFileRoute("/_app/browse/")({
  head: () => ({ meta: [{ title: "Home — Streamora" }] }),
  component: Browse,
});

function Browse() {
  return (
    <div className="-mt-16">
      <Hero title={featured} />
      <div className="-mt-16 relative z-20">
        {categories.map((cat) => (
          <Row key={cat} heading={cat} items={byCategory(cat)} />
        ))}
      </div>
    </div>
  );
}
