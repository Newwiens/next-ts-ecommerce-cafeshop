import Image from "next/image";
import type { Tab } from "@/types/menuTypes";

type Props = {
  tabs: ReadonlyArray<Tab>;
  activeId: Tab["id"];
  onChange: (id: Tab["id"]) => void;
  collapsed?: boolean;
};

export default function MenuTopNav({
  tabs,
  activeId,
  onChange,
  collapsed,
}: Props) {
  return (
    <div className="sticky top-0 z-30 bg-amber-50 px-4 py-6">
      <nav className="mx-auto w-full max-w-7xl grid grid-flow-col auto-cols-max justify-center gap-4">
        {tabs.map((t) => {
          const isActive = t.id === activeId;
          const imgSrc = t.imgSrc?.trim();

          return (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange(t.id)}
              className={[
                "flex flex-col w-[200px] items-center gap-3 p-4 rounded-[28px] cursor-pointer bg-amber-300",
                "hover:bg-neutral-50",
                isActive ? "bg-orange-400" : "",
              ].join(" ")}
              aria-current={isActive ? "page" : undefined}
              aria-pressed={isActive}
            >
              <div
                className={[
                  "transition-all duration-300 overflow-hidden",
                  collapsed ? "h-0 opacity-0 -mb-1" : "h-[100px] opacity-100",
                ].join(" ")}
              >
                {imgSrc ? (
                  <Image
                    src={imgSrc}
                    alt={t.imgAlt ?? t.label}
                    width={200}
                    height={200}
                    className="w-[98px] h-auto"
                  />
                ) : null}
              </div>
              <p className="text-sm font-semibold text-center leading-tight">
                {t.label}
              </p>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
