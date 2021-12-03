import Header from "../header/header";
import React, { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem
} from "reactstrap";
import { useParams } from "react-router-dom";
import { Rating } from 'react-simple-star-rating'
import { UserContext } from '../../UserContext';

const Detalle_menu_a_calificar = () => {

  const url = "http://localhost:8000/api";
  const url_comentarios = "http://localhost:8000/api/ratings/";
  const url_usuarios = "http://localhost:8000/api/usuarios/";

  const { id } = useParams();

  const { user, loginUser } = useContext(UserContext)

  const [nombre, set_nombre] = React.useState([]);
  const [entrada, set_entrada] = React.useState([]);
  const [plato_principal, set_plato_principal] = React.useState([]);
  const [postre, set_postre] = React.useState([]);
  const [bebida, set_bebida] = React.useState([]);
  const [precio, set_precio] = React.useState([]);
  const [vegetariano, set_vegetariano] = React.useState([]);
  const [celiaco, set_celiaco] = React.useState([]);
  const [calificacion, set_calificacion] = React.useState([]);

  const [comentarios, set_comentarios] = React.useState([]);

  const [usuarios, set_usuarios] = React.useState([]);

  React.useEffect(() => {
    get_menu();
    get_comentarios();
    get_usuarios();
  }, []);

  const get_menu = () => {
    axios
      .get(`${url}/menus/${id}`)
      .then((response) => {
        set_nombre(response.data.name);
        set_entrada(response.data.starter[0].name);
        set_plato_principal(response.data.principal[0].name);
        set_postre(response.data.dessert[0].name);
        set_bebida(response.data.drink[0].name);
        set_precio(response.data.price);
        set_vegetariano(response.data.vegetarian);
        set_celiaco(response.data.celiac);
        set_calificacion(response.data.ratingAvg);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const get_comentarios = () => {
    axios.get(url_comentarios,{params:{menu:id}}).then((response) => {
      set_comentarios(response.data);
    }).catch((error) => {
      console.log(error.message);
    });
  };

  const get_usuarios = () => {
    axios.get(url_usuarios).then((response) => {
      set_usuarios(response.data);
    }).catch((error) => {
      console.log(error.message);
    });
  };

  const nombre_del_usuario = (id) => {
    let nombre_buscado
    let apellido_buscado
    usuarios.map((usuario)=>{
      if (usuario.id == id) {
        nombre_buscado = usuario.firstname
        apellido_buscado = usuario.lastname
      }
    })
    return nombre_buscado + " " + apellido_buscado
  }

  const ya_califico = () => {
    let califico = false
    comentarios.map((comentario)=>{
      if (comentario.user == user.user.id) {
        califico = true
      }
    })
    return califico
  }

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
        <h1 className="d-flex justify-content-center">Menú: {nombre}</h1>

        <div className="d-flex justify-content-center mt-5 mb-3">
          {
            ya_califico()?
            <button className="btn btn-secondary">Calificar</button>:
            <Link to={"/menu/calificar/" + id}>
              <button className="btn btn-primary">Calificar</button>
            </Link>
          }
        </div>

        <div className="d-flex justify-content-center">
          <div id="contenedor_cargar_menu">

            <h4>Calificación</h4>
            {calificacion !== null?
            <div>
              <h5 className="float-start mt-2 me-2">{calificacion}</h5>
              {calificacion > 0?<Rating ratingValue={calificacion} allowHalfIcon={true} readonly={true}/>:""}  {/* calificacion > 0 = ARBITRARIEDAD DE REACT */}
            </div>:
            <h4 className="form-control">El menú no posee calificaciones</h4>}

            <h4 className="mt-2">Entrada</h4>
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

            {
              vegetariano?
              <h4 className="mt-3">Apto para vegetarianos: Sí</h4>:
              <h4 className="mt-3">Apto para vegetarianos: No</h4>
            }

            <div className="clearfix"></div>

            {
              celiaco?
              <h4 className="mt-3">Apto para celíacos: Sí</h4>:
              <h4 className="mt-3">Apto para celíacos: No</h4>
            }

            <div className="clearfix"></div>

            {
              comentarios.length == 0?
              <h4 className="mt-5">No hay comentarios</h4> :
              <h4 className="mt-5">Comentarios</h4>
            }

            <hr/>

            {comentarios.map(comentario => {
              return (
                <div>
                  <h5 className="mb-0">{nombre_del_usuario(comentario.user)}</h5>
                  <Rating ratingValue={comentario.rating} allowHalfIcon={true} readonly={true} size={20}/>
                  <h5>{comentario.comment}</h5>
                  <hr/>
                </div>
              )
            })}

            <div className="clearfix"></div>

            <div className="d-flex justify-content-center mt-5">
              <Link to={"/menus/calificaciones"}>
                <button className="btn btn-secondary">Atrás</button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Detalle_menu_a_calificar;
