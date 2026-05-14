import './css/Header.css';

function Header() {
    return (
        <header className="header">
            <div className="logo">Ceramica<span>Pro</span></div>
            <nav className="nav-links">
                <a href="#inicio">Inicio</a>
                <a href="#catalogo">Catalogo</a>
                <a href="#nosotros">Nosotros</a>
            </nav>
            <div className="cart-icon">🛒</div>
        </header>
    );
}

export default Header;