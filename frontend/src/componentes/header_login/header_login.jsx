import './header_login.css'
import icono_facultad from '../../imagenes/icono_facultad.png'
import icono_home from '../../imagenes/icono_home.png'
import { Link } from 'react-router-dom';

const Header_login = () => {
    return(
        <>
            <div id="contenedor_de_icono_facultad">
                <img src={icono_facultad} id="icono_facultad"/>
            </div>
            <div id="contenedor_de_barra_de_navegacion">
            </div>
        </>
    )
}

export default Header_login;