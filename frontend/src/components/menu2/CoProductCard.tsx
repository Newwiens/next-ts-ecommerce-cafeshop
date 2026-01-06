"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { ProductWithImages } from "@/types/menuTypes";
import optionsConfig from "@/data/configOptions.json";

type Props = { product: ProductWithImages };

type OptionItem = { id: string; label: string; priceExtra?: number };

const SIZES = (optionsConfig.sizes ?? []) as OptionItem[];
const ICE_LEVELS = (optionsConfig.iceLevels ?? []) as OptionItem[];
const SUGAR_LEVELS = (optionsConfig.sugarLevels ?? []) as OptionItem[];
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
        "inline-flex items-center whitespace-nowrap border px-2 py-0.5 text-[10px] transition-colors",
        active
          ? "bg-amber-500 border-amber-500 text-black"
          : "bg-white border-amber-200 hover:bg-amber-50",
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
    <div className="grid gap-1">
      <p className="text-[10px] font-semibold tracking-wide opacity-70">
        {title}
      </p>
      <div className="flex flex-wrap gap-1">
        {items.map((it) => (
          <Chip
            key={it.id}
            active={it.id === value}
            onClick={() => onChange(it.id)}
          >
            {it.id}
            {typeof it.priceExtra === "number" && it.priceExtra > 0
              ? `+€${it.priceExtra.toFixed(0)}`
              : ""}
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
  const [iceId, setIceId] = useState<string | undefined>(
    ICE_LEVELS[2]?.id ?? ICE_LEVELS[0]?.id
  );
  const [sugarId, setSugarId] = useState<string | undefined>(
    SUGAR_LEVELS[2]?.id ?? SUGAR_LEVELS[0]?.id
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

  // standaard: size + ice
  // extra: sugar (bubble tea/iced tea) + milk + coffee
  const showSugar = isBubbleTea || isIcedTea;
  const showMilk = isBubbleTea || isIcedCoffee;
  const showCoffee = isIcedCoffee;
  const hasExtraOptions = showSugar || showMilk || showCoffee;

  const sizeExtra = useMemo(() => {
    const found = SIZES.find((s) => s.id === sizeId);
    return found?.priceExtra ?? 0;
  }, [sizeId]);

  const unitPrice = useMemo(() => {
    return Number(product.basePrice) + Number(sizeExtra);
  }, [product.basePrice, sizeExtra]);

  function handleAdd() {
    console.log("ADD TO CART", {
      productId: product.id,
      qty,
      unitPrice,
      options: { sizeId, iceId, sugarId, milkId, coffeeId },
    });
  }

  return (
    <article className="h-full w-full min-w-0 border border-amber-200 bg-white rounded-md overflow-hidden">
      {/* vaste rechthoek + foto links */}
      <div className="grid grid-cols-[140px_1fr] h-[210px]">
        {/* LEFT: IMAGE */}
        <div className="relative h-full w-full bg-amber-50 border-r border-amber-200">
          {src ? (
            <Image
              src={src}
              alt={product.name}
              fill
              className="object-contain p-3"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          ) : null}
        </div>

        {/* RIGHT: CONTENT */}
        <div className="p-3 flex flex-col min-w-0">
          {/* Title + price */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold leading-tight line-clamp-2 min-w-0">
              {product.name}
            </h3>
            <span className="shrink-0 text-sm font-semibold">
              €{unitPrice.toFixed(2)}
            </span>
          </div>

          {/* Tags (dichtbij + compact) */}
          {product.tags?.length ? (
            <ul className="mt-1 flex flex-wrap gap-1">
              {product.tags.slice(0, 3).map((tag) => (
                <li
                  key={tag}
                  className="inline-flex whitespace-nowrap border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}

          {/* Standard options: SIZE + ICE (compact naast elkaar) */}
          <div className="mt-2 grid grid-cols-2 gap-2">
            <ChipGroup
              title="SIZE"
              items={SIZES}
              value={sizeId}
              onChange={setSizeId}
            />
            <ChipGroup
              title="ICE"
              items={ICE_LEVELS}
              value={iceId}
              onChange={setIceId}
            />
          </div>

          {/* Extra options: inklapbaar (SUGAR/MILK/COFFEE) */}
          {hasExtraOptions ? (
            <details className="group mt-2 border border-amber-200 bg-amber-50 p-2">
              <summary className="flex cursor-pointer list-none items-center justify-between text-[11px] font-semibold">
                Extra opties
                <span className="transition-transform duration-200 group-open:rotate-180">
                  ▾
                </span>
              </summary>

              <div className="mt-2 grid gap-2">
                {showSugar && (
                  <ChipGroup
                    title="SUGAR"
                    items={SUGAR_LEVELS}
                    value={sugarId}
                    onChange={setSugarId}
                  />
                )}
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
          ) : null}

          {/* Footer onderaan (neemt extra ruimte) */}
          <div className="mt-auto pt-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="border border-amber-200 bg-white px-3 py-1 text-sm"
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
                className="border border-amber-200 bg-white px-3 py-1 text-sm"
                onClick={() => setQty((q) => q + 1)}
                aria-label="Aantal omhoog"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="bg-amber-500 px-4 py-2 text-sm font-semibold hover:brightness-95 transition"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
