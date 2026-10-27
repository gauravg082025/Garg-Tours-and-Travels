import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import { Reveal } from "@/components/reveal";
import { tours } from "@/data/tours";

export const Route = createFileRoute("/tours/$slug")({
  loader: ({ params }) => {
    const tour = tours.find((t) => t.slug === params.slug);
    if (!tour) throw notFound();
    return { tour };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Tour unavailable — Marwari" }, { name: "robots", content: "noindex" }],
      };
    }
    const { tour } = loaderData;
    const title = `${tour.name} — ${tour.days}-day ${tour.city} tour | Marwari`;
    const description = `${tour.blurb} ${tour.days} days from ${tour.price} per person, with private guides and heritage stays.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  notFoundComponent: TourNotFound,
  component: TourDetail,
});

function TourNotFound() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24 text-center">
      <h1 className="font-display text-4xl text-ink">That journey isn't listed</h1>
      <Link to="/tours" className="mt-6 inline-block text-sm text-indigo-deep underline">
        Back to all tours
      </Link>
    </div>
  );
}

function TourDetail() {
  const { tour } = Route.useLoaderData();

  return (
    <>
      <section className="relative h-[420px] overflow-hidden">
        <img
          src={tour.image}
          alt={`${tour.city}, Rajasthan`}
          width={1024}
          height={768}
          className="anim-ken-burns absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-deep/30 to-indigo-deep/85" />
        <div className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-12">
          <p className="anim-rise text-[11px] font-medium uppercase tracking-[0.2em] text-brass-soft">
            {tour.city} · {tour.days} days · {tour.rating} rating
          </p>
          <h1
            className="anim-rise-blur mt-3 max-w-[22ch] text-balance font-display text-4xl leading-none text-sand sm:text-5xl"
            style={{ animationDelay: "0.12s" }}
          >
            {tour.name}
          </h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-16 lg:grid-cols-[1fr_320px]">
        <div>
          <Reveal>
            <p className="max-w-[60ch] text-pretty text-lg text-ink/75">{tour.blurb}</p>
          </Reveal>
          <ol className="relative mt-10 space-y-8 border-l-2 border-brass/30 pl-8">
            {tour.itinerary.map((step, i) => (
              <Reveal as="li" key={step.day} delay={i * 110} className="relative">
                <span className="absolute -left-[41px] top-1 size-4 rounded-full bg-brass ring-4 ring-sand" />
                <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-brass">
                  {step.day}
                </span>
                <h2 className="mt-1 font-display text-lg text-ink">{step.title}</h2>
                <p className="mt-1 text-pretty text-sm text-ink/70">{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={140} className="self-start lg:sticky lg:top-24">
          <aside className="rounded-xl bg-sand p-6 ring-1 ring-black/5">
            <span className="text-[11px] uppercase tracking-[0.15em] text-ink/50">From</span>
            <p className="mt-1 font-display text-4xl text-indigo-deep">{tour.price}</p>
            <p className="mt-1 text-sm text-ink/60">per person · {tour.days} days</p>
            <div className="my-5 h-px bg-brass/20" />
            <ul className="space-y-3 text-sm text-ink/80">
              {tour.includes.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span aria-hidden className="text-brass">
                    ●
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="my-5 h-px bg-brass/20" />
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Full name"
                className="w-full rounded-lg bg-sand-deep/40 px-4 py-3 text-sm text-ink ring-1 ring-transparent placeholder:text-ink/40 focus:outline-none focus:ring-brass"
              />
              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-lg bg-sand-deep/40 px-4 py-3 text-sm text-ink ring-1 ring-transparent placeholder:text-ink/40 focus:outline-none focus:ring-brass"
              />
              <button className="w-full rounded-lg bg-indigo-deep py-3 text-sm font-medium text-sand ring-1 ring-indigo-deep transition-transform duration-300 hover:-translate-y-0.5">
                Request a quote
              </button>
            </form>
            <p className="mt-4 text-center text-[11px] text-ink/50">
              No payment now · replies within 24h
            </p>
          </aside>
        </Reveal>
      </section>
    </>
  );
}
