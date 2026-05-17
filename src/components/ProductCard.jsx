import "./css/ProductCard.css";

function ProductCard({ product, addToCart }) {
    return (
        <div className="product-card">
            <div className="product-image">
                <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
                <h3>{product.name}</h3>
                <p className="description">{product.description}</p>
                <div className="card-footer">
                    <span className="price">${product.price.toFixed(2)}</span>
                    <button className="add-btn" onClick={() => addToCart(product)}>Añadir</button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;