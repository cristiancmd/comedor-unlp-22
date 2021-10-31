import "./header.css";
import icono_facultad from "../../imagenes/icono_facultad.png";
import icono_home from "../../imagenes/icono_home.png";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useContext } from "react";
import { UserContext } from "../../UserContext";

const Header = () => {
  const { user, loginUser } = useContext(UserContext); // utilizar esta linea en los componentes necesarios

  const getUserName = () => {
    if (user) {
      return user.user.username;
    } else return null;
  };

  const getUserStaff = () => {
    if (user) {
      return user.user.is_staff;
    } else return false;
  };

  useEffect(() => {
    console.log("header user:  ", user);
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
              <div className="nav flex-row col-4  " style={{ paddingLeft: "2%" }}>
                <Link to={"/menus"} className="nav-link">
                  Menús
                </Link>
                <Link to={"/platos"} className="nav-link ">
                  Platos
                </Link>
                <Link to={"/ingredientes"} className="nav-link ">
                  Ingredientes
                </Link>
                <Link to={"/tickets/canjear"} className="nav-link ">
                  Canjear ticket
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
