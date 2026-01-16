"use client";

import type { GlobalOptions } from "@/types/menuTypes";

type Props = {
  iceOpt: GlobalOptions[];
  value: GlobalOptions["id"];
  onChange: (id: GlobalOptions["id"]) => void;
};

export default function IceOptionSelector({ iceOpt, value, onChange }: Props) {
  return (
    <div className="grid gap-2">
      <p className="text-sm font-bold">IJs Level</p>

      <div className="flex flex-row gap-4">
        {iceOpt.map((opt) => {
          const activeIce = opt.id === value;

          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              aria-pressed={activeIce}
              className={[
                "cursor-pointer rounded-full px-3 py-2 text-sm",
                "hover:bg-amber-300",
                activeIce ? "bg-amber-500 text-white" : "bg-white",
              ].join(" ")}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
