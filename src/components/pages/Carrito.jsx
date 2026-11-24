import { Link } from 'react-router-dom'
import useCarrito from '../hooks/useCarrito'

function Carrito() {
    const { items, total, quitarReserva, vaciarCarrito } = useCarrito()

    return (
        <main className="contenido">
            <h1 className="subtitle fs-1 fw-bold texto-primario mt-4">Carrito</h1>

            <img
                src="/img/carrito.jpg"
                alt="Logo Carrito"
                width="120"
                height="120"
                className="d-block mx-auto mb-4"
                title="Logo"
                loading="lazy"
            />

            {items.length === 0 ? (
                <p className="text-secondary">Aún no tienes reservas en el carrito.</p>
            ) : (
                <>
                    <ul className="list-group">
                        {items.map(item => (
                            <li key={item.clave} className="list-group-item d-flex justify-content-between align-items-center">
                                <span className="text-start">
                                    <span className="badge badge-primario me-2">
                                        {item.tipo === 'vuelo' ? 'Vuelo' : 'Hotel'}
                                    </span>
                                    <strong>{item.nombre}</strong><br />
                                    <small className="text-secondary">
                                        {item.dia}{item.hora ? `, ${item.hora}` : ''}
                                    </small>
                                </span>
                                <span className="fw-semibold">${item.precio.toLocaleString('es-CL')}</span>
                                <button
                                    type="button"
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => quitarReserva(item.clave)}
                                >
                                    Quitar
                                </button>
                            </li>
                        ))}
                    </ul>

                    <p className="fs-4 fw-bold mt-4">
                        Total a pagar: <span className="texto-primario">${total.toLocaleString('es-CL')}</span>
                    </p>

                </>
            )}

            <div className="mt-5 d-flex justify-content-center gap-3">
                <Link to="/vuelos" className="btn btn-todos">Ver destinos</Link>
                <Link to="/hoteles" className="btn btn-todos">Ver hoteles</Link>
            </div>
        </main>
    )
}

export default Carrito