import { useRef, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  fadeInAudio,
  formatTime,
  getProgress,
  stopAudio
} from "@/utils/music";
import { MUSIC_TRACKS } from "@/constants/music.index";

export default function Music() {
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});
  const fadeIntervals = useRef<Record<string, number>>({});
  const [duration, setDuration] = useState<Record<string, number>>({});
  const [currentTime, setCurrentTime] = useState<Record<string, number>>({});
  const [hasError, setHasError] = useState(false);

  const safeSetDuration = (id: string, e: React.SyntheticEvent<HTMLAudioElement>) => {
    const audio = e.currentTarget;
    if (!audio) return;
    setDuration((p) => ({ ...p, [id]: audio.duration }));
  };

  const safeSetCurrentTime = (id: string, e: React.SyntheticEvent<HTMLAudioElement>) => {
    const audio = e.currentTarget;
    if (!audio) return;
    setCurrentTime((p) => ({ ...p, [id]: audio.currentTime }));
  };

  const handleValueChange = (value: string | undefined) => {
    try {
      Object.entries(audioRefs.current).forEach(([id, audio]) => {
        if (!audio) return;

        clearInterval(fadeIntervals.current[id]);

        if (id === value) {
          requestAnimationFrame(() => {
            fadeIntervals.current[id] = fadeInAudio(audio) as unknown as number;
          });
        } else {
          stopAudio(audio);
        }
      });
    } catch (err) {
      console.error("Music component error:", err);
      setHasError(true);
    }
  };

  if (hasError)
    return (
      <div className="p-5 text-red-600">
        Failed to load music player.
      </div>
    );

  return (
    // TODO: add search functionality if the music gets populated
    <div className="bg-white rounded-xl w-full h-full p-5 overflow-y-auto fade-slide-top custom-scrollbar">
      <h1 className="font-display text-primary font-bold text-xl mb-3">
        Songs for you to listen
      </h1>

      <Accordion
        type="single"
        collapsible
        className="w-full"
        onValueChange={handleValueChange}
      >
        {MUSIC_TRACKS.map((track) => {
          const d = duration[track.id] ?? 0;
          const t = currentTime[track.id] ?? 0;

          return (
            <AccordionItem key={track.id} value={track.id}>
              <AccordionTrigger>{track.title}</AccordionTrigger>

              <AccordionContent>
                <div
                  className="w-full h-1 bg-muted rounded overflow-hidden relative cursor-pointer mb-2"
                  onClick={(e) => {
                    const audio = audioRefs.current[track.id];
                    if (!audio || d === 0) return;

                    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const newTime = (clickX / rect.width) * d;
                    audio.currentTime = newTime;
                    setCurrentTime((p) => ({ ...p, [track.id]: newTime }));
                  }}
                >
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${getProgress(t, d)}%` }}
                  />
                </div>

                <div className="flex justify-between text-xs text-muted-foreground text-primary">
                  <span>{formatTime(t)}</span>
                  <span>{formatTime(d)}</span>
                </div>

                <audio
                  ref={(el) => {
                    audioRefs.current[track.id] = el ?? null;
                  }}
                  src={track.src}
                  onLoadedMetadata={(e) => safeSetDuration(track.id, e)}
                  onTimeUpdate={(e) => safeSetCurrentTime(track.id, e)}
                />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}