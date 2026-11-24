import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Cargando from '../Cargando'
import useCarrito from '../hooks/useCarrito.js'

const fechas = [
    { id: 1, dia: '12 de diciembre', hora: '18:00', precio: 40000},
    { id: 2, dia: '19 de diciembre', hora: '12:45', precio: 30000},
    { id: 3, dia: '28 de diciembre', hora: '07:00', precio: 49900},
]

const OBTENER_VUELO = `
    query ObtenerVuelo($id: Int!) {
        vuelo(id: $id) {
            nombre
            subtitulo
            img
        }
    }
`



function FechasVuelos() {
    const { id } = useParams()
    return <DetalleFechasVuelos key={id} id={Number(id)} />
}


function DetalleFechasVuelos({ id }) {
    const [vuelo, setVuelo] = useState(null)
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)


    const { estaReservada, agregarReserva, quitarReserva } = useCarrito()

    const alternarReserva = (fecha) => {
    const clave = `vuelo-${id}-${fecha.id}`

    if (estaReservada(clave)) {
            quitarReserva(clave)
        } else {
            agregarReserva({
                clave,
                tipo: 'vuelo',
                itemId: id,
                nombre: vuelo.nombre,
                fechaId: fecha.id,
                dia: fecha.dia,
                hora: fecha.hora,
                precio: fecha.precio,
            })
        }   
    }

    useEffect(() => {
        const controlador = new AbortController()

        async function obtenerVuelo() {
            try {
                const respuesta = await fetch('/graphql', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        query: OBTENER_VUELO,
                        variables: { id }
                    }),
                    signal: controlador.signal
                })

                if (!respuesta.ok) {
                    throw new Error('No se pudo cargar la ficha del vuelo.')
                }

                const resultado = await respuesta.json()

                if (resultado.errors?.length) {
                    throw new Error(resultado.errors[0].message)
                }

                setVuelo(resultado.data.vuelo)
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

        obtenerVuelo()

        return () => controlador.abort()
    }, [id])

    return (
        <main className="contenido">
            {cargando ? (
                <Cargando />
            ) : error ? (
                <p role="alert">{error}</p>
            ) : vuelo ? (
                <>
                    <h1 className="subtitle fs-1 fw-bold texto-primario mt-4">{vuelo.nombre}</h1>
                    <img
                        src={vuelo.img}
                        alt={`Portada de ${vuelo.nombre}`}
                        className="img-fluid d-block mx-auto mb-3"
                        style={{ width: '400px' }}
                    />

                     <p className="card-text text-secondary">{vuelo.subtitulo}</p>

                    <h2 className="fs-3 fw-bold texto-primario mt-4">Fechas disponibles</h2>

                    <ul className="list-group">
                        {fechas.map(f => {
                            const reservada = estaReservada(`vuelo-${id}-${f.id}`)

                            return (
                                <li key={f.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <span>{f.dia}, {f.hora}</span>
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
                        <Link to={`/vuelo/${id}`} className="btn btn-todos">
                            Volver al vuelo
                        </Link>
                        <Link to="/carrito" className="btn btn-todos">
                            Ver carrito
                        </Link>
                       
                    </div>

                </>
            ) : (
                <p>Vuelo no encontrado.</p>
            )}
        </main>
    )
}

export default FechasVuelos