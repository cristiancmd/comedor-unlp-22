import './header.css'
import icono_facultad from '../../imagenes/icono_facultad.png'
import icono_home from '../../imagenes/icono_home.png'
import { Link } from 'react-router-dom'

const Header = () => {
    return(
        <>
            <div id="contenedor_de_icono_facultad_header">
                <img src={icono_facultad} id="icono_facultad"/>
            </div>
            <div id="contenedor_de_barra_de_navegacion_header">
                <Link to={"/home"}><img src={icono_home} id="icono_home"/></Link>
                <Link to={"/listado_de_menus"}><h5 className="boton">Menús</h5></Link>
                <Link to={"/listado_de_componentes"}><h5 className="boton">Platos</h5></Link>
                <Link to={"/listados"}><h5 className="boton">Listados</h5></Link>
                <div id="contenedor_cerrar_sesion">
                    <button type="button" className="btn btn-outline-light" id="cerrar_sesion"><h5>Cerrar sesión</h5></button>
                </div>
            </div>
        </>
    )
}

export default Header;