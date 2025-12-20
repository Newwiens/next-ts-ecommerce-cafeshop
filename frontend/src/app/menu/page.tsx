// src/app/menu/page.tsx
import ProductList from "@/components/menu/ProductList";
export default function MenuPage() {
  return (
    <main className="flex flex-col justify-start gap-8 items-center bg-white text-black">
      <section className="min-h-screen bg-white">
        <ProductList />
      </section>
    </main>
  );
}
