
import { useEffect, useRef } from "react";

export function AirplaneCursor() {
  const planeRef = useRef(null);

  useEffect(() => {
    const plane = planeRef.current;
    if (!plane) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    let previousX = 0;
    let previousY = 0;
    let hasPreviousPosition = false;

    // Move the airplane with the mouse on desktop.
    const handleMouseMove = (event) => {
      const { clientX: x, clientY: y } = event;

      if (hasPreviousPosition) {
        const dx = x - previousX;
        const dy = y - previousY;

        if (Math.hypot(dx, dy) > 1) {
          const angle =
            Math.atan2(dy, dx) * (180 / Math.PI) - 45;

          plane.style.setProperty("--plane-angle", `${angle}deg`);
        }
      }

      previousX = x;
      previousY = y;
      hasPreviousPosition = true;

      plane.style.left = `${x}px`;
      plane.style.top = `${y}px`;
      plane.classList.add("is-visible");
    };

    // Create the airplane shower at the clicked position.
    const handleClick = (event) => {
      if (
        window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
      ) {
        return;
      }

      const burst = document.createElement("div");
      burst.className = "airplane-burst";

      burst.style.left = `${event.clientX}px`;
      burst.style.top = `${event.clientY}px`;

      // Gold and blue particles.
      for (let i = 0; i < 8; i++) {
        const particle = document.createElement("span");
        particle.className = `airplane-particle particle-${i}`;
        particle.textContent = i % 2 === 0 ? "✦" : "✧";
        burst.appendChild(particle);
      }

      // Extra sparkles around the click.
      ["spark-one", "spark-two"].forEach((className) => {
        const spark = document.createElement("span");
        spark.className = `airplane-spark ${className}`;
        spark.textContent = "✧";
        burst.appendChild(spark);
      });

      document.body.appendChild(burst);

      // Remove the animation after it finishes.
      window.setTimeout(() => burst.remove(), 1000);
    };

    if (finePointer) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    // Click effect works with a mouse or touchscreen.
    window.addEventListener("click", handleClick);

    const handleMouseLeave = () => {
      plane.classList.remove("is-visible");
    };

    if (finePointer) {
      document.documentElement.addEventListener(
        "mouseleave",
        handleMouseLeave
      );
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);

      if (finePointer) {
        document.documentElement.removeEventListener(
          "mouseleave",
          handleMouseLeave
        );
      }
    };
  }, []);

  return (
    <div
      ref={planeRef}
      aria-hidden="true"
      className="airplane-cursor pointer-events-none"
    >
      <span>✈</span>
    </div>
  );
}

export default AirplaneCursor;
