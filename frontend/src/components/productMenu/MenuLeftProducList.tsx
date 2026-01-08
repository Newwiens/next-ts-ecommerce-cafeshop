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
    <aside className=" h-full bg-transparent p-4 lg:max-h-[calc(100vh-100px)] lg:overflow-auto scrollbar-hide ">
      <div className="h-full  ">
        <h2>{title}</h2>

        <ul className="flex flex-col gap-4">
          {products.map((p) => {
            const isActive = p.id === selectedId;

            return (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => onSelect(p.id)}
                  className={[
                    "flex flex-col gap-4 w-full rounded-2xl p-3 text-left transition",
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
      </div>
    </aside>
  );
}
