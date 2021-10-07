import './cargar_menu.css'
import Header from '../header/header'
import React from 'react'
import axios from "axios"
import Select from 'react-select'
import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import Formulario from '../cargar_componente/formulario'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"

const Cargar_menu = () => {

    const url = "http://localhost:8000/api/components/";
    const url_menus = "http://localhost:8000/api/menus/";

    const [data, setData] = React.useState([])
    const [nombre_elegido, set_nombre_elegido] = React.useState([])
    const [entrada_elegida, set_entrada_elegida] = React.useState([])
    const [plato_principal_elegido, set_plato_principal_elegido] = React.useState([])
    const [postre_elegido, set_postre_elegido] = React.useState([])
    const [bebida_elegida, set_bebida_elegida] = React.useState([])
    const [checkbox_vegetariano, set_checkbox_vegetariano] = React.useState(false)
    const [checkbox_celiaco, set_checkbox_celiaco] = React.useState(false)
    const [modal_componente, set_modal_componente] = React.useState(false)
    const [las_opciones_de_entrada, set_las_opciones_de_entrada] = React.useState([])
    const [las_opciones_de_plato_principal, set_las_opciones_de_plato_principal] = React.useState([])
    const [las_opciones_de_postre, set_las_opciones_de_postre] = React.useState([])
    const [las_opciones_de_bebida, set_las_opciones_de_bebida] = React.useState([])

    React.useEffect(() => {
        peticionGet()
    }, [])

    React.useEffect(() => {
        peticionGet()
    }, [modal_componente])

    const peticionGet = () => {
        axios.get(url).then(response => {
            setData(response.data);
            opciones_entrada(response.data)
            opciones_plato_principal(response.data)
            opciones_postre(response.data)
            opciones_bebida(response.data)
        }).catch(error=>{
            console.log(error.message);
        })
    }

    const capturar_nombre = async n => {
        n.persist();
        set_nombre_elegido(n.target.value);
    }

    const opciones_entrada = (datos) => {
        let devolver = []
        let entradas = datos.filter(componente => componente.type === 1)
        entradas.map(componente => {
            devolver.push({label:componente.name,value:componente.id})
        })
        set_las_opciones_de_entrada(devolver)
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

    const capturar_entrada = e => {
        set_entrada_elegida(e.value);
    }

    const capturar_plato_principal = p => {
        set_plato_principal_elegido(p.value);
    }

    const capturar_postre = p => {
        set_postre_elegido(p.value);
    }

    const capturar_bebida = b => {
        set_bebida_elegida(b.value);
    }

    const capturar_vegetariano = v => {
        set_checkbox_vegetariano(v.target.checked);
    }

    const capturar_celiaco = c => {
        set_checkbox_celiaco(c.target.checked);
    }

    const guardar_menu = async m => {
        m.preventDefault();
        let menu = {
            "name": nombre_elegido,
            "celiac": checkbox_celiaco,
            "vegetarian": checkbox_vegetariano,
            "starter_id": [entrada_elegida],
            "principal_id": [plato_principal_elegido],
            "dessert_id": [postre_elegido],
            "drink_id": [bebida_elegida],
        }

        await axios.post(url_menus,menu).then(response=>{
        }).catch(error=>{
            console.log(error.message);
        })

        window.location.href = "http://localhost:3000/menus";
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
                <div className="d-flex justify-content-center">
                    <div id="contenedor_cargar_menu">
                        
                        <h4 className="mt-3">Nombre</h4>
                        <input id="nombre_cargar_menu" className="form-control" type="text" placeholder="Ingrese un nombre" onChange={capturar_nombre}/>
                        

                        <h4>Entrada</h4>
                        <Select className="select_cargar_menu" options={las_opciones_de_entrada} onChange={capturar_entrada}/>
                        <button id="nuevo_componente_cargar_menu" className="btn btn-secondary" onClick={()=>set_modal_componente(true)}>
                            <span className="mr-05"><FontAwesomeIcon icon={faPlusCircle}/></span>Crear
                        </button>

                        <div className="clearfix"></div>

                        <h4>Plato principal</h4>
                        <Select className="select_cargar_menu" options={las_opciones_de_plato_principal} onChange={capturar_plato_principal}/>
                        <button id="nuevo_componente_cargar_menu" className="btn btn-secondary" onClick={()=>set_modal_componente(true)}>
                            <span className="mr-05"><FontAwesomeIcon icon={faPlusCircle}/></span>Crear
                        </button>

                        <div className="clearfix"></div>

                        <h4>Postre</h4>
                        <Select className="select_cargar_menu" options={las_opciones_de_postre} onChange={capturar_postre}/>
                        <button id="nuevo_componente_cargar_menu" className="btn btn-secondary" onClick={()=>set_modal_componente(true)}>
                            <span className="mr-05"><FontAwesomeIcon icon={faPlusCircle}/></span>Crear
                        </button>

                        <div className="clearfix"></div>

                        <h4>Bebida</h4>
                        <Select className="select_cargar_menu" options={las_opciones_de_bebida} onChange={capturar_bebida}/>
                        <button id="nuevo_componente_cargar_menu" className="btn btn-secondary" onClick={()=>set_modal_componente(true)}>
                            <span className="mr-05"><FontAwesomeIcon icon={faPlusCircle}/></span>Crear
                        </button>

                        <div className="clearfix"></div>

                        <div className="d-flex justify-content-around mt-3">
                            <h4>Apto para vegetarianos</h4>
                            <h4>Apto para celíacos</h4>
                        </div>

                        <div className="d-flex justify-content-around">
                            <input type="checkbox" checked={checkbox_vegetariano} onChange={capturar_vegetariano}/>
                            <input type="checkbox" checked={checkbox_celiaco} onChange={capturar_celiaco}/>
                        </div>

                        <div className="clearfix"></div>

                        <div className="row justify-content-center mt-5">
                            <div className="col-3">
                                <Link to={"/menus"}><button className="btn btn-secondary">Cancelar</button></Link>
                            </div>
                            <div className="col-3 d-flex justify-content-end">
                                <button className="btn btn-primary" onClick={guardar_menu}>Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Modal isOpen={modal_componente} id="modal_cargar_componente">
                <ModalHeader className="d-flex justify-content-center">
                    Crear un nuevo plato
                </ModalHeader>
                <Formulario set_modal_componente={set_modal_componente}/>
                <ModalFooter></ModalFooter> {/* SIN EL FOOTER SE VE FEO */}
            </Modal>
        </>
    )
}

export default Cargar_menu