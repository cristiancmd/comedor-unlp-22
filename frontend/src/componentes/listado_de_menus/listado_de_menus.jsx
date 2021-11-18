import './listado_de_menus.css'
import React, {useState} from 'react'
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import {Breadcrumb, BreadcrumbItem, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'
import { Link } from 'react-router-dom';
import Header from '../header/header';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle, faSearch} from "@fortawesome/free-solid-svg-icons";

const Listado_de_menus = () => {

  const url = "http://localhost:8000/api/menus/";

  const [data, setData] = React.useState([])
  const [nuevoMenu, setNuevoMenu] = React.useState({
    id:"",
    name:"",
  })
  const [modalEliminar, setModalEliminar] = React.useState(false)
  const [modalDeshabilitar, setModalDeshabilitar] = React.useState(false)
  const [filterText, setFilterText] = useState("");

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

  const seleccionarMenu = (menu) => {
    setNuevoMenu({
      id:menu.id,
      name:menu.name,
    });
  }

  const peticionDelete = () => {
    axios.delete(url+nuevoMenu.id).then(response=>{
      setModalEliminar(false);
      peticionGet();
    }).catch(error=>{
      console.log(error.message);
    })
  }

  const DataList = () => {
    return (<tbody >
      {data.
      filter(menu => menu.name.toLowerCase().includes(filterText.toLowerCase().trim()))
        .map(menu => {
        return (
          <tr key={menu.id}>
            <td className="col-3">{menu.name}</td>
            {
              menu.vegetarian?
              <th className="col-1" ><span className="tilde_vegetariano">&#10003;</span></th>:
              <th className="col-1"><span className="tilde_vegetariano">&#x2715;</span></th>
            }
            {
              menu.celiac?
              <th className="col-1"><span className="tilde_celiaco">&#10003;</span></th>:
              <th className="col-1"><span className="tilde_celiaco">&#x2715;</span></th>
            }
            <td >
              
              <div className="row justify-content-evenly">
                <div className="col-1"> 
                <Link to={"/habilitar/"+menu.id}><button className="btn btn-success ">Vender</button></Link>

                </div>
                < div className="col-1">
                <Link to={"/menus/detalle/"+menu.id}><button className="btn btn-primary">Detalle</button></Link>

                </div>
                <div className="col-1" >
                <button className="btn btn-danger" onClick={()=>{seleccionarMenu(menu); setModalEliminar(true)}}>Eliminar</button>

                </div>

              </div>
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
        <div>
          <Breadcrumb tag="nav" listTag="div">
            <BreadcrumbItem tag="a" href="/home">Comedor</BreadcrumbItem>
            <BreadcrumbItem active tag="span">Menús</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="row mt-5">
          <div className="col-10 offset-1">
            <div className="row justify-content-between">
              <div className="col-4">
                <div className="input-group">
                  <input type="text" className="form-control"
                         placeholder="Buscar menú..."
                         aria-label="Buscar menú..."
                         aria-describedby="basic-addon2"
                         value={filterText}
                         name="text"
                         onChange={updateFilter}/>
                    <div className="input-group-append">
                      <span id="basic-addon2"><FontAwesomeIcon icon={faSearch}/></span>
                    </div>
                </div>
              </div>

              <div className="col-6 text-right d-flex justify-content-between">
                <Link to="/menus/habilitados"><button className="btn btn-secondary">Menús habilitados</button></Link>
                <a href="/menus/nuevo"  className="btn btn-primary"><span className="mr-05"><FontAwesomeIcon icon={faPlusCircle}/></span>
                    Cargar menú</a>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-10 offset-1">
            <h2>Menús</h2>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-10 offset-1">
          <table className="table align-middle table-striped">
            <thead>
              <tr id="lista_de_titulos_de_columnas_de_componentes">
                <th className="col-3">Nombre</th>
                <th className="col-1">Vegetariano</th>
                <th className="col-1">Celíaco</th>
                <th className="col-4">Acciones</th>
              </tr>
            </thead>
            <DataList></DataList>
          </table>
          </div>
        </div>
          <Modal isOpen={modalEliminar}>
            <ModalBody>
              ¿Estás seguro que querés eliminar el menú: {nuevoMenu && nuevoMenu.name}?
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-secondary" onClick={()=>setModalEliminar(false)}>No</button>
              <button className="btn btn-primary" onClick={()=>peticionDelete()}>Sí</button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={modalDeshabilitar}>
            <ModalBody>
              ¿Estás seguro que querés deshabilitar el menú: {nuevoMenu && nuevoMenu.name}?
            </ModalBody>
            <ModalFooter>
              <button className="btn btn-success" onClick={()=>setModalDeshabilitar(false)}>Sí</button>
              <button className="btn btn-danger" onClick={()=>setModalDeshabilitar(false)}>No</button>
            </ModalFooter>
          </Modal>
      </main>
    </>
  )

}

export default Listado_de_menus
