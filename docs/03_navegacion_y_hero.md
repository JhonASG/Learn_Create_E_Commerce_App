# Cuaderno 03: Navegación Premium y Sección Hero

**Fecha:** Mayo 2026

¡Excelente trabajo! Has limpiado el proyecto y establecido la base de nuestra aplicación. En la imagen que compartiste se ve el lienzo oscuro y elegante que configuramos con nuestras variables CSS.

Ahora vamos a darle vida a nuestra interfaz creando una barra de navegación (Header) que se vea premium usando **Flexbox** y **Glassmorphism** (efecto cristal), y luego crearemos una sección "Hero" atractiva (la primera gran sección visual que ve el usuario al entrar).

## 1. El poder de Flexbox

En el desarrollo web moderno, posicionar elementos es muy fácil gracias a CSS Flexbox. Nos permite alinear los enlaces de navegación a la derecha y el logo a la izquierda sin complicaciones.

**Conceptos clave:**
- `display: flex;`: Convierte el contenedor en una caja flexible.
- `justify-content: space-between;`: Empuja el primer elemento a la izquierda y el último a la derecha.
- `align-items: center;`: Centra los elementos verticalmente.

## 2. Glassmorphism (Efecto Cristal)

Para lograr un diseño verdaderamente premium, usaremos un fondo semi-transparente combinado con un filtro de desenfoque (`backdrop-filter: blur()`). Esto hace que si hacemos scroll, el contenido pase por detrás del Header creando un efecto visual espectacular.

---

## 🛠️ Tu Turno: Ejercicio Práctico

Abre tu editor y sigue estos pasos:

### Paso 3.1: Estilizando el Header

1. Crea un archivo llamado `Header.css` en `src/components/`.
2. Abre `src/components/Header.jsx` y asegúrate de importar el CSS y añadir algunas clases. Tu código debería verse así:

```jsx
// src/components/Header.jsx
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">Ceramica<span>Pro</span></div>
      <nav className="nav-links">
        <a href="#inicio">Inicio</a>
        <a href="#catalogo">Catálogo</a>
        <a href="#nosotros">Nosotros</a>
      </nav>
      <div className="cart-icon">🛒</div>
    </header>
  );
}

export default Header;
```

3. Ahora abre `src/components/Header.css` y añade los estilos mágicos:

```css
/* src/components/Header.css */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%;
  position: sticky;
  top: 0;
  z-index: 100;
  
  /* Efecto Glassmorphism */
  background-color: var(--header-bg);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.logo {
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: 2px;
}

.logo span {
  color: var(--primary); /* El color dorado que definimos antes */
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  color: var(--text-main);
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: var(--primary-hover);
}

.cart-icon {
  font-size: 1.2rem;
  cursor: pointer;
}
```

### Paso 3.2: Creando un Componente "Hero"

La sección "Hero" es el área principal que capta la atención del cliente.
1. Crea un archivo `Hero.jsx` y otro `Hero.css` en tu carpeta `src/components/`.

```jsx
// src/components/Hero.jsx
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Arte en cada <span>detalle</span></h1>
        <p>Cerámicas artesanales hechas a mano para darle vida y elegancia a tus espacios.</p>
        <button className="cta-button">Ver Colección</button>
      </div>
    </section>
  );
}

export default Hero;
```

2. Añade los estilos base en `Hero.css`:

```css
/* src/components/Hero.css */
.hero {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 5%;
}

.hero-content h1 {
  font-size: 4rem;
  margin-bottom: 1rem;
  line-height: 1.1;
}

.hero-content h1 span {
  color: var(--primary);
}

.hero-content p {
  color: var(--text-muted);
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto 2rem auto;
}

.cta-button {
  background-color: var(--primary);
  color: #000;
  border: none;
  padding: 1rem 2.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s;
}

.cta-button:hover {
  background-color: var(--primary-hover);
  transform: scale(1.05);
}
```

### Paso 3.3: Actualizando la App

Finalmente, vamos a incluir nuestra nueva sección en la aplicación principal.
Ve a `src/App.jsx` y úsala:

```jsx
// src/App.jsx
import Layout from './components/Layout'
import Hero from './components/Hero'

function App() {
  return (
    <Layout>
      <Hero />
      {/* El catálogo irá aquí debajo más adelante */}
    </Layout>
  )
}

export default App
```

---

> [!TIP]
> **Guarda todos tus cambios** y mira el navegador. Deberías ver un cambio drástico. Un header fijo en la parte superior con el logo estilizado y una sección hero en el centro llamando a la acción.
> **Envíame una captura de cómo se ve o cuéntame si tienes algún error para seguir con la creación de los productos!**
