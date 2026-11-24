import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Cargando from '../Cargando'


const OBTENER_VUELO = `
    query ObtenerVuelo($id: Int!) {
        vuelo(id: $id) {
            nombre
            subtitulo
            precio
            img
            texto
        }
    }
`

function Vuelo() {
    const { id } = useParams()
    return <DetalleVuelo key={id} id={Number(id)} />
}

function DetalleVuelo({ id }) {
    const [vuelo, setVuelo] = useState(null)
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState(null)

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
                    <p>Descripción: {vuelo.texto}</p>

                    <div className="mt-auto pt-4">
 
                        <Link to={`/vuelo/${id}/fechas`} className="btn btn-todos btn-lg fs-6">
                            Ver fechas disponibles
                        </Link>
 
                     </div>
                </>
            ) : (
                <p>Vuelo no encontrado.</p>
            )}


                    <div className="mt-5 d-flex justify-content-between w-100">
 
                        <Link to={`/vuelos`} className="btn btn-todos mt-5">
                            Volver a destinos
                        </Link>

                        <Link to={`/hoteles`} className="btn btn-todos mt-5">
                            Consultar hoteles
                        </Link>
 
                    </div>

        </main>
    )
}

export default Vuelo
