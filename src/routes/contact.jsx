import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Plan Your Rajasthan Trip — Contact Marwari" },
      {
        name: "description",
        content:
          "Tell us the Rajasthan trip you're imagining. We reply within 24 hours with a handcrafted itinerary and quote.",
      },
      { property: "og:title", content: "Plan Your Rajasthan Trip — Garg Tours" },
      {
        property: "og:description",
        content: "Send an enquiry and we'll build your Rajasthan itinerary by hand.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 py-16 md:grid-cols-2">
      <Reveal>
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.2em] text-brass">Enquire</p>
        <h1 className="max-w-[20ch] text-balance text-4xl leading-tight text-ink sm:text-5xl">
          Tell us the trip you're imagining
        </h1>
        <p className="mt-5 max-w-[44ch] text-pretty text-ink/70">
          Dates, pace, the kind of places you like to wake up in — that's enough for us to start. We
          reply within 24 hours.
        </p>
        <dl className="mt-8 space-y-3 text-sm text-ink/70">
          <div>
            <dt className="text-[11px] uppercase tracking-[0.15em] text-brass">Studio</dt>
            <dd>Pratap Nagar, Jaipur, Rajasthan 302033</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-[0.15em] text-brass">Email</dt>
            <dd>gargtours04@gmail.com</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-[0.15em] text-brass">Phone</dt>
            <dd>+91 6350690790</dd>
          </div>
        </dl>
      </Reveal>

      <Reveal delay={140}>
        <form
  onSubmit={async (e) => {
    e.preventDefault();

    setLoading(true);
    setSent(false);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      travelDates: formData.get("travelDates"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch(
  "http://localhost:5000/api/enquiries",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }
);

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Enquiry failed.");
      }

      setSent(true);
      form.reset();
    } catch (err) {
      setError(
        err.message || "Server se connection nahi ho paya."
      );
    } finally {
      setLoading(false);
    }
  }}
  className="space-y-3 rounded-xl bg-sand-deep/40 p-6 ring-1 ring-black/5"
>
          <input
          required
          name="name"
          type="text"
          placeholder="Full name"
          className="w-full rounded-lg bg-sand px-4 py-3 text-sm text-ink ring-1 ring-transparent placeholder:text-ink/40 focus:outline-none focus:ring-brass"
/>
          <input
            required
            name="email"
            type="email"
            placeholder="Email address"
            className="w-full rounded-lg bg-sand px-4 py-3 text-sm text-ink ring-1 ring-transparent placeholder:text-ink/40 focus:outline-none focus:ring-brass"
          />
          <input
          name="travelDates"
          type="text"
          placeholder="Travel dates"
          className="w-full rounded-lg bg-sand px-4 py-3 text-sm text-ink ring-1 ring-transparent placeholder:text-ink/40 focus:outline-none focus:ring-brass"
        />
          <textarea
              name="message"
              rows={4}
              placeholder="Tell us the trip you're imagining"
              className="w-full rounded-lg bg-sand px-4 py-3 text-sm text-ink ring-1 ring-transparent placeholder:text-ink/40 focus:outline-none focus:ring-brass"
            />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-indigo-deep py-3 text-sm font-medium text-sand ring-1 ring-indigo-deep transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send enquiry"}
          </button>
          {sent && (
  <p className="anim-rise text-center text-sm text-teal-deep">
    Thank you — your enquiry has been saved!
  </p>
)}

{error && (
  <p className="text-center text-sm text-red-600">
    {error}
  </p>
)}

{!sent && !error && (
  <p className="text-center text-[11px] text-ink/50">
    No payment now · replies within 24h
  </p>
)}
        </form>
      </Reveal>
    </div>
  );
}
