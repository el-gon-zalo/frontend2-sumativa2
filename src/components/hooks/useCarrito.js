import { useContext } from 'react'
import CarritoContext from '../../context/CarritoContext.js'

function useCarrito() {
    const contexto = useContext(CarritoContext)

    if (!contexto) {
        throw new Error('useCarrito debe utilizarse dentro de un CarritoProvider.')
    }

    return contexto
}

export default useCarrito