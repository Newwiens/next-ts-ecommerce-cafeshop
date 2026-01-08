"use client";

import { useEffect, useMemo, useState } from "react";
import type { ProductWithImages, MenuViewId, Tab } from "@/types/menuTypes";
import MenuTopNav from "./MenuTopNav";
import MenuLeft from "./MenuLeftProducList";
import MenuProductDetails from "./MenuProductDetails";
import MenuCart from "./MenuRightCart";

export type MenuSection = Readonly<{
  id: MenuViewId;
  title: string;
  products: ReadonlyArray<ProductWithImages>;
}>;

type Props = {
  tabs: ReadonlyArray<Tab>;
  sections: ReadonlyArray<MenuSection>;
};

export default function MenuShell({ tabs, sections }: Props) {
  // state: active tab
  const [activeCategoryId, setActiveCategoryId] = useState<MenuViewId>(
    sections[0]?.id ?? "all-list"
  );

  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );

  //derived: actieve section (later gebruikt voor left list)
  const activeSection = useMemo(() => {
    return (
      sections.find((s) => s.id === activeCategoryId) ?? sections[0] ?? null
    );
  }, [sections, activeCategoryId]);

  // derived: producten van actieve section
  const activeProducts = useMemo(() => {
    return activeSection?.products ?? [];
  }, [activeSection]);

  const selectedProduct = useMemo(() => {
    if (!selectedProductId) return activeProducts[0] ?? null;

    return (
      activeProducts.find((p) => p.id === selectedProductId) ??
      activeProducts[0] ??
      null
    );
  }, [activeProducts, selectedProductId]);

  // Nav selections top Menu
  const handleTabChange = (id: MenuViewId) => {
    setActiveCategoryId(id);

    const nextSection =
      sections.find((s) => s.id === id) ?? sections[0] ?? null;
    setSelectedProductId(nextSection?.products[0]?.id ?? null);
  };

  // Collapse op scroll
  const [tabCollapsed, setTabCollapsed] = useState(false);
  useEffect(() => {
    const onScroll = () => setTabCollapsed(window.scrollY > 140);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>
      <MenuTopNav
        tabs={tabs}
        activeId={activeCategoryId}
        onChange={handleTabChange}
        collapsed={tabCollapsed}
      />

      <section className="my-4 rounded-[28px] overflow-visible shadow-xl backdrop-blur z-20 mx-auto w-full max-w-7xl">
        <div className="h-full grid lg:grid-cols-[200px_minmax(0,1fr)_300px] items-stretch">
          {/* LEFT */}
          <div className="bg-green-400 lg:self-stretch overflow-hidden rounded-l-[28px]">
            <MenuLeft
              title={activeSection?.title ?? "Menu"}
              products={activeProducts}
              selectedId={selectedProductId}
              onSelect={setSelectedProductId}
            />
          </div>

          {/* CENTER */}
          <div className="sticky top-20 self-start py-4">
            <MenuProductDetails
              key={selectedProduct?.id ?? "no-product"}
              product={selectedProduct}
            />
          </div>

          {/* RIGHT */}
          <div className="sticky top-20 self-start overflow-visible rounded-l-[28px]">
            <MenuCart />
          </div>
        </div>
      </section>
    </div>
  );
}
