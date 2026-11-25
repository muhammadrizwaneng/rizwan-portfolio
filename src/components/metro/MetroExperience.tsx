"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Download,
  FileText,
  Link2,
  Mail,
  MapPin,
  Pause,
  Phone,
  Play,
  TrainFront,
} from "lucide-react";
import { NetworkMap } from "@/components/metro/NetworkMap";
import {
  education,
  experience,
  featuredProjects,
  profile,
  skillGroups,
} from "@/data/profile";
import "@/components/metro/metro.css";

const stations = [
  { id: "central", label: "Central", color: "#f28c28" },
  { id: "about", label: "About", color: "#f28c28" },
  { id: "career", label: "Career", color: "#f28c28" },
  { id: "projects", label: "Projects", color: "#38bdf8" },
  { id: "skills", label: "Skills", color: "#34d399" },
  { id: "university", label: "University", color: "#94a3b8" },
  { id: "contact", label: "Contact", color: "#94a3b8" },
] as const;

type StationId = (typeof stations)[number]["id"];

const conductorLines: Record<StationId, string> = {
  central:
    "Welcome aboard! I'm Conductor MR. Scroll to ride the line, or switch to Plain View for the classic portfolio.",
  about: "All lines meet here. This is the whole journey in one stop.",
  career: "Newest stops first. Watch for promotions and shipped systems.",
  projects: "Every platform runs a live service. Hit Visit Live / GitHub to ride it.",
  skills: "Skills are grouped by zone. No percentages — just the toolkit.",
  university: "Quick stop. Doors closing in 3… 2… 1…",
  contact: "End of the line! Your ticket to the next project is below.",
};

function StationSign({
  label,
  color,
}: {
  label: string;
  color: string;
}) {
  return (
    <div className="station-sign" style={{ ["--stop" as string]: color }}>
      <span className="station-sign__dot" />
      <span>{label}</span>
    </div>
  );
}

function RailTrain({ top }: { top: number }) {
  return (
    <div className="metro-train" style={{ top }} aria-hidden>
      <svg viewBox="0 0 22 58" focusable="false">
        <rect
          x="1.5"
          y="1.5"
          width="19"
          height="55"
          rx="8.5"
          fill="var(--train-body)"
          stroke="#e8ecf4"
          strokeWidth="3"
        />
        <rect x="9.25" y="6" width="3.5" height="26" rx="1.75" fill="#F28C28" />
        <rect
          x="3"
          y="27.5"
          width="16"
          height="1.75"
          fill="#e8ecf4"
          opacity="0.55"
        />
        <rect x="4.5" y="34" width="5" height="5" rx="1.2" fill="#38bdf8" />
        <rect x="12.5" y="34" width="5" height="5" rx="1.2" fill="#38bdf8" />
        <rect x="4.5" y="42" width="13" height="8" rx="2" fill="#0b1628" />
      </svg>
    </div>
  );
}

