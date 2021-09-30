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
    pk:"",
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
      pk:menu.pk,
      name:menu.name,
    });
  }

  const peticionDelete = () => {
    axios.delete(url+"/"+nuevoMenu.pk).then(response=>{
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
        <Link to={"/cargar_menu"}><button className="btn btn-primary">Cargar menú</button></Link>
        <br/><br/>
        <h2>Menús</h2>
        <br/>
        <table className="table">
          <thead>
            <tr id="lista_de_titulos_de_columnas">
              <th className="titulo_de_columna">Nombre</th>
              <th className="titulo_de_columna">Vegetariano</th>
              <th className="titulo_de_columna">Celíaco</th>
              <th className="titulo_de_columna">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map(menu => {
              return (
                <tr>
                  <td>{menu.name}</td>
                  {
                    menu.vegetarian?
                    <td><span className="tilde_vegetariano">&#10003;</span></td>:
                    <td><span className="tilde_vegetariano">&#x2715;</span></td>
                  }
                  {
                    menu.celiac?
                    <td><span className="tilde_celiaco">&#10003;</span></td>:
                    <td><span className="tilde_celiaco">&#x2715;</span></td>
                  }
                  <td>
                    <Link to={"/detalle/"+menu.pk}><button className="btn btn-primary">Detalle</button></Link>
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
