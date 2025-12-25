import { createContext, useEffect, useRef, useState } from "react";
import type { MusicTrack } from "@/constants/music.meta";

type AudioPlayerContextValue = {
  currentTrack?: MusicTrack;
  isPlaying: boolean;
  duration: number;
  currentTime: number;
  playTrack: (track: MusicTrack) => Promise<void>;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  seek: (time: number) => void;
};

const AudioPlayerContext = createContext<AudioPlayerContextValue | null>(null);

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | undefined>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (!audioRef.current) audioRef.current = new Audio();
    const audio = audioRef.current;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMeta = () => setDuration(audio.duration || 0);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMeta);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMeta);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const playTrack = async (track: MusicTrack) => {
    try {
      const audio = audioRef.current ?? new Audio();
      audioRef.current = audio;

      if (currentTrack?.id !== track.id) {
        // eslint-disable-next-line react-hooks/immutability
        audio.src = track.src;
        setCurrentTrack(track);
      }

      await audio.play();
      setIsPlaying(true);
    } catch (err) {
      console.error("Audio play error:", err);
    }
  };

  const pause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  };

  const resume = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      setIsPlaying(true);
    } catch (err) {
      console.error("Audio resume error:", err);
    }
  };

  const stop = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
  };

  const seek = (time: number) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    audio.currentTime = Math.max(0, Math.min(time, duration));
    setCurrentTime(audio.currentTime);
  };

  return (
    <AudioPlayerContext.Provider
      value={{ currentTrack, isPlaying, duration, currentTime, playTrack, pause, resume, stop, seek }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
}

export { AudioPlayerContext }