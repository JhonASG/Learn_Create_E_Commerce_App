# Cuaderno 08: Categorías y Filtros de Productos

**Fecha:** Mayo 2026

¡Felicidades! Lograste implementar `localStorage`. Has dominado uno de los patrones más importantes del desarrollo Frontend moderno: **El ciclo de vida del estado** (Inicializar -> Leer -> Actualizar -> Guardar).

Ahora que nuestro carrito está completo, volvamos nuestra atención al **Catálogo de Productos**. En este momento, mostramos todos los productos mezclados. ¿Qué pasa si el usuario solo quiere ver "Tazas" o "Jarrones"?

Vamos a aplicar el método `.filter()` que acabas de aprender, pero esta vez lo usaremos para crear **Filtros de Categorías**.

## 1. El estado local y el filtrado en tiempo real

Hasta ahora hemos "elevado el estado" al `App.jsx` porque el Header y el CartDrawer necesitaban acceso a él. Pero el estado del "Filtro actual" solo le importa a la lista de productos. Por lo tanto, este estado debe vivir dentro de `ProductList.jsx`.

La lógica es simple:
1. Tenemos la lista original completa (`products`).
2. Creamos una lista filtrada al vuelo basada en la `categoriaActiva`.
3. Mapeamos (`.map`) esa lista filtrada en lugar de la original.

---

## 🛠️ Tu Turno: Ejercicio Práctico

### Paso 8.1: Añadir Categorías a nuestros Datos

Primero, necesitamos que nuestros productos sepan a qué categoría pertenecen.
Abre `src/data/products.js` y añade la propiedad `category` a cada uno:

```javascript
// src/data/products.js
export const products = [
  {
    id: 1,
    name: "Jarrón Terra",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=400",
    description: "Jarrón minimalista de arcilla natural.",
    category: "Jarrones" // <-- NUEVO
  },
  {
    id: 2,
    name: "Plato Ébano",
    price: 25.00,
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=400",
    description: "Plato de cerámica con acabado mate oscuro.",
    category: "Platos" // <-- NUEVO
  },
  {
    id: 3,
    name: "Taza Aurum",
    price: 18.00,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=400",
    description: "Taza artesanal con detalles dorados.",
    category: "Tazas" // <-- NUEVO
  },
  {
    id: 4,
    name: "Cuenco Zen",
    price: 35.00,
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=400",
    description: "Cuenco profundo ideal para decoración o uso diario.",
    category: "Platos" // <-- Podemos agruparlo en Platos o crear "Cuencos"
  }
];

// Opcional: Si quieres, añade un par de productos más para que el filtro sea más notorio.
```

### Paso 8.2: Preparar los estilos de los botones (Filtros)

Abre `src/components/css/ProductList.css` y añade estos estilos para los botones que usaremos para filtrar:

```css
/* src/components/css/ProductList.css */

/* ... (mantén lo que ya tienes) ... */

.filters-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap; /* Para que bajen de línea en móviles */
}

.filter-btn {
  background-color: transparent;
  color: var(--text-main);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  border-color: var(--primary);
  color: var(--primary);
}

/* Esta clase se aplicará al botón que esté seleccionado */
.filter-btn.active {
  background-color: var(--primary);
  color: #000;
  border-color: var(--primary);
}
```

### Paso 8.3: Implementar el Filtro en ProductList.jsx

Ahora viene la parte divertida. Vamos a modificar `ProductList.jsx` para incluir un estado local (`activeCategory`) y filtrar la lista.

```jsx
// src/components/ProductList.jsx
import { useState } from 'react'; // 1. Importamos useState
import ProductCard from './ProductCard';
import { products } from '../data/products';
import './css/ProductList.css';

function ProductList({ addToCart }) {
  // 2. Creamos el estado local para saber qué categoría está seleccionada.
  // Empezamos con "Todos" para mostrar el catálogo completo al inicio.
  const [activeCategory, setActiveCategory] = useState("Todos");

  // 3. Arreglo con las categorías que queremos mostrar en los botones
  const categories = ["Todos", "Jarrones", "Platos", "Tazas"];

  // 4. ESTADO DERIVADO: Filtramos los productos basándonos en la categoría activa
  const filteredProducts = products.filter(product => {
    if (activeCategory === "Todos") {
      return true; // Si es "Todos", conservamos el producto (lo mostramos)
    } else {
      return product.category === activeCategory; // Si no, comprobamos si coincide
    }
  });

  return (
    <section id="catalogo" className="catalog-section">
      <h2 className="section-title">Nuestra Colección</h2>
      
      {/* 5. Contenedor de Botones de Filtro */}
      <div className="filters-container">
        {categories.map((category) => (
          <button 
            key={category} 
            // Si el botón coincide con la categoría activa, le ponemos la clase "active"
            className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {/* 6. MUY IMPORTANTE: Ahora mapeamos filteredProducts en lugar de products */}
        {filteredProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            addToCart={addToCart}
          />
        ))}
        
        {/* Un mensajito si la categoría está vacía */}
        {filteredProducts.length === 0 && (
          <p style={{ textAlign: 'center', gridColumn: '1 / -1', color: 'gray' }}>
            No hay productos en esta categoría por ahora.
          </p>
        )}
      </div>
    </section>
  );
}

export default ProductList;
```

---

> [!TIP]
> **¡Guarda todo y pruébalo!** 
> Ahora, arriba de tu catálogo verás unos elegantes botones de filtro. 
> Haz clic en "Jarrones", "Platos" o "Tazas" y mira cómo la cuadrícula de productos reacciona instantáneamente sin tener que recargar la página. ¡Eso es el poder de React en acción!
> Mándame una captura filtrando por alguna de las categorías.
