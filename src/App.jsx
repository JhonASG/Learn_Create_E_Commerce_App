import { use, useState } from 'react';
import Layout from './components/Layout'
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import CartDrawer from './components/CartDrawer';

function App() {
	// Crear el estado del carrito.
	const [cart, setCart] = useState([]);

	// Estado para mostrar o ocultar los productos en el carrito
	const [isCartOpen, setIsCartOpen] = useState(false);

	// Añadir el producto al carrito
	const addToCart = (product) => {
		setCart([...cart, product]); // Copiamos el carrito actual (...cart) y añadimos el nuevo producto.
		//setIsCartOpen(true) // Opcional: Abrir el carrito al añadir un producto.
		//alert(`¡${product.name} añadido al carrito!`);
	};

	// Alternar entre abierto y cerrado del panel del carrito.
	const toggleCart = () => setIsCartOpen(!isCartOpen);

	return (
		// Pasamos el cart al Layout para que el Header lo use.
		<Layout cart={cart} toggleCart={toggleCart}>
			<Hero />
			<ProductList addToCart={addToCart} /> {/*Pasamos la función addToCart al ProductList*/}

			{/* Renderizado condicional: solo mostramos el panel del carrito, cuando isCartOpen es true */}
			{isCartOpen && (
				<CartDrawer cart={cart} closeCart={() => setIsCartOpen(false)} />
			)}
		</Layout >
	)
}

export default App;