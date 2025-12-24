import { useEffect, useState } from "react";

function getTimeLeft(unlockAt: number) {
  const diff = unlockAt - Date.now();
  if (diff <= 0) return null;

  return {
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown({ unlockAt }: { unlockAt: number }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(unlockAt));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(unlockAt));
    }, 1000)

    return () => clearInterval(timer);
  }, [unlockAt])

  if (!timeLeft) return <p className="text-3xl font-diplay">It’s time.</p>;

  return (
    <div className="flex gap-4 text-2xl font-display fade-slide-top">
      {Object.entries(timeLeft).map(([k, v]) => (
        <div key={k} className="bg-white/20 px-4 py-2 rounded-lg text-center">
          <div className="text-4xl font-bold">{String(v).padStart(2, "0")}</div>
          <div className="text-sm">{k}</div>
        </div>
      ))}
    </div>
  )
}