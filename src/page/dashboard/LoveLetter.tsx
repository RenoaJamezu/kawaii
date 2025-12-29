import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import {
  getTimeLeft,
  resolveLetter,
  sortLoveLetters
} from "@/utils/letters";
import { LOVE_LETTERS } from "@/constants/letters.index";
import { useNow } from "@/hooks/useNow";

export default function LoveLetter() {
  const now = useNow();
  const sortedLetters = sortLoveLetters(LOVE_LETTERS, now);

  return (
    // TODO: add search functionality based on title
    <div className="bg-white rounded-xl w-full h-full p-5 overflow-y-auto fade-slide-top custom-scrollbar">
      <h1 className="font-display text-primary font-bold text-xl mb-3">Latest</h1>

      <Accordion type="single" collapsible>
        {sortedLetters.map((letter) => {
          const { isLocked, message } = resolveLetter(
            letter.envKey,
            letter.unlockAt,
            now
          );

          const timeLeft = letter.unlockAt
            ? getTimeLeft(letter.unlockAt)
            : null;

          return (
            <AccordionItem key={letter.id} value={letter.id}>
              <AccordionTrigger>
                <span>
                  {letter.title}
                  {isLocked && <span className="ml-2">🔒</span>}
                </span>
              </AccordionTrigger>

              <AccordionContent>
                {isLocked ? (
                  <>
                    <p className="italic opacity-60 text-center mb-3">
                      This message will unlock soon 💌
                    </p>

                    {timeLeft && (
                      <div className="flex justify-center gap-3 font-mono text-lg">
                        {timeLeft.days > 0 && (
                          <div className="text-center">
                            <div className="font-bold">
                              {String(timeLeft.days).padStart(2, "0")}
                            </div>
                            <div className="text-xs opacity-70">days</div>
                          </div>
                        )}

                        <div className="text-center">
                          <div className="font-bold">
                            {String(timeLeft.hours).padStart(2, "0")}
                          </div>
                          <div className="text-xs opacity-70">hrs</div>
                        </div>

                        <div className="text-center">
                          <div className="font-bold">
                            {String(timeLeft.minutes).padStart(2, "0")}
                          </div>
                          <div className="text-xs opacity-70">min</div>
                        </div>

                        <div className="text-center">
                          <div className="font-bold">
                            {String(timeLeft.seconds).padStart(2, "0")}
                          </div>
                          <div className="text-xs opacity-70">sec</div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <img
                      src={letter.gif}
                      alt=""
                      className="w-24 fade-slide-top caret-transparent mt-2 mx-auto"
                    />
                    <p className="mb-5 whitespace-pre-line font-mono">
                      {message}
                    </p>
                    <p className="text-right text-sm opacity-70">
                      {letter.date}
                    </p>
                  </>
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  )
}