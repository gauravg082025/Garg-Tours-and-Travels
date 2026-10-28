
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  CircleMarker,
  MapContainer,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Real attraction coordinates: latitude and longitude.
const ATTRACTIONS = [
  {
    id: "hawa-mahal",
    name: "Hawa Mahal",
    city: "Jaipur",
    lat: 26.9239,
    lng: 75.8267,
    category: "Heritage",
    description: "Jaipur's famous Palace of Winds.",
  },
  {
    id: "amber-fort",
    name: "Amber Fort",
    city: "Jaipur",
    lat: 26.9855,
    lng: 75.8513,
    category: "Fort",
    description: "A hilltop fort known for its courtyards and architecture.",
  },
  {
    id: "mehrangarh",
    name: "Mehrangarh Fort",
    city: "Jodhpur",
    lat: 26.2973,
    lng: 73.0188,
    category: "Fort",
    description: "A historic fort overlooking the Blue City.",
  },
  {
    id: "umaid-bhawan",
    name: "Umaid Bhawan Palace",
    city: "Jodhpur",
    lat: 26.2808,
    lng: 73.0477,
    category: "Palace",
    description: "A landmark palace and museum.",
  },
  {
    id: "city-palace",
    name: "City Palace",
    city: "Udaipur",
    lat: 24.5764,
    lng: 73.6835,
    category: "Palace",
    description: "A palace complex overlooking Lake Pichola.",
  },
  {
    id: "lake-pichola",
    name: "Lake Pichola",
    city: "Udaipur",
    lat: 24.5752,
    lng: 73.6776,
    category: "Lake",
    description: "A scenic lake with boat rides and sunset views.",
  },
  {
    id: "jaisalmer-fort",
    name: "Jaisalmer Fort",
    city: "Jaisalmer",
    lat: 26.9124,
    lng: 70.9126,
    category: "Fort",
    description: "The Golden Fort rising above the old city.",
  },
  {
    id: "pushkar-lake",
    name: "Pushkar Lake",
    city: "Pushkar",
    lat: 26.488,
    lng: 74.5511,
    category: "Lake",
    description: "A sacred lake surrounded by ghats.",
  },
  {
    id: "ajmer-dargah",
    name: "Ajmer Sharif Dargah",
    city: "Ajmer",
    lat: 26.4599,
    lng: 74.6281,
    category: "Heritage",
    description: "A well-known Sufi shrine.",
  },
];

const INITIAL_STOPS = [
  "hawa-mahal",
  "mehrangarh",
  "city-palace",
];

