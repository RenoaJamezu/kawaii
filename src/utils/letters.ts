import type { LoveLetterMeta } from "@/constants/letters.meta";

export function resolveLetter(
  envKey: string,
  unlockAt?: number,
  now = Date.now()
) {
  const isLocked = unlockAt && now < unlockAt;

  if (isLocked) {
    return { isLocked, message: null };
  }

  const message = import.meta.env[envKey];

  return {
    isLocked: false,
    message: message ?? "💔 This message is not available yet.",
  };
}

export function sortLoveLetters(
  letters: LoveLetterMeta[],
  now = Date.now()
) {
  const opened = letters.filter(
    l => !l.unlockAt || l.unlockAt <= now
  );

  const locked = letters.filter(
    l => l.unlockAt && l.unlockAt > now
  );

  // 1️⃣ latest opened
  const latestOpened = opened
    .sort((a, b) => (b.unlockAt ?? 0) - (a.unlockAt ?? 0))[0];

  // remove it from opened list
  const previousOpened = opened
    .filter(l => l !== latestOpened)
    .sort((a, b) => (b.unlockAt ?? 0) - (a.unlockAt ?? 0));

  // 2️⃣ closest upcoming
  const closestLocked = locked
    .sort((a, b) => (a.unlockAt! - b.unlockAt!))[0];

  const remainingLocked = locked
    .filter(l => l !== closestLocked)
    .sort((a, b) => (a.unlockAt! - b.unlockAt!));

  return [
    ...(latestOpened ? [latestOpened] : []),
    ...(closestLocked ? [closestLocked] : []),
    ...remainingLocked,
    ...previousOpened,
  ];
}

export function getTimeLeft(unlockAt: number) {
  const diff = unlockAt - Date.now();
  if (diff <= 0) return null;

  const totalSeconds = Math.floor(diff / 1000);

  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds / (60 * 60)) % 24);
  const minutes = Math.floor((totalSeconds / 60) % 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}