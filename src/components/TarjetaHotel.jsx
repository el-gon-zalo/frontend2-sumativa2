import { useState } from "react"
import { Link } from 'react-router-dom'

function TarjetaHotel({hotel}) {

    return <div className="card mt-4 card-primaria">
        <img src={hotel.img} className="card-img-top"/>
        <div className="card-body">            
            <h5 className="card-title">
                <p className="fs-3 fw-bold texto-primario" aria-current="page">{hotel.nombre}</p>
            </h5>
            <p className="card-text text-secondary">Ciudad: {hotel.ciudad}</p>
            <p className="card-text fs-5">Valor de referencia por noche: ${hotel.precio}</p>

            <div className="mt-auto pt-4">
 
                <Link to={"/hotel/" + hotel.id} className="btn btn-todos">
                    Ver detalle
                </Link>
 
            </div>
            
        </div>
    </div>
}

export default TarjetaHotel