# 🐻 Aprendiendo Zustand con React + TypeScript

¡Hola! Soy **Forlán Ordoñez**, desarrollador junior, y en este repositorio encontrarás todo lo que voy aprendiendo sobre **Zustand**, una librería simple y poderosa para manejar el estado global en aplicaciones **React**.

Mi objetivo con este proyecto es:

- Aprender Zustand paso a paso.
- Subir ejemplos prácticos y bien explicados.
- Compartir conocimientos con otros devs que quieran entender y usar Zustand en sus propios proyectos.

Si estás empezando con Zustand o quieres una alternativa más simple a Redux, ¡este repo es para ti!

---

## 📂 Contenido del repositorio

Por ahora, encontrarás ejemplos como:

- Un **contador global** usando Zustand.
- Cómo estructurar tu **store** con TypeScript.
- Uso básico de Zustand en componentes.
- Uso de middlewares como **persistencia con localStorage**.

A medida que avance, iré agregando más ejemplos como:
- Manejo de datos asincrónicos con `fetch`.
- Múltiples stores.
- Selectores para optimizar renderizados.
- Uso con DevTools, etc.

---

##  Cómo ejecutar el proyecto

Este proyecto fue creado con **Vite** y usa **React + TypeScript**.

### 📦 Requisitos

- Node.js (v16 o superior)
- npm o yarn

### 🧪 Pasos para correr el proyecto:

1. **Clonar el repositorio**
```bash
git clone https://github.com/FOOR29/Zustand.git
```

2. **Entrar al directorio del proyecto**
```bash
cd Zustand
```

3. **Instalar las dependencias**
```bash
npm install
# o
yarn
```
4. **Levantar el servidor de desarrollo**
```bash
npm run dev
# o
yarn dev
```
---
<br>
<br>

# 🐻 Aprendiendo Zustand con React + TypeScript

💬 ¿Qué es Zustand?

Zustand es una librería para manejar el estado en React de forma sencilla y sin boilerplate. A diferencia de Redux o Context API, Zustand:

- Es más ligera y fácil de usar.

- No requiere reducers ni acciones verbosas.

- Se basa en hooks y es 100% compatible con TypeScript.

- "Zustand" significa "estado" en alemán 🧠

A diferencia de useState, que maneja estado local a cada componente, Zustand proporciona un estado centralizado que puede ser leído y modificado eficientemente desde diferentes partes de la aplicación.
***

## Instalación y configuración inicial

Para empezar a usar Zustand en un proyecto de React con Vite y TypeScript, sigue estos pasos:

1. **Crear el proyecto React con Vite: Por ejemplo, abre la terminal y ejecuta:**
```bash
npm create vite@latest mi-app-zustand
```
Esto crea un proyecto React + TypeScript usando Vite.

2. **Instalar Zustand: Una vez dentro de la carpeta del proyecto, instala la librería con:**
```bash
npm install zustand
```

3. **(Opcional) Configurar TypeScript: Zustand ya tiene tipos incluidos, así que no necesitas pasos extra; solo asegúrate de que tu entorno está configurado para TSX/TS.**
---

<br>
<br>

## Creación de un store con Zustand
La práctica común es crear un directorio dedicado **(por ejemplo, src/store/ o src/stores/)**
<br>
para los archivos de estado global
Dentro de esa carpeta, defines un archivo por cada store o **slice** de estado. Un ejemplo típico es un contador global: crearíamos ***src/store/counterStore.ts.*** Allí importamos create de zustand, definimos una interfaz de estado y funciones, y creamos el hook:

![Imagen vscode](./public/img/zustand%20img%201.png)

>En este ejemplo usamos TypeScript para definir CounterState con una propiedad count y dos métodos (increment, decrement). La función create recibe una función que recibe set (y get si se necesita) y devuelve el estado inicial junto con las funciones que modifican el estado. Al final exportamos el hook useCounterStore para usarlo en nuestros componentes.
Cada archivo de store suele tener un solo store (esto mejora la organización)y nombres descriptivos, p.ej. themeStore.ts, userStore.ts.

<br>

## Uso del store en componentes

Una vez definido el store, usarlo es muy sencillo. Simplemente importas el hook generado y lo invocas dentro de un componente para leer el estado o llamar acciones. Por ejemplo, en **App.tsx** podrías hacer:

![Imagen vscode](./public/img/zustand%20cap%202.png)

