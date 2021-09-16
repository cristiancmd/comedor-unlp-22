import React from 'react'
import './login.css'
import icono from '../../imagenes/icono_login.jpg'
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
        <div className="wrapper fadeInDown">
            <div id="formContent">

                <div className="fadeIn first">
                    <img src={icono} id="icon" alt="User Icon" />
                </div>

                <form>
                    <input type="text" id="dni" className="fadeIn second" name="dni" placeholder="DNI" onChange={capturar_el_ingreso_de_datos}/>
                    <input type="password" id="password" className="fadeIn third" name="password" placeholder="Password" onChange={capturar_el_ingreso_de_datos}/>
                    <br/>
                    <br/>
                    <input type="submit" className="fadeIn fourth" value="Log In"/>
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