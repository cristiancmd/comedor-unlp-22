import './detalle_componente.css'
import Header from '../header/header'
import React, {useState} from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import Select from 'react-select'
import {Breadcrumb, BreadcrumbItem, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {Form} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import IngredientForm from "../ingredientes/form";

const Detalle_componente = (props) => {

  const url = "http://localhost:8000/api/components/";
  const url_tipos = "http://localhost:8000/api/component_type/";

  const [data, setData] = React.useState([])
  const [ingredientes, set_ingredientes] = React.useState([])

  React.useEffect(() => {
    peticionGet()
  }, [])

  const peticionGet = () => {
    axios.get(url+props.match.params.id).then(response => {
      setData(response.data);
      set_ingredientes(response.data.ingredients)
      console.log(response.data)
    }).catch(error=>{
      console.log(error.message);
    })
  }

  const tipo = (un_tipo) => {
    let devolver = ""
    if (un_tipo === 0) {
        devolver = "Otro"
    }
    if (un_tipo === 1) {
        devolver = "Entrada"
    }
    if (un_tipo === 2) {
        devolver = "Principal"
    }
    if (un_tipo === 3) {
        devolver = "Bebida"
    }
    if (un_tipo === 4) {
        devolver = "Postre"
    }
    return devolver
  }

  return (
    <>
      {Header()}
      <main>
        <div>
          <Breadcrumb tag="nav" listTag="div">
            <BreadcrumbItem tag="a" href="/home">Comedor</BreadcrumbItem>
            <BreadcrumbItem tag="a" href="/platos">Platos</BreadcrumbItem>
            <BreadcrumbItem active tag="span">Detalle plato</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="row my-5">
          <div className="col-10 offset-1">
            <h2 className="text-center mb-5">Cargar plato</h2>
            <div className="row">
              <div className="col-8 offset-2">
                <Form className="text-left">
                  <div className="row mb-5 justify-content-between">
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="name">Nombre *</label>
                        <h4 className="form-control">{data.name}</h4>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="type">Tipo *</label>
                        <h4 className="form-control">{tipo(data.type)}</h4>
                      </div>
                    </div>
                  </div>

                  {ingredientes.length !== 0?
                    <div className="d-flex justify-content-center">
                    <div className="form-group">
                        <label htmlFor="name">Ingredientes</label>
                    </div>
                    </div>:""
                  }
                  

                  <div className="text-center">
                    <div id="ingredientes_elegidos_en_cargar_componente">
                      {ingredientes.map(ingrediente => {
                        return (
                          <button type="button" className="btn btn-secondary" id="boton_de_un_ingrediente_de_cargar_componente">
                            {ingrediente.ingredient.name} - {ingrediente.amount} - {ingrediente.ingredient.measure}<span aria-hidden="true">&times;</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="clearfix"></div>

                  <div className="d-flex justify-content-center mt-5">
                        <Link to={"/platos"}><button className="btn btn-secondary">Atrás</button></Link>
                    </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Detalle_componente