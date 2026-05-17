# Cuaderno 02: Limpieza y Diseño Base (Layout)

**Fecha:** Mayo 2026

Como desarrollador, sabes que las plantillas por defecto traen mucho "ruido" que no necesitamos. En React, la mejor práctica es estructurar nuestra interfaz en pequeños bloques de lego llamados **Componentes**.

En esta fase, el objetivo es dejar un lienzo en blanco y crear nuestra estructura principal, lo que comúnmente se conoce como el **Layout** (la envoltura que contendrá el Header, el contenido dinámico y el Footer).

## 1. El concepto de Componente en React

En HTML tradicional, escribías todo el código del encabezado y el pie de página en cada archivo `.html` (o usabas PHP/Templates para incluirlos). 
En React, un componente es simplemente una **función de JavaScript que retorna "HTML"** (esta sintaxis se llama **JSX**).

Por ejemplo:
```jsx
// Esto es un componente React
function MiBoton() {
  return <button className="btn">Click aquí</button>;
}
```

## 2. Variables CSS y Estilos Modernos

Para mantener nuestra aplicación consistente y que parezca premium, no pondremos colores fijos por todos lados. Usaremos **Variables Nativas de CSS** en nuestro archivo global (`index.css`). Esto nos permitirá, en el futuro, implementar un "Modo Oscuro" de manera muy sencilla.

---

## 🛠️ Tu Turno: Ejercicio Práctico

Como acordamos, ¡tú escribirás el código! Sigue estos pasos en tu editor:

### Paso 2.1: Limpieza profunda
1. Ve a `src/App.css` y **borra todo su contenido**. Déjalo en blanco.
2. Ve a `src/index.css`, **borra todo** y pega estas variables CSS base para nuestro e-commerce premium:

```css
/* src/index.css */
:root {
  /* Paleta de colores Premium (Tonos oscuros y acentos vibrantes) */
  --bg-color: #0f0f11;
  --text-main: #f3f3f3;
  --text-muted: #a0a0a0;
  --primary: #d4af37; /* Dorado sutil para cerámicas */
  --primary-hover: #b5952f;
  --header-bg: rgba(15, 15, 17, 0.8); /* Transparencia para efecto cristal */
  
  font-family: 'Inter', system-ui, sans-serif;
  box-sizing: border-box;
}

*, *::before, *::after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--bg-color);
  color: var(--text-main);
  min-height: 100vh;
}
```

3. Ve a `src/App.jsx`. Verás que Vite importó logos y `useState`. **Borra todo** y reemplázalo por un componente limpio:

```jsx
// src/App.jsx
import './App.css'

function App() {
  return (
    <div>
      <h1>Bienvenido al E-Commerce</h1>
    </div>
  )
}

export default App
```

### Paso 2.2: Creando nuestra estructura (Layout)

Vamos a organizar nuestro proyecto.
1. Crea una carpeta llamada `components` dentro de `src/` (es decir: `src/components`).
2. Dentro de `components`, crea tres archivos: `Header.jsx`, `Footer.jsx` y `Layout.jsx`.

**Estructura del Header (`src/components/Header.jsx`):**
Crea una función básica que retorne un `<header>`. Exporta la función al final usando `export default Header`. Piensa en cómo estructurarías el HTML de la barra de navegación (Logo a la izquierda, enlaces a la derecha).

**Estructura del Layout (`src/components/Layout.jsx`):**
El Layout actuará como el contenedor principal. En React, los componentes pueden envolver a otros componentes usando una propiedad especial llamada `children` (hijos).

```jsx
// Ejemplo de cómo se vería tu Layout.jsx
import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
```

### Paso 2.3: Uniendo todo
Vuelve a tu `src/App.jsx` y usa tu nuevo `Layout`. Envuélvelo alrededor del contenido principal:

```jsx
import Layout from './components/Layout'

function App() {
  return (
    <Layout>
      <h1>Catálogo de Cerámicas</h1>
      <p>Nuestros productos irán aquí...</p>
    </Layout>
  )
}

export default App
```

---

> [!TIP]
> **Guarda todos tus archivos** y revisa tu navegador en `http://localhost:5174/`. Deberías ver un fondo oscuro elegante con tu texto.
> Intenta darle algo de estilo al Header usando CSS puro. Puedes crear un archivo `Header.css` e importarlo en tu `Header.jsx`.
