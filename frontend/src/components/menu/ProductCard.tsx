import { ProductWithImages } from "@/types/menuTypes";
import Image from "next/image";

type Props = { product: ProductWithImages };

export default function ProductCard({ product }: Props) {
  const raw = product.sceneImageUrl ?? product.productImageUrl;

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
    <article className="grid gap-2">
      <h3>{product.name}</h3>

      {/* Test: product PNG */}
      {product.image?.scene ? (
        <Image
          src={src}
          alt={product.name}
          width={100}
          height={100}
          className="h-auto w-[200px]"
          unoptimized
        />
      ) : (
        <p>Geen scene image</p>
      )}
    </article>
  );
}
