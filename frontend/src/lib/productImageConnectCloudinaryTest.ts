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
const last = (id: string) => id.split("/").pop() ?? id;

function findImageUrlForProduct(productId: string, images: CloudinaryImage[]) {
  const hit =
    images.find((img) => img.id === productId) ??
    images.find((img) => last(img.id) === productId) ??
    images.find((img) => last(img.id).startsWith(productId));

  return hit?.url; // géén "" teruggeven
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