export function MetroExperience() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<StationId>("central");
  const [paused, setPaused] = useState(false);
  const [trainTop, setTrainTop] = useState(28);

  const projects = useMemo(
    () => featuredProjects.filter((project) => project.featured).slice(0, 8),
    [],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const nodes = stations
      .map((station) => document.getElementById(station.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible?.target?.id) return;
        const id = visible.target.id as StationId;
        setActive(id);
        const index = stations.findIndex((station) => station.id === id);
        const el = document.getElementById(id);
        const shell = document.querySelector(".metro-shell") as HTMLElement | null;
        if (el && shell) {
          const top = el.offsetTop + 18;
          setTrainTop(Math.max(28, top));
        } else {
          setTrainTop(28 + index * 140);
        }
      },
      {
        rootMargin: "-28% 0px -48% 0px",
        threshold: [0.12, 0.3, 0.55],
      },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [mounted]);

  if (!mounted) {
    return <div className="metro-boot">Boarding Rizwan Metro…</div>;
  }

  return (
    <div className={`metro-root${paused ? " metro-paused" : ""}`}>
      <header className="metro-header">
        <a href="#central" className="metro-brand">
          <span className="metro-brand__mark">M</span>
          <span className="metro-brand__text">Rizwan Metro</span>
        </a>

        <div className="metro-toggle" role="navigation" aria-label="Choose view">
          <a href="/metro" className="is-active" aria-current="page">
            <TrainFront size={14} /> <span className="label">Metro</span>
          </a>
          <a href="/">
            <FileText size={14} /> <span className="label">Plain</span>
          </a>
        </div>

        <div className="metro-header__actions">
          <button
            type="button"
            className="metro-icon-btn"
            onClick={() => setPaused((value) => !value)}
            aria-label={paused ? "Play animations" : "Pause animations"}
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
          </button>
          <a
            className="metro-cv-btn"
            href={profile.resumeUrl}
            download="Muhammad_Rizwan_CV.pdf"
          >
            <Download size={14} />
            <span>Download CV</span>
          </a>
        </div>
      </header>

      <nav className="metro-progress" aria-label="Stations">
        {stations.map((station) => (
          <a
            key={station.id}
            href={`#${station.id}`}
            className={active === station.id ? "is-active" : undefined}
            style={{ color: station.color }}
          >
            <span className="metro-progress__dot" />
            {station.label}
          </a>
        ))}
      </nav>

      <div className="metro-shell">
        <div className="metro-rail" aria-hidden />
        <RailTrain top={trainTop} />

        <section id="central" className="metro-station">
          <span
            className="metro-station__stop"
            style={{ ["--stop" as string]: "#f28c28" }}
          />
          <StationSign label="Central Station" color="#f28c28" />
          <h1>{profile.name}</h1>
          <p className="metro-kicker">{profile.title}</p>
          <p className="metro-kicker">
            Node.js • Next.js • React Native • Python • AWS
          </p>
          <p className="metro-lead">
            {profile.tagline}. {profile.stats[0].value} years shipping secure
            backends, mobile apps, and AI-assisted products.
          </p>

          <div className="metro-hero-grid">
            <div>
              <div className="metro-pills">
                <span className="metro-pill">
                  <MapPin size={14} /> {profile.location}
                </span>
                <span className="metro-pill metro-pill--live">
                  Open to work · On-site · Hybrid · Remote
                </span>
              </div>
              <div className="metro-actions">
                <a className="metro-btn metro-btn--primary" href="#about">
                  Board the Metro ↓
                </a>
                <a
                  className="metro-btn metro-btn--ghost"
                  href={profile.resumeUrl}
                  download="Muhammad_Rizwan_CV.pdf"
                >
                  Download CV (PDF)
                </a>
              </div>
              <div className="metro-stats">
                {profile.stats.map((stat) => (
                  <div className="metro-stat" key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <NetworkMap />
          </div>
        </section>

        <section id="about" className="metro-station">
          <span
            className="metro-station__stop"
            style={{ ["--stop" as string]: "#f28c28" }}
          />
          <StationSign label="Station 01 · About Junction" color="#f28c28" />
          <h2>About Junction</h2>
          <p
            className="metro-line-tag"
            style={{ ["--stop" as string]: "#f28c28" }}
          >
            Orange Line · Career journey
          </p>
          <div className="metro-tip">
            <span className="metro-tip__avatar">MR</span>
            <p>{conductorLines.about}</p>
          </div>
          <p className="metro-lead">{profile.summary}</p>
          <div className="metro-card" style={{ marginTop: "1rem" }}>
            <h3>What I bring</h3>
            <ul className="metro-list">
              <li>
                Enterprise SSO, MFA, and secure account lifecycle for 15K+ users
              </li>
              <li>
                Fast APIs with Node.js, FastAPI/Flask, Elasticsearch, and AWS
              </li>
              <li>
                Cross-platform React Native apps plus AI agents / vibe coding
                workflows
              </li>
            </ul>
          </div>
        </section>

        <section id="career" className="metro-station">
          <span
            className="metro-station__stop"
            style={{ ["--stop" as string]: "#f28c28" }}
          />
          <StationSign label="Station 02 · Career Line" color="#f28c28" />
          <h2>Career Line</h2>
          <p
            className="metro-line-tag"
            style={{ ["--stop" as string]: "#f28c28" }}
          >
            Orange Line · Career journey
          </p>
          <div className="metro-tip">
            <span className="metro-tip__avatar">MR</span>
            <p>{conductorLines.career}</p>
          </div>
          <div className="metro-stack">
            {experience.map((job) => (
              <article className="metro-job" key={`${job.role}-${job.period}`}>
                <h3>{job.role}</h3>
                <p className="metro-meta">
                  {job.company} · {job.location} · {job.period}
                </p>
                <ul>
                  {job.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="metro-station">
          <span
            className="metro-station__stop"
            style={{ ["--stop" as string]: "#38bdf8" }}
          />
          <StationSign label="Station 03 · Project Terminal" color="#38bdf8" />
          <h2>Project Terminal</h2>
          <p
            className="metro-line-tag"
            style={{ ["--stop" as string]: "#38bdf8" }}
          >
            Blue Line · Projects
          </p>
          <div className="metro-tip">
            <span className="metro-tip__avatar">MR</span>
            <p>{conductorLines.projects}</p>
          </div>
          <div className="metro-stack">
            {projects.map((project, index) => (
              <article className="metro-project" key={project.name}>
                <p className="metro-meta">Platform {index + 1}</p>
                <h3>{project.name}</h3>
                <p className="metro-lead" style={{ margin: "0.35rem 0" }}>
                  {project.summary}
                </p>
                <div className="metro-chips">
                  {project.stack.slice(0, 6).map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <div className="metro-actions" style={{ marginTop: "0.85rem" }}>
                  {project.demo ? (
                    <a
                      className="metro-btn metro-btn--primary"
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Visit Live
                    </a>
                  ) : null}
                  {project.github ? (
                    <a
                      className="metro-btn metro-btn--ghost"
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub
                    </a>
                  ) : null}
                  {project.playStore ? (
                    <a
                      className="metro-btn metro-btn--ghost"
                      href={project.playStore}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Google Play
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="metro-station">
          <span
            className="metro-station__stop"
            style={{ ["--stop" as string]: "#34d399" }}
          />
          <StationSign label="Station 04 · Skills Depot" color="#34d399" />
          <h2>Skills Depot</h2>
          <p
            className="metro-line-tag"
            style={{ ["--stop" as string]: "#34d399" }}
          >
            Green Line · Skills
          </p>
          <div className="metro-tip">
            <span className="metro-tip__avatar">MR</span>
            <p>{conductorLines.skills}</p>
          </div>
          <div className="metro-zones">
            {skillGroups.map((group, index) => (
              <article className="metro-zone" key={group.title}>
                <h3>
                  Zone {index + 1} · {group.title}
                </h3>
                <div className="metro-chips">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="university" className="metro-station">
          <span
            className="metro-station__stop"
            style={{ ["--stop" as string]: "#94a3b8" }}
          />
          <StationSign label="Station 05 · University Stop" color="#94a3b8" />
          <h2>University Stop</h2>
          <p
            className="metro-line-tag"
            style={{ ["--stop" as string]: "#94a3b8" }}
          >
            Grey Line · Education & contact
          </p>
          <div className="metro-tip">
            <span className="metro-tip__avatar">MR</span>
            <p>{conductorLines.university}</p>
          </div>
          <div className="metro-stack">
            {education.map((ed) => (
              <article className="metro-edu" key={ed.school}>
                <h3>{ed.degree}</h3>
                <p className="metro-meta">
                  {ed.school} · {ed.location} · {ed.period}
                </p>
                {ed.note ? <p className="metro-lead">{ed.note}</p> : null}
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="metro-station">
          <span
            className="metro-station__stop"
            style={{ ["--stop" as string]: "var(--line-grey)" }}
          />
          <StationSign
            label="Station 06 · Last Stop: Contact Terminal"
            color="#6b7280"
          />
          <h2>Last Stop: Contact Terminal</h2>
          <p
            className="metro-line-tag"
            style={{ ["--stop" as string]: "var(--line-grey)" }}
          >
            Grey Line · Education & contact
          </p>
          <div className="metro-tip">
            <span className="metro-tip__avatar">MR</span>
            <p>{conductorLines.contact}</p>
          </div>

          <div className="ticket">
            <div className="ticket__body">
              <div className="ticket__stripe" aria-hidden>
                <span className="ticket__stripe-seg ticket__stripe-seg--orange" />
                <span className="ticket__stripe-seg ticket__stripe-seg--blue" />
                <span className="ticket__stripe-seg ticket__stripe-seg--green" />
                <span className="ticket__stripe-seg ticket__stripe-seg--grey" />
              </div>

              <div className="ticket__main">
                <div className="ticket__head">
                  <p className="ticket__brand">
                    Rizwan Metro · Single journey
                  </p>
                  <p className="ticket__platform">Platform 06</p>
                </div>

                <div className="ticket__journey">
                  <div className="ticket__endpoint">
                    <p className="ticket-label">From</p>
                    <p className="ticket__big">IDEA</p>
                    <p className="ticket__sub">Your product brief</p>
                  </div>

                  <div className="ticket__track" aria-hidden>
                    <span className="ticket__node" />
                    <span className="ticket__dash" />
                    <span className="ticket-train">
                      <TrainFront size={18} strokeWidth={2} />
                    </span>
                    <span className="ticket__dash" />
                    <span className="ticket__node ticket__node--end" />
                  </div>

                  <div className="ticket__endpoint ticket__endpoint--to">
                    <p className="ticket-label">To</p>
                    <p className="ticket__big">LIVE</p>
                    <p className="ticket__sub">Shipped software</p>
                  </div>
                </div>

                <dl className="ticket__meta">
                  <div>
                    <dt className="ticket-label">Conductor</dt>
                    <dd>{profile.name}</dd>
                  </div>
                  <div>
                    <dt className="ticket-label">Role</dt>
                    <dd>{profile.title}</dd>
                  </div>
                  <div>
                    <dt className="ticket-label">Work mode</dt>
                    <dd>On-site · Hybrid · Remote</dd>
                  </div>
                  <div>
                    <dt className="ticket-label">Available for</dt>
                    <dd>Full-time &amp; Freelance</dd>
                  </div>
                </dl>

                <div className="ticket__tagline">
                  <span className="pulse-dot" aria-hidden />
                  <p>
                    Ride ends here, but the next project starts with you.
                  </p>
                </div>
              </div>
            </div>

            <div className="ticket-stub">
              <dl className="ticket-stub__meta">
                <div>
                  <dt className="ticket-label">Passenger</dt>
                  <dd>You</dd>
                </div>
                <div>
                  <dt className="ticket-label">Line</dt>
                  <dd>Grey Line</dd>
                </div>
                <div className="ticket-stub__wide">
                  <dt className="ticket-label">Based in</dt>
                  <dd>{profile.location}</dd>
                </div>
              </dl>

              <ul className="ticket-stub__actions">
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    className="ticket-btn ticket-btn--primary"
                  >
                    <Mail size={18} /> Email
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${profile.phone.replace(/\s/g, "")}`}
                    className="ticket-btn ticket-btn--secondary"
                  >
                    <Phone size={18} />
                    <span className="sr-only">Call </span>
                    {profile.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="ticket-btn ticket-btn--secondary"
                  >
                    <Link2 size={18} /> LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={profile.resumeUrl}
                    download="Muhammad_Rizwan_CV.pdf"
                    className="ticket-btn ticket-btn--secondary"
                  >
                    <Download size={18} /> Download CV
                    <span className="sr-only"> (PDF)</span>
                  </a>
                </li>
              </ul>

              <div className="barcode" aria-hidden />
            </div>
          </div>
        </section>
      </div>

      <aside className="metro-conductor" aria-live="polite">
        <div className="metro-conductor__top">
          <span>Conductor MR</span>
          <button
            type="button"
            className="metro-icon-btn"
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? <Play size={12} /> : <Pause size={12} />}
          </button>
        </div>
        <p>{conductorLines[active]}</p>
      </aside>

      <div className="metro-fab" aria-label="Quick contact">
        <a href={`mailto:${profile.email}`} aria-label="Email">
          <Mail size={16} />
        </a>
        <a
          href={`tel:${profile.phone.replace(/\s/g, "")}`}
          aria-label="Phone"
        >
          <Phone size={16} />
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <Link2 size={16} />
        </a>
      </div>
    </div>
  );
}
