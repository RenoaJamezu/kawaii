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