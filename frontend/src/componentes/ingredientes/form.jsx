import '../ingredientes/ingredientes.css';
import React, { useEffect, useState } from 'react';
import {Form} from "reactstrap";
import axios from "axios";
import { useForm } from 'react-hook-form';

const IngredientForm = (props) => {
  const api_url = "http://localhost:8000/api";
  const [measures, setMeasures] = useState([]);

  const [data, setData] = useState({
    id: props.ingredient.id,
    name: props.ingredient.name,
    measure: props.ingredient.measure,
  })

  const {register, formState: { errors },  handleSubmit} = useForm();

  useEffect(() => {
    get();
  }, []);

  useEffect(() => {
    setData({...data,
      id: props.ingredient.id,
      name: props.ingredient.name,
      measure: props.ingredient.measure
    })
  }, [props]);
  
  const get = () => {
    axios.get(`${api_url}/measure`).then(response => {
      setMeasures(response.data);
    }).catch(error=>{
      console.log(error.message);
    })
  };

  const nameChange = async event => {
    event.persist();
    await setData({...data, "name": event.target.value});
  }

  const selectChange = async event => {
    event.persist();
    await setData({...data, "measure": event.target.value});

  }

  const onSubmit = (e) => {
    console.log('enviando datos...');
    props.setSaving(true);
    props.setError(false);
    props.handleSubmit(data, e);
  }

  const cancel = (e) => {
    e.preventDefault();
    if (!props.formClose){
      window.location.href = "/ingredientes";
    }else{
      props.formClose();
    }
  }

  return ( measures.length !== 0 ? (
    <Form onSubmit={handleSubmit(onSubmit)} >
      <div className="form-group">
        <label htmlFor="name">Nombre *</label>
        <input type="text"
               id="name"
               name="name"
               placeholder="Ingrese un nombre..."
               className="form-control"
               {...register("name", { required: true, maxLength: 30, pattern: /^[0-9a-zA-ZÀ-ÿ\u00f1\u00d1'\s-]+$/i })}
               onChange={nameChange}
               value={data.name}
          />
        <div className="error">
          {errors.name?.type === 'required' && "Este campo es requerido"}
          {errors.name?.type === 'maxLength' && "El límite de caracteres es de 30"}
          {errors.name?.type === 'pattern' && "Este campo solo acepta caracteres alfanúmericos"}
        </div>
      </div>
      <div className="form-group mt-3">
        <label htmlFor="measure">Unidad de medida *</label>
        <select className="form-control"
                name="measure"
                {...register( "measure", {required:  true})}
                onChange={selectChange}
                value={data.measure}
        >
          <option value="">Seleccionar una opción...</option>
          {measures.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <div className="error">
          {errors.measure?.type === 'required' && "Este campo es requerido"}
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        <div className="col-3">
          <input className="btn btn-secondary" type="button"
                 onClick={cancel}  value="Cancelar"/>
        </div>
        <div className="col-3 d-flex justify-content-end">
          <input className="btn btn-primary" type="submit" value="Guardar"/>
        </div>
      </div>
    </Form>
    ): (<></>)
  )
}

export default IngredientForm