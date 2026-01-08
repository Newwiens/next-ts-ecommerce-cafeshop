// ProductList.tsx (server component)

import { getMenuCategories } from "@/lib/menuDataConnectJson";
import { getProductsWithImagesByCategory } from "@/lib/productImageConnectCloudinaryTest";

// Nieuwe structuur: centrale shell
import MenuShell, {
  type MenuSection,
} from "@/components/productMenu/MenuShell";
import type { Tab } from "@/types/menuTypes";

export default async function ProductList() {
  const menuCategory = getMenuCategories();

  // Product sort by categories
  const [icedCoffee, bubbleTea, freshTea] = await Promise.all([
    getProductsWithImagesByCategory("iced-coffee"),
    getProductsWithImagesByCategory("bubble-tea"),
    getProductsWithImagesByCategory("iced-tea"),
  ]);

  const allProducts = [...icedCoffee, ...bubbleTea, ...freshTea];

  // labels uit je menu categories
  const tabCoffeeCategory = menuCategory.find((c) => c.id === "iced-coffee");
  const tabBubbleTeaCategory = menuCategory.find((c) => c.id === "bubble-tea");
  const tabFreshTeaCategory = menuCategory.find((c) => c.id === "iced-tea");

  // Tabs (boven menu)
  const tabs: Tab[] = [
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
  ];

  // Sections (data per category)
  const sections: MenuSection[] = [
    {
      id: "all-list",
      title: `All products (${allProducts.length})`,
      products: allProducts,
    },
    {
      id: "iced-coffee",
      title: `${tabCoffeeCategory?.name ?? "Iced Coffee"} (${
        icedCoffee.length
      })`,
      products: icedCoffee,
    },
    {
      id: "bubble-tea",
      title: `${tabBubbleTeaCategory?.name ?? "Bubble Tea"} (${
        bubbleTea.length
      })`,
      products: bubbleTea,
    },
    {
      id: "iced-tea",
      title: `${tabFreshTeaCategory?.name ?? "Fresh Iced Tea"} (${
        freshTea.length
      })`,
      products: freshTea,
    },
  ];

  return <MenuShell tabs={tabs} sections={sections} />;
}
