// src/lib/productImageConnectCloudinary.ts

import {
  getMenuProducts,
  getProductByCategory,
} from "@/lib/menuDataConnectJson";

import type { DataProduct, ProductWithImages } from "@/types/menuTypes";
import {
  getProductImages,
  getSceneImages,
  type CloudinaryImage,
} from "@/lib/cloudinary";

// Zoek juiste image-url bij een productId
function findImageUrlForProduct(
  productId: string,
  images: CloudinaryImage[]
): string | undefined {
  // 1. exact match
  const exact = images.find((img) => img.id === productId);
  if (exact) return exact.url;

  // 2. prefix match (handig als je id bijv. "icedcoffee-americano_abc123" is)
  const prefix = images.find((img) => img.id.startsWith(productId));
  return prefix?.url;
}

/**
 * Alle producten + product/scene image urls
 */
export async function getAllProductsWithImages(): Promise<ProductWithImages[]> {
  const products = getMenuProducts();
  const [productImages, sceneImages] = await Promise.all([
    getProductImages(),
    getSceneImages(),
  ]);

  return products.map((product) => ({
    ...product,
    productImageUrl: findImageUrlForProduct(product.id, productImages),
    sceneImageUrl: findImageUrlForProduct(product.id, sceneImages),
  }));
}

/**
 * Producten per categorie + product/scene image urls
 * bv. getProductsWithImagesByCategory("iced-coffee")
 */
export async function getProductsWithImagesByCategory(
  categoryId: DataProduct["categoryId"] // zelfde type als product.categoryId
): Promise<ProductWithImages[]> {
  const products = getProductByCategory(categoryId);
  const [productImages, sceneImages] = await Promise.all([
    getProductImages(),
    getSceneImages(),
  ]);

  return products.map((product) => ({
    ...product,
    productImageUrl: findImageUrlForProduct(product.id, productImages),
    sceneImageUrl: findImageUrlForProduct(product.id, sceneImages),
  }));
}
