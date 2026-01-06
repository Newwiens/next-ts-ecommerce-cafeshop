"use client";

import Image from "next/image";
import { ProductWithImages } from "@/types/menuTypes";

type Props = {
  title: string;
  products: ReadonlyArray<ProductWithImages>;
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export default function MenuLeft({
  title,
  products,
  selectedId,
  onSelect,
}: Props) {
  return (
    <aside className="rounded-[28px] bg-green-400 p-4 lg:sticky lg:top-28 lg:max-h-[calc(100vh-100px)] lg:overflow-auto">
      <h2>{title}</h2>

      <ul>
        {products.map((p) => {
          const isActive = p.id === selectedId;

          return (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => onSelect(p.id)}
                className={[
                  "w-full rounded-2xl p-3 text-left transition",
                  "hover:bg-neutral-50",
                  isActive ? "bg-orange-400" : "",
                ].join(" ")}
                aria-current={isActive ? "true" : undefined}
              >
                <div className="mx-auto relative w-[110px] h-[110px]">
                  {p.productImageUrl ? (
                    <Image
                      src={p.productImageUrl}
                      alt={p.name}
                      fill
                      className="object-contain"
                      sizes="100px"
                    />
                  ) : (
                    <div className="h-full w-full rounded-xl bg-neutral-100"></div>
                  )}
                </div>
                <p className="text-sm font-semibold text-center">{p.name}</p>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
