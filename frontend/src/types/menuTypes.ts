// src/types/menuTypes.ts

/* ============== TYPES FOR MENU ==========*/
// 1) Category-id check
type CheckCategoryId = "iced-coffee" | "iced-tea" | "bubble-tea";

// 2) Category object
export type DataCategoryId = {
  id: CheckCategoryId;
  name: string;
};

export type ProductImage = {
  product: string; //PNG
  scene: string; //sfeerfoto
};

// 3) Product zonder Cloudinary
export type DataProduct = {
  id: string;
  categoryId: CheckCategoryId;
  name: string;
  basePrice: number;
  description: string;
  tags: string[];
  image: ProductImage;

  /*==== OVER NADENKEN OF DIT WELK PRAKTISCH OMDAT EXTRA TYPE  ProductWithImages  AANMAKEN????
  productImageUrl?: string; // ? = optioneel, dus niet verplicht property
  sceneImageUrl?: string;
  */
};

// 4) Heel menuData.json
export type MenuData = {
  categories: DataCategoryId[];
  products: DataProduct[];
};

// 5) Product + image urls uit Cloudinary
export type ProductWithImages = DataProduct & {
  // Neem alles van DataProduct én voeg daar deze extra velden aan toe.
  productImageUrl?: string; // ? = optioneel, dus niet verplicht property
  sceneImageUrl?: string;
};

/* ============== TYPES FOR SELECTION OPTIONS BY MENU ==========*/
export type SizeOption = {
  id: string;
  lable: string;
  priceExtra: number;
};

export type GlobalOptions = {
  id: string;
  label: string;
};

export type ConfigOptions = {
  sizes: SizeOption[];
  sugarLevels: GlobalOptions[];
  iceLevels: GlobalOptions[];
  coffeeLevels: GlobalOptions[];
  toppings: GlobalOptions[];
  milk: GlobalOptions[];
};
