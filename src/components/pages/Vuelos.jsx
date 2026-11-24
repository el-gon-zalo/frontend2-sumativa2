import "./Vuelos.css"
import TarjetaVuelo from '../TarjetaVuelo'
import { Link } from 'react-router-dom'

function Vuelos({ vuelos }) {
    return <main className="contenido">
        <div className="subtitle fs-1 mt-5">Vuelos disponibles</div>
            
        <div className="vuelos-cont">
            {vuelos.map(vuelo => (
                <TarjetaVuelo key={vuelo.id} vuelo={vuelo} />
            ))}
        </div>
    </main>  
}

export default Vuelos
