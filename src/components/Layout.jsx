import Header from './Header.jsx';
import Footer from './Footer.jsx';

function Layout({ children, cart, toggleCart }) {
    return (
        <>
            <Header cart={cart} toggleCart={toggleCart} /> {/* Pasamos el carrito al Header */}
            <main className='main-content'>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout;