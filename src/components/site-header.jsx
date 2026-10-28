import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/tours", label: "Tours" },
  { to: "/destinations", label: "Destinations" },
  { to: "/trip-planner", label: "Trip Planner" },
  { to: "/trip-quiz", label: "Find My Trip" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-all duration-500 ${
        scrolled
          ? "border-brass/25 bg-sand/95 backdrop-blur-md shadow-[0_10px_30px_-24px_rgba(0,0,0,0.6)]"
          : "border-transparent bg-sand/70 backdrop-blur-sm"
      }`}
    >
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => setMenuOpen(false)}
          aria-label="Garg Tours Home"
        >
          <img
            src="/favicon.png"
            alt="Garg Tours Logo"
            className="navbar-logo"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 text-sm font-medium text-ink/80 md:flex">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeProps={{ className: "text-indigo-deep" }}
              className="relative transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-brass after:transition-transform after:duration-300 hover:text-indigo-deep hover:after:origin-left hover:after:scale-x-100"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Reserve Button */}
        <Link
          to="/contact"
          className="hidden rounded-lg bg-indigo-deep px-5 py-2.5 text-sm font-medium text-sand ring-1 ring-indigo-deep transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-dye hover:shadow-[0_14px_30px_-16px_rgba(27,53,87,0.9)] md:inline-flex"
        >
          Reserve
        </Link>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-ink transition-colors hover:bg-sand-deep/20 md:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <nav
          id="mobile-navigation"
          className="absolute left-0 right-0 top-full z-50 border-t border-brass/20 bg-sand/98 p-5 shadow-xl backdrop-blur-md md:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                activeProps={{
                  className: "bg-brass/10 text-indigo-deep",
                }}
                className="rounded-lg px-4 py-3 text-sm font-medium text-ink transition-colors hover:bg-brass/10 hover:text-indigo-deep"
              >
                {link.label}
              </Link>
            ))}

            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-lg bg-indigo-deep px-4 py-3 text-center text-sm font-semibold text-sand transition-colors hover:bg-indigo-dye"
            >
              Reserve Your Trip
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}