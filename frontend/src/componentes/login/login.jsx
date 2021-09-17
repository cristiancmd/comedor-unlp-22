import React from 'react'
import './login.css'
import icono from '../../imagenes/icono_login.png'
import "bootstrap/dist/css/bootstrap.min.css"

const Login = () => {

    const [datos, set_datos] = React.useState({
        dni:"",
        password:"",
    })
    
    const capturar_el_ingreso_de_datos = async d => {
        d.persist();
        await set_datos({...datos,[d.target.name]:d.target.value});
        console.log(datos);
    }

    return(
        <div id="el_wrapper" className="wrapper fadeInDown">
            <div id="formContent">

                <div id="contenedor_de_icono" className="fadeIn first">
                    <img src={icono} id="icon" alt="User Icon" />
                </div>

                <form>
                    <h3 id="dni_que_no_es_input">DNI</h3>
                    <input type="text" id="dni" className="fadeIn second" name="dni" placeholder="DNI" onChange={capturar_el_ingreso_de_datos}/>
                    <h3 id="contraseña_que_no_es_input">Contraseña</h3>
                    <input type="password" id="password" className="fadeIn third" name="password" placeholder="Contraseña" onChange={capturar_el_ingreso_de_datos}/>
                    <br/>
                    <br/>
                    <input id="boton_inicio_de_sesion" type="submit" className="fadeIn fourth" value="Iniciar sesión"/>
                </form>

                {false &&
                    <div className="alert alert-danger" role="alert">
                        DNI incorrecto
                    </div>
                }

            </div>
        </div>
    )
}

export default Login;