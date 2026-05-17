# Cuaderno 06: Panel del Carrito y Cálculo de Totales

**Fecha:** Mayo 2026

¡Excelente! Ya tienes el contador funcionando. Pero un número no es suficiente para un usuario que quiere comprar. Necesitamos que el usuario pueda hacer clic en ese icono y ver **qué productos ha seleccionado y cuánto le va a costar.**

En el diseño moderno, en lugar de llevar al usuario a otra página, se utiliza un "Drawer" o Panel Lateral Deslizante. Para lograr esto, aprenderemos dos nuevos súper poderes de React: **El Renderizado Condicional** y el **Estado Derivado** (cálculo de totales).

## 1. Renderizado Condicional

En React, puedes decidir si dibujar o no un componente basándote en una condición (usualmente un estado booleano: `true` o `false`).

```jsx
const [mostrar, setMostrar] = useState(false);

return (
  <div>
    <button onClick={() => setMostrar(!mostrar)}>Alternar</button>
    {/* Solo si 'mostrar' es true, se dibuja el mensaje */}
    {mostrar && <p>¡Hola! Estaba escondido.</p>}
  </div>
)
```

## 2. El poder de `reduce` (JavaScript)

Para calcular el total a pagar, no necesitamos un nuevo estado. Podemos calcular el total *al vuelo* basándonos en los items que ya están en el arreglo `cart`. Para esto, usamos la función `.reduce()` de JavaScript, que suma los precios de todos los objetos en el arreglo.

---

## 🛠️ Tu Turno: Ejercicio Práctico

Vamos a construir ese panel lateral premium.

### Paso 6.1: El estado para Abrir/Cerrar en App.jsx

1. Abre `src/App.jsx`.
2. Añade un nuevo estado `isCartOpen` (booleano).
3. Añade funciones para abrir y cerrar el carrito.
4. Importa y usa el futuro componente `CartDrawer`.

```jsx
// src/App.jsx
import { useState } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import CartDrawer from './components/CartDrawer'; // <-- Lo crearemos ahora

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false); // Estado para mostrar/ocultar

  const addToCart = (product) => {
    setCart([...cart, product]);
    setIsCartOpen(true); // Opcional: abrir el carrito al añadir un producto
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen); // Alternar abierto/cerrado

  return (
    // Pasamos toggleCart al Layout para que el Header lo use
    <Layout cart={cart} toggleCart={toggleCart}>
      <Hero />
      <ProductList addToCart={addToCart} />
      
      {/* RENDERIZADO CONDICIONAL: Solo mostramos el cajón si isCartOpen es true */}
      {isCartOpen && (
        <CartDrawer 
          cart={cart} 
          closeCart={() => setIsCartOpen(false)} 
        />
      )}
    </Layout>
  )
}

export default App;
```

### Paso 6.2: Conectar el icono del Header

Ve a `src/components/Header.jsx`. Tienes que recibir la función `toggleCart` que le pasamos al `Layout` en el paso anterior y ejecutarla al hacer clic en el carrito.

Primero, en `Layout.jsx`, asegúrate de pasar `toggleCart`:
```jsx
// src/components/Layout.jsx
function Layout({ children, cart, toggleCart }) {
  return (
    <>
      <Header cart={cart} toggleCart={toggleCart} />
// ...resto del código
```

Luego, en `Header.jsx`:
```jsx
// src/components/Header.jsx
function Header({ cart, toggleCart }) {
  // ...
  return (
      // ...
      {/* Añade el evento onClick al div del carrito */}
      <div className="cart-icon" onClick={toggleCart}>
        🛒 
        {cart && cart.length > 0 && (
          <span className="cart-count">{cart.length}</span>
        )}
      </div>
  )
}
```

### Paso 6.3: Crear el componente CartDrawer

Este componente recibirá el carrito (`cart`) y la función para cerrarlo (`closeCart`).
1. Crea `CartDrawer.jsx` y `CartDrawer.css` en `src/components/`.

```jsx
// src/components/CartDrawer.jsx
import './css/CartDrawer.css';

function CartDrawer({ cart, closeCart }) {
  
  // ESTADO DERIVADO: Calculamos el total sumando el 'price' de cada 'item'
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
```

### Paso 6.4: Estilizar el Panel (Glassmorphism)

Para que se vea como una aplicación AAA, daremos un fondo oscuro translúcido que cubra toda la pantalla, y el panel deslizará desde la derecha con un efecto blur.

```css
/* src/components/css/CartDrawer.css */
/* El fondo oscuro que cubre todo (Overlay) */
.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 999; /* Para que esté por encima de todo */
  display: flex;
  justify-content: flex-end; /* Para pegar el panel a la derecha */
}

/* El panel en sí */
.cart-drawer {
  width: 100%;
  max-width: 400px;
  height: 100%;
  background-color: var(--bg-color);
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  animation: slideIn 0.3s ease forwards;
}

@keyframes slideIn {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.close-btn {
  background: none;
  border: none;
  color: var(--text-main);
  font-size: 1.2rem;
  cursor: pointer;
}

.cart-items {
  flex: 1; /* Ocupa todo el espacio disponible */
  overflow-y: auto; /* Scroll si hay muchos productos */
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.empty-cart {
  color: var(--text-muted);
  text-align: center;
  margin-top: 2rem;
}

.cart-item {
  display: flex;
  gap: 1rem;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.03);
  padding: 0.5rem;
  border-radius: 8px;
}

.cart-item img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.item-details h4 {
  margin-bottom: 0.2rem;
}

.cart-footer {
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.checkout-btn {
  background-color: var(--primary);
  color: #000;
  border: none;
  padding: 1rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.checkout-btn:hover {
  background-color: var(--primary-hover);
}
```

---

> [!TIP]
> ¡Guarda todos tus archivos! Ahora, cuando añadas un producto (o hagas clic en el icono del carrito arriba a la derecha), deberías ver una animación súper suave deslizando el panel desde la derecha. Podrás ver tus productos, la foto en miniatura y el total sumado de la compra.
> Si haces clic fuera del panel (en el área oscura), este debería cerrarse.
> **¡Envíame una captura con tu panel lateral abierto!**
