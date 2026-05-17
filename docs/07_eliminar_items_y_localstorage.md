# Cuaderno 07: Eliminar Items y Persistencia (localStorage)

**Fecha:** Mayo 2026

¡El panel lateral quedó brutal! Ese efecto de fondo desenfocado (blur) y el cálculo automático del total realmente hacen que la página se sienta premium y profesional.

Sin embargo, si recargas la página ahora mismo, **perderás todo tu carrito**. Además, si te equivocas y añades una "Taza Aurum" de más, no tienes cómo quitarla. 

En esta lección aprenderemos a **eliminar elementos** de un arreglo usando `.filter()` y a **guardar datos en el navegador** usando `localStorage` junto con otro de los Hooks más famosos de React: `useEffect`.

## 1. El método `.filter()` (JavaScript)

Así como `.map()` transforma una lista, `.filter()` crea una lista nueva conservando **solo los elementos que cumplan una condición**. Es la forma estándar en React para eliminar algo del estado.

```javascript
const numeros = [1, 2, 3, 4];
// "Fíltrame los números dejando solo los que sean diferentes de 3"
const sinTres = numeros.filter(num => num !== 3); // Resultado: [1, 2, 4]
```

## 2. Efectos Secundarios (`useEffect`)

Mientras que `useState` es la memoria, `useEffect` es para ejecutar "Efectos Secundarios". Un efecto secundario es cualquier cosa que suceda fuera de React (como conectarse a una base de datos, cambiar el título de la pestaña, o guardar algo en el disco duro del usuario con `localStorage`).

---

## 🛠️ Tu Turno: Ejercicio Práctico

### Paso 7.1: La función para Eliminar (App.jsx)

Abre `src/App.jsx`. Necesitamos crear la función `removeFromCart` y pasársela al `CartDrawer`.

> **Nota importante:** En nuestro arreglo de prueba, varios productos tienen el mismo `id` si los añadimos múltiples veces. Para hacerlo sencillo ahora, eliminaremos por el *índice* (la posición en el arreglo).

```jsx
// src/App.jsx
// ... resto de importaciones

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setIsCartOpen(true); 
  };

  // NUEVA FUNCIÓN: Eliminar usando el índice
  const removeFromCart = (indexToRemove) => {
    // filter() nos da el item y su índice (i).
    // Si el índice (i) NO es igual al índice que queremos borrar, lo conservamos.
    const newCart = cart.filter((item, i) => i !== indexToRemove);
    setCart(newCart);
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <Layout cart={cart} toggleCart={toggleCart}>
      <Hero />
      <ProductList addToCart={addToCart} />
      
      {isCartOpen && (
        <CartDrawer 
          cart={cart} 
          closeCart={() => setIsCartOpen(false)} 
          removeFromCart={removeFromCart} /* Pasamos la nueva función */
        />
      )}
    </Layout>
  )
}
```

### Paso 7.2: El botón de Eliminar en CartDrawer.jsx

Abre `src/components/CartDrawer.jsx`. Recibe la función y añade un pequeño botón "X" o un icono de basura a cada item.

```jsx
// src/components/CartDrawer.jsx

// Asegúrate de recibir removeFromCart en los props
function CartDrawer({ cart, closeCart, removeFromCart }) {
  
  const total = cart.reduce((suma, item) => suma + item.price, 0);

  return (
    <div className="cart-overlay" onClick={closeCart}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* ... Header del carrito (sin cambios) ... */}

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
                {/* NUEVO BOTÓN DE ELIMINAR */}
                <button 
                  className="remove-item-btn" 
                  onClick={() => removeFromCart(index)}
                  title="Eliminar producto"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {/* ... Footer del carrito (sin cambios) ... */}
      </div>
    </div>
  );
}
```

Añade un estilo rápido en `CartDrawer.css` para el botón:
```css
/* src/components/css/CartDrawer.css */
.remove-item-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  margin-left: auto; /* Esto empujará la papelera a la derecha */
  opacity: 0.7;
  transition: opacity 0.2s;
}

.remove-item-btn:hover {
  opacity: 1;
}
```

### Paso 7.3: Persistencia con localStorage y useEffect

El `localStorage` es una pequeña base de datos en el navegador del usuario. Solo guarda "texto", así que debemos convertir nuestro arreglo a texto (JSON) para guardarlo, y volverlo a convertir a arreglo al leerlo.

Vuelve a `src/App.jsx`.

1. Importa `useEffect` desde React:
   ```jsx
   import { useState, useEffect } from 'react';
   ```

2. **Cargar el carrito al inicio:** Modifica la creación de tu estado `cart` para que intente leer el `localStorage` primero:
   ```jsx
   // Reemplaza tu línea actual de const [cart, setCart] con esto:
   const [cart, setCart] = useState(() => {
     const savedCart = localStorage.getItem("ceramicaCart");
     // Si hay algo guardado, lo convertimos de texto a arreglo. Si no, devolvemos un arreglo vacío [].
     return savedCart ? JSON.parse(savedCart) : [];
   });
   ```

3. **Guardar el carrito cada vez que cambie:** Usa `useEffect` justo debajo de tus estados:
   ```jsx
   const [cart, setCart] = useState(/* ... lo que pusimos arriba ... */);
   const [isCartOpen, setIsCartOpen] = useState(false);

   // NUEVO EFECTO SECUNDARIO
   // Esto dice: "Ejecuta esta función cada vez que cambie la variable 'cart'"
   useEffect(() => {
     // Convertimos el arreglo a texto (JSON.stringify) y lo guardamos bajo el nombre "ceramicaCart"
     localStorage.setItem("ceramicaCart", JSON.stringify(cart));
   }, [cart]); // <- El arreglo de dependencias. Significa "Vigila 'cart'"
   ```

---

> [!TIP]
> **¡Guarda todo y haz la prueba de fuego!**
> 1. Abre tu carrito y añade 3 productos.
> 2. Haz clic en la papelera (🗑️) de uno de ellos. Debería desaparecer y el total debería actualizarse al instante.
> 3. **¡Presiona F5 para recargar la página!** Gracias a `localStorage`, tus productos seguirán allí esperando por ti.
> 
> Envíame una captura donde se vea el icono de eliminar (🗑️) y cuéntame si te funcionó la magia de recargar la página sin perder el carrito.
