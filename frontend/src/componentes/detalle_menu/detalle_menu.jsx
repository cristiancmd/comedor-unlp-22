import "./detalle_menu.css";
import Header from "../header/header";
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { useParams } from "react-router-dom";

const Detalle_menu = () => {
  const url = "http://localhost:8000/api";

  const [nombre, set_nombre] = React.useState([]);
  const [entrada, set_entrada] = React.useState([]);
  const [plato_principal, set_plato_principal] = React.useState([]);
  const [postre, set_postre] = React.useState([]);
  const [bebida, set_bebida] = React.useState([]);
  const [precio, set_precio] = React.useState([]);
  const [vegetariano, set_vegetariano] = React.useState([]);
  const [celiaco, set_celiaco] = React.useState([]);
  const { id } = useParams();
  const [fechas, setFechas] = React.useState([])

  React.useEffect(() => {
    peticionGet();
  }, []);

  const peticionGet = () => {
    axios
      .get(`${url}/menus/${id}`)
      .then((response) => {
        console.log(response);
        set_nombre(response.data.name);
        set_entrada(response.data.starter[0].name);
        set_plato_principal(response.data.principal[0].name);
        set_postre(response.data.dessert[0].name);
        set_bebida(response.data.drink[0].name);
        set_precio(response.data.price);
        set_vegetariano(response.data.vegetarian);
        set_celiaco(response.data.celiac);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      {Header()}
      <main>
        <div>
          <Breadcrumb tag="nav" listTag="div">
            <BreadcrumbItem tag="a" href="/home">
              Comedor
            </BreadcrumbItem>
            <BreadcrumbItem tag="a" href="/menus">
              Menús
            </BreadcrumbItem>
            <BreadcrumbItem active tag="span">
              Detalle menú
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <h1 className="d-flex justify-content-center">Detalle del menú</h1>
        <div className="d-flex justify-content-center">
          <div id="contenedor_cargar_menu">
            <h4 className="mt-3">Nombre</h4>
            <h4 className="form-control">{nombre}</h4>

            <h4>Entrada</h4>
            <h4 className="form-control">{entrada}</h4>

            <div className="clearfix"></div>

            <h4>Plato principal</h4>
            <h4 className="form-control">{plato_principal}</h4>

            <div className="clearfix"></div>

            <h4>Postre</h4>
            <h4 className="form-control">{postre}</h4>

            <div className="clearfix"></div>

            <h4>Bebida</h4>
            <h4 className="form-control">{bebida}</h4>

            <div className="clearfix"></div>

            <h4 className="mt-3">Precio</h4>
            <h4 className="form-control">{precio}</h4>

            <div className="clearfix"></div>

            <div className="d-flex justify-content-around mt-3">
              <h6>Apto para vegetarianos</h6>
              <h6>Apto para celíacos</h6>
            </div>

            <div className="d-flex justify-content-around">
              <input type="checkbox" checked={vegetariano} />
              <input type="checkbox" checked={celiaco} />
            </div>

            <br />
            <Link to={"/habilitar/" + id}>
              <button className="btn btn-success">Habilitar</button>
            </Link>

            

            <div className="clearfix"></div>

            <div className="d-flex justify-content-center mt-5">
              <Link to={"/menus"}>
                <button className="btn btn-secondary">Atrás</button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Detalle_menu;
