// src/app/menu/page.tsx
import ProductList from "@/components/menu/ProductList";
export default function MenuPage() {
  return (
    <main className="min-h-screen bg-green-500 text-slate-100">
      <h1 className="text-3xl font-bold mb-4">Menu</h1>
      <p>Hier komt straks alle iced coffee & bubble tea 🍹</p>

      <ProductList />
    </main>
  );
}
