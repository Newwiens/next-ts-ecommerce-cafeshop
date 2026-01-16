"use client";

import type { SizeOption } from "@/types/menuTypes";

type Props = {
  sizesOpt: SizeOption[];
  value: SizeOption["id"];
  onChange: (id: SizeOption["id"]) => void;
};

export default function SizeOptionSelector({
  sizesOpt,
  value,
  onChange,
}: Props) {
  return (
    <div>
      <div>
        {/* SIZE options */}
        <div className="flex flex-row gap-2">
          {sizesOpt.map((s) => {
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
                {(s.priceExtra ?? 0) > 0 && (
                  <span className="ml-2 text-xs opacity-90">
                    +€{s.priceExtra}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
