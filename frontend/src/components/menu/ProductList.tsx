//ProductList

import {
  getMenuProducts,
  getProductByCategory,
  getMenuCategories,
} from "@/lib/menuDataConnectJson";

import ProductCard from "@/components/menu/ProductCard";
export default function ProductList() {
  const menuCategory = getMenuCategories();

  // Product sort by Categories
  const allProducts = getMenuProducts();
  const icedCoffee = getProductByCategory("iced-coffee");
  const bubbleTea = getProductByCategory("bubble-tea");
  const freshTea = getProductByCategory("iced-tea");

  //Button by Categories
  const btnCoffeeCategory = menuCategory.find((c) => c.id === "iced-coffee");
  const btnBobaCategory = menuCategory.find((c) => c.id === "bubble-tea");
  const btnTeaCategory = menuCategory.find((c) => c.id === "iced-tea");
  return (
    <>
      <div className="menu__all-list">
        <button className="menu__btn">Btn All list</button>
        <section
          id="all-list"
          data-category="all-list"
          className="menu__category"
        >
          <h2>All products ({allProducts.length})</h2>
          <div>
            <ul>
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
            <ul>
              {icedCoffee.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Section Bubble Tea */}
        {btnBobaCategory && (
          <button className="menu__btn">{btnBobaCategory.name}</button>
        )}

        <section
          id="iced-boba"
          data-category="iced-boba"
          className="menu__category"
        >
          <h2>Bubble Tea ({bubbleTea.length})</h2>
          <div>
            <ul>
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
            <ul>
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
