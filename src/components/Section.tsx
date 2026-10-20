import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, children, className = "" }: SectionProps) {
  return (
    <section id={id} className={`section-shell ${className}`.trim()}>
      <div className="section-container">{children}</div>
    </section>
  );
}
