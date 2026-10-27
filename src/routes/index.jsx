import { Link, createFileRoute } from "@tanstack/react-router";

import heroImg from "@/assets/hero-jaisalmer.jpg";
import { Reveal } from "@/components/reveal";
import { destinations, tours } from "@/data/tours";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Marwari — Handcrafted Rajasthan Tours & Travel Booking" },
      {
        name: "description",
        content:
          "Book handcrafted Rajasthan journeys: Jaipur, Udaipur, Jaisalmer and the Thar desert. Private guides, heritage stays and day-by-day itineraries.",
      },
      { property: "og:title", content: "Marwari — Handcrafted Rajasthan Tours" },
      {
        property: "og:description",
        content:
          "Forts, lakes and desert dunes. Curated Rajasthan itineraries with private drivers, heritage stays and local guides.",
      },
    ],
  }),
  component: Home,
});

const trust = [
  { value: "31", label: "Years guiding" },
  { value: "4.9", label: "Guest rating" },
  { value: "12k", label: "Journeys led" },
  { value: "100%", label: "On the road" },
];

const marquee = [
  "Amber Fort",
  "Lake Pichola",
  "Thar Desert",
  "Mehrangarh",
  "Block-print ateliers",
  "Pushkar Fair",
  "Ranthambore",
];

