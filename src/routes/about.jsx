import { createFileRoute } from "@tanstack/react-router";

import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Marwari — A Small Rajasthan Travel Studio" },
      {
        name: "description",
        content:
          "Marwari is a small Rajasthan travel studio building every itinerary by hand with local guides, drivers and heritage stay-keepers since 1994.",
      },
      { property: "og:title", content: "About Marwari — Rajasthan Travel Studio" },
      {
        property: "og:description",
        content: "Handmade itineraries, local guides, heritage stays. No bulk seats.",
      },
    ],
  }),
  component: About,
});

const testimonials = [
  {
    quote:
      "It felt less like a tour and more like being handed a journal written by a friend who grew up there.",
    who: "Anaya R. — London · The Pink City & Beyond",
  },
  {
    quote: "The pacing was perfect — quiet mornings, a full evening, never a checklist.",
    who: "Marcus L. — Berlin · Golden Desert Trail",
  },
];

function About() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Reveal>
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-brass">About</p>
        <h1 className="max-w-[22ch] text-balance text-4xl leading-tight text-ink sm:text-5xl">
          A small studio, not a call centre
        </h1>
      </Reveal>

      <Reveal delay={120}>
        <p className="mt-6 max-w-[58ch] text-pretty text-lg text-ink/75">
          We build every itinerary by hand with local guides, drivers and stay-keepers across
          Rajasthan. No bulk seats, no auto-generated plans — just routes we would travel ourselves,
          refined over thirty-one seasons on the road.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-1 gap-12 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <Reveal key={t.who} delay={i * 140}>
            <blockquote className="border-l-2 border-brass pl-6">
              <p className="text-pretty font-display text-2xl leading-snug text-ink">"{t.quote}"</p>
              <footer className="mt-4 text-[13px] text-ink/60">{t.who}</footer>
            </blockquote>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
