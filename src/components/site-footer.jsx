import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-indigo-deep text-sand">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-12 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <span className="font-display text-2xl tracking-tight">Garg Tours</span>
          <span className="border border-brass-soft/40 px-2 py-1 text-[10px] uppercase tracking-[0.15em] text-brass-soft">
            Rajasthan Tours
          </span>
        </div>
        <p className="max-w-[40ch] text-pretty text-sm text-sand/70">
          Handmade itineraries from the hills of Jaipur to the dunes of the Thar. Since 1994.
        </p>
        <Link
          to="/contact"
          className="rounded-lg bg-brass px-6 py-3 text-sm font-medium text-indigo-deep ring-1 ring-brass transition-transform duration-300 hover:-translate-y-0.5"
        >
          Enquire now
        </Link>
      </div>
    </footer>
  );
}