function Home() {
  const featured = tours[0];

  return (
    <>
      {/* Entrance veil */}
      <div className="anim-veil pointer-events-none fixed inset-0 z-50 bg-indigo-deep" aria-hidden />

      {/* HERO */}
      <section className="relative">
        <div className="relative h-[600px] overflow-hidden">
          <img
            src={heroImg}
            
            alt="The golden fort of Jaisalmer glowing at sunset above the desert city"
            width={1920}
            height={1088}
            className="anim-ken-burns absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-deep/30 to-indigo-deep/80" />

          <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-between px-6 pb-12 pt-16">
            <p
              className="anim-rise text-[11px] font-medium uppercase tracking-[0.22em] text-white"
              style={{ animationDelay: "1.15s" }}
            >
              Handcrafted itineraries · Since 1994
            </p>
            <div>
              <span
                className="anim-line mb-6 block h-px w-40 bg-brass-soft/70"
                style={{ animationDelay: "1.25s" }}
              />
              <h1 className="max-w-[20ch] text-balance font-display text-5xl leading-none text-sand sm:text-6xl">
                <span className="anim-rise-blur block" style={{ animationDelay: "1.3s" }}>
                  The desert, the palace,
                </span>
                <span className="anim-rise-blur block" style={{ animationDelay: "1.45s" }}>
                  and the sea of stars
                </span>
              </h1>
              <p
                className="anim-rise mt-5 max-w-[44ch] text-pretty text-base text-sand/80 sm:text-lg"
                style={{ animationDelay: "1.65s" }}
              >
                Ten days of forts, fairs and hand-block-printed mornings, tailored to your pace.
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* MARQUEE */}
      <div className="mt-14 overflow-hidden border-y border-brass/20 py-4">
        <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
          {[...marquee, ...marquee].map((item, i) => (
            <span
              key={i}
              className="text-[11px] uppercase tracking-[0.25em] text-ink/45"
            >
              {item} <span className="text-brass">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* TOURS */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <Reveal>
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-brass">
              Curated escapes
            </p>
            <h2 className="max-w-[40ch] text-balance text-3xl leading-tight text-ink sm:text-4xl">
              Signature Rajasthan journeys
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <Link to="/tours" className="hidden text-sm text-ink/60 hover:text-indigo-deep sm:inline">
              View all tours &rarr;
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {tours.map((tour, i) => (
            <Reveal key={tour.slug} delay={i * 130}>
              <article className="group overflow-hidden rounded-xl bg-sand-deep/40 ring-1 ring-black/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-32px_rgba(27,53,87,0.8)]">
                <div className="overflow-hidden">
                  <img
                    src={tour.image}
                    alt={`${tour.city}, Rajasthan`}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-brass">
                      {tour.days} days
                    </span>
                    <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-teal-deep">
                      {tour.rating} · {tour.reviews}
                    </span>
                  </div>
                  <h3 className="mb-2 font-display text-xl text-ink">{tour.name}</h3>
                  <p className="mb-4 text-pretty text-sm text-ink/70">{tour.blurb}</p>
                  <div className="flex items-center justify-between border-t border-brass/20 pt-4">
                    <div>
                      <span className="block text-[11px] text-ink/50">From</span>
                      <span className="font-display text-2xl text-indigo-deep">{tour.price}</span>
                    </div>
                    <Link
                      to="/tours/$slug"
                      params={{ slug: tour.slug }}
                      className="rounded-lg bg-indigo-deep/5 px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-indigo-deep hover:text-sand"
                    >
                      Explore
                    </Link>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* DESTINATIONS MOSAIC */}
      <section className="border-y border-brass/20 bg-sand-deep/30">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Reveal>
            <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-brass">Where</p>
            <h2 className="mb-8 text-balance text-3xl leading-tight text-ink sm:text-4xl">
              Five cities, one thread
            </h2>
          </Reveal>
          <div className="grid auto-rows-[160px] grid-cols-2 gap-3 md:auto-rows-[190px] md:grid-cols-4">
            {destinations.map((d, i) => (
              <Reveal
                key={d.name}
                delay={i * 110}
                className={
                    i === 0
                      ? "col-span-2 row-span-2"
                      : i === 3 || i === 4
                        ? "col-span-2"
                        : ""
                  }
              >
                <Link
                  to="/destinations"
                  className="group relative block h-full w-full overflow-hidden rounded-xl ring-1 ring-black/5"
                >
                  <img
                    src={d.image}
                    alt={`${d.name}, Rajasthan`}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-indigo-deep/85 via-indigo-deep/10 to-transparent" />
                  <span className="absolute inset-x-4 bottom-4">
                    <span className="block font-display text-xl text-sand">{d.name}</span>
                    <span className="block translate-y-1 text-[11px] text-sand/0 transition-all duration-500 group-hover:translate-y-0 group-hover:text-sand/80">
                      {d.note}
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ITINERARY PREVIEW */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-[1fr_320px]">
        <div>
          <Reveal>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-brass">
              {featured.name} · {featured.days} days
            </p>
            <h2 className="max-w-[40ch] text-balance text-3xl leading-tight text-ink sm:text-4xl">
              Jaipur to Jaisalmer, day by day
            </h2>
          </Reveal>

          <ol className="relative mt-8 space-y-8 border-l-2 border-brass/30 pl-8">
            {featured.itinerary.map((step, i) => (
              <Reveal as="li" key={step.day} delay={i * 120} className="relative">
                <span className="absolute -left-[41px] top-1 size-4 rounded-full bg-brass ring-4 ring-sand" />
                <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-brass">
                  {step.day}
                </span>
                <h3 className="mt-1 font-display text-lg text-ink">{step.title}</h3>
                <p className="mt-1 text-pretty text-sm text-ink/70">{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={150} className="self-start lg:sticky lg:top-24">
          <aside className="rounded-xl bg-sand p-6 ring-1 ring-black/5">
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] uppercase tracking-[0.15em] text-ink/50">From</span>
              <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-teal-deep">
                per person
              </span>
            </div>
            <p className="mt-1 font-display text-4xl text-indigo-deep">{featured.price}</p>
            <p className="mt-1 text-sm text-ink/60">
              Group of two · {featured.days} days · heritage stays
            </p>
            <div className="my-5 h-px bg-brass/20" />
            <ul className="space-y-3 text-sm text-ink/80">
              {featured.includes.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span aria-hidden className="text-brass">
                    ●
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="my-5 h-px bg-brass/20" />
            <Link
              to="/tours/$slug"
              params={{ slug: featured.slug }}
              className="block w-full rounded-lg bg-indigo-deep py-3 text-center text-sm font-medium text-sand ring-1 ring-indigo-deep transition-transform duration-300 hover:-translate-y-0.5"
            >
              View this journey
            </Link>
            <p className="mt-4 text-center text-[11px] text-ink/50">
              No payment now · replies within 24h
            </p>
          </aside>
        </Reveal>
      </section>

      {/* TRUST */}
      <section className="border-t border-brass/20">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-14 text-center md:grid-cols-4">
          {trust.map((t, i) => (
            <Reveal key={t.label} delay={i * 100} className="py-4">
              <p className="font-display text-3xl text-indigo-deep">{t.value}</p>
              <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-ink/60">{t.label}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
