import "./header.css";
import icono_facultad from "../../imagenes/icono_facultad.png";
import icono_home from "../../imagenes/icono_home.png";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";





const Header = () => {
  
  
  useEffect(() => {
    getUser()
  }, []);
  
  const getUser = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user)
    if (user && user.access_token) {
        setUser(user.user.username)
        return { 'usuario': user.username };
      } else {
        return {};
      
      }
  };
  
  const [user, setUser] = useState([]);
  
  
  return (
    <>
      <div id="unlp_banner">
        <img src={icono_facultad} id="icono_facultad" />
      </div>

      <nav
        className="navbar navbar-expand-lg navbar-dark  "
        style={{ backgroundColor: "rgb(138, 7, 7)" }}
      >
        <div className="container-fluid">
          <Link to={"/home"}>
            <img src={icono_home} width="50px" alt="home" />
          </Link>
          <div className="navbar-nav  " style={{ paddingLeft: "2%" }}>
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
          <div className="container-fluid float-end">
            <Link to={"/login"} className="btn btn-outline-light m-2 float-end ">
              Cerrar sesión
            </Link>
            
            { user.length>0 && <label className="btn btn-outline-light m-2 float-end"> {user}</label> }
            
          </div>
        </div>
      </nav>
    </>
  );
};
export default Header;
