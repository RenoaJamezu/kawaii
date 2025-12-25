export const formatTime = (seconds?: number) => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

export const getProgress = (current: number, duration: number) =>
  duration ? (current / duration) * 100 : 0;

export const fadeInAudio = async (
  audio: HTMLAudioElement,
  step = 0.05,
  interval = 100
) => {
  audio.volume = 0;
  try {
    await audio.play();
  } catch (err: unknown) {
    if (err instanceof Error && err.name !== "AbortError") console.error(err);
    return;
  }
  const id = window.setInterval(() => {
    if (audio.volume < 1) audio.volume = Math.min(audio.volume + step, 1);
    else clearInterval(id);
  }, interval);
  return id;
};

export const stopAudio = (audio: HTMLAudioElement) => {
  audio.pause();
  audio.currentTime = 0;
  audio.volume = 1;
};