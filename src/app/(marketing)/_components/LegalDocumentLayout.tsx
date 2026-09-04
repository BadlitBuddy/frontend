"use client";

import { useEffect, useState } from "react";

type TocSection = {
  id: string;
  label: string;
};

type LegalDocumentLayoutProps = {
  title: string;
  description: string;
  lastUpdated: string;
  sections: TocSection[];
  children: React.ReactNode;
};

export function SectionNumber({ n }: { n: number }) {
  return (
    <span className="font-mono text-base-content/30 font-normal mr-2 text-[0.9em] tracking-tight select-none">
      {String(n).padStart(2, "0")}.
    </span>
  );
}

export function SectionHeading({
  n,
  id,
  children,
}: {
  n: number;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="text-xl font-bold text-base-content mt-14 mb-4 flex items-baseline gap-1 scroll-mt-24"
    >
      <SectionNumber n={n} />
      {children}
    </h2>
  );
}

export function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-bold text-base-content/90 mt-6 mb-2">
      {children}
    </h3>
  );
}

export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-base-200 border border-base-300 rounded-box px-5 py-4 my-5 text-sm text-base-content/80 leading-relaxed">
      {children}
    </div>
  );
}

export function BulletList({ items }: { items: (string | React.ReactNode)[] }) {
  return (
    <ul className="list-disc list-outside pl-5 space-y-1.5 text-base-content/80 text-sm leading-relaxed my-4">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-base-content/75 leading-relaxed my-3">
      {children}
    </p>
  );
}

export function LegalDocumentLayout({
  title,
  description,
  lastUpdated,
  sections,
  children,
}: LegalDocumentLayoutProps) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const firstVisible = visible[0];
        if (firstVisible) {
          setActiveId(firstVisible.target.id);
        }
      },
      { rootMargin: "-20% 0% -70% 0%", threshold: 0 },
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleTocClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    event.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 96;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
      setActiveId(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="max-w-3xl">
        <p className="font-mono text-xs tracking-widest text-base-content/40 font-medium uppercase mb-3">
          Last Updated: {lastUpdated}
        </p>
        <h1 className="text-4xl font-bold text-base-content tracking-tight">
          {title}
        </h1>
        <p className="mt-3 text-base text-base-content/60 leading-relaxed max-w-2xl">
          {description}
        </p>
      </div>

      <div className="divider my-10" />

      <div className="flex gap-12 items-start">
        <aside className="hidden lg:block w-60 shrink-0 sticky top-24 self-start">
          <div className="border border-base-300 rounded-box bg-base-100 p-4">
            <p className="font-mono text-[10px] font-semibold tracking-widest text-base-content/40 uppercase mb-3 px-1">
              On This Page
            </p>
            <ul className="menu menu-xs gap-0.5 p-0">
              {sections.map(({ id, label }, i) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={(event) => handleTocClick(event, id)}
                    className={
                      activeId === id
                        ? "font-semibold text-base-content bg-base-200 rounded"
                        : "text-base-content/55 hover:text-base-content hover:bg-base-200/60 transition-colors"
                    }
                  >
                    <span className="font-mono text-[10px] text-base-content/30 mr-1 shrink-0">
                      {String(i + 1).padStart(2, "0")}.
                    </span>
                    <span className="text-xs leading-snug">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <article className="flex-1 min-w-0 max-w-3xl">{children}</article>
      </div>
    </div>
  );
}
