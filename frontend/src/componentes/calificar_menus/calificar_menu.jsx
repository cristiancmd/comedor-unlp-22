import './calificar_menu.css'
import Header from "../header/header";
import React, { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem
} from "reactstrap";
import { useParams } from "react-router-dom";
import { Rating } from 'react-simple-star-rating'
import { UserContext } from '../../UserContext';

const Calificar_menu = () => {

  const url_menu = "http://localhost:8000/api/menus/";
  const url_ratings = "http://localhost:8000/api/ratings/";

  const { id } = useParams();

  const { user, loginUser } = useContext(UserContext)

  const [nombre, set_nombre] = useState([]);

  const [comentario, set_comentario] = useState("");
  const [rating, set_rating] = useState(0)

  const [error_comentario, set_error_comentario] = useState(false)
  const [error_rating, set_error_rating] = useState(false)

  React.useEffect(() => {
    get_menu();
  }, []);

  const get_menu = () => {
    axios.get(url_menu + id).then((response) => {
      set_nombre(response.data.name);
    }).catch((error) => {
      console.log(error.message);
    });
  };

  const capturar_comentario = async event => {
    event.persist();
    await set_comentario(event.target.value);
  }

  const capturar_rating = (rate) => {
    set_rating(rate/20);
  }

  const comentar = () => {
    if (comentario == "") {
      set_error_comentario(true)
    }
    else {
      set_error_comentario(false)
    }
    if (rating == 0) {
      set_error_rating(true)
    }
    else {
      set_error_rating(false)
    }
    if (comentario !== "" && rating !== 0) {
      post()
    }
  }

  const post = async () => {
    let un_comentario = {
      rating: rating,
      comment: comentario,
      menu: id,
      user: user.user.id
    }
    await axios.post(url_ratings,un_comentario).then(response => {
      window.location.href = "http://localhost:3000/menu/informacion/" + id;
    }).catch(error => {
      console.log(error.message);
    })
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
              Calificar menú
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <h1 className="d-flex justify-content-center mt-5 mb-5">Menú: {nombre}</h1>

        <div className="d-flex justify-content-center">
          <div id="contenedor_cargar_menu">

            <h4>Escriba un comentario</h4>

            <div className="d-flex justify-content-center">
              <textarea rows="6" id="text_area_para_comentar" onChange={capturar_comentario}></textarea>
            </div>

            <div className="error">
              {error_comentario && "Este campo es requerido"}
            </div>

            <h4 className="text-center mt-4">Califique</h4>

            <div className="d-flex justify-content-center">
              <Rating ratingValue={rating} onClick={capturar_rating}/>
            </div>

            <div className="error d-flex justify-content-center">
              {error_rating && "Es necesario calificar el menú"}
            </div>

            <div className="d-flex justify-content-center mt-5">
              <Link to={"/menu/informacion/" + id}>
                <button className="btn btn-secondary me-2">Cancelar</button>
              </Link>
              <button className="btn btn-primary ms-2" onClick={comentar}>Aceptar</button>
            </div>

          </div>
        </div>
      </main>
    </>
  );
};

export default Calificar_menu;
