
import { useEffect, useRef } from "react";

export function AirplaneCursor() {
  const planeRef = useRef(null);

  useEffect(() => {
    // Touch devices par custom cursor nahi chalega
    if (!window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const plane = planeRef.current;
    if (!plane) return;

    let previousX = 0;
    let previousY = 0;
    let hasPreviousPosition = false;

    const handleMouseMove = (event) => {
      const x = event.clientX;
      const y = event.clientY;

      if (hasPreviousPosition) {
        const dx = x - previousX;
        const dy = y - previousY;

        if (Math.hypot(dx, dy) > 1) {
          const angle =
            Math.atan2(dy, dx) * (180 / Math.PI) - 45;

          plane.style.setProperty(
            "--plane-angle",
            `${angle}deg`
          );
        }
      }

      previousX = x;
      previousY = y;
      hasPreviousPosition = true;

      plane.style.left = `${x}px`;
      plane.style.top = `${y}px`;
      plane.style.opacity = "1";
    };

    const handleMouseLeave = () => {
      plane.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      plane.style.opacity = "1";
    };

    window.addEventListener("mousemove", handleMouseMove);

    document.documentElement.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    document.documentElement.addEventListener(
      "mouseenter",
      handleMouseEnter
    );

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );

      document.documentElement.removeEventListener(
        "mouseenter",
        handleMouseEnter
      );
    };
  }, []);

  return (
    <div
      ref={planeRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] select-none text-3xl"
      style={{
        opacity: 0,
        transform:
          "translate(-50%, -50%) rotate(var(--plane-angle, 0deg))",
        transition:
          "left 80ms linear, top 80ms linear, transform 100ms ease-out, opacity 150ms ease",
      }}
    >
      ✈️
    </div>
  );
}

export default AirplaneCursor;
