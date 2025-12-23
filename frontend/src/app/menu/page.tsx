// src/app/menu/page.tsx
import ProductList from "@/components/menu/ProductList";
export default function MenuPage() {
  return (
    <section className="flex flex-col bg-white text-black">
      <header className="bg-amber-500 flex justify-center w-full my-10">
        <h1 className=" text-3xl font-bold">MENU</h1>
      </header>

      <div className="min-h-screen bg-white flex flex-row mx-8">
        <div className="flex-1">
          <ProductList />
        </div>
        <aside className="bg-amber-100 h-full w-100">
          <h3>CART</h3>
        </aside>
      </div>
    </section>
  );
}
