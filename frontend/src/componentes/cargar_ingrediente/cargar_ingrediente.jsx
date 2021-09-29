import './cargar_ingrediente.css'
import React, { Component } from 'react'
import Select from 'react-select';
import Header from '../header/header'
import {Form} from "reactstrap";
import axios from "axios";


const Cargar_ingrediente = () => {
  const [newIngredient, setNewIngredient] = React.useState({
    name:"",
    measure:"",
  });
  const url = "http://localhost:8000/api/measure";
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    get()
  }, [])

  const get = () => {
    axios.get(url).then(response => {
      setData(response.data);
    }).catch(error=>{
      console.log(error.message);
    })
  };

  const post = async (e) => {
    e.preventDefault();
    let url = "http://localhost:8000/api/ingredients/"
    await axios.post(url,newIngredient).then(response=>{
      window.location.href = "http://localhost:3000/ingredientes";
    }).catch(error=>{
      console.log(error.message);
    })
  }

  const nameChange = async d => {
    d.persist();
    await setNewIngredient({...newIngredient, "name":d.target.value});
  }

  const selectChange = e => {
    setNewIngredient({...newIngredient, "measure": e.value});
  }

  const cancel = (e) => {
    e.preventDefault();
  }

  return ( data.length !== 0 ? ( <>
      {Header()}
      <main id="new-ingredient">
        <div className="row justify-content-center mt-3">
          <div className="col">
            <h1 className="text-center">Cargar ingrediente</h1>
            <div className="row justify-content-center mt-3">
              <div className="col-6">
                <Form onSubmit={post}>
                  <div className="form-group">
                    <label htmlFor="name">Nombre</label>
                    <input type="text" className="form-control" id="name" placeholder="Ingrese un nombre..."
                         onChange={nameChange}  />

                  </div>
                  <div className="form-group">
                    <label htmlFor="measure">Unidad de medida</label>
                    <Select options={data} onChange={selectChange}/>
                  </div>
                  <div className="row justify-content-center mt-5">
                    <div className="col-3">
                      <input className="btn btn-secondary" type="button"
                             onClick={cancel}  value="Cancelar"/>
                    </div>
                    <div className="col-3">
                      <input className="btn btn-primary" type="submit" value="Guardar"/>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>

      </main>
    </>) : (<></>)
  )
}

export default Cargar_ingrediente