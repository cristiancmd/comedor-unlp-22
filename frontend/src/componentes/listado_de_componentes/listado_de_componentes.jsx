import './listado_de_componentes.css'
import React from 'react'
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { Link } from 'react-router-dom'
import Header from '../header/header'

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
    peticionGetIngrediente(ing.ingredient_id);
    return <h6>{ingrediente.name} {ing.amount} {unidadDeIngrediente(ingrediente,ing.amount)}</h6>
  }

  return (
    <>
      {Header()}
      <div id="contenedor_listado_de_componentes" className="App">
        <br/><br/>
        <Link to={"/cargar_componente"}><button className="btn btn-primary">Cargar plato</button></Link>
        <br/><br/>
        <h2>Platos</h2>
        <br/>
        <table className="table">
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
                      <h6>{informacion_de_un_ingrediente(ingrediente)}</h6>
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

        <Modal isOpen={modalEliminar}>
          <ModalBody>
            ¿Estás seguro que querés eliminar el plato: {nuevoComponente && nuevoComponente.name}?
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

export default Listado_de_componentes