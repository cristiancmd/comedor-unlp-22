import "./header.css";
import icono_facultad from "../../imagenes/icono_facultad.png";
import icono_home from "../../imagenes/icono_home.png";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useContext } from "react";
import { UserContext } from "../../UserContext";
import axios from "axios"

const Header = () => {
  const { user, loginUser } = useContext(UserContext); // utilizar esta linea en los componentes necesarios

  const url_usuario = "http://localhost:8000/api/usuarios/";

  const [usuario, set_usuario] = React.useState([]);

  const get_usuario = () => {
    axios.get(url_usuario).then(response => {
        set_usuario(response.data.filter(usuario => usuario.id == user.user.id)[0])
    }).catch(error=>{
        console.log(error.message);
    })
}
  
  const getUserName = () => {
    if (usuario) {
      return usuario.firstname;
    } else {
      // console.log(user.user.username)
      return user.user.username;
    }
    
  };

  const getUserStaff = () => {
    if (user) {
      return user.user.is_staff;
    } else return false;
  };

  useEffect(() => {
    // console.log("header user:  ", user);
    get_usuario()
  }, []);

  const logOut = () => {
    localStorage.removeItem("user");
  };

  return (
    <>
      <div id="unlp_banner">
        <img src={icono_facultad} id="icono_facultad" />
      </div>

      <nav
        className="navbar navbar-expand-md navbar-dark  "
        style={{ backgroundColor: "rgb(138, 7, 7)" }}
      >
        <div className="container-fluid">

          {getUserStaff() && (
            <>
              <Link to={"/home"}>
                <img src={icono_home} width="50px" alt="home" />
              </Link>
              <div className="nav flex-row col-6" >
                 <Link to={"/tickets/canjear"} className="nav-link " style={{ paddingLeft: "5%" }}>
                  Tickets
                </Link>
                <Link to={"/menus"} className="nav-link">
                  Menús
                </Link>
                <Link to={"/platos"} className="nav-link ">
                  Platos
                </Link>
                <Link to={"/ingredientes"} className="nav-link ">
                  Ingredientes
                </Link>
              </div>
            </>
          )}
          {!getUserStaff() && (
            <>
              <Link to={"/mistickets"}>
                <img src={icono_home} width="50px" alt="home" />
              </Link>
              <div className="nav flex-row col-4 " style={{ paddingLeft: "2%" }}>
                <Link to={"/tickets/comprar"} className="nav-link">
                  Comprar tickets
                </Link>
                <Link to={"/mistickets"} className="nav-link">
                  Mis tickets
                </Link>
              </div>
            </>
          )}
          <div className="container-fluid float-end">
            <Link
              to={"/login"}
              className="btn btn-outline-light m-2 float-end "
              onClick={() => logOut()}
            >
              Cerrar sesión
            </Link>

            {getUserName() && (
              <label className="btn btn-outline-light m-2 float-end">
                {" "}
                {getUserName()}
              </label>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
export default Header;
