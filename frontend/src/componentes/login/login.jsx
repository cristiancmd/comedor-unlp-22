import React from "react";
import "./login.css";
import icono from "../../imagenes/icono_login.png";
import "bootstrap/dist/css/bootstrap.min.css";
import Header_login from "../header_login/header_login";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

const Login = () => {
  let history = useHistory();

  let token = null;
  const setToken = (t) => {
    token = `Token ${t}`;
    console.log(token);
  };

  const setAxios =  () => {
     axios.interceptors.request.use(
      (config) => {
        config.headers.authorization = token;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  };

  useEffect(() => {}, [token]);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("user");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      setToken(user.access_token);
      
    }
  }, []);

  const [datos, set_datos] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = React.useState(false);
  const [user, setUser] = React.useState([]);
  const api_url = "http://localhost:8000/api";

  const capturar_datos = async (d) => {
    d.persist();
    await set_datos({ ...datos, [d.target.name]: d.target.value });
  };

  const login = async (credentials) => {
    const { data } = await axios.post(`${api_url}/users/login/`, credentials);
    console.log("la data es: ", data);
    
    return data;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const user = await login(datos);
      setUser(user);
      window.localStorage.setItem("user", JSON.stringify(user));
      setToken(user.access_token);
      setAxios();
      history.push("/menus");
    } catch (err) {
      if (error.response) {
        console.log("Error: ", err.response.data);
      } else {
        console.log("Sin conexion con API: ", err);
      }
      token = null;
      setError(true);
    }
  };

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

        {error === true && (
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
