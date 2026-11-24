import { http, HttpResponse, delay } from 'msw';
import { graphql } from 'msw/graphql';

const apiGraphQL = graphql.link('/graphql');

const dataVuelos = [
    {
        id: 1,
        nombre: "Arica",
        img: "/img/destinos/arica.jpg",
        subtitulo: "Aeropuerto Internacional Chacalluta. Chile (ARI)",
        precio: 50000,
        texto: "El Aeropuerto Internacional Chacalluta (códigos IATA: ARI / OACI: SCAR) es el principal terminal aéreo de la Región de Arica y Parinacota, en el extremo norte de Chile."
    },
    {
        id: 2,
        nombre: "Iquique",
        img: "/img/destinos/iquique.jpg",
        subtitulo: "Aeropuerto Internacional Diego Aracena. Chile (IQQ)",
        precio: 40000,
        texto: "El Aeropuerto Internacional Diego Aracena (IATA: IQQ, OACI: SCDA), antes conocido como Chucumata, es el principal terminal aéreo de la Región de Tarapacá, en el norte de Chile. Está ubicado sobre una planicie costera a unos 45 km al sur de la ciudad de Iquique, conectado por la Ruta 1 en un trayecto de 35 a 50 minutos."
    },
    {
        id: 3,
        nombre: "Antofagasta",
        img: "/img/destinos/antofagasta.jpg",
        subtitulo: "Aeropuerto Internacional Andrés Sabella. Chile (ANF)",
        precio: 35000,
        texto: "El Aeropuerto Andrés Sabella (códigos ANF / SCFA), conocido históricamente como Cerro Moreno, es el principal terminal aéreo de la Región de Antofagasta, Chile, y opera de forma combinada para aviación comercial, carga y actividades militares."
    },
    {
        id: 4,
        nombre: "Santiago",
        img: "/img/destinos/santiago.webp",
        subtitulo: "Aeropuerto Internacional Arturo Merino Benítez. Chile (SCL)",
        precio: 0,
        texto: "El Aeropuerto Internacional Arturo Merino Benítez (SCL / SCEL), ubicado en la comuna de Pudahuel a unos 17 km del centro de Santiago, es el principal terminal aéreo de Chile y uno de los más relevantes de Sudamérica."
    },
    {
        id: 5,
        nombre: "Puerto Montt",
        img: "/img/destinos/puertomontt.jpg",
        subtitulo: "Aeropuerto El Tepual. Chile (PMC)",
        precio: 37990,
        texto: "El Aeropuerto Internacional El Tepual (códigos IATA: PMC / OACI: SCTE) es el principal terminal aéreo de Puerto Montt y una de las puertas de entrada al sur de Chile y la Patagonia. Está ubicado unos 20 km al noroeste del centro de la ciudad, en la Región de Los Lagos."
    },
    {
        id: 6,
        nombre: "Punta Arenas",
        img: "/img/destinos/puntarenas.webp",
        subtitulo: "Aeropuerto Internacional Presidente Carlos Ibáñez del Campo. Chile (PUQ)",
        precio: 48990,
        texto: "El Aeropuerto Internacional Presidente Carlos Ibáñez del Campo (códigos PUQ / SCCI) es el principal terminal aéreo de la Región de Magallanes y de la Antártica Chilena, ubicado unos 20 km al norte del centro de Punta Arenas por la Ruta 9."
    }
];


