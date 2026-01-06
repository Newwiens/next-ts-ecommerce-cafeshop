//ProductListl

import { getMenuCategories } from "@/lib/menuDataConnectJson";
import { getProductsWithImagesByCategory } from "@/lib/productImageConnectCloudinaryTest";
import ProductCard from "@/components/menu2/DefProductCard";
import MenuTabsClient from "@/components/menu2/MenuTabsClient";

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

  //Tabs
  const tabs = [
    {
      id: "all-list",
      label: `All (${allProducts.length})`,
      imgSrc: "/assets/banner/tab-all3.png",
      imgAlt: "All products",
    },
    {
      id: "iced-coffee",
      label: `${tabCoffeeCategory?.name ?? "Iced Coffee"} (${
        icedCoffee.length
      })`,
      imgSrc: "/assets/banner/tab-icedcoffee.png",
      imgAlt: "Iced Coffee",
    },
    {
      id: "bubble-tea",
      label: `${tabBubbleTeaCategory?.name ?? "Bubble Tea"} (${
        bubbleTea.length
      })`,
      imgSrc: "/assets/banner/2tab-bubbletea.png",
      imgAlt: "Bubble Tea",
    },
    {
      id: "iced-tea",
      label: `${tabFreshTeaCategory?.name ?? "Fresh Iced Tea"} (${
        freshTea.length
      })`,
      imgSrc: "/assets/banner/tab-icedtea.png",
      imgAlt: "Fresh Iced Tea",
    },
  ] as const;

  //Sections
  const sections = [
    {
      id: "all-list",
      title: `All products (${allProducts.length})`,
      product: allProducts,
      className: "menu__category-section",
    },
    {
      id: "iced-coffee",
      title: `${tabCoffeeCategory?.name ?? "Iced Coffee"} (${
        icedCoffee.length
      })`,
      product: icedCoffee,
      className: "menu__category-section",
    },
    {
      id: "bubble-tea",
      title: `${tabBubbleTeaCategory?.name ?? "Iced Coffee"} (${
        bubbleTea.length
      })`,
      product: bubbleTea,
      className: "menu__category-section",
    },
    {
      id: "iced-tea",
      title: `${tabFreshTeaCategory?.name ?? "Iced Coffee"} (${
        freshTea.length
      })`,
      product: freshTea,
      className: "menu__category-section",
    },
  ];
  return (
    <MenuTabsClient tabs={tabs}>
      {sections.map((s) => (
        <div key={s.id} id={s.id} data-category={s.id} className={s.className}>
          <h2>{s.title}</h2>
          <div>
            <ul className="menu__category-grid">
              {s.product.map((p) => (
                <li key={p.id} className="menu__category-grid-li">
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </MenuTabsClient>
  );
}
