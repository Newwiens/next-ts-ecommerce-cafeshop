"use client";

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { IoCartOutline } from "react-icons/io5";

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
  const [tabsCollapsed, setTabsCollapsed] = useState(false);

  //Tab Nav inklappen als naar beneden scrolls
  useEffect(() => {
    const onScroll = () => setTabsCollapsed(window.scrollY > 140);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <div className="grid-cols-[1fr] grid gap-4 justify-items-stretch h-fit my-20">
        <div className="bg-amber-50 sticky top-0 z-30 flex flex-col p-8">
          <nav className="bg-amber-50  grid grid-flow-col h-fit gap-4 auto-cols-max justify-center">
            {tabs.map((t) => {
              const isActive = t.id === activeId;
              const imgSrc = t.imgSrc?.trim();

              return (
                <button
                  key={t.id}
                  type="button"
                  className={`flex flex-col w-[200px] h-auto items-center gap-4 p-4 bg-amber-500 rounded-4xl cursor-pointer ${
                    isActive ? "menu__btn--active" : ""
                  }`}
                  onClick={() => setActiveId(t.id)}
                  aria-current={isActive ? "page" : undefined}
                  aria-pressed={isActive}
                >
                  {/* Image klapt in als beneden wordt gescroll */}
                  <div
                    className={[
                      "transition-all duration-300 overflow-hidden",
                      tabsCollapsed
                        ? "h-0 opacity-0 -mb-1"
                        : "h-[100px] opacity-100",
                    ].join(" ")}
                  >
                    {imgSrc ? (
                      <Image
                        src={imgSrc}
                        alt={t.imgAlt ?? t.label}
                        width={200}
                        height={200}
                        className="shrink-0 w-[110px] h-auto"
                      />
                    ) : null}
                  </div>

                  <span className="text-medium font- text-center leading-tight">
                    {t.label}
                  </span>
                </button>
              );
            })}
            <div className="shrink-0">
              <h2 className="text-xl font-semibold">
                <IoCartOutline />
              </h2>
            </div>
          </nav>
        </div>

        <div className="main__page-center flex flex-col">{activeSection}</div>
      </div>
    </>
  );
}
