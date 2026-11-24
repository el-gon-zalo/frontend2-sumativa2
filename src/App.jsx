import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import PiePagina from './components/PiePagina'
import Contacto from './components/pages/Contacto'
import Vuelo from './components/pages/Vuelo'
import Vuelos from './components/pages/Vuelos'
import FechasVuelos from './components/pages/FechasVuelos'
import Hotel from './components/pages/Hotel'
import Hoteles from './components/pages/Hoteles'
import FechasHoteles from './components/pages/FechasHoteles'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Cargando from './components/Cargando'
import CarritoProvider from './context/CarritoProvider'
import Carrito from './components/pages/Carrito'
import Inicio from './components/pages/Inicio'

function App() {
  const [vuelos, setVuelos] = useState([])
  const [hoteles, setHoteles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const [resVuelos, resHoteles] = await Promise.all([
          fetch("/api/vuelos"),
          fetch("/api/hoteles"),
        ])

        if (!resVuelos.ok) {
          throw new Error("Error al cargar los vuelos")
        }

        if (!resHoteles.ok) {
          throw new Error("Error al cargar los hoteles")
        }

        setVuelos(await resVuelos.json())
        setHoteles(await resHoteles.json())

      } catch (error) {
        setError(error.message)

      } finally {
        setLoading(false)
      }
    }

    obtenerDatos()
  }, [])

  return (
    <Router>
      <CarritoProvider>
        <Header />
        <Hero />

        {loading ? (
          <Cargando />
        ) : error ? (
          <div style={{ color: "red", fontWeight: "bolder" }}>
            <img style={{ width: "30px" }} src="/img/warning.png" alt="Advertencia" />&nbsp;
            No se pudo cargar los datos.
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Inicio vuelos={vuelos} hoteles={hoteles} />} />
            <Route path="/vuelos" element={<Vuelos vuelos={vuelos} setVuelos={setVuelos} />} />
            <Route path="/vuelo/:id" element={<Vuelo />} />
            <Route path="/vuelo/:id/fechas" element={<FechasVuelos />} />

            <Route path="/hoteles" element={<Hoteles hoteles={hoteles} setHoteles={setHoteles} />} />
            <Route path="/hotel/:id" element={<Hotel />} />
            <Route path="/hotel/:id/fechas" element={<FechasHoteles />} />

            <Route path="/contacto" element={<Contacto />} />
            <Route path="/carrito" element={<Carrito />} />
          </Routes>
        )}

        <PiePagina />
      </CarritoProvider>
    </Router>
  )
}

export default App