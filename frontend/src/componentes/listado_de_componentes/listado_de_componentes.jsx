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
  const [types, setTypes] = React.useState([])
  const [ingrediente, setIngrediente] = React.useState([])
  const [nuevoComponente, setNuevoComponente] = React.useState({
    id:"",
    name:"",
  })
  const [modalEliminar, setModalEliminar] = React.useState(false)
   const [filters, setFilters] = useState({
    text: '',
    type: ''
  });

  const updateFilter = e => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  React.useEffect(() => {
    peticionGet()
  }, [])

  const peticionGet = () => {
    axios.get("http://localhost:8000/api/component_type/").then(response => {
      setTypes(response.data);
      axios.get(url).then(response => {
        setData(response.data);
        }).catch(error=>{
          console.log(error.message);
        })
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

  const DataList = () => {
    return (
      <tbody>
        {data
          .filter(item => types[filters.type] ? item.type === types[filters.type].value : item)
          .filter(item => item.name.toLowerCase().includes(filters.text.toLowerCase().trim()))
          .map(componente => {
          return (
            <tr key={componente.id}>
              <td>{componente.name}</td>
              <td className="text-capitalize">{types[componente.type].label}</td>
              <td>
                <Link to={"/platos/detalle/"+componente.id}><button className="btn btn-primary">Detalle</button></Link>
                {"   "}
                <button className="btn btn-danger" onClick={()=>{seleccionarComponente(componente); setModalEliminar(true)}}>Eliminar</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    )
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
                         value={filters.text}
                         name="text"
                         onChange={updateFilter}/>
                    <div className="input-group-append">
                      <span id="basic-addon2"><FontAwesomeIcon icon={faSearch}/></span>
                    </div>
                </div>
              </div>
              <div className="col-4">
                <div className="form-group d-flex justify-content-around align-items-center">
                  <label htmlFor="type">Filtrar: </label>
                  <select className="form-control w-75"
                          name="type"
                          value={filters.type}
                          onChange={updateFilter}
                  >
                    <option value="">Seleccionar tipo...</option>
                    {types.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-3 text-right d-flex justify-content-end">
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
                <th className="titulo_de_columna_de_componentes">Tipo</th>
                <th className="titulo_de_columna_de_componentes">Acciones</th>
              </tr>
            </thead>
            <DataList></DataList>

          </table>
          </div>
        </div>
          <Modal isOpen={modalEliminar}>
            <ModalBody>
              ¿Estás seguro que querés eliminar el plato: {nuevoComponente && nuevoComponente.name}?
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-secondary" onClick={()=>setModalEliminar(false)}>No</button>
              <button className="btn btn-primary" onClick={()=>peticionDelete()}>Sí</button>
            </ModalFooter>
          </Modal>
      </main>
    </>
  )

}

export default Listado_de_componentes