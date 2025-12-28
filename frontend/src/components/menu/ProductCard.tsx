"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { ProductWithImages } from "@/types/menuTypes";
import optionsConfig from "@/data/configOptions.json";

type Props = { product: ProductWithImages };

type OptionItem = { id: string; label: string; priceExtra?: number };

// ✅ Stabiel: arrays worden 1x bij module-load gemaakt, niet per render
const SIZES = (optionsConfig.sizes ?? []) as OptionItem[];
const SUGAR_LEVELS = (optionsConfig.sugarLevels ?? []) as OptionItem[];
const ICE_LEVELS = (optionsConfig.iceLevels ?? []) as OptionItem[];
const MILK_OPTIONS = (optionsConfig.milkOptions ?? []) as OptionItem[];
const COFFEE_LEVELS = (optionsConfig.coffeeLevels ?? []) as OptionItem[];

function Chip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex items-center whitespace-nowrap rounded-full px-3 py-1 text-xs transition-colors",
        active ? "bg-amber-500 text-black" : "bg-amber-100 hover:bg-amber-200",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function ChipGroup({
  title,
  items,
  value,
  onChange,
}: {
  title: string;
  items: OptionItem[];
  value: string | undefined;
  onChange: (id: string) => void;
}) {
  return (
    <div className="grid gap-2">
      <p className="text-[11px] font-semibold tracking-wide opacity-70">
        {title}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((it) => (
          <Chip
            key={it.id}
            active={it.id === value}
            onClick={() => onChange(it.id)}
          >
            {it.id}
          </Chip>
        ))}
      </div>
    </div>
  );
}

export default function ProductCard({ product }: Props) {
  const src = product.productImageUrl?.trim() || "";

  // defaults
  const [sizeId, setSizeId] = useState<string | undefined>(SIZES[0]?.id);
  const [sugarId, setSugarId] = useState<string | undefined>(
    SUGAR_LEVELS[2]?.id ?? SUGAR_LEVELS[0]?.id
  );
  const [iceId, setIceId] = useState<string | undefined>(
    ICE_LEVELS[2]?.id ?? ICE_LEVELS[0]?.id
  );
  const [milkId, setMilkId] = useState<string | undefined>(MILK_OPTIONS[0]?.id);
  const [coffeeId, setCoffeeId] = useState<string | undefined>(
    COFFEE_LEVELS[1]?.id ?? COFFEE_LEVELS[0]?.id
  );

  const [qty, setQty] = useState(1);

  // categorie rules (pas aan naar jouw data)
  const isBubbleTea = product.categoryId === "bubble-tea";
  const isIcedCoffee = product.categoryId === "iced-coffee";
  const isIcedTea = product.categoryId === "iced-tea";

  // extra options (inklapbaar)
  const showMilk = isBubbleTea || isIcedCoffee;
  const showCoffee = isIcedCoffee;
  const hasExtraOptions = showMilk || showCoffee;

  const sizeExtra = useMemo(() => {
    const found = SIZES.find((s) => s.id === sizeId);
    return found?.priceExtra ?? 0;
  }, [sizeId]);

  const unitPrice = useMemo(() => {
    return Number(product.basePrice) + Number(sizeExtra);
  }, [product.basePrice, sizeExtra]);

  function handleAdd() {
    // Koppel dit straks aan je cart store
    console.log("ADD TO CART", {
      productId: product.id,
      qty,
      unitPrice,
      options: { sizeId, sugarId, iceId, milkId, coffeeId },
    });
  }

  return (
    <article className="w-full min-w-0 rounded-3xl bg-white shadow-sm ring-1 ring-black/5 overflow-hidden">
      <div className="grid md:grid-cols-[260px_1fr]">
        {/* Left image block */}
        <div className="relative bg-linear-to-br from-amber-100 to-amber-200 p-4">
          <div className="relative aspect-4/3 w-full rounded-2xl bg-white/40 overflow-hidden">
            {src ? (
              <Image
                src={src}
                alt={product.name}
                fill
                className="object-contain p-2"
              />
            ) : null}
          </div>
        </div>

        {/* Right content */}
        <div className="p-5 md:p-6 grid gap-4">
          <div className="grid gap-1">
            <p className="text-[11px] opacity-60">Code #{product.id}</p>
            <h3 className="text-xl font-semibold leading-tight">
              {product.name}
            </h3>
            {product.description ? (
              <p className="text-sm opacity-80 line-clamp-2">
                {product.description}
              </p>
            ) : null}
          </div>

          {/* Tags (max 3 per rij, elk op 1 regel) */}
          {product.tags?.length ? (
            <ul className="grid grid-cols-3 gap-x-2 gap-y-2 text-[10px] justify-items-start">
              {product.tags.map((tag) => (
                <li
                  key={tag}
                  className="inline-flex whitespace-nowrap rounded-full bg-amber-50 px-2 py-1 ring-1 ring-amber-200/60"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}

          {/* OPTIONS */}
          <div className="grid gap-4">
            {/* STANDAARD: SIZE + ICE */}
            <ChipGroup
              title="SIZE"
              items={SIZES}
              value={sizeId}
              onChange={setSizeId}
            />

            {(isBubbleTea || isIcedTea) && (
              <ChipGroup
                title="SUGAR"
                items={SUGAR_LEVELS}
                value={sugarId}
                onChange={setSugarId}
              />
            )}

            <ChipGroup
              title="ICE"
              items={ICE_LEVELS}
              value={iceId}
              onChange={setIceId}
            />

            {/* EXTRA: MILK + COFFEE (inklapbaar) */}
            {hasExtraOptions && (
              <details className="group rounded-2xl bg-amber-50 p-3 ring-1 ring-amber-200/50">
                <summary className="flex cursor-pointer list-none items-center justify-between text-xs font-semibold">
                  Extra opties
                  <span className="transition-transform duration-200 group-open:rotate-180">
                    ▾
                  </span>
                </summary>

                <div className="mt-3 grid gap-4">
                  {showMilk && (
                    <ChipGroup
                      title="MILK"
                      items={MILK_OPTIONS}
                      value={milkId}
                      onChange={setMilkId}
                    />
                  )}

                  {showCoffee && (
                    <ChipGroup
                      title="COFFEE"
                      items={COFFEE_LEVELS}
                      value={coffeeId}
                      onChange={setCoffeeId}
                    />
                  )}
                </div>
              </details>
            )}
          </div>

          {/* Price + Qty + Add */}
          <div className="mt-1 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <p className="text-2xl font-semibold">€{unitPrice.toFixed(2)}</p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-full bg-amber-100 px-3 py-1"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Aantal omlaag"
                >
                  -
                </button>
                <span className="w-6 text-center text-sm font-semibold">
                  {qty}
                </span>
                <button
                  type="button"
                  className="rounded-full bg-amber-100 px-3 py-1"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Aantal omhoog"
                >
                  +
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="rounded-full bg-amber-500 px-5 py-3 font-semibold hover:brightness-95 transition"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
