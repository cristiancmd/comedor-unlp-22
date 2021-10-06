import './listado_de_menus.css'
import React from 'react'
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { Link } from 'react-router-dom'
import Header from '../header/header'

const Listado_de_menus = () => {

  const url = "http://localhost:8000/api/menus/";

  const [data, setData] = React.useState([])
  const [nuevoMenu, setNuevoMenu] = React.useState({
    id:"",
    name:"",
  })
  const [modalEliminar, setModalEliminar] = React.useState(false)
  const [modalDeshabilitar, setModalDeshabilitar] = React.useState(false)

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

  return (
    <>
      {Header()}
      <div id="contenedor_listado_de_menus" className="App">
        <br/><br/>
        <Link to={"/menus/nuevo"}><button className="btn btn-primary">Cargar menú</button></Link>
        <br/><br/>
        <h2>Menús</h2>
        <br/>
        <table className="table align-middle table-striped">
          <thead>
            <tr  >
              <th className="col-3">Nombre</th>
              <th className="col-1">Vegetariano</th>
              <th className="col-1">Celíaco</th>
              <th className="col-4">Acciones</th>
            </tr>
          </thead>
          <tbody >
            {data.map(menu => {
              return (
                <tr >
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
                  <td className="col-4">
                    <Link to={"/detalle/"+menu.id}><button className="btn btn-primary">Detalle</button></Link>
                    {"   "}
                    {
                      menu.enabled?
                      <button className="btn btn-secondary" onClick={()=>{seleccionarMenu(menu); setModalDeshabilitar(true)}}>Desabilitar</button>:
                      <Link to={"/habilitar/"+menu.id}><button className="btn btn-success">Habilitar</button></Link>
                    }
                    {"   "}
                    <button className="btn btn-danger" onClick={()=>{seleccionarMenu(menu); setModalEliminar(true)}}>Eliminar</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <Modal isOpen={modalEliminar}>
          <ModalBody>
            ¿Estás seguro que querés eliminar el menú: {nuevoMenu && nuevoMenu.name}?
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-success" onClick={()=>peticionDelete()}>Sí</button>
            <button className="btn btn-danger" onClick={()=>setModalEliminar(false)}>No</button>
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
      </div>
    </>
  )

}

export default Listado_de_menus
