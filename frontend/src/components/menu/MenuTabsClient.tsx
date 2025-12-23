"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";

export type Tab = Readonly<{
  id: string;
  label: string;
  imgSrc?: string;
  imgAlt?: string;
}>;
type SectionProps = { id?: string };

type Props = {
  tabs: ReadonlyArray<Tab>;
  children: React.ReactNode;
};

export default function MenuTabsClient({ tabs, children }: Props) {
  const [activeId, setActiveId] = useState<string>("all-list");

  // Maak children “indexable”
  const childrenArr = useMemo(
    () => React.Children.toArray(children), // 1) callback: maak van props.children een echte array
    [children] // 2) dependencies: herbereken alleen als `children` verandert
  );

  const activeSection = useMemo(() => {
    const found = childrenArr.find((child) => {
      //--> zoek de section met de juiste id
      return (
        React.isValidElement<SectionProps>(child) && child.props.id === activeId
        /* 
        1e check op true
        - React.isValidElement<SectionProps>(child) --> als het een valid element is, dan heeft het props die minstens id?: string kunnen bevatten.
        daarnaar 2e check op true
        - child.props.id === activeId --> is het id van die section gelijk aan de actieve tab id?
        */
      );
    });

    return found ?? childrenArr[0] ?? null;
    /*
    found ?? childrenArr[0] 
    = true Als found bestaat → return found
    = Anders (found is undefined) → return childrenArr[0]

    childrenArr[0] ?? null
    = Als childrenArr[0] óók niet bestaat (bijv. geen children) → return null
    */
  }, [childrenArr, activeId]);
  /**
    herbereken activeSection alleen als:
    - activeId verandert (je klikt een andere button)
    - of childrenArr verandert (de parent geeft andere sections door)
   */
  return (
    <>
      <div className="menu__tabs-list my-20">
        <nav className="grid h-60 gap-2 ">
          {tabs.map((t) => {
            const isActive = t.id === activeId;
            const imgSrc = t.imgSrc?.trim();

            return (
              <button
                key={t.id}
                type="button"
                className={`menu__btn cursor-pointer ${
                  isActive ? "menu__btn--active" : ""
                }`}
                onClick={() => setActiveId(t.id)}
                aria-current={isActive ? "page" : undefined}
                aria-pressed={isActive}
              >
                {imgSrc ? (
                  <Image
                    src={imgSrc}
                    alt={t.imgAlt ?? t.label}
                    width={200}
                    height={200}
                    className="shrink-0 w-[100]"
                  ></Image>
                ) : null}
                <span className="text-left w-full">{t.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="flex flex-col">{activeSection}</div>
      </div>
    </>
  );
}
