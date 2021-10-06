import './cargar_menu.css'
import Header from '../header/header'
import React from 'react'
import axios from "axios"
import Select from 'react-select'
import { Link } from 'react-router-dom'

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

    const opciones_entrada = () => {
        let devolver = []
        let entradas = data.filter(componente => componente.type === 1)
        entradas.map(componente => {
            devolver.push({label:componente.name,value:componente.id})
        })
        return devolver
    }

    const opciones_plato_principal = () => {
        let devolver = []
        let platos_principales = data.filter(componente => componente.type === 2)
        platos_principales.map(componente => {
            devolver.push({label:componente.name,value:componente.id})
        })
        return devolver
    }

    const opciones_bebida = () => {
        let devolver = []
        let bebidas = data.filter(componente => componente.type === 3)
        bebidas.map(componente => {
            devolver.push({label:componente.name,value:componente.id})
        })
        return devolver
    }

    const opciones_postre = () => {
        let devolver = []
        let postres = data.filter(componente => componente.type === 4)
        postres.map(componente => {
            devolver.push({label:componente.name,value:componente.id})
        })
        return devolver
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
            <div>
                <div className="d-flex justify-content-center">
                    <div id="contenedor_cargar_menu">
                        <br/>
                        <h4>Nombre</h4>
                        <input className="form-control" type="text" placeholder="Ingrese un nombre" onChange={capturar_nombre}/>
                        <h4>Entrada</h4>
                        <Select options={opciones_entrada()} onChange={capturar_entrada}/>
                        <h4>Plato principal</h4>
                        <Select options={opciones_plato_principal()} onChange={capturar_plato_principal}/>
                        <h4>Postre</h4>
                        <Select options={opciones_postre()} onChange={capturar_postre}/>
                        <h4>Bebida</h4>
                        <Select options={opciones_bebida()} onChange={capturar_bebida}/>
                        <h4>Apto para vegetarianos</h4>
                        <input type="checkbox" checked={checkbox_vegetariano} onChange={capturar_vegetariano}/>
                        <h4>Apto para celíacos</h4>
                        <input type="checkbox" checked={checkbox_celiaco} onChange={capturar_celiaco}/>
                        <div className="clearfix"></div>
                        <button className="btn btn-success" onClick={guardar_menu}>Guardar</button>
                        <Link to={"/menus"}><button className="btn btn-danger">Cancelar</button></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cargar_menu