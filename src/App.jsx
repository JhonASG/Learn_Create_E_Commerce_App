import { useState, useEffect } from 'react';
import Layout from './components/Layout'
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';

function App() {
	// Crear el estado del carrito, pero validando si hay información guardada en el localstorage.
	const [cart, setCart] = useState(() => {
		const savedCart = localStorage.getItem("ceramicaCart"); // "ceramicaCart" es la Key en localStorage.
		return savedCart ? JSON.parse(savedCart) : [];
	});

	// Estado para mostrar o ocultar los productos en el carrito
	const [isCartOpen, setIsCartOpen] = useState(false);

	// Ventana de pago
	const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

	// Cada vez que cambie la variable cart entonces useEffect se ejecuta.
	// Convertimos el arreglo a texto y lo guardamos bajo el nombre (key) "ceramicaCart".
	// El segundo parametro indica que la variable que useEffect vigila es cart.
	useEffect(() => {
		localStorage.setItem("ceramicaCart", JSON.stringify(cart));
	}, [cart]);

	// Añadir el producto al carrito
	const addToCart = (product) => {
		setCart([...cart, product]); // Copiamos el carrito actual (...cart) y añadimos el nuevo producto.
		//setIsCartOpen(true) // Opcional: Abrir el carrito al añadir un producto.
		//alert(`¡${product.name} añadido al carrito!`);
	};

	// Eliminar usando el índice un elemento del carrito.
	const removeFromCart = (indexToRemove) => {
		// filter() nos da su item y su índice.
		// Si el índice del item es diferente al que deseamos borrar lo conservamos en "newCart", pero si es igual entonces no lo conservamos.
		const newCart = cart.filter((item, index) => index != indexToRemove);
		setCart(newCart) // Establecemos newCart como la nueva información del carrito.
	};

	// Alternar entre abierto y cerrado del panel del carrito.
	const toggleCart = () => setIsCartOpen(!isCartOpen);

	// Vaciar el carrito después de comprar.
	const clearCart = () => {
		setCart([]); // Vaciamos el estado.
		localStorage.removeItem("ceramicaCart"); //Limpiamos el disco duro.
	};

	// Inciar el proceso de pago.
	const startCheckout = () => {
		setIsCartOpen(false) // Cerramos el panel del carrito.
		setIsCheckoutOpen(true); // Abrimos la ventana de pago.
	};

	return (
		// Pasamos el cart al Layout para que el Header lo use.
		<Layout cart={cart} toggleCart={toggleCart}>
			<Hero />
			<ProductList addToCart={addToCart} /> {/*Pasamos la función addToCart al ProductList*/}

			{/* Renderizado condicional: solo mostramos el panel del carrito, cuando isCartOpen es true */}
			{isCartOpen && (
				<CartDrawer
					cart={cart}
					closeCart={() => setIsCartOpen(false)}
					removeFromCart={removeFromCart}
					startCheckout={startCheckout} /* <-- Función activada con el botón de compra */
				/>
			)}

			{/* Renderizado condicional del modal */}
			{isCheckoutOpen && (
				<CheckoutModal
					total={cart.reduce((s, i) => s + i.price, 0)}
					closeModal={() => setIsCheckoutOpen(false)}
					clearCart={clearCart}
				/>
			)}
		</Layout >
	)
}

export default App;