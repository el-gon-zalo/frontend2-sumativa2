SUMATIVA 2
---------------------

Aplicación web desarrollada con React que permite explorar vuelos hacia
distintos aeropuertos de Chile, consultar hoteles por ciudad y reservar
fechas disponibles, acumulando las reservas en un carrito con el total a
pagar.

El proyecto no usa un backend real: los datos son simulados con Mock
Service Worker (MSW), que intercepta las peticiones REST y GraphQL del
navegador.


FUNCIONES PRINCIPALES
---------------------

- Listado de vuelos y hoteles disponibles en la página de inicio, con
  tarjetas responsivas (3 columnas en escritorio, 2 en tablet y 1 en móvil).

- Ficha de detalle para cada vuelo y cada hotel (imagen, descripción y
  datos del destino), cargada mediante consultas GraphQL.

- Fechas disponibles por vuelo y por hotel, cada una con su precio.

- Reserva y anulación de fechas de forma individual. Es posible reservar
  varias fechas al mismo tiempo, tanto de vuelos como de hoteles.

- Carrito de reservas que distingue entre vuelos y hoteles, permite quitar
  elementos, vaciar el carrito y calcula automáticamente el total a pagar.

- Filtro de hoteles por ciudad: desde la ficha de un vuelo, el botón
  "Consultar hoteles" muestra solo los hoteles de ese destino.

- Formulario de contacto con validación básica (demostrativo, no envía
  datos a un servidor).

- Manejo de estados de carga y de error en las peticiones.


TECNOLOGIAS UTILIZADAS
----------------------

- React: construcción de la interfaz mediante componentes.
- Vite: entorno de desarrollo y empaquetado.
- React Router DOM: navegación entre páginas y parámetros de URL.
- Bootstrap 5: estilos y diseño responsivo.
- CSS personalizado: paleta de colores propia mediante variables CSS.
- Context API y hooks personalizados: estado global del carrito.
- GraphQL (consultas por fetch): detalle de vuelos y hoteles.
- REST (fetch): listados de vuelos y hoteles.
- MSW (Mock Service Worker): simulación de la API.


INSTALACION Y USO
-----------------

1. Instalar las dependencias:

   npm install

2. Iniciar el servidor de desarrollo:

   npm run dev

3. Abrir en el navegador la dirección que indica la terminal
   (normalmente http://localhost:5173).

Nota: MSW necesita el archivo del service worker en la carpeta public. Si
no existe, se genera con:

   npx msw init public/


ENDPOINTS DE LA APLICACION
----------------------

/                    Inicio (vuelos y hoteles)

/vuelos              Listado de vuelos

/vuelo/:id           Detalle de un vuelo

/vuelo/:id/fechas    Fechas y reservas de un vuelo

/hoteles             Listado de hoteles (admite ?ciudad=Nombre)

/hotel/:id           Detalle de un hotel

/hotel/:id/fechas    Fechas y reservas de un hotel

/carrito             Carrito de reservas y total a pagar

/contacto            Formulario de contacto
