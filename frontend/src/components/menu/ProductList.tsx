// src/app/cloudinary-test/page.tsx
import Image from "next/image";
import { getProductImages, getSceneImages } from "@/lib/cloudinary";

export default async function ProductList() {
  // ⬅️ async calls naar je helpers
  const [productImages, sceneImages] = await Promise.all([
    getProductImages(),
    getSceneImages(),
  ]);

  // Logs zie je in de terminal (server component)
  console.log("PRODUCT_IMAGES", productImages);
  console.log("SCENE_IMAGES", sceneImages);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 text-slate-100">
      <h1 className="mb-6 text-3xl font-bold">Cloudinary test</h1>

      {/* PRODUCT FOTO'S */}
      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold">Productfoto&apos;s (png)</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {productImages.map((img) => (
            <article
              key={img.id}
              className="rounded-xl bg-slate-900/60 p-4 shadow-sm"
            >
              <Image
                src={img.url}
                alt={img.url}
                width={600}
                height={600}
                className="mb-2 h-40 w-full rounded-lg object-cover"
              />
              <div className="text-sm">
                <div className="font-semibold">{img.id}</div>
                <div className="text-xs text-slate-400 break-all">
                  {img.url}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SCENE FOTO'S */}
      <section>
        <h2 className="mb-3 text-xl font-semibold">Scene-foto&apos;s</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sceneImages.map((img) => (
            <article
              key={img.id}
              className="rounded-xl bg-slate-900/60 p-4 shadow-sm"
            >
              <Image
                src={img.url}
                alt={img.url}
                width={600}
                height={600}
                className="mb-2 h-40 w-full rounded-lg object-cover"
              />
              <div className="text-sm">
                <div className="font-semibold">{img.url}</div>
                <div className="text-xs text-slate-400 break-all">{img.id}</div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
