
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { tours } from "@/data/tours";

export const Route = createFileRoute("/trip-quiz")({
  head: () => ({
    meta: [
      { title: "Find Your Perfect Rajasthan Trip | Garg Tours & Travels" },
      {
        name: "description",
        content:
          "Answer a few questions and discover a Rajasthan itinerary that matches your travel style.",
      },
    ],
  }),
  component: TripQuiz,
});

const QUESTIONS = [
  {
    id: "style",
    step: "01",
    title: "What kind of traveller are you?",
    subtitle: "Choose the experience you would love most.",
    options: [
      {
        value: "adventure",
        title: "Adventure seeker",
        description: "Desert safaris, exploring and memorable activities.",
        icon: "✦",
      },
      {
        value: "heritage",
        title: "History & heritage",
        description: "Forts, palaces, architecture and old-city stories.",
        icon: "⌂",
      },
      {
        value: "relaxation",
        title: "Slow & relaxing",
        description: "Beautiful views, peaceful stays and leisurely days.",
        icon: "☼",
      },
      {
        value: "culture",
        title: "Culture & local life",
        description: "Local food, markets, crafts and traditions.",
        icon: "✺",
      },
    ],
  },
  {
    id: "scenery",
    step: "02",
    title: "Which scenery calls to you?",
    subtitle: "Pick the landscape you would most like to explore.",
    options: [
      {
        value: "desert",
        title: "Golden deserts",
        description: "Sand dunes, camel rides and starry nights.",
        icon: "☀",
      },
      {
        value: "lakes",
        title: "Lakes & palaces",
        description: "Waterfront views, boat rides and romantic evenings.",
        icon: "≈",
      },
      {
        value: "forts",
        title: "Forts & royal cities",
        description: "Grand architecture and royal Rajasthan.",
        icon: "♜",
      },
      {
        value: "mixed",
        title: "A little of everything",
        description: "A varied trip across different Rajasthan landscapes.",
        icon: "✧",
      },
    ],
  },
  {
    id: "pace",
    step: "03",
    title: "What is your ideal travel pace?",
    subtitle: "There is no wrong answer.",
    options: [
      {
        value: "relaxed",
        title: "Relaxed",
        description: "Fewer stops, more time to enjoy each place.",
        icon: "☕",
      },
      {
        value: "balanced",
        title: "A balanced mix",
        description: "A few highlights with time to unwind.",
        icon: "◷",
      },
      {
        value: "packed",
        title: "Packed with experiences",
        description: "More attractions and as much exploring as possible.",
        icon: "➜",
      },
    ],
  },
  {
    id: "duration",
    step: "04",
    title: "How long is your getaway?",
    subtitle: "We will use this to suggest a suitable itinerary.",
    options: [
      {
        value: "short",
        title: "1–3 days",
        description: "A quick escape to one destination.",
        icon: "1",
      },
      {
        value: "medium",
        title: "4–5 days",
        description: "Time for a deeper city experience.",
        icon: "2",
      },
      {
        value: "long",
        title: "6+ days",
        description: "A longer journey through multiple destinations.",
        icon: "3",
      },
    ],
  },
];

const DESTINATIONS = {
  Jaipur: {
    description: "Palaces, bustling bazaars and spectacular forts.",
    tags: ["heritage", "forts", "culture", "mixed"],
  },
  Udaipur: {
    description: "Lakeside views, royal architecture and relaxed evenings.",
    tags: ["relaxation", "lakes", "heritage", "mixed"],
  },
  Jaisalmer: {
    description: "Golden sandstone lanes, desert dunes and camel safaris.",
    tags: ["adventure", "desert", "culture", "mixed"],
  },
  Jodhpur: {
    description: "Blue-painted streets, magnificent forts and local markets.",
    tags: ["heritage", "forts", "culture", "mixed"],
  },
};

function getRecommendations(answers) {
  const style = answers.style;
  const scenery = answers.scenery;

  const scores = {
    Jaipur: 0,
    Udaipur: 0,
    Jaisalmer: 0,
    Jodhpur: 0,
  };

  Object.entries(DESTINATIONS).forEach(([city, destination]) => {
    if (destination.tags.includes(style)) scores[city] += 3;
    if (destination.tags.includes(scenery)) scores[city] += 4;
  });

  if (answers.pace === "relaxed") scores.Udaipur += 2;
  if (answers.pace === "packed") {
    scores.Jaipur += 1;
    scores.Jodhpur += 1;
  }

  const orderedCities = Object.keys(scores).sort(
    (a, b) => scores[b] - scores[a]
  );

  let matchedTours = tours
    .map((tour) => {
      let score = scores[tour.city] || 0;

      if (
        answers.duration === "short" &&
        tour.days <= 5
      ) score += 2;

      if (
        answers.duration === "medium" &&
        tour.days >= 4 &&
        tour.days <= 5
      ) score += 3;

      if (
        answers.duration === "long" &&
        tour.days >= 6
      ) score += 3;

      if (answers.style === "adventure" && tour.city === "Jaisalmer") {
        score += 3;
      }

      if (answers.style === "relaxation" && tour.city === "Udaipur") {
        score += 3;
      }

      return { ...tour, matchScore: score };
    })
    .sort((a, b) => b.matchScore - a.matchScore);

  return {
    cities: orderedCities.slice(0, 3),
    tours: matchedTours.slice(0, 2),
  };
}

function TripQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    style: "",
    scenery: "",
    pace: "",
    duration: "",
  });
  const [showResults, setShowResults] = useState(false);

  const results = useMemo(
    () => getRecommendations(answers),
    [answers]
  );

  const question = QUESTIONS[step];
  const selectedAnswer = answers[question.id];
  const progress = showResults ? 100 : ((step + 1) / QUESTIONS.length) * 100;

  function selectAnswer(value) {
    setAnswers((current) => ({
      ...current,
      [question.id]: value,
    }));
  }

  function nextQuestion() {
    if (!selectedAnswer) return;

    if (step === QUESTIONS.length - 1) {
      setShowResults(true);
    } else {
      setStep((current) => current + 1);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function previousQuestion() {
    if (showResults) {
      setShowResults(false);
    } else {
      setStep((current) => Math.max(0, current - 1));
    }
  }

  function restartQuiz() {
    setAnswers({
      style: "",
      scenery: "",
      pace: "",
      duration: "",
    });
    setStep(0);
    setShowResults(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-brass">
          Your journey starts here
        </p>

        <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
          Find your kind of Rajasthan
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-ink/65 sm:text-base">
          Answer four quick questions. We will suggest destinations
          and tour packages that fit your travel personality.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-3xl">
        <div className="mb-3 flex justify-between text-xs text-ink/55">
          <span>{showResults ? "Your recommendations" : `Question ${step + 1} of ${QUESTIONS.length}`}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-sand-deep">
          <div
            className="h-full rounded-full bg-brass transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {!showResults ? (
        <section className="mx-auto mt-9 max-w-3xl rounded-2xl bg-sand-deep/30 p-5 ring-1 ring-black/5 sm:p-9">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-brass">
            {question.step} / 04
          </p>

          <h2 className="mt-3 font-display text-2xl text-ink sm:text-3xl">
            {question.title}
          </h2>

          <p className="mt-2 text-sm text-ink/60">
            {question.subtitle}
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {question.options.map((option) => {
              const selected = selectedAnswer === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => selectAnswer(option.value)}
                  aria-pressed={selected}
                  className={`rounded-xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm ${
                    selected
                      ? "border-indigo-deep bg-white ring-1 ring-indigo-deep"
                      : "border-black/10 bg-white/65 hover:border-brass/60"
                  }`}
                >
                  <span className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sand-deep text-xl text-indigo-deep">
                      {option.icon}
                    </span>

                    <span className="flex-1">
                      <span className="block font-medium text-ink">
                        {option.title}
                      </span>
                      <span className="mt-1 block text-xs leading-5 text-ink/60">
                        {option.description}
                      </span>
                    </span>

                    <span
                      className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                        selected
                          ? "border-indigo-deep bg-indigo-deep text-white"
                          : "border-black/25"
                      }`}
                    >
                      {selected ? "✓" : ""}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-between gap-3 border-t border-black/10 pt-5">
            <button
              type="button"
              onClick={previousQuestion}
              disabled={step === 0}
              className="rounded-lg px-4 py-3 text-sm text-ink/70 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              ← Back
            </button>

            <button
              type="button"
              onClick={nextQuestion}
              disabled={!selectedAnswer}
              className="rounded-lg bg-indigo-deep px-6 py-3 text-sm font-medium text-sand transition hover:bg-indigo-dye disabled:cursor-not-allowed disabled:opacity-40"
            >
              {step === QUESTIONS.length - 1
                ? "Find my trip"
                : "Next question →"}
            </button>
          </div>
        </section>
      ) : (
        <section className="mt-9">
          <div className="rounded-2xl bg-indigo-deep p-6 text-sand sm:p-9">
            <p className="text-xs uppercase tracking-[0.2em] text-brass">
              Made for your travel style
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">
              Your Rajasthan shortlist
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-sand/75">
              Based on your preferences, start with these destinations.
              You can explore the available packages below.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {results.cities.map((city) => (
                <span
                  key={city}
                  className="rounded-full border border-sand/25 px-4 py-2 text-sm"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-brass">
                  Recommended packages
                </p>
                <h3 className="mt-2 font-display text-2xl text-ink">
                  Journeys to consider
                </h3>
              </div>
              <button
                type="button"
                onClick={restartQuiz}
                className="text-sm text-indigo-deep underline underline-offset-4"
              >
                Retake quiz
              </button>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              {results.tours.map((tour) => (
                <article
                  key={tour.slug}
                  className="overflow-hidden rounded-xl bg-white ring-1 ring-black/10"
                >
                  <img
                    src={tour.image}
                    alt={tour.name}
                    loading="lazy"
                    className="aspect-[16/9] w-full object-cover"
                  />

                  <div className="p-5">
                    <p className="text-xs uppercase tracking-[0.14em] text-brass">
                      {tour.city} · {tour.days} days
                    </p>
                    <h4 className="mt-2 font-display text-2xl text-ink">
                      {tour.name}
                    </h4>
                    <p className="mt-2 text-sm leading-6 text-ink/65">
                      {tour.blurb}
                    </p>

                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-black/10 pt-4">
                      <div>
                        <p className="text-xs text-ink/55">Listed package price</p>
                        <p className="mt-1 font-display text-xl text-indigo-deep">
                          {tour.price}
                        </p>
                      </div>

                      <Link
                        to="/tours/$slug"
                        params={{ slug: tour.slug }}
                        className="rounded-lg bg-indigo-deep px-4 py-2.5 text-sm font-medium text-sand transition hover:bg-indigo-dye"
                      >
                        View package
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-sand-deep/35 p-6 text-center">
            <h3 className="font-display text-2xl text-ink">
              Want a more personal itinerary?
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-ink/65">
              Tell us your travel dates and group size, and our team can
              help you shape your journey.
            </p>
            <Link
              to="/contact"
              className="mt-5 inline-flex rounded-lg bg-indigo-deep px-6 py-3 text-sm font-medium text-sand transition hover:bg-indigo-dye"
            >
              Plan with our team
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
