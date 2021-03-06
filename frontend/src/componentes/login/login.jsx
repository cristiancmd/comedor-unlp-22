import React from "react";
import "./login.css";
import icono from "../../imagenes/icono_login.png";
import "bootstrap/dist/css/bootstrap.min.css";
import Header_login from "../header_login/header_login";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../UserContext";
import { Spinner } from "react-bootstrap";

const Login = () => {
  let history = useHistory();
  const [verificando, set_verificando] = React.useState(false);

  let token = null;
  const setToken = (t) => {
    token = `Token ${t}`;
    // console.log(token);
  };

  const { user, loginUser } = useContext(UserContext);

  const setAxios = () => {
    axios.interceptors.request.use(
      (config) => {
        config.headers.authorization = `Token ${user.access_token}`;
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
    if (
      loggedUser != null &&
      Object.entries(loggedUser).length > 0 &&
      loggedUser.constructor === Object
    ) {
      console.log(loggedUser);
      const u = JSON.parse(loggedUser);
      loginUser(u);
      setAxios();
      setToken(u.access_token);
      console.log(u);
    }
  });

  const [datos, set_datos] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = React.useState(false);
  // const [user, setUser] = React.useState([]);
  const api_url = "http://localhost:8000/api";

  const capturar_datos = async (d) => {
    d.persist();
    await set_datos({ ...datos, [d.target.name]: d.target.value });
  };

  const login = async (credentials) => {
    set_verificando(true);
    const { data } = await axios.post(`${api_url}/users/login/`, credentials);

    return data;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(false);

    try {
      const user = await login(datos);
      loginUser(user);
      window.localStorage.setItem("user", JSON.stringify(user));
      setToken(user.access_token);
      // setAxios();
      if (user.user.is_staff) {
        history.push("/");
        set_verificando(false);
      } else {
        history.push("/tickets/comprar");
        set_verificando(false);
      }
    } catch (err) {
      if (error.response) {
        console.log("Error: ", err.response.data);
      } else {
        console.log("Sin conexion con API: ", err);
      }
      token = null;
      setError(true);
      set_verificando(false);
    }
  };

  return (
    <>
      {Header_login()}
      <h1 id="titulo_login">Acceso a comedor</h1>
      <div className="container mt-4">

      {error === true && (
        <div
        id="mensaje_de_error_login"
        className="alert alert-danger"
        role="alert"
        >
                  {" "}
                  Credenciales inv??lidas
                </div>
              )}

              </div>

      <div id="contenedor">
        <div id="contenedor_de_icono">
          <img src={icono} id="icono" alt="icono" />
        </div>
        
        <form onSubmit={submitHandler}>
          <div className="container">
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
              id="contrase??a_que_no_es_input"
            >
              Contrase??a
            </label>
            <input
              type="password"
              id="contrase??a"
              name="password"
              placeholder="Contrase??a"
              className="form-control"
              onChange={capturar_datos}
            />

            <div className="d-flex justify-content-center mb-2 mt-4">
              {verificando ? (
                <Spinner animation="border"></Spinner>
              ) : (
                <button
                  id="boton_inicio_de_sesion"
                  type="submit"
                  value="Iniciar sesi??n"
                >
                  {" "}
                  Iniciar sesion{" "}
                </button>
              )}
              
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default Login;
