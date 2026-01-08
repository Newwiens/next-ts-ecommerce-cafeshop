"use client";

import type { SizeOption, ConfigOptions } from "@/types/menuTypes";

type Props = {
  sizes: SizeOption[];
  value: SizeOption["id"];
  onChange: (id: SizeOption["id"]) => void;
};

export default function MenuOptions({ sizes, value, onChange }: Props) {
  return (
    <div>
      <div className="grid place-items-center gap-8">
        {/* SIZE options */}
        <div className="flex flex-row gap-2">
          {sizes.map((s) => {
            const activeSizes = s.id === value;

            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onChange(s.id)}
                aria-pressed={activeSizes}
                className={[
                  "cursor-pointer rounded-full px-3 py-2 text-sm",
                  "hover:bg-amber-300",
                  activeSizes ? "bg-amber-500 text-white" : "bg-white",
                ].join(" ")}
              >
                {s.label}
                <p>{s.priceExtra ? ` (+€${s.priceExtra} )` : ""}</p>
              </button>
            );
          })}
        </div>

        {/* Bestel BTN */}
        <div>
          <button className="cursor-pointer flex justify-center items-center bg-amber-500 rounded-full w-12 h-12">
            <span className="relative text-white text-4xl leading-none -top-1">
              +
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
