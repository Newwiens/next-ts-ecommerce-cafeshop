import { DataProduct } from "@/types/menuTypes";

type Props = { product: DataProduct };

export default function ProductCard({ product }: Props) {
  const scene = product.image?.scene;
  return (
    <article className="grid gap-2">
      <h3>{product.name}</h3>

      {/* Test: product PNG */}
      {product.image?.scene ? (
        <img
          src={scene}
          alt={product.name}
          className="h-auto w-[100px]"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <p>Geen scene image</p>
      )}
    </article>
  );
}
