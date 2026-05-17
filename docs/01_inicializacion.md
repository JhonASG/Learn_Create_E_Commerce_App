# Cuaderno 01: Inicialización del Proyecto

**Fecha:** Mayo 2026

En este primer paso hemos configurado la base de nuestro proyecto E-Commerce utilizando herramientas modernas. 

## ¿Qué utilizamos?
- **Vite:** Es un empaquetador (bundler) de nueva generación. A diferencia de las herramientas antiguas (como Create React App con Webpack), Vite aprovecha las características nativas de los navegadores modernos para ofrecer un servidor de desarrollo extremadamente rápido.
- **React:** Nuestra biblioteca de frontend para construir la interfaz basándonos en componentes.

## Estructura generada
Al ejecutar el comando de inicialización (`npx create-vite`), se creó la siguiente estructura fundamental:

- `node_modules/`: Contiene todas las dependencias (librerías) de nuestro proyecto. ¡Esta carpeta nunca se sube al repositorio!
- `public/`: Carpeta para archivos estáticos que no serán procesados por Vite (como el `favicon.ico` o modelos 3D puros).
- `src/`: **Aquí es donde trabajaremos la mayor parte del tiempo.** Contiene nuestro código fuente:
  - `main.jsx`: Es el punto de entrada de la aplicación. Aquí React toma el control del archivo HTML e inyecta nuestra aplicación.
  - `App.jsx`: Es nuestro componente raíz, el contenedor principal de toda nuestra página.
- `index.html`: El archivo HTML principal de la página web. Si lo abres, verás que es muy simple y solo tiene un `<div id="root"></div>`.
- `package.json`: Es el "carnet de identidad" del proyecto. Aquí se listan las dependencias que instalamos, el nombre del proyecto y los comandos ("scripts") disponibles (como `npm run dev`).
- `vite.config.js`: Archivo de configuración de Vite por si necesitamos añadir plugins.

## Siguiente Paso
El siguiente paso será limpiar los archivos de ejemplo que nos dio Vite (como los estilos por defecto) y construir nuestro **Diseño Base (Layout)**. Aprenderemos cómo estructurar nuestras carpetas dentro de `src/` para mantener el proyecto ordenado y profesional.
