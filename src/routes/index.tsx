import { createFileRoute } from "@tanstack/react-router";
import { Link, useNavigate } from "@/lib/nav";
import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { getSession } from "@/lib/auth";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Streamora — Unlimited movies, TV shows & more" },
      { name: "description", content: "Watch anywhere. Cancel anytime. Join Streamora today." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (getSession()) navigate({ to: "/browse" });
  }, [navigate]);

  if (!mounted) return null;

  const onStart = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/signup", search: { email } as never });
  };

  return (
    <div className="min-h-screen bg-background featured-products">
      {/* Hero */}
      <div id="hero" className="relative min-h-[95vh]">
        <img
          src="https://picsum.photos/seed/streamora-landing/1920/1080"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />

        <header className="relative z-10 flex items-center justify-between px-6 md:px-16 py-6">
          <div className="font-display text-3xl md:text-4xl tracking-wider text-primary">STREAMORA</div>
          <Link to="/login" className="bg-primary hover:bg-primary-hover text-primary-foreground px-5 py-1.5 rounded font-semibold">
            Sign In
          </Link>
        </header>

        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-20 pb-32 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Unlimited movies, TV shows, and more
          </h1>
          <p className="text-xl md:text-2xl mb-3">Starts at MRP ₹599. Cancel anytime.</p>
          <p className="text-lg mb-6">Ready to watch? Enter your email to create or restart your membership.</p>
          <form onSubmit={onStart} className="w-full max-w-2xl flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="flex-1 bg-card/80 border border-border rounded px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button className="bg-primary hover:bg-primary-hover text-primary-foreground font-semibold px-6 py-3 rounded text-lg flex items-center justify-center gap-2">
              Get Started <ChevronRight className="size-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Feature blocks */}
      {[
        {
          h: "Enjoy on your TV",
          p: "Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
          img: "streamora-tv",
        },
        {
          h: "Download your shows to watch offline",
          p: "Save your favorites easily and always have something to watch.",
          img: "streamora-download",
        },
        {
          h: "Watch everywhere",
          p: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.",
          img: "streamora-everywhere",
        },
      ].map((f, i) => (
        <section key={i} className="border-t-8 border-secondary py-14 px-6 md:px-16">
          <div className={`max-w-6xl mx-auto flex flex-col ${i % 2 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-10`}>
            <div className="flex-1">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">{f.h}</h2>
              <p className="text-lg md:text-xl text-foreground/80">{f.p}</p>
            </div>
            <div className="flex-1">
              <img src={`https://picsum.photos/seed/${f.img}/800/500`} alt="" className="w-full rounded-lg" />
            </div>
          </div>
        </section>
      ))}

      {/* FAQ */}
      <section className="border-t-8 border-secondary py-14 px-6 md:px-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {[
              ["What is Streamora?", "Streamora is a streaming service that offers a wide variety of award-winning shows, movies, anime, documentaries and more."],
              ["How much does Streamora cost?", "Watch on your phone, tablet, smart TV or laptop without paying more — starting from just MRP ₹599/month. No extra costs, no contracts."],
              ["Where can I watch?", "Watch anywhere, anytime. Sign in with your account to watch instantly on the web from your computer or any internet-connected device."],
              ["How do I cancel?", "Streamora is flexible. There are no annoying contracts and no commitments. Cancel your account online in two clicks."],
              ["What can I watch on Streamora?", "Streamora has an extensive library of feature films, documentaries, TV shows, anime, award-winning Streamora originals, and more."],
            ].map(([q, a]) => (
              <details key={q} className="bg-card border border-border rounded">
                <summary className="cursor-pointer text-lg md:text-xl px-5 py-4 flex justify-between items-center">
                  {q} <span className="text-2xl">+</span>
                </summary>
                <div className="px-5 py-4 border-t border-border text-foreground/85">{a}</div>
              </details>
            ))}
          </div>
          <form onSubmit={onStart} className="mt-10 flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="flex-1 bg-card/80 border border-border rounded px-4 py-3"
            />
            <button className="bg-primary hover:bg-primary-hover text-primary-foreground font-semibold px-6 py-3 rounded flex items-center justify-center gap-2">
              Get Started <ChevronRight className="size-5" />
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-border py-10 px-6 md:px-16 text-muted-foreground text-sm">
        <div className="max-w-5xl mx-auto">
          © {new Date().getFullYear()} Streamora — A demo project.
        </div>
      </footer>
    </div>
  );
}
