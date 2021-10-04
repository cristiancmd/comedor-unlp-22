import './cargar_componente.css'
import Header from '../header/header'
import React from 'react'
import axios from "axios"
import { Link } from 'react-router-dom'

const Cargar_componente = () => {

    const url = "http://localhost:8000/api/ingredients/";
    const url_componentes = "http://localhost:8000/api/components/";

    const [data, setData] = React.useState([])
    const [nombre_elegido, set_nombre_elegido] = React.useState([])
    const [un_ingrediente, set_un_ingrediente] = React.useState("vacio")
    const [cantidad_elegida, set_cantidad_elegida] = React.useState("1")
    const [nuevo_componente, set_ingredientes_elegidos] = React.useState({
        name:"",
        ingredients:[],
    })
    const [ingredientes_a_mostrar, set_ingrediente_a_mostrar] = React.useState([])
    const [ingredientes_eliminados, set_ingredientes_eliminados] = React.useState([])

    React.useEffect(() => {
        peticionGet()
    }, [])

    const peticionGet = () => {
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

    const capturar_ingrediente = async i => {
        i.persist();
        // ESTO ES INENTENDIBLE PERO FUNCIONA, LO QUE HACE ES GUARDAR EL ID DEL INGREDIENTE
        set_un_ingrediente(i.target.selectedOptions[0].attributes[0].nodeValue);
    }

    const capturar_cantidad = async c => {
        c.persist();
        set_cantidad_elegida(c.target.value);
    }

    const peticion_get_de_un_ingrediente = (cant,id) => {
        axios.get(url+id).then(response => {
            let ing = response.data
            let setear = {
                cantidad: cant,
                ingrediente: ing,
            }
            set_ingrediente_a_mostrar([...ingredientes_a_mostrar,setear]);
        }).catch(error=>{
            console.log(error.message);
        })
    }

    const agregar_ingrediente = async i => {
        i.persist()
        let nuevo_componente_con_el_nuevo_ingrediente = nuevo_componente
        let nuevo_elemento_de_ingredients

        if (un_ingrediente === "vacio") {
            let seguir = true
            let actual_primer_ingrediente

            {data.map(ingrediente => {
                let no_se_eligio = true
                if (seguir) {
                    ingredientes_a_mostrar.map(ing => {
                        if (ing.ingrediente.id === ingrediente.id) {
                            no_se_eligio = false
                        }
                    })
                    if (no_se_eligio) {
                        let estaba_eliminado = false
                        ingredientes_eliminados.map(ing2 => {
                            if (ing2 === ingrediente.id) {
                                estaba_eliminado = true
                            }
                        })
                        if (estaba_eliminado === false) {
                            seguir = false
                            actual_primer_ingrediente = ingrediente.id
                            set_ingredientes_eliminados([])
                        }
                    }
                }
            })}

            nuevo_elemento_de_ingredients = {
                amount:cantidad_elegida,
                ingredient_id:actual_primer_ingrediente,
            }
        }
        else {
            nuevo_elemento_de_ingredients = {
                amount:cantidad_elegida,
                ingredient_id:un_ingrediente,
            }
            set_un_ingrediente("vacio")
        }

        nuevo_componente_con_el_nuevo_ingrediente.ingredients = [...nuevo_componente_con_el_nuevo_ingrediente.ingredients,nuevo_elemento_de_ingredients]
        await set_ingredientes_elegidos(nuevo_componente_con_el_nuevo_ingrediente);

        await peticion_get_de_un_ingrediente(nuevo_elemento_de_ingredients.amount,nuevo_elemento_de_ingredients.ingredient_id)
    }

    const guardar_componente = async c => {
        c.preventDefault();

        let componente = nuevo_componente
        componente.name = nombre_elegido

        await axios.post(url_componentes,componente).then(response=>{
        }).catch(error=>{
            console.log(error.message);
        })

        window.location.href = "http://localhost:3000/platos";
    }

    const borrar_ingrediente = (ingrediente) => {
        set_ingredientes_eliminados([...ingredientes_eliminados,ingrediente.ingrediente.id])
        let ingredientes_sin_el_ingrediente_a_eliminar = ingredientes_a_mostrar.filter(un_ing => un_ing.ingrediente.id !== ingrediente.ingrediente.id)
        set_ingrediente_a_mostrar(ingredientes_sin_el_ingrediente_a_eliminar)
        let componente = nuevo_componente
        componente.ingredients = nuevo_componente.ingredients.filter(un_ingre => un_ingre.ingredient_id !== ingrediente.ingrediente.id)
        set_ingredientes_elegidos(componente)
    }

    return (
        <>
            {Header()}
            <div>
                <h1 className="d-flex justify-content-center" id="titulo_cargar_componente">Cargar plato</h1>
                <h4 className="d-flex justify-content-center">Nombre</h4>
                <div className="d-flex justify-content-center">
                    <input className="form-control" type="text" id="input_nombre_cargar_componente" placeholder="Ingrese un nombre" onChange={capturar_nombre}/>
                </div>

                <div className="d-flex justify-content-center">
                    <div id="contenedor_ingredientes_cargar_componente">
                        <h4>Ingredientes</h4>
                        <select className="form-select" onChange={capturar_ingrediente}>
                            {data.map(ingrediente => {
                                let no_se_eligio = true
                                ingredientes_a_mostrar.map(ing => {
                                    if (ing.ingrediente.id === ingrediente.id) {
                                        no_se_eligio = false
                                    }
                                })
                                if (no_se_eligio) {
                                    return (
                                        <option name={ingrediente.id}>{ingrediente.name}</option>
                                    )
                                }
                            })}
                        </select>
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
                                    {ingrediente.ingrediente.name} - {ingrediente.cantidad} <span aria-hidden="true">&times;</span>
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
            </div>
        </>
    )
}

export default Cargar_componente