import React from 'react'
import './login.css'
import icono from '../../imagenes/icono_login.png'
import "bootstrap/dist/css/bootstrap.min.css"
import Header_login from '../header_login/header_login'

const Login = () => {

    const [datos, set_datos] = React.useState({
        dni:"",
        contraseña:"",
    })
    
    const capturar_el_ingreso_de_datos = async d => {
        d.persist();
        await set_datos({...datos,[d.target.name]:d.target.value});
        console.log(datos);
    }

    return(
        <>
            {Header_login()}
            <h1 id="titulo_login">Acceso a comedor</h1>
            <div id="contenedor">

                <div id="contenedor_de_icono">
                    <img src={icono} id="icono"/>
                </div>

                <form>
                    <h3 id="dni_que_no_es_input">DNI</h3>
                    <input type="text" id="dni" name="dni" placeholder="DNI" className="form-control" onChange={capturar_el_ingreso_de_datos}/>

                    <h3 id="contraseña_que_no_es_input">Contraseña</h3>
                    <input type="password" id="contraseña" name="contraseña" placeholder="Contraseña" className="form-control" onChange={capturar_el_ingreso_de_datos}/>

                    <input id="boton_inicio_de_sesion" type="submit" value="Iniciar sesión"/>
                </form>

                {false &&
                    <div id="mensaje_de_error_login" className="alert alert-danger" role="alert">
                        DNI incorrecto
                    </div>
                }

            </div>
        </>
    )
}

export default Login;