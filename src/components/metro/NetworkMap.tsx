"use client";

import type { CSSProperties } from "react";

const trainStyles = {
  orange: {
    borderColor: "var(--line-orange)",
    animation: "map-train-orange 9s linear 1.2s infinite backwards",
  },
  blue: {
    borderColor: "var(--line-blue)",
    animation: "map-train-blue 10s linear 2s infinite backwards",
  },
  green: {
    borderColor: "var(--line-green)",
    animation: "map-train-green 9.5s linear 2.8s infinite backwards",
  },
  grey: {
    borderColor: "var(--line-grey)",
    animation: "map-train-grey 8.5s linear 3.6s infinite backwards",
  },
} as const satisfies Record<string, CSSProperties>;

/** Transit network map — geometry + moving trains match the reference metro portfolio. */
export function NetworkMap() {
  return (
    <nav
      aria-label="Network map"
      className="metro-network card map-paper enter-flip"
    >
      <div className="metro-network__head">
        <p>Network map</p>
        <p>Not to scale</p>
      </div>

      <div className="map-canvas">
        <svg
          viewBox="0 0 440 400"
          className="metro-network__svg"
          focusable="false"
        >
          <g aria-hidden="true">
            <path
              d="M-20 236 C 60 214, 110 292, 200 258 S 330 178, 460 214"
              fill="none"
              stroke="var(--river)"
              strokeWidth="24"
              strokeLinecap="round"
            />
            <circle
              cx="220"
              cy="186"
              r="124"
              fill="none"
              stroke="var(--rule-strong)"
              strokeWidth="1.5"
              strokeDasharray="2 7"
              opacity="0.55"
            />
          </g>

          <g
            aria-hidden="true"
            fill="none"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              d="M220 186 L160 246 L160 326 L120 366"
              stroke="var(--line-grey)"
            />
            <path
              d="M220 186 L220 266 L260 306 L404 306"
              stroke="var(--line-green)"
            />
            <path
              d="M220 186 L320 186 L370 136 L370 36"
              stroke="var(--line-blue)"
            />
            <path
              d="M220 186 L120 186 L70 136 L70 36"
              stroke="var(--line-orange)"
            />

            {[122, 110.67, 99.33, 88, 76.67, 65.33, 54].map((y) => (
              <path
                key={`o-${y}`}
                d={`M70 ${y} H60`}
                stroke="var(--line-orange)"
                strokeWidth="4"
                strokeLinecap="butt"
              />
            ))}
            {[122, 105, 88, 71, 54].map((y) => (
              <path
                key={`b-${y}`}
                d={`M370 ${y} H380`}
                stroke="var(--line-blue)"
                strokeWidth="4"
                strokeLinecap="butt"
              />
            ))}
            {[290, 312.5, 335, 357.5, 380].map((x) => (
              <path
                key={`g-${x}`}
                d={`M${x} 306 V316`}
                stroke="var(--line-green)"
                strokeWidth="4"
                strokeLinecap="butt"
              />
            ))}
          </g>

          <a href="#about" className="map-stop" data-line="orange">
            <circle cx="150" cy="186" r="7.5" className="map-stop__dot" />
            <text x="150" y="168" textAnchor="middle" className="map-stop__label">
              About Junction
            </text>
          </a>
          <a href="#career" className="map-stop" data-line="orange">
            <circle cx="70" cy="36" r="7.5" className="map-stop__dot" />
            <text x="86" y="41" textAnchor="start" className="map-stop__label">
              Career Line
            </text>
          </a>
          <a href="#projects" className="map-stop" data-line="blue">
            <circle cx="370" cy="36" r="7.5" className="map-stop__dot" />
            <text x="354" y="41" textAnchor="end" className="map-stop__label">
              Project Terminal
            </text>
          </a>
          <a href="#skills" className="map-stop" data-line="green">
            <circle cx="404" cy="306" r="7.5" className="map-stop__dot" />
            <text x="404" y="288" textAnchor="end" className="map-stop__label">
              Skills Depot
            </text>
          </a>
          <a href="#university" className="map-stop" data-line="grey">
            <circle cx="160" cy="286" r="7.5" className="map-stop__dot" />
            <text x="146" y="291" textAnchor="end" className="map-stop__label">
              University Stop
            </text>
          </a>
          <a href="#contact" className="map-stop" data-line="grey">
            <circle cx="120" cy="366" r="7.5" className="map-stop__dot" />
            <text x="136" y="371" textAnchor="start" className="map-stop__label">
              Contact Terminal
            </text>
          </a>
          <a
            href="#central"
            className="map-stop map-stop--central"
            data-line="orange"
          >
            <rect
              x="204"
              y="170"
              width="32"
              height="32"
              rx="16"
              className="map-stop__dot"
              strokeWidth="4.5"
            />
            <text
              x="242"
              y="166"
              textAnchor="start"
              className="map-stop__label map-stop__label--central"
            >
              Central
            </text>
          </a>
        </svg>

        <div className="map-trains" aria-hidden>
          <span className="map-train" style={trainStyles.orange} />
          <span className="map-train" style={trainStyles.blue} />
          <span className="map-train" style={trainStyles.green} />
          <span className="map-train" style={trainStyles.grey} />
        </div>
      </div>

      <ul className="metro-network__legend">
        <li>
          <i style={{ background: "var(--line-orange)" }} /> Orange Line · Career
          journey
        </li>
        <li>
          <i style={{ background: "var(--line-blue)" }} /> Blue Line · Projects
        </li>
        <li>
          <i style={{ background: "var(--line-green)" }} /> Green Line · Skills
        </li>
        <li>
          <i style={{ background: "var(--line-grey)" }} /> Grey Line · Education &
          contact
        </li>
      </ul>
    </nav>
  );
}
