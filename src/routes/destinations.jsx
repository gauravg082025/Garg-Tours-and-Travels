import { Link, createFileRoute } from "@tanstack/react-router";

import { Reveal } from "@/components/reveal";
import { destinations } from "@/data/tours";

export const Route = createFileRoute("/destinations")({
  head: () => ({
    meta: [
      { title: "Rajasthan Destinations — Jaipur, Udaipur, Jaisalmer | Marwari" },
      {
        name: "description",
        content:
          "Explore Rajasthan destination by destination: the pink city of Jaipur, the lakes of Udaipur, the golden dunes of Jaisalmer, Jodhpur and Pushkar.",
      },
      { property: "og:title", content: "Rajasthan Destinations — Marwari" },
      {
        property: "og:description",
        content: "Jaipur, Udaipur, Jaisalmer, Jodhpur and Pushkar, city by city.",
      },
    ],
  }),
  component: Destinations,
});

function Destinations() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Reveal>
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-brass">Where</p>
        <h1 className="max-w-[24ch] text-balance text-4xl leading-tight text-ink sm:text-5xl">
          The land of kings, city by city
        </h1>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {destinations.map((d, i) => (
          <Reveal key={d.name} delay={i * 110}>
            <article className="group overflow-hidden rounded-xl ring-1 ring-black/5">
              <div className="relative overflow-hidden">
                <img
                  src={d.image}
                  alt={`${d.name}, Rajasthan`}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className="aspect-[16/10] w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-indigo-deep/80 to-transparent" />
                <span className="absolute inset-x-5 bottom-5">
                  <span className="block font-display text-2xl text-sand">{d.name}</span>
                  <span className="block text-[11px] text-sand/75">{d.note}</span>
                </span>
              </div>
              <div className="flex items-center justify-between bg-sand-deep/40 p-5">
                <span className="text-sm text-ink/70">Tours available year-round</span>
                <Link
                  to="/tours"
                  className="text-sm font-medium text-indigo-deep transition-transform duration-300 group-hover:translate-x-1"
                >
                  See journeys &rarr;
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
