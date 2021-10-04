import React from "react";
import "./login.css";
import icono from "../../imagenes/icono_login.png";
import "bootstrap/dist/css/bootstrap.min.css";
import Header_login from "../header_login/header_login";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
  let history = useHistory();

  const [datos, set_datos] = React.useState({
    username: "",
    password: "",
  });

  const token = "b72fc9eeca99a5b29c55433406fa1a28c5b000b0";
  const [state, setState] = React.useState(false);
  const [user, setUser] = React.useState([]);

  

  const capturar_datos = async (d) => {
    d.persist();
    await set_datos({ ...datos, [d.target.name]: d.target.value });
  };

  const api_url = "http://localhost:8000/api";

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`${api_url}/users/login/`, datos)
      .then((response) => {
        let res = response;
        setUser(res.data);
        if (res.status === 201) {
          setState(false);
          console.log(user);
          localStorage.setItem("token",user.access_token);
          //localStorage.setItem("user",user.user.username);
          history.push("/home");
        } else {
          setState(true);
          console.log(res);
        }
      })
      .catch((error) => {
        try {
          console.log(error.response.data);
        } catch (e) {
          console.log("Error", e);
        }

        setState(true);
      });
  };

  axios.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Token ${localStorage.getItem("token")}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <>
      {Header_login()}
      <h1 id="titulo_login">Acceso a comedor</h1>
      <div id="contenedor">
        <div id="contenedor_de_icono">
          <img src={icono} id="icono" />
        </div>

        <form onSubmit={submitHandler}>
          <label
            htmlFor="staticEmail"
            className="col-sm-2 col-form-label"
            id="dni_que_no_es_input"
          >
            DNI
          </label>
          <input
            type="text"
            id="dni"
            name="username"
            placeholder="DNI"
            className="form-control"
            onChange={capturar_datos}
          />

          <label
            htmlFor="inputPassword"
            className="col-sm-2 col-form-label"
            id="contraseña_que_no_es_input"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="contraseña"
            name="password"
            placeholder="Contraseña"
            className="form-control"
            onChange={capturar_datos}
          />

          <button
            id="boton_inicio_de_sesion"
            type="submit"
            value="Iniciar sesión"
          >
            {" "}
            Iniciar sesion{" "}
          </button>
        </form>

        {state === true && (
          <div
            id="mensaje_de_error_login"
            className="alert alert-danger"
            role="alert"
          >
            {" "}
            Credenciales invalidas
          </div>
        )}
      </div>
    </>
  );
};
export default Login;
