import ProductList from "@/components/menu/ProductList";

export default function MenuPage() {
  return (
    <section className="flex flex-col bg-white text-black">
      <div className="gap-6 item-start">
        {/* links: altijd vaste/constante breedte (neemt restruimte) */}
        <div className="flex-1 min-w-0">
          <ProductList />
        </div>

        {/* rechts: vaste breedte */}
      </div>
    </section>
  );
}