const dataHoteles = [
    {
        id: 1,
        nombre: "Hotel Diego de Almagro Arica",
        img: "/img/hoteles/diegodealmagroarica.jpg",
        ciudad: "Arica",
        precio: 87000,
        texto: "El Hotel Diego de Almagro Arica es un hotel de 4 estrellas ubicado frente al mar en el sector de playa Chinchorro / playa Las Machas, en Ing. Raúl Pey Casado 3105, Arica. Combina descanso costero, instalaciones recreativas y espacios para eventos.",
        direccion: ""
    },
     {
        id: 2,
        nombre: "Hotel Arica",
        img: "/img/hoteles/hotelarica.webp",
        ciudad: "Arica",
        precio: 68000,
        texto: "Hotel Arica es un hotel de 4 estrellas frente al mar ubicado en Av. Comandante San Martín 599, entre las playas El Laucho y La Lisera, con tarifas estimadas desde CLP 76.563 por noche (2 adultos).",
        direccion: ""
    },
      {
        id: 3,
        nombre: "Hotel Terrado Cavancha",
        img: "/img/hoteles/hotelterrado.webp",
        ciudad: "Iquique",
        precio: 50000,
        texto: "El Hotel Terrado Cavancha es un hotel de 4 estrellas y 19 pisos ubicado en Av. Tadeo Haenke 1010, Iquique, a pasos de Playa Cavancha y cerca del Casino de Iquique. Inaugurado en 2015, destaca por su arquitectura moderna y vistas hacia la costa.",
        direccion: "Av. Tadeo Haenke 1010, Iquique, Tarapacá"
    },
      {
        id: 4,
        nombre: "Studio 56 Apart Hotel by Terrado Iquique",
        img: "/img/hoteles/studio56.jpg",
        ciudad: "Iquique",
        precio: 65000,
        texto: "Studio 56 Apart Hotel by Terrado es una marca de apart hoteles de la cadena Terrado en el norte de Chile, con sedes en Iquique y Antofagasta, orientada a estancias largas, viajes de trabajo y escapadas cerca de la costa.",
        direccion: "Av. Emilio Recabarren (Ex Av. Aeropuerto) 2873, Playa Brava, Iquique"
    },
      {
        id: 5,
        nombre: "Hotel Antofagasta",
        img: "/img/hoteles/hotelantofagasta.jpg",
        ciudad: "Antofagasta",
        precio: 98000,
        texto: "El Hotel Antofagasta es un hotel clásico de 4 estrellas ubicado frente al océano Pacífico en el centro de Antofagasta (Av. Balmaceda 2634 / Balmaceda 2575), inaugurado en 1953 y reconocido por combinar su historia con instalaciones renovadas.",
        direccion: "Av. Balmaceda 2634, Antofagasta"
    },
      {
        id: 6,
        nombre: "Hotel NH Antofagasta",
        img: "/img/hoteles/hotelnhantofagasta.webp",
        ciudad: "Antofagasta",
        precio: 56000,
        texto: "El Hotel NH Antofagasta es un hotel de 4 estrellas orientado tanto a viajes de negocios como a estadías de descanso, ubicado en el sector sur costero de Antofagasta (Av. Ejército 01151).",
        direccion: "Av. Ejército 01151, 1240000 Antofagasta"
    },
     {
        id: 7,
        nombre: "Hotel Santa Lucia",
        img: "/img/hoteles/hotelsantalucia.jpg",
        ciudad: "Santiago",
        precio: 60000,
        texto: "El Hotel Santa Lucía es un hotel informal de 3 estrellas ubicado en el centro de Santiago, Chile (Huérfanos 779, a pocas cuadras de la Plaza de Armas y el Cerro Santa Lucía), conocido por su ubicación céntrica, tranquilidad interior y restaurante con patio arbolado.",
        direccion: "Paseo Huerfanos 779, Centro de Santiago, Santiago"
    },
    {
        id: 8,
        nombre: "Hotel Luciano K",
        img: "/img/hoteles/hotellucianok.jpg",
        ciudad: "Santiago",
        precio: 139000,
        texto: "Luciano K Hotel es un hotel boutique de 38 habitaciones en el barrio Lastarria, Santiago de Chile, que combina arquitectura histórica de los años 20 y diseño Art Déco con comodidades modernas. El edificio fue diseñado por el arquitecto chileno Luciano Kulczewski y destacó en su época por ser una de las construcciones más altas del país y pionera en incorporar ascensor y calefacción central.",
        direccion: "Merced 84, Barrio Lastarria, Santiago - Chile"
    },
    {
        id: 9,
        nombre: "Hotel Gran Pacifico - Puerto Montt",
        img: "/img/hoteles/hotelgranpacificopuertomontt.jpg",
        ciudad: "Puerto Montt",
        precio: 99000,
        texto: "El Hotel Gran Pacífico es un hotel de 4 estrellas ubicado en el centro de Puerto Montt (Urmeneta 719), con vistas panorámicas a la bahía y al océano Pacífico. Destaca por su edificio de 10 pisos, cercanía a la costanera y servicios orientados tanto a viajeros de placer como de negocios.",
        direccion: "Urmeneta, 719, Puerto Montt"
    },
    {
        id: 10,
        nombre: "Courtyard by Marriott Puerto Montt",
        img: "/img/hoteles/courtyard.jpg",
        ciudad: "Puerto Montt",
        precio: 120000,
        texto: "El Courtyard by Marriott Puerto Montt es un hotel urbano de 4 estrellas ubicado en la capital de la Región de Los Lagos, Chile, orientado tanto a viajes de negocios como a turismo por el sur del país.",
        direccion: "Avenida Seminario 252, Puerto Montt, Región de Los Lagos."
    },
    {
        id: 11,
        nombre: "Hotel Diego de Almagro Punta Arenas",
        img: "/img/hoteles/diegodealmagropuntaarenas.jpg",
        ciudad: "Punta Arenas",
        precio: 168000,
        texto: "El Hotel Diego de Almagro Punta Arenas es un hotel de 4 estrellas ubicado en Av. Cristóbal Colón 1290, frente a la costanera y a orillas del Estrecho de Magallanes. Está orientado tanto a turistas como a viajeros de negocios.",
        direccion: "Avenida Colón, 1290, Punta Arenas"
    },
    {
        id: 12,
        nombre: "Hotel Cabo de Hornos",
        img: "/img/hoteles/hotelcabodehornos.jpg",
        ciudad: "Punta Arenas",
        precio: 343000,
        texto: "El Hotel Cabo de Hornos es un hotel de 4 estrellas emblemático ubicado frente a la Plaza Muñoz Gamero (Plaza de Armas) en el centro de Punta Arenas, Región de Magallanes, Chile. Inaugurado en 1962, es uno de los íconos arquitectónicos y hoteleros más representativos de la Patagonia chilena.",
        direccion: "Plaza Benjamín Muñoz Gamero 1039, Punta Arenas"
    },
    {
        id: 13,
        nombre: "Hotel Albatros",
        img: "/img/hoteles/albatros.jpg",
        ciudad: "Punta Arenas",
        precio: 105000,
        texto: "Hotel Albatros (también conocido como Hotel Albatros Patagonia) es un hotel de 3 estrellas ubicado en el centro de Punta Arenas, en Armando Sanhueza 1248, que destaca por su ambiente acogedor, desayuno incluido y cercanía a zonas comerciales y puntos turísticos de la ciudad.",
        direccion: "Armando Sanhueza 1248, Punta Arenas"
    }
];


