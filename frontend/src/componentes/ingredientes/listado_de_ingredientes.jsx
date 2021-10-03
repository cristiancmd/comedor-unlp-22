import './ingredientes.css'
import React from 'react'
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { Link } from 'react-router-dom'
import Header from '../header/header'

const Listado_de_ingredientes = () => {

  const api_url = "http://localhost:8000/api";
  const react_url = "http://localhost:3000";

  const [data, setData] = React.useState([]);
  const [row, setRow] = React.useState([]);

  const [modalDelete, setModalDelete] = React.useState(false)

  React.useEffect(() => {
    getElements()
  }, [])

  const getElements = () => {
    axios.get(`${api_url}/ingredients`).then(response => {
      setData(response.data);
    }).catch(error=>{
      console.log(error.message);
    })
  };

  const deleteElement = (row) => {
    axios.delete(`${api_url}/ingredients/${row.id}`).then(response=>{
      setModalDelete(false);
      getElements();
    }).catch(error=>{
      console.log(error.message);
    })
  }

  return (
    <>
      {Header()}
      <div id="ingredients-container" className="App">
        <div className="row mt-5">
          <div className="col-10 offset-1">
            <a href={`${react_url}/ingredientes/nuevo`} className="btn btn-primary">Cargar ingrediente</a>
          </div>
        </div>
        <div className="row mt-3 justify-content-center">
          <div className="text-center">
            <h2>Ingredientes</h2>
          </div>
        </div>
        <div className="row col-10 offset-1 mt-3">
          <div className="col">
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Unidad de medida</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.map(item => {
                  return (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.measure}</td>
                      <td className="actions">
                        <Link className="btn btn-success" to={
                          {
                              pathname: "/ingredientes/editar/" + item.id,
                              ingredient: item
                          }
                        }>
                          Editar
                        </Link>
                        <button className="btn btn-danger" onClick={()=>{ setRow(item); setModalDelete(true); }}>Eliminar</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        <Modal isOpen={modalDelete}>
          <ModalBody>
            ¿Estás seguro que querés eliminar el ingrediente: {row && row.name}?
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-success" onClick={() => deleteElement(row)}>Sí</button>
            <button className="btn btn-danger" onClick={()=>setModalDelete(false)}>No</button>
          </ModalFooter>
        </Modal>

      </div>
    </>
  )

}

export default Listado_de_ingredientes