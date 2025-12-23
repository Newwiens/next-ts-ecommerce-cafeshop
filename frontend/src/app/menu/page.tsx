// src/app/menu/page.tsx
import ProductList from "@/components/menu/ProductList";
export default function MenuPage() {
  return (
    <main className="flex flex-col justify-items-start items-start gap-8  bg-white text-black">
      <header className="bg-amber-500 flex justify-center w-full my-10">
        <h1 className=" text-3xl font-bold">MENU</h1>
      </header>

      <section className="min-h-screen bg-white flex flex-row mx-8">
        <ProductList />
        <section className="bg-amber-100 h-full w-[16rem]">
          <h3>CART</h3>
        </section>
      </section>
    </main>
  );
}