export const handlers = [
    // ---- Vuelos ----
    http.get("/api/vuelos", async () => {
        await delay(1000);
        return HttpResponse.json(dataVuelos);
    }),
    apiGraphQL.query('ObtenerVuelo', ({ variables }) => {
        const vuelo = dataVuelos.find(v => v.id === variables.id);

        return HttpResponse.json({
            data: {
                vuelo: vuelo
                    ? {
                        nombre: vuelo.nombre,
                        subtitulo: vuelo.subtitulo,
                        precio: vuelo.precio,
                        img: vuelo.img,
                        texto: vuelo.texto,
                    }
                    : null
            }
        });
    }),

    // ---- Hoteles ----
    http.get("/api/hoteles", async ({ request }) => {
        await delay(1000);
        const ciudad = new URL(request.url).searchParams.get('ciudad');
        const resultado = ciudad
            ? dataHoteles.filter(h => h.ciudad === ciudad)
            : dataHoteles;
        return HttpResponse.json(resultado);
    }),
    apiGraphQL.query('ObtenerHotel', ({ variables }) => {
        const hotel = dataHoteles.find(h => h.id === variables.id);

        return HttpResponse.json({
            data: {
                hotel: hotel
                    ? {
                        nombre: hotel.nombre,
                        ciudad: hotel.ciudad,
                        precio: hotel.precio,
                        img: hotel.img,
                        texto: hotel.texto,
                        direccion: hotel.direccion,
                    }
                    : null
            }
        });
    }),
];