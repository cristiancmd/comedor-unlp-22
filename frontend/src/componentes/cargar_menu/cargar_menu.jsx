import './cargar_menu.css'
import Header from '../header/header'
import React, {useEffect, useState} from 'react'
import axios from "axios"
import Select from 'react-select'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import Formulario from '../cargar_componente/formulario'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import {Form} from 'reactstrap';
import { useForm, Controller } from 'react-hook-form';

const Cargar_menu = () => {

  const url = "http://localhost:8000/api";

  const [modal_componente, set_modal_componente] = useState(false)
  const [component, setComponent] = useState({
    "name":"",
    "type":"",
    "ingredients":[],
  })
  const [las_opciones_de_entrada, set_opciones_de_entrada] = useState([])
  const [las_opciones_de_plato_principal, set_las_opciones_de_plato_principal] = useState([])
  const [las_opciones_de_postre, set_las_opciones_de_postre] = useState([])
  const [las_opciones_de_bebida, set_las_opciones_de_bebida] = useState([])
  const {register, formState: { errors }, setValue, setError,  handleSubmit} = useForm();

  const [menu, setMenu] = useState({
    "name": "",
    "price": "",
    "celiac": false,
    "vegetarian": false,
    "starter_id": [],
    "principal_id": [],
    "dessert_id": [],
    "drink_id": [],
  });

  useEffect(() => {
    peticionGet()
    setValue("price", 0);
  }, [])

  useEffect(() => {
    peticionGet();
  }, [modal_componente])

  const peticionGet = () => {
    axios.get(`${url}/components/`).then(response => {
      opciones_entrada(response.data)
      opciones_plato_principal(response.data)
      opciones_postre(response.data)
      opciones_bebida(response.data)
    }).catch(error=>{
      console.log(error.message);
    })
  }

  const capturar_nombre = async event => {
    event.persist();
    await setMenu({...menu, "name": event.target.value});
  }

  const opciones_entrada = (datos) => {
    let devolver = []
    let entradas = datos.filter(componente => componente.type === 1)
    entradas.map(componente => {
      devolver.push({label:componente.name,value:componente.id})
    })
    set_opciones_de_entrada(devolver)
  }

  const opciones_plato_principal = (datos) => {
    let devolver = []
      let platos_principales = datos.filter(componente => componente.type === 2)
    platos_principales.map(componente => {
      devolver.push({label:componente.name,value:componente.id})
    })
    set_las_opciones_de_plato_principal(devolver)
  }

  const opciones_bebida = (datos) => {
    let devolver = []
    let bebidas = datos.filter(componente => componente.type === 3)
    bebidas.map(componente => {
      devolver.push({label:componente.name,value:componente.id})
    })
    set_las_opciones_de_bebida(devolver)
  }

  const opciones_postre = (datos) => {
    let devolver = []
    let postres = datos.filter(componente => componente.type === 4)
    postres.map(componente => {
      devolver.push({label:componente.name,value:componente.id})
    })
    set_las_opciones_de_postre(devolver)
  }

  const newComponent = (type, label) => {
    setComponent({...component, "type": {value: type, label: label}});
    set_modal_componente(true)
  }

  const capturar_entrada = event => {
    setMenu({...menu, "starter_id": event.value});
    setValue("starter_id", [event.value]);
  }

  const capturar_plato_principal = event => {
    setMenu({...menu, "principal_id": event.value});
    setValue("principal_id", [event.value]);
  }

  const capturar_postre = event => {
    setMenu({...menu, "dessert_id": event.value});
    setValue("dessert_id", [event.value]);
  }

  const capturar_bebida = event => {
    setMenu({...menu, "drink_id": event.value});
    setValue("drink_id", [event.value]);
  }

  const capturar_precio = async event => {
    event.persist();
    await setMenu({...menu, "price": event.target.value});
  }

  const capturar_vegetariano = event => {
    setMenu({...menu, "vegetarian": event.target.checked});
    setValue("vegetarian", event.target.checked);
  }

  const capturar_celiaco = event => {
    setMenu({...menu, "celiac": event.target.checked});
    setValue("celiac", event.target.checked);
  }

  const onSubmit = async (data, e) => {
    e.preventDefault();
    await axios.post(`${url}/menus/`, data).then(response=>{
      window.location.href = "http://localhost:3000/menus";
    }).catch(error=>{
      console.log(error.message);
    })

  }

  const cerrar_modal = () => {
    set_modal_componente(false)
  }

  return (
    <>
      {Header()}
      <main>
        <div>
          <Breadcrumb tag="nav" listTag="div">
            <BreadcrumbItem tag="a" href="/home">Comedor</BreadcrumbItem>
            <BreadcrumbItem tag="a" href="/menus">Menús</BreadcrumbItem>
            <BreadcrumbItem active tag="span">Cargar menú</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <h1 className="d-flex justify-content-center">Cargar menú</h1>
        <div className="row">
          <div className="col-6 offset-3">
            <Form className="text-left" onSubmit={handleSubmit(onSubmit)}>
              <div className="row mb-3 justify-content-between align-items-end">
                <div className="col-12">
                  <div className="form-group">
                    <label htmlFor="name">Nombre *</label>
                    <input type="text"
                           id="name"
                           name="name"
                           placeholder="Ingrese un nombre..."
                           className="form-control"
                           {...register("name", { required: true, maxLength: 30, pattern: /^['a-zA-ZÀ-ÿ\u00f1\u00d1'\s-]+$/i })}
                           onChange={capturar_nombre}
                           value={menu.name}
                      />
                    <div className="error">
                      {errors.name?.type === 'required' && "Este campo es requerido"}
                      {errors.name?.type === 'maxLength' && "El límite de caracteres es de 30"}
                      {errors.name?.type === 'pattern' && "Este campo solo acepta caracteres alfabéticos"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-3 justify-content-between align-items-end">
                <div className="col-10">
                  <div className="form-group">
                    <label htmlFor="starter_id">Entrada *</label>
                    <Select
                      name="starter_id"
                      options={las_opciones_de_entrada}
                      placeholder={"Seleccione un plato..."}
                      {...register("starter_id", {required: true})}
                      onChange={(e) => capturar_entrada(e)}
                      defaultValue={menu.starter_id}
                    />
                  </div>
                </div>
                <div className="col-2">
                  <button className="btn btn-secondary d-flex justify-content-center w-100"
                          onClick={()=>newComponent(1, "Entrada")}
                          title="Agrega una nueva entrada al listado">
                    <span><FontAwesomeIcon icon={faPlusCircle}/></span>
                  </button>
                </div>
                <div className="error">
                  {errors.starter_id?.type === 'required' && "Este campo es requerido"}
                </div>
              </div>
              <div className="row mb-3 justify-content-between align-items-end">
                <div className="col-10">
                  <div className="form-group">
                    <label htmlFor="principal_id">Plato principal *</label>
                    <Select
                      name="principal_id"
                      options={las_opciones_de_plato_principal}
                      placeholder={"Seleccione un plato..."}
                      {...register("principal_id", { required: true})}
                      onChange={(e) => capturar_plato_principal(e)}
                      defaultValue={component?.id ? component.id : menu.principal_id}
                    />
                  </div>
                </div>
                <div className="col-2">
                  <button className="btn btn-secondary d-flex justify-content-center w-100"
                          onClick={()=>newComponent(2, "Principal")}
                          title="Agrega un nuevo plato principal al listado">
                    <span><FontAwesomeIcon icon={faPlusCircle}/></span>
                  </button>
                </div>
                <div className="error">
                  {errors.principal_id?.type === 'required' && "Este campo es requerido"}
                </div>
              </div>
              <div className="row mb-3 justify-content-between align-items-end">
                <div className="col-10">
                  <div className="form-group">
                    <label htmlFor="dessert_id">Postre *</label>
                    <Select
                      name="dessert_id"
                      options={las_opciones_de_postre}
                      placeholder={"Seleccione un plato..."}
                      {...register("dessert_id", { required: true})}
                      onChange={(e) => capturar_postre(e)}
                      defaultValue={menu.dessert_id}
                    />
                  </div>
                </div>
                <div className="col-2">
                  <button className="btn btn-secondary d-flex justify-content-center w-100"
                          onClick={()=>newComponent(3, "Postre")}
                          title="Agrega un nuevo postre al listado">
                    <span><FontAwesomeIcon icon={faPlusCircle}/></span>
                  </button>
                </div>
                <div className="error">
                  {errors.dessert_id?.type === 'required' && "Este campo es requerido"}
                </div>
              </div>
              <div className="row mb-3 justify-content-between align-items-end">
                <div className="col-10">
                  <div className="form-group">
                    <label htmlFor="drink_id">Bebida *</label>
                    <Select
                      name="drink_id"
                      options={las_opciones_de_bebida}
                      placeholder={"Seleccione un plato..."}
                      {...register("drink_id", { required: true})}
                      onChange={(e) => capturar_bebida(e)}
                      defaultValue={() => menu.drink_id}
                    />
                  </div>
                </div>
                <div className="col-2">
                  <button className="btn btn-secondary d-flex justify-content-center w-100"
                          onClick={()=>newComponent(4, "Bebida")}
                          title="Agrega una nueva bebida al listado">
                    <span><FontAwesomeIcon icon={faPlusCircle}/></span>
                  </button>
                </div>
                <div className="error">
                  {errors.drink_id?.type === 'required' && "Este campo es requerido"}
                </div>
              </div>
              <div className="row mb-3 justify-content-between align-items-baseline">
                <div className="col-4">
                  <div className="form-group price">
                    <label htmlFor="price">Precio</label>
                    <div className="input-group px-0">
                      <div className="input-group-prepend">
                        <span className="input-group-text">$</span>
                      </div>
                      <input type="number"
                             id="price"
                             name="price"
                             aria-label="Precio expresado en pesos"
                             placeholder="0"
                             min="0"
                             className="form-control"
                             {...register("price", { pattern: /^[0-9]+$/i })}
                             onChange={capturar_precio}
                             value={menu.price}
                        />
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-group text-center pb-2">
                    <label htmlFor="vegetarian">Vegetariano</label>
                    <div className="w-100 mt-1 text-center">
                      <input type="checkbox"
                           id="vegetarian"
                           name="vegetarian"
                           onChange={capturar_vegetariano}
                           checked={menu.vegetarian}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="form-group text-center pb-2">
                    <label htmlFor="celiac">Apto celíaco</label>
                    <div className="w-100 mt-1 text-center">
                      <input type="checkbox"
                           id="celiac"
                           name="celiac"
                           onChange={capturar_celiaco}
                           checked={menu.celiac}
                      />
                    </div>
                  </div>
                </div>
                <div className="error">
                    {errors.price?.type === 'pattern' && "Este campo solo acepta caracteres numéricos"}
                  </div>
              </div>
              <div className="row justify-content-center mt-5">
                <div className="col-3">
                  <Link to={"/menus"}><button className="btn btn-secondary">Cancelar</button></Link>
                </div>
                <div className="col-3 d-flex justify-content-end">
                  <button type="submit" className="btn btn-primary">Guardar</button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </main>

      <Modal isOpen={modal_componente} id="modal_cargar_componente">
        <ModalHeader className="d-flex justify-content-center">
          Crear un nuevo plato
        </ModalHeader>
        <ModalBody><Formulario menu_cerrar_modal={cerrar_modal} component={component} setComponent={setComponent}/></ModalBody>
        <ModalFooter></ModalFooter> {/* SIN EL FOOTER SE VE FEO */}
      </Modal>
    </>
  )
}

export default Cargar_menu