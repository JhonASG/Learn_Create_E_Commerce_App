import ProductCard from "./ProductCard";
import { products } from "../data/products";
import "./css/ProductList.css";

function ProductList() {
    return (
        <section id="catalogo" className="catalog-section">
            <h2 className="section-title">Nuestra colección</h2>
            <div className="product-grid">
                {
                    products.map(product => (
                        // En React cuando se usa map() cada elemento debe tener una 'key'
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </div>
        </section>
    );
}

export default ProductList;