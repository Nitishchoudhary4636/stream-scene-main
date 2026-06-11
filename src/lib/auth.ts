// Frontend-only auth using localStorage (users db) + sessionStorage (active session)

export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // demo only — never do this in production
  createdAt: string;
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
}

const USERS_KEY = "streamora.users";
const SESSION_KEY = "streamora.session";
const MYLIST_PREFIX = "streamora.mylist.";

function getUsers(): User[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function signUp(name: string, email: string, password: string): SessionUser {
  const users = getUsers();
  const normalized = email.trim().toLowerCase();
  if (users.find((u) => u.email === normalized)) {
    throw new Error("An account with this email already exists.");
  }
  if (password.length < 6) throw new Error("Password must be at least 6 characters.");
  const user: User = {
    id: crypto.randomUUID(),
    name: name.trim() || normalized.split("@")[0],
    email: normalized,
    password,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  saveUsers(users);
  const session: SessionUser = { id: user.id, name: user.name, email: user.email };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function login(email: string, password: string): SessionUser {
  const users = getUsers();
  const normalized = email.trim().toLowerCase();
  const user = users.find((u) => u.email === normalized && u.password === password);
  if (!user) throw new Error("Invalid email or password.");
  const session: SessionUser = { id: user.id, name: user.name, email: user.email };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function logout() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function getSession(): SessionUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// My List per user
export function getMyList(userId: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(MYLIST_PREFIX + userId) || "[]");
  } catch {
    return [];
  }
}

export function toggleMyList(userId: string, titleId: string): string[] {
  const list = getMyList(userId);
  const next = list.includes(titleId) ? list.filter((id) => id !== titleId) : [...list, titleId];
  localStorage.setItem(MYLIST_PREFIX + userId, JSON.stringify(next));
  return next;
}
