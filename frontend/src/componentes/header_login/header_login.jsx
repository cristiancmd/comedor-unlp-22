import './header_login.css'
import icono_facultad from '../../imagenes/icono_facultad.png'

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