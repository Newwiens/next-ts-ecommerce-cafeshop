// src/lib/menuDataConnectJson.ts
// zijn hulp functie toewijzen type naar json data

import rawMenuData from "@/data/menuData.json";
import type { DataCategoryId, DataProduct, MenuData } from "@/types/menuTypes";

//Deze JSON heeft de vorm van MenuData(types)
const menuData = rawMenuData as MenuData;

// Alle categories type toewijzin menuData.json
export function getMenuCategories(): DataCategoryId[] {
  return menuData.categories;
}

// Alle producten type toewijzin menuData.json
export function getMenuProducts(): DataProduct[] {
  return menuData.products;
}

// Producten filteren menuData.json binnen één categorie
export function getProductByCategory(
  categoryId: DataCategoryId["id"] // () in de function --> wat de functie binnenkrijgt
): DataProduct[] {
  // naar : --> wat de functie return

  return menuData.products.filter((p) => p.categoryId === categoryId);
}
