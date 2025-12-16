// ProductList

import { getMenuCategories } from "@/lib/menuDataConnectJson";
import { getProductsWithImagesByCategory } from "@/lib/productImageConnectCloudinaryTest";
import ProductCard from "@/components/menu/ProductCard";
import ProductListClient from "@/components/menu/TestProductListClient";

export default async function ProductList() {
  const menuCategory = getMenuCategories();

  // Product sort by Categories
  const [icedCoffee, bubbleTea, freshTea] = await Promise.all([
    getProductsWithImagesByCategory("iced-coffee"),
    getProductsWithImagesByCategory("bubble-tea"),
    getProductsWithImagesByCategory("iced-tea"),
  ]);

  // tijdelijke "all products" door samen te voegen
  const allProducts = [...icedCoffee, ...bubbleTea, ...freshTea];

  // Button labels by Categories (from menuData.json)
  const btnCoffeeCategory = menuCategory.find((c) => c.id === "iced-coffee");
  const btnBubbleTeaCategory = menuCategory.find((c) => c.id === "bubble-tea");
  const btnTeaCategory = menuCategory.find((c) => c.id === "iced-tea");

  return (
    <ProductListClient
      tabs={[
        { id: "all-list", label: `All (${allProducts.length})` },
        {
          id: "iced-coffee",
          label: `${btnCoffeeCategory?.name ?? "Iced Coffee"} (${
            icedCoffee.length
          })`,
        },
        {
          id: "bubble-tea",
          label: `${btnBubbleTeaCategory?.name ?? "Bubble Tea"} (${
            bubbleTea.length
          })`,
        },
        {
          id: "iced-tea",
          label: `${btnTeaCategory?.name ?? "Fresh Iced Tea"} (${
            freshTea.length
          })`,
        },
      ]}
    >
      {/* Section All list */}
      <section
        id="all-list"
        data-category="all-list"
        className="menu__category-section"
      >
        <h2>All products ({allProducts.length})</h2>
        <div>
          <ul className="menu__category-grid">
            {allProducts.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section Iced Coffee */}
      <section
        id="iced-coffee"
        data-category="iced-coffee"
        className="menu__category"
      >
        <h2>
          {btnCoffeeCategory?.name ?? "Iced Coffee"} ({icedCoffee.length})
        </h2>
        <div>
          <ul className="menu__category-grid">
            {icedCoffee.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section Bubble Tea */}
      <section
        id="bubble-tea"
        data-category="bubble-tea"
        className="menu__category"
      >
        <h2>
          {btnBubbleTeaCategory?.name ?? "Bubble Tea"} ({bubbleTea.length})
        </h2>
        <div>
          <ul className="menu__category-grid">
            {bubbleTea.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section Fresh Tea */}
      <section
        id="iced-tea"
        data-category="iced-tea"
        className="menu__category"
      >
        <h2>
          {btnTeaCategory?.name ?? "Fresh Iced Tea"} ({freshTea.length})
        </h2>
        <div>
          <ul className="menu__category-grid">
            {freshTea.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </ProductListClient>
  );
}
