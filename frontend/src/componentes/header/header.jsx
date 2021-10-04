import "./header.css";
import icono_facultad from "../../imagenes/icono_facultad.png";
import icono_home from "../../imagenes/icono_home.png";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// const Header = () => {
//   return (
//     <>
//       <div id="header">
//         <div id="unlp_banner">
//           <img src={icono_facultad} id="icono_facultad" />
//         </div>
//         <div id="nav-header">
//           <Link to={"/home"}>
//             <img src={icono_home} id="icono_home" alt="home" />
//           </Link>
//           <Link to={"/listado_de_menus"}>
//             <h5 className="boton">Menús</h5>
//           </Link>
//           <Link to={"/listado_de_componentes"}>
//             <h5 className="boton">Platos</h5>
//           </Link>
//           <Link to={"/listados"}>
//             <h5 className="boton">Listados</h5>
//           </Link>
//           <div id="contenedor_cerrar_sesion">
//             <button
//               type="button"
//               className="btn btn-outline-light"
//               id="cerrar_sesion"
//             >
//               <h5>Cerrar sesión</h5>
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

const Header = () => {
  return (
    <>
      <div id="unlp_banner">
        <img src={icono_facultad} id="icono_facultad" />
      </div>

      <nav
        class="navbar navbar-expand-lg navbar-dark  "
        style={{ backgroundColor: "rgb(138, 7, 7)" }}
      >
        <div class="container-fluid">
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
            <Link to={"/login"} className="btn btn-outline-light float-end ">
              Cerrar sesión
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Header;
