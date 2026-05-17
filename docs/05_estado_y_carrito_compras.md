# Cuaderno 05: Estado de React y el Carrito de Compras

**Fecha:** Mayo 2026

¡Wow! Esa cuadrícula de productos quedó de nivel profesional. Las tarjetas se ven espectaculares con las imágenes y el botón resaltado.

Pero ahora tenemos un problema: **Nuestra página es estática**. Si hacemos clic en "Añadir", no pasa nada. Un E-Commerce necesita interactividad, necesita "recordar" qué productos hemos seleccionado. Aquí es donde entra la magia de React: **El Estado (`useState`)**.

## 1. El Estado (`useState`)

En React, el "estado" es como la memoria a corto plazo de un componente. Cuando el estado cambia, React vuelve a dibujar (renderizar) la pantalla para mostrar la información actualizada.

```jsx
import { useState } from 'react';

function Contador() {
  const [numero, setNumero] = useState(0); // Empezamos en 0
  
  return <button onClick={() => setNumero(numero + 1)}>Clicks: {numero}</button>;
}
```

## 2. Elevando el Estado (Lifting State Up)

Necesitamos que el **Header** sepa cuántos productos hay, y que el **ProductCard** pueda añadir productos. Como ambos están en diferentes partes de la aplicación, debemos poner la memoria (el estado) en su padre común: `App.jsx`.

---

## 🛠️ Tu Turno: Ejercicio Práctico

Vamos a darle vida a esos botones de "Añadir".

### Paso 5.1: Preparando el Estado en App.jsx

1. Abre `src/App.jsx`.
2. Importa `useState` de React.
3. Crea la función `addToCart` y pásala como "propiedad" (prop) a tus componentes.

```jsx
// src/App.jsx
import { useState } from 'react'; // 1. Importar useState
import Layout from './components/Layout';
import Hero from './components/Hero';
import ProductList from './components/ProductList';

function App() {
  // 2. Crear el estado del carrito (un arreglo vacío al inicio)
  const [cart, setCart] = useState([]);

  // 3. Función para añadir un producto al carrito
  const addToCart = (product) => {
    // Copiamos el carrito actual y añadimos el nuevo producto
    setCart([...cart, product]);
    alert(`¡${product.name} añadido al carrito!`); // Un pequeño aviso por ahora
  };

  return (
    // 4. Pasamos el carrito al Layout (para que el Header lo use)
    <Layout cart={cart}>
      <Hero />
      {/* 5. Pasamos la función al ProductList */}
      <ProductList addToCart={addToCart} />
    </Layout>
  )
}

export default App;
```

### Paso 5.2: Actualizando el Layout y el Header

Ahora que `Layout` recibe el carrito, debe pasárselo al `Header`.

1. Abre `src/components/Layout.jsx` y actualízalo para recibir y pasar el prop `cart`:

```jsx
// src/components/Layout.jsx
import Header from './Header';
import Footer from './Footer';

function Layout({ children, cart }) {
  return (
    <>
      <Header cart={cart} /> {/* Pasamos el carrito al Header */}
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
```

2. Abre `src/components/Header.jsx` y haz que el icono del carrito muestre la cantidad:

```jsx
// src/components/Header.jsx
import './css/Header.css';

function Header({ cart }) {
  return (
    <header className="header">
      <div className="logo">Ceramica<span>Pro</span></div>
      <nav className="nav-links">
        <a href="#inicio">Inicio</a>
        <a href="#catalogo">Catálogo</a>
        <a href="#nosotros">Nosotros</a>
      </nav>
      <div className="cart-icon">
        🛒 
        {/* Si hay items en el carrito, mostramos el número */}
        {cart && cart.length > 0 && (
          <span className="cart-count">{cart.length}</span>
        )}
      </div>
    </header>
  );
}

export default Header;
```

3. Ve a `src/components/css/Header.css` y añade un estilo para ese numerito rojo/dorado:

```css
/* Añadir al final de src/components/css/Header.css */
.cart-icon {
  position: relative; /* Para poder posicionar el numerito */
  font-size: 1.5rem;
  cursor: pointer;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -10px;
  background-color: var(--primary);
  color: #000;
  font-size: 0.7rem;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 50%;
}
```

### Paso 5.3: Conectando el botón "Añadir"

La función `addToCart` viaja de `App` -> `ProductList` -> `ProductCard`.

1. En `src/components/ProductList.jsx`, recibe la función y pásala a las tarjetas:

```jsx
// src/components/ProductList.jsx
import ProductCard from './ProductCard';
import { products } from '../data/products';
import './css/ProductList.css';

// Recibimos la función addToCart como prop
function ProductList({ addToCart }) {
  return (
    <section id="catalogo" className="catalog-section">
      <h2 className="section-title">Nuestra Colección</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            addToCart={addToCart} /* Pasamos la función a cada tarjeta */
          />
        ))}
      </div>
    </section>
  );
}

export default ProductList;
```

2. Por último, en `src/components/ProductCard.jsx`, recibe la función y conéctala al evento `onClick` del botón:

```jsx
// src/components/ProductCard.jsx
import './css/ProductCard.css';

// Recibimos el product y la función addToCart
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
          {/* Al hacer clic, ejecutamos la función pasando este producto específico */}
          <button className="add-btn" onClick={() => addToCart(product)}>
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
```

---

> [!TIP]
> **¡Guarda todo y pruébalo!** 
> Ahora, si haces clic en "Añadir" en cualquier producto, verás una alerta y el contador de tu icono del carrito en la barra de navegación (Header) aumentará. ¡Tu e-commerce ahora tiene memoria!
> Mándame una captura de pantalla mostrando el número de productos en tu carrito.