function formatDuration(seconds) {
  const totalMinutes = Math.round(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes} min`;
  if (minutes === 0) return `${hours} hr`;
  return `${hours} hr ${minutes} min`;
}

function formatDistance(meters) {
  return `${(meters / 1000).toFixed(1)} km`;
}

// Fit the map around the currently selected stops.
function FitRoute({ stops }) {
  const map = useMap();
  const stopsKey = stops.map((stop) => stop.id).join(",");

  useEffect(() => {
    if (stops.length === 0) return;

    const points = stops.map((stop) => [stop.lat, stop.lng]);

    if (points.length === 1) {
      map.setView(points[0], 9);
    } else {
      map.fitBounds(points, { padding: [36, 36], maxZoom: 8 });
    }
  }, [map, stopsKey]);

  return null;
}

export const Route = createFileRoute("/trip-planner")({
  head: () => ({
    meta: [
      { title: "Trip Planner | Garg Tours & Travels" },
      {
        name: "description",
        content:
          "Build a custom Rajasthan journey with interactive attraction markers, driving routes, distances and travel-time estimates.",
      },
    ],
  }),
  component: TripPlanner,
});

function TripPlanner() {
  const [selectedStops, setSelectedStops] = useState(INITIAL_STOPS);
  const [routeData, setRouteData] = useState(null);
  const [loadingRoute, setLoadingRoute] = useState(false);
  const [routeError, setRouteError] = useState("");

  const stops = useMemo(
    () =>
      selectedStops
        .map((id) => ATTRACTIONS.find((place) => place.id === id))
        .filter(Boolean),
    [selectedStops]
  );

  function toggleStop(id) {
    setSelectedStops((current) => {
      if (current.includes(id)) {
        return current.filter((stopId) => stopId !== id);
      }
      return [...current, id];
    });
  }

  function moveStop(index, direction) {
    setSelectedStops((current) => {
      const next = [...current];
      const target = index + direction;

      if (target < 0 || target >= next.length) return current;

      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  function clearStops() {
    setSelectedStops([]);
    setRouteData(null);
    setRouteError("");
  }

  useEffect(() => {
    if (stops.length < 2) {
      setRouteData(null);
      setLoadingRoute(false);
      setRouteError("");
      return;
    }

    const controller = new AbortController();

    async function fetchRoute() {
      setLoadingRoute(true);
      setRouteError("");
      setRouteData(null);

      try {
        // OSRM expects longitude,latitude for each waypoint.
        const coordinates = stops
          .map((stop) => `${stop.lng},${stop.lat}`)
          .join(";");

        const url =
          `https://router.project-osrm.org/route/v1/driving/${coordinates}` +
          "?overview=full&geometries=geojson&steps=false";

        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("The route service is temporarily unavailable.");
        }

        const result = await response.json();

        if (result.code !== "Ok" || !result.routes?.length) {
          throw new Error("A driving route could not be found.");
        }

        const route = result.routes[0];

        setRouteData({
          // Leaflet expects [latitude, longitude].
          coordinates: route.geometry.coordinates.map(([lng, lat]) => [
            lat,
            lng,
          ]),
          distance: route.distance,
          duration: route.duration,
          legs: route.legs,
        });
      } catch (error) {
        if (error.name !== "AbortError") {
          setRouteError(
            error.message || "Could not load the driving route."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingRoute(false);
        }
      }
    }

    fetchRoute();

    return () => controller.abort();
  }, [stops]);

  const hasRoute = stops.length >= 2 && routeData;

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:py-16">
      <div className="max-w-3xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-brass">
          Your journey, your way
        </p>

        <h1 className="font-display text-4xl leading-tight text-ink sm:text-5xl">
          Build your Rajasthan journey
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-ink/65 sm:text-base">
          Explore famous attractions, add the places you want to visit,
          and create a multi-stop driving route.
        </p>
      </div>

      <div className="mt-9 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        {/* Interactive map */}
        <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/10">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 px-4 py-4 sm:px-5">
            <div>
              <h2 className="font-display text-xl text-ink">
                Explore the map
              </h2>
              <p className="mt-1 text-xs text-ink/60">
                Select any marker to add or remove a stop.
              </p>
            </div>

            <span className="rounded-full bg-sand-deep/60 px-3 py-1.5 text-xs text-ink">
              {stops.length} stops selected
            </span>
          </div>

          <MapContainer
            center={[26.5, 73.5]}
            zoom={6}
            scrollWheelZoom
            className="h-[480px] w-full sm:h-[600px]"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <FitRoute stops={stops} />

            {hasRoute && (
              <Polyline
                positions={routeData.coordinates}
                pathOptions={{
                  color: "#1b3557",
                  weight: 5,
                  opacity: 0.85,
                }}
              />
            )}

            {ATTRACTIONS.map((place) => {
              const isSelected = selectedStops.includes(place.id);

              return (
                <CircleMarker
                  key={place.id}
                  center={[place.lat, place.lng]}
                  radius={isSelected ? 9 : 7}
                  pathOptions={{
                    color: isSelected ? "#1b3557" : "#b88a36",
                    fillColor: isSelected ? "#1b3557" : "#e5bd69",
                    fillOpacity: 0.95,
                    weight: 2,
                  }}
                >
                  <Popup>
                    <div className="min-w-[180px]">
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                        {place.city} · {place.category}
                      </p>
                      <h3 className="mt-1 text-base font-semibold text-gray-900">
                        {place.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        {place.description}
                      </p>
                      <button
                        type="button"
                        onClick={() => toggleStop(place.id)}
                        className="mt-3 rounded-md bg-[#1b3557] px-3 py-2 text-sm font-medium text-white"
                      >
                        {isSelected ? "Remove from trip" : "Add to trip"}
                      </button>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}
          </MapContainer>

          <p className="border-t border-black/10 px-4 py-3 text-xs leading-5 text-ink/55 sm:px-5">
            Map data © OpenStreetMap contributors. Driving routes and
            times are supplied by the public OSRM demo service and may
            be unavailable or change.
          </p>
        </section>

        {/* Trip summary */}
        <aside className="h-fit rounded-2xl bg-sand-deep/35 p-5 ring-1 ring-black/10 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brass">
                Your itinerary
              </p>
              <h2 className="mt-2 font-display text-2xl text-ink">
                Trip summary
              </h2>
            </div>

            <button
              type="button"
              onClick={clearStops}
              className="text-xs font-medium text-ink/60 underline underline-offset-4 hover:text-ink"
            >
              Clear
            </button>
          </div>

          <p className="mt-2 text-sm leading-6 text-ink/65">
            Add places from the map, then use the arrows to change the
            order of your journey.
          </p>

          {stops.length === 0 ? (
            <p className="mt-6 rounded-xl bg-white/70 p-4 text-sm text-ink/65">
              No stops yet. Select an attraction on the map to start
              building your trip.
            </p>
          ) : (
            <ol className="mt-6 space-y-3">
              {stops.map((stop, index) => (
                <li
                  key={stop.id}
                  className="rounded-xl bg-white/80 p-3 ring-1 ring-black/5"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-deep text-xs font-semibold text-sand">
                      {index + 1}
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-ink">{stop.name}</p>
                      <p className="mt-0.5 text-xs text-ink/55">
                        {stop.city} · {stop.category}
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-col gap-1">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => moveStop(index, -1)}
                        aria-label={`Move ${stop.name} earlier`}
                        className="rounded px-2 py-1 text-sm text-ink hover:bg-sand disabled:opacity-25"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        disabled={index === stops.length - 1}
                        onClick={() => moveStop(index, 1)}
                        aria-label={`Move ${stop.name} later`}
                        className="rounded px-2 py-1 text-sm text-ink hover:bg-sand disabled:opacity-25"
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleStop(stop.id)}
                        aria-label={`Remove ${stop.name}`}
                        className="rounded px-2 py-1 text-sm text-red-700 hover:bg-red-50"
                      >
                        ×
                      </button>
                    </div>
                  </div>

                  {routeData?.legs?.[index] && (
                    <p className="ml-10 mt-2 text-xs text-ink/65">
                      Next leg:{" "}
                      {formatDistance(routeData.legs[index].distance)} ·{" "}
                      {formatDuration(routeData.legs[index].duration)}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          )}

          <div className="mt-6 border-t border-black/10 pt-5">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink/55">
              Driving estimate
            </p>

            {loadingRoute && (
              <p className="mt-3 text-sm text-ink/65">
                Calculating your route...
              </p>
            )}

            {routeError && (
              <div className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-800">
                {routeError}
                <p className="mt-1 text-xs">
                  Try again in a moment or remove a stop and add it again.
                </p>
              </div>
            )}

            {!loadingRoute && hasRoute && (
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white p-3">
                  <p className="text-xs text-ink/55">Total distance</p>
                  <p className="mt-1 text-xl font-semibold text-ink">
                    {formatDistance(routeData.distance)}
                  </p>
                </div>
                <div className="rounded-xl bg-white p-3">
                  <p className="text-xs text-ink/55">Driving time</p>
                  <p className="mt-1 text-xl font-semibold text-ink">
                    {formatDuration(routeData.duration)}
                  </p>
                </div>
              </div>
            )}

            {!loadingRoute && stops.length < 2 && (
              <p className="mt-3 text-sm text-ink/65">
                Select at least two stops to calculate road distance and
                driving time.
              </p>
            )}

            <p className="mt-3 text-xs leading-5 text-ink/55">
              Driving estimates exclude sightseeing, breaks, traffic
              delays and time spent at attractions.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              const lines = stops.map(
                (stop, index) => `${index + 1}. ${stop.name} (${stop.city})`
              );

              const summary = [
                "My Garg Tours & Travels trip",
                ...lines,
                "",
                hasRoute
                  ? `Driving distance: ${formatDistance(routeData.distance)}`
                  : "Driving route: not yet calculated",
                hasRoute
                  ? `Estimated driving time: ${formatDuration(routeData.duration)}`
                  : "",
              ]
                .filter(Boolean)
                .join("\n");

              const url = `https://wa.me/?text=${encodeURIComponent(summary)}`;
              window.open(url, "_blank", "noopener,noreferrer");
            }}
            disabled={stops.length === 0}
            className="mt-5 w-full rounded-lg bg-indigo-deep px-4 py-3 text-sm font-semibold text-sand transition hover:bg-indigo-dye disabled:cursor-not-allowed disabled:opacity-40"
          >
            Share trip on WhatsApp
          </button>
        </aside>
      </div>
    </div>
  );
}
