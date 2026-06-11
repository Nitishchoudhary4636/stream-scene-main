import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useNavigate } from "@/lib/nav";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getSession } from "@/lib/auth";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

function AppLayout() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!getSession()) {
      navigate({ to: "/login" });
      return;
    }
    setReady(true);
  }, [navigate]);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="font-display text-4xl text-primary animate-pulse">STREAMORA</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
