import Layout from './components/Layout'
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import { useState } from 'react';

function App() {
	// Crear el estado del carrito.
	const [cart, setCart] = useState([]);

	// Añadir el producto al carrito
	const addToCart = (product) => {
		setCart([...cart, product]); // Copiamos el carrito actual (...cart) y añadimos el nuevo producto.
		alert(`¡${product.name} añadido al carrito!`);
	};

	return (
		// Pasamos el cart al Layout para que el Header lo use.
		<Layout cart={cart}>
			<Hero />
			<ProductList addToCart={addToCart} /> {/*Pasamos la función addToCart al ProductList*/}
		</Layout >
	)
}

export default App;