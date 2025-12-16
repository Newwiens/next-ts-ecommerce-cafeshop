//ProductList

import { getMenuCategories } from "@/lib/menuDataConnectJson";
import { getProductsWithImagesByCategory } from "@/lib/productImageConnectCloudinaryTest";
import ProductCard from "@/components/menu/ProductCard";
import MenuTabsClient from "@/components/menu/MenuTabsClient";

export default async function ProductList() {
  const menuCategory = getMenuCategories();

  // Product sort by Categories
  const [icedCoffee, bubbleTea, freshTea] = await Promise.all([
    getProductsWithImagesByCategory("iced-coffee"),
    getProductsWithImagesByCategory("bubble-tea"),
    getProductsWithImagesByCategory("iced-tea"),
  ]);

  // tijdelijke "all products" door samen te voegen (kan je later netter maken)
  const allProducts = [...icedCoffee, ...bubbleTea, ...freshTea];
  //Button by Categories
  const tabCoffeeCategory = menuCategory.find((c) => c.id === "iced-coffee");
  const tabBubbleTeaCategory = menuCategory.find((c) => c.id === "bubble-tea");
  const tabFreshTeaCategory = menuCategory.find((c) => c.id === "iced-tea");
  return (
    <MenuTabsClient
      tabs={[
        { id: "all-list", label: `All (${allProducts.length})` },
        {
          id: "iced-coffee",
          label: `${tabCoffeeCategory?.name ?? "Iced Coffee"} (${
            icedCoffee.length
          })`,
        },
        {
          id: "bubble-tea",
          label: `${tabBubbleTeaCategory?.name ?? "Bubble Tea"} (${
            bubbleTea.length
          })`,
        },
        {
          id: "iced-tea",
          label: `${tabFreshTeaCategory?.name ?? "Fresh Iced Tea"} (${
            freshTea.length
          })`,
        },
      ]}
    >
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
        <h2>Ijs koffie ({icedCoffee.length})</h2>
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
        <h2>Bubble Tea ({bubbleTea.length})</h2>
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
        <h2>Fresh Tea ({freshTea.length})</h2>
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
    </MenuTabsClient>
  );
}
