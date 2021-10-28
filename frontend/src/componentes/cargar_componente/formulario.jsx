import './cargar_componente.css';
import React, {useState, useEffect} from 'react'
import axios from "axios"
import Select from 'react-select'
import {Form} from 'reactstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import { useForm, Controller } from 'react-hook-form';
import AgregarIngrediente from './AgregarIngrediente';

const Formulario = ({ set_modal_componente }) => {
  const url = "http://localhost:8000/api";

  const [newIngredient, setNewIngredient] = useState(false);
  const [tipos, setTipos] = useState([])
  const [nombre_elegido, set_nombre_elegido] = useState("")
  const [tipo_elegido, set_tipo_elegido] = useState([])
  const [ingrediente_elegido, set_ingrediente_elegido] = useState([])
  const [mostrar_ingrediente, set_mostrar_ingrediente] = useState(false);
  const [ingredientes_a_mostrar, set_ingrediente_a_mostrar] = useState([]); 
  const [nuevo_componente, setNuevoComponente] = useState({
    "name":"",
    "type":"",
    "ingredients":[],
  })
  const [ingredient, setIngredient] = useState({
    id: "",
    name: "",
    measure: "",
  });
  const [error_nombre, set_error_nombre] = useState(false)
  const {register, formState: { errors }, setValue, setError,  handleSubmit} = useForm();
  const { onChange, ...rest } = register("type");

  useEffect(() => {
    peticionGetTipos()
  }, [])

  const peticionGetTipos = () => {
    axios.get(`${url}/component_type/`).then(response => {
      setTipos(response.data);
    }).catch(error=>{
      console.log(error.message);
    })
  }

  const nameChange = async event => {
    event.persist();
    await setNuevoComponente({...nuevo_componente, "name": event.target.value});
  }

  const capturar_tipo = async e => {
    setValue('type', e.value)
    await setNuevoComponente({...nuevo_componente, "type": e.value});
  }
  //
  // const guardar_componente = async (data, c)=> {
  //   console.log('fiaasda', data, c)
  //   c.preventDefault();
  //
  //   await axios.post(`${url}/components/`, nuevo_componente).then(response=>{
  //   }).catch(error=>{
  //     console.log(error.message);
  //   })
  // }

  const onSubmit = async (data, e) => {
    console.log(data)
    await axios.post(`${url}/components/`, data).then(response=>{
      // props.setError(false);
      // props.setSaving(false);
      console.log("Lo recontra guardó viejaaaaaaaa")
    }).catch(error=>{
      console.log(error.message);
    })
  }
  const cerrar_modal = async c => {
    c.preventDefault()
    set_modal_componente(false)
  }
  const required = value => value ? undefined : 'Required'

  return (
    <>
      <div className="row">
        <div className="col-8 offset-2">
          <Form className="text-left" onSubmit={handleSubmit(onSubmit)}>
            <div className="row mb-5 justify-content-between">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="name">Nombre *</label>
                  <input type="text"
                         id="name"
                         name="name"
                         placeholder="Ingrese un nombre..."
                         className="form-control"
                         {...register("name", { required: true, maxLength: 30, pattern: /^['a-zA-ZÀ-ÿ\u00f1\u00d1'\s-]+$/i })}
                         onChange={nameChange}
                         value={nuevo_componente.name}
                    />
                  <div className="error">
                    {errors.name?.type === 'required' && "Este campo es requerido"}
                    {errors.name?.type === 'maxLength' && "El límite de caracteres es de 30"}
                    {errors.name?.type === 'pattern' && "Este campo solo acepta caracteres alfabéticos"}
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <div className="form-group">
                    <label htmlFor="type">Tipo *</label>
                    <Select
                      name="type"
                      options={tipos}
                      placeholder={"Seleccione un tipo de plato..."}
                      {...register("type", { required: true})}
                      onChange={(e) => capturar_tipo(e)}
                      defaultValue={nuevo_componente.type}
                    />
                    <div className="error">
                      {errors.type?.type === 'required' && "Este campo es requerido"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*<div className="row justify-content-between align-items-end">*/}
            {/*  <div className="form-group">*/}
            {/*      <label htmlFor="name">Ingredientes</label>*/}
            {/*      <p>Puede seleccionar la cantidad de ingredientes que deseé: </p>*/}
            {/*  </div>*/}
            {/*</div>*/}
            <AgregarIngrediente
              register={register}
              errors={errors}
              handleSubmit={handleSubmit}
              setValue={setValue}
              nuevo_componente={nuevo_componente}
              setNuevoComponente={setNuevoComponente}
              form={useForm}
            />
            <div className="row justify-content-center mt-5">
              <div className="col-3">
                <button className="btn btn-secondary" id="cancelar_cargar_componente" onClick={cerrar_modal}>Cancelar</button>
              </div>
              <div className="col-3 d-flex justify-content-end">
                <button type="submit" className="btn btn-primary" id="guardar_cargar_componente">Guardar</button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  )
}

export default Formulario