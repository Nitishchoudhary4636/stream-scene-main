import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect } from "react";

import { getMyList, getSession } from "@/lib/auth";
import { byId, titles } from "@/lib/catalog";

type MCPItem = {
  item_id: string;
  item_sku: string;
  item_name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  url?: string;
  color?: string;
  size?: string;
  index?: number;
};

type MCPSnapshot = {
  pageName: string;
  pageType: string;
  currency: string;
  itemListId?: string;
  itemListName?: string;
  Item?: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    url: string;
    currency: string;
    inventoryCount: number;
    price: number;
    availability: string;
    category?: string;
    color?: string;
    size?: string;
  };
  items?: MCPItem[];
};

declare global {
  interface Window {
    dataLayer?: Array<{ MCP?: MCPSnapshot }>;
  }
}

function toMcpCartItem(title: (typeof titles)[number], index: number): MCPItem {
  return {
    item_id: title.id,
    item_sku: title.id,
    item_name: title.title,
    price: Number((title.match / 10).toFixed(2)),
    quantity: 1,
    imageUrl: title.poster,
    url: `/title/${title.id}`,
    index,
  };
}

function buildMcpSnapshot(pathname: string, session: ReturnType<typeof getSession>): MCPSnapshot {
  const currency = "INR";

  if (pathname === "/") {
    return { pageName: "Home", pageType: "Home", currency };
  }

  if (pathname === "/login" || pathname === "/signup") {
    return {
      pageName: pathname === "/login" ? "Login" : "Signup",
      pageType: "login",
      currency,
    };
  }

  if (pathname === "/browse" || pathname === "/browse/") {
    return { pageName: "Home", pageType: "Home", currency };
  }

  if (pathname === "/browse/movies") {
    return {
      pageName: "Movies",
      pageType: "Category",
      itemListId: "movies",
      itemListName: "All Movies",
      currency,
    };
  }

  if (pathname === "/browse/series") {
    return {
      pageName: "TV Shows",
      pageType: "Category",
      itemListId: "series",
      itemListName: "All Series",
      currency,
    };
  }

  if (pathname === "/browse/new") {
    return {
      pageName: "New & Popular",
      pageType: "Category",
      itemListId: "new-popular",
      itemListName: "New & Popular",
      currency,
    };
  }

  if (pathname === "/search") {
    return { pageName: "Search", pageType: "Search", currency };
  }

  if (pathname === "/mylist") {
    const myListIds = session ? getMyList(session.id) : [];
    const items = myListIds
      .map((id, index) => {
        const title = byId(id);
        return title ? toMcpCartItem(title, index) : null;
      })
      .filter((item): item is MCPItem => item !== null);

    return {
      pageName: "My List",
      pageType: "Cart",
      currency,
      items,
    };
  }

  const titleMatch = pathname.match(/^\/title\/([^/]+)$/);
  if (titleMatch) {
    const title = byId(decodeURIComponent(titleMatch[1]));
    if (title) {
      return {
        pageName: title.title,
        pageType: "Product",
        currency,
        Item: {
          id: title.id,
          name: title.title,
          description: title.description,
          imageUrl: title.backdrop,
          url: `/title/${title.id}`,
          currency,
          inventoryCount: 1,
          price: Number((title.match / 10).toFixed(2)),
          availability: "InStock",
          category: title.category,
        },
      };
    }
  }

  return {
    pageName: "Default",
    pageType: "default",
    currency,
  };
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const session = getSession();

  useEffect(() => {
    const snapshot = buildMcpSnapshot(pathname, session);
    const dataLayer = window.dataLayer ?? (window.dataLayer = []);

    if (dataLayer.length === 0) {
      dataLayer.push({ MCP: snapshot });
    } else {
      dataLayer[0] = { MCP: snapshot };
    }
  }, [pathname, session?.id, session?.email, session?.name]);

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
