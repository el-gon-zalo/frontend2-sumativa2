import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Cargando from '../Cargando'
import useCarrito from '../hooks/useCarrito.js'

const fechas = [
    { id: 1, dia: '12 de diciembre', precio: 70000},
    { id: 2, dia: '19 de diciembre', precio: 84000},
    { id: 3, dia: '28 de diciembre', precio: 99900},
]

const OBTENER_HOTEL = `
    query ObtenerHotel($id: Int!) {
        hotel(id: $id) {
            nombre
            ciudad
            img
        }
    }
`



function FechasHoteles() {
    const { id } = useParams()
    return <DetalleFechasHoteles key={id} id={Number(id)} />
}


function DetalleFechasHoteles({ id }) {
    const [hotel, setHotel] = useState(null)
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

    const { estaReservada, agregarReserva, quitarReserva } = useCarrito()

    const alternarReserva = (fecha) => {
        const clave = `hotel-${id}-${fecha.id}`

        if (estaReservada(clave)) {
            quitarReserva(clave)
        } else {
            agregarReserva({
                clave,
                tipo: 'hotel',
                itemId: id,
                nombre: hotel.nombre,
                fechaId: fecha.id,
                dia: fecha.dia,
                precio: fecha.precio,
            })
        }
    }

    useEffect(() => {
        const controlador = new AbortController()

        async function obtenerHotel() {
            try {
                const respuesta = await fetch('/graphql', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        query: OBTENER_HOTEL,
                        variables: { id }
                    }),
                    signal: controlador.signal
                })

                if (!respuesta.ok) {
                    throw new Error('No se pudo cargar la ficha del hotel.')
                }

                const resultado = await respuesta.json()

                if (resultado.errors?.length) {
                    throw new Error(resultado.errors[0].message)
                }

                setHotel(resultado.data.hotel)
            } catch (error) {
                if (!controlador.signal.aborted) {
                    setError(error.message)
                }
            } finally {
                if (!controlador.signal.aborted) {
                    setCargando(false)
                }
            }
        }

        obtenerHotel()

        return () => controlador.abort()
    }, [id])

    return (
        <main className="contenido">
            {cargando ? (
                <Cargando />
            ) : error ? (
                <p role="alert">{error}</p>
            ) : hotel ? (
                <>
                    <h1 className="subtitle fs-1 fw-bold texto-primario mt-4">{hotel.nombre}</h1>
                    <img
                        src={hotel.img}
                        alt={`Portada de ${hotel.nombre}`}
                        className="img-fluid d-block mx-auto mb-3"
                        style={{ width: '400px' }}
                    />

                     <p className="card-text text-secondary">{hotel.subtitulo}</p>

                    <h2 className="fs-3 fw-bold texto-primario mt-4">Fechas disponibles</h2>

                    <ul className="list-group">
                        {fechas.map(f => {
                            const reservada = estaReservada(`hotel-${id}-${f.id}`)

                            return (
                                <li key={f.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <span>{f.dia}</span>
                                    <span className="fw-semibold">${f.precio.toLocaleString('es-CL')}</span>

                                    <button
                                        type="button"
                                        className={reservada ? "btn btn-todos btn-todos-activo" : "btn btn-todos"}
                                        onClick={() => alternarReserva(f)}
                                    >
                                        {reservada ? "Anular reserva" : "Reservar"}
                                    </button>
                                </li>
                            )
                        })}
                    </ul>


                    <div className="mt-5 d-flex justify-content-between w-100">
                        <Link to={`/hotel/${id}`} className="btn btn-todos">
                            Volver al hotel
                        </Link>
                        <Link to="/carrito" className="btn btn-todos">
                            Ver carrito
                        </Link>
                    </div>

                </>
            ) : (
                <p>Hotel no encontrado.</p>
            )}
        </main>
    )
}

export default FechasHoteles