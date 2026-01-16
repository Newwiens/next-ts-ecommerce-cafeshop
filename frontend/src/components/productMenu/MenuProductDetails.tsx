"use client";

import Image from "next/image";
import type {
  ProductWithImages,
  SizeOption,
  ConfigOptions,
  GlobalOptions,
} from "@/types/menuTypes";
import configOptionsJson from "@/data/configOptions.json";
import { useMemo, useState } from "react";
import OptionsPanel from "./options/OptionsPanel";

const OPTIONS = configOptionsJson as ConfigOptions;

export default function MenuProductDetails({
  product,
}: {
  product: ProductWithImages | null;
}) {
  /* ========== State ========== */
  // Config voor SIZE selectie
  const sizeSelect = OPTIONS.sizes;
  const iceSelect = OPTIONS.iceLevels;
  const sugarSelect = OPTIONS.sugarLevels;
  const coffeeSelect = OPTIONS.coffeeLevels;
  const milkSelect = OPTIONS.milkLevels;

  // State voor options + Eerst selectie
  const [sizesId, setSizesId] = useState<SizeOption["id"]>(
    sizeSelect[0]?.id ?? "S"
  );
  const [icesId, setIcesId] = useState<GlobalOptions["id"]>(
    iceSelect.find((firstSelect) => firstSelect.id === "50")?.id ??
      iceSelect[0]?.id ??
      "50"
  );

  const [sugarId, setSugarId] = useState<GlobalOptions["id"]>(
    sugarSelect.find((firstSelect) => firstSelect.id === "50")?.id ??
      sugarSelect[0]?.id ??
      "50"
  );

  const [coffeeId, setCoffeeId] = useState<GlobalOptions["id"]>(
    coffeeSelect.find((firstSelect) => firstSelect.id === "normal")?.id ??
      coffeeSelect[0]?.id ??
      "normal"
  );

  const [milkId, setMilkId] = useState<GlobalOptions["id"]>(
    milkSelect.find((firstSelect) => firstSelect.id === "1")?.id ??
      milkSelect[0]?.id ??
      "Normaal"
  );

  /* ========== UseMemo ========== */
  const selectedSize = useMemo(() => {
    return sizeSelect.find((s) => s.id === sizesId) ?? sizeSelect[0];
  }, [sizeSelect, sizesId]);

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
            {product.tags?.length && (
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
            )}
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
          {product && (
            <OptionsPanel
              categoryId={product.categoryId}
              sizes={sizeSelect}
              sizesId={sizesId}
              onSizeChange={setSizesId}
              ices={iceSelect}
              icesId={icesId}
              onIceChange={setIcesId}
              sugar={sugarSelect}
              sugarId={sugarId}
              onSugarChange={setSugarId}
              coffee={coffeeSelect}
              coffeeId={coffeeId}
              onCoffeeChange={setCoffeeId}
              milk={milkSelect}
              milkId={milkId}
              onMilkChange={setMilkId}
            />
          )}
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
    </section>
  );
}
