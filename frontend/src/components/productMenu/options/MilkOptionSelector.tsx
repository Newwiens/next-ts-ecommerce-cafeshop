"use client";

import type { GlobalOptions } from "@/types/menuTypes";

type Props = {
  milkOpt: GlobalOptions[];
  value: GlobalOptions["id"];
  onChange: (id: GlobalOptions["id"]) => void;
};

export default function MilkOptionSelector({
  milkOpt,
  value,
  onChange,
}: Props) {
  return (
    <div>
      <div className="grid gap-2">
        <p className="text-sm font-bold">Melk Level</p>

        <div className="flex flex-row gap-4">
          {milkOpt.map((opt) => {
            const activeCoffee = opt.id === value;

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onChange(opt.id)}
                aria-pressed={activeCoffee}
                className={[
                  "cursor-pointer rounded-full px-3 py-2 text-sm border",
                  "hover:bg-amber-300",
                  activeCoffee
                    ? "bg-amber-500 text-white border-amber-500"
                    : "bg-white border-neutral-200",
                ].join(" ")}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
