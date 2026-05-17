# Cuaderno 09: Modal de Checkout y Finalizar Compra

**Fecha:** Mayo 2026

¡Excelente trabajo con los filtros! Ahora nuestro catálogo es mucho más fácil de navegar.

*Nota rápida: Si notas que el botón de categoría seleccionado no se queda resaltado (dorado), es posible que te haya faltado agregar la clase `.filter-btn.active` al final de tu archivo `ProductList.css`. Te dejo el código por si acaso:*
```css
.filter-btn.active {
  background-color: var(--primary);
  color: #000;
  border-color: var(--primary);
}
```

Ahora vamos a dar el último gran paso de nuestra aplicación principal: **Simular el proceso de pago (Checkout)**.
Cuando el usuario haga clic en "Proceder al Pago", no lo llevaremos a otra página, sino que mostraremos un "Modal" (una ventana emergente) pidiéndole sus datos básicos. Al enviar el formulario, vaciaremos el carrito y mostraremos un mensaje de éxito.

## 1. Modales en React

Un Modal funciona igual que nuestro `CartDrawer`: usa renderizado condicional. Si la variable `isCheckoutOpen` es verdadera, mostramos el modal por encima de toda la página.

## 2. Formularios y `onSubmit`

En React, cuando un usuario envía un formulario, el navegador intenta recargar la página por defecto. Para evitar esto, usamos `e.preventDefault()`.

---

## 🛠️ Tu Turno: Ejercicio Práctico

### Paso 9.1: La función de Vaciar Carrito (App.jsx)

Abre `src/App.jsx`. Necesitamos una nueva función para cuando la compra sea exitosa y un nuevo estado para controlar el Modal.

```jsx
// src/App.jsx
// ...
function App() {
  const [cart, setCart] = useState(/* ... */);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // 1. NUEVO ESTADO: Para controlar la ventana de pago
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // ... (tus otras funciones)

  // 2. NUEVA FUNCIÓN: Vacía el carrito después de comprar
  const clearCart = () => {
    setCart([]); // Vaciamos el estado
    localStorage.removeItem("ceramicaCart"); // Limpiamos el disco duro
  };

  // 3. NUEVA FUNCIÓN: Iniciar el proceso de pago
  const startCheckout = () => {
    setIsCartOpen(false); // Cerramos el carrito
    setIsCheckoutOpen(true); // Abrimos la ventana de pago
  };

  return (
    <Layout cart={cart} toggleCart={toggleCart}>
      {/* ... Hero y ProductList ... */}
      
      {isCartOpen && (
        <CartDrawer 
          cart={cart} 
          closeCart={() => setIsCartOpen(false)} 
          removeFromCart={removeFromCart}
          startCheckout={startCheckout} /* <-- Pasamos esta nueva función al cajón */
        />
      )}

      {/* 4. RENDERIZADO CONDICIONAL DEL MODAL (lo crearemos en el siguiente paso) */}
      {isCheckoutOpen && (
        <CheckoutModal 
          total={cart.reduce((s, i) => s + i.price, 0)}
          closeModal={() => setIsCheckoutOpen(false)}
          clearCart={clearCart}
        />
      )}
    </Layout>
  )
}
```

### Paso 9.2: Conectar el botón en CartDrawer

Abre `src/components/CartDrawer.jsx` y recibe `startCheckout`. Conéctalo al botón final.

```jsx
// src/components/CartDrawer.jsx
function CartDrawer({ cart, closeCart, removeFromCart, startCheckout }) {
  // ...
        {cart.length > 0 && (
          <div className="cart-footer">
            <h3>Total: ${total.toFixed(2)}</h3>
            <button className="checkout-btn" onClick={startCheckout}>
              Proceder al Pago
            </button>
          </div>
        )}
  // ...
```

### Paso 9.3: Crear el CheckoutModal

Crea `CheckoutModal.jsx` y `CheckoutModal.css` en `src/components/`.

```jsx
// src/components/CheckoutModal.jsx
import { useState } from 'react';
import './css/CheckoutModal.css';

function CheckoutModal({ total, closeModal, clearCart }) {
  // Estado para saber si la compra se completó
  const [isSuccess, setIsSuccess] = useState(false);

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    
    // Aquí es donde en una app real llamaríamos a Stripe o PayPal
    // Por ahora, simulamos éxito directo:
    setIsSuccess(true);
    clearCart(); // Vaciamos el carrito
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        
        {/* Si la compra fue un éxito, mostramos un mensaje */}
        {isSuccess ? (
          <div className="success-message">
            <h2>¡Gracias por tu compra! 🎉</h2>
            <p>Tu pedido está siendo procesado. Te enviaremos un correo con los detalles.</p>
            <button className="close-btn-large" onClick={closeModal}>Volver a la tienda</button>
          </div>
        ) : (
          /* Si no, mostramos el formulario de pago */
          <>
            <div className="modal-header">
              <h2>Finalizar Compra</h2>
              <button className="close-btn" onClick={closeModal}>✖</button>
            </div>

            <p className="modal-total">Total a pagar: <span>${total.toFixed(2)}</span></p>

            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-group">
                <label>Nombre Completo</label>
                <input type="text" required placeholder="Ej. Juan Pérez" />
              </div>
              <div className="form-group">
                <label>Correo Electrónico</label>
                <input type="email" required placeholder="ejemplo@correo.com" />
              </div>
              <div className="form-group">
                <label>Dirección de Envío</label>
                <input type="text" required placeholder="Calle Principal 123" />
              </div>
              
              <button type="submit" className="pay-btn">Confirmar y Pagar</button>
            </form>
          </>
        )}

      </div>
    </div>
  );
}

export default CheckoutModal;
```

### Paso 9.4: Estilos del Modal

Añade un diseño elegante a `CheckoutModal.css`:

```css
/* src/components/css/CheckoutModal.css */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: var(--bg-color);
  width: 90%;
  max-width: 500px;
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(212, 175, 55, 0.2); /* Borde dorado sutil */
  box-shadow: 0 25px 50px rgba(0,0,0,0.5);
  animation: popIn 0.3s ease;
}

@keyframes popIn {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.modal-total {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: var(--text-muted);
}

.modal-total span {
  color: var(--primary);
  font-weight: bold;
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group input {
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--text-main);
  font-family: inherit;
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary);
}

.pay-btn, .close-btn-large {
  width: 100%;
  background-color: var(--primary);
  color: #000;
  border: none;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1rem;
  transition: transform 0.2s;
}

.pay-btn:hover, .close-btn-large:hover {
  transform: scale(1.02);
}

.success-message {
  text-align: center;
  padding: 2rem 0;
}

.success-message h2 {
  color: var(--primary);
  margin-bottom: 1rem;
}

.success-message p {
  color: var(--text-muted);
  margin-bottom: 2rem;
}
```

---

> [!TIP]
> **¡El último gran paso!**
> 1. Añade productos al carrito.
> 2. Abre el cajón del carrito y presiona "Proceder al Pago".
> 3. Llena el formulario en tu nuevo Modal y envíalo.
> 4. Verás el mensaje de agradecimiento. Al cerrar el modal, ¡tu carrito estará vacío como por arte de magia!
>
> ¡Pruébalo y envíame una captura de tu nuevo formulario de Checkout!
