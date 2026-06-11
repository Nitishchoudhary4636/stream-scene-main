import { createFileRoute } from "@tanstack/react-router";
import { Link, useNavigate } from "@/lib/nav";
import { useState } from "react";
import { signUp } from "@/lib/auth";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign Up — Streamora" }] }),
  validateSearch: (s: Record<string, unknown>) => ({ email: (s.email as string) || "" }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const { email: initialEmail } = Route.useSearch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState(initialEmail || "");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      signUp(name, email, password);
      navigate({ to: "/browse" });
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <img src="https://picsum.photos/seed/streamora-auth2/1920/1080" alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-background/60" />
      <header className="relative z-10 px-6 md:px-16 py-5">
        <Link to="/" className="font-display text-3xl tracking-wider text-primary">STREAMORA</Link>
      </header>
      <div className="relative z-10 flex justify-center px-4">
        <div className="bg-background/80 backdrop-blur w-full max-w-md rounded p-8 md:p-12 mt-6">
          <h1 className="text-3xl font-bold mb-2">Create your account</h1>
          <p className="text-muted-foreground mb-6">Just a few details and you're in.</p>
          {error && <div className="bg-primary/15 border border-primary text-sm rounded p-3 mb-4">{error}</div>}
          <form id="authForm" onSubmit={onSubmit} className="space-y-4">
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="w-full bg-input border-0 rounded px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full bg-input border-0 rounded px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password (min 6 characters)"
              className="w-full bg-input border-0 rounded px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input id="chkOffersChecked" type="checkbox" className="size-4 rounded border-border" />
              Send me offers and updates
            </label>
            <button
              type="submit" disabled={loading}
              className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-semibold py-3 rounded mt-4 disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>
          <div className="mt-10 text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-foreground hover:underline font-semibold">Sign in</Link>.
          </div>
        </div>
      </div>
    </div>
  );
}
