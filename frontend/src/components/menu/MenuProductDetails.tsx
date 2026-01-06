"use client";

import Image from "next/image";
import type { ProductWithImages } from "@/types/menuTypes";

export default function MenuProductDetails({
  product,
}: {
  product: ProductWithImages | null;
}) {
  return (
    <main className="rounded-[28px] bg-neutral-200 p-6 sm:p-10 min-h-[520px]">
      {product ? (
        <div className="grid gap-4">
          {/* Product foto */}
          {product.productImageUrl ? (
            <div className="mx-auto relative w-[220px] h-[220px]">
              <Image
                src={product.productImageUrl}
                alt={product.name}
                fill
                className="object-contain"
                sizes="220px"
              />
            </div>
          ) : (
            <div className="mx-auto w-[220px] h-[220px] rounded-2xl" />
          )}

          <h3 className="text-2xl font-bold text-center">{product.name}</h3>
          <p className="text-sm text-neutral-700 text-center">
            {product.description ?? "Omschrijving komt later"}
          </p>

          <div className="flex justify-center">
            <div className="text-3xl font-bold">
              € {Number(product.basePrice).toFixed(2)}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid place-items-center h-full text-neutral-600">
          Geen product
        </div>
      )}
    </main>
  );
}
