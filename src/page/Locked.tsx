import Countdown from "@/components/Countdown";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Locked() {
  const navigate = useNavigate();
  const UNLOCK_DATE = new Date("2025-12-27T00:00:00");
  const unlockAt = UNLOCK_DATE.getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      if (Date.now() >= unlockAt) {
        navigate("/dashboard");
      }
    }, 1000)

    return () => clearInterval(timer);
  }, [unlockAt, navigate])

  return (
    <main className="h-screen bg-linear-to-br from-primary to-primary/85
      flex flex-col items-center justify-center gap-6 text-primary-foreground">

      <h1 className="text-5xl font-display animate-pulse">
        Not yet love
      </h1>

      <p className="text-xl opacity-90">
        Countdown until our special day
      </p>

      <Countdown unlockAt={unlockAt} />
    </main>
  )
}