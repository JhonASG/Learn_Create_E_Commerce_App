# Cuaderno 04: Catálogo y Tarjetas de Producto

**Fecha:** Mayo 2026

¡El Hero y el Header se ven increíbles! Ahora nuestra página tiene una apariencia moderna y premium. El siguiente paso lógico para un E-Commerce es mostrar lo que vendemos: **Los Productos**.

En React, cuando tenemos una lista de elementos (como productos), no escribimos el HTML uno por uno. En su lugar, creamos una sola "Plantilla" (un componente `ProductCard`) y usamos JavaScript para "mapear" (iterar) sobre una lista de datos y generar automáticamente las tarjetas.

## 1. El poder de `map()` en React

La función `.map()` de los arreglos en JavaScript es tu mejor amiga en React. Toma una lista de datos y la transforma en una lista de componentes visuales.

```jsx
const frutas = ["Manzana", "Pera", "Uva"];
// React puede renderizar esto fácilmente:
{frutas.map(fruta => <p>{fruta}</p>)}
```

## 2. CSS Grid para el Catálogo

Mientras que Flexbox es genial para alinear elementos en una fila o columna (como hicimos en el Header), **CSS Grid** es perfecto para crear cuadrículas (grids) bidimensionales, ideal para un catálogo de productos que se adapta al tamaño de la pantalla.

---

## 🛠️ Tu Turno: Ejercicio Práctico

Abre tu editor y sigue estos pasos:

### Paso 4.1: Creando los Datos Simulados (Mock Data)

Antes de conectarnos a un backend real (como Firebase más adelante), necesitamos datos de prueba.
1. Crea una carpeta llamada `data` dentro de `src/` (quedaría `src/data`).
2. Crea un archivo `products.js` dentro y pega este arreglo de objetos:

```javascript
// src/data/products.js
export const products = [
  {
    id: 1,
    name: "Jarrón Terra",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&q=80&w=400",
    description: "Jarrón minimalista de arcilla natural."
  },
  {
    id: 2,
    name: "Plato Ébano",
    price: 25.00,
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=400",
    description: "Plato de cerámica con acabado mate oscuro."
  },
  {
    id: 3,
    name: "Taza Aurum",
    price: 18.00,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=400",
    description: "Taza artesanal con detalles dorados."
  },
  {
    id: 4,
    name: "Cuenco Zen",
    price: 35.00,
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=400",
    description: "Cuenco profundo ideal para decoración o uso diario."
  }
];
```

### Paso 4.2: Componente ProductCard (La Tarjeta)

Vamos a diseñar cómo se verá un solo producto.
1. Crea `ProductCard.jsx` y `ProductCard.css` en tu carpeta `src/components/`.

```jsx
// src/components/ProductCard.jsx
import './css/ProductCard.css';

// Usamos "props" (propiedades) para recibir los datos del producto
function ProductCard({ product }) {
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
          <button className="add-btn">Añadir</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
```

2. Añade los estilos para que la tarjeta se vea premium con un efecto "Hover" en `ProductCard.css`:

```css
/* src/components/css/ProductCard.css */
.product-card {
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.5);
  border-color: rgba(212, 175, 55, 0.3); /* Un toque del dorado */
}

.product-image {
  width: 100%;
  height: 250px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.1); /* Zoom sutil a la imagen al pasar el mouse */
}

.product-info {
  padding: 1.5rem;
}

.product-info h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.description {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  line-height: 1.4;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--primary);
}

.add-btn {
  background: transparent;
  color: var(--text-main);
  border: 1px solid var(--primary);
  padding: 0.5rem 1rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s;
}

.add-btn:hover {
  background: var(--primary);
  color: #000;
}
```

### Paso 4.3: Componente ProductList (La Cuadrícula)

Ahora mapearemos nuestros datos en una cuadrícula.
1. Crea `ProductList.jsx` y `ProductList.css` en `src/components/`.

```jsx
// src/components/ProductList.jsx
import ProductCard from './ProductCard';
import { products } from '../data/products';
import './css/ProductList.css';

function ProductList() {
  return (
    <section id="catalogo" className="catalog-section">
      <h2 className="section-title">Nuestra Colección</h2>
      <div className="product-grid">
        {products.map((product) => (
          /* En React, cuando usas map(), cada elemento debe tener una 'key' única */
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductList;
```

2. Y aplicamos **CSS Grid** en `ProductList.css`:

```css
/* src/components/css/ProductList.css */
.catalog-section {
  padding: 4rem 5%;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
}

.product-grid {
  display: grid;
  /* Magia de CSS Grid: auto-ajusta las columnas dependiendo del ancho */
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}
```

### Paso 4.4: Mostrar el catálogo en App.jsx

Por último, importa `ProductList` en tu `App.jsx` debajo del `Hero`:

```jsx
// src/App.jsx
import Layout from './components/Layout';
import Hero from './components/Hero';
import ProductList from './components/ProductList';

function App() {
  return (
    <Layout>
      <Hero />
      <ProductList />
    </Layout>
  )
}

export default App;
```

---

> [!TIP]
> Guarda todos tus archivos. Si bajas (scroll) en tu página principal, deberías ver una hermosa cuadrícula de 4 productos con imágenes de Unsplash, y al pasar el ratón por encima, ¡una elegante animación de elevación y zoom!
> ¡Pruébalo y envíame una captura!
