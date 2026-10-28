
import { useRouterState } from "@tanstack/react-router";

export default function PlaneReveal() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return <FlightAnimation key={pathname} />;
}

function FlightAnimation() {
  return (
    <div className="plane-reveal" aria-hidden="true">
      <div className="plane-flight plane-one">
        <span>✈</span>
      </div>

      <div className="plane-flight plane-two">
        <span>✈</span>
      </div>

      <div className="plane-flight plane-three">
        <span>✈</span>
      </div>

      <div className="plane-flight plane-four">
        <span>✈</span>
      </div>

      <style>{`
        .plane-reveal {
          position: fixed;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 9999;
          animation: plane-scene-fade 4.2s ease forwards;
        }

        .plane-flight {
          position: absolute;
          left: 0;
          display: flex;
          align-items: center;
          color: #263d58;
          will-change: transform;
          filter: drop-shadow(0 4px 5px #172d431c);
        }

        .plane-flight span {
          display: block;
          font-family: Arial, sans-serif;
          line-height: 1;
          font-size: 48px;
          text-shadow: 0 2px 10px #ffffffa8;
        }

        .plane-flight::after {
          content: "";
          position: absolute;
          z-index: -1;
          right: 72%;
          top: 50%;
          width: clamp(90px, 17vw, 240px);
          height: 3px;
          border-radius: 50%;
          background: linear-gradient(
            to left,
            #ffffffd9,
            #b9d8eb8c,
            transparent
          );
          filter: blur(1px);
        }

        .plane-one {
          top: 18%;
          animation: plane-fly-right 3.8s cubic-bezier(.2,.65,.3,1) both;
        }

        .plane-one span {
          font-size: clamp(42px, 5vw, 68px);
        }

        .plane-two {
          top: 38%;
          color: #b58b48;
          animation: plane-fly-left 4.1s 0.12s ease-in-out both;
        }

        .plane-two span {
          transform: rotate(180deg);
          font-size: clamp(30px, 3.6vw, 48px);
        }

        .plane-two::after {
          right: auto;
          left: 72%;
          background: linear-gradient(
            to right,
            #ffffffc9,
            #d8c49a8c,
            transparent
          );
        }

        .plane-three {
          top: 61%;
          color: #315b7b;
          animation: plane-fly-right 3.7s 0.28s ease-in-out both;
        }

        .plane-three span {
          font-size: clamp(25px, 3vw, 40px);
        }

        .plane-four {
          top: 78%;
          color: #b58b48;
          animation: plane-fly-left 4s 0.2s ease-in-out both;
        }

        .plane-four span {
          transform: rotate(180deg);
          font-size: clamp(32px, 4vw, 54px);
        }

        .plane-four::after {
          right: auto;
          left: 72%;
          width: 130px;
          background: linear-gradient(
            to right,
            #ffffffbd,
            #d8c49a7a,
            transparent
          );
        }

        @keyframes plane-fly-right {
          0% {
            transform: translate(-18vw, 45px) rotate(-8deg);
            opacity: 0;
          }
          12% {
            opacity: 1;
          }
          55% {
            transform: translate(48vw, -15px) rotate(-2deg);
            opacity: 1;
          }
          100% {
            transform: translate(125vw, -75px) rotate(-8deg);
            opacity: 0;
          }
        }

        @keyframes plane-fly-left {
          0% {
            transform: translate(125vw, -30px) rotate(7deg);
            opacity: 0;
          }
          12% {
            opacity: 1;
          }
          55% {
            transform: translate(43vw, 25px) rotate(1deg);
            opacity: 1;
          }
          100% {
            transform: translate(-25vw, 75px) rotate(7deg);
            opacity: 0;
          }
        }

        @keyframes plane-scene-fade {
          0%, 72% { opacity: 1; }
          100% { opacity: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .plane-reveal {
            display: none;
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
