"use client";

import Image from "next/image";
import type {
  ProductWithImages,
  SizeOption,
  ConfigOptions,
} from "@/types/menuTypes";
import configOptionsJson from "@/data/configOptions.json";
import MenuOptions from "./MenuOptions";
import { useMemo, useState } from "react";

const OPTIONS = configOptionsJson as ConfigOptions;

export default function MenuProductDetails({
  product,
}: {
  product: ProductWithImages | null;
}) {
  // Config voor SIZE selectie
  const sizes = OPTIONS.sizes;

  const [sizesId, setSizesId] = useState<SizeOption["id"]>(sizes[0]?.id ?? "S");

  // reset size bij selectie switch
  // useEffect(() => {
  //   setSizesId(sizes[0]?.id ?? "S");
  // }, [product?.id, sizes]);

  const selectedSize = useMemo(() => {
    return sizes.find((s) => s.id === sizesId) ?? sizes[0];
  }, [sizes, sizesId]);

  const calPrice = useMemo(() => {
    if (!product) return 0;
    return product.basePrice + (selectedSize?.priceExtra ?? 0);
  }, [product, selectedSize]);

  return (
    <section className="grid grid-cols-[max-content_max-content] justify-center min-h-[520px] py-4">
      {/* Product details blok */}
      {product ? (
        <div className="grid justify-center gap-8">
          <div className="grid grid-cols-[max-content_max-content] justify-center">
            {/* Product foto */}
            {product.productImageUrl ? (
              <div className="relative w-[300px] h-[300px] shrink-0 ">
                <Image
                  src={product.productImageUrl}
                  alt={product.name}
                  fill
                  className="object-contain"
                  sizes="300px"
                />
              </div>
            ) : (
              <div className="w-[220px] h-[220px] rounded-2xl" />
            )}
          </div>

          {/* Tags */}
          <div>
            {product.tags?.length ? (
              <ul className="flex justify-center flex-wrap flex-row gap-2">
                {product.tags.map((tag) => (
                  <li
                    key={tag}
                    className="inline-flex w-fit items-center rounded-full border border-amber-200 bg-amber-50 px-2 py-1 text-sm leading-none"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* Product info */}
          <div className="w-100 flex flex-col items-center gap-4 ">
            <h3 className="text-2xl font-bold">{product.name}</h3>
            <p className="text-sm text-neutral-700 text-center">
              {product.description ?? "Omschrijving komt later"}
            </p>

            <p className="text-3xl font-bold">€ {calPrice.toFixed(2)}</p>
          </div>
        </div>
      ) : (
        <div className="grid place-items-center h-full text-neutral-600">
          Geen product
        </div>
      )}

      {/* Options blok */}
      <div className="self-start bg-amber-200 p-4 rounded-2xl">
        <div>
          <MenuOptions sizes={sizes} value={sizesId} onChange={setSizesId} />
        </div>
      </div>
    </section>
  );
}
