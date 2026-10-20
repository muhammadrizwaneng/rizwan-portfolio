import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

/** LinkedIn Post Inspector requires width ≥ 1600px and height ≥ 400px. */
export const alt = `${profile.name} — Full Stack Software Engineer Portfolio`;
export const size = { width: 1600, height: 840 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const tags = ["Enterprise SSO", "Mobile apps", "AI / ML"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "85px 96px",
          background: "#0f1729",
          color: "#e8edf5",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#22d3ee",
            }}
          >
            MR.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#94a3b8",
            }}
          >
            Portfolio
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            maxWidth: 1200,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 36,
              color: "#22d3ee",
              fontWeight: 600,
            }}
          >
            {profile.title} · Full Stack & Mobile
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#94a3b8",
              lineHeight: 1.45,
            }}
          >
            Node.js · React Native · Next.js · Python · AWS · 15K+ users
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {tags.map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                padding: "12px 22px",
                borderRadius: 999,
                border: "1px solid rgba(148, 163, 184, 0.25)",
                background: "rgba(15, 23, 41, 0.7)",
                fontSize: 20,
                color: "#e8edf5",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
