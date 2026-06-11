import { useRouterState } from "@tanstack/react-router";
import { Link, useNavigate } from "@/lib/nav";
import { useEffect, useState } from "react";
import { Search, Bell, ChevronDown, LogOut } from "lucide-react";
import { getSession, logout } from "@/lib/auth";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const session = getSession();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/browse", label: "Home" },
    { to: "/browse/series", label: "TV Shows" },
    { to: "/browse/movies", label: "Movies" },
    { to: "/browse/new", label: "New & Popular" },
    { to: "/mylist", label: "My List" },
  ];

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  return (
    <header
      className={`navbar fixed top-0 left-0 right-0 z-50 px-4 md:px-12 py-4 transition-all ${
        scrolled ? "nav-scrolled" : "bg-gradient-to-b from-background/90 to-transparent"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/browse" className="font-display text-3xl tracking-wider text-primary">
            STREAMORA
          </Link>
          <nav className="hidden md:flex items-center gap-5 text-sm">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`transition-colors hover:text-muted-foreground ${
                  pathname === l.to ? "text-foreground font-semibold" : "text-foreground/85"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <button onClick={() => navigate({ to: "/search" })} aria-label="Search" className="hover:text-muted-foreground">
            <Search className="size-5" />
          </button>
          <button aria-label="Notifications" className="hidden sm:block hover:text-muted-foreground">
            <Bell className="size-5" />
          </button>
          {session && (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="flex items-center gap-2 hover:opacity-80"
              >
                <div className="size-8 rounded bg-primary flex items-center justify-center text-sm font-bold uppercase">
                  {session.name.charAt(0)}
                </div>
                <ChevronDown className="size-4 hidden sm:block" />
              </button>
              {menuOpen && (
                <div
                  onMouseLeave={() => setMenuOpen(false)}
                  className="absolute right-0 mt-2 w-56 rounded border border-border bg-card shadow-2xl py-2"
                >
                  <div className="px-4 py-2 border-b border-border">
                    <div className="font-semibold">{session.name}</div>
                    <div className="text-xs text-muted-foreground">{session.email}</div>
                  </div>
                  <Link to="/mylist" className="block px-4 py-2 text-sm hover:bg-accent">
                    My List
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-accent flex items-center gap-2"
                  >
                    <LogOut className="size-4" /> Sign out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
