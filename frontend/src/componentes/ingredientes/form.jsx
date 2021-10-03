import '../ingredientes/ingredientes.css'
import React from 'react'
import Select from 'react-select';
import {Form} from "reactstrap";
import axios from "axios";

const IngredientForm = (props) => {

  const api_url = "http://localhost:8000/api";

  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    get()
  }, [])

  const get = () => {
    axios.get(`${api_url}/measure`).then(response => {
      setData(response.data);
    }).catch(error=>{
      console.log(error.message);
    })
  };

  const nameChange = async d => {
    d.persist();
    await props.setIngredient({...props.ingredient, "name":d.target.value});
  }

  const selectChange = e => {
    props.setIngredient({...props.ingredient, "measure": e.value});
  }

  const cancel = (e) => {
    e.preventDefault();
  }

  return ( data.length !== 0 ? (
    <Form onSubmit={props.handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Nombre</label>
        <input required type="text" className="form-control" id="name" placeholder="Ingrese un nombre..."
             onChange={nameChange} value={props.ingredient.name} />
      </div>
      <div className="form-group">
        <label htmlFor="measure">Unidad de medida</label>
        <Select required placeholder="Seleccionar una opción..." options={data} onChange={selectChange} defaultInputValue={props.ingredient.measure}/>
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
    ): (<></>)
  )
}

export default IngredientForm