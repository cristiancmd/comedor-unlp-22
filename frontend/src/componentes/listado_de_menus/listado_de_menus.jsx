import './listado_de_menus.css'
import React from 'react'
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { Link } from 'react-router-dom'
import Header from '../header/header'

const Listado_de_menus = () => {

  const url = "http://localhost:4000/menus";

  const [data, setData] = React.useState([])
  const [modalInsertar, setModalInsertar] = React.useState(false)
  const [nuevoMenu, setNuevoMenu] = React.useState({
    id:"",
    nombre:"",
    entrada:"",
    plato_principal:"",
    postre:"",
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

  const capturarElIngresoDeMenu = async m => {
    m.persist();
    await setNuevoMenu({...nuevoMenu,[m.target.name]:m.target.value});
    console.log(nuevoMenu);
  }

  const peticionPost = async () => {
    delete nuevoMenu.id;
    await axios.post(url,nuevoMenu).then(response=>{
      setModalInsertar(false);
      peticionGet();
    }).catch(error=>{
      console.log(error.message);
    })
  }

  const seleccionarMenu = (menu) => {
    setNuevoMenu({
      id:menu.id,
      nombre:menu.nombre,
      entrada:menu.entrada,
      plato_principal:menu.plato_principal,
      postre:menu.postre
    });
  }

  const peticionDelete = () => {
    axios.delete(url+"/"+nuevoMenu.id).then(response=>{
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
        <button className="btn btn-primary" onClick={()=>{setNuevoMenu({}); setModalInsertar(true)}}>Cargar menú</button>
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
                  <td>{menu.nombre}</td>
                  {
                    5 === 5?
                    <td><span className="tilde_vegetariano">&#10003;</span></td>:
                    <td><span className="tilde_vegetariano">&#x2715;</span></td>
                  }
                  {
                    5 === 6?
                    <td><span className="tilde_celiaco">&#10003;</span></td>:
                    <td><span className="tilde_celiaco">&#x2715;</span></td>
                  }
                  <td>
                    <Link to={"/detalle/"+menu.id}><button className="btn btn-primary">Detalle</button></Link>
                    {"   "}
                    {
                      5 === 5?
                      <Link to={"/habilitar/"+menu.id}><button className="btn btn-success">Habilitar</button></Link>:
                      <button className="btn btn-secondary" onClick={()=>{seleccionarMenu(menu); setModalDeshabilitar(true)}}>Desabilitar</button>
                    }
                    {"   "}
                    <button className="btn btn-danger" onClick={()=>{seleccionarMenu(menu); setModalEliminar(true)}}>Eliminar</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        
        <Modal isOpen={modalInsertar}>
          <ModalHeader style={{ display: 'block' }}>
            <span style={{ float: 'right' }}></span>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input className="form-control" type="text" name="nombre" id="nombre" onChange={capturarElIngresoDeMenu}/>
              <br />
              <label htmlFor="entrada">Entrada</label>
              <input className="form-control" type="text" name="entrada" id="entrada" onChange={capturarElIngresoDeMenu}/>
              <br />
              <label htmlFor="plato_principal">Plato principal</label>
              <input className="form-control" type="text" name="plato_principal" id="plato_principal" onChange={capturarElIngresoDeMenu}/>
              <br />
              <label htmlFor="postre">Postre</label>
              <input className="form-control" type="text" name="postre" id="postre" onChange={capturarElIngresoDeMenu}/>
            </div>
          </ModalBody>
          <ModalFooter>
              <button className="btn btn-success" onClick={()=>peticionPost()}>Insertar</button>
              <button className="btn btn-danger" onClick={()=>setModalInsertar(false)}>Cancelar</button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modalEliminar}>
          <ModalBody>
            ¿Estás seguro que querés eliminar el menú: {nuevoMenu && nuevoMenu.nombre}?
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-success" onClick={()=>peticionDelete()}>Sí</button>
            <button className="btn btn-danger" onClick={()=>setModalEliminar(false)}>No</button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modalDeshabilitar}>
          <ModalBody>
            ¿Estás seguro que querés deshabilitar el menú: {nuevoMenu && nuevoMenu.nombre}?
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