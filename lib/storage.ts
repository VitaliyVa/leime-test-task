import memesJson from "@/utils/memes.json";

const STORAGE_KEY = "memes";

export function loadMemes(): Meme[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(memesJson));
  return memesJson;
}

export function saveMemes(memes: Meme[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memes));
}

export interface Meme {
  id: number;
  title: string;
  image: string;
  likes: number;
}
