import { useState } from "react";
import ProductCard from "./ProductCard";
import { products } from "../data/products";
import "./css/ProductList.css";

function ProductList({ addToCart }) {
    const [activeCategory, setActiveCategory] = useState("Todos");

    const categories = ["Todos", "Jarrones", "Platos", "Tazas"];

    const filteredProducts = products.filter(product => {
        if (activeCategory === "Todos") {
            return true;
        } else {
            return product.category === activeCategory;
        }
    });

    return (
        <section id="catalogo" className="catalog-section">
            <h2 className="section-title">Nuestra colección</h2>

            {/* Contenedor de botones de filtro. */}
            <div className="filters-container">
                {categories.map((category) => (
                    // Si el botón coincide con la categoría activa, le ponemos la clase "active"
                    <button
                        key={category}
                        className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                        onClick={() => setActiveCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="product-grid">
                {/* 6. MUY IMPORTANTE: Ahora mapeamos filteredProducts en lugar de products */}
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        addToCart={addToCart}
                    />
                ))}

                {/* Un mensajito si la categoría está vacía */}
                {filteredProducts.length === 0 && (
                    <p style={{ textAlign: 'center', gridColumn: '1 / -1', color: 'gray' }}>
                        No hay productos en esta categoría por ahora.
                    </p>
                )}
            </div>
        </section>
    );
}

export default ProductList;