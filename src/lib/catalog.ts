export interface Title {
  id: string;
  title: string;
  year: number;
  rating: string; // TV-MA, PG-13...
  duration: string;
  genres: string[];
  description: string;
  match: number; // 0-100
  category: string;
  poster: string; // portrait
  backdrop: string; // landscape
  trending?: boolean;
  newRelease?: boolean;
}

const img = (seed: string, w: number, h: number) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;

const make = (
  id: string,
  title: string,
  year: number,
  rating: string,
  duration: string,
  genres: string[],
  description: string,
  category: string,
  match = 95,
  flags: { trending?: boolean; newRelease?: boolean } = {},
): Title => ({
  id,
  title,
  year,
  rating,
  duration,
  genres,
  description,
  match,
  category,
  poster: img(id + "-p", 400, 600),
  backdrop: img(id + "-b", 1600, 900),
  ...flags,
});

export const titles: Title[] = [
  make("midnight-protocol", "Midnight Protocol", 2024, "TV-MA", "1h 58m", ["Thriller", "Sci-Fi"],
    "A rogue AI engineer races against the clock to disable a sentient program that has infiltrated global defense networks.",
    "Trending Now", 97, { trending: true }),
  make("velvet-shadows", "Velvet Shadows", 2025, "TV-MA", "Limited Series", ["Drama", "Mystery"],
    "In 1960s Lisbon, a jewel thief and an Interpol detective enter a dangerous game of seduction and betrayal.",
    "Trending Now", 96, { trending: true, newRelease: true }),
  make("crown-of-ash", "Crown of Ash", 2024, "TV-14", "Season 1", ["Fantasy", "Action"],
    "Two exiled siblings raise an army of outcasts to reclaim a kingdom built on lies.",
    "Trending Now", 94, { trending: true }),
  make("last-light-tokyo", "Last Light: Tokyo", 2024, "R", "2h 14m", ["Action", "Drama"],
    "A retired assassin returns to Tokyo for one final job that unravels the syndicate that destroyed his family.",
    "Trending Now", 93, { trending: true }),
  make("the-archivist", "The Archivist", 2025, "TV-MA", "Season 2", ["Mystery", "Drama"],
    "A reclusive librarian uncovers letters that rewrite a century of family secrets — and her own identity.",
    "Trending Now", 91, { trending: true, newRelease: true }),
  make("orbital", "Orbital", 2024, "PG-13", "1h 47m", ["Sci-Fi", "Drama"],
    "Six astronauts aboard the ISS witness an event on Earth that changes the meaning of home forever.",
    "Trending Now", 90, { trending: true }),

  make("cold-harbor", "Cold Harbor", 2023, "TV-MA", "Season 3", ["Crime", "Thriller"],
    "A grizzled detective and a tech-savvy rookie hunt a serial killer through the fog of a coastal town.",
    "Top Picks for You", 92),
  make("paper-hearts", "Paper Hearts", 2024, "PG", "1h 42m", ["Romance", "Comedy"],
    "Two rival stationery designers fall for each other through anonymous handwritten letters.",
    "Top Picks for You", 88),
  make("the-quiet-engine", "The Quiet Engine", 2024, "TV-14", "Documentary", ["Documentary"],
    "Inside the racing teams who chase the impossible: a silent, sub-7-second quarter mile.",
    "Top Picks for You", 89),
  make("nine-cities", "Nine Cities", 2025, "TV-MA", "Limited Series", ["Drama", "Anthology"],
    "Nine strangers, nine cities, one night that connects all of them in ways they'll never know.",
    "Top Picks for You", 95, { newRelease: true }),
  make("blackline", "Blackline", 2023, "R", "2h 02m", ["Action", "Thriller"],
    "When a subway derails under Manhattan, a transit cop discovers it's only the first move.",
    "Top Picks for You", 87),
  make("salt-and-stone", "Salt & Stone", 2024, "TV-PG", "Season 1", ["Drama", "Family"],
    "Three sisters return to their grandmother's coastal bakery and face the recipes — and grudges — they left behind.",
    "Top Picks for You", 86),

  make("nebula-nine", "Nebula Nine", 2025, "TV-14", "Season 1", ["Sci-Fi", "Adventure"],
    "A patchwork crew aboard a salvaged starship answers a distress call from a planet that shouldn't exist.",
    "New Releases", 92, { newRelease: true }),
  make("after-the-rain", "After The Rain", 2025, "TV-MA", "1h 51m", ["Drama"],
    "A storm chaser confronts the day that defined her career — and the brother she lost to it.",
    "New Releases", 89, { newRelease: true }),
  make("northwind", "Northwind", 2025, "TV-14", "Season 1", ["Adventure", "Drama"],
    "A dog-sled racer and her young apprentice cross the Iditarod with only days to save a dying town.",
    "New Releases", 88, { newRelease: true }),
  make("the-bargain", "The Bargain", 2025, "TV-MA", "Limited Series", ["Crime", "Drama"],
    "A defense attorney trades a confession for her daughter's safety. The price keeps rising.",
    "New Releases", 94, { newRelease: true }),
  make("electric-summer", "Electric Summer", 2025, "PG-13", "1h 38m", ["Comedy", "Romance"],
    "A power outage strands two strangers on a Brooklyn rooftop for the longest night of their lives.",
    "New Releases", 85, { newRelease: true }),
  make("fairgrounds", "Fairgrounds", 2025, "TV-PG", "Season 1", ["Family", "Drama"],
    "A traveling carnival arrives in a small town with a Ferris wheel that grants one wish per rider.",
    "New Releases", 83, { newRelease: true }),

  make("ironclad", "Ironclad", 2023, "R", "2h 21m", ["Action", "War"],
    "An armored battalion holds a single bridge against impossible odds for 72 hours.",
    "Action & Adventure", 90),
  make("riptide", "Riptide", 2024, "PG-13", "1h 49m", ["Action", "Thriller"],
    "A coast guard rescue swimmer becomes the only witness to a smuggling ring's final job.",
    "Action & Adventure", 88),
  make("desert-fox", "Desert Fox", 2023, "TV-14", "Season 2", ["Action", "Drama"],
    "An ex-Legionnaire turned guide leads a convoy across the Sahara with a fortune in cargo.",
    "Action & Adventure", 87),
  make("apex-line", "Apex Line", 2024, "PG-13", "1h 56m", ["Action", "Sport"],
    "Free climbers attempt the first ascent of a sheer face that has killed every team before them.",
    "Action & Adventure", 89),
  make("steel-rain", "Steel Rain", 2022, "R", "2h 08m", ["Action", "Sci-Fi"],
    "Mech pilots in a near-future Seoul defend the city from an unknown orbital threat.",
    "Action & Adventure", 91),
  make("the-runner", "The Runner", 2024, "TV-MA", "Season 1", ["Action", "Thriller"],
    "A cartel courier with a photographic memory becomes the most wanted woman on two continents.",
    "Action & Adventure", 92),

  make("the-quiet-house", "The Quiet House", 2024, "TV-MA", "1h 44m", ["Horror", "Mystery"],
    "A grieving family moves into a Victorian rental that remembers everything that ever happened inside it.",
    "Critically Acclaimed", 93),
  make("nightingale", "Nightingale", 2023, "TV-MA", "Limited Series", ["Drama", "Biography"],
    "The untold story of a wartime nurse who falsified records to save thousands of children.",
    "Critically Acclaimed", 96),
  make("glass-house", "Glass House", 2024, "TV-MA", "Season 1", ["Drama", "Mystery"],
    "An architect's perfect home becomes the stage for the unraveling of her perfect marriage.",
    "Critically Acclaimed", 95),
  make("the-witness", "The Witness", 2023, "R", "2h 11m", ["Drama", "Crime"],
    "A jury foreman is followed home after a verdict that should have been simple.",
    "Critically Acclaimed", 94),
  make("south-of-no-north", "South of No North", 2024, "TV-MA", "Limited Series", ["Drama"],
    "A poet drifts through the American Southwest cataloging lives that nearly happened.",
    "Critically Acclaimed", 92),
  make("the-cartographer", "The Cartographer", 2024, "TV-14", "Documentary", ["Documentary"],
    "The woman who mapped the ocean floor — and was erased from the discovery she made possible.",
    "Critically Acclaimed", 97),
];

export const featured: Title = titles[0];

export const categories = [
  "Trending Now",
  "Top Picks for You",
  "New Releases",
  "Action & Adventure",
  "Critically Acclaimed",
];

export function byCategory(cat: string) {
  return titles.filter((t) => t.category === cat);
}

export function byId(id: string) {
  return titles.find((t) => t.id === id);
}

export function search(q: string) {
  const term = q.trim().toLowerCase();
  if (!term) return [];
  return titles.filter(
    (t) =>
      t.title.toLowerCase().includes(term) ||
      t.genres.some((g) => g.toLowerCase().includes(term)) ||
      t.description.toLowerCase().includes(term),
  );
}
