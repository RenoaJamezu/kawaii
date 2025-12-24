import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const { login, loading } = useAuth();
  const [code, setCode] = useState("");
  const [showAgain, setShowAgain] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(code);
    if (!success) {
      setShowAgain(true);
    }
    navigate("/dashboard");
  }

  useEffect(() => {
    if (showAgain) {
      const againTimer = window.setTimeout(() => navigate("/dashboard"), 4000);
      return () => window.clearTimeout(againTimer);
    }
  }, [showAgain, navigate]);

  if (showAgain) {
    return (
      <main className="h-screen bg-linear-to-br from-primary to-primary/85 flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-7xl text-center font-display text-primary-foreground animate-pulse fade-slide-top caret-transparent">
          Wrong code loveeee
        </h1>

        <p className="text-xl md:text-4xl text-center font-display text-primary-foreground animate-pulse fade-slide-top caret-transparent mb-2">
          try againnnn
        </p>

        <img
          src="/gifs/rawr.gif"
          alt="rawr.gif"
          className="w-1/3 md:w-48 fade-slide-top caret-transparent"
        />
      </main>
    )
  }

  return (
    <main className="h-screen bg-linear-to-br from-primary to-primary/85 flex flex-col items-center justify-center px-5">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-10 flex flex-col items-center shadow gap-4"
      >
        <img
          src="/gifs/cat-in-peach-box.gif"
          alt="cat-in-peach-box.gif"
          className="w-1/2 fade-slide-top caret-transparent mb-2"
        />
        <h1 className="text-primary text-3xl md:text-5xl font-display font-bold caret-transparent">
          Enter our secret code
        </h1>

        <Input
          type="password"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="text-center focus-visible:border-none focus-visible:ring-primary"
        />

        <Button
          type="submit"
          disabled={loading}
          className="md:text-lg"
        >
          {loading ? "Checking..." : "Enter"}
        </Button>
      </form>
    </main>
  )
}