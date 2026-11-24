import "./Header.css"
import {Link} from 'react-router-dom'
import logo from "../../public/img/logo.jpg";


function Header() {
    return <div className="barracustom navbar navbar-expand-sm text-white">
        <div className="container-fluid">
            <a className="navbar-brand title" href="#">
                
                <img
                    src={logo}
                    alt="Logo La Tiendita"
                    width="54"   
                    height="50"
                    className="mx-auto rounded-circle"
                    title="Logo"
                    loading="lazy"
                />

            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-0 mb-lg-0 ">
                    <li className="nav-item">
                        <Link to="/" className="nav-link active text-white" aria-current="page">Inicio</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/vuelos" className="nav-link active text-white" aria-current="page">Destinos</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/hoteles" className="nav-link active text-white">Hoteles</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/carrito" className="nav-link active text-white" aria-current="page">Carrito</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/contacto" className="nav-link active text-white" aria-current="page">Contacto</Link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
}

export default Header