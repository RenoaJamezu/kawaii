import type { LoveLetterMeta } from "./letters.meta";

export const LETTERS_2025: LoveLetterMeta[] = [
  {
    id: "2025-12-26",
    title: "Short Message",
    date: "Dec 26, 2025",
    envKey: "VITE_LETTER_2025_12_26",
    gif: "/gifs/cat.gif",
  },
  {
    id: "2025-12-28",
    title: "Last monthsary in 2025",
    date: "Dec 28, 2025",
    unlockAt: new Date("2025-12-28T00:00:00").getTime(),
    envKey: "VITE_LETTER_2025_12_28",
    gif: "/gifs/peachy-celebrate.gif",
  },
  {
    id: "2025-12-31",
    title: "New Year's Message",
    date: "Dec 31, 2025",
    unlockAt: new Date("2025-12-31T23:59:59").getTime(),
    envKey: "VITE_LETTER_2025_12_31",
    gif: "/gifs/jumping-peach.gif",
  },
];