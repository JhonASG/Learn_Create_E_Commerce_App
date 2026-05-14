import Header from './Header.jsx';
import Footer from './Footer.jsx';

function Layout({ children }) {
    return (
        <>
            <Header />
            <main className='main-content'>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout;