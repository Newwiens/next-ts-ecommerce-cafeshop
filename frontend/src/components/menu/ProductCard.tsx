import { ProductWithImages } from "@/types/menuTypes";
import Image from "next/image";

type Props = { product: ProductWithImages };

export default function ProductCard({ product }: Props) {
  //  product.sceneImageUrl ?? --> scene foto's
  const raw = product.productImageUrl;

  // trim + converteer "" naar null
  const src = raw?.trim() ? raw.trim() : null;

  if (!src) {
    return (
      <article className="grid gap-2">
        <h3>{product.name}</h3>
        <p>Geen image (id: {product.id})</p>
      </article>
    );
  }

  return (
    <article className="relative flex w-full max-w-[260px] h-52 overflow-visible px-6">
      <div className="absolute left-1/2 top-25 rounded-2xl h-52 w-52 -translate-x-1/2 bg-sky-400/70" />

      <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
        {src ? (
          <Image
            src={src}
            alt={product.name}
            width={400}
            height={300}
            className="w-[200px] h-auto object-contain"
          />
        ) : (
          <p>Geen image (id: {product.id})</p>
        )}
      </div>
      <div className="flex flex-col w-full h-full z-25">
        <div className="pt-50">
          <h3>{product.name}</h3>
          {/* <p className="w-50">{product.description}</p> */}
          <p>€{Number(product.basePrice).toFixed(2)}</p>
        </div>
      </div>
    </article>
  );
}
