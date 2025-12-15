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
      <p>{product.description}</p>
      <p>€{Number(product.basePrice).toFixed(2)}</p>
    </article>
  );
}
