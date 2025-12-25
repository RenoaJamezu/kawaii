import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { formatTime, getProgress } from "@/utils/music";
import { MUSIC_TRACKS } from "@/constants/music.index";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

export default function Music() {
  const {
    currentTrack,
    // isPlaying,
    duration,
    currentTime,
    playTrack,
    // pause,
    // resume,
    seek,
  } = useAudioPlayer();

  const handleValueChange = (value: string | undefined) => {
    const nextTrack = MUSIC_TRACKS.find((t) => t.id === value);
    if (nextTrack) void playTrack(nextTrack);
  };

  return (
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
          const isActive = currentTrack?.id === track.id;
          const d = isActive ? duration : 0;
          const t = isActive ? currentTime : 0;

          return (
            <AccordionItem key={track.id} value={track.id}>
              <AccordionTrigger>{track.title}</AccordionTrigger>

              <AccordionContent>
                <div
                  className="w-full h-1 bg-muted rounded overflow-hidden relative cursor-pointer mb-2"
                  onClick={(e) => {
                    if (!isActive || d === 0) return;
                    const rect = (e.target as HTMLDivElement).getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const newTime = (clickX / rect.width) * d;
                    seek(newTime);
                  }}
                >
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${getProgress(t, d)}%` }}
                  />
                </div>

                <div className="flex justify-between text-xs text-muted-foreground text-primary mb-2">
                  <span>{formatTime(t)}</span>
                  <span>{formatTime(d)}</span>
                </div>

                {/* <div className="flex gap-2 text-sm">
                  <Button
                    className="px-3 py-1 rounded bg-primary text-white"
                    onClick={() => (isActive && isPlaying ? pause() : playTrack(track))}
                  >
                    {isActive && isPlaying ? "Pause" : "Play"}
                  </Button>
                  {isActive && !isPlaying ? (
                    <Button className="px-3 py-1 rounded bg-secondary text-primary" onClick={resume}>
                      Resume
                    </Button>
                  ) : null}
                </div> */}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}