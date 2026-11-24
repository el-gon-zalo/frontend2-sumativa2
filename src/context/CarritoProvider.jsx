import { useState } from 'react'
import CarritoContext from './CarritoContext.js'

function CarritoProvider({ children }) {
    const [items, setItems] = useState([])

    const estaReservada = (clave) => items.some(item => item.clave === clave)

    const agregarReserva = (reserva) => {
        setItems(actuales =>
            actuales.some(item => item.clave === reserva.clave)
                ? actuales
                : [...actuales, reserva]
        )
    }

    const quitarReserva = (clave) => {
        setItems(actuales => actuales.filter(item => item.clave !== clave))
    }

    const vaciarCarrito = () => setItems([])

    const total = items.reduce((suma, item) => suma + item.precio, 0)

    return (
        <CarritoContext.Provider
            value={{ items, total, estaReservada, agregarReserva, quitarReserva, vaciarCarrito }}
        >
            {children}
        </CarritoContext.Provider>
    )
}

export default CarritoProvider