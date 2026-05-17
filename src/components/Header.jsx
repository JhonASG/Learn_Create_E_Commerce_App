import './css/Header.css';

function Header({ cart, toggleCart }) {
    return (
        <header className="header">
            <div className="logo">Ceramica<span>Pro</span></div>
            <nav className="nav-links">
                <a href="#inicio">Inicio</a>
                <a href="#catalogo">Catalogo</a>
                <a href="#nosotros">Nosotros</a>
            </nav>
            <div className="cart-icon" onClick={toggleCart}>
                🛒
                {/* Si hay items en el carrito mostramos el número */}
                {cart && cart.length > 0 && (
                    <span className="cart-count">{cart.length}</span>
                )}
            </div>
        </header>
    );
}

export default Header;