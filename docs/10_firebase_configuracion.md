# Cuaderno 10: Conectando el Backend (Firebase)

**Fecha:** Mayo 2026

¡Felicidades! 🥳 Has completado la Fase 1 del E-Commerce. Tienes un catálogo dinámico, filtros en tiempo real, un carrito persistente y un flujo de compra. Todo lo que hace una aplicación Frontend AAA moderna.

Sin embargo, hasta ahora nuestros productos viven en un archivo estático (`products.js`) y las compras "desaparecen" cuando el modal dice "Gracias". Para que sea una tienda real, necesitamos un **Backend** (una base de datos en la nube).

Como acordamos en nuestro plan inicial, usaremos **Firebase de Google**. Es la herramienta perfecta para escalar rápido sin tener que escribir servidores complejos desde cero.

## 1. ¿Qué es Firebase?

Firebase es un "Backend as a Service" (BaaS). Nos provee de Base de Datos (Firestore), Autenticación de Usuarios y Almacenamiento de Imágenes.

En este paso, vamos a "instalar" Firebase en nuestro proyecto y conectarlo con la nube.

---

## 🛠️ Tu Turno: Ejercicio Práctico

Este paso requiere que salgamos un momento de nuestro código y vayamos al navegador.

### Paso 10.1: Crear el Proyecto en Firebase Console

1. Ve a la consola de Firebase: [https://console.firebase.google.com/](https://console.firebase.google.com/) (Necesitarás una cuenta de Google).
2. Haz clic en **"Crear un proyecto"** o **"Añadir proyecto"**.
3. Ponle un nombre (ej. `ceramica-pro-ecommerce`).
4. Puedes desactivar Google Analytics por ahora para hacerlo más rápido.
5. Haz clic en **"Crear proyecto"**.

### Paso 10.2: Registrar la App Web

1. Cuando el proyecto esté listo, verás un panel principal. Haz clic en el icono circular de **"Web"** (parece un símbolo `</>`).
2. Dale un apodo a tu app (ej. `Ceramica Web`).
3. Haz clic en **"Registrar app"**.
4. ¡OJO AQUÍ! Firebase te mostrará un bloque de código llamado `firebaseConfig`. Copia solo el objeto que se ve algo así:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyB...",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdefg"
};
```

### Paso 10.3: Instalar Firebase en nuestro Proyecto

Abre una **nueva pestaña de terminal** en tu editor (deja la que corre `npm run dev` abierta) y asegúrate de estar en la carpeta de tu proyecto (`C:\Users\Atomic_02\Desktop\Projects\E-Commerce`).

Ejecuta el siguiente comando para descargar las librerías de Firebase a tu proyecto de React:

```bash
npm install firebase
```

### Paso 10.4: Configurar el archivo de conexión

1. En tu proyecto de React, crea una carpeta llamada `firebase` dentro de `src/` (quedaría `src/firebase/`).
2. Dentro, crea un archivo llamado `config.js`.
3. Pega este código y reemplaza el objeto `firebaseConfig` con el que copiaste de la consola en el Paso 10.2:

```javascript
// src/firebase/config.js

// 1. Importamos las herramientas básicas de Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Usaremos Firestore como Base de Datos

// 2. Tu configuración única (PEGA AQUÍ LOS DATOS QUE TE DIO FIREBASE)
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

// 3. Inicializamos Firebase y la Base de Datos
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // Exportamos 'db' para usarlo en toda la app
```

### Paso 10.5: Activar Firestore Database

1. Vuelve a la consola de Firebase en tu navegador.
2. En el menú de la izquierda (bajo el logo de Firebase), haz clic en **"Compilación"** (Build) y luego en **"Firestore Database"**.
3. Haz clic en **"Crear base de datos"**.
4. Te preguntará la ubicación (la que viene por defecto suele estar bien, ej. `nam5 (us-central)`).
5. **MUY IMPORTANTE:** Te preguntará las Reglas de Seguridad. Por ahora, selecciona **"Comenzar en modo de prueba"** (Test mode). Esto nos permitirá leer y escribir datos sin tener que programar un Login (autenticación) todavía.

---

> [!TIP]
> **No habrá cambios visuales en este paso.** 
> Solo estamos preparando el terreno. Para comprobar que lo hiciste bien, confírmame cuando tengas el archivo `src/firebase/config.js` creado con tus credenciales y me avisas.
> ¡El siguiente paso será subir nuestros productos a la nube y descargarlos usando `useEffect`!
