import './cargar_componente.css'
import Header from '../header/header'
import React from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'
import Select from 'react-select'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

const Cargar_componente = () => {

    const url = "http://localhost:8000/api/ingredients/";
    const url_componentes = "http://localhost:8000/api/components/";
    const url_tipos = "http://localhost:8000/api/component_type/";

    const [data, setData] = React.useState([])
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
    const [ingredientes_a_mostrar, set_ingrediente_a_mostrar] = React.useState([])
    const [mostrar_ingrediente, set_mostrar_ingrediente] = React.useState(false)
    const [error_nombre, set_error_nombre] = React.useState(false)

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
        set_ingrediente_elegido({id:i.value,name:i.label});
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

    return (
        <>
            {Header()}
            <main>
                <div>
                  <Breadcrumb tag="nav" listTag="div">
                    <BreadcrumbItem tag="a" href="/home">Home</BreadcrumbItem>
                    <BreadcrumbItem tag="a" href="/platos">Platos</BreadcrumbItem>
                    <BreadcrumbItem active tag="span">Cargar plato</BreadcrumbItem>
                  </Breadcrumb>
                </div>
                <h1 className="d-flex justify-content-center" id="titulo_cargar_componente">Cargar plato</h1>
                <h4 className="d-flex justify-content-center">Nombre</h4>
                <div className="d-flex justify-content-center">
                    <input className="form-control" type="text" id="input_nombre_cargar_componente" placeholder="Ingrese un nombre" onChange={capturar_nombre}/>
                </div>
                {error_nombre?<h5 id="error_nombre_cargar_componente" className="d-flex justify-content-center">Ingrese un nombre correcto</h5>:""}

                <h4 id="tipo_cargar_componente" className="d-flex justify-content-center">Tipo</h4>
                <div className="d-flex justify-content-center">
                    <div id="contenedor_tipo_cargar_componente">
                        <Select options={opciones_tipo()} onChange={capturar_tipo}/>
                    </div>
                </div>
                <br/>
                <br/>

                <div className="d-flex justify-content-center">
                    <div id="contenedor_ingredientes_cargar_componente">
                        <h4>Ingredientes</h4>
                        <Select options={opciones()} value={mostrar_ingrediente?ingrediente_elegido.label:""} onChange={capturar_ingrediente}/>
                    </div>
                    <div id="contenedor_cantidad_cargar_componente">
                        <h4>Cantidad</h4>
                        <input className="form-control" type="text" defaultValue="1" onChange={capturar_cantidad}/>
                    </div>
                </div>

                <div className="d-flex justify-content-center">
                    <div className="d-flex justify-content-center" id="ingredientes_elegidos_en_cargar_componente">
                        {ingredientes_a_mostrar.map(ingrediente => {
                            return (
                                <button type="button" className="btn btn-secondary" id="boton_de_un_ingrediente_de_cargar_componente" onClick={()=>{borrar_ingrediente(ingrediente)}}>
                                    {ingrediente.name} - {ingrediente.cantidad} <span aria-hidden="true">&times;</span>
                                </button>
                            )
                        })}
                    </div>
                </div>
                
                <div className="clearfix"></div>

                <div className="d-flex justify-content-center">
                    <button className="btn btn-primary" id="agregar_cargar_componente" onClick={agregar_ingrediente}>Agregar</button>
                </div>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-success" id="guardar_cargar_componente" onClick={guardar_componente}>Guardar</button>
                    <Link to={"/platos"}><button className="btn btn-danger" id="cancelar_cargar_componente">Cancelar</button></Link>
                </div>
            </main>
        </>
    )
}

export default Cargar_componente