# Proyecto **Vite** con React para `BIOS`

---

## TO DO LIST REACT PROJECT

### To-Do List

Una aplicación simple de **To-Do List** desarrollada en React y configurada con **Vite**. Permite a los usuarios agregar, marcar como completadas y eliminar tareas. Este proyecto es ideal para comprender los conceptos básicos de React, como componentes, estado y eventos, usando Vite para un entorno de desarrollo más rápido.

### Características

- **Añadir Tareas:** Permite agregar nuevas tareas a la lista.
- **Marcar Completadas:** Posibilidad de marcar tareas como completadas.
- **Eliminar Tareas:** Función para eliminar tareas individuales.
- **Interfaz Intuitiva:** Fácil de usar y adaptada para dispositivos móviles.

### Requisitos Previos

Asegúrate de tener instalados los siguientes programas antes de comenzar:

- **Node.js**: [Descargar aquí](https://nodejs.org/)
- **npm**: Node Package Manager, que viene incluido con Node.js.

### Instrucciones de Instalación

1. **Clonar el Repositorio:**

   ```bash
   git clone https://github.com/AgustinVelazquez0/Todo_List_Front.git

   ```

2. **Navegar al Directorio del Proyecto:**

   ```bash
   cd ReactToDoList
   ```

3. **Instalar Dependencias:**
   Ejecuta el siguiente comando para instalar todas las dependencias necesarias:

   ```bash
   npm install
   ```

4. **Ejecutar la Aplicación en Modo de Desarrollo:**
   Inicia la aplicación con el comando:
   ```bash
   npm run dev
   ```

## Estructura del Proyecto

- **`src/`**: Contiene todos los archivos de la aplicación.

- **`components/`**: Contiene los componentes reutilizables de React. Cada componente tiene su propio archivo y, cuando es necesario, un archivo de estilos utilizando **CSS Modules** para mantener el diseño encapsulado. Destacan:

  - `AddTodoForm`: Formulario para agregar nuevas tareas.
  - `TodoItem`: Representa un ítem individual de la lista de tareas.
  - `TodoList`: Muestra la lista completa de tareas.
  - `LoginForm`: Formulario para el inicio de sesión.
  - `ProtectedRoute`: Protege las rutas que requieren autenticación.

  - **`context/`**: Almacena los **Contextos de React**, que permiten compartir el estado global de la aplicación. Por ejemplo, `AuthContext` gestiona la autenticación de los usuarios.

- **`hooks/`**: Incluye **custom hooks** personalizados para abstraer lógica compleja. Por ejemplo:

  - `useAuth`: Maneja la lógica relacionada con la autenticación.
  - `useTodo`: Gestiona las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) de las tareas.

- **`assets/`**: Contiene recursos estáticos como imágenes o íconos utilizados en la interfaz.

- **`BackEnd/`**: Incluye un archivo `db.json` que simula un backend para realizar pruebas locales sin necesidad de una base de datos externa.

- **`App.jsx`**: Es el componente principal que define la estructura general de la aplicación, integrando el sistema de rutas y los contextos.

- **`main.jsx`**: Es el punto de entrada de la aplicación, donde React monta la aplicación en el DOM.

---

## Back-End con MongoDB

Además, he desarrollado un back-end para este proyecto utilizando MongoDB, el cual se encuentra en un repositorio separado y público. Este back-end permite la persistencia de datos, como las tareas creadas por los usuarios. Puedes explorar ese repositorio en el siguiente enlace: `https://github.com/AgustinVelazquez0/Todo_List_Back`

## Tecnologías Utilizadas

- **React**: Librería de JavaScript para construir la interfaz de usuario.
- **Vite**: Herramienta de construcción rápida para desarrollo.
- **CSS**: Estilos básicos para la interfaz.
- **JavaScript**: Lógica de la aplicación.

## Próximas Mejoras

- **Filtros de Búsqueda**: Añadir un filtro para buscar tareas por nombre o estado (completado/pendiente).
- **Notificaciones**: Incluir notificaciones para recordar tareas pendientes.

## Contribución

Las contribuciones son bienvenidas. Puedes crear un **fork** del proyecto, hacer tus cambios y enviar un **pull request**.
