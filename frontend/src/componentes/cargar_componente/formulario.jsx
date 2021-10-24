import './cargar_componente.css';
import React, {useState, useEffect} from 'react'
import axios from "axios"
import Select from 'react-select'
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {Form} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import IngredientForm from "../ingredientes/form";
import { useForm } from 'react-hook-form';

const Formulario = ({ set_modal_componente }) => {
  const url = "http://localhost:8000/api";

  const [data, setData] = useState([])
  const [newIngredient, setNewIngredient] = useState(false);
  const [tipos, setTipos] = useState([])
  const [nombre_elegido, set_nombre_elegido] = useState("")
  const [tipo_elegido, set_tipo_elegido] = useState([])
  const [ingrediente_elegido, set_ingrediente_elegido] = useState([])
  const [cantidad_elegida, set_cantidad_elegida] = useState("1")
  const [nuevo_componente, setNuevoComponente] = useState({
    name:"",
    type:"",
    ingredients:[],
  })
  const [ingredient, setIngredient] = useState({
    id: "",
    name: "",
    measure: "",
  });
  const [ingredientes_a_mostrar, set_ingrediente_a_mostrar] = useState([])
  const [mostrar_ingrediente, set_mostrar_ingrediente] = useState(false)
  const [error_nombre, set_error_nombre] = useState(false)
  const [measure, setMeasure] = useState('UN')
  const {register, formState: { errors },  handleSubmit} = useForm();

  useEffect(() => {
    peticionGet()
    peticionGetTipos()
  }, [])

  const peticionGet = () => {
    axios.get(`${url}/ingredients/`).then(response => {
      setData(response.data);
    }).catch(error=>{
      console.log(error.message);
    })
  }

  const peticionGetTipos = () => {
    axios.get(`${url}/component_type/`).then(response => {
      setTipos(response.data);
    }).catch(error=>{
      console.log(error.message);
    })
  }

  const nameChange = async event => {
    console.log(nuevo_componente);
    event.persist();
    await setNuevoComponente({...nuevo_componente, "name": event.target.value});
  }

  const capturar_tipo = async event => {
    await setNuevoComponente({...nuevo_componente, "type": event.target.value});
  }

  const capturar_ingrediente = i => {
    set_ingrediente_elegido({id:i.value, name:i.label});
    set_mostrar_ingrediente(true);
  }

  const capturar_cantidad = async c => {
    c.persist();
    set_cantidad_elegida(c.target.value);
  }

  const agregar_ingrediente = async i => {
    i.persist()
    let nuevo_componente_con_el_nuevo_ingrediente = nuevo_componente
    let nuevo_elemento_de_ingredients

    nuevo_elemento_de_ingredients = {
      amount:cantidad_elegida,
      ingredient_id:ingrediente_elegido.id,
    }

    nuevo_componente_con_el_nuevo_ingrediente.ingredients = [...nuevo_componente_con_el_nuevo_ingrediente.ingredients,nuevo_elemento_de_ingredients]
    await setNuevoComponente(nuevo_componente_con_el_nuevo_ingrediente)

    await set_ingrediente_a_mostrar([...ingredientes_a_mostrar,{id:ingrediente_elegido.id,name:ingrediente_elegido.name,cantidad:nuevo_elemento_de_ingredients.amount}])

    await set_mostrar_ingrediente(false)

    await set_ingrediente_elegido([])
  }

  const guardar_componente = async c => {
    if (nombre_elegido === "") {
      set_error_nombre(true)
    } else {
      set_error_nombre(false)

      c.preventDefault();

      let componente = nuevo_componente
      componente.name = nuevo_componente.name
      componente.type = nuevo_componente.type

      await axios.post(`${url}/components/`, componente).then(response=>{
      }).catch(error=>{
        console.log(error.message);
      })
      set_modal_componente(false)
    }
  }

  const borrar_ingrediente = (ingrediente) => {
    let ingredientes_a_mostrar_sin_el_que_se_borra = ingredientes_a_mostrar.filter(ing => ing.id !== ingrediente.id)
    set_ingrediente_a_mostrar(ingredientes_a_mostrar_sin_el_que_se_borra)
  }

  useEffect(() => {
    peticionGet()
    opciones()
  }, [newIngredient])

  const opciones = () => {
    let devolver = []
    {data.map(ingrediente => {
      let no_se_eligio = true
      ingredientes_a_mostrar.map(ing => {
        if (ing.id === ingrediente.id) {
          no_se_eligio = false
        }
      })
      if (no_se_eligio) {
        devolver.push({label:ingrediente.name,value:ingrediente.id})
      }
    })}
    return devolver
  }

  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(false);

  const onSubmit = async (e) => {
    console.log(nuevo_componente);
    await axios.post(`${url}/components/`, nuevo_componente).then(response=>{
      setError(false);
      setSaving(false);
      setNewIngredient(false);
      set_mostrar_ingrediente(true);
      capturar_ingrediente({"value":response.data.id, "label":response.data.name})
    }).catch(error=>{
      console.log(error.message);
    })
  }

  useEffect(() => {
    let ingrediente = data.filter(item => item.id === ingrediente_elegido.id)
    console.log('ingredeinte', ingrediente)
    if (ingrediente.length > 0){
      setMeasure(ingrediente[0].measure)
    }
  }, [ingrediente_elegido])

  const formClose = () => {
    setNewIngredient(false);
  }

  const cerrar_modal = async c => {
    c.preventDefault()
    set_modal_componente(false)
  }

  return (
    <>
      <div className="row">
        <div className="col-8 offset-2">
          <Form className="text-left" onSubmit={handleSubmit(onSubmit)}>
            <div className="row mb-5 justify-content-between">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="name">Nombre * asdasd</label>
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
                  <label htmlFor="type">Tipo *</label>
                  <Select
                          name="type"
                          options={tipos}
                          placeholder={"Seleccione un tipo de plato..."}
                          {...register( "type", {required:  true})}
                          onChange={capturar_tipo}
                          defaultValue={nuevo_componente.type}
                  />
                  <div className="error">
                    {errors.type?.type === 'required' && "Este campo es requerido"}
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-between align-items-end">
              <div className="col-4">
                <div className="form-group">
                  <label htmlFor="ingredientes">Ingredientes *</label>
                  <Select name="ingredientes" options={opciones()} value={mostrar_ingrediente?ingrediente_elegido.label :""} onChange={capturar_ingrediente}/>
                </div>
              </div>
              <div className="col-3">
                <div className="form-group">
                  <label htmlFor="amount">Cantidad *</label>
                  <input name="amount" className="form-control" type="number" defaultValue="1" onChange={capturar_cantidad}/>
                </div>
              </div>
              <div className="col-2">
                 <div className="form-group">
                  <input name="measure" disabled className="form-control text-center" type="text" value={(ingrediente_elegido) ? measure : ""}/>
                </div>
              </div>
              <div className="col-3">
                <button type="button" className="btn btn-secondary w-100" onClick={ () => setNewIngredient(true) }><span className="mr-05"><FontAwesomeIcon icon={faPlusCircle}/></span>Nuevo</button>
              </div>
            </div>
            <div className="text-center">
              <div id="ingredientes_elegidos_en_cargar_componente">
                {ingredientes_a_mostrar.map(ingrediente => {
                  return (
                    <button key={ingrediente.id} type="button" className="btn btn-secondary" id="boton_de_un_ingrediente_de_cargar_componente" onClick={()=>{borrar_ingrediente(ingrediente)}}>
                      {ingrediente.name} - {ingrediente.cantidad} <span aria-hidden="true">&times;</span>
                    </button>
                  )
                })}
              </div>
            </div>
            <div className="row w-100">
              <div className="col-12">
                <button type="button" className="btn btn-primary" id="agregar_cargar_componente" onClick={ agregar_ingrediente }><span className="mr-05"><FontAwesomeIcon icon={faPlusCircle}/></span>Agregar al plato</button>
              </div>
            </div>
            <div className="row justify-content-center mt-5">
              <div className="col-3">
                <button className="btn btn-secondary" id="cancelar_cargar_componente" onClick={cerrar_modal}>Cancelar</button>
              </div>
              <div className="col-3 d-flex justify-content-end">
                <button type="submit" className="btn btn-primary" id="guardar_cargar_componente" onClick={guardar_componente}>Guardar</button>
              </div>
            </div>
          </Form>
        </div>
      </div>
      <Modal isOpen={newIngredient}>
        <ModalHeader>
          Agregar un nuevo ingrediente
        </ModalHeader>
        <ModalBody>
          <IngredientForm formClose={formClose} setError={setError} setSaving={setSaving} ingredient={ingredient} setIngredient={setIngredient} handleSubmit={handleSubmit}/>
        </ModalBody>
      </Modal>
    </>
  )
}

export default Formulario