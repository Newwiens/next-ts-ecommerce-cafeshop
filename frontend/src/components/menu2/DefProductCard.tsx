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
    <article className="flex flex-row gap-8 bg-amber-600">
      <div>
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

      <div>
        <div>
          <ul className="grid grid-cols-4 gap-x-1 gap-y-2 text-[10px] justify-items-start">
            {product.tags?.map((tag) => (
              <li
                key={tag}
                className="inline-flex whitespace-nowrap rounded-full bg-amber-100 px-2 py-1"
              >
                {tag}
              </li>
            ))}
          </ul>

          <h2>{product.name}</h2>
          {/* <p>{product.description}</p> */}
        </div>
        <div>
          <p>€{Number(product.basePrice).toFixed(2)}</p>
        </div>
      </div>
    </article>
  );
}
