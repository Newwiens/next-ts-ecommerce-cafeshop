//ProductList

import { getMenuCategories } from "@/lib/menuDataConnectJson";
import { getProductsWithImagesByCategory } from "@/lib/productImageConnectCloudinaryTest";
import ProductCard from "@/components/menu/ProductCard";

export default async function ProductList() {
  const menuCategory = getMenuCategories();

  // Product sort by Categories
  const [icedCoffee, bubbleTea, freshTea] = await Promise.all([
    getProductsWithImagesByCategory("iced-coffee"),
    getProductsWithImagesByCategory("bubble-tea"),
    getProductsWithImagesByCategory("iced-tea"),
  ]);

  // tijdelijke "all products" door samen te voegen (kan je later netter maken)
  const allProducts = [...icedCoffee, ...bubbleTea, ...freshTea];
  //Button by Categories
  const btnCoffeeCategory = menuCategory.find((c) => c.id === "iced-coffee");
  const btnBubbleTeaCategory = menuCategory.find((c) => c.id === "bubble-tea");
  const btnTeaCategory = menuCategory.find((c) => c.id === "iced-tea");
  return (
    <>
      <div className="menu__all-list">
        <button className="menu__btn">Btn All list</button>
        <section
          id="all-list"
          data-category="all-list"
          className="menu__category-section"
        >
          <h2>All products ({allProducts.length})</h2>
          <div>
            <ul className="menu__category-grid">
              {allProducts.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section Iced Coffee */}
        {btnCoffeeCategory && (
          <button className="menu__btn">{btnCoffeeCategory.name}</button>
        )}

        <section
          id="iced-coffee"
          data-category="iced-coffee"
          className="menu__category"
        >
          <h2>Ijs koffie ({icedCoffee.length})</h2>
          <div>
            <ul className="menu__category-grid">
              {icedCoffee.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section Bubble Tea */}
        {btnBubbleTeaCategory && (
          <button className="menu__btn">{btnBubbleTeaCategory.name}</button>
        )}

        <section
          id="bubble-tea"
          data-category="bubble-tea"
          className="menu__category"
        >
          <h2>Bubble Tea ({bubbleTea.length})</h2>
          <div>
            <ul className="menu__category-grid">
              {bubbleTea.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section Fresh Tea */}
        {btnTeaCategory && (
          <button className="menu__btn">{btnTeaCategory.name}</button>
        )}

        <section
          id="iced-tea"
          data-category="iced-tea"
          className="menu__category"
        >
          <h2>Fresh Tea ({freshTea.length})</h2>
          <div>
            <ul className="menu__category-grid">
              {freshTea.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
