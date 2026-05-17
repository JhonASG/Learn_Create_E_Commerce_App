import Header from './Header.jsx';
import Footer from './Footer.jsx';

function Layout({ children, cart }) {
    return (
        <>
            <Header cart={cart} /> {/* Pasamos el carrito al Header */}
            <main className='main-content'>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout;