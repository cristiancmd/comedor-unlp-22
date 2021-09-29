import './listado_de_ingredientes.css'
import React from 'react'
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { Link } from 'react-router-dom'
import Header from '../header/header'

const Listado_de_ingredientes = () => {

  const api_url = "http://localhost:8000/api/";
  const react_url = "http://localhost:3000/";

  const [data, setData] = React.useState([]);
  const [row, setRow] = React.useState([]);

  const [modalEliminar, setModalEliminar] = React.useState(false)

  React.useEffect(() => {
    get()
  }, [])

  const get = () => {
    axios.get(`${api_url}ingredients`).then(response => {
      setData(response.data);
    }).catch(error=>{
      console.log(error.message);
    })
  };
  //
  // const peticionPost = async () => {
  //   delete nuevoIngrediente.id;
  //   await axios.post(url,nuevoIngrediente).then(response=>{
  //     setModalInsertar(false);
  //     peticionGet();
  //   }).catch(error=>{
  //     console.log(error.message);
  //   })
  // }

  const peticionDelete = () => {
    // axios.delete(url+"/"+row.id).then(response=>{
    //   setModalEliminar(false);
    //   peticionGet();
    // }).catch(error=>{
    //   console.log(error.message);
    // })
  }

  return (
    <>
      {Header()}
      <div id="contenedor_listado_de_menus" className="App">
        <br/><br/>
        <a href={`${react_url}ingredientes/nuevo`} className="btn btn-primary">Cargar ingrediente</a>
        <br/><br/>
        <h2>Ingredientes</h2>
        <br/>
        <table className="table">
          <thead>
            <tr id="lista_de_titulos_de_columnas">
              <th className="titulo_de_columna">Nombre</th>
              <th className="titulo_de_columna">Unidad de medida</th>
              <th className="titulo_de_columna">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => {
              return (
                <tr key={item.pk}>
                  <td>{item.name}</td>
                  <td>{item.measure}</td>
                  <td>
                    <button className="btn btn-danger" onClick={()=>{setModalEliminar(true)}}>Eliminar</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>


        <Modal isOpen={modalEliminar}>
          <ModalBody>
            ¿Estás seguro que querés eliminar el ingrediente: {row && row.name}?
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-success" onClick={()=>peticionDelete()}>Sí</button>
            <button className="btn btn-danger" onClick={()=>setModalEliminar(false)}>No</button>
          </ModalFooter>
        </Modal>

      </div>
    </>
  )

}

export default Listado_de_ingredientes