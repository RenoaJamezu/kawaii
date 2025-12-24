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