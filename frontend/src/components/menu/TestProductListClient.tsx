"use client";

import React, { useMemo, useState } from "react";

type Tab = { id: string; label: string };
type SectionProps = { id?: string };

type Props = {
  tabs: Tab[];
  children: React.ReactNode; // server-rendered <section> blocks
};

export default function ProductListClient({ tabs, children }: Props) {
  const [activeId, setActiveId] = useState<string>(tabs[0]?.id ?? "all-list");

  // Maak children “indexable”
  const childrenArr = useMemo(
    () => React.Children.toArray(children),
    [children]
  );

  // Zoek de section met dezelfde id als de actieve tab (dus volgorde maakt niet uit)
  const activeSection = useMemo(() => {
    const found = childrenArr.find((child) => {
      return (
        React.isValidElement<SectionProps>(child) && child.props.id === activeId
      );
    });

    return found ?? childrenArr[0] ?? null;
  }, [childrenArr, activeId]);

  return (
    <div className="menu__all-list">
      {/* LINKS: 4 buttons */}
      <nav className="grid gap-2">
        {tabs.map((t) => {
          const isActive = t.id === activeId;

          return (
            <button
              key={t.id}
              type="button"
              className={`menu__btn ${isActive ? "menu__btn--active" : ""}`}
              onClick={() => setActiveId(t.id)}
              aria-current={isActive ? "page" : undefined}
              aria-pressed={isActive}
            >
              {t.label}
            </button>
          );
        })}
      </nav>

      {/* RECHTS: alleen de gekozen category */}
      <div>{activeSection}</div>
    </div>
  );
}
