import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const { login, loading } = useAuth();
  const [code, setCode] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  const [showAgain, setShowAgain] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(code);
    if (success) {
      setShowWelcome(true);
    };
    setShowAgain(true);
  }

  useEffect(() => {
    if (showWelcome) {
      const timer = window.setTimeout(() => navigate("/dashboard/love-letter"), 5000);
      return () => window.clearTimeout(timer);
    } else if (showAgain) {
      const timer = window.setTimeout(() => navigate("/dashboard"), 5000);
      return () => window.clearTimeout(timer);
    }
    return;
  }, [showWelcome, showAgain, navigate]);

  if (showWelcome) {
    return (
      <main className="h-screen bg-linear-to-br from-primary to-primary/85 flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-7xl text-center font-display text-primary-foreground animate-pulse fade-slide-top caret-transparent">
          Hi Love Welcomeee
        </h1>

        <p className="text-xl md:text-4xl text-center font-display text-primary-foreground animate-pulse fade-slide-top caret-transparent mb-2">
          I love youuu
        </p>

        <img
          src="/gifs/peach-and-goma-hugging.gif"
          alt="peach-and-goma-hugging.gif"
          className="w-1/3 md:w-48 fade-slide-top caret-transparent"
        />
      </main>
    )
  }

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
      <footer className="fixed bottom-0 italic opacity-20 text-center mb-3">© 2025 Lenor James Jamero</footer>
    </main>
  )
}