>Aquí ***useCounterStore()*** devuelve un objeto con ***{ count, increment, decrement }***. Cada vez que llamas a **increment()** o **decrement()**, el estado cambia y cualquier componente que use count se rerenderiza automáticamente.
Este comportamiento es análogo a usar useState en ese componente, pero la diferencia es que si otro componente también importa **useCounterStore**, compartirá el mismo estado global. En cambio, un **useState(0)** dentro de App mantendría su estado aislado solo para App.

<br>

## Estructura de carpetas recomendada
Una buena práctica es organizar el código por función o módulo. Para Zustand, lo habitual es:

- Crear una carpeta src/store/ o src/stores/ dedicada donde poner todos los archivos de stores

- Dentro, un archivo por store o por “slice” de estado. Por ejemplo, podrías tener:

```
src/
├─ components/
│   └─ ...componentes UI...
├─ store/
│   ├ themeStore.ts   // store de tema (claro/oscuro)
│   ├ userStore.ts    // store de usuario
│   └ counterStore.ts // store del contador de ejemplo
├─ App.tsx
└─ index.tsx
```
- Nombrar los archivos de forma descriptiva y consistente: por ejemplo themeStore.ts, cartStore.ts, userStore.ts.
Dentro de cada archivo, exporta el hook (usualmente en PascalCase, p.ej. useThemeStore)

- Mantener acciones y estado relacionados juntos en el mismo archivo (co-locación)

- En apps grandes, es común agrupar por dominios o páginas; pero para un proyecto pequeño o de práctica, la estructura anterior funciona bien y luego puede escalarse añadiendo directorios de características si hace falta
---

<br>

## Ejemplo práctico: botón Modo Oscuro/Claro con Zustand

Supongamos que queremos implementar un botón que alterna entre tema claro y oscuro en toda la app. Con Zustand, creamos un store para el tema. Por ejemplo, en src/store/themeStore.ts:

![image Vscode](./public/img/zustand%20cap%203.png)

Explicación paso a paso:

- Definimos el estado: darkMode es un booleano que indica si estamos en modo oscuro. Iniciamos en false (modo claro).

- Acción para alternar: toggleDarkMode invierte el valor de darkMode usando set.

- Persistencia (opcional): Usamos persist (de zustand/middleware) para que el valor de darkMode se guarde en localStorage. Así, si el usuario recarga la página, el tema elegido se mantiene y el parámetro name indica la clave bajo la cual se almacenará en el navegador, facilito papa.

Luego, en un componente React **(por ejemplo ThemeButton.tsx)**, importamos el hook y usamos los valores:

> Aquí el botón muestra “Modo claro” cuando estamos en modo oscuro (y viceversa) y al hacer clic dispara toggleDarkMode(), que actualiza el estado global. El hook useThemeStore() entrega siempre el mismo estado compartido y la función para cambiarlo. Gracias al middleware persist, esta preferencia de tema se recuerda incluso tras recargar la página.


## Ejemplos cotidianos de uso

Zustand brilla en situaciones donde varios componentes necesitan el mismo dato. Algunos ejemplos comunes:

- Preferencias del usuario: idioma seleccionado, tema (claro/oscuro), configuraciones personales, etc.

- Autenticación: estado de si el usuario está logueado, su token, roles, etc.

- Carrito de compras: lista de productos seleccionados que deben leerse/escribirse desde diferentes páginas o componentes.

- Datos de perfil o formularios: información que se rellena en varios pasos (multi-step) y debe compartirse en diferentes componentes.

- Contadores y métricas: un contador global (como el de las notificaciones) accesible desde cualquier parte de la interfaz.

En todos estos casos, usar useState local requeriría pasar props o contextos, mientras que con un store de Zustand bastaría con importar el hook y listo

## Resumen de pasos y buenas prácticas

- Instala Zustand: npm install zustand (ya lo explicamos)

- Crea el store: Define un archivo en src/store/ para cada conjunto de datos globales. Usa create() con una interfaz que describa tu estado y acciones

- Usa el hook en tus componentes: Importa el hook generado (p.ej. useThemeStore) y llama al hook dentro de la función de tu componente. Desestructura el estado y las funciones que necesites

- Estructura organizada: Mantén un directorio específico (src/store) y nombra los archivos de forma clara. Un store por archivo suele funcionar mejor

- Middleware útil: Considera usar el middleware persist si quieres que parte del estado (como la preferencia de tema) se guarde automáticamente en el navegado

Con estos consejos y ejemplos, deberías poder entender y aplicar Zustand en tu proyecto React con Vite/TypeScript. Es una herramienta poderosa para manejar estados compartidos de forma simple.
