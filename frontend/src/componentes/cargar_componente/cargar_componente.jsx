import './cargar_componente.css'
import Header from '../header/header'
import React, {useState} from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import Select from 'react-select'
import {Breadcrumb, BreadcrumbItem, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {Form} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import IngredientForm from "../ingredientes/form";

const Cargar_componente = () => {

  const url = "http://localhost:8000/api/ingredients/";
  const url_componentes = "http://localhost:8000/api/components/";
  const url_tipos = "http://localhost:8000/api/component_type/";

  const [data, setData] = React.useState([])
  const [newIngredient, setNewIngredient] = React.useState(false);
  const [tipos, setTipos] = React.useState([])
  const [nombre_elegido, set_nombre_elegido] = React.useState("")
  const [tipo_elegido, set_tipo_elegido] = React.useState([])
  const [ingrediente_elegido, set_ingrediente_elegido] = React.useState([])
  const [cantidad_elegida, set_cantidad_elegida] = React.useState("1")
  const [nuevo_componente, set_ingredientes_elegidos] = React.useState({
    name:"",
    type:"",
    ingredients:[],
  })
  const [ingredient, setIngredient] = useState([]);
  const [ingredientes_a_mostrar, set_ingrediente_a_mostrar] = React.useState([])
  const [mostrar_ingrediente, set_mostrar_ingrediente] = React.useState(false)
  const [error_nombre, set_error_nombre] = React.useState(false)
  const [measure, setMeasure] = React.useState('UN')

  React.useEffect(() => {
    peticionGet()
    peticionGetTipos()
  }, [])

  const peticionGet = () => {
    axios.get(url_tipos).then(response => {
      setTipos(response.data);
    }).catch(error=>{
      console.log(error.message);
    })
  }

  const peticionGetTipos = () => {
    axios.get(url).then(response => {
      setData(response.data);
    }).catch(error=>{
      console.log(error.message);
    })
  }

  const capturar_nombre = async n => {
    n.persist();
    set_nombre_elegido(n.target.value);
  }

  const capturar_tipo = t => {
    set_tipo_elegido(t.value);
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
    await set_ingredientes_elegidos(nuevo_componente_con_el_nuevo_ingrediente)

    await set_ingrediente_a_mostrar([...ingredientes_a_mostrar,{id:ingrediente_elegido.id,name:ingrediente_elegido.name,cantidad:nuevo_elemento_de_ingredients.amount}])

    await set_mostrar_ingrediente(false)

    await set_ingrediente_elegido([])

    await setNewIngredient(false)

    await setIngredient([])
  }

  const guardar_componente = async c => {
    if (nombre_elegido === "") {
      set_error_nombre(true)
    }
    else {
      if (nombre_elegido.includes(0)) {
        set_error_nombre(true)
      }
      else {
        if (nombre_elegido.includes(1)) {
          set_error_nombre(true)
        }
        else {
          if (nombre_elegido.includes(2)) {
            set_error_nombre(true)
          }
          else {
            if (nombre_elegido.includes(3)) {
              set_error_nombre(true)
            }
            else {
              if (nombre_elegido.includes(4)) {
                set_error_nombre(true)
              }
              else {
                if (nombre_elegido.includes(5)) {
                  set_error_nombre(true)
                }
                else {
                  if (nombre_elegido.includes(6)) {
                    set_error_nombre(true)
                  }
                  else {
                    if (nombre_elegido.includes(7)) {
                      set_error_nombre(true)
                    }
                    else {
                      if (nombre_elegido.includes(8)) {
                        set_error_nombre(true)
                      }
                      else {
                        if (nombre_elegido.includes(9)) {
                          set_error_nombre(true)
                        }
                        else {
                          set_error_nombre(false)

                          c.preventDefault();

                          let componente = nuevo_componente
                          componente.name = nombre_elegido
                          componente.type = tipo_elegido

                          await axios.post(url_componentes,componente).then(response=>{
                          }).catch(error=>{
                            console.log(error.message);
                          })

                          window.location.href = "http://localhost:3000/platos";
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  const borrar_ingrediente = (ingrediente) => {
    let ingredientes_a_mostrar_sin_el_que_se_borra = ingredientes_a_mostrar.filter(ing => ing.id !== ingrediente.id)
    set_ingrediente_a_mostrar(ingredientes_a_mostrar_sin_el_que_se_borra)
  }

  React.useEffect(() => {
    peticionGetTipos()
    opciones()
  }, [ingrediente_elegido, ingredient, newIngredient])

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

  const opciones_tipo = () => {
    let devolver = []
    {tipos.map(tipo => {
      devolver.push({label:tipo.label,value:tipo.value})
    })}
    return devolver
  }
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (data, e) => {
    await axios.post(url, data).then(response=>{
      setError(false);
      setSaving(false);
      setNewIngredient(false);
      setIngredient({...ingredient, "label": response.data.name,
        "id": response.data.id,
        "measure": response.data.measure
      });
      capturar_ingrediente({"value":response.data.id, "label":response.data.name})
      opciones();
    }).catch(error=>{
      console.log(error.message);
    })
  }

  React.useEffect(() => {
    let ingrediente;
    if (ingredient.id){
      ingrediente = data.filter(item => item.id === ingredient.id)
    }else{
      ingrediente = data.filter(item => item.id === ingrediente_elegido.id)
    }
    if (ingrediente.length > 0){
      setMeasure(ingrediente[0].measure)
    }
  }, [ingrediente_elegido, ingredient, newIngredient])

  const formClose = () => {
    setNewIngredient(false);
  }

  return (
    <>
      {Header()}
      <main>
        <div>
          <Breadcrumb tag="nav" listTag="div">
            <BreadcrumbItem tag="a" href="/home">Comedor</BreadcrumbItem>
            <BreadcrumbItem tag="a" href="/platos">Platos</BreadcrumbItem>
            <BreadcrumbItem active tag="span">Cargar plato</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="row my-5">
          <div className="col-10 offset-1">
            <h2 className="text-center mb-5">Cargar plato</h2>
            <div className="row">
              <div className="col-8 offset-2">
                <Form className="text-left">
                  <div className="row mb-5 justify-content-between">
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="name">Nombre *</label>
                        <input className="form-control" type="text" placeholder="Ingrese un nombre" onChange={capturar_nombre}/>
                        <div className="error">
                          {error_nombre?<h5 id="error_nombre_cargar_componente" className="d-flex justify-content-center">Ingrese un nombre correcto</h5>:""}
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-group">
                        <label htmlFor="type">Tipo *</label>
                        <Select name="type" options={opciones_tipo()} onChange={capturar_tipo}/>
                      </div>
                    </div>
                  </div>
                  <div className="row justify-content-between align-items-end">
                    <div className="col-4">
                      <div className="form-group">
                        <label htmlFor="ingredientes">Ingredientes *</label>
                        <Select label={ ingrediente_elegido.label } name="ingredientes" options={opciones()} onChange={capturar_ingrediente}/>
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
                        <input name="measure" disabled className="form-control text-center" type="text" value={measure}/>
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
                          <button type="button" className="btn btn-secondary" id="boton_de_un_ingrediente_de_cargar_componente" onClick={()=>{borrar_ingrediente(ingrediente)}}>
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
                      <Link to={"/platos"}><button className="btn btn-secondary" id="cancelar_cargar_componente">Cancelar</button></Link>
                    </div>
                    <div className="col-3 d-flex justify-content-end">
                      <button type="submit" className="btn btn-primary" id="guardar_cargar_componente" onClick={guardar_componente}>Guardar</button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </main>
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

export default Cargar_componente