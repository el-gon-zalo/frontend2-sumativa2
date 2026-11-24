import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Cargando from '../Cargando'


const OBTENER_HOTEL = `
    query ObtenerHotel($id: Int!) {
        hotel(id: $id) {
            nombre
            subtitulo
            precio
            img
            texto
        }
    }
`

function Hotel() {
    const { id } = useParams()
    return <DetalleHotel key={id} id={Number(id)} />
}

function DetalleHotel({ id }) {
    const [hotel, setHotel] = useState(null)
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

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
                    
                    <p className="card-text text-secondary">Ciudad: {hotel.ciudad}</p>
                    <p>Descripción: {hotel.texto}</p>
                    <p>Dirección: {hotel.direccion}</p>

                    <div className="mt-auto pt-4">
 
                        <Link to={`/hotel/${id}/fechas`} className="btn btn-todos btn-lg fs-6">
                            Ver reservas disponibles
                        </Link>
 
                     </div>
                </>
            ) : (
                <p>Hotel no encontrado.</p>
            )}

                    <div className="mt-auto pt-4">
 
                        <Link to={`/hoteles`} className="btn btn-todos mt-5">
                            Volver a hoteles
                        </Link>
 
                    </div>

        </main>
    )
}

export default Hotel
