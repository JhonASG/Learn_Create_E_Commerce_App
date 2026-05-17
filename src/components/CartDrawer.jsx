import './css/CartDrawer.css';

function CartDrawer({ cart, closeCart, removeFromCart }) {
    // Calcular el total de la compra sumando el precio de cada item.
    const total = cart.reduce((suma, item) => suma + item.price, 0);

    return (
        <div className="cart-overlay" onClick={closeCart}>
            {/* Usamos stopPropagation para que al hacer clic dentro del panel no se cierre */}
            <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
                <div className="cart-header">
                    <h2>Tu Carrito</h2>
                    <button className="close-btn" onClick={closeCart}>✖</button>
                </div>

                <div className="cart-items">
                    {cart.length === 0 ? (
                        <p className="empty-cart">Tu carrito está vacío.</p>
                    ) : (
                        cart.map((item, index) => (
                            <div key={index} className="cart-item">
                                <img src={item.image} alt={item.name} />
                                <div className="item-details">
                                    <h4>{item.name}</h4>
                                    <p>${item.price.toFixed(2)}</p>
                                </div>
                                <button
                                    className="remove-item-btn"
                                    onClick={() => removeFromCart(index)}
                                    title='Eliminar producto'
                                >
                                    🗑️
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="cart-footer">
                        <h3>Total: ${total.toFixed(2)}</h3>
                        <button className="checkout-btn">Proceder al Pago</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CartDrawer;