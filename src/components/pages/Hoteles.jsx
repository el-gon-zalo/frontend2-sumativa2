import "./Hoteles.css"
import TarjetaHotel from '../TarjetaHotel'
import { Link } from 'react-router-dom'

function Hoteles({ hoteles }) {
    return <main className="contenido">
        <div className="subtitle fs-1 mt-5">Hoteles disponibles</div>
            
        <div className="hoteles-cont">
            {hoteles.map(hotel => (
                <TarjetaHotel key={hotel.id} hotel={hotel} />
            ))}
        </div>
    </main>  
}

export default Hoteles
