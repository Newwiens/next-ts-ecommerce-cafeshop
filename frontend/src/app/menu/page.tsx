// src/app/menu/page.tsx
import ProductList from "@/components/menu/ProductList";
export default function MenuPage() {
  return (
    <>
      <main className="flex justify-start items-center bg-white flex-col text-black">
        <h1 className="text-3xl font-bold mb-4">Menu</h1>
        <p>Hier komt straks alle iced coffee & bubble tea 🍹</p>
      </main>
      <aside className="min-h-screen bg-white">
        <ProductList />
      </aside>
    </>
  );
}
