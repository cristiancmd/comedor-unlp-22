import './header_login.css'
import icono_facultad from '../../imagenes/icono_facultad.png'

const Header_login = () => {
    return(
        <>
            <div id="contenedor_de_icono_facultad_header_login">
                <img src={icono_facultad} id="icono_facultad"/>
            </div>
            <div id="contenedor_de_barra_de_navegacion_header_login">
            </div>
        </>
    )
}

export default Header_login;