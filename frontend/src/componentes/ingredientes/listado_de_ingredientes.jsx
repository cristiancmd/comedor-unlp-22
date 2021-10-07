import './ingredientes.css';
import React, {useState} from 'react';
import axios from "axios";
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import Header from '../header/header';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

const Listado_de_ingredientes = () => {
  const api_url = "http://localhost:8000/api";
  const [data, setData] = useState([]);
  const [row, setRow] =  useState([]);
  const [filterText, setFilterText] = useState("");

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

  const updateFilter = event => {
    setFilterText(event.target.value);
  };

  const filterResult = data.filter(item => item.name.toLowerCase().includes(filterText.toLowerCase().trim()));

  const DataList = () => {
    return(
      <tbody>
        {filterResult.map(item => {
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
    );
  };

  return (
    <>
      {Header()}
      <main id="ingredients-container">
        <div>
          <Breadcrumb tag="nav" listTag="div">
            <BreadcrumbItem tag="a" href="/home">Comedor</BreadcrumbItem>
            <BreadcrumbItem active tag="span">Ingredientes</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="row mt-5">
          <div className="col-10 offset-1">
              <div className="row justify-content-between">
                <div className="col-4">
                  <div className="input-group">
                    <input type="text" className="form-control"
                           placeholder="Buscar ingrediente..."
                           aria-label="Buscar ingrediente..."
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
                  <a href="/ingredientes/nuevo" className="btn btn-primary"><span className="mr-05"><FontAwesomeIcon icon={faPlusCircle}/></span>
                      Cargar ingrediente</a>
                </div>
              </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-10 offset-1">
            <h2>Ingredientes</h2>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-10 offset-1">
            <table className="table align-middle table-striped">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Unidad de medida</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <DataList></DataList>
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

      </main>
    </>
  )

}

export default Listado_de_ingredientes