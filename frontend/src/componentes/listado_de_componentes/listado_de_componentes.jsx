import './listado_de_componentes.css'
import React, {useState} from 'react'
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { Link } from 'react-router-dom'
import Header from '../header/header'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle, faSearch} from "@fortawesome/free-solid-svg-icons";

const Listado_de_componentes = () => {

  const url = "http://localhost:8000/api/components/";
  const url_ingrediente = "http://localhost:8000/api/ingredients/";

  const [data, setData] = React.useState([])
  const [ingrediente, setIngrediente] = React.useState([])
  const [nuevoComponente, setNuevoComponente] = React.useState({
    id:"",
    name:"",
  })
  const [modalEliminar, setModalEliminar] = React.useState(false)
  const [filterText, setFilterText] = React.useState("");

  const updateFilter = event => {
    setFilterText(event.target.value);
  };
  React.useEffect(() => {
    peticionGet()
  }, [])

  const peticionGet = () => {
    axios.get(url).then(response => {
      setData(response.data);
    }).catch(error=>{
      console.log(error.message);
    })
  }

  const seleccionarComponente = (componente) => {
    setNuevoComponente({
      id:componente.id,
      name:componente.name,
    });
  }

  const peticionDelete = () => {
    axios.delete(url+nuevoComponente.id).then(response=>{
      setModalEliminar(false);
      peticionGet();
    }).catch(error=>{
      console.log(error.message);
    })
  }

  const unidadDeIngrediente = (ingrediente,cantidad) => {
    if (ingrediente.measure === "UN") {
      if (cantidad === 1) {
        return "Unidad"
      }
      else {
        return "Unidades"
      }
    }
    return ingrediente.measure
  }

  const peticionGetIngrediente = (id) => {
    axios.get(url_ingrediente+id).then(response => {
      setIngrediente(response.data);
    }).catch(error=>{
      console.log(error.message);
    })
  }

  const informacion_de_un_ingrediente = (ing) => {
    peticionGetIngrediente(ing.id);
    return <h6>{ingrediente.name} {ing.amount} {unidadDeIngrediente(ingrediente,ing.amount)}</h6>
  }

  return (
    <>
      {Header()}
      <main>
        <div className="mb-5">
          <Breadcrumb tag="nav" listTag="div">
            <BreadcrumbItem tag="a" href="/home">Comedor</BreadcrumbItem>
            <BreadcrumbItem active tag="span">Platos</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="row mt-5">
          <div className="col-10 offset-1">
            <div className="row justify-content-between">
              <div className="col-4">
                <div className="input-group">
                  <input type="text" className="form-control"
                         placeholder="Buscar plato..."
                         aria-label="Buscar plato..."
                         aria-describedby="basic-addon2"
                         value={filterText}
                         name="text"
                         onChange={updateFilter}/>
                    <div className="input-group-append">
                      <span id="basic-addon2"><FontAwesomeIcon icon={faSearch}/></span>
                    </div>
                </div>
              </div>
              <div className="col-6 text-right d-flex justify-content-end">
                <a href="/platos/nuevo" className="btn btn-primary"><span className="mr-05"><FontAwesomeIcon icon={faPlusCircle}/></span>
                    Cargar plato</a>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-10 offset-1">
            <h2>Platos</h2>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-10 offset-1">
          <table className="table align-middle table-striped">
            <thead>
              <tr id="lista_de_titulos_de_columnas_de_componentes">
                <th className="titulo_de_columna_de_componentes">Nombre</th>
                <th className="titulo_de_columna_de_componentes">Ingredientes</th>
                <th className="titulo_de_columna_de_componentes">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map(componente => {
                return (
                  <tr>
                    <td>{componente.name}</td>
                    <td>{componente.ingredients.map(ingrediente => {
                      return (

                        <label >
                          {ingrediente.ingredient.name } {" , " }
                        </label>
                      )
                    })}</td>
                    <td>
                      <Link to={"/detalle_componente/"+componente.id}><button className="btn btn-primary">Detalle</button></Link>
                      {"   "}
                      <button className="btn btn-danger" onClick={()=>{seleccionarComponente(componente); setModalEliminar(true)}}>Eliminar</button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          </div>
        </div>
          <Modal isOpen={modalEliminar}>
            <ModalBody>
              ¿Estás seguro que querés eliminar el plato: {nuevoComponente && nuevoComponente.name}?
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-success" onClick={()=>peticionDelete()}>Sí</button>
              <button className="btn btn-danger" onClick={()=>setModalEliminar(false)}>No</button>
            </ModalFooter>
          </Modal>
      </main>
    </>
  )

}

export default Listado_de_componentes