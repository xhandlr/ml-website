# 🧠 Machine Learning Interactivo

Proyecto educativo interactivo desarrollado con **React + TypeScript + Vite**, centrado en conceptos clave de Machine Learning.

Este proyecto busca facilitar la comprensión de algoritmos mediante visualizaciones, diagramas interactivos y explicaciones paso a paso.

---

## 👥 Integrantes
- Carlos Pradenas
- Camille Elgueta

***

## 🚀 Tecnologías Utilizadas

- ⚛️ **React**: Una biblioteca de JavaScript para construir interfaces de usuario.
- 🟦 **TypeScript**: Un superconjunto de JavaScript que añade tipado estático.
- ⚡ **Vite**: Una herramienta de construcción rápida para proyectos web modernos.
- 🎨 **Tailwind CSS**: Un framework CSS de primera utilidad para un diseño rápido.

---

## ✅ Requisitos Mínimos

Para ejecutar este proyecto, necesitas tener instalado **Node.js** en tu sistema. Node.js incluye `npm` (Node Package Manager), que se utiliza para instalar las dependencias del proyecto.

-   **Node.js 22.x o superior**:
    *   Puedes descargarlo desde el sitio oficial: [Descargar Node.js](https://nodejs.org/es/download/)
    *   Para verificar si ya lo tienes instalado y cuál es tu versión, abre tu terminal o línea de comandos y ejecuta:
        ```bash
        node -v
        npm -v
        ```
    *   Si necesitas ayuda con la instalación, puedes consultar la guía oficial: [Guía de Instalación de Node.js](https://nodejs.org/es/docs/guides/getting-started-with-nodejs)

---

## 🛠️ Cómo Empezar (Instalación y Ejecución)

Sigue estos pasos para poner en marcha el proyecto en tu máquina local:

1.  **Clonar el Repositorio:**
    Abre tu terminal o línea de comandos y ejecuta el siguiente comando para descargar el código del proyecto:
    ```bash
    git clone https://github.com/xhandlr/ml-website.git
    ```

2.  **Navegar al Directorio del Proyecto:**
    Una vez clonado, entra a la carpeta del proyecto:
    ```bash
    cd ml-website
    ```

3.  **Instalar las Dependencias:**
    Este comando descargará todas las librerías y herramientas necesarias para que el proyecto funcione. Asegúrate de tener conexión a internet.
    ```bash
    npm install
    ```

4.  **Ejecutar el Servidor de Desarrollo:**
    Este comando iniciará un servidor local que te permitirá ver el proyecto en tu navegador.
    ```bash
    npm run dev
    ```

5.  **Abrir en el Navegador:**
    Una vez que el servidor esté en funcionamiento (verás un mensaje en la terminal indicando la URL), abre tu navegador web (Chrome, Firefox, Edge, etc.) y visita la siguiente direcci��n:
    ```
    http://localhost:5173
    ```
    ¡Listo! Deberías ver la aplicación interactiva de Machine Learning.

---

## 📂 Estructura del Proyecto

El proyecto sigue una estructura estándar de React con Vite:

-   `public/`: Contiene archivos estáticos que se sirven directamente.
-   `src/`: El código fuente principal de la aplicación.
    -   `assets/`: Imágenes y otros recursos estáticos.
    -   `components/`: Componentes reutilizables de React.
    -   `hooks/`: Hooks personalizados de React.
    -   `pages/`: Componentes que representan las diferentes páginas de la aplicación.
    -   `App.tsx`: El componente principal de la aplicación.
    -   `main.tsx`: El punto de entrada de la aplicación.
-   `package.json`: Define las dependencias del proyecto y los scripts de ejecución.
-   `tailwind.config.js`, `postcss.config.js`: Archivos de configuración de Tailwind CSS y PostCSS.
-   `vite.config.ts`: Archivo de configuración de Vite.
-   `tsconfig.json`: Archivos de configuración de TypeScript.

---

## ©️ Licencia

Este proyecto está bajo la licencia MIT. Es libre para uso personal y educativo.