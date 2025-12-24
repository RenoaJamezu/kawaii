import { NavLink } from "react-router-dom"
import { Button } from "./ui/button"

export default function Navbar() {
  const tabs = [
    {
      to: "/dashboard/love-letter",
      label: "🥰 Love Letter",
    },
    {
      to: "/dashboard/music",
      label: "🎵 Music",
    },
    // {
    //   to: "/dashboard/note",
    //   label: "🗒 Notes",
    // },
    {
      to: "/dashboard/gallery",
      label: "📸 Gallery",
    },
  ]
  return (
    <header className="flex flex-wrap items-center justify-center fade-slide-top">
      {tabs.map(({to, label}) => (
        <NavLink
        key={to}
        to={to}
        >
          {({ isActive }) => (
            <Button
              variant={isActive ? "secondary" : "ghost"}
              className={`rounded-full m-2 ${isActive ? "text-primary" : "text-white"}`}
            >
              <span>{label}</span>
            </Button>
          )}
        </NavLink>
      ))}
    </header>
  )
}