import { useState } from "react"
import { Link } from 'react-router-dom'

function TarjetaVuelo({vuelo}) {

    return <div className="card mt-4 card-primaria">
        <img src={vuelo.img} className="card-img-top"/>
        <div className="card-body">            
            <h5 className="card-title">
                <p className="fs-3 fw-bold texto-primario" aria-current="page">{vuelo.nombre}</p>
            </h5>
            <p className="card-text text-secondary">{vuelo.subtitulo}</p>
            <p className="card-text fs-5">Valor de referencia desde SCL: ${vuelo.precio}</p>

            <div className="mt-auto pt-4">
 
                <Link to={"/vuelo/" + vuelo.id} className="btn btn-todos">
                    Ver detalle
                </Link>
 
            </div>

        {/*

        {!enCarrito ? (
                        <button type="button" className="btn btn-todos" onClick={() => setEnCarrito(true)}>
                        Ver detalle
                        </button>
                    ) : (
                        <button type="button" className="btn btn-todos btn-todos-activo" onClick={() => setEnCarrito(false)}>
                        Reservado
                        </button>
                    )}

        */}
            

            

            {/*
           {!enCarrito ? (
            <a href="#" className="btn btn-todos rounded-pill" onClick={() => setEnCarrito(true)}>
                Ver detalle
            </a>
            ) : (
            <a href="#" className="btn btn-todos btn-todos-activo rounded-pill" onClick={() => setEnCarrito(false)}>
                En Carrito
            </a>
            )}
            */}
            
        </div>
    </div>
}

export default TarjetaVuelo