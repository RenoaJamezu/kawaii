import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <main className="h-screen bg-linear-to-br from-primary to-primary/85 flex flex-col items-center justify-center">
      <Navbar />
      <div className="mt-5 px-5 md:px-60 min-w-screen h-full max-h-1/3 md:max-h-1/2">
        <Outlet />
      </div>
      <footer className="fixed bottom-0 italic opacity-20 text-center mb-3">© 2025 Lenor James Jamero</footer>
    </main>
  )
}