import Vuelos from './Vuelos'
import Hoteles from './Hoteles'

function Inicio({ vuelos, hoteles }) {
    return (
        <>
            <Vuelos vuelos={vuelos} />
            <Hoteles hoteles={hoteles} />
        </>
    )
}

export default Inicio