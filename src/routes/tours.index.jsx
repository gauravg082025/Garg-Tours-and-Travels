import { Link, createFileRoute } from "@tanstack/react-router";

import { Reveal } from "@/components/reveal";
import { tours } from "@/data/tours";

export const Route = createFileRoute("/tours/")({
  head: () => ({
    meta: [
      { title: "Rajasthan Tour Packages & Prices — Marwari" },
      {
        name: "description",
        content:
          "Browse curated Rajasthan tour packages: Jaipur, Udaipur and Jaisalmer journeys with prices, durations and day-by-day itineraries.",
      },
      { property: "og:title", content: "Rajasthan Tour Packages — Marwari" },
      {
        property: "og:description",
        content: "Curated Rajasthan journeys with prices, durations and full itineraries.",
      },
    ],
  }),
  component: ToursIndex,
});

function ToursIndex() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Reveal>
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-brass">
          All journeys
        </p>
        <h1 className="max-w-[24ch] text-balance text-4xl leading-tight text-ink sm:text-5xl">
          Every route we would travel ourselves
        </h1>
      </Reveal>

      <div className="mt-12 space-y-6">
        {tours.map((tour, i) => (
          <Reveal key={tour.slug} delay={i * 120}>
            <article className="group grid grid-cols-1 overflow-hidden rounded-xl bg-sand-deep/40 ring-1 ring-black/5 transition-shadow duration-500 hover:shadow-[0_28px_50px_-34px_rgba(27,53,87,0.8)] md:grid-cols-[320px_1fr]">
              <div className="overflow-hidden">
                <img
                  src={tour.image}
                  alt={`${tour.city}, Rajasthan`}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-between p-6">
                <div>
                  <div className="mb-3 flex items-center gap-4">
                    <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-brass">
                      {tour.city} · {tour.days} days
                    </span>
                    <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-teal-deep">
                      {tour.rating} · {tour.reviews} reviews
                    </span>
                  </div>
                  <h2 className="font-display text-2xl text-ink">{tour.name}</h2>
                  <p className="mt-2 max-w-[52ch] text-pretty text-sm text-ink/70">{tour.blurb}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {tour.includes.slice(0, 3).map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-brass/30 px-3 py-1 text-[11px] text-ink/70"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-brass/20 pt-4">
                  <div>
                    <span className="block text-[11px] text-ink/50">From</span>
                    <span className="font-display text-2xl text-indigo-deep">{tour.price}</span>
                  </div>
                  <Link
                    to="/tours/$slug"
                    params={{ slug: tour.slug }}
                    className="rounded-lg bg-indigo-deep px-5 py-2.5 text-sm font-medium text-sand transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    View itinerary
                  </Link>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
