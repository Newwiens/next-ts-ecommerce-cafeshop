"use client";

import type { GlobalOptions } from "@/types/menuTypes";

type Props = {
  sugarOpt: GlobalOptions[];
  value: GlobalOptions["id"];
  onChange: (id: GlobalOptions["id"]) => void;
};

export default function SugarOptionSelector({
  sugarOpt,
  value,
  onChange,
}: Props) {
  return (
    <div>
      <div className="grid gap-2">
        <p className="text-sm font-bold">Suiker Level</p>

        <div className="flex flex-row gap-4">
          {sugarOpt.map((opt) => {
            const activeSugar = opt.id === value;

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => onChange(opt.id)}
                aria-pressed={activeSugar}
                className={[
                  "cursor-pointer rounded-full px-3 py-2 text-sm",
                  "hover:bg-amber-300",
                  activeSugar ? "bg-amber-500 text-white" : "bg-white",
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
