import { AudioPlayerContext } from "@/context/AudioPlayerContext";
import { useContext } from "react";

export const useAudioPlayer = () => {
  const ctx = useContext(AudioPlayerContext);
  if (!ctx) throw new Error("useAudioPlayer must be used within AudioPlayerProvider");
  return ctx;
};