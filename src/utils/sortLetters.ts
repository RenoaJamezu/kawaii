import type { LoveLetterMeta } from "@/constants/letters.meta";

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